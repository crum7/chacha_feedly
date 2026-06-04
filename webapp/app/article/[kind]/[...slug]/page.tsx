import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Sidebar from '@/components/Sidebar';
import ArticleList from '@/components/ArticleList';
import FeedbackBar from '@/components/FeedbackBar';

export const dynamic = 'force-dynamic';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ kind: string; slug: string[] }>;
}) {
  const { kind: kindParam, slug: slugParam } = await params;
  const kind = kindParam === 'series' ? 'series' : 'feed';
  const slug = slugParam.join('/');
  const article = getArticleBySlug(kind, slug);
  if (!article) notFound();

  const all = getAllArticles();
  const sources = Array.from(new Set(all.map((a) => a.source))).sort();
  const counts = {
    all: all.length,
    feed: all.filter((a) => a.kind === 'feed').length,
    series: all.filter((a) => a.kind === 'series').length,
    bySource: sources.reduce<Record<string, number>>((acc, s) => {
      acc[s] = all.filter((a) => a.source === s).length;
      return acc;
    }, {}),
  };

  return (
    <div className="app">
      <Sidebar counts={counts} sources={sources} activeSource={article.source} />
      <ArticleList articles={all} title="すべての記事" />
      <div className="reader">
        <article className="reader-inner">
          <div className="reader-source">
            {article.kind === 'series' ? '📚 HackTricks連載' : `📡 ${article.source}`}
          </div>
          <h1>{article.title}</h1>
          <div className="reader-meta">
            {article.published_at && new Date(article.published_at).toLocaleString('ja-JP')}
          </div>

          <div className="reader-actions">
            {article.source_url && (
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary"
              >
                🔗 元記事を開く
              </a>
            )}
            <a href="/" className="btn">← 一覧に戻る</a>
          </div>

          {article.summary && (
            <div className="reader-summary">
              <strong style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--muted)' }}>
                概要
              </strong>
              <div style={{ marginTop: 6 }}>{article.summary}</div>
            </div>
          )}

          {article.hits && (
            <div className="hits-box">
              <div className="label">先輩に刺さるポイント</div>
              {article.hits}
            </div>
          )}

          <div className="reader-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {article.body}
            </ReactMarkdown>
          </div>

          <FeedbackBar slug={`${article.kind}/${article.slug}`} />
        </article>
      </div>
    </div>
  );
}
