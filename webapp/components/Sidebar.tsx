import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

type Props = {
  counts: { all: number; feed: number; series: number; bySource: Record<string, number> };
  sources: string[];
  activeKind?: string;
  activeSource?: string;
};

export default function Sidebar({ counts, sources, activeKind, activeSource }: Props) {
  const noFilter = !activeKind && !activeSource;
  const seriesActive = activeKind === 'series' && !activeSource;
  const feedActive = activeKind === 'feed' && !activeSource;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">chacha_feedly</div>

      <div className="sidebar-section">ビュー</div>
      <Link href="/" className={`sidebar-item ${noFilter ? 'active' : ''}`}>
        <span>すべて</span>
        <span className="count">{counts.all}</span>
      </Link>
      <Link href="/?kind=feed" className={`sidebar-item ${feedActive ? 'active' : ''}`}>
        <span>フィード巡回</span>
        <span className="count">{counts.feed}</span>
      </Link>
      <Link href="/?kind=series" className={`sidebar-item ${seriesActive ? 'active' : ''}`}>
        <span>HackTricks連載</span>
        <span className="count">{counts.series}</span>
      </Link>

      <div className="sidebar-section">ソース</div>
      {sources.map((s) => (
        <Link
          key={s}
          href={`/?source=${encodeURIComponent(s)}`}
          className={`sidebar-item ${activeSource === s ? 'active' : ''}`}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {s || '(no source)'}
          </span>
          <span className="count">{counts.bySource[s]}</span>
        </Link>
      ))}

      <div className="sidebar-footer">
        <span>テーマ</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
