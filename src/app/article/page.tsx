'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Article } from '@/types/article';
import { getStoredArticleBySlug, getStoredArticles } from '@/lib/client-articles';
import ArticleDetailClient from '@/components/ArticleDetailClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function ArticleQueryLoader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get('slug');

  const [article, setArticle] = useState<Article | null>(null);
  const [prevArticle, setPrevArticle] = useState<Article | null>(null);
  const [nextArticle, setNextArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      router.push('/');
      return;
    }

    const found = getStoredArticleBySlug(slug);
    if (found) {
      setArticle(found);
      const all = getStoredArticles().filter((a) => a.published);
      const idx = all.findIndex((a) => a.id === found.id);
      if (idx > 0) setPrevArticle(all[idx - 1]);
      if (idx >= 0 && idx < all.length - 1) setNextArticle(all[idx + 1]);
    }
    setLoading(false);
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E9ECEF] p-12 flex items-center justify-center font-mono">
        <div className="border border-[#D0D5DD] bg-white p-6 rounded-sm text-xs text-[#64748B]">
          CARREGANDO DOCUMENTO...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#E9ECEF] py-16 px-4 font-mono flex items-center justify-center">
        <div className="max-w-xl w-full border border-[#D0D5DD] bg-white p-8 sm:p-12 rounded-sm text-[#111215] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 mb-4 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#E63926]" />
            <span className="text-[#E63926] font-semibold uppercase tracking-wider">
              ERRO 404 // DOCUMENTO NÃO ENCONTRADO
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Objeto Não Localizado
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#475569] mb-6 leading-relaxed">
            O ensaio com slug{' '}
            <code className="bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] px-1.5 py-0.5 font-mono text-xs rounded-sm">
              /{slug}
            </code>{' '}
            não foi localizado no armazenamento do navegador nem no índice estático.
          </p>
          <div className="flex flex-wrap gap-3 text-xs">
            <Link
              href="/"
              className="px-4 py-2.5 bg-[#111215] text-white hover:bg-[#E63926] rounded-sm font-semibold transition-colors flex items-center gap-1.5 uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Edição do Dia</span>
            </Link>
            <Link
              href="/manifesto"
              className="px-4 py-2.5 bg-[#F8F9FA] border border-[#D0D5DD] hover:border-[#111215] text-[#111215] rounded-sm font-medium transition-colors uppercase tracking-wider"
            >
              Ler Manifesto
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ArticleDetailClient
      article={article}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
    />
  );
}

export default function ArticleQueryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#E9ECEF] p-12 flex items-center justify-center font-mono">
          <div className="border border-[#D0D5DD] bg-white p-6 rounded-sm text-xs text-[#64748B]">
            CARREGANDO...
          </div>
        </div>
      }
    >
      <ArticleQueryLoader />
    </Suspense>
  );
}
