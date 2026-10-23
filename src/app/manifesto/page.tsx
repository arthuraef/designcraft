import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O MANIFESTO: ORNAMENT IS CRIME /// DESIGNCRAFT',
  description: '10 Teses fundamentais sobre arquitetura visual, tipografia internacional e eliminação do ornamento supérfluo.',
};

const THESES = [
  {
    num: '01',
    code: 'FIG. 01 // MATÉRIA',
    title: 'A Honestidade do Meio Computacional',
    body: 'O meio digital não é plástico acetinado, nem vidro fumê, nem papel aquarelado. É composto por coordenadas matemáticas, caixas de fluxo, vetores e caracteres. Ocultar as emendas estruturais com sombras difusas é um ato de covardia arquitetônica. Exponha o grid.',
  },
  {
    num: '02',
    code: 'FIG. 02 // FORMA',
    title: 'O Canto Vivo e a Decisão Deliberada',
    body: 'O raio compulsório de 16px virou o sedativo da indústria de tecnologia. Quando toda aresta é arredondada, nenhuma decisão é intencional. O ângulo reto declara: "Aqui encerra-se um conceito, aqui inicia-se outro". Reivindique o rigor geométrico.',
  },
  {
    num: '03',
    code: 'FIG. 03 // GRAVIDADE',
    title: 'Linha como Fronteira, não Sombra como Névoa',
    body: 'Sombras de 40px de desfoque simulam uma profundidade falsa e teatral. Uma linha precisa de 1px estabelece uma fronteira clara e indelével. A clareza de uma interface mede-se pela precisão de suas demarcações.',
  },
  {
    num: '04',
    code: 'FIG. 04 // SÍNTESE',
    title: 'A Vacina Contra o Slop Visual de IA',
    body: 'Algoritmos generativos foram treinados na média aritmética de dez anos de interfaces cosméticas. O resultado é um oceano de gradientes lilases e ilustrações vazias. O racionalismo suíço é o antídoto definitivo contra a mediocridade estatística.',
  },
  {
    num: '05',
    code: 'FIG. 05 // ESTRUTURA',
    title: 'Tipografia é Alvenaria, Não Adorno',
    body: 'Não desenhamos recipientes vazios para depois tentar acomodar palavras. O tipo determina a escala, o ritmo e o pé-direito da experiência visual. Quando a tipografia possui maestria arquitetônica, qualquer ornamento torna-se supérfluo.',
  },
  {
    num: '06',
    code: 'FIG. 06 // AGÊNCIA',
    title: 'Atrito Consciente contra o Deslize Cego',
    body: 'Interfaces que eliminam todo atrito também eliminam a presença mental de quem as usa. Decisões fundamentais exigem clareza, tempo de leitura e contraste inequívoco — não um clique acidental induzido por mecânica predatória.',
  },
  {
    num: '07',
    code: 'FIG. 07 // SISTEMA',
    title: 'Sistemas Devem Ser Chão Firme, Nunca Teto',
    body: 'Um catálogo de componentes que impede a experimentação no ponto de contato não é engenharia; é burocracia corporativa. Toda superfície precisa de permeabilidade para responder à singularidade do problema.',
  },
  {
    num: '08',
    code: 'FIG. 08 // CÓDIGO',
    title: 'O HTML Semântico como Concreto Armado',
    body: 'HTML e CSS puros são tecnologias industriais de durabilidade centenária. O que é edificado com fidelidade ao meio permanece veloz, acessível e legível em qualquer dispositivo por décadas.',
  },
  {
    num: '09',
    code: 'FIG. 09 // ÉTICA',
    title: 'Hiper-Transparência contra Dark Patterns',
    body: 'Esconder opções com contraste insuficiente (#999 sobre #FFF) é sabotagem cognitiva. Praticamos a visibilidade radical: escolhas simétricas, termos em negrito e respeito reverente pela autonomia de quem lê.',
  },
  {
    num: '10',
    code: 'FIG. 10 // SINAL',
    title: 'Cor como Sinalização Rodoviária',
    body: 'O preto e o branco são as leis da gravidade. O vermilion é o foco, o alerta, o ponto vivo. Utilize a cor com a sobriedade de uma placa de trânsito ou instrumento cirúrgico, jamais como perfume comercial.',
  },
];

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-[#E9ECEF] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between font-mono text-xs text-[#64748B] mb-8 pb-4 border-b border-[#D0D5DD]">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#111215] hover:text-[#E63926] transition-colors font-medium uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retornar aos Artigos</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63926]" />
            <span className="text-[#111215] font-semibold uppercase">
              DOCUMENTO METODOLÓGICO
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm p-8 sm:p-12 mb-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center text-xs font-mono text-[#64748B] mb-4 border-b border-[#E2E8F0] pb-3">
            <span>ORNAMENT IS CRIME // MODERNISM &apos;26</span>
            <span>37.5005 — 122.5239</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111215] leading-[1.05] mb-5">
            O Manifesto da Arquitetura Visual Digital
          </h1>
          <p className="text-[#475569] font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
            10 Teses fundamentais contra a pasteurização cosmética e em defesa da verdade material, rigor tipográfico e clareza estrutural na construção de interfaces.
          </p>
        </div>

        {/* 10 Theses Grid */}
        <div className="space-y-4 mb-14">
          {THESES.map((thesis) => (
            <div
              key={thesis.num}
              className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm p-6 sm:p-8 hover:border-[#111215] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-start gap-5">
                <span className="font-mono text-sm sm:text-base font-bold bg-[#F1F5F9] text-[#111215] px-2.5 py-1 border border-[#CBD5E1] rounded-sm leading-none shrink-0">
                  {thesis.num}
                </span>
                <div className="flex-1">
                  <span className="font-mono text-[10px] text-[#E63926] font-semibold tracking-wider block mb-1">
                    {thesis.code}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#111215] mb-2">
                    {thesis.title}
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-[#475569] leading-relaxed">
                    {thesis.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Box */}
        <div className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm p-8 text-[#111215] font-mono text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <span className="text-[10px] text-[#64748B] uppercase tracking-widest block mb-1">
              CHANCELA EDITORIAL
            </span>
            <h3 className="text-lg font-bold uppercase tracking-tight text-[#111215]">
              COLETIVO DESIGNCRAFT
            </h3>
            <p className="text-[#64748B] font-sans text-xs mt-1">
              Publicado sob os cânones da tipografia internacional e racionalismo funcional.
            </p>
          </div>
          <Link
            href="/admin/new"
            className="px-5 py-2.5 bg-[#111215] text-white hover:bg-[#E63926] rounded-sm font-semibold uppercase tracking-wider transition-colors"
          >
            Submeter Ensaio
          </Link>
        </div>
      </div>
    </div>
  );
}
