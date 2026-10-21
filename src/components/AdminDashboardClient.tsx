'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Heart,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  FileText,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';

interface AdminDashboardClientProps {
  initialArticles: Article[];
}

export default function AdminDashboardClient({
  initialArticles,
}: AdminDashboardClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Stats
  const stats = useMemo(() => {
    const total = articles.length;
    const published = articles.filter((a) => a.published).length;
    const drafts = total - published;
    const views = articles.reduce((acc, a) => acc + (a.views || 0), 0);
    const likes = articles.reduce((acc, a) => acc + (a.likes || 0), 0);
    const categoriesCount = new Set(articles.map((a) => a.category)).size;

    return { total, published, drafts, views, likes, categoriesCount };
  }, [articles]);

  // Filtered
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch =
        search === '' ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.category.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === 'ALL'
          ? true
          : statusFilter === 'PUBLISHED'
          ? a.published
          : !a.published;

      return matchSearch && matchStatus;
    });
  }, [articles, search, statusFilter]);

  // Toggle publish
  const handleTogglePublish = async (article: Article) => {
    setLoadingAction(`toggle-${article.id}`);
    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !article.published }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? data.article : a))
      );
      showNotification(
        `Status alterado para ${!article.published ? 'PUBLICADO' : 'RASCUNHO'}`
      );
    } catch (err) {
      showNotification((err as Error).message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  // Delete article
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`CONFIRMAR EXCLUSÃO DO ARTIGO:\n\n"${title}"\n\nEsta ação é irreversível.`)) {
      return;
    }

    setLoadingAction(`del-${id}`);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setArticles((prev) => prev.filter((a) => a.id !== id));
      showNotification('Artigo removido com sucesso.');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  // Export JSON
  const handleExport = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `designcraft-export-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Backup JSON baixado com sucesso!');
  };

  // Import JSON
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (!Array.isArray(imported)) {
          throw new Error('O arquivo JSON deve conter uma lista de artigos');
        }

        // For simplicity, overwrite or merge
        for (const item of imported) {
          await fetch('/api/articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
        }

        const refreshed = await fetch('/api/articles?all=true').then((r) => r.json());
        if (refreshed.articles) {
          setArticles(refreshed.articles);
        }
        showNotification('Artigos importados com sucesso!');
      } catch (err) {
        showNotification((err as Error).message, 'error');
      }
    };
    reader.readAsText(file);
  };

  // Reset to seeds
  const handleResetSeeds = async () => {
    if (
      !confirm(
        'RESTAURAR ARTIGOS ORIGINAIS?\n\nIsso recarregará os 5 ensaios seminais do DesignCraft.'
      )
    ) {
      return;
    }

    setLoadingAction('reset');
    try {
      const res = await fetch('/api/articles/reset', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setArticles(data.articles);
      showNotification('Repositório restaurado com os artigos seminais!');
    } catch (err) {
      showNotification((err as Error).message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="border-brutal bg-black text-white p-6 sm:p-8 shadow-brutal-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="w-2.5 h-2.5 bg-[#00E575] inline-block" />
                <span className="text-[#FFE600] font-black uppercase">
                  PAINEL ADMINISTRATIVO // CMS DESIGNCRAFT
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white">
                CENTRO DE COMANDO EDITORIAL
              </h1>
              <p className="text-zinc-300 font-sans text-sm sm:text-base mt-2 max-w-xl">
                Crie, edite, organize e audite os ensaios críticos de design publicados no repositório.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono">
              <Link
                href="/admin/new"
                className="btn-brutal bg-[#FFE600] text-black px-5 py-3 text-sm font-black flex items-center gap-2 hover:bg-[#00E575]"
              >
                <Plus className="w-4 h-4" />
                <span>NOVO ARTIGO</span>
              </Link>
              <Link
                href="/"
                className="btn-brutal bg-white text-black px-4 py-3 text-sm font-bold flex items-center gap-2 hover:bg-zinc-200"
              >
                <span>VER SITE</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div
            className={`border-brutal p-4 mb-6 font-mono text-sm font-black flex items-center gap-2 shadow-brutal ${
              notification.type === 'success'
                ? 'bg-[#00E575] text-black'
                : 'bg-[#FF4400] text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            <span>{notification.text}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8 font-mono">
          <div className="border-brutal bg-white p-4 shadow-brutal">
            <span className="text-[11px] font-bold text-black/60 uppercase block">
              TOTAL DE ARTIGOS
            </span>
            <span className="text-3xl font-black text-black">{stats.total}</span>
          </div>
          <div className="border-brutal bg-white p-4 shadow-brutal">
            <span className="text-[11px] font-bold text-black/60 uppercase block">
              PUBLICADOS
            </span>
            <span className="text-3xl font-black text-[#00E575]">
              {stats.published}
            </span>
          </div>
          <div className="border-brutal bg-white p-4 shadow-brutal">
            <span className="text-[11px] font-bold text-black/60 uppercase block">
              RASCUNHOS
            </span>
            <span className="text-3xl font-black text-[#FF4400]">
              {stats.drafts}
            </span>
          </div>
          <div className="border-brutal bg-white p-4 shadow-brutal">
            <span className="text-[11px] font-bold text-black/60 uppercase block">
              LEITURAS TOTAIS
            </span>
            <span className="text-3xl font-black text-black">{stats.views}</span>
          </div>
          <div className="border-brutal bg-white p-4 shadow-brutal col-span-2 lg:col-span-1">
            <span className="text-[11px] font-bold text-black/60 uppercase block">
              CURTIDAS REGISTRADAS
            </span>
            <span className="text-3xl font-black text-[#0029FF]">{stats.likes}</span>
          </div>
        </div>

        {/* Toolbar & Filter */}
        <div className="border-brutal bg-white p-4 sm:p-6 shadow-brutal mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="FILTRAR POR TÍTULO OU CATEGORIA..."
                className="w-full pl-9 pr-4 py-2 border-2 border-black font-mono text-xs font-bold text-black placeholder:text-black/50 focus:outline-none focus:bg-[#FFE600]/20"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 font-mono text-xs font-bold">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-2 border-2 border-black uppercase ${
                  statusFilter === 'ALL'
                    ? 'bg-black text-white'
                    : 'bg-white hover:bg-zinc-100'
                }`}
              >
                Todos ({stats.total})
              </button>
              <button
                onClick={() => setStatusFilter('PUBLISHED')}
                className={`px-3 py-2 border-2 border-black uppercase ${
                  statusFilter === 'PUBLISHED'
                    ? 'bg-black text-[#00E575]'
                    : 'bg-white hover:bg-zinc-100'
                }`}
              >
                Publicados ({stats.published})
              </button>
              <button
                onClick={() => setStatusFilter('DRAFT')}
                className={`px-3 py-2 border-2 border-black uppercase ${
                  statusFilter === 'DRAFT'
                    ? 'bg-black text-[#FFE600]'
                    : 'bg-white hover:bg-zinc-100'
                }`}
              >
                Rascunhos ({stats.drafts})
              </button>
            </div>

            {/* Data Actions (Backup / Restore) */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={handleExport}
                className="btn-brutal bg-white px-3 py-2 flex items-center gap-1 font-bold text-black hover:bg-[#FFE600]"
                title="Exportar todos os artigos em arquivo JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">EXPORTAR</span>
              </button>

              <label className="btn-brutal bg-white px-3 py-2 flex items-center gap-1 font-bold text-black hover:bg-[#FFE600] cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">IMPORTAR</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleResetSeeds}
                disabled={loadingAction === 'reset'}
                className="btn-brutal bg-white px-3 py-2 flex items-center gap-1 font-bold text-black hover:bg-[#FF4400] hover:text-white"
                title="Restaurar artigos padrão"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    loadingAction === 'reset' ? 'animate-spin' : ''
                  }`}
                />
                <span className="hidden sm:inline">RESET</span>
              </button>
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="border-brutal bg-white shadow-brutal-lg overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-black text-white border-b-2 border-black">
                <th className="p-3 w-12 text-center">COR</th>
                <th className="p-3">TÍTULO & SLUG</th>
                <th className="p-3">CATEGORIA</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">MÉTRICAS</th>
                <th className="p-3">DATA</th>
                <th className="p-3 text-right">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-black/60 font-bold">
                    Nenhum artigo encontrado.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article, idx) => (
                  <tr
                    key={article.id}
                    className={`border-b-2 border-black hover:bg-[#FFE600]/20 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F4F0]'
                    }`}
                  >
                    {/* Cover color badge */}
                    <td className="p-3 text-center">
                      <div
                        className="w-6 h-6 border-2 border-black mx-auto"
                        style={{ backgroundColor: article.coverColor || '#FFE600' }}
                        title={`Cor de capa: ${article.coverColor}`}
                      />
                    </td>

                    {/* Title & Slug */}
                    <td className="p-3">
                      <div className="font-black text-sm text-black uppercase leading-tight">
                        {article.featured && (
                          <span className="text-[#FF4400] mr-1.5 font-black">★</span>
                        )}
                        {article.title}
                      </div>
                      <div className="text-[11px] text-black/60 font-mono mt-0.5">
                        /{article.slug}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-3 whitespace-nowrap">
                      <span className="bg-black text-white px-2 py-0.5 font-bold uppercase text-[11px]">
                        {article.category}
                      </span>
                    </td>

                    {/* Status Toggle Badge */}
                    <td className="p-3 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(article)}
                        disabled={loadingAction === `toggle-${article.id}`}
                        className={`px-2 py-1 font-black text-[10px] uppercase border-2 border-black shadow-brutal-sm cursor-pointer ${
                          article.published
                            ? 'bg-[#00E575] text-black hover:bg-[#00c966]'
                            : 'bg-[#FFE600] text-black hover:bg-[#ffd900]'
                        }`}
                        title="Clique para alternar Publicado / Rascunho"
                      >
                        {article.published ? '✓ PUBLICADO' : '● RASCUNHO'}
                      </button>
                    </td>

                    {/* Stats */}
                    <td className="p-3 whitespace-nowrap font-bold text-black/70">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1" title="Visualizações">
                          <Eye className="w-3 h-3 text-black" />
                          {article.views || 0}
                        </span>
                        <span className="flex items-center gap-1" title="Curtidas">
                          <Heart className="w-3 h-3 text-[#FF4400]" />
                          {article.likes || 0}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="p-3 whitespace-nowrap font-bold text-black/70">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString('pt-BR')
                        : '—'}
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View in site */}
                        <Link
                          href={`/article/${article.slug}`}
                          target="_blank"
                          className="btn-brutal bg-white p-1.5 text-black hover:bg-[#FFE600]"
                          title="Abrir no site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/admin/edit/${article.id}`}
                          className="btn-brutal bg-[#FFE600] p-1.5 text-black hover:bg-black hover:text-white"
                          title="Editar artigo"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          disabled={loadingAction === `del-${article.id}`}
                          className="btn-brutal bg-white p-1.5 text-[#FF4400] hover:bg-[#FF4400] hover:text-white"
                          title="Excluir artigo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
