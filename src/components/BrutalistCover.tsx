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
  color = '#FFE600',
  pattern = 'stripes',
  image,
  edition = 'ED. 04',
  className = '',
}: BrutalistCoverProps) {
  if (image) {
    return (
      <div className={`relative border-b-4 border-black overflow-hidden bg-black ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-200"
        />
        <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-mono font-bold border border-white">
          {category}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden border-b-4 border-black select-none ${className}`}
      style={{ backgroundColor: color }}
    >
      {/* Pattern background overlay */}
      {pattern === 'stripes' && (
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #000 0, #000 8px, transparent 0, transparent 20px)',
          }}
        />
      )}
      {pattern === 'grid' && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}
      {pattern === 'dots' && (
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
            backgroundSize: '16px 16px',
          }}
        />
      )}
      {pattern === 'blocks' && (
        <div className="absolute inset-0 flex justify-between items-center opacity-10 pointer-events-none">
          <div className="w-24 h-full bg-black" />
          <div className="w-12 h-full bg-black" />
          <div className="w-36 h-full bg-black" />
        </div>
      )}

      {/* Decorative brutalist stamps */}
      <div className="relative p-6 h-full flex flex-col justify-between z-10">
        <div className="flex justify-between items-start font-mono text-xs font-black tracking-widest text-black">
          <span className="bg-black text-white px-2 py-0.5 border border-black uppercase">
            {category}
          </span>
          <span className="border-2 border-black px-2 py-0.5 bg-white">
            {edition}
          </span>
        </div>

        <div className="my-6">
          <p className="font-mono text-[10px] font-bold text-black uppercase tracking-tighter mb-1 opacity-75">
            /// DESIGNCRAFT ESSAY ARCHIVE
          </p>
          <h3 className="font-extrabold text-2xl md:text-3xl tracking-tighter text-black uppercase leading-none line-clamp-3">
            {title}
          </h3>
        </div>

        <div className="flex justify-between items-end font-mono text-[10px] font-bold text-black border-t-2 border-black pt-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-black" />
            <span>RAW_FORMAT // NO_BLUR</span>
          </div>
          {/* Faux barcode */}
          <div className="flex items-center gap-[2px] h-4">
            <div className="w-[1px] h-full bg-black" />
            <div className="w-[3px] h-full bg-black" />
            <div className="w-[1px] h-full bg-black" />
            <div className="w-[2px] h-full bg-black" />
            <div className="w-[4px] h-full bg-black" />
            <div className="w-[1px] h-full bg-black" />
            <div className="w-[3px] h-full bg-black" />
            <div className="w-[2px] h-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
