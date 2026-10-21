import { getAllArticles } from '@/lib/articles';
import HomeClient from '@/components/HomeClient';

export default async function HomePage() {
  const articles = await getAllArticles(false);

  return <HomeClient initialArticles={articles} />;
}
