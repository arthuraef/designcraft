import React from 'react';

interface MarqueeTickerProps {
  items?: string[];
  speed?: string;
  className?: string;
}

export default function MarqueeTicker({
  items = [
    'HONESTIDADE ESTRUTURAL',
    'ZERO BLUR',
    'CONCRETO DIGITAL',
    'CONTRA O SLOP VISUAL DE IA',
    'TIPOGRAFIA COMO ALVENARIA',
    'BORDAS RÍGIDAS',
    'SEM GRADIENTES PASSIVOS',
    'CÓDIGO CRU // DESIGN LIVRE',
  ],
  className = '',
}: MarqueeTickerProps) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden bg-[#FFE600] border-y-4 border-black py-2.5 font-mono select-none ${className}`}>
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
        {repeated.map((text, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="font-black text-sm md:text-base tracking-wider text-black uppercase">
              {text}
            </span>
            <span className="text-black font-black text-xs">///</span>
          </div>
        ))}
      </div>
    </div>
  );
}
