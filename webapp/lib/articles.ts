import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), '..', 'content');
const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles');
const SERIES_DIR = path.join(CONTENT_DIR, 'hacktricks-series');

export type Article = {
  slug: string;
  title: string;
  source: string;
  source_url: string;
  published_at: string;
  summary: string;
  hits: string;
  body: string;
  kind: 'feed' | 'series';
  category?: string;
};

function readMarkdownDir(dir: string, kind: 'feed' | 'series'): Article[] {
  if (!fs.existsSync(dir)) return [];
  const results: Article[] = [];

  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md')) {
        const raw = fs.readFileSync(full, 'utf8');
        const { data, content } = matter(raw);
        const slug = path.relative(dir, full).replace(/\\/g, '/').replace(/\.md$/, '');
        results.push({
          slug,
          title: data.title ?? slug,
          source: data.source ?? '',
          source_url: data.source_url ?? '',
          published_at: data.published_at ?? '',
          summary: data.summary ?? '',
          hits: data.hits ?? '',
          body: content,
          kind,
          category: data.category,
        });
      }
    }
  };

  walk(dir);
  return results.sort((a, b) => (b.published_at ?? '').localeCompare(a.published_at ?? ''));
}

export function getAllArticles(): Article[] {
  return [...readMarkdownDir(ARTICLES_DIR, 'feed'), ...readMarkdownDir(SERIES_DIR, 'series')]
    .sort((a, b) => (b.published_at ?? '').localeCompare(a.published_at ?? ''));
}

export function getArticleBySlug(kind: 'feed' | 'series', slug: string): Article | null {
  const all = readMarkdownDir(kind === 'feed' ? ARTICLES_DIR : SERIES_DIR, kind);
  return all.find((a) => a.slug === slug) ?? null;
}
