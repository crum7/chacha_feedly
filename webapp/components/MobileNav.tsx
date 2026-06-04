'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

type Props = {
  title?: string;
  showBack?: boolean;
};

export default function MobileNav({ title = 'chacha_feedly', showBack = false }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // ルート遷移したらドロワー閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ドロワー開いてる時、サイドバーにopenクラス付ける
  useEffect(() => {
    const sidebar = document.querySelector('.sidebar');
    const app = document.querySelector('.app');
    if (!sidebar || !app) return;
    if (open) {
      sidebar.classList.add('sidebar--open');
      app.classList.add('app--drawer-open');
      document.body.style.overflow = 'hidden';
    } else {
      sidebar.classList.remove('sidebar--open');
      app.classList.remove('app--drawer-open');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="mobile-nav">
        {showBack ? (
          <a href="/" className="mobile-nav-btn" aria-label="戻る">
            ←
          </a>
        ) : (
          <button
            className="mobile-nav-btn"
            aria-label="メニュー"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        )}
        <div className="mobile-nav-title">{title}</div>
        <ThemeToggle />
      </header>
      {open && <div className="drawer-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}
