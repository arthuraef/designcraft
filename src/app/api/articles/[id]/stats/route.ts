import { NextRequest, NextResponse } from 'next/server';
import { incrementArticleStats } from '@/lib/articles';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const type = body.type === 'like' ? 'like' : 'view';
    const updated = await incrementArticleStats(id, type);
    return NextResponse.json({ success: true, article: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
