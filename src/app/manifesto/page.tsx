import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, SunMedium } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O MANIFESTO: O SINAL CONTRA O RUÍDO /// GOOD MORNING NEWS',
  description: '10 Teses sobre a curadoria matinal autônoma, a regra das 2 histórias e o combate à dispersão informacional.',
};

const THESES = [
  {
    num: '01',
    code: 'TESE 01 // O RITUAL DAS 07:00 AM',
    title: 'A Manhã Pertence à Clareza, Não à Ansiedade',
    body: 'O despertar humano não foi concebido para ser bombardeado por 500 notificações dispersas, timelines viciantes e alarmismo algorítmico. O dia exige uma síntese lúcida, fechada e deliberada que capacite a tomada de decisão antes que o caos comece.',
  },
  {
    num: '02',
    code: 'TESE 02 // A REGRA DE OURO DAS DUAS HISTÓRIAS',
    title: 'Informação é Abundante; Seleção é Rara',
    body: 'Apresentar 50 matérias sobre um tema é transferir o trabalho editorial para o leitor. Em qualquer dia civil, existem exatamente duas transformações realmente estruturais em cada grande disciplina. Selecionar essas duas e descartar as outras 98 é o verdadeiro ato de inteligência.',
  },
  {
    num: '03',
    code: 'TESE 03 // OS SEIS DOMÍNIOS DO PENSAMENTO MODERNO',
    title: 'A Interseção entre Técnica, Cultura e Matéria',
    body: 'UX Design, Tecnologia, AI, Games, Board Games e Ciência não são silos isolados. Eles formam a tapeçaria com a qual a civilização digital projeta ferramentas, constrói inteligência, exercita a ludicidade estratégica e desvenda as leis do universo físico.',
  },
  {
    num: '04',
    code: 'TESE 04 // MORTE AO FEED INFINITO',
    title: 'Um Jornal que Sabe a Hora de Acabar',
    body: 'O scroll infinito é uma armadilha psicológica desenhada para sequestrar dopamina. O Good Morning News tem 12 histórias — exatamente duas por domínio. Quando a última é lida, a edição se encerra. Sua mente está abastecida. Volte a criar no mundo real.',
  },
  {
    num: '05',
    code: 'TESE 05 // TOLERÂNCIA ZERO AO CLICKBAIT',
    title: 'O Fato no Primeiro Parágrafo',
    body: 'Nenhum título dirá "Você não vai acreditar no que aconteceu". Não há pontos de exclamação apelativos ou meias-palavras. O título declara a tese; o lead sintetiza a consequência material; os pontos-chave condensam as evidências.',
  },
  {
    num: '06',
    code: 'TESE 06 // AGENTE CURADOR MATINAL',
    title: 'Automação a Serviço do Rigor',
    body: 'Enquanto o mundo dorme, nosso agente varre os principais veículos independentes e redações globais. Ele filtra o ruído de releases comerciais, detecta avanços com relevância de longo prazo e formula a síntese editorial precisa que ancora a edição diária.',
  },
  {
    num: '07',
    code: 'TESE 07 // FIDELIDADE À FONTE ORIGINAL',
    title: 'A Curadoria Honra a Apuração',
    body: 'Não ocultamos a procedência das histórias. Cada síntese indica claramente o veículo original — Ars Technica, Smashing Magazine, Phys.org, The Decoder, Polygon, Dicebreaker — e inclui o link canônico para o leitor que desejar investigar a fundo a reportagem primária.',
  },
  {
    num: '08',
    code: 'TESE 08 // DESIGN SUÍÇO CONTRA O SLOP VISUAL',
    title: 'A Calma Visual é um Valor Editorial',
    body: 'Sem popups intrusivos pedindo email a cada rolagem, sem banners piscando, sem auto-play de vídeos inúteis. O International Typographic Style — linhas de 1px, tipografia grotesque com tracking cirúrgico e fundo de concreto suave — devolve a dignidade da leitura tranquila.',
  },
  {
    num: '09',
    code: 'TESE 09 // SÍNTESE ANALÍTICA, NÃO AGÊNCIA DE NOTÍCIAS',
    title: 'Por Que Isso Importa, Não Quem Postou Primeiro',
    body: 'A velocidade dos feeds é uma ilusão de ótica. Chegar três minutos antes com uma frase vaga não produz discernimento. Explicar o que uma descoberta em modelos de difusão ou uma nova mecânica em jogos de tabuleiro acarreta para a cultura humana produz sabedoria.',
  },
  {
    num: '10',
    code: 'TESE 10 // A SOBERANIA DO SEU TEMPO',
    title: 'Oito Minutos para Entender o Dia',
    body: 'O Good Morning News foi projetado para ser consumido em oito minutos de café da manhã. Ele não quer reter sua atenção para vender impressões de anúncios; ele quer libertar o seu tempo para que você realize o seu melhor trabalho.',
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
            <span>Retornar à Edição do Dia</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63926]" />
            <span className="text-[#111215] font-semibold uppercase">
              MANIFESTO EDITORIAL // 07:00 AM
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="border border-[#D0D5DD] bg-[#FFFFFF] rounded-sm p-8 sm:p-12 mb-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center text-xs font-mono text-[#64748B] mb-4 border-b border-[#E2E8F0] pb-3">
            <span className="flex items-center gap-2 text-[#111215] font-bold">
              <SunMedium className="w-4 h-4 text-[#E63926]" />
              GOOD MORNING NEWS
            </span>
            <span>ED. 07:00 AM // 6 DOMÍNIOS × 2 HISTÓRIAS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111215] leading-[1.05] mb-5">
            O Sinal Contra o Ruído: O Manifesto da Atenção Matinal
          </h1>
          <p className="text-[#475569] font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
            10 Princípios fundamentais para uma manhã lúcida: curadoria algorítmica rigorosa, exatas duas histórias por domínio, design editorial suíço e a recusa convicta da economia da distração.
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
              GOOD MORNING NEWS BOT & REDAÇÃO
            </h3>
            <p className="text-[#64748B] font-sans text-xs mt-1">
              Sempre às 07:00 AM. 12 notícias. Zero ruído.
            </p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#111215] text-white hover:bg-[#E63926] rounded-sm font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <span>Ver a Edição de Hoje</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
