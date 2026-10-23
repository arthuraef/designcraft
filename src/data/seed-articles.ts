import { Article } from '@/types/article';

export const SEED_ARTICLES: Article[] = [
  {
    id: "art-01",
    slug: "a-tirania-do-canto-arredondado",
    title: "A Tirania do Canto Arredondado: O Fim da Personalidade no Design Digital",
    subtitle: "Ornament is Crime: por que a padronização asséptica de 16px eliminou a tensão gráfica das interfaces contemporâneas.",
    excerpt: "Dos cartões flutuantes em tons pastel às sombras difusas de 40px, a web contemporânea abandonou a arquitetura honesta e o rigor tipográfico em nome de um sedativo psicológico corporativo.",
    category: "TEORIA CRÍTICA",
    tags: ["Modernismo", "Adolf Loos", "Arquitetura", "Swiss Style"],
    author: {
      name: "Arthur Ferreira",
      role: "Crítico de Arquitetura Visual",
      bio: "Pesquisador de tipografia internacional, Bauhaus e interfaces industriais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80", // Modernist architectural concrete
    coverColor: "#E63926",
    coverPattern: "stripes",
    published: true,
    featured: true,
    readingTimeMinutes: 7,
    publishedAt: "2026-10-18T10:00:00.000Z",
    updatedAt: "2026-10-18T10:00:00.000Z",
    views: 1420,
    likes: 284,
    content: `## 01. O Grande Aplainamento da Web

Em 1908, o arquiteto austríaco Adolf Loos publicou seu célebre ensaio *"Ornamento e Crime"*, afirmando que a evolução cultural é proporcional à eliminação do ornamento supérfluo dos objetos de uso cotidiano. 

Hoje, no entanto, vivemos a distorção desse princípio: não eliminamos o ornamento em prol da verdade material; nós o substituímos por um **ornamento invisível de suavização compulsória**.

Se você abrir cinco aplicações digitais simultaneamente, notará uma homogeneidade inquietante:
* Bordas com raio de 12px a 24px em todos os cantos.
* Sombras difusas com desfoque de 30px e opacidade em 4%.
* Gradientes adocicados que mascaram a grelha estrutural do HTML.

> "A ausência de arestas vivas não é neutralidade estética. É a imposição corporativa de um design anestésico, projetado para que o usuário nunca encontre resistência consciente."

### Anatomia da Padronização Industrial

| Parâmetro | Estilo Corporativo Dócil | Racionalismo Técnico Suíço |
| :--- | :--- | :--- |
| **Bordas** | \`border-radius: 16px;\` | \`border: 1px solid #D0D5DD;\` |
| **Sombras** | \`box-shadow: 0 20px 40px rgba(0,0,0,0.05);\` | Ausência de sombra / Contraste por linha |
| **Tipografia** | Sans-serif geométrica genérica | Grotesque com tracking estreito (-0.04em) |
| **Estrutura** | Divisões invisíveis por espaçamento | Grid matemático exposto e tabular |

## 02. O Retorno ao Rigor de Ulm e Bauhaus

A escola de Ulm, sob Max Bill e Otl Aicher, e a tradição de Dieter Rams na Braun ensinaram que a honestidade de um objeto reside na clareza com que suas divisões e funções são comunicadas.

Uma linha de 1px não agride; ela estabelece um **limite geométrico exato**. Ela diz à mente: *aqui termina um dado, aqui inicia outro*.

\`\`\`css
/* Estrutura Racional Suíça */
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1px;
  background-color: #D0D5DD; /* Hairline divider */
}

.cell {
  background-color: #FFFFFF;
  padding: 24px;
}
\`\`\`

## 03. Tipografia como Sustentação Espacial

Quando o tipo é desenhado e diagramado com maestria suíça — alinhado à esquerda, sem justificação forçada, com proporções assimétricas e pesos rigorosamente dosados —, qualquer sombra ou gradiente se torna um artifício desnecessário.

A verdadeira vanguarda hoje não consiste em adicionar mais efeitos de desfoque, mas em ter a disciplina de deixar os ossos da informação visíveis e belos por sua própria verdade matemática.`
  },
  {
    id: "art-02",
    slug: "brutalismo-web-honestidade-estrutural",
    title: "Béton Brut: A Honestidade Estrutural Contra o Slop Visual",
    subtitle: "Em um mar de interfaces geradas por probabilidade, expor a engenharia do meio é o ato definitivo de rigor.",
    excerpt: "Inspirada no concreto aparente de Le Corbusier e na precisão dos instrumentos de laboratório, a nova estética editorial rejeita o pastiche e celebra a fidelidade técnica.",
    category: "RADICAL WEB",
    tags: ["Le Corbusier", "Béton Brut", "HTML", "Arquitetura"],
    author: {
      name: "Arthur Ferreira",
      role: "Crítico de Arquitetura Visual",
      bio: "Pesquisador de tipografia internacional, Bauhaus e interfaces industriais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80", // Minimalist concrete architecture
    coverColor: "#111215",
    coverPattern: "grid",
    published: true,
    featured: false,
    readingTimeMinutes: 5,
    publishedAt: "2026-10-15T14:30:00.000Z",
    updatedAt: "2026-10-15T14:30:00.000Z",
    views: 980,
    likes: 195,
    content: `## A Origem do Concreto Aparente

A expressão francesa *béton brut* foi popularizada por Le Corbusier na construção da Unité d'Habitation em Marselha (1952). Não se tratava de criar algo rude ou negligente, mas de não aplicar estuque decorativo para esconder a textura da madeira que moldou o concreto.

> "A beleza da engenharia moderna não está no revestimento cosmético, mas na exatidão de suas junções e na economia de seus gestos."

### O Fenômeno do Slop Sintético

Com a geração em massa de telas por inteligência artificial, o design digital convergiu para um estilo médio pré-mastigado: iluminações falsas de estúdio, paletas violeta pasteurizadas e ausência de grid.

Em contraposição, o design editorial técnico baseia-se em:
1. **Grids Asimétricos Rigorosos:** Colunas em proporções matemáticas claras.
2. **Fotografia Documental Preto e Branco:** Texturas reais de materiais e espaços.
3. **Monospaçadas Técnicas de Precisão:** Inclusão de carimbos cronológicos, coordenadas e identificadores de documento.`
  },
  {
    id: "art-03",
    slug: "sistemas-de-design-sao-prisoes-douradas",
    title: "Sistemas de Design: Da Padronização à Paralisia Criativa",
    subtitle: "Como a busca corporativa por consistência absoluta substituiu a inteligência de contexto por burocracia de tokens.",
    excerpt: "Nascidos para acelerar a entrega, os repositórios corporativos de componentes transformaram-se em departamentos regulatórios onde nenhuma inovação sobrevive sem carimbo comitial.",
    category: "DESIGN SYSTEMS",
    tags: ["Design Ops", "Governança", "Processo", "Contexto"],
    author: {
      name: "Arthur Ferreira",
      role: "Crítico de Arquitetura Visual",
      bio: "Pesquisador de tipografia internacional, Bauhaus e interfaces industriais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80", // Minimalist monochrome industrial
    coverColor: "#64748B",
    coverPattern: "blocks",
    published: true,
    featured: false,
    readingTimeMinutes: 6,
    publishedAt: "2026-10-12T09:15:00.000Z",
    updatedAt: "2026-10-12T09:15:00.000Z",
    views: 1120,
    likes: 310,
    content: `## Da Ferramenta à Burocracia

A promessa original dos Design Systems era libertadora: unificar primitivas técnicas para liberar tempo intelectual. Contudo, em corporações maduras, o sistema converteu-se no objetivo final da equipe, acima da própria experiência do usuário.

\`\`\`
       [PROBLEMA SINGULAR DO USUÁRIO]
                     │
                     ▼
       ┌───────────────────────────┐
       │     CATÁLOGO DE TOKENS    │ ──► [CONFLITO DE COMPONENTE]
       └───────────────────────────┘
                     │
                     ▼
         [EXPERIÊNCIA COMPROMETIDA]
\`\`\`

### O Princípio da Permeabilidade Contextual

Os maiores designers industriais da história — de Dieter Rams a Naoto Fukasawa — nunca projetaram regras imutáveis. Criaram sistemas com folga para que a solução responda à singularidade do momento.`
  },
  {
    id: "art-04",
    slug: "tipografia-como-arquitetura-espacial",
    title: "Titans of the Type: Tipografia como Arquitetura Espacial",
    subtitle: "Deixar o peso e o ritmo do caractere ditar a estrutura física da página em vez de preencher caixas decorativas.",
    excerpt: "A tipografia não existe para preencher uma caixa; ela é a própria parede de sustentação. Quando a escala do tipo ganha peso monumental, o ornamento visual torna-se obsoleto.",
    category: "TIPOGRAFIA",
    tags: ["Swiss Style", "Grid", "Editorial", "Josef Müller-Brockmann"],
    author: {
      name: "Arthur Ferreira",
      role: "Crítico de Arquitetura Visual",
      bio: "Pesquisador de tipografia internacional, Bauhaus e interfaces industriais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80", // Dramatic ocean waves B&W
    coverColor: "#E63926",
    coverPattern: "dots",
    published: true,
    featured: false,
    readingTimeMinutes: 8,
    publishedAt: "2026-10-09T18:00:00.000Z",
    updatedAt: "2026-10-09T18:00:00.000Z",
    views: 890,
    likes: 174,
    content: `## A Ilusão do Texto Secundário

A maioria dos layouts de produto digital é concebida de trás para a frente: desenha-se primeiro uma grelha de cartões com proporções arbitrárias, e depois tenta-se espremer o texto lá dentro com \`text-overflow: ellipsis\` para não quebrar a diagramação.

Josef Müller-Brockmann demonstrou em seus cartazes da Tonhalle de Zurique que a tipografia é som visual. O entrelinhamento apertado, o contraste colossal de corpo e o posicionamento assimétrico criam dinamismo sem um único pixel de ilustração.`
  },
  {
    id: "art-05",
    slug: "dark-patterns-erosao-do-consentimento",
    title: "Engenharia da Decepção: Dark Patterns e a Ética da Interface",
    subtitle: "Mapeamento minucioso dos mecanismos psicológicos predatórios disfarçados de 'otimização de conversão'.",
    excerpt: "Botões de cancelamento cinza-claros em fundo branco, cronômetros falsos de escassez e labirintos cognitivos. Como o design digital virou arma de coerção psicológica.",
    category: "ANTI-PATTERNS",
    tags: ["Ética", "Cognição", "Legislação", "Transparência"],
    author: {
      name: "Arthur Ferreira",
      role: "Crítico de Arquitetura Visual",
      bio: "Pesquisador de tipografia internacional, Bauhaus e interfaces industriais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80", // Glass skyscraper geometric facade B&W
    coverColor: "#111215",
    coverPattern: "stripes",
    published: true,
    featured: false,
    readingTimeMinutes: 6,
    publishedAt: "2026-10-05T11:20:00.000Z",
    updatedAt: "2026-10-05T11:20:00.000Z",
    views: 1650,
    likes: 422,
    content: `## O Eufemismo da Otimização

Quando uma interface oculta a opção de descadastro sob três níveis de abas descontextualizadas com texto cinza sobre fundo cinza (\`#999999\` em \`#F5F5F5\`), o designer executou uma sabotagem calculada contra a autonomia do usuário.

A resposta moderna e ética é a **Hiper-Transparência Estrutural**: escolhas simétricas, contraste evidente e respeito irrestrito ao tempo do usuário.`
  }
];
