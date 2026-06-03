import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'chacha_feedly',
  description: '先輩専用フィードリーダー',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <a href="/" className="brand">chacha_feedly</a>
          <nav>
            <a href="/">すべて</a>
            <a href="/?kind=feed">フィード</a>
            <a href="/?kind=series">HackTricks連載</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
