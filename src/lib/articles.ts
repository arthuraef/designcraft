import fs from 'fs/promises';
import path from 'path';
import { Article, ArticleInput } from '@/types/article';
import { SEED_ARTICLES } from '@/data/seed-articles';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'articles.json');

// In-memory fallback if disk write is ever constrained
let inMemoryArticles: Article[] | null = null;

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function ensureDataFile(): Promise<Article[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const content = await fs.readFile(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryArticles = parsed;
        return parsed;
      }
    } catch {
      // File doesn't exist or is invalid JSON
    }

    // Write initial seed
    await fs.writeFile(DATA_FILE, JSON.stringify(SEED_ARTICLES, null, 2), 'utf-8');
    inMemoryArticles = SEED_ARTICLES;
    return SEED_ARTICLES;
  } catch (error) {
    console.warn('Filesystem error, utilizing in-memory state:', error);
    if (!inMemoryArticles) {
      inMemoryArticles = [...SEED_ARTICLES];
    }
    return inMemoryArticles;
  }
}

async function writeDataFile(articles: Article[]): Promise<void> {
  inMemoryArticles = articles;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write data file to disk, relying on in-memory cache:', error);
  }
}

export async function getAllArticles(includeDrafts = false): Promise<Article[]> {
  const articles = await ensureDataFile();
  const filtered = includeDrafts ? articles : articles.filter(a => a.published);
  return [...filtered].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await ensureDataFile();
  return articles.find(a => a.slug === slug) || null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await ensureDataFile();
  return articles.find(a => a.id === id) || null;
}

export async function createArticle(input: ArticleInput): Promise<Article> {
  const articles = await ensureDataFile();
  const now = new Date().toISOString();
  
  let slug = input.slug ? generateSlug(input.slug) : generateSlug(input.title);
  // Ensure uniqueness
  const exists = articles.some(a => a.slug === slug);
  if (exists) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const readingTime = input.readingTimeMinutes || calculateReadingTime(input.content);

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
    coverPattern: input.coverPattern || 'stripes'
  };

  const updatedArticles = [newArticle, ...articles];
  await writeDataFile(updatedArticles);
  return newArticle;
}

export async function updateArticle(id: string, input: Partial<ArticleInput> & { published?: boolean }): Promise<Article | null> {
  const articles = await ensureDataFile();
  const index = articles.findIndex(a => a.id === id);
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
  const readingTime = input.readingTimeMinutes || calculateReadingTime(content);

  const updated: Article = {
    ...current,
    ...input,
    slug,
    content,
    readingTimeMinutes: readingTime,
    updatedAt: now,
    publishedAt: (input.published && !current.publishedAt) ? now : (current.publishedAt || (input.published ? now : ''))
  };

  articles[index] = updated;
  await writeDataFile(articles);
  return updated;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const articles = await ensureDataFile();
  const filtered = articles.filter(a => a.id !== id);
  if (filtered.length === articles.length) return false;
  await writeDataFile(filtered);
  return true;
}

export async function incrementArticleStats(id: string, type: 'view' | 'like'): Promise<Article | null> {
  const articles = await ensureDataFile();
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) return null;

  if (type === 'view') {
    articles[index].views = (articles[index].views || 0) + 1;
  } else if (type === 'like') {
    articles[index].likes = (articles[index].likes || 0) + 1;
  }

  await writeDataFile(articles);
  return articles[index];
}

export async function resetArticlesToSeed(): Promise<Article[]> {
  await writeDataFile(SEED_ARTICLES);
  return SEED_ARTICLES;
}
