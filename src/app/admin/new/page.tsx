import AdminArticleEditor from '@/components/AdminArticleEditor';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NOVO ARTIGO /// CMS DESIGNCRAFT',
  description: 'Criar e publicar um novo ensaio crítico sobre design.',
};

export default function NewArticlePage() {
  return <AdminArticleEditor isEdit={false} />;
}
