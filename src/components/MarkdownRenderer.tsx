'use client';

import React, { useState } from 'react';
import { marked } from 'marked';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copied, setCopied] = useState(false);

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const parsedHtml = marked.parse(content) as string;

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="editorial-prose relative">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCopyRaw}
          className="px-2.5 py-1 text-[11px] font-mono border border-[#D0D5DD] bg-[#FFFFFF] hover:border-[#111215] text-[#64748B] hover:text-[#111215] rounded-sm flex items-center gap-1.5 transition-colors"
          title="Copiar texto cru em Markdown"
        >
          {copied ? <Check className="w-3 h-3 text-[#E63926]" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'COPIADO' : 'COPIAR RAW'}</span>
        </button>
      </div>

      <div
        className="prose-content space-y-6 text-[#1E293B] font-sans text-base sm:text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />

      <style jsx global>{`
        .prose-content h1,
        .prose-content h2,
        .prose-content h3,
        .prose-content h4 {
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #111215;
          margin-top: 2.75rem;
          margin-bottom: 1rem;
          line-height: 1.15;
        }

        .prose-content h1 {
          font-size: 2.25rem;
          border-bottom: 1px solid #D0D5DD;
          padding-bottom: 0.75rem;
        }

        .prose-content h2 {
          font-size: 1.75rem;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 0.5rem;
        }

        .prose-content h3 {
          font-size: 1.35rem;
          color: #111215;
        }

        .prose-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: #334155;
        }

        .prose-content blockquote {
          border-left: 2px solid #E63926;
          background: #F8F9FA;
          padding: 1.25rem 1.75rem;
          margin: 2.25rem 0;
          font-style: normal;
          font-weight: 500;
          font-size: 1.2rem;
          line-height: 1.6;
          color: #111215;
        }

        .prose-content blockquote p {
          margin-bottom: 0;
        }

        .prose-content ul {
          list-style-type: none;
          padding-left: 0;
          margin: 1.5rem 0;
        }

        .prose-content ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.65rem;
          color: #334155;
        }

        .prose-content ul li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #94A3B8;
        }

        .prose-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          color: #334155;
        }

        .prose-content ol li {
          margin-bottom: 0.5rem;
        }

        .prose-content code {
          font-family: var(--font-jetbrains-mono), monospace;
          background-color: #F1F5F9;
          color: #0F172A;
          padding: 0.2rem 0.4rem;
          border-radius: 2px;
          border: 1px solid #E2E8F0;
          font-size: 0.88em;
          font-weight: 600;
        }

        .prose-content pre {
          background-color: #111215;
          color: #E2E8F0;
          border: 1px solid #27272A;
          border-radius: 4px;
          padding: 1.25rem;
          margin: 2rem 0;
          overflow-x: auto;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .prose-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
          border: none;
        }

        .prose-content table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #D0D5DD;
          margin: 2.25rem 0;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.88rem;
        }

        .prose-content th,
        .prose-content td {
          border: 1px solid #E2E8F0;
          padding: 0.75rem 1rem;
          text-align: left;
        }

        .prose-content th {
          background-color: #F8F9FA;
          color: #111215;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }

        .prose-content tr:nth-child(even) {
          background-color: #FAFAFA;
        }

        .prose-content a {
          color: #E63926;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .prose-content a:hover {
          color: #111215;
        }

        .prose-content hr {
          border: 0;
          border-top: 1px solid #D0D5DD;
          margin: 2.75rem 0;
        }
      `}</style>
    </div>
  );
}
