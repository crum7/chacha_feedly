'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme | null) || 'dark';
    setTheme(stored);
    document.documentElement.setAttribute('data-theme', stored);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // SSR時のミスマッチ回避
  if (!mounted) {
    return (
      <button
        className={`theme-toggle ${className}`}
        aria-label="テーマ切り替え"
        style={{ visibility: 'hidden' }}
      >
        🌙
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`theme-toggle ${className}`}
      aria-label={theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      title={theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
