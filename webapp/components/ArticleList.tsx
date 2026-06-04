import Link from 'next/link';
import type { Article } from '@/lib/articles';

function timeAgo(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) return 'たった今';
  if (sec < 3600) return `${Math.floor(sec / 60)}分前`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}時間前`;
  if (sec < 86400 * 7) return `${Math.floor(sec / 86400)}日前`;
  return d.toISOString().slice(0, 10);
}

export default function ArticleList({ articles, title }: { articles: Article[]; title: string }) {
  return (
    <div className="article-list">
      <div className="list-header">
        <h2>{title}</h2>
        <span className="count-badge">{articles.length}件</span>
      </div>
      {articles.length === 0 && (
        <div style={{ padding: '40px 20px', color: 'var(--muted)', textAlign: 'center', fontSize: 13 }}>
          記事がまだありません。次回の巡回までお待ちください。
        </div>
      )}
      {articles.map((a) => (
        <Link
          key={`${a.kind}-${a.slug}`}
          href={`/article/${a.kind}/${a.slug}`}
          className="list-item unread"
        >
          <div className="list-item-source">
            <span className="dot" />
            {a.kind === 'series' ? 'HackTricks連載' : a.source || 'unknown'}
          </div>
          <h3 className="list-item-title">{a.title}</h3>
          <p className="list-item-summary">{a.summary}</p>
          <div className="list-item-time">{timeAgo(a.published_at)}</div>
        </Link>
      ))}
    </div>
  );
}
