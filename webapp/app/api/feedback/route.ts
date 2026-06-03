import { NextRequest, NextResponse } from 'next/server';
import { getFeedbackCounts, getUserFeedback, setFeedback } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') ?? '';
  const userId = req.nextUrl.searchParams.get('userId') ?? '';
  const [counts, mine] = await Promise.all([
    getFeedbackCounts(slug),
    getUserFeedback(slug, userId),
  ]);
  return NextResponse.json({ counts, mine });
}

export async function POST(req: NextRequest) {
  const { slug, userId, value } = await req.json();
  if (!slug || !userId) {
    return NextResponse.json({ error: 'missing params' }, { status: 400 });
  }
  const counts = await setFeedback(slug, userId, value);
  return NextResponse.json({ counts });
}
