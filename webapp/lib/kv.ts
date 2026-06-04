// KV (Vercel KV / Upstash Redis) — 未設定でも graceful にゼロ返す実装
// 環境変数 KV_REST_API_URL / KV_REST_API_TOKEN が無いと @vercel/kv は即throwするので、ガードする。

export type Feedback = 'like' | 'dislike' | null;

const HAS_KV =
  !!process.env.KV_REST_API_URL &&
  !!process.env.KV_REST_API_TOKEN;

type KVClient = {
  get: <T>(k: string) => Promise<T | null>;
  incr: (k: string) => Promise<number>;
  decr: (k: string) => Promise<number>;
  hget: <T>(k: string, f: string) => Promise<T | null>;
  hset: (k: string, v: Record<string, unknown>) => Promise<number>;
  hdel: (k: string, f: string) => Promise<number>;
};

let _kv: KVClient | null = null;
async function getKV(): Promise<KVClient | null> {
  if (!HAS_KV) return null;
  if (_kv) return _kv;
  try {
    const mod = await import('@vercel/kv');
    _kv = mod.kv as unknown as KVClient;
    return _kv;
  } catch {
    return null;
  }
}

const key = (slug: string) => `feedback:${slug}`;
const countKey = (slug: string, type: 'like' | 'dislike') =>
  `count:${slug}:${type}`;

export async function getFeedbackCounts(slug: string) {
  const kv = await getKV();
  if (!kv) return { likes: 0, dislikes: 0 };
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

export async function setFeedback(
  slug: string,
  userId: string,
  value: Feedback,
) {
  const kv = await getKV();
  if (!kv) return { counts: { likes: 0, dislikes: 0 }, stored: false };
  try {
    const prev = (await kv.hget<Feedback>(key(slug), userId)) ?? null;
    if (prev === value) {
      return { counts: await getFeedbackCounts(slug), stored: true };
    }

    if (prev === 'like') await kv.decr(countKey(slug, 'like'));
    if (prev === 'dislike') await kv.decr(countKey(slug, 'dislike'));
    if (value === 'like') await kv.incr(countKey(slug, 'like'));
    if (value === 'dislike') await kv.incr(countKey(slug, 'dislike'));

    if (value === null) await kv.hdel(key(slug), userId);
    else await kv.hset(key(slug), { [userId]: value });

    return { counts: await getFeedbackCounts(slug), stored: true };
  } catch {
    return { counts: { likes: 0, dislikes: 0 }, stored: false };
  }
}

export async function getUserFeedback(
  slug: string,
  userId: string,
): Promise<Feedback> {
  const kv = await getKV();
  if (!kv) return null;
  try {
    return (await kv.hget<Feedback>(key(slug), userId)) ?? null;
  } catch {
    return null;
  }
}
