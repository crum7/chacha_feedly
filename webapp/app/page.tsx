import { getAllArticles } from '@/lib/articles';
import Sidebar from '@/components/Sidebar';
import ArticleList from '@/components/ArticleList';
import EmptyReader from '@/components/EmptyReader';

export const dynamic = 'force-dynamic';

export default function Home({ searchParams }: { searchParams: { source?: string; kind?: string } }) {
  const all = getAllArticles();
  const sources = Array.from(new Set(all.map((a) => a.source))).sort();
  const filtered = all.filter((a) => {
    if (searchParams.kind && a.kind !== searchParams.kind) return false;
    if (searchParams.source && a.source !== searchParams.source) return false;
    return true;
  });

  const counts = {
    all: all.length,
    feed: all.filter((a) => a.kind === 'feed').length,
    series: all.filter((a) => a.kind === 'series').length,
    bySource: sources.reduce<Record<string, number>>((acc, s) => {
      acc[s] = all.filter((a) => a.source === s).length;
      return acc;
    }, {}),
  };

  let title = 'すべての記事';
  if (searchParams.kind === 'series') title = 'HackTricks 連載';
  else if (searchParams.kind === 'feed') title = 'フィード（巡回）';
  if (searchParams.source) title = searchParams.source;

  return (
    <div className="app">
      <Sidebar
        counts={counts}
        sources={sources}
        activeKind={searchParams.kind}
        activeSource={searchParams.source}
      />
      <ArticleList articles={filtered} title={title} />
      <div className="reader">
        <EmptyReader count={filtered.length} />
      </div>
    </div>
  );
}
