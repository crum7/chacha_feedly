import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'chacha_feedly',
  description: '先輩専用フィードリーダー',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
