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
      // Match patterns like /designcraft/article/<slug>/ or /article/<slug>/
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
      <div className="min-h-screen bg-[#F4F4F0] p-12 flex items-center justify-center font-mono">
        <div className="border-brutal bg-white p-6 shadow-brutal font-bold text-black">
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
    <div className="min-h-screen bg-[#F4F4F0] py-16 px-4 font-mono flex items-center justify-center">
      <div className="max-w-xl w-full border-brutal bg-white p-8 sm:p-12 shadow-brutal-lg text-black">
        <div className="inline-block bg-[#FF4400] text-white px-2.5 py-1 text-xs font-black uppercase mb-4">
          ERRO 404 /// DOCUMENTO NÃO ENCONTRADO
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 leading-none">
          OBJETO NÃO REGISTRADO
        </h1>
        <p className="font-sans text-base sm:text-lg text-black/80 mb-6 leading-relaxed">
          {attemptedSlug ? (
            <>
              O ensaio com slug{' '}
              <code className="bg-black text-[#FFE600] px-1.5 py-0.5 font-mono text-sm">
                /{attemptedSlug}
              </code>{' '}
              não foi localizado no armazenamento deste navegador.
            </>
          ) : (
            'O endereço solicitado não corresponde a nenhuma rota ou documento do DesignCraft.'
          )}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="btn-brutal bg-[#FFE600] text-black px-4 py-2 font-bold text-xs flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETORNAR AO INÍCIO</span>
          </Link>
          <Link
            href="/admin"
            className="btn-brutal bg-black text-white px-4 py-2 font-bold text-xs"
          >
            ABRIR CMS / ADMIN
          </Link>
        </div>
      </div>
    </div>
  );
}
