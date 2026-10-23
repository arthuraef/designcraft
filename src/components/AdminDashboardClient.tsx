'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import {
  getStoredArticles,
  deleteStoredArticle,
  toggleStoredArticlePublish,
  resetStoredArticlesToSeeds,
  saveStoredArticles,
} from '@/lib/client-articles';
import {
  Plus,
  Search,
  Eye,
  Heart,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
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
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Sync with client storage on mount
  useEffect(() => {
    const stored = getStoredArticles();
    if (stored && stored.length > 0) {
      setArticles(stored);
    }
  }, []);

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

  const handleTogglePublish = (article: Article) => {
    const updated = toggleStoredArticlePublish(article.id);
    if (updated) {
      setArticles(getStoredArticles());
      showNotification(
        `Status alterado para ${updated.published ? 'PUBLICADO' : 'RASCUNHO'}`
      );
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`CONFIRMAR EXCLUSÃO DO ARTIGO:\n\n"${title}"\n\nEsta ação é irreversível.`)) {
      return;
    }

    const ok = deleteStoredArticle(id);
    if (ok) {
      setArticles(getStoredArticles());
      showNotification('Artigo removido com sucesso.');
    }
  };

  const handleExport = () => {
    const currentList = getStoredArticles();
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(currentList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `designcraft-export-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Backup JSON baixado com sucesso.');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (!Array.isArray(imported)) {
          throw new Error('O arquivo JSON deve conter uma lista de artigos');
        }

        saveStoredArticles(imported);
        setArticles(imported);
        showNotification('Artigos importados com sucesso.');
      } catch (err) {
        showNotification((err as Error).message, 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetSeeds = () => {
    if (
      !confirm(
        'RESTAURAR ARTIGOS ORIGINAIS?\n\nIsso recarregará os 5 ensaios seminais do DesignCraft.'
      )
    ) {
      return;
    }

    const reset = resetStoredArticlesToSeeds();
    setArticles(reset);
    showNotification('Repositório restaurado com os artigos seminais.');
  };

  return (
    <div className="min-h-screen bg-[#E9ECEF] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Admin Header (Surgical Industrial Console) */}
        <div className="border border-[#D0D5DD] bg-[#FFFFFF] p-6 sm:p-8 rounded-sm mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#64748B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63926]" />
                <span className="font-semibold text-[#111215] uppercase tracking-wider">
                  CONSOLA EDITORIAL // CMS DESIGNCRAFT
                </span>
                <span>/</span>
                <span>AIRSKIN® SPEC</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
                Centro de Comando Editorial
              </h1>
              <p className="text-[#64748B] font-sans text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                Gerencie, publique e audite o catálogo de ensaios com precisão tipográfica.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <Link
                href="/admin/new"
                className="px-4 py-2.5 bg-[#111215] text-white rounded-sm hover:bg-[#E63926] transition-colors flex items-center gap-2 font-semibold uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Novo Ensaio</span>
              </Link>
              <Link
                href="/"
                className="px-4 py-2.5 bg-[#F8F9FA] border border-[#D0D5DD] hover:border-[#111215] text-[#111215] rounded-sm transition-colors flex items-center gap-1.5 font-medium uppercase tracking-wider"
              >
                <span>Ver Site</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div
            className={`border p-3.5 mb-6 font-mono text-xs font-semibold flex items-center gap-2 rounded-sm ${
              notification.type === 'success'
                ? 'bg-[#FFFFFF] border-[#10B981] text-[#065F46]'
                : 'bg-[#FFFFFF] border-[#EF4444] text-[#991B1B]'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-[#10B981]" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            )}
            <span>{notification.text}</span>
          </div>
        )}

        {/* Stats Grid (Tabular Technical Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8 font-mono">
          <div className="border border-[#D0D5DD] bg-white p-4 rounded-sm">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">
              TOTAL DE ARTIGOS
            </span>
            <span className="text-2xl font-extrabold text-[#111215] mt-1 block">
              {stats.total.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="border border-[#D0D5DD] bg-white p-4 rounded-sm">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">
              PUBLICADOS
            </span>
            <span className="text-2xl font-extrabold text-[#111215] mt-1 block flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              {stats.published.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="border border-[#D0D5DD] bg-white p-4 rounded-sm">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">
              RASCUNHOS
            </span>
            <span className="text-2xl font-extrabold text-[#64748B] mt-1 block">
              {stats.drafts.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="border border-[#D0D5DD] bg-white p-4 rounded-sm">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">
              LEITURAS TOTAIS
            </span>
            <span className="text-2xl font-extrabold text-[#111215] mt-1 block">
              {stats.views}
            </span>
          </div>
          <div className="border border-[#D0D5DD] bg-white p-4 rounded-sm col-span-2 lg:col-span-1">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">
              CURTIDAS
            </span>
            <span className="text-2xl font-extrabold text-[#E63926] mt-1 block">
              {stats.likes}
            </span>
          </div>
        </div>

        {/* Toolbar & Filter */}
        <div className="border border-[#D0D5DD] bg-white p-4 sm:p-5 rounded-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-3.5 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="FILTRAR POR TÍTULO OU CATEGORIA..."
                className="w-full pl-9 pr-4 py-2 bg-[#F8F9FA] border border-[#D0D5DD] rounded-sm font-mono text-xs font-medium text-[#111215] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#111215] focus:bg-white transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-sm border uppercase transition-colors ${
                  statusFilter === 'ALL'
                    ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                    : 'bg-[#F8F9FA] text-[#64748B] border-[#D0D5DD] hover:border-[#111215]'
                }`}
              >
                Todos ({stats.total})
              </button>
              <button
                onClick={() => setStatusFilter('PUBLISHED')}
                className={`px-3 py-1.5 rounded-sm border uppercase transition-colors ${
                  statusFilter === 'PUBLISHED'
                    ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                    : 'bg-[#F8F9FA] text-[#64748B] border-[#D0D5DD] hover:border-[#111215]'
                }`}
              >
                Publicados ({stats.published})
              </button>
              <button
                onClick={() => setStatusFilter('DRAFT')}
                className={`px-3 py-1.5 rounded-sm border uppercase transition-colors ${
                  statusFilter === 'DRAFT'
                    ? 'bg-[#111215] text-white border-[#111215] font-semibold'
                    : 'bg-[#F8F9FA] text-[#64748B] border-[#D0D5DD] hover:border-[#111215]'
                }`}
              >
                Rascunhos ({stats.drafts})
              </button>
            </div>

            {/* Data Actions */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={handleExport}
                className="px-3 py-1.5 bg-[#F8F9FA] border border-[#D0D5DD] hover:border-[#111215] rounded-sm flex items-center gap-1 font-medium text-[#111215] transition-colors"
                title="Exportar todos os artigos em arquivo JSON"
              >
                <Download className="w-3 h-3" />
                <span className="hidden sm:inline">EXPORTAR</span>
              </button>

              <label className="px-3 py-1.5 bg-[#F8F9FA] border border-[#D0D5DD] hover:border-[#111215] rounded-sm flex items-center gap-1 font-medium text-[#111215] transition-colors cursor-pointer">
                <Upload className="w-3 h-3" />
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
                className="px-3 py-1.5 bg-[#F8F9FA] border border-[#D0D5DD] hover:border-[#E63926] hover:text-[#E63926] rounded-sm flex items-center gap-1 font-medium text-[#64748B] transition-colors"
                title="Restaurar artigos padrão"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">RESET</span>
              </button>
            </div>
          </div>
        </div>

        {/* Articles Table (Airskin / Technical Tabular Style) */}
        <div className="border border-[#D0D5DD] bg-white rounded-sm overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] text-[#64748B] border-b border-[#D0D5DD]">
                <th className="p-3 w-10 text-center">REF</th>
                <th className="p-3">TÍTULO & SLUG</th>
                <th className="p-3">CATEGORIA</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">MÉTRICAS</th>
                <th className="p-3">DATA</th>
                <th className="p-3 text-right">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#94A3B8]">
                    Nenhum documento encontrado com os parâmetros atuais.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article, idx) => (
                  <tr
                    key={article.id}
                    className="hover:bg-[#F8F9FA] transition-colors"
                  >
                    <td className="p-3 text-center text-[#94A3B8]">
                      {(idx + 1).toString().padStart(2, '0')}
                    </td>

                    <td className="p-3">
                      <div className="font-bold text-sm text-[#111215] tracking-tight leading-snug">
                        {article.featured && (
                          <span className="text-[#E63926] mr-1.5 font-bold">★</span>
                        )}
                        {article.title}
                      </div>
                      <div className="text-[11px] text-[#64748B] font-mono mt-0.5">
                        /{article.slug}
                      </div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span className="text-[#111215] font-semibold text-[11px] uppercase">
                        {article.category}
                      </span>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(article)}
                        className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                          article.published
                            ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                            : 'bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]'
                        }`}
                        title="Alternar Publicado / Rascunho"
                      >
                        {article.published ? '● PUBLICADO' : '○ RASCUNHO'}
                      </button>
                    </td>

                    <td className="p-3 whitespace-nowrap text-[#64748B]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1" title="Visualizações">
                          <Eye className="w-3 h-3 text-[#94A3B8]" />
                          {article.views || 0}
                        </span>
                        <span className="flex items-center gap-1" title="Curtidas">
                          <Heart className="w-3 h-3 text-[#E63926]" />
                          {article.likes || 0}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 whitespace-nowrap text-[#64748B]">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString('pt-BR')
                        : '—'}
                    </td>

                    <td className="p-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/article/?slug=${article.slug}`}
                          className="p-1.5 text-[#64748B] hover:text-[#111215] hover:bg-[#F1F5F9] rounded-sm transition-colors"
                          title="Abrir no site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/admin/edit?id=${article.id}`}
                          className="p-1.5 text-[#64748B] hover:text-[#111215] hover:bg-[#F1F5F9] rounded-sm transition-colors"
                          title="Editar artigo"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          className="p-1.5 text-[#64748B] hover:text-[#E63926] hover:bg-[#FDECEB] rounded-sm transition-colors"
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
