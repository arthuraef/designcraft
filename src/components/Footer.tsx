'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#D0D5DD] bg-[#FFFFFF] text-[#111215] font-mono">
      {/* Top Banner */}
      <div className="border-b border-[#D0D5DD] p-6 sm:p-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E63926] inline-block" />
            <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#111215]">
              good morning news<span className="text-[#E63926]">.</span>
            </h3>
          </div>
          <p className="text-[#64748B] text-xs font-sans max-w-xl leading-relaxed">
            A síntese matinal das 07:00 AM. Um agente autônomo que varre as principais redações do planeta para extrair as 2 histórias fundamentais de 6 domínios essenciais. Zero clickbait, sem feed infinito.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/manifesto"
            className="px-4 py-2 bg-[#111215] text-white rounded-sm hover:bg-[#E63926] transition-colors flex items-center gap-2 font-medium"
          >
            <span>LER MANIFESTO</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://github.com/arthuraef/designcraft"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#F8F9FA] border border-[#D0D5DD] hover:border-[#111215] text-[#111215] rounded-sm transition-colors flex items-center gap-2 font-medium"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
          </a>
        </div>
      </div>

      {/* Grid Columns */}
      <div className="max-w-7xl mx-auto p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-[#D0D5DD] text-xs">
        <div>
          <h4 className="font-bold uppercase text-[#111215] mb-3 tracking-wider">
            [01] 6 DOMÍNIOS CURADOS
          </h4>
          <ul className="space-y-2 text-[#64748B]">
            <li><Link href="/?category=UX+Design" className="hover:text-[#E63926] transition-colors">→ UX DESIGN (2 HISTÓRIAS)</Link></li>
            <li><Link href="/?category=Tecnologia" className="hover:text-[#E63926] transition-colors">→ TECNOLOGIA (2 HISTÓRIAS)</Link></li>
            <li><Link href="/?category=AI" className="hover:text-[#E63926] transition-colors">→ AI & MODELOS (2 HISTÓRIAS)</Link></li>
            <li><Link href="/?category=Games" className="hover:text-[#E63926] transition-colors">→ GAMES (2 HISTÓRIAS)</Link></li>
            <li><Link href="/?category=Board+Games" className="hover:text-[#E63926] transition-colors">→ BOARD GAMES (2 HISTÓRIAS)</Link></li>
            <li><Link href="/?category=Ciência" className="hover:text-[#E63926] transition-colors">→ CIÊNCIA (2 HISTÓRIAS)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase text-[#111215] mb-3 tracking-wider">
            [02] ARQUITETURA EDITORIAL
          </h4>
          <ul className="space-y-2 text-[#64748B]">
            <li><Link href="/manifesto" className="hover:text-[#E63926] transition-colors">→ O MANIFESTO MATINAL</Link></li>
            <li><Link href="/" className="hover:text-[#E63926] transition-colors">→ EDIÇÃO DO DIA (07:00 AM)</Link></li>
            <li><a href="#topo" className="hover:text-[#E63926] transition-colors">→ RETORNAR AO TOPO ↑</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase text-[#111215] mb-3 tracking-wider">
            [03] SINAL CONTRA O RUÍDO
          </h4>
          <p className="text-[#64748B] font-sans text-xs leading-relaxed">
            &ldquo;A quantidade de informação que você consome não define sua clareza; o rigor com que você filtra o ruído, sim.&rdquo; Apenas 12 histórias por dia. Nada a mais.
          </p>
        </div>

        <div>
          <h4 className="font-bold uppercase text-[#111215] mb-3 tracking-wider">
            [04] ESPECIFICAÇÃO DO AGENTE
          </h4>
          <div className="bg-[#F8F9FA] border border-[#E2E8F0] p-3 text-[11px] text-[#64748B] space-y-1 rounded-sm">
            <p>CRON: 07:00 AM BRT (10:00 UTC)</p>
            <p>FONTES: ARS, SMASHING, DECODER, ETC.</p>
            <p>FORMATO: SWISS EDITORIAL STATIC</p>
            <p>CURADORIA: AUTÔNOMA RIGOROSA</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#94A3B8] gap-2">
        <p>© 2026 GOOD MORNING NEWS — SÍNTESE MATINAL INDEPENDENTE</p>
        <p className="font-mono">ED. 07:00 AM // INTERNATIONAL TYPOGRAPHIC STYLE</p>
      </div>
    </footer>
  );
}
