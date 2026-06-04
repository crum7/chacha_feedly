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

function localKey(slug: string) {
  return `chacha_feedback:${slug}`;
}

function getLocalFeedback(slug: string): Feedback {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(localKey(slug));
  return v === 'like' || v === 'dislike' ? v : null;
}

function setLocalFeedback(slug: string, value: Feedback) {
  if (typeof window === 'undefined') return;
  if (value === null) localStorage.removeItem(localKey(slug));
  else localStorage.setItem(localKey(slug), value);
}

export default function FeedbackBar({ slug }: { slug: string }) {
  const [counts, setCounts] = useState<Counts>({ likes: 0, dislikes: 0 });
  const [mine, setMine] = useState<Feedback>(null);
  const [loading, setLoading] = useState(false);
  const [stored, setStored] = useState(true);

  useEffect(() => {
    // まずローカルから自分の選択を即復元
    setMine(getLocalFeedback(slug));

    const userId = getUserId();
    fetch(`/api/feedback?slug=${encodeURIComponent(slug)}&userId=${userId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.counts) setCounts(d.counts);
        // サーバーに保存されていればそれを優先、なければローカルを維持
        if (d.mine) setMine(d.mine);
        if (typeof d.stored === 'boolean') setStored(d.stored);
      })
      .catch(() => {
        setStored(false);
      });
  }, [slug]);

  const submit = async (value: Feedback) => {
    setLoading(true);
    const userId = getUserId();
    const next = mine === value ? null : value;

    // 楽観的更新（即UIに反映）
    setMine(next);
    setLocalFeedback(slug, next);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, userId, value: next }),
      });
      const d = await res.json().catch(() => null);
      if (d?.counts) setCounts(d.counts);
      if (typeof d?.stored === 'boolean') setStored(d.stored);
    } catch {
      setStored(false);
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
          👍 刺さった{stored && counts.likes > 0 ? ` (${counts.likes})` : ''}
        </button>
        <button
          className={`btn dislike ${mine === 'dislike' ? 'active' : ''}`}
          onClick={() => submit('dislike')}
          disabled={loading}
        >
          👎 違った{stored && counts.dislikes > 0 ? ` (${counts.dislikes})` : ''}
        </button>
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 8 }}>
        {stored
          ? 'フィードバックは次回の巡回で「先輩に刺さるポイント」の精度向上に使います'
          : 'ローカル保存中（サーバー集計は準備中）。次回の巡回でも参照されます'}
      </div>
    </div>
  );
}
