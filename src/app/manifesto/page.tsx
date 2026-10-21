import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Terminal, Sparkles, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O MANIFESTO BRUTALISTA /// DESIGNCRAFT',
  description: '10 Teses radicais para o resgate da textura, honestidade e atrito no design digital.',
};

const THESES = [
  {
    num: '01',
    title: 'A HONESTIDADE DO MATERIAL DIGITAL',
    body: 'O meio computacional não é vidro fumê, nem plástico acetinado, nem papel aquarelado. É feito de pixels, linhas de grid, contêineres retangulares e texto. Esconder as linhas de divisão com sombras difusas é covardia arquitetônica. Exponha a estrutura.',
  },
  {
    num: '02',
    title: 'O CANTO VIVO É O LUGAR DA INTENÇÃO',
    body: 'O arredondamento automático de 16px virou o anestésico da indústria. Quando tudo é curvo, nada é deliberado. O ângulo reto de 90 graus declara: "Aqui começa um pensamento, aqui termina outro". Reivindique as arestas vivas.',
  },
  {
    num: '03',
    title: 'SOMBRA É MASSA, NÃO NÉVOA',
    body: 'Sombras com desfoque de 40px fingem uma tridimensionalidade hipócrita. Uma sombra rígida de 6px sem desfoque (blur: 0px) confere peso mecânico, gravidade e certeza tátil. A interface deve parecer esculpida em bloco sólido.',
  },
  {
    num: '04',
    title: 'CONTRA O SLOP VISUAL DE IA',
    body: 'Modelos de linguagem visual foram treinados na média aritmética de dez anos de Dribbble. O resultado é um pântano homogêneo de gradientes lilases e personagens 3D flutuantes. O brutalismo é a vacina contra a mediocridade gerada por probabilidade.',
  },
  {
    num: '05',
    title: 'A TIPOGRAFIA NÃO É DECORAÇÃO; É A PRÓPRIA CASA',
    body: 'Não projetamos cartões para depois encaixar o texto. A palavra dita o ritmo, a escala e a alvenaria da tela. Quando o tipo possui força monumental, não há necessidade de ornamentos supérfluos.',
  },
  {
    num: '06',
    title: 'ATRITO CONSCIENTE > VELOCIDADE CEGA',
    body: 'Interfaces que removem todo o atrito também removem a agência humana. Uma decisão importante — como assinar, excluir ou comprar — deve exigir presença mental, firmeza de clique e contraste explícito, não um deslize acidental.',
  },
  {
    num: '07',
    title: 'SISTEMAS DEVEM SER PISOS, NUNCA TETOS',
    body: 'Um Design System que proíbe o desvio criativo não é um acelerador de engenharia; é uma prisão dourada gerida por burocratas do Figma. Vinte por cento de cada interface pertence à anomalia poética do contexto.',
  },
  {
    num: '08',
    title: 'O CÓDIGO CRU É ARTE INDUSTRIAL',
    body: 'HTML semântico e CSS direto são tecnologias de durabilidade incomparável. O que é construído com fidelidade ao meio continua legível em qualquer dispositivo por décadas.',
  },
  {
    num: '09',
    title: 'CONTRA OS DARK PATTERNS',
    body: 'Esconder opções com contraste insuficiente (#999 em #FFF) é sabotagem. O design brutalista pratica a hiper-visibilidade: opções simétricas, termos em negrito e respeito visceral pelo consentimento de quem lê.',
  },
  {
    num: '10',
    title: 'COR COMO SINAL DE TRÂNSITO',
    body: 'Amarelo é atenção. Laranja é advertência. Verde é confirmação terminal. O preto e o branco são a lei da gravidade. Use cores com a clareza de uma placa rodoviária, não com a indecisão de um perfume comercial.',
  },
];

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F0] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between font-mono text-xs font-bold mb-8 pb-4 border-b-2 border-black">
          <Link
            href="/"
            className="btn-brutal bg-white px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#FFE600] text-black"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETORNAR AOS ARTIGOS</span>
          </Link>
          <span className="bg-black text-[#FFE600] px-2 py-1 uppercase">
            DECLARAÇÃO FORMAL
          </span>
        </div>

        {/* Hero Card */}
        <div className="border-brutal bg-black text-white p-8 sm:p-12 shadow-brutal-lg mb-12">
          <div className="inline-block bg-[#FFE600] text-black font-mono font-black text-xs px-2.5 py-1 mb-4">
            DOCUMENTO OFICIAL /// OUTUBRO DE 2026
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            O MANIFESTO BRUTALISTA DO DESIGN DIGITAL
          </h1>
          <p className="text-zinc-300 font-sans text-lg sm:text-xl leading-relaxed max-w-2xl">
            10 Teses fundamentais contra a pasteurização estética e a favor da honestidade estrutural na construção de interfaces contemporâneas.
          </p>
        </div>

        {/* The 10 Theses */}
        <div className="space-y-6 mb-16">
          {THESES.map((thesis) => (
            <div
              key={thesis.num}
              className="border-brutal bg-white p-6 sm:p-8 shadow-brutal card-brutal-interactive"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-2xl sm:text-4xl font-black bg-[#FFE600] text-black px-3 py-1 border-2 border-black shadow-brutal-sm leading-none shrink-0">
                  {thesis.num}
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight mb-3">
                    {thesis.title}
                  </h2>
                  <p className="font-sans text-base sm:text-lg text-black/85 leading-relaxed">
                    {thesis.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Box */}
        <div className="border-brutal bg-[#FFE600] p-8 shadow-brutal-lg text-black font-mono">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-black/70 block mb-1">
                PUBLICADO POR
              </span>
              <h3 className="text-2xl font-black uppercase">
                COLETIVO DESIGNCRAFT
              </h3>
              <p className="text-xs text-black/80 font-sans mt-1">
                Distribuído sob licença livre de pensamento crítico.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/new"
                className="btn-brutal bg-black text-white px-5 py-2.5 text-xs font-bold uppercase hover:bg-white hover:text-black hover:border-black"
              >
                ESCREVER UM ENSAIO
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
