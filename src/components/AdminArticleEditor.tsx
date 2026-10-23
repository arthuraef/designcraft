'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Article, ArticleInput } from '@/types/article';
import {
  createStoredArticle,
  updateStoredArticle,
  generateSlug,
} from '@/lib/client-articles';
import MarkdownRenderer from './MarkdownRenderer';
import BrutalistCover from './BrutalistCover';
import {
  ArrowLeft,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface AdminArticleEditorProps {
  initialData?: Article;
  isEdit?: boolean;
}

const CATEGORIES_PRESET = [
  'TEORIA CRÍTICA',
  'RADICAL WEB',
  'DESIGN SYSTEMS',
  'TIPOGRAFIA',
  'ANTI-PATTERNS',
  'UX ARCHITECTURE',
  'ESTÉTICA COMPUTACIONAL',
];

const COLOR_PRESETS = [
  { name: 'Vermilion Suíço', hex: '#E63926' },
  { name: 'Preto Técnico', hex: '#111215' },
  { name: 'Ardósia Escura', hex: '#334155' },
  { name: 'Cinza Concreto', hex: '#64748B' },
  { name: 'Chalk Paper', hex: '#F1F5F9' },
];

export default function AdminArticleEditor({
  initialData,
  isEdit = false,
}: AdminArticleEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(
    initialData?.content ||
      `## 01. A Tese Principal\n\nEscreva aqui o ensaio crítico sobre design. A tradição internacional exige rigor tipográfico e clareza estrutural.\n\n> "A evolução da cultura é proporcional ao desaparecimento do ornamento do objeto de uso." — Adolf Loos\n\n### Princípios de Construção\n\n* **Ponto 01:** A grelha é a base matemática da informação.\n* **Ponto 02:** Elimine sombras difusas e ornamentos sem propósito.\n\n\`\`\`css\n/* Racionalismo Suíço */\n.interface {\n  border: 1px solid #D0D5DD;\n  background: #FFFFFF;\n}\n\`\`\``
  );
  const [category, setCategory] = useState(
    initialData?.category || 'TEORIA CRÍTICA'
  );
  const [customCategory, setCustomCategory] = useState('');
  const [tagsStr, setTagsStr] = useState(
    initialData?.tags?.join(', ') || 'Modernismo, Tipografia, Arquitetura'
  );
  const [authorName, setAuthorName] = useState(
    initialData?.author?.name || 'Arthur Ferreira'
  );
  const [authorRole, setAuthorRole] = useState(
    initialData?.author?.role || 'Crítico de Arquitetura Visual'
  );
  const [authorBio, setAuthorBio] = useState(
    initialData?.author?.bio || ''
  );
  const [coverColor, setCoverColor] = useState(
    initialData?.coverColor || '#E63926'
  );
  const [coverPattern, setCoverPattern] = useState<'grid' | 'stripes' | 'dots' | 'blocks'>(
    initialData?.coverPattern || 'stripes'
  );
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [published, setPublished] = useState(
    initialData ? initialData.published : true
  );
  const [featured, setFeatured] = useState(
    initialData ? initialData.featured : false
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'split' | 'editor' | 'preview'>(
    'split'
  );

  useEffect(() => {
    if (!isEdit && title && !slug) {
      setSlug(generateSlug(title));
    }
  }, [title, isEdit, slug]);

  const insertMarkdown = (snippet: string) => {
    setContent((prev) => prev + '\n' + snippet);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const finalCategory = customCategory.trim() || category;
    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: ArticleInput = {
      title,
      slug,
      subtitle,
      excerpt,
      content,
      category: finalCategory,
      tags,
      author: {
        name: authorName,
        role: authorRole,
        bio: authorBio,
      },
      coverColor,
      coverPattern,
      coverImage: coverImage.trim() || undefined,
      published,
      featured,
    };

    try {
      if (isEdit && initialData?.id) {
        updateStoredArticle(initialData.id, payload);
      } else {
        createStoredArticle(payload);
      }

      setStatusMessage({
        type: 'success',
        text: isEdit
          ? 'Artigo atualizado com sucesso no catálogo.'
          : 'Novo artigo registrado com sucesso no catálogo.',
      });

      setTimeout(() => {
        router.push('/admin');
      }, 700);
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: (err as Error).message || 'Falha na operação',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9ECEF] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#D0D5DD]">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-sm border border-[#D0D5DD] bg-white hover:border-[#111215] text-[#111215] text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao CMS</span>
            </Link>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
                {isEdit ? 'Editar Documento' : 'Novo Documento'}
              </h1>
              <span className="font-mono text-xs text-[#64748B]">
                EDITOR TIPOGRÁFICO DE CONTEÚDO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isEdit && initialData?.slug && (
              <Link
                href={`/article/?slug=${initialData.slug}`}
                className="px-3 py-2 border border-[#D0D5DD] bg-white hover:border-[#111215] text-xs font-mono flex items-center gap-1 text-[#111215] rounded-sm transition-colors"
              >
                <span>Ver Página</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#111215] hover:bg-[#E63926] text-white text-xs font-mono font-semibold rounded-sm transition-colors flex items-center gap-2 uppercase tracking-wider"
            >
              {isSubmitting ? (
                <span>Salvando...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar & Publicar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Toast Alert */}
        {statusMessage && (
          <div
            className={`border p-3.5 mb-6 font-mono text-xs font-semibold flex items-center gap-2 rounded-sm ${
              statusMessage.type === 'success'
                ? 'bg-white border-[#10B981] text-[#065F46]'
                : 'bg-white border-[#EF4444] text-[#991B1B]'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 text-[#10B981]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#EF4444]" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Metadata Grid */}
          <div className="border border-[#D0D5DD] bg-[#FFFFFF] p-6 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center text-xs font-mono text-[#64748B] mb-5 border-b border-[#E2E8F0] pb-2">
              <span className="font-bold text-[#111215] uppercase tracking-wider">
                [01] METADADOS DO DOCUMENTO
              </span>
              <span>INDEX SPEC</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block font-semibold text-[#111215] mb-1">
                  TÍTULO PRINCIPAL *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="EX: ORNAMENT IS CRIME: MODERNISM '26..."
                  className="w-full p-3 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-sans text-lg font-bold text-[#111215] placeholder:text-[#94A3B8] focus:border-[#111215] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block font-semibold text-[#111215] mb-1">
                  SLUG (URL AMIGÁVEL) *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="ex: ornament-is-crime"
                  className="w-full p-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-[#111215] placeholder:text-[#94A3B8] focus:border-[#111215] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-[#111215] mb-1">
                  CATEGORIA *
                </label>
                <div className="flex gap-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 p-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-[#111215] focus:border-[#111215] focus:outline-none"
                  >
                    {CATEGORIES_PRESET.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Ou nova..."
                    className="w-36 p-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-[#111215] placeholder:text-[#94A3B8] focus:border-[#111215] focus:outline-none"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="md:col-span-2">
                <label className="block font-semibold text-[#111215] mb-1">
                  SUBTÍTULO / FRASE DE IMPACTO
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Linha conceitual de apoio..."
                  className="w-full p-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-sans text-sm text-[#334155] placeholder:text-[#94A3B8] focus:border-[#111215] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Excerpt */}
              <div className="md:col-span-2">
                <label className="block font-semibold text-[#111215] mb-1">
                  RESUMO / LEAD (PARA CARDS E BUSCA) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Parágrafo que introduz a tese com rigor e objetividade..."
                  className="w-full p-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-sans text-xs text-[#334155] placeholder:text-[#94A3B8] focus:border-[#111215] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block font-semibold text-[#111215] mb-1">
                  TAGS (SEPARADAS POR VÍRGULA)
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="Modernismo, Grid, Bauhaus"
                  className="w-full p-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-[#111215] placeholder:text-[#94A3B8] focus:border-[#111215] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block font-semibold text-[#111215] mb-1">
                  AUTOR & CARGO
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Nome do autor"
                    className="p-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-[#111215] focus:border-[#111215] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="Cargo ou bio curta"
                    className="p-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-[#111215] focus:border-[#111215] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Publication Toggles */}
            <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center gap-6 font-mono text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 accent-[#111215]"
                />
                <span className="font-semibold text-[#111215]">Publicar Imediatamente (Visível no Site)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#E63926]"
                />
                <span className="font-semibold text-[#E63926]">★ Destaque na Página Inicial</span>
              </label>
            </div>
          </div>

          {/* Cover & Graphic Identity */}
          <div className="border border-[#D0D5DD] bg-[#FFFFFF] p-6 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center text-xs font-mono text-[#64748B] mb-5 border-b border-[#E2E8F0] pb-2">
              <span className="font-bold text-[#111215] uppercase tracking-wider">
                [02] CAPA TÉCNICA DO ARTIGO
              </span>
              <span>VISUAL SPEC</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4 font-mono text-xs">
                {/* Image URL */}
                <div>
                  <label className="block font-semibold text-[#111215] mb-1">
                    URL DE IMAGEM FOTOGRÁFICA / ARQUITETÔNICA (RECOMENDADO)
                  </label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-2.5 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-[#111215] placeholder:text-[#94A3B8] focus:border-[#111215] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#64748B] mt-1 font-sans">
                    Fotos arquitetônicas preto-e-branco reforçam a estética internacional. Caso vazio, um gráfico técnico de semicírculo vermelho e grid será renderizado.
                  </p>
                </div>

                {/* Color presets */}
                <div>
                  <label className="block font-semibold text-[#111215] mb-2">
                    COR DE ACENTO VISUAL
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map((p) => (
                      <button
                        type="button"
                        key={p.hex}
                        onClick={() => setCoverColor(p.hex)}
                        style={{ backgroundColor: p.hex }}
                        className={`w-7 h-7 rounded-sm border border-[#D0D5DD] flex items-center justify-center text-white text-[10px] font-bold ${
                          coverColor === p.hex ? 'ring-2 ring-[#111215]' : ''
                        }`}
                        title={p.name}
                      >
                        {coverColor === p.hex ? '✓' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cover Preview */}
              <div className="lg:col-span-5">
                <span className="block font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
                  PRÉVIA DA CAPA:
                </span>
                <div className="border border-[#D0D5DD] rounded-sm overflow-hidden">
                  <BrutalistCover
                    title={title || 'TÍTULO DO SEU ARTIGO'}
                    category={customCategory.trim() || category}
                    color={coverColor}
                    pattern={coverPattern}
                    image={coverImage.trim() || undefined}
                    className="h-44 w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content & Markdown Editor */}
          <div className="border border-[#D0D5DD] bg-[#FFFFFF] p-6 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111215]">
                [03] CONTEÚDO DO ENSAIO (MARKDOWN)
              </span>

              <div className="flex items-center gap-1 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('split')}
                  className={`px-2.5 py-1 rounded-sm border uppercase transition-colors ${
                    activeTab === 'split'
                      ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                      : 'bg-white text-[#64748B] border-[#D0D5DD]'
                  }`}
                >
                  Dividido
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-2.5 py-1 rounded-sm border uppercase transition-colors ${
                    activeTab === 'editor'
                      ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                      : 'bg-white text-[#64748B] border-[#D0D5DD]'
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-2.5 py-1 rounded-sm border uppercase transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                      : 'bg-white text-[#64748B] border-[#D0D5DD]'
                  }`}
                >
                  Prévia
                </button>
              </div>
            </div>

            {/* Quick Helper Toolbar */}
            <div className="flex flex-wrap gap-1.5 p-2 bg-[#F8F9FA] border border-[#E2E8F0] rounded-sm mb-4 font-mono text-xs">
              <button
                type="button"
                onClick={() => insertMarkdown('## Novo Subtítulo')}
                className="px-2 py-0.5 bg-white border border-[#D0D5DD] hover:border-[#111215] rounded-sm text-[#111215]"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('### Seção Menor')}
                className="px-2 py-0.5 bg-white border border-[#D0D5DD] hover:border-[#111215] rounded-sm text-[#111215]"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('> "Citação sobre tipografia ou arquitetura."')}
                className="px-2 py-0.5 bg-white border border-[#D0D5DD] hover:border-[#111215] rounded-sm text-[#111215]"
              >
                Citação
              </button>
              <button
                type="button"
                onClick={() =>
                  insertMarkdown('```css\n.grid {\n  border: 1px solid #D0D5DD;\n}\n```')
                }
                className="px-2 py-0.5 bg-white border border-[#D0D5DD] hover:border-[#111215] rounded-sm text-[#111215]"
              >
                Código
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('* Item em lista')}
                className="px-2 py-0.5 bg-white border border-[#D0D5DD] hover:border-[#111215] rounded-sm text-[#111215]"
              >
                Lista
              </button>
              <button
                type="button"
                onClick={() =>
                  insertMarkdown(
                    '| Especificação | Valor |\n| :--- | :--- |\n| Grid | 1px Hairline |'
                  )
                }
                className="px-2 py-0.5 bg-white border border-[#D0D5DD] hover:border-[#111215] rounded-sm text-[#111215]"
              >
                Tabela
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('---')}
                className="px-2 py-0.5 bg-white border border-[#D0D5DD] hover:border-[#111215] rounded-sm text-[#111215]"
              >
                Divisor
              </button>
            </div>

            {/* Dual Pane */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
              {(activeTab === 'split' || activeTab === 'editor') && (
                <div
                  className={`${
                    activeTab === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'
                  } flex flex-col`}
                >
                  <textarea
                    rows={22}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva em formato Markdown..."
                    className="w-full flex-1 p-4 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-xs leading-relaxed text-[#111215] focus:outline-none focus:border-[#111215] focus:bg-white transition-colors"
                  />
                </div>
              )}

              {(activeTab === 'split' || activeTab === 'preview') && (
                <div
                  className={`${
                    activeTab === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'
                  } border border-[#D0D5DD] bg-white rounded-sm p-6 overflow-y-auto max-h-[600px]`}
                >
                  <div className="border-b border-[#E2E8F0] pb-2 mb-4 font-mono text-[10px] text-[#94A3B8] uppercase">
                    PRÉVIA DA RENDERIZAÇÃO EDITORIAL
                  </div>
                  <MarkdownRenderer content={content} />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Submit */}
          <div className="flex justify-end gap-3 font-mono text-xs">
            <Link
              href="/admin"
              className="px-5 py-2.5 bg-white border border-[#D0D5DD] hover:border-[#111215] rounded-sm text-[#111215] font-medium"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#111215] hover:bg-[#E63926] text-white rounded-sm font-semibold uppercase tracking-wider transition-colors"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Ensaio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
