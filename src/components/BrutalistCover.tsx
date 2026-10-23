import React from 'react';

interface BrutalistCoverProps {
  title: string;
  category: string;
  color?: string;
  pattern?: 'grid' | 'stripes' | 'dots' | 'blocks';
  image?: string;
  edition?: string;
  className?: string;
}

export default function BrutalistCover({
  title,
  category,
  color = '#E63926',
  pattern = 'stripes',
  image,
  edition = '02—10 OCT',
  className = '',
}: BrutalistCoverProps) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-[#111215] border-b border-[#D0D5DD] group ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-[1.02] group-hover:contrast-125 transition-all duration-500 ease-out"
        />
        {/* Architectural coordinate stamp */}
        <div className="absolute top-3 left-3 bg-[#111215]/85 backdrop-blur-sm text-white px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border border-white/20">
          {category}
        </div>
        <div className="absolute bottom-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-sm text-[#111215] px-2 py-0.5 text-[9px] font-mono tracking-tight font-semibold border border-[#D0D5DD]">
          REF // {edition}
        </div>
      </div>
    );
  }

  // Pure Swiss / Technical Industrial Graphic
  return (
    <div
      className={`relative overflow-hidden bg-[#F3F5F7] border-b border-[#D0D5DD] select-none flex flex-col justify-between p-6 ${className}`}
    >
      {/* Top technical line with category and crosshair */}
      <div className="flex justify-between items-start font-mono text-[10px] text-[#64748B] border-b border-[#D0D5DD]/60 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E63926]" />
          <span className="font-semibold text-[#111215] tracking-widest uppercase">
            {category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{edition}</span>
          <span className="text-[#94A3B8]">+</span>
        </div>
      </div>

      {/* Center Motif (Minimalist Semicircle / Wave / Schematic) */}
      <div className="my-auto py-4 flex items-center justify-center relative">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #D0D5DD 1px, transparent 1px), linear-gradient(to bottom, #D0D5DD 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Japanese Rising Sun / Red Semicircle Motif (Image 1 Veeps Inspiration) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-28 h-14 bg-[#E63926] rounded-t-full shadow-[0_2px_10px_rgba(230,57,38,0.2)]" />
          <div className="w-36 h-[1px] bg-[#111215]" />
        </div>
      </div>

      {/* Bottom technical coordinates and schematics */}
      <div className="flex justify-between items-end font-mono text-[9px] text-[#64748B] border-t border-[#D0D5DD]/60 pt-2">
        <span>AIRSKIN® SPEC // 37.5005 — 122.5239</span>
        <div className="flex items-center gap-1 font-semibold text-[#111215]">
          <span>FIG. 01</span>
          <span className="inline-block w-2.5 h-[1px] bg-[#111215]" />
        </div>
      </div>
    </div>
  );
}
