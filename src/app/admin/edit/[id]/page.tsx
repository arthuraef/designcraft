import { notFound } from 'next/navigation';
import { getArticleById } from '@/lib/articles';
import AdminArticleEditor from '@/components/AdminArticleEditor';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return { title: 'ARTIGO NÃO ENCONTRADO /// CMS' };
  }

  return {
    title: `EDITAR: ${article.title} /// CMS DESIGNCRAFT`,
  };
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return <AdminArticleEditor initialData={article} isEdit={true} />;
}
