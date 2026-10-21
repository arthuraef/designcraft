'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import BrutalistCover from '@/components/BrutalistCover';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { likeStoredArticle } from '@/lib/client-articles';
import {
  ArrowLeft,
  Share2,
  Heart,
  Eye,
  Clock,
  Printer,
  Check,
  Tag,
  ArrowRight,
  Bookmark,
} from 'lucide-react';

interface ArticleDetailClientProps {
  article: Article;
  prevArticle: Article | null;
  nextArticle: Article | null;
}

export default function ArticleDetailClient({
  article,
  prevArticle,
  nextArticle,
}: ArticleDetailClientProps) {
  const [likes, setLikes] = useState(article.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : 'RASCUNHO';

  const handleLike = () => {
    if (hasLiked) return;
    const updatedLikes = likeStoredArticle(article.id);
    setLikes(updatedLikes || likes + 1);
    setHasLiked(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation breadcrumb bar */}
        <div className="flex items-center justify-between font-mono text-xs font-bold mb-8 pb-4 border-b-2 border-black">
          <Link
            href="/"
            className="btn-brutal bg-white px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#FFE600] text-black"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>VOLTAR AO ARQUIVO</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="bg-black text-white px-2 py-1 uppercase">
              {article.category}
            </span>
            <span className="hidden sm:inline text-black/60">
              DOC_ID: {article.id}
            </span>
          </div>
        </div>

        {/* Article Header Card */}
        <header className="border-brutal bg-white p-6 sm:p-10 shadow-brutal-lg mb-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold mb-4">
            <span className="bg-[#FFE600] text-black border border-black px-2 py-0.5 uppercase">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-black/70">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTimeMinutes} MINUTOS DE LEITURA
            </span>
            <span className="text-black/50">•</span>
            <span className="text-black/70">{formattedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-black tracking-tighter leading-[0.95] mb-6">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-xl sm:text-2xl text-black font-sans font-medium leading-relaxed border-l-4 border-[#FF4400] pl-4 mb-8">
              {article.subtitle}
            </p>
          )}

          {/* Author bar & actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t-2 border-black font-mono">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-black bg-[#FFE600] flex items-center justify-center font-black text-lg">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <span className="block font-black text-sm text-black uppercase">
                  {article.author.name}
                </span>
                <span className="block text-xs text-black/70">
                  {article.author.role}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`btn-brutal px-3.5 py-1.5 text-xs flex items-center gap-1.5 ${
                  hasLiked
                    ? 'bg-[#FF4400] text-white'
                    : 'bg-white hover:bg-[#FFE600] text-black'
                }`}
                title="Apoiar este ensaio"
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>

              <button
                onClick={handleShare}
                className="btn-brutal bg-white hover:bg-[#FFE600] text-black px-3.5 py-1.5 text-xs flex items-center gap-1.5"
                title="Copiar link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00E575]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIADO' : 'COMPARTILHAR'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="btn-brutal bg-white hover:bg-black hover:text-white text-black px-3 py-1.5 text-xs hidden sm:flex items-center gap-1"
                title="Imprimir visualização brutalista"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Cover graphic */}
        <div className="border-brutal bg-white shadow-brutal mb-10 overflow-hidden">
          <BrutalistCover
            title={article.title}
            category={article.category}
            color={article.coverColor}
            pattern={article.coverPattern}
            image={article.coverImage}
            className="h-64 sm:h-96 w-full"
          />
        </div>

        {/* Main Reading Content */}
        <article className="border-brutal bg-white p-6 sm:p-12 shadow-brutal-lg mb-12">
          <MarkdownRenderer content={article.content} />

          {/* Tags */}
          <div className="mt-12 pt-6 border-t-4 border-black">
            <div className="flex items-center gap-2 mb-3 font-mono text-xs font-bold uppercase text-black">
              <Tag className="w-4 h-4" />
              <span>CLASSIFICAÇÃO METADADOS:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/?search=${encodeURIComponent(tag)}`}
                  className="btn-brutal bg-[#F4F4F0] hover:bg-[#FFE600] px-3 py-1 font-mono text-xs font-bold text-black"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Author Box Signature */}
          <div className="mt-10 border-2 border-black bg-[#FFE600] p-6 shadow-brutal">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 bg-black text-white flex items-center justify-center font-black text-2xl border-2 border-black font-mono">
                {article.author.name.charAt(0)}
              </div>
              <div className="flex-1">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black/70 block">
                  SOBRE QUEM ESCREVE
                </span>
                <h4 className="font-black text-lg text-black uppercase">
                  {article.author.name}
                </h4>
                <p className="font-sans text-sm text-black/90 mt-1">
                  {article.author.bio ||
                    'Pesquisador e designer dedicado a questionar interfaces convencionais e arquiteturas digitais corporativas.'}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Prev / Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
          {prevArticle ? (
            <Link
              href={`/article/${prevArticle.slug}`}
              className="border-brutal bg-white p-5 shadow-brutal card-brutal-interactive flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-black/60 flex items-center gap-1 mb-2">
                <ArrowLeft className="w-3.5 h-3.5" /> ENSAIO ANTERIOR
              </span>
              <h5 className="font-black text-sm uppercase text-black line-clamp-2">
                {prevArticle.title}
              </h5>
            </Link>
          ) : (
            <div className="border-2 border-dashed border-black/30 p-5 flex items-center justify-center text-xs text-black/40">
              INÍCIO DO ARQUIVO
            </div>
          )}

          {nextArticle ? (
            <Link
              href={`/article/${nextArticle.slug}`}
              className="border-brutal bg-white p-5 shadow-brutal card-brutal-interactive flex flex-col justify-between text-right"
            >
              <span className="text-xs font-bold text-black/60 flex items-center justify-end gap-1 mb-2">
                PRÓXIMO ENSAIO <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <h5 className="font-black text-sm uppercase text-black line-clamp-2">
                {nextArticle.title}
              </h5>
            </Link>
          ) : (
            <div className="border-2 border-dashed border-black/30 p-5 flex items-center justify-center text-xs text-black/40">
              FIM DO ARQUIVO
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
