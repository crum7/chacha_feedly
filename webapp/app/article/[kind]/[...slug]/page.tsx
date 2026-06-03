import { getArticleBySlug } from '@/lib/articles';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import FeedbackBar from '@/components/FeedbackBar';

export const dynamic = 'force-dynamic';

export default function ArticlePage({
  params,
}: {
  params: { kind: string; slug: string[] };
}) {
  const kind = params.kind === 'series' ? 'series' : 'feed';
  const slug = params.slug.join('/');
  const article = getArticleBySlug(kind, slug);
  if (!article) notFound();

  return (
    <article>
      <div className="article-meta">
        <span className="source-badge">
          {article.kind === 'series' ? 'HackTricks連載' : article.source}
        </span>
        {article.published_at}
        {article.source_url && (
          <>
            {' / '}
            <a href={article.source_url} target="_blank" rel="noopener noreferrer">
              元記事
            </a>
          </>
        )}
      </div>
      <h1 style={{ fontSize: 26, marginBottom: 16 }}>{article.title}</h1>
      <p className="article-summary" style={{ fontSize: 15 }}>
        {article.summary}
      </p>
      {article.hits && (
        <div className="hits-box" style={{ marginBottom: 24 }}>
          <div className="label">先輩に刺さるポイント</div>
          {article.hits}
        </div>
      )}
      <div className="article-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {article.body}
        </ReactMarkdown>
      </div>
      <FeedbackBar slug={`${article.kind}/${article.slug}`} />
    </article>
  );
}
