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
      <div className="min-h-screen bg-[#E9ECEF] p-12 flex items-center justify-center font-mono">
        <div className="border border-[#D0D5DD] bg-white p-6 rounded-sm text-xs text-[#64748B]">
          CARREGANDO DOCUMENTO...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#E9ECEF] p-12 flex items-center justify-center font-mono">
        <div className="border border-[#D0D5DD] bg-white p-8 rounded-sm text-center max-w-md shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <h2 className="text-xl font-bold tracking-tight text-[#111215] mb-2">
            Documento Não Encontrado
          </h2>
          <p className="text-xs text-[#64748B] mb-6">
            O identificador fornecido não corresponde a nenhum ensaio registrado no catálogo.
          </p>
          <Link
            href="/admin"
            className="px-4 py-2 bg-[#111215] text-white hover:bg-[#E63926] rounded-sm font-semibold text-xs uppercase tracking-wider transition-colors inline-block"
          >
            Voltar ao CMS
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
        <div className="min-h-screen bg-[#E9ECEF] p-12 flex items-center justify-center font-mono">
          <div className="border border-[#D0D5DD] bg-white p-6 rounded-sm text-xs text-[#64748B]">
            CARREGANDO EDITOR...
          </div>
        </div>
      }
    >
      <EditArticleLoader />
    </Suspense>
  );
}
