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
  { name: 'Amarelo Alerta', hex: '#FFE600' },
  { name: 'Laranja Tráfego', hex: '#FF4400' },
  { name: 'Azul Sinal', hex: '#0029FF' },
  { name: 'Verde Terminal', hex: '#00E575' },
  { name: 'Cinza Concreto', hex: '#E5E5E0' },
  { name: 'Branco Puro', hex: '#FFFFFF' },
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
      `## 01. A Tese Principal\n\nEscreva aqui o ensaio crítico sobre design. O brutalismo exige posições claras e sem meias-palavras.\n\n> "Uma citação provocadora que sintetiza a inquietação formal do artigo."\n\n### Princípios de Construção\n\n* **Ponto 01:** O meio digital é concreto e elétrons.\n* **Ponto 02:** Evite a suavização arbitrária das arestas.\n\n\`\`\`css\n/* Código de exemplo */\n.interface-honesta {\n  border: 3px solid #000000;\n  box-shadow: 6px 6px 0px #000000;\n}\n\`\`\``
  );
  const [category, setCategory] = useState(
    initialData?.category || 'TEORIA CRÍTICA'
  );
  const [customCategory, setCustomCategory] = useState('');
  const [tagsStr, setTagsStr] = useState(
    initialData?.tags?.join(', ') || 'Brutalismo, Interface, Teoria'
  );
  const [authorName, setAuthorName] = useState(
    initialData?.author?.name || 'Arthur Ferreira'
  );
  const [authorRole, setAuthorRole] = useState(
    initialData?.author?.role || 'Designer & Crítico de Sistemas'
  );
  const [authorBio, setAuthorBio] = useState(
    initialData?.author?.bio || ''
  );
  const [coverColor, setCoverColor] = useState(
    initialData?.coverColor || '#FFE600'
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
          ? 'Artigo atualizado com sucesso!'
          : 'Artigo criado com sucesso no arquivo!',
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
    <div className="min-h-screen bg-[#F4F4F0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-4 border-black">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="btn-brutal bg-white px-3 py-1.5 text-xs font-mono flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>VOLTAR AO CMS</span>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
                {isEdit ? 'EDITAR ARTIGO' : 'NOVO ARTIGO'}
              </h1>
              <span className="font-mono text-xs text-black/60 font-bold">
                EDITOR BRUTALISTA DE CONTEÚDO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isEdit && initialData?.slug && (
              <Link
                href={`/article/${initialData.slug}`}
                className="btn-brutal bg-white px-3 py-2 text-xs font-mono flex items-center gap-1 text-black"
              >
                <span>VER PÁGINA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-brutal bg-[#FFE600] px-5 py-2.5 text-sm font-mono font-black flex items-center gap-2 text-black hover:bg-[#00E575]"
            >
              {isSubmitting ? (
                <span>SALVANDO...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>SALVAR & PUBLICAR</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Toast Alert */}
        {statusMessage && (
          <div
            className={`border-brutal p-4 mb-6 font-mono text-sm font-black flex items-center gap-2 shadow-brutal ${
              statusMessage.type === 'success'
                ? 'bg-[#00E575] text-black'
                : 'bg-[#FF4400] text-white'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Metadata Grid */}
          <div className="border-brutal bg-white p-6 shadow-brutal">
            <h2 className="font-mono text-xs font-black uppercase tracking-wider bg-black text-white px-3 py-1 inline-block mb-6">
              [01] METADADOS DO ENSAIO
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block font-black uppercase text-black mb-1">
                  TÍTULO PRINCIPAL *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="EX: A TIRANIA DO CANTO ARREDONDADO..."
                  className="w-full p-3 border-2 border-black font-sans text-lg font-black uppercase placeholder:text-black/40 focus:bg-[#FFE600]/20 focus:outline-none"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block font-black uppercase text-black mb-1">
                  SLUG (URL AMIGÁVEL) *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="ex: a-tirania-do-canto-arredondado"
                  className="w-full p-2.5 border-2 border-black font-mono font-bold placeholder:text-black/40 focus:bg-[#FFE600]/20 focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-black uppercase text-black mb-1">
                  CATEGORIA *
                </label>
                <div className="flex gap-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 p-2.5 border-2 border-black font-mono font-bold bg-white focus:outline-none"
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
                    placeholder="Ou nova categoria..."
                    className="w-48 p-2.5 border-2 border-black font-mono font-bold placeholder:text-black/40 focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="md:col-span-2">
                <label className="block font-black uppercase text-black mb-1">
                  SUBTÍTULO / FRASE DE IMPACTO
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Uma linha de contextualização crítica..."
                  className="w-full p-2.5 border-2 border-black font-sans font-medium placeholder:text-black/40 focus:bg-[#FFE600]/20 focus:outline-none"
                />
              </div>

              {/* Excerpt */}
              <div className="md:col-span-2">
                <label className="block font-black uppercase text-black mb-1">
                  RESUMO / LEAD (PARA CARDS E BUSCA) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Breve parágrafo explicativo que instigue a leitura..."
                  className="w-full p-2.5 border-2 border-black font-sans text-sm placeholder:text-black/40 focus:bg-[#FFE600]/20 focus:outline-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block font-black uppercase text-black mb-1">
                  TAGS (SEPARADAS POR VÍRGULA)
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="Brutalismo, Figma, Tipografia, UI"
                  className="w-full p-2.5 border-2 border-black font-mono font-bold placeholder:text-black/40 focus:bg-[#FFE600]/20 focus:outline-none"
                />
              </div>

              {/* Author info */}
              <div>
                <label className="block font-black uppercase text-black mb-1">
                  AUTOR & CARGO
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Nome do autor"
                    className="p-2.5 border-2 border-black font-mono font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="Cargo ou bio curta"
                    className="p-2.5 border-2 border-black font-mono font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Publication Toggles */}
            <div className="mt-6 pt-6 border-t-2 border-black flex flex-wrap items-center gap-6 font-mono text-xs font-bold">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-5 h-5 accent-black border-2 border-black"
                />
                <span className="uppercase">Publicar Imediatamente (Visível no Site)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 accent-[#FF4400] border-2 border-black"
                />
                <span className="uppercase text-[#FF4400]">★ Destaque na Página Inicial</span>
              </label>
            </div>
          </div>

          {/* Cover & Visual Identity */}
          <div className="border-brutal bg-white p-6 shadow-brutal">
            <h2 className="font-mono text-xs font-black uppercase tracking-wider bg-black text-white px-3 py-1 inline-block mb-6">
              [02] CAPA BRUTALISTA DO ARTIGO
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Cover settings */}
              <div className="lg:col-span-7 space-y-4 font-mono text-xs">
                {/* Color presets */}
                <div>
                  <label className="block font-black uppercase text-black mb-2">
                    COR DE ACENTO DA CAPA
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map((p) => (
                      <button
                        type="button"
                        key={p.hex}
                        onClick={() => setCoverColor(p.hex)}
                        style={{ backgroundColor: p.hex }}
                        className={`w-10 h-10 border-2 border-black flex items-center justify-center font-bold text-xs ${
                          coverColor === p.hex ? 'ring-4 ring-black scale-110' : ''
                        }`}
                        title={p.name}
                      >
                        {coverColor === p.hex ? '✓' : ''}
                      </button>
                    ))}
                    <input
                      type="text"
                      value={coverColor}
                      onChange={(e) => setCoverColor(e.target.value)}
                      placeholder="#FFE600"
                      className="w-24 p-2 border-2 border-black font-mono font-bold uppercase text-center"
                    />
                  </div>
                </div>

                {/* Pattern */}
                <div>
                  <label className="block font-black uppercase text-black mb-2">
                    PADRÃO GEOMÉTRICO DE FUNDO
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['stripes', 'grid', 'dots', 'blocks'] as const).map((pat) => (
                      <button
                        type="button"
                        key={pat}
                        onClick={() => setCoverPattern(pat)}
                        className={`p-2 border-2 border-black uppercase font-bold text-center ${
                          coverPattern === pat
                            ? 'bg-black text-white'
                            : 'bg-[#F4F4F0] hover:bg-zinc-200'
                        }`}
                      >
                        {pat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Custom Image */}
                <div>
                  <label className="block font-black uppercase text-black mb-1">
                    URL DE IMAGEM EXTERNA (OPCIONAL)
                  </label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 border-2 border-black font-mono placeholder:text-black/40 focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Real-time Cover Preview */}
              <div className="lg:col-span-5">
                <span className="block font-mono text-[10px] font-black uppercase text-black/60 mb-2">
                  PRÉVIA DA CAPA RENDERIZADA:
                </span>
                <div className="border-2 border-black shadow-brutal">
                  <BrutalistCover
                    title={title || 'TÍTULO DO SEU ARTIGO'}
                    category={customCategory.trim() || category}
                    color={coverColor}
                    pattern={coverPattern}
                    image={coverImage.trim() || undefined}
                    className="h-56 w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content & Markdown Editor */}
          <div className="border-brutal bg-white p-6 shadow-brutal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="font-mono text-xs font-black uppercase tracking-wider bg-black text-white px-3 py-1 inline-block">
                [03] CONTEÚDO DO ENSAIO (MARKDOWN)
              </h2>

              <div className="flex items-center gap-1 font-mono text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab('split')}
                  className={`px-2.5 py-1 border-2 border-black uppercase ${
                    activeTab === 'split' ? 'bg-black text-white' : 'bg-white'
                  }`}
                >
                  Dividido
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-2.5 py-1 border-2 border-black uppercase ${
                    activeTab === 'editor' ? 'bg-black text-white' : 'bg-white'
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-2.5 py-1 border-2 border-black uppercase ${
                    activeTab === 'preview' ? 'bg-black text-white' : 'bg-white'
                  }`}
                >
                  Prévia
                </button>
              </div>
            </div>

            {/* Markdown helper toolbar */}
            <div className="flex flex-wrap gap-1.5 p-2 bg-[#F4F4F0] border-2 border-black mb-4 font-mono text-xs">
              <button
                type="button"
                onClick={() => insertMarkdown('## Novo Subtítulo')}
                className="px-2 py-1 bg-white border border-black font-bold hover:bg-[#FFE600]"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('### Seção Menor')}
                className="px-2 py-1 bg-white border border-black font-bold hover:bg-[#FFE600]"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('> "Citação brutalista em destaque aqui."')}
                className="px-2 py-1 bg-white border border-black font-bold hover:bg-[#FFE600]"
              >
                Citação
              </button>
              <button
                type="button"
                onClick={() =>
                  insertMarkdown('```css\n.regra {\n  border: 3px solid #000;\n}\n```')
                }
                className="px-2 py-1 bg-white border border-black font-bold hover:bg-[#FFE600]"
              >
                Código
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('* Item com marcador')}
                className="px-2 py-1 bg-white border border-black font-bold hover:bg-[#FFE600]"
              >
                Lista
              </button>
              <button
                type="button"
                onClick={() =>
                  insertMarkdown(
                    '| Coluna 1 | Coluna 2 |\n| :--- | :--- |\n| Dado A | Dado B |'
                  )
                }
                className="px-2 py-1 bg-white border border-black font-bold hover:bg-[#FFE600]"
              >
                Tabela
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('---')}
                className="px-2 py-1 bg-white border border-black font-bold hover:bg-[#FFE600]"
              >
                Linha Divisória
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
                    className="w-full flex-1 p-4 border-2 border-black font-mono text-sm leading-relaxed bg-[#FFFFFF] text-black focus:outline-none focus:bg-[#FFE600]/10"
                  />
                </div>
              )}

              {(activeTab === 'split' || activeTab === 'preview') && (
                <div
                  className={`${
                    activeTab === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'
                  } border-2 border-black bg-white p-6 overflow-y-auto max-h-[600px]`}
                >
                  <div className="border-b-2 border-black pb-2 mb-4 font-mono text-xs font-black text-black/60 uppercase">
                    /// PRÉVIA AO VIVO DA RENDERIZAÇÃO
                  </div>
                  <MarkdownRenderer content={content} />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Submit */}
          <div className="flex justify-end gap-4 font-mono">
            <Link
              href="/admin"
              className="btn-brutal bg-white px-6 py-3 text-sm font-bold text-black"
            >
              CANCELAR
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-brutal bg-[#FFE600] px-8 py-3 text-sm font-black text-black hover:bg-[#00E575]"
            >
              {isSubmitting ? 'SALVANDO...' : 'CONFIRMAR & SALVAR ARTIGO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
