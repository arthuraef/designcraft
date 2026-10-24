'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Radio } from 'lucide-react';

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

  return (
    <header className="sticky top-0 z-50 bg-[#E9ECEF]/95 backdrop-blur-md border-b border-[#D0D5DD]">
      {/* Top thin technical ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-1.5 flex justify-between items-center text-[11px] font-mono border-b border-[#D0D5DD]/50 text-[#64748B]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[#111215] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63926] animate-pulse" />
            ED. 07:00 AM // DIÁRIO
          </span>
          <span className="hidden sm:inline text-[#CBD5E1]">/</span>
          <span className="hidden sm:inline tracking-wider uppercase">
            6 DOMÍNIOS × 2 HISTÓRIAS
          </span>
        </div>
        <div className="flex items-center gap-4 text-[#111215] font-medium">
          <span className="hidden md:inline text-[10px] uppercase tracking-widest text-[#64748B]">
            INTELIGÊNCIA MATINAL SINTETIZADA
          </span>
          <span className="bg-[#FFFFFF] px-2 py-0.5 border border-[#D0D5DD] rounded-sm text-[10px]">
            {time || '07:00:00'} BRT
          </span>
        </div>
      </div>

      {/* Main navigation header (Swiss Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Left: Minimal glyph + Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm border border-[#111215] flex items-center justify-center font-mono font-bold text-xs bg-[#FFFFFF] group-hover:bg-[#111215] group-hover:text-white transition-colors">
              ☼
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-2xl tracking-tighter text-[#111215] lowercase leading-none">
                good morning news<span className="text-[#E63926]">.</span>
              </span>
            </div>
          </Link>

          <span className="hidden lg:inline-block text-[11px] font-mono text-[#64748B] tracking-tight border-l border-[#D0D5DD] pl-4">
            A SÍNTESE DIÁRIA DAS 7 DA MANHÃ
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
            Edição do Dia
          </Link>
          <Link
            href="/manifesto"
            className={`px-3 py-1.5 rounded-sm transition-all uppercase tracking-wider ${
              pathname === '/manifesto'
                ? 'bg-[#111215] text-white font-semibold'
                : 'text-[#111215] hover:bg-white/80 font-medium'
            }`}
          >
            Manifesto
          </Link>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] border border-[#D0D5DD] rounded-sm text-[11px] text-[#111215] font-semibold">
            <Radio className="w-3 h-3 text-[#E63926] animate-pulse" />
            <span>AGENTE ATIVO 07:00</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
