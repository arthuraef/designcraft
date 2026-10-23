import React from 'react';

interface MarqueeTickerProps {
  items?: string[];
  className?: string;
}

export default function MarqueeTicker({
  items = [
    'ORNAMENT IS CRIME',
    '37.5005° N — 122.5239° W',
    'INTERNATIONAL TYPOGRAPHIC STYLE',
    'BAUHAUS & ULM HERITAGE',
    'FORM FOLLOWS FUNCTION',
    'AIRSKIN® SPECIFICATION',
    'THE GRID IS ABSOLUTE',
  ],
  className = '',
}: MarqueeTickerProps) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden bg-[#FFFFFF] border-y border-[#D0D5DD] py-2 font-mono text-xs select-none ${className}`}>
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap text-[#64748B]">
        {repeated.map((text, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="font-medium tracking-widest text-[#111215] uppercase">
              {text}
            </span>
            <span className="text-[#CBD5E1]">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
