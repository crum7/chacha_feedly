'use client';

import { useEffect, useState } from 'react';

type Counts = { likes: number; dislikes: number };
type Feedback = 'like' | 'dislike' | null;

function getUserId(): string {
  if (typeof window === 'undefined') return 'anon';
  let id = localStorage.getItem('chacha_uid');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('chacha_uid', id);
  }
  return id;
}

export default function FeedbackBar({ slug }: { slug: string }) {
  const [counts, setCounts] = useState<Counts>({ likes: 0, dislikes: 0 });
  const [mine, setMine] = useState<Feedback>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = getUserId();
    fetch(`/api/feedback?slug=${encodeURIComponent(slug)}&userId=${userId}`)
      .then((r) => r.json())
      .then((d) => {
        setCounts(d.counts);
        setMine(d.mine);
      })
      .catch(() => {});
  }, [slug]);

  const submit = async (value: Feedback) => {
    setLoading(true);
    const userId = getUserId();
    const next = mine === value ? null : value;
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, userId, value: next }),
      });
      const d = await res.json();
      setCounts(d.counts);
      setMine(next);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 10, textTransform: 'uppercase' }}>
        この記事のフィードバック
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          className={`btn like ${mine === 'like' ? 'active' : ''}`}
          onClick={() => submit('like')}
          disabled={loading}
        >
          👍 刺さった ({counts.likes})
        </button>
        <button
          className={`btn dislike ${mine === 'dislike' ? 'active' : ''}`}
          onClick={() => submit('dislike')}
          disabled={loading}
        >
          👎 違った ({counts.dislikes})
        </button>
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 8 }}>
        フィードバックは次回の巡回で「先輩に刺さるポイント」の精度向上に使います
      </div>
    </div>
  );
}
