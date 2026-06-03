import { kv } from '@vercel/kv';

export type Feedback = 'like' | 'dislike' | null;

const key = (slug: string) => `feedback:${slug}`;
const countKey = (slug: string, type: 'like' | 'dislike') => `count:${slug}:${type}`;

export async function getFeedbackCounts(slug: string) {
  try {
    const [likes, dislikes] = await Promise.all([
      kv.get<number>(countKey(slug, 'like')),
      kv.get<number>(countKey(slug, 'dislike')),
    ]);
    return { likes: likes ?? 0, dislikes: dislikes ?? 0 };
  } catch {
    return { likes: 0, dislikes: 0 };
  }
}

export async function setFeedback(slug: string, userId: string, value: Feedback) {
  const prev = (await kv.hget<Feedback>(key(slug), userId)) ?? null;
  if (prev === value) return getFeedbackCounts(slug);

  if (prev === 'like') await kv.decr(countKey(slug, 'like'));
  if (prev === 'dislike') await kv.decr(countKey(slug, 'dislike'));
  if (value === 'like') await kv.incr(countKey(slug, 'like'));
  if (value === 'dislike') await kv.incr(countKey(slug, 'dislike'));

  if (value === null) await kv.hdel(key(slug), userId);
  else await kv.hset(key(slug), { [userId]: value });

  return getFeedbackCounts(slug);
}

export async function getUserFeedback(slug: string, userId: string): Promise<Feedback> {
  try {
    return (await kv.hget<Feedback>(key(slug), userId)) ?? null;
  } catch {
    return null;
  }
}
