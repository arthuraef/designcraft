import { Article } from '@/types/article';

export const SEED_ARTICLES: Article[] = [
  {
    id: "art-01",
    slug: "a-tirania-do-canto-arredondado",
    title: "A TIRANIA DO CANTO ARREDONDADO: O FIM DA PERSONALIDADE NO DESIGN DIGITAL",
    subtitle: "Por que todos os aplicativos dos últimos dez anos parecem ter sido cuspido pelo mesmo algoritmo asséptico.",
    excerpt: "Dos cantos de 16px aos cartões flutuantes em tons pastel, a web contemporânea abandonou o atrito, a textura e a identidade gráfica em nome de uma falsa sensação de segurança psicológica.",
    category: "TEORIA CRÍTICA",
    tags: ["Brutalismo", "Interface", "Psicologia Cognitiva", "Cultura Visual"],
    author: {
      name: "Arthur Ferreira",
      role: "Designer & Crítico de Sistemas",
      bio: "Pesquisador de arquitetura da informação e estéticas computacionais radicais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverColor: "#FFE600",
    coverPattern: "stripes",
    published: true,
    featured: true,
    readingTimeMinutes: 7,
    publishedAt: "2026-10-18T10:00:00.000Z",
    updatedAt: "2026-10-18T10:00:00.000Z",
    views: 1420,
    likes: 284,
    content: `## 01. O Grande Aplainamento da Web

Se você abrir cinco aplicativos de fintech, três agregadores de notícias e a dashboard da sua ferramenta de produtividade favorita, notará um fenômeno perturbador: **todos eles usam rigorosamente a mesma linguagem formal**.

Bordas arredondadas com raio de 12 a 24 pixels. Sombras difusas com desfoque de 30px e opacidade em 4%. Paleta cromática que orbita invariavelmente entre o azul corporativo confiável e o roxo místico da inteligência artificial.

> "A ausência de arestas afiadas não é uma escolha estética neutra. É a imposição corporativa de uma interface infantilizada, projetada para não oferecer qualquer resistência ao consumo."

### Anatomia da Padronização

O que chamamos hoje de "Modern UI" nada mais é do que o triunfo de um utilitarismo higienizado:

| Elemento | Padrão Corporativo Dócil | Padrão Brutalista Honesto |
| :--- | :--- | :--- |
| **Bordas** | \`border-radius: 16px\` | \`border: 3px solid #000\` |
| **Sombras** | \`box-shadow: 0 10px 30px rgba(0,0,0,0.05)\` | \`box-shadow: 6px 6px 0 #000\` (Zero Blur) |
| **Tipografia** | Sans-serif genérica geométrica | Monospace cru ou Grotesque pesado |
| **Estrutura** | Divisórias invisíveis com espaçamento | Linhas de grid físicas expostas |

## 02. O Canto Arredondado como Anestésico

Na psicologia evolucionária, formas pontiagudas ativam a amígdala — nosso centro primal de alerta contra ameaças e espinhos. Ao arredondar cada botão, cada card e cada modal, a indústria de tecnologia descobriu o sedativo perfeito: uma interface que nunca alarma, nunca desafia e nunca exige atenção crítica.

\`\`\`css
/* O sedativo contemporâneo */
.card-corporativo {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
}

/* A resposta de atrito consciente */
.card-brutalista {
  border: 3px solid #000000;
  box-shadow: 6px 6px 0px #000000;
  background: #FFFFFF;
  border-radius: 0px;
}
\`\`\`

## 03. O Resgate da Tensão Visual

O design brutalista não rejeita a usabilidade; ele rejeita a **hipocrisia da invisibilidade**. Uma ferramenta digital é um artefato industrial manufaturado em código. Expor sua carcaça, suas emendas e seu peso físico é um ato de respeito pela inteligência de quem a utiliza.

Precisamos de cantos vivos. Precisamos de preto e branco intransigente. Precisamos de interfaces que tenham a coragem de parecer construídas por humanos deliberados, e não polidas por comitês executivos apavorados com qualquer aresta.`
  },
  {
    id: "art-02",
    slug: "brutalismo-web-honestidade-estrutural",
    title: "BRUTALISMO WEB: A HONESTIDADE ESTRUTURAL CONTRA O SLOP DE IA",
    subtitle: "Em um mar de interfaces geradas com gradientes idênticos, expor os ossos do HTML é um ato de resistência cultural.",
    excerpt: "Quando geradores generativos produzem 10.000 landing pages indistinguíveis por segundo, a única saída para a relevância gráfica é a crueza deliberada e a fidelidade ao meio.",
    category: "RADICAL WEB",
    tags: ["HTML", "Arquitetura", "Inteligência Artificial", "Sistemas Visuais"],
    author: {
      name: "Arthur Ferreira",
      role: "Designer & Crítico de Sistemas",
      bio: "Pesquisador de arquitetura da informação e estéticas computacionais radicais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverColor: "#FF4400",
    coverPattern: "grid",
    published: true,
    featured: false,
    readingTimeMinutes: 5,
    publishedAt: "2026-10-15T14:30:00.000Z",
    updatedAt: "2026-10-15T14:30:00.000Z",
    views: 980,
    likes: 195,
    content: `## A Origem do Termo: Béton Brut

Muitos confundem "brutalismo" com algo violento ou agressivo. O termo vem do francês *béton brut* — concreto bruto —, popularizado pelo arquiteto Le Corbusier ao construir a Unité d'Habitation em Marselha.

Tratava-se de **não rebocar**, de deixar as marcas da madeira que moldou o concreto aparentes na parede final.

> O brutalismo digital não é feiura proposital. É a decisão consciente de não esconder que a web é feita de caixas retangulares, texto e hiperlinks.

### O Fenômeno do "AI Slop" Visual

Com a proliferação desenfreada de ferramentas generativas, o custo de produzir uma interface "bonitinha" caiu para zero. O resultado é o que chamamos de *visual slop*:

1. **Ilustrações 3D genéricas** em roxo e turquesa com personagens sem ossos.
2. **Glassmorphism falso** que prejudica taxas de contraste WCAG.
3. **Micro-animações preguiçosas** que servem apenas para mascarar latência de servidor.

### Princípios do DesignCraft Brutalista

* **01. Linhas Visíveis:** Não esconda as divisões do layout. Se duas áreas são distintas, uma linha preta de 3px diz isso com clareza incomparável.
* **02. Sombra de Deslocamento Rígido:** Esqueça sombras embaçadas. Use sombras com blur zero (\`6px 6px 0px #000\`). Elas transmitem massa, gravidade e certeza mecânica.
* **03. Cores de Sinalização:** Use amarelo de advertência (\`#FFE600\`), laranja de tráfego (\`#FF4400\`) e azul de sinal (\`#0029FF\`).`
  },
  {
    id: "art-03",
    slug: "sistemas-de-design-sao-prisoes-douradas",
    title: "SISTEMAS DE DESIGN SÃO PRISÕES DOURADAS?",
    subtitle: "Como a busca corporativa por consistência absoluta matou a experimentação e a serendipidade nos times de produto.",
    excerpt: "Nascidos para acelerar o desenvolvimento, os design systems tornaram-se departamentos burocráticos de censura visual onde nenhuma ideia nova sobrevive sem aprovação de comitê.",
    category: "DESIGN SYSTEMS",
    tags: ["Design Ops", "Figma", "Processo", "Governança"],
    author: {
      name: "Arthur Ferreira",
      role: "Designer & Crítico de Sistemas",
      bio: "Pesquisador de arquitetura da informação e estéticas computacionais radicais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverColor: "#00E575",
    coverPattern: "blocks",
    published: true,
    featured: false,
    readingTimeMinutes: 6,
    publishedAt: "2026-10-12T09:15:00.000Z",
    updatedAt: "2026-10-12T09:15:00.000Z",
    views: 1120,
    likes: 310,
    content: `## Da Ferramenta à Burocracia

A promessa original dos Design Systems era libertadora: criar um vocabulário compartilhado de tokens e componentes para que designers e desenvolvedores pudessem focar nos problemas de negócio de alta complexidade.

Dez anos depois, o que vemos na maioria das organizações?

* Designers seniores que gastam 80% do sprint gerenciando variantes de botões no Figma.
* Novas soluções contextuais sendo rejeitadas porque "não existem no sistema de tokens v3.4".
* Aplicações inteiras sofrendo de paralisia criativa enquanto esperam o comitê de governança.

\`\`\`
          [IDEIA CONTEXTUAL VIVAZ]
                     │
                     ▼
        ┌─────────────────────────┐
        │  COMITÊ DE DESIGN OPS   │ ──► [MORRE NA FILA DE TOKENS]
        └─────────────────────────┘
                     │
                     ▼
           [PRODUTO PASTEURIZADO]
\`\`\`

### A Regra dos 80/20: Sistemas Vivos

Um bom sistema deve ser um **chão firme**, e não um teto de concreto. Recomendamos que 20% de qualquer superfície de tela seja livre para divergência experimental sem necessidade de autorização prévia.`
  },
  {
    id: "art-04",
    slug: "tipografia-como-arquitetura-espacial",
    title: "TIPOGRAFIA COMO ARQUITETURA ESPACIAL: DO SUÍÇO AO CAOS BRUTALISTA",
    subtitle: "Deixar o texto ditar a estrutura física da página em vez de preencher caixas decorativas pré-fabricadas.",
    excerpt: "A tipografia não existe para ornamentar um contêiner; ela é a própria alvenaria da experiência digital. Quando o tipo ganha escala brutal, o resto da interface se torna supérfluo.",
    category: "TIPOGRAFIA",
    tags: ["Editorial", "Grid", "Cartazes", "Hierarquia"],
    author: {
      name: "Arthur Ferreira",
      role: "Designer & Crítico de Sistemas",
      bio: "Pesquisador de arquitetura da informação e estéticas computacionais radicais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverColor: "#0029FF",
    coverPattern: "dots",
    published: true,
    featured: false,
    readingTimeMinutes: 8,
    publishedAt: "2026-10-09T18:00:00.000Z",
    updatedAt: "2026-10-09T18:00:00.000Z",
    views: 890,
    likes: 174,
    content: `## A Ilusão do Conteúdo Secundário

A maioria dos layouts de produto digital é concebida ao contrário: desenha-se primeiro uma grelha de cartões com proporções arbitrárias, e depois tenta-se espremer o texto lá dentro com \`text-overflow: ellipsis\` para não quebrar a diagramação bonitinha.

Isto é uma aberração contra séculos de história tipográfica.

> "Tipografia é arquitetura bidimensional. As letras são colunas de sustentação; o entrelinhamento é a altura do pé-direito; os brancos são as janelas de ventilação."

### O Peso da Monospace

Por que a estética brutalista venera famílias monospace como Courier, Menlo e JetBrains Mono?

1. **Rigor Geométrico:** Cada caractere ocupa exatamente o mesmo espaço horizontal (1 em). Isso permite alinhamentos matemáticos que remetem às matrizes de chumbo e teleimpressores.
2. **Ausência de Artifício:** Não há compensação ótica para agradar o olho burguês. É texto puro como dado computacional crú.`
  },
  {
    id: "art-05",
    slug: "dark-patterns-erosao-do-consentimento",
    title: "DARK PATTERNS E A EROSÃO DO CONSENTIMENTO NA ERA ALGORÍTMICA",
    subtitle: "Um mapeamento minucioso dos mecanismos psicológicos predatórios disfarçados de 'otimização de taxa de conversão'.",
    excerpt: "Botões de cancelamento cinza-claros em fundo branco, cronômetros falsos de escassez e trilhas de saída labirínticas. O design industrial virou uma arma de extorsão de atenção.",
    category: "ANTI-PATTERNS",
    tags: ["Ética", "UX Research", "Direito Digital", "Dark Patterns"],
    author: {
      name: "Arthur Ferreira",
      role: "Designer & Crítico de Sistemas",
      bio: "Pesquisador de arquitetura da informação e estéticas computacionais radicais.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    coverColor: "#FFE600",
    coverPattern: "stripes",
    published: true,
    featured: false,
    readingTimeMinutes: 6,
    publishedAt: "2026-10-05T11:20:00.000Z",
    updatedAt: "2026-10-05T11:20:00.000Z",
    views: 1650,
    likes: 422,
    content: `## O Eufemismo do Growth Hacking

Chamamos de "experimentos de conversão" o que em qualquer outro contexto civil seria classificado como fraude ou coação por indução ao erro.

Quando uma interface deliberadamente esconde o botão de cancelamento de assinatura sob três níveis de abas descontextualizadas com texto cinza sobre fundo cinza (\`#999999\` em \`#F5F5F5\`), o designer que desenhou aquilo não cometeu um erro de contraste: ele executou uma sabotagem calculada.

### O Arsenal da Desonestidade

* **Confirmshaming:** Textos de rejeição que insultam o usuário ("Não, eu prefiro continuar perdendo dinheiro").
* **Roach Motel:** Fácil de entrar, quase impossível de sair. Assinatura em 1 clique; cancelamento exige ligação telefônica em horário comercial.
* **Sneak into Basket:** Adição sub-reptícia de seguros ou itens extras durante o checkout.

O antídoto brutalista para isso é o **Princípio da Clareza Violenta**: contraste máximo, opções simétricas e termos explícitos sem letras miúdas.`
  }
];
