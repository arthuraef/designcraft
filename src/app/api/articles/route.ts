import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles, createArticle } from '@/lib/articles';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeDrafts = searchParams.get('all') === 'true';
    const articles = await getAllArticles(includeDrafts);
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.content || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Título, conteúdo e categoria são obrigatórios.' },
        { status: 400 }
      );
    }

    const article = await createArticle(body);
    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
