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
  Clock,
  Printer,
  Check,
  Tag,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  SunMedium,
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
    : '07:00 AM';

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
    <div className="min-h-screen bg-[#E9ECEF] py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between font-mono text-xs text-[#64748B] mb-8 pb-4 border-b border-[#D0D5DD]">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#111215] hover:text-[#E63926] transition-colors font-medium uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar à Edição do Dia</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63926]" />
            <span className="text-[#111215] font-semibold uppercase">
              {article.category}
            </span>
            <span className="text-[#CBD5E1]">/</span>
            <span className="hidden sm:inline text-[#64748B]">
              ED. 07:00 AM
            </span>
          </div>
        </div>

        {/* Article Header Card */}
        <header className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm p-6 sm:p-10 mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#64748B] mb-4">
            <span className="font-semibold text-[#111215] uppercase tracking-wider flex items-center gap-1">
              <SunMedium className="w-3.5 h-3.5 text-[#E63926]" />
              {article.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTimeMinutes} MIN DE LEITURA
            </span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111215] leading-[1.02] mb-6">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-lg sm:text-xl text-[#475569] font-sans font-normal leading-relaxed border-l-2 border-[#E63926] pl-4 mb-8">
              {article.subtitle}
            </p>
          )}

          {/* Source origin badge & actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#E2E8F0] font-mono">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm border border-[#D0D5DD] bg-[#F8F9FA] flex items-center justify-center font-bold text-xs text-[#111215]">
                {article.sourceName ? article.sourceName.charAt(0) : 'G'}
              </div>
              <div>
                <span className="block font-bold text-xs text-[#111215] uppercase">
                  FONTE: {article.sourceName || article.author.name}
                </span>
                <span className="block text-[11px] text-[#64748B]">
                  CURADORIA: GOOD MORNING NEWS BOT (07:00 AM)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {article.sourceUrl && (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-sm border border-[#D0D5DD] bg-[#FFFFFF] hover:border-[#111215] hover:text-[#E63926] text-[#111215] text-xs flex items-center gap-1.5 transition-colors font-medium"
                  title="Abrir matéria original"
                >
                  <span>FONTE ORIGINAL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={handleLike}
                className={`px-3 py-1.5 rounded-sm border text-xs flex items-center gap-1.5 transition-colors ${
                  hasLiked
                    ? 'bg-[#E63926] text-white border-[#E63926]'
                    : 'bg-[#F8F9FA] border-[#D0D5DD] hover:border-[#111215] text-[#111215]'
                }`}
                title="Apoiar esta notícia"
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-sm border border-[#D0D5DD] bg-[#F8F9FA] hover:border-[#111215] text-[#111215] text-xs flex items-center gap-1.5 transition-colors"
                title="Copiar link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#E63926]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIADO' : 'COMPARTILHAR'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-2.5 py-1.5 rounded-sm border border-[#D0D5DD] bg-[#F8F9FA] hover:border-[#111215] text-[#111215] text-xs hidden sm:flex items-center gap-1 transition-colors"
                title="Imprimir"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Cover graphic */}
        <div className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm mb-10 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
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
        <article className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm p-6 sm:p-12 mb-12 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <MarkdownRenderer content={article.content} />

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-3 font-mono text-xs text-[#64748B] uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>METADADOS DO DOMÍNIO:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/?search=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 bg-[#F8F9FA] border border-[#CBD5E1] hover:border-[#111215] rounded-sm font-mono text-xs text-[#475569] hover:text-[#111215] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Curatorial Attribution Box */}
          <div className="mt-10 border border-[#D0D5DD] bg-[#F8F9FA] p-6 rounded-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm border border-[#D0D5DD] bg-white flex items-center justify-center font-bold text-lg text-[#111215] font-mono">
                  ☼
                </div>
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#64748B] block">
                    CHANCELA EDITORIAL // 07:00 AM
                  </span>
                  <h4 className="font-bold text-base text-[#111215] tracking-tight">
                    Good Morning News Bot
                  </h4>
                  <p className="font-sans text-xs text-[#475569] mt-0.5 leading-relaxed">
                    História selecionada pelo agente matinal a partir de {article.sourceName || 'redação de referência mundial'}.
                  </p>
                </div>
              </div>
              {article.sourceUrl && (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#111215] text-white hover:bg-[#E63926] rounded-sm font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors uppercase tracking-wider shrink-0"
                >
                  <span>Ler Matéria Original</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </article>

        {/* Prev / Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
          {prevArticle ? (
            <Link
              href={`/article/?slug=${prevArticle.slug}`}
              className="border border-[#D0D5DD] bg-[#FFFFFF] p-5 rounded-sm hover:border-[#111215] transition-all flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)] group"
            >
              <span className="text-[11px] text-[#64748B] flex items-center gap-1 mb-2 uppercase">
                <ArrowLeft className="w-3 h-3" /> HISTÓRIA ANTERIOR
              </span>
              <h5 className="font-bold text-sm text-[#111215] group-hover:text-[#E63926] transition-colors line-clamp-2">
                {prevArticle.title}
              </h5>
            </Link>
          ) : (
            <div className="border border-dashed border-[#D0D5DD] p-5 rounded-sm flex items-center justify-center text-xs text-[#94A3B8]">
              PRIMEIRA HISTÓRIA DA EDIÇÃO
            </div>
          )}

          {nextArticle ? (
            <Link
              href={`/article/?slug=${nextArticle.slug}`}
              className="border border-[#D0D5DD] bg-[#FFFFFF] p-5 rounded-sm hover:border-[#111215] transition-all flex flex-col justify-between text-right shadow-[0_1px_2px_rgba(0,0,0,0.02)] group"
            >
              <span className="text-[11px] text-[#64748B] flex items-center justify-end gap-1 mb-2 uppercase">
                PRÓXIMA HISTÓRIA <ArrowRight className="w-3 h-3" />
              </span>
              <h5 className="font-bold text-sm text-[#111215] group-hover:text-[#E63926] transition-colors line-clamp-2">
                {nextArticle.title}
              </h5>
            </Link>
          ) : (
            <div className="border border-dashed border-[#D0D5DD] p-5 rounded-sm flex items-center justify-center text-xs text-[#94A3B8]">
              ÚLTIMA HISTÓRIA DA EDIÇÃO
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
