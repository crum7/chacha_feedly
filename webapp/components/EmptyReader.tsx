export default function EmptyReader({ count }: { count: number }) {
  return (
    <div className="reader-empty">
      <div style={{ fontSize: 36, opacity: 0.4 }}>📰</div>
      <div>記事を選んで読み始める</div>
      <div style={{ fontSize: 12, opacity: 0.6 }}>{count}件の記事があります</div>
    </div>
  );
}
