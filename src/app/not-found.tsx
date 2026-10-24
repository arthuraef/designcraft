'use client';

import React, { useEffect, useState } from 'react';
import { Article } from '@/types/article';
import { getStoredArticleBySlug, getStoredArticles } from '@/lib/client-articles';
import ArticleDetailClient from '@/components/ArticleDetailClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const [article, setArticle] = useState<Article | null>(null);
  const [prevArticle, setPrevArticle] = useState<Article | null>(null);
  const [nextArticle, setNextArticle] = useState<Article | null>(null);
  const [checked, setChecked] = useState(false);
  const [attemptedSlug, setAttemptedSlug] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const match = pathname.match(/\/article\/([^/]+)/);
      if (match && match[1]) {
        const slug = decodeURIComponent(match[1]);
        setAttemptedSlug(slug);
        const found = getStoredArticleBySlug(slug);
        if (found) {
          setArticle(found);
          const all = getStoredArticles().filter((a) => a.published);
          const idx = all.findIndex((a) => a.id === found.id);
          if (idx > 0) setPrevArticle(all[idx - 1]);
          if (idx >= 0 && idx < all.length - 1) setNextArticle(all[idx + 1]);
        }
      }
      setChecked(true);
    }
  }, []);

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#E9ECEF] p-12 flex items-center justify-center font-mono">
        <div className="border border-[#D0D5DD] bg-white p-6 rounded-sm text-xs text-[#64748B]">
          CARREGANDO DOCUMENTO DO ARQUIVO...
        </div>
      </div>
    );
  }

  // If matched an article from client storage, render it directly!
  if (article) {
    return (
      <ArticleDetailClient
        article={article}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
      />
    );
  }

  // Otherwise, real 404
  return (
    <div className="min-h-screen bg-[#E9ECEF] py-16 px-4 font-mono flex items-center justify-center">
      <div className="max-w-xl w-full border border-[#D0D5DD] bg-white p-8 sm:p-12 rounded-sm text-[#111215] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 mb-4 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#E63926]" />
          <span className="text-[#E63926] font-semibold uppercase tracking-wider">
            ERRO 404 // DOCUMENTO NÃO LOCALIZADO
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Objeto Não Encontrado
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#475569] mb-6 leading-relaxed">
          {attemptedSlug ? (
            <>
              O ensaio com slug{' '}
              <code className="bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] px-1.5 py-0.5 font-mono text-xs rounded-sm">
                /{attemptedSlug}
              </code>{' '}
              não foi localizado no armazenamento do navegador nem no índice estático.
            </>
          ) : (
            'O endereço solicitado não corresponde a nenhuma rota registrada no Good Morning News.'
          )}
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
