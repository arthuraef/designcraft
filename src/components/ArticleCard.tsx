import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import BrutalistCover from './BrutalistCover';
import { ArrowUpRight, Clock, Eye, Heart } from 'lucide-react';

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

  if (featured) {
    return (
      <article className="border-brutal bg-white shadow-brutal-lg card-brutal-interactive mb-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Cover section */}
          <div className="lg:col-span-7">
            <BrutalistCover
              title={article.title}
              category={article.category}
              color={article.coverColor}
              pattern={article.coverPattern}
              image={article.coverImage}
              className="h-72 sm:h-96 w-full"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-t-4 lg:border-t-0 lg:border-l-4 border-black bg-white">
            <div>
              <div className="flex items-center gap-2 mb-4 font-mono text-xs font-black">
                <span className="bg-[#FF4400] text-white px-2.5 py-1 uppercase tracking-wider border border-black shadow-brutal-sm">
                  ★ DESTAQUE EDITORIAL
                </span>
                <span className="text-black/70">• {article.readingTimeMinutes} MIN LEITURA</span>
              </div>

              <Link href={`/article/?slug=${article.slug}`}>
                <h2 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight leading-none hover:text-[#0029FF] transition-colors mb-4">
                  {article.title}
                </h2>
              </Link>

              <p className="text-black/80 font-sans text-base sm:text-lg mb-6 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs bg-[#F4F4F0] border-2 border-black px-2 py-0.5 font-bold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-black pt-4 flex items-center justify-between font-mono text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-none border-2 border-black bg-[#FFE600] flex items-center justify-center font-black">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <span className="block text-black uppercase">{article.author.name}</span>
                  <span className="text-black/60 text-[10px]">{formattedDate}</span>
                </div>
              </div>

              <Link
                href={`/article/?slug=${article.slug}`}
                className="btn-brutal bg-[#FFE600] px-4 py-2 flex items-center gap-1.5 text-black hover:bg-black hover:text-white"
              >
                <span>LER ENSAIO</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="border-brutal bg-white shadow-brutal card-brutal-interactive flex flex-col justify-between h-full">
      <div>
        <BrutalistCover
          title={article.title}
          category={article.category}
          color={article.coverColor}
          pattern={article.coverPattern}
          image={article.coverImage}
          className="h-48 w-full"
        />

        <div className="p-5">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-black/70 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-black" />
              {article.readingTimeMinutes} MIN
            </span>
            <span>{formattedDate}</span>
          </div>

          <Link href={`/article/?slug=${article.slug}`}>
            <h3 className="text-xl font-black text-black uppercase tracking-tight leading-tight hover:text-[#0029FF] transition-colors mb-3 line-clamp-2">
              {article.title}
            </h3>
          </Link>

          <p className="text-black/80 text-sm leading-normal line-clamp-3 mb-4 font-sans">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] bg-[#F4F4F0] border border-black px-1.5 py-0.5 font-bold"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="border-t-2 border-black pt-3 flex items-center justify-between font-mono text-xs font-bold">
          <div className="flex items-center gap-3 text-black/60 text-[11px]">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-[#FF4400]" />
              {article.likes || 0}
            </span>
          </div>

          <Link
            href={`/article/?slug=${article.slug}`}
            className="btn-brutal bg-white px-3 py-1.5 flex items-center gap-1 text-black hover:bg-[#FFE600]"
          >
            <span>LER</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
