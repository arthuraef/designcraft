export interface Author {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export type NewsCategory = 
  | 'UX Design'
  | 'Tecnologia'
  | 'AI'
  | 'Games'
  | 'Board Games'
  | 'Ciência';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: Author;
  coverImage?: string;
  coverColor: string; // Hex color for brutalist accent
  coverPattern?: 'grid' | 'stripes' | 'dots' | 'blocks';
  published: boolean;
  featured: boolean;
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  sourceName?: string;
  sourceUrl?: string;
  editionDate?: string;
}

export type ArticleInput = Omit<Article, 'id' | 'views' | 'likes' | 'publishedAt' | 'updatedAt' | 'readingTimeMinutes'> & {
  readingTimeMinutes?: number;
};

