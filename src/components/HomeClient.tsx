'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Article } from '@/types/article';
import ArticleCard from '@/components/ArticleCard';
import { Search, ArrowRight, ArrowUpRight, SlidersHorizontal, BookOpen, Terminal } from 'lucide-react';
import Link from 'next/link';

interface HomeClientProps {
  initialArticles: Article[];
}

export default function HomeClient({ initialArticles }: HomeClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Load from client storage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('designcraft_articles_v1');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setArticles(parsed.filter((a: Article) => a.published));
          }
        } catch (e) {
          console.warn('Error parsing stored articles:', e);
        }
      }
    }
  }, []);

  // Extract all categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ['TODAS', ...Array.from(set)];
  }, [articles]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        search === '' ||
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        selectedCategory === 'TODAS' || article.category === selectedCategory;

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
      {/* Ghost Watermark Ideogram (Like Veeps Japan / China cards) */}
      <div className="absolute top-16 left-6 pointer-events-none select-none text-[140px] font-mono font-bold leading-none text-[#111215]/[0.035] hidden xl:block">
        設計
      </div>
      <div className="absolute top-96 right-6 pointer-events-none select-none text-[140px] font-mono font-bold leading-none text-[#111215]/[0.035] hidden xl:block">
        構成
      </div>

      {/* Hero Section: In the soul of "Ornament is Crime" & "Titans of Mavericks" */}
      <section className="border-b border-[#D0D5DD] bg-[#FFFFFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            
            {/* Left Typographic Statement */}
            <div className="lg:col-span-8">
              {/* Top technical coordinates & squiggle */}
              <div className="flex items-center gap-4 mb-6 text-xs font-mono text-[#64748B]">
                <span className="text-[#111215] font-bold">〰〰</span>
                <span>VOL. 04</span>
                <span>/</span>
                <span>37.5005° N — 122.5239° W</span>
                <span>/</span>
                <span className="text-[#E63926] font-semibold">ORNAMENT IS CRIME</span>
              </div>

              {/* Monumental Modernist Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.98] text-[#111215] mb-6">
                Modernism &apos;26: <br />
                <span className="text-[#64748B] font-medium">Titans of the</span> Web Architecture.
              </h1>

              <p className="text-base sm:text-lg text-[#475569] font-sans max-w-2xl leading-relaxed mb-8">
                Um arquivo crítico dedicado à honestidade estrutural, tipografia internacional e sistemas visuais sem concessões. Eliminamos o ornamento cosmético para revelar a verdade material da interface.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                <Link
                  href="/manifesto"
                  className="px-5 py-3 bg-[#111215] text-white rounded-sm hover:bg-[#E63926] transition-colors flex items-center gap-2 font-semibold uppercase tracking-wider"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Ler o Manifesto</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/admin"
                  className="px-5 py-3 bg-[#FFFFFF] border border-[#D0D5DD] hover:border-[#111215] text-[#111215] rounded-sm transition-colors flex items-center gap-2 font-medium uppercase tracking-wider"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Painel CMS</span>
                </Link>
              </div>
            </div>

            {/* Right Technical Specification Block (Airskin / Veeps inspiration) */}
            <div className="lg:col-span-4 bg-[#F8F9FA] border border-[#D0D5DD] p-6 rounded-sm font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[#D0D5DD] pb-3 mb-4 text-[#64748B]">
                <span className="font-bold text-[#111215] uppercase tracking-wider">
                  SYSTEM SPECIFICATIONS
                </span>
                <span className="text-[10px] text-[#E63926] font-semibold">CALIBRATED</span>
              </div>
              <div className="space-y-3 text-[#334155]">
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="text-[#64748B]">ARTIGOS REGISTRADOS:</span>
                  <span className="font-bold text-[#111215]">{articles.length}</span>
                </div>
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="text-[#64748B]">CATEGORIAS:</span>
                  <span className="font-bold text-[#111215]">{categories.length - 1}</span>
                </div>
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="text-[#64748B]">DIVISÕES:</span>
                  <span className="font-bold text-[#111215]">1.0 PX HAIRLINE</span>
                </div>
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="text-[#64748B]">RIGOR VISUAL:</span>
                  <span className="font-bold text-[#E63926]">INTERNATIONAL STYLE</span>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D0D5DD] flex justify-between items-center text-[10px] text-[#64748B]">
                <span>AIRSKIN® SPEC // REF-2026</span>
                <span className="w-4 h-4 rounded-full border border-[#D0D5DD] flex items-center justify-center font-serif text-[10px] text-[#111215]">
                  A
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full" id="artigos">
        {/* Search & Filter Bar (Veeps / Swiss Tabular Style) */}
        <section className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm p-4 sm:p-6 mb-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Minimal Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="BUSCAR NO ARQUIVO: TÍTULO, AUTOR, COORDENADA..."
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
              FILTRAR POR:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 font-mono text-xs rounded-sm border transition-all uppercase ${
                  selectedCategory === cat
                    ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                    : 'bg-[#F8F9FA] text-[#64748B] border-[#D0D5DD] hover:border-[#111215] hover:text-[#111215]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Showcase (When no active search/category filter) */}
        {!search && selectedCategory === 'TODAS' && featuredArticle && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#64748B]">
              <span className="font-bold text-[#111215] uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63926]" />
                ENSAIO MONUMENTAL // EDIÇÃO EM FOCO
              </span>
              <span>REF-2026</span>
            </div>
            <ArticleCard article={featuredArticle} featured={true} />
          </section>
        )}

        {/* Article Listing */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-[#D0D5DD] pb-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111215]">
              {search || selectedCategory !== 'TODAS'
                ? `Resultados do Filtro (${nonFeaturedArticles.length})`
                : `Arquivo Completo de Ensaios (${nonFeaturedArticles.length})`}
            </h2>
            <span className="font-mono text-[11px] text-[#64748B]">
              INDEX: 01—{nonFeaturedArticles.length.toString().padStart(2, '0')}
            </span>
          </div>

          {nonFeaturedArticles.length === 0 ? (
            <div className="border border-[#D0D5DD] bg-white p-12 text-center rounded-sm">
              <p className="font-mono text-sm text-[#64748B] mb-4">
                Nenhum ensaio corresponde aos filtros selecionados.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('TODAS');
                }}
                className="px-4 py-2 bg-[#111215] text-white rounded-sm font-mono text-xs uppercase"
              >
                Limpar Filtros
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonFeaturedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            /* Technical Tabular View (Veeps Style) */
            <div className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FA] text-[#64748B] border-b border-[#D0D5DD]">
                    <th className="p-3.5 font-medium">DATA</th>
                    <th className="p-3.5 font-medium">CATEGORIA</th>
                    <th className="p-3.5 font-medium">TÍTULO DO ENSAIO</th>
                    <th className="p-3.5 font-medium">AUTOR</th>
                    <th className="p-3.5 font-medium">TEMPO</th>
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
                        <span className="text-[#111215] font-semibold text-[11px]">
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
                      <td className="p-3.5 whitespace-nowrap text-[#64748B]">
                        {article.author.name}
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-[#64748B]">
                        {article.readingTimeMinutes} min
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <Link
                          href={`/article/?slug=${article.slug}`}
                          className="px-2.5 py-1 bg-[#F1F5F9] hover:bg-[#111215] hover:text-white rounded-sm text-[11px] font-semibold inline-flex items-center gap-1 transition-colors"
                        >
                          <span>LER</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Minimalist Dispatch Banner (Swiss Monograph) */}
        <section className="mt-16 border border-[#D0D5DD] bg-[#FFFFFF] p-8 sm:p-12 rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="font-mono text-xs text-[#E63926] font-semibold tracking-widest uppercase mb-2 block">
                DISPATCH // ASSINATURA EDITORIAL
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111215] leading-tight mb-3">
                Receba ensaios críticos sobre arquitetura visual e tipografia.
              </h3>
              <p className="text-[#64748B] font-sans text-sm sm:text-base leading-relaxed max-w-xl">
                Sem rastreadores ou e-mails promocionais. Enviamos uma análise técnica selecionada por mês.
              </p>
            </div>
            <div className="md:col-span-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Inscrição confirmada no arquivo DesignCraft.');
                }}
                className="space-y-3 font-mono text-xs"
              >
                <input
                  type="email"
                  required
                  placeholder="seu.email@dominio.com"
                  className="w-full p-3 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm text-[#111215] font-medium placeholder:text-[#94A3B8] focus:outline-none focus:border-[#111215] focus:bg-white"
                />
                <button
                  type="submit"
                  className="w-full p-3 bg-[#111215] text-white rounded-sm font-semibold uppercase tracking-wider hover:bg-[#E63926] transition-colors"
                >
                  Subscrever Ensaio
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
