import { NextResponse } from 'next/server';
import { resetArticlesToSeed } from '@/lib/articles';

export async function POST() {
  try {
    const articles = await resetArticlesToSeed();
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
