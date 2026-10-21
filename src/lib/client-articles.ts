import { Article, ArticleInput } from '@/types/article';
import { SEED_ARTICLES } from '@/data/seed-articles';

const STORAGE_KEY = 'designcraft_articles_v1';

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

export function getStoredArticles(): Article[] {
  if (typeof window === 'undefined') {
    return SEED_ARTICLES;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ARTICLES));
      return SEED_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ARTICLES));
    return SEED_ARTICLES;
  } catch (e) {
    console.warn('Failed to read localStorage, falling back to seeds:', e);
    return SEED_ARTICLES;
  }
}

export function saveStoredArticles(articles: Article[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
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

export function createStoredArticle(input: ArticleInput): Article {
  const articles = getStoredArticles();
  const now = new Date().toISOString();

  let slug = input.slug ? generateSlug(input.slug) : generateSlug(input.title);
  if (articles.some((a) => a.slug === slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const readingTime =
    input.readingTimeMinutes || calculateReadingTime(input.content);

  const newArticle: Article = {
    ...input,
    id: `art-${Date.now().toString(36)}`,
    slug,
    readingTimeMinutes: readingTime,
    publishedAt: input.published ? now : '',
    updatedAt: now,
    views: 0,
    likes: 0,
    coverColor: input.coverColor || '#FFE600',
    coverPattern: input.coverPattern || 'stripes',
  };

  const updated = [newArticle, ...articles];
  saveStoredArticles(updated);
  return newArticle;
}

export function updateStoredArticle(
  id: string,
  input: Partial<ArticleInput> & { published?: boolean }
): Article | null {
  const articles = getStoredArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const current = articles[index];
  const now = new Date().toISOString();

  let slug = current.slug;
  if (input.slug && input.slug !== current.slug) {
    slug = generateSlug(input.slug);
  } else if (!current.slug && input.title) {
    slug = generateSlug(input.title);
  }

  const content = input.content !== undefined ? input.content : current.content;
  const readingTime =
    input.readingTimeMinutes || calculateReadingTime(content);

  const updated: Article = {
    ...current,
    ...input,
    slug,
    content,
    readingTimeMinutes: readingTime,
    updatedAt: now,
    publishedAt:
      input.published && !current.publishedAt
        ? now
        : current.publishedAt || (input.published ? now : ''),
  };

  articles[index] = updated;
  saveStoredArticles(articles);
  return updated;
}

export function deleteStoredArticle(id: string): boolean {
  const articles = getStoredArticles();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length === articles.length) return false;
  saveStoredArticles(filtered);
  return true;
}

export function toggleStoredArticlePublish(id: string): Article | null {
  const articles = getStoredArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const current = articles[index];
  const willPublish = !current.published;
  const updated: Article = {
    ...current,
    published: willPublish,
    publishedAt: willPublish && !current.publishedAt ? new Date().toISOString() : current.publishedAt,
    updatedAt: new Date().toISOString(),
  };

  articles[index] = updated;
  saveStoredArticles(articles);
  return updated;
}

export function likeStoredArticle(id: string): number {
  const articles = getStoredArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return 0;

  articles[index].likes = (articles[index].likes || 0) + 1;
  saveStoredArticles(articles);
  return articles[index].likes;
}

export function resetStoredArticlesToSeeds(): Article[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ARTICLES));
  }
  return SEED_ARTICLES;
}
