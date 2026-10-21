'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminArticleEditor from '@/components/AdminArticleEditor';
import { getStoredArticleById } from '@/lib/client-articles';
import { Article } from '@/types/article';
import Link from 'next/link';

function EditArticleLoader() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const found = getStoredArticleById(id);
      setArticle(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F0] p-12 flex items-center justify-center font-mono">
        <div className="border-brutal bg-white p-6 shadow-brutal font-bold">
          CARREGANDO ARTIGO...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F4F4F0] p-12 flex items-center justify-center font-mono">
        <div className="border-brutal bg-white p-8 shadow-brutal text-center max-w-md">
          <h2 className="text-xl font-black uppercase mb-4">Artigo Não Encontrado</h2>
          <p className="text-sm text-black/70 mb-6">
            O identificador fornecido não corresponde a nenhum ensaio registrado.
          </p>
          <Link href="/admin" className="btn-brutal bg-[#FFE600] px-4 py-2 font-bold text-xs">
            VOLTAR AO CMS
          </Link>
        </div>
      </div>
    );
  }

  return <AdminArticleEditor initialData={article} isEdit={true} />;
}

export default function EditArticlePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F4F0] p-12 flex items-center justify-center font-mono">
          <div className="border-brutal bg-white p-6 shadow-brutal font-bold">
            CARREGANDO EDITOR...
          </div>
        </div>
      }
    >
      <EditArticleLoader />
    </Suspense>
  );
}
