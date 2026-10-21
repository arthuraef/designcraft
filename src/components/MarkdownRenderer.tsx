'use client';

import React, { useState } from 'react';
import { marked } from 'marked';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copied, setCopied] = useState(false);

  // Configure marked options
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
    <div className="brutalist-prose relative">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCopyRaw}
          className="btn-brutal bg-white px-3 py-1 text-xs font-mono flex items-center gap-1.5"
          title="Copiar texto cru em Markdown"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#00E575]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'COPIADO!' : 'COPIAR RAW'}</span>
        </button>
      </div>

      <div
        className="prose-content space-y-6 text-black font-sans text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />

      <style jsx global>{`
        .prose-content h1,
        .prose-content h2,
        .prose-content h3,
        .prose-content h4 {
          font-weight: 900;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: #000000;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .prose-content h1 {
          font-size: 2.25rem;
          border-bottom: 4px solid #000;
          padding-bottom: 0.5rem;
        }

        .prose-content h2 {
          font-size: 1.875rem;
          border-bottom: 3px solid #000;
          padding-bottom: 0.4rem;
        }

        .prose-content h3 {
          font-size: 1.5rem;
          background: #FFE600;
          display: inline-block;
          padding: 2px 10px;
          border: 2px solid #000;
        }

        .prose-content p {
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
          line-height: 1.75;
          color: #1a1a1a;
        }

        .prose-content blockquote {
          border-left: 8px solid #000000;
          background: #FFE600;
          padding: 1.25rem 1.75rem;
          margin: 2rem 0;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.5;
          box-shadow: 4px 4px 0px #000000;
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
          padding-left: 1.75rem;
          margin-bottom: 0.75rem;
        }

        .prose-content ul li::before {
          content: '■';
          position: absolute;
          left: 0;
          color: #000000;
          font-size: 0.875rem;
        }

        .prose-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-weight: 600;
        }

        .prose-content ol li {
          margin-bottom: 0.5rem;
        }

        .prose-content code {
          font-family: var(--font-jetbrains-mono), monospace;
          background-color: #000000;
          color: #00E575;
          padding: 0.15rem 0.4rem;
          border: 1px solid #000000;
          font-size: 0.9em;
          font-weight: 600;
        }

        .prose-content pre {
          background-color: #000000;
          color: #F4F4F0;
          border: 3px solid #000000;
          box-shadow: 6px 6px 0px #000000;
          padding: 1.25rem;
          margin: 2rem 0;
          overflow-x: auto;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.95rem;
          line-height: 1.5;
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
          border: 3px solid #000000;
          box-shadow: 6px 6px 0px #000000;
          margin: 2rem 0;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.95rem;
        }

        .prose-content th,
        .prose-content td {
          border: 2px solid #000000;
          padding: 0.75rem 1rem;
          text-align: left;
        }

        .prose-content th {
          background-color: #000000;
          color: #FFFFFF;
          font-weight: 800;
          text-transform: uppercase;
        }

        .prose-content tr:nth-child(even) {
          background-color: #EBEBE6;
        }

        .prose-content a {
          color: #0029FF;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .prose-content a:hover {
          background-color: #FFE600;
          color: #000000;
        }

        .prose-content hr {
          border: 0;
          border-top: 3px dashed #000000;
          margin: 2.5rem 0;
        }
      `}</style>
    </div>
  );
}
