import { Article } from '@/types/article';
import { SEED_ARTICLES } from '@/data/seed-articles';

const LIKES_KEY = 'good_morning_news_likes_v1';

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Returns articles directly from the curated daily edition (SEED_ARTICLES),
 * augmented with local user interactions (likes).
 */
export function getStoredArticles(): Article[] {
  if (typeof window === 'undefined') {
    return SEED_ARTICLES;
  }

  try {
    const rawLikes = localStorage.getItem(LIKES_KEY);
    const likesMap: Record<string, number> = rawLikes ? JSON.parse(rawLikes) : {};
    return SEED_ARTICLES.map((article) => {
      const extraLikes = likesMap[article.id] || 0;
      return {
        ...article,
        likes: (article.likes || 0) + extraLikes,
      };
    });
  } catch (e) {
    console.warn('Error reading likes from localStorage:', e);
    return SEED_ARTICLES;
  }
}

export function getStoredArticleBySlug(slug: string): Article | null {
  const articles = getStoredArticles();
  return articles.find((a) => a.slug === slug) || null;
}

export function getStoredArticleById(id: string): Article | null {
  const articles = getStoredArticles();
  return articles.find((a) => a.id === id) || null;
}

export function likeStoredArticle(id: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const rawLikes = localStorage.getItem(LIKES_KEY);
    const likesMap: Record<string, number> = rawLikes ? JSON.parse(rawLikes) : {};
    likesMap[id] = (likesMap[id] || 0) + 1;
    localStorage.setItem(LIKES_KEY, JSON.stringify(likesMap));

    const base = SEED_ARTICLES.find((a) => a.id === id);
    return (base?.likes || 0) + likesMap[id];
  } catch (e) {
    console.error('Failed to like article:', e);
    return 0;
  }
}
