import { NextRequest, NextResponse } from 'next/server';
import { getFeedbackCounts, getUserFeedback, setFeedback } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') ?? '';
  const userId = req.nextUrl.searchParams.get('userId') ?? '';
  try {
    const [counts, mine] = await Promise.all([
      getFeedbackCounts(slug),
      getUserFeedback(slug, userId),
    ]);
    return NextResponse.json({ counts, mine, stored: true });
  } catch {
    return NextResponse.json({
      counts: { likes: 0, dislikes: 0 },
      mine: null,
      stored: false,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, userId, value } = await req.json();
    if (!slug || !userId) {
      return NextResponse.json({ error: 'missing params' }, { status: 400 });
    }
    const result = await setFeedback(slug, userId, value);
    return NextResponse.json(result);
  } catch (e) {
    // KV未設定や障害でも UI 側がクラッシュしないようにJSONで返す
    return NextResponse.json({
      counts: { likes: 0, dislikes: 0 },
      stored: false,
      error: e instanceof Error ? e.message : 'unknown',
    });
  }
}
