'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Article } from '@/types/article';
import ArticleCard from '@/components/ArticleCard';
import { Search, ArrowRight, ArrowUpRight, SunMedium, Sparkles, Radio } from 'lucide-react';
import Link from 'next/link';
import { getStoredArticles } from '@/lib/client-articles';

interface HomeClientProps {
  initialArticles: Article[];
}

const ORDERED_CATEGORIES = [
  'TODAS',
  'UX Design',
  'Tecnologia',
  'AI',
  'Games',
  'Board Games',
  'Ciência',
];

export default function HomeClient({ initialArticles }: HomeClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  useEffect(() => {
    // Sync with curated daily articles
    const stored = getStoredArticles();
    if (stored && stored.length > 0) {
      setArticles(stored);
    }
  }, []);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        search === '' ||
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        (article.sourceName && article.sourceName.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        selectedCategory === 'TODAS' ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [articles, search, selectedCategory]);

  const featuredArticle = useMemo(() => {
    return articles.find((a) => a.featured) || articles[0];
  }, [articles]);

  const nonFeaturedArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;
    if (search || selectedCategory !== 'TODAS') {
      return filteredArticles;
    }
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle, search, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#E9ECEF] text-[#111215]">
      {/* Ghost Watermark Ideograms */}
      <div className="absolute top-16 left-6 pointer-events-none select-none text-[130px] font-mono font-bold leading-none text-[#111215]/[0.03] hidden xl:block">
        早報
      </div>
      <div className="absolute top-96 right-6 pointer-events-none select-none text-[130px] font-mono font-bold leading-none text-[#111215]/[0.03] hidden xl:block">
        晨報
      </div>

      {/* Hero Section: Good Morning News */}
      <section className="border-b border-[#D0D5DD] bg-[#FFFFFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            
            {/* Left Typographic Statement */}
            <div className="lg:col-span-8">
              {/* Top technical coordinates & live status */}
              <div className="flex items-center gap-3 sm:gap-4 mb-5 text-xs font-mono text-[#64748B] flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[#111215] font-bold">
                  <SunMedium className="w-3.5 h-3.5 text-[#E63926]" />
                  EDIÇÃO DAS 07:00 AM
                </span>
                <span>/</span>
                <span className="text-[#111215] font-semibold">6 DOMÍNIOS × 2 HISTÓRIAS</span>
                <span className="hidden sm:inline">/</span>
                <span className="hidden sm:inline text-[#E63926] font-semibold">ZERO CLICKBAIT</span>
              </div>

              {/* Monumental Modernist Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.98] text-[#111215] mb-6">
                Good Morning News<span className="text-[#E63926]">.</span> <br />
                <span className="text-[#64748B] font-medium">A Síntese Matinal das</span> 07:00 AM.
              </h1>

              <p className="text-base sm:text-lg text-[#475569] font-sans max-w-2xl leading-relaxed mb-8">
                Todo dia, rigorosamente às 7 da manhã, nosso agente autônomo examina as principais fontes de jornalismo mundial e seleciona as <strong>2 notícias mais relevantes</strong> em <strong>UX Design</strong>, <strong>Tecnologia</strong>, <strong>AI</strong>, <strong>Games</strong>, <strong>Board Games</strong> e <strong>Ciência</strong>. O sinal essencial contra a avalanche do ruído.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                <a
                  href="#noticias"
                  className="px-5 py-3 bg-[#111215] text-white rounded-sm hover:bg-[#E63926] transition-colors flex items-center gap-2 font-semibold uppercase tracking-wider"
                >
                  <span>Explorar as 12 Histórias</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/manifesto"
                  className="px-5 py-3 bg-[#FFFFFF] border border-[#D0D5DD] hover:border-[#111215] text-[#111215] rounded-sm transition-colors flex items-center gap-2 font-medium uppercase tracking-wider"
                >
                  <span>Ler o Manifesto</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>
              </div>
            </div>

            {/* Right Technical Specification Block */}
            <div className="lg:col-span-4 bg-[#F8F9FA] border border-[#D0D5DD] p-6 rounded-sm font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[#D0D5DD] pb-3 mb-4 text-[#64748B]">
                <span className="font-bold text-[#111215] uppercase tracking-wider flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-[#E63926] animate-pulse" />
                  CURADORIA AUTÔNOMA
                </span>
                <span className="text-[10px] text-[#E63926] font-semibold">07:00 BRT</span>
              </div>
              <div className="space-y-3 text-[#334155]">
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="text-[#64748B]">HISTÓRIAS NA EDIÇÃO:</span>
                  <span className="font-bold text-[#111215]">{articles.length} ITENS</span>
                </div>
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="text-[#64748B]">COBERTURA:</span>
                  <span className="font-bold text-[#111215]">6 ÁREAS ESTRATÉGICAS</span>
                </div>
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="text-[#64748B]">REGRA DE CORTE:</span>
                  <span className="font-bold text-[#111215]">EXATAS 2 POR ÁREA</span>
                </div>
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="text-[#64748B]">FONTES MUNDIAIS:</span>
                  <span className="font-bold text-[#E63926]">ARS, PHYS.ORG, SMASHING...</span>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D0D5DD] flex justify-between items-center text-[10px] text-[#64748B]">
                <span>SÍNTESE INTELIGENTE // SEM SLOP</span>
                <span className="px-1.5 py-0.5 bg-white border border-[#D0D5DD] rounded-sm font-bold text-[#111215]">
                  CALMO
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full" id="noticias">
        {/* Search & Filter Bar */}
        <section className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm p-4 sm:p-6 mb-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Minimal Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="BUSCAR NA EDIÇÃO DE HOJE: TÍTULO, FONTE, CONCEITO..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-xs font-medium text-[#111215] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#111215] focus:bg-white transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#64748B] hover:text-[#111215]"
                >
                  [LIMPAR]
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="text-[#64748B] text-[11px] mr-2 hidden sm:inline">LAYOUT:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-sm border uppercase transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                    : 'bg-white text-[#64748B] border-[#D0D5DD] hover:border-[#111215]'
                }`}
              >
                Grelha
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-2 rounded-sm border uppercase transition-colors ${
                  viewMode === 'compact'
                    ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                    : 'bg-white text-[#64748B] border-[#D0D5DD] hover:border-[#111215]'
                }`}
              >
                Tabela
              </button>
            </div>
          </div>

          {/* Segmented Category Filters */}
          <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-[#64748B] mr-2 uppercase tracking-wider">
              FILTRAR DOMÍNIO:
            </span>
            {ORDERED_CATEGORIES.map((cat) => {
              const count =
                cat === 'TODAS'
                  ? articles.length
                  : articles.filter(
                      (a) => a.category.toLowerCase() === cat.toLowerCase()
                    ).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 font-mono text-xs rounded-sm border transition-all uppercase flex items-center gap-1.5 ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                      : 'bg-[#F8F9FA] text-[#64748B] border-[#D0D5DD] hover:border-[#111215] hover:text-[#111215]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured Showcase (When no active search/category filter) */}
        {!search && selectedCategory === 'TODAS' && featuredArticle && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#64748B]">
              <span className="font-bold text-[#111215] uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63926]" />
                DESTAQUE PRINCIPAL DA EDIÇÃO
              </span>
              <span>EDIÇÃO DAS 07:00 AM</span>
            </div>
            <ArticleCard article={featuredArticle} featured={true} />
          </section>
        )}

        {/* Article Listing */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-[#D0D5DD] pb-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111215]">
              {search || selectedCategory !== 'TODAS'
                ? `Histórias Selecionadas (${nonFeaturedArticles.length})`
                : `Edição Matinal Completa (${nonFeaturedArticles.length})`}
            </h2>
            <span className="font-mono text-[11px] text-[#64748B]">
              TOTAL: {nonFeaturedArticles.length.toString().padStart(2, '0')} HISTÓRIAS
            </span>
          </div>

          {nonFeaturedArticles.length === 0 ? (
            <div className="border border-[#D0D5DD] bg-white p-12 text-center rounded-sm">
              <p className="font-mono text-sm text-[#64748B] mb-4">
                Nenhuma história encontrada para o filtro selecionado.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('TODAS');
                }}
                className="px-4 py-2 bg-[#111215] text-white rounded-sm font-mono text-xs uppercase"
              >
                Ver Todas as Notícias
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonFeaturedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            /* Technical Tabular View */
            <div className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FA] text-[#64748B] border-b border-[#D0D5DD]">
                    <th className="p-3.5 font-medium">HORA/DATA</th>
                    <th className="p-3.5 font-medium">DOMÍNIO</th>
                    <th className="p-3.5 font-medium">TÍTULO DA HISTÓRIA</th>
                    <th className="p-3.5 font-medium">FONTE ORIGINAL</th>
                    <th className="p-3.5 font-medium">LEITURA</th>
                    <th className="p-3.5 text-right font-medium">AÇÃO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {nonFeaturedArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="hover:bg-[#F8F9FA] transition-colors"
                    >
                      <td className="p-3.5 text-[#64748B] whitespace-nowrap">
                        {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="text-[#111215] font-semibold text-[11px] uppercase">
                          {article.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-sm text-[#111215]">
                        <Link
                          href={`/article/?slug=${article.slug}`}
                          className="hover:text-[#E63926] transition-colors"
                        >
                          {article.title}
                        </Link>
                      </td>
                      <td className="p-3.5 text-[#64748B] whitespace-nowrap">
                        {article.sourceName || article.author.name}
                      </td>
                      <td className="p-3.5 text-[#64748B] whitespace-nowrap">
                        {article.readingTimeMinutes} MIN
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <Link
                          href={`/article/?slug=${article.slug}`}
                          className="inline-flex items-center gap-1 font-bold text-[#111215] hover:text-[#E63926]"
                        >
                          <span>LER</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
