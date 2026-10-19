import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category?: string;
  tags?: string[];
  image?: string;
  content: string;
  readingTime?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

function listMarkdownFiles(): string[] {
  try {
    return fs
      .readdirSync(CONTENT_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

function readMarkdown(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    author: String(data.author ?? 'CORE BOLT'),
    category: data.category ? String(data.category) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    image: data.image ? String(data.image) : undefined,
    content,
    metaTitle: data.metaTitle ? String(data.metaTitle) : undefined,
    metaDescription: data.metaDescription
      ? String(data.metaDescription)
      : undefined,
    metaKeywords: data.metaKeywords ? String(data.metaKeywords) : undefined,
  };
}

/** All blog posts from markdown, newest first. */
export function getAllBlogPosts(): BlogPost[] {
  const posts = listMarkdownFiles()
    .map((slug) => readMarkdown(slug))
    .filter((p): p is BlogPost => p !== null);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return readMarkdown(slug);
}

/** Async alias used by App Router pages. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  return getAllBlogPosts();
}
