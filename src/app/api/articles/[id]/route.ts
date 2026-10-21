import { NextRequest, NextResponse } from 'next/server';
import { getArticleById, updateArticle, deleteArticle } from '@/lib/articles';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ success: false, error: 'Artigo não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, article });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateArticle(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Artigo não encontrado para atualização' }, { status: 404 });
    }
    return NextResponse.json({ success: true, article: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteArticle(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Artigo não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Artigo removido com sucesso' });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
