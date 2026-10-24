import { Article } from '@/types/article';
import { SEED_ARTICLES } from '@/data/seed-articles';

export async function getAllArticles(includeDrafts = false): Promise<Article[]> {
  const filtered = includeDrafts ? SEED_ARTICLES : SEED_ARTICLES.filter(a => a.published);
  return [...filtered].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return SEED_ARTICLES.find(a => a.slug === slug) || null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  return SEED_ARTICLES.find(a => a.id === id) || null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const published = await getAllArticles();
  return published.filter(a => a.featured);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const published = await getAllArticles();
  return published.filter(a => a.category.toLowerCase() === category.toLowerCase());
}

export async function getAllCategories(): Promise<string[]> {
  return ['UX Design', 'Tecnologia', 'AI', 'Games', 'Board Games', 'Ciência'];
}
