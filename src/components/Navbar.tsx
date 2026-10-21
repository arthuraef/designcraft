'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Plus, Sparkles, Terminal } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-[#F4F4F0] border-b-4 border-black">
      {/* Top micro ticker bar */}
      <div className="bg-black text-white text-xs font-mono py-1 px-4 flex justify-between items-center border-b border-black">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#00E575] animate-ping" />
          <span className="font-bold tracking-wider">DESIGNCRAFT_SYS // VER 4.2.0</span>
          <span className="hidden sm:inline opacity-60">|</span>
          <span className="hidden sm:inline opacity-80">RAW_BRUTALIST_ESSAY_REPOSITORY</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-[#FFE600] font-bold">
            ESTÉTICA SEM CONCESSÕES
          </span>
          <span className="bg-zinc-800 px-2 py-0.5 border border-zinc-700">
            {time || '00:00:00'} BRT
          </span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-mono font-black text-xl border-2 border-black group-hover:bg-[#FFE600] group-hover:text-black transition-colors shadow-brutal-sm">
            D/C
          </div>
          <div>
            <span className="font-black tracking-tighter text-2xl sm:text-3xl text-black block leading-none">
              DESIGNCRAFT
            </span>
            <span className="font-mono text-[10px] tracking-widest text-black/70 uppercase block font-bold">
              CRÍTICA & ARQUITETURA DE DESIGN
            </span>
          </div>
        </Link>

        {/* Center / Right Links */}
        <nav className="flex items-center gap-2 sm:gap-4 font-mono text-sm font-bold">
          <Link
            href="/"
            className={`px-3 py-1.5 border-2 border-black uppercase transition-all ${
              pathname === '/'
                ? 'bg-black text-white'
                : 'bg-white hover:bg-[#FFE600] text-black shadow-brutal-sm'
            }`}
          >
            Artigos
          </Link>
          <Link
            href="/manifesto"
            className={`hidden sm:inline-block px-3 py-1.5 border-2 border-black uppercase transition-all ${
              pathname === '/manifesto'
                ? 'bg-black text-white'
                : 'bg-white hover:bg-[#FFE600] text-black shadow-brutal-sm'
            }`}
          >
            Manifesto
          </Link>
          
          {/* Admin CMS Button */}
          {isAdmin ? (
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FF4400] text-white border-2 border-black shadow-brutal font-mono uppercase font-bold hover:bg-black transition-all"
            >
              <Terminal className="w-4 h-4" />
              <span>Ver Site</span>
            </Link>
          ) : (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FFE600] text-black border-2 border-black shadow-brutal font-mono uppercase font-black hover:bg-[#00E575] active:translate-x-1 active:translate-y-1 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin / CMS</span>
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin/new"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white border-2 border-black shadow-brutal font-mono uppercase font-bold hover:bg-[#FFE600] hover:text-black transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Novo Artigo</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
