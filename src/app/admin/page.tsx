import { getAllArticles } from '@/lib/articles';
import AdminDashboardClient from '@/components/AdminDashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ADMIN / CMS /// DESIGNCRAFT',
  description: 'Gerenciamento e publicação de artigos de design.',
};

export default async function AdminPage() {
  const articles = await getAllArticles(true); // include drafts

  return <AdminDashboardClient initialArticles={articles} />;
}
