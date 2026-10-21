'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Terminal, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-black bg-black text-white font-mono">
      {/* Top Banner */}
      <div className="border-b-2 border-white/20 p-6 sm:p-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-[#FFE600] inline-block" />
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              DESIGNCRAFT ARCHIVE
            </h3>
          </div>
          <p className="text-white/70 text-sm max-w-xl">
            Uma publicação independente sobre a materialidade do design digital, crítica de sistemas e rejeição ativa do deserto visual corporativo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="btn-brutal bg-[#FFE600] text-black px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-[#00E575]"
          >
            <Terminal className="w-4 h-4" />
            <span>PAINEL ADMIN</span>
          </Link>
          <a
            href="https://github.com/arthuraef/designcraft"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal bg-white text-black px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-[#FF4400] hover:text-white"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GITHUB</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Columns */}
      <div className="max-w-7xl mx-auto p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b-2 border-white/20">
        <div>
          <h4 className="text-sm font-black uppercase text-[#FFE600] mb-4 tracking-wider">
            [01] CATEGORIAS
          </h4>
          <ul className="space-y-2 text-xs font-bold text-white/80">
            <li><Link href="/?category=TEORIA+CRÍTICA" className="hover:text-[#FFE600] transition-colors">→ TEORIA CRÍTICA</Link></li>
            <li><Link href="/?category=RADICAL+WEB" className="hover:text-[#FFE600] transition-colors">→ RADICAL WEB</Link></li>
            <li><Link href="/?category=DESIGN+SYSTEMS" className="hover:text-[#FFE600] transition-colors">→ DESIGN SYSTEMS</Link></li>
            <li><Link href="/?category=TIPOGRAFIA" className="hover:text-[#FFE600] transition-colors">→ TIPOGRAFIA</Link></li>
            <li><Link href="/?category=ANTI-PATTERNS" className="hover:text-[#FFE600] transition-colors">→ ANTI-PATTERNS</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase text-[#FFE600] mb-4 tracking-wider">
            [02] ARQUITETURA
          </h4>
          <ul className="space-y-2 text-xs font-bold text-white/80">
            <li><Link href="/manifesto" className="hover:text-[#FFE600] transition-colors">→ O MANIFESTO BRUTALISTA</Link></li>
            <li><Link href="/admin" className="hover:text-[#FFE600] transition-colors">→ CMS & GESTÃO DE ARTIGOS</Link></li>
            <li><Link href="/admin/new" className="hover:text-[#FFE600] transition-colors">→ NOVO ARTIGO</Link></li>
            <li><a href="#topo" className="hover:text-[#FFE600] transition-colors">→ VOLTAR AO TOPO ↑</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase text-[#FFE600] mb-4 tracking-wider">
            [03] MANIFESTO RÁPIDO
          </h4>
          <p className="text-xs text-white/70 leading-relaxed">
            &ldquo;Rejeitamos cantos arredondados sem motivo, gradientes pasteurizados e interfaces covardes. O HTML é um material nobre. Exponha a estrutura.&rdquo;
          </p>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase text-[#FFE600] mb-4 tracking-wider">
            [04] ESPECIFICAÇÕES
          </h4>
          <div className="bg-zinc-900 border border-zinc-700 p-3 text-[11px] text-white/70 space-y-1">
            <p>STACK: NEXT.JS 16 / REACT 19</p>
            <p>CSS: TAILWIND V4 + RAW BRUTALISM</p>
            <p>FONT: SPACE GROTESK / JETBRAINS</p>
            <p>STATUS: 100% OPERACIONAL</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-2">
        <p>© 2026 DESIGNCRAFT — REPOSITÓRIO PÚBLICO LIVRE</p>
        <p className="font-mono">PROJETADO COM ATRIBUTO DE VERDADE MATERIAL</p>
      </div>
    </footer>
  );
}
