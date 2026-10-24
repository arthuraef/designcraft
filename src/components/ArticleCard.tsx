import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import BrutalistCover from './BrutalistCover';
import { ArrowUpRight, Play, Eye, Heart, Clock } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'RASCUNHO';

  // Structured topic tags as technical schedule lines
  const topics = [
    { label: '01', name: article.tags[0] || 'Modernismo' },
    { label: '02', name: article.tags[1] || 'Arquitetura' },
    { label: '03', name: article.tags[2] || 'Tipografia' },
  ];

  if (featured) {
    return (
      <article className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm mb-12 overflow-hidden hover:border-[#111215] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.03)] group">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Visual & Overview */}
          <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D0D5DD]">
            <BrutalistCover
              title={article.title}
              category={article.category}
              color={article.coverColor}
              pattern={article.coverPattern}
              image={article.coverImage}
              className="h-72 sm:h-96 w-full"
            />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 font-mono text-xs text-[#64748B] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63926]" />
                <span className="text-[#E63926] font-bold tracking-widest uppercase">
                  DESTAQUE EDITORIAL
                </span>
                <span>/</span>
                <span>{article.readingTimeMinutes} MIN LEITURA</span>
              </div>
              <Link href={`/article/?slug=${article.slug}`}>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111215] leading-[1.05] hover:text-[#E63926] transition-colors mb-4">
                  {article.title}
                </h2>
              </Link>
              <p className="text-[#475569] font-sans text-sm sm:text-base leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>
          </div>

          {/* Right Column: Veeps-Inspired Tabular Technical Index */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#F8F9FA]">
            <div>
              {/* Tabular Header */}
              <div className="p-4 sm:p-6 border-b border-[#D0D5DD] flex justify-between items-center font-mono text-xs text-[#64748B]">
                <span className="font-semibold text-[#111215] uppercase tracking-wider">
                  SPECIFICATION INDEX
                </span>
                <span>{formattedDate}</span>
              </div>

              {/* Sub-rows like Tour Dates in Veeps */}
              <div className="divide-y divide-[#D0D5DD]">
                <div className="p-4 sm:p-6 flex items-start justify-between bg-[#FFFFFF]">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[#E63926] font-bold tracking-wider pt-0.5">
                      NOW
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-[#111215] tracking-tight">
                        {article.category}
                      </h4>
                      <p className="text-xs font-mono text-[#64748B] mt-0.5">
                        FONTE: {article.sourceName || article.author.name}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/article/?slug=${article.slug}`}
                    className="w-8 h-8 rounded-sm bg-[#E9ECEF] group-hover:bg-[#E63926] group-hover:text-white flex items-center justify-center transition-colors text-[#111215]"
                    title="Ler agora"
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </Link>
                </div>

                {topics.map((t) => (
                  <div
                    key={t.label}
                    className="p-4 sm:p-5 flex items-center justify-between font-mono text-xs"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[#94A3B8]">{t.label}</span>
                      <span className="font-medium text-[#334155]">{t.name}</span>
                    </div>
                    <span className="text-[10px] text-[#94A3B8]">07:00 AM</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 sm:p-6 border-t border-[#D0D5DD] bg-[#FFFFFF] flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-4 text-[#64748B] text-[11px]">
                <span className="flex items-center gap-1 font-semibold text-[#111215]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E63926]" />
                  ED. 07:00 AM
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[#E63926]" />
                  {article.likes || 0}
                </span>
              </div>
              <Link
                href={`/article/?slug=${article.slug}`}
                className="px-4 py-2 bg-[#111215] text-white rounded-sm hover:bg-[#E63926] transition-colors flex items-center gap-2 font-medium uppercase tracking-wider"
              >
                <span>Acessar Notícia</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Feed Card
  return (
    <article className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm flex flex-col justify-between h-full hover:border-[#111215] transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] group">
      <div>
        <BrutalistCover
          title={article.title}
          category={article.category}
          color={article.coverColor}
          pattern={article.coverPattern}
          image={article.coverImage}
          className="h-48 w-full"
        />

        {/* Technical Header Row */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-[#64748B] mb-2 pb-2 border-b border-[#E2E8F0]">
            <span className="flex items-center gap-1 text-[#111215] font-semibold">
              <span className="w-1 h-1 rounded-full bg-[#E63926]" />
              {article.category}
            </span>
            <span>{formattedDate}</span>
          </div>

          <Link href={`/article/?slug=${article.slug}`}>
            <h3 className="text-lg font-bold tracking-tight text-[#111215] leading-snug hover:text-[#E63926] transition-colors mb-2.5 line-clamp-2">
              {article.title}
            </h3>
          </Link>

          <p className="text-[#475569] text-xs leading-relaxed line-clamp-3 font-sans">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0">
        {/* Fine Technical Tag Row */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-[#64748B] bg-[#F1F5F9] border border-[#CBD5E1] px-2 py-0.5 rounded-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Tabular Bottom Action Row */}
        <div className="border-t border-[#D0D5DD] pt-3 flex items-center justify-between font-mono text-xs">
          <span className="flex items-center gap-1 text-[#64748B] text-[11px]">
            <Clock className="w-3 h-3 text-[#94A3B8]" />
            {article.readingTimeMinutes} MIN
          </span>

          <Link
            href={`/article/?slug=${article.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-[#111215] group-hover:text-[#E63926] transition-colors uppercase tracking-wider"
          >
            <span>Ler</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
