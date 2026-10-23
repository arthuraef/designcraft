'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Plus, Terminal } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isAdmin = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 bg-[#E9ECEF]/95 backdrop-blur-md border-b border-[#D0D5DD]">
      {/* Top thin technical ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-1.5 flex justify-between items-center text-[11px] font-mono border-b border-[#D0D5DD]/50 text-[#64748B]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[#111215] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63926] animate-pulse" />
            LIVE // ARCHIVE 2026
          </span>
          <span className="hidden sm:inline text-[#CBD5E1]">/</span>
          <span className="hidden sm:inline tracking-wider uppercase">
            REF: 37.5005 — 122.5239
          </span>
        </div>
        <div className="flex items-center gap-4 text-[#111215] font-medium">
          <span className="hidden md:inline text-[10px] uppercase tracking-widest text-[#64748B]">
            INTERNATIONAL TYPOGRAPHIC ARCHIVE
          </span>
          <span className="bg-[#FFFFFF] px-2 py-0.5 border border-[#D0D5DD] rounded-sm text-[10px]">
            {time || '00:00:00'} BRT
          </span>
        </div>
      </div>

      {/* Main navigation header (Veeps / Swiss Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Left: Minimal glyph + Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm border border-[#111215] flex items-center justify-center font-mono font-bold text-xs bg-[#FFFFFF] group-hover:bg-[#111215] group-hover:text-white transition-colors">
              =
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-2xl tracking-tighter text-[#111215] lowercase leading-none">
                designcraft.
              </span>
              <span className="text-[10px] font-mono text-[#E63926] font-bold uppercase tracking-widest">
                ’26
              </span>
            </div>
          </Link>

          <span className="hidden lg:inline-block text-[11px] font-mono text-[#64748B] tracking-tight border-l border-[#D0D5DD] pl-4">
            ESSAYS ON VISUAL ARCHITECTURE
          </span>
        </div>

        {/* Center / Right Links */}
        <nav className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-sm transition-all uppercase tracking-wider ${
              pathname === '/'
                ? 'bg-[#111215] text-white font-semibold'
                : 'text-[#111215] hover:bg-white/80 font-medium'
            }`}
          >
            Artigos
          </Link>
          <Link
            href="/manifesto"
            className={`hidden sm:inline-block px-3 py-1.5 rounded-sm transition-all uppercase tracking-wider ${
              pathname === '/manifesto'
                ? 'bg-[#111215] text-white font-semibold'
                : 'text-[#111215] hover:bg-white/80 font-medium'
            }`}
          >
            Manifesto
          </Link>

          {/* Admin CMS Access */}
          {isAdmin ? (
            <div className="flex items-center gap-2 pl-2 border-l border-[#D0D5DD]">
              <Link
                href="/"
                className="px-3 py-1.5 bg-[#FFFFFF] border border-[#D0D5DD] hover:border-[#111215] text-[#111215] rounded-sm transition-all uppercase font-medium flex items-center gap-1.5"
              >
                <span>Ver Site</span>
                <ArrowUpRight className="w-3 h-3 text-[#64748B]" />
              </Link>
              <Link
                href="/admin/new"
                className="px-3 py-1.5 bg-[#E63926] text-white hover:bg-[#111215] rounded-sm transition-all uppercase font-semibold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span className="hidden sm:inline">Novo Artigo</span>
              </Link>
            </div>
          ) : (
            <Link
              href="/admin"
              className="px-3.5 py-1.5 bg-[#FFFFFF] border border-[#D0D5DD] hover:border-[#111215] text-[#111215] rounded-sm transition-all uppercase font-semibold flex items-center gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#111215]" />
              <span>Admin / CMS</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
