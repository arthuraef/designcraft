'use client';

import React, { useState, useMemo } from 'react';
import { Article } from '@/types/article';
import ArticleCard from '@/components/ArticleCard';
import MarqueeTicker from '@/components/MarqueeTicker';
import { Search, Filter, Sparkles, BookOpen, Layers, Terminal, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HomeClientProps {
  initialArticles: Article[];
}

export default function HomeClient({ initialArticles }: HomeClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Extract all categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialArticles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ['TODAS', ...Array.from(set)];
  }, [initialArticles]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesSearch =
        search === '' ||
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        selectedCategory === 'TODAS' || article.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [initialArticles, search, selectedCategory]);

  const featuredArticle = useMemo(() => {
    return initialArticles.find((a) => a.featured) || initialArticles[0];
  }, [initialArticles]);

  const nonFeaturedArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;
    // If user is searching or filtering, display all matches in the grid
    if (search || selectedCategory !== 'TODAS') {
      return filteredArticles;
    }
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle, search, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section className="bg-black text-white border-b-4 border-black relative overflow-hidden">
        {/* Subtle decorative hazard bar */}
        <div className="h-2 hazard-stripes" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-[#FFE600] text-black px-3 py-1 font-mono text-xs font-black uppercase mb-4 border border-white">
                <span>VOL. 04</span>
                <span>///</span>
                <span>MANIFESTO & CRÍTICA DE INTERFACES</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                CONTRA A <span className="text-[#FFE600] underline decoration-4 underline-offset-8">PASTEURIZAÇÃO</span> DO DESIGN DIGITAL.
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 font-sans max-w-2xl leading-relaxed mb-8">
                Um arquivo aberto de artigos, manifestos e análises técnicas sobre honestidade estrutural, tipografia agressiva, design systems e o resgate da textura na web.
              </p>

              <div className="flex flex-wrap gap-4 font-mono">
                <Link
                  href="/manifesto"
                  className="btn-brutal bg-[#FFE600] text-black px-6 py-3 font-black text-sm flex items-center gap-2 hover:bg-white"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>LER O MANIFESTO</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/admin"
                  className="btn-brutal bg-zinc-800 text-white border-white px-6 py-3 font-bold text-sm flex items-center gap-2 hover:bg-[#00E575] hover:text-black hover:border-black"
                >
                  <Terminal className="w-4 h-4" />
                  <span>ACESSAR CMS</span>
                </Link>
              </div>
            </div>

            {/* Brutalist Hero Graphic / Spec Box */}
            <div className="lg:col-span-4 bg-zinc-900 border-4 border-white p-6 font-mono text-xs shadow-brutal">
              <div className="flex items-center justify-between border-b-2 border-zinc-700 pb-3 mb-4">
                <span className="text-[#FFE600] font-black uppercase tracking-wider">REGISTRO DO SISTEMA</span>
                <span className="text-zinc-400">STATUS: ATIVO</span>
              </div>
              <div className="space-y-3 text-zinc-300">
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span className="text-zinc-500">ARTIGOS PUBLICADOS:</span>
                  <span className="font-bold text-white">{initialArticles.length}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span className="text-zinc-500">CATEGORIAS:</span>
                  <span className="font-bold text-white">{categories.length - 1}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span className="text-zinc-500">BLUR EM SOMBRAS:</span>
                  <span className="font-bold text-[#FF4400]">0.00 PX</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span className="text-zinc-500">ESTÉTICA:</span>
                  <span className="font-bold text-[#00E575]">BÉTON BRUT</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-zinc-700 text-center">
                <span className="block text-[10px] text-zinc-400 uppercase">
                  NENHUM COOKIE RASTREADOR. APENAS DESIGN CRU.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <MarqueeTicker />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full" id="artigos">
        {/* Search & Filter Toolbar */}
        <section className="border-brutal bg-white p-4 sm:p-6 shadow-brutal mb-10">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="BUSCAR ENSAIOS, TEORIAS, PALAVRAS-CHAVE..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F4F4F0] border-2 border-black font-mono text-sm font-bold text-black placeholder:text-black/50 focus:outline-none focus:bg-[#FFE600]/30 focus:border-black"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs font-black bg-black text-white px-1.5 py-0.5"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Compact/Grid Toggle */}
            <div className="flex items-center gap-2 font-mono text-xs font-bold">
              <span className="text-black/60 hidden sm:inline">VISUALIZAÇÃO:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 border-2 border-black uppercase ${
                  viewMode === 'grid' ? 'bg-black text-white' : 'bg-white hover:bg-zinc-100'
                }`}
              >
                Grelha
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-2 border-2 border-black uppercase ${
                  viewMode === 'compact' ? 'bg-black text-white' : 'bg-white hover:bg-zinc-100'
                }`}
              >
                Tabela
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="mt-4 pt-4 border-t-2 border-black flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-black text-black mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> FILTRAR:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 font-mono text-xs font-bold uppercase border-2 border-black transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-[#FFE600] shadow-brutal-sm'
                    : 'bg-white text-black hover:bg-[#FFE600]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Article (When no active search/category filter) */}
        {!search && selectedCategory === 'TODAS' && featuredArticle && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-sm font-black uppercase tracking-wider bg-black text-white px-3 py-1 inline-block border-2 border-black">
                /// EDIÇÃO PRINCIPAL EM FOCO
              </h2>
            </div>
            <ArticleCard article={featuredArticle} featured={true} />
          </section>
        )}

        {/* Article Listing */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b-4 border-black pb-2">
            <h2 className="font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
              {search || selectedCategory !== 'TODAS'
                ? `RESULTADOS (${nonFeaturedArticles.length})`
                : `TODOS OS ENSAIOS (${nonFeaturedArticles.length})`}
            </h2>
            <span className="font-mono text-xs font-bold bg-[#FFE600] border-2 border-black px-2 py-1">
              ARQUIVO COMPLETO
            </span>
          </div>

          {nonFeaturedArticles.length === 0 ? (
            <div className="border-brutal bg-white p-12 text-center shadow-brutal">
              <p className="font-mono text-lg font-bold uppercase mb-4 text-black">
                Nenhum artigo encontrado com os filtros atuais.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('TODAS');
                }}
                className="btn-brutal bg-[#FFE600] text-black px-4 py-2 font-mono text-xs"
              >
                LIMPAR FILTROS
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {nonFeaturedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            /* Compact / Table View */
            <div className="border-brutal bg-white shadow-brutal overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-black text-white border-b-2 border-black">
                    <th className="p-3">DATA</th>
                    <th className="p-3">CATEGORIA</th>
                    <th className="p-3">TÍTULO DO ARTIGO</th>
                    <th className="p-3">AUTOR</th>
                    <th className="p-3">TEMPO</th>
                    <th className="p-3 text-right">AÇÃO</th>
                  </tr>
                </thead>
                <tbody>
                  {nonFeaturedArticles.map((article, index) => (
                    <tr
                      key={article.id}
                      className={`border-b-2 border-black hover:bg-[#FFE600]/30 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#F4F4F0]'
                      }`}
                    >
                      <td className="p-3 font-bold whitespace-nowrap">
                        {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-3 font-black whitespace-nowrap">
                        <span className="bg-black text-white px-2 py-0.5">
                          {article.category}
                        </span>
                      </td>
                      <td className="p-3 font-black text-sm">
                        <Link
                          href={`/article/${article.slug}`}
                          className="hover:underline hover:text-[#0029FF]"
                        >
                          {article.title}
                        </Link>
                      </td>
                      <td className="p-3 whitespace-nowrap font-bold">
                        {article.author.name}
                      </td>
                      <td className="p-3 whitespace-nowrap font-bold">
                        {article.readingTimeMinutes} MIN
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <Link
                          href={`/article/${article.slug}`}
                          className="btn-brutal bg-[#FFE600] px-2.5 py-1 text-[11px] inline-block"
                        >
                          LER →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Brutalist Newsletter / Manifesto box */}
        <section className="mt-16 border-brutal bg-[#FFE600] p-8 sm:p-12 shadow-brutal-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="font-mono text-xs font-black bg-black text-[#FFE600] px-2 py-0.5 uppercase mb-3 inline-block">
                RADICAL DISPATCH
              </span>
              <h3 className="text-3xl sm:text-5xl font-black uppercase text-black tracking-tight leading-none mb-4">
                RECEBA CRÍTICAS SEM FILTRO NO SEU TERMINAL OU E-MAIL.
              </h3>
              <p className="text-black font-sans text-base sm:text-lg max-w-xl font-medium">
                Sem spam. Sem automação de engajamento agressiva. Enviamos ensaios profundos sobre tipografia e arquitetura web uma vez por mês.
              </p>
            </div>
            <div className="md:col-span-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('INSCRIÇÃO CONFIRMADA NO ARQUIVO DESIGNCRAFT.');
                }}
                className="space-y-3 font-mono"
              >
                <input
                  type="email"
                  required
                  placeholder="seu.email@dominio.com"
                  className="w-full p-3 bg-white border-3 border-black text-black font-bold placeholder:text-black/50 focus:outline-none shadow-brutal-sm"
                />
                <button
                  type="submit"
                  className="w-full btn-brutal bg-black text-white p-3 font-black uppercase hover:bg-white hover:text-black hover:border-black"
                >
                  SUBSCREVER AGORA
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
