import { getAllArticles } from '@/lib/articles';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home({ searchParams }: { searchParams: { kind?: string } }) {
  const all = getAllArticles();
  const filtered = searchParams.kind
    ? all.filter((a) => a.kind === searchParams.kind)
    : all;

  return (
    <>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>最新の記事</h1>
      {filtered.length === 0 && (
        <p style={{ color: 'var(--muted)' }}>
          まだ記事ないです。2時間ごとの巡回で記事が増えていきます。
        </p>
      )}
      {filtered.map((a) => (
        <article key={`${a.kind}-${a.slug}`} className="article-card">
          <div className="article-meta">
            <span className="source-badge">
              {a.kind === 'series' ? 'HackTricks連載' : a.source}
            </span>
            {a.published_at}
          </div>
          <h2>
            <Link href={`/article/${a.kind}/${a.slug}`}>{a.title}</Link>
          </h2>
          <p className="article-summary">{a.summary}</p>
          {a.hits && (
            <div className="hits-box">
              <div className="label">先輩に刺さるポイント</div>
              {a.hits}
            </div>
          )}
        </article>
      ))}
    </>
  );
}
