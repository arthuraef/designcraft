# DESIGNCRAFT /// ARQUIVO BRUTALISTA DE DESIGN

> **"Raw materials exposed. An intentional rejection of polish, gradients, and soft shadows."**

**DesignCraft** é uma plataforma e repositório editorial de ensaios e artigos sobre design, crítica de interfaces, tipografia radical e arquitetura da informação, construída com estética **Brutalista** e sistema integrado de **CMS / Admin**.

---

## ⚡ Identidade Estética: Brutalismo Digital

- **Honestidade Estrutural:** Bordas pretas sólidas de 3px a 4px, grid visível e divisão por linhas físicas em vez de espaços em branco arbitrários.
- **Zero Blur Shadows:** Sombras mecânicas com desfoque nulo (`box-shadow: 4px 4px 0px #000`, `8px 8px 0px #000`), transmitindo gravidade, peso físico e certeza tátil.
- **Micro-interações Físicas:** Efeito de deslocamento no clique (`translate(4px, 4px)` cobrindo a sombra instantaneamente).
- **Cores de Sinalização:** Alto contraste em preto `#000000`, papel `#F4F4F0`, amarelo de alerta `#FFE600`, laranja de tráfego `#FF4400`, azul de sinal `#0029FF` e verde terminal `#00E575`.
- **Tipografia Brutalista:** *Space Grotesk* (grotesque pesado) pareada com *JetBrains Mono* (monospaçada de precisão matemática).

---

## 🛠 Funcionalidades

### 1. Leitor e Repositório Público
- **Página Inicial (`/`):**
  - Hero monumental com manifesto de capa.
  - Ticker marquee contínuo em alta velocidade.
  - Artigo em Destaque editorial com capa geométrica viva.
  - Barra de busca em tempo real por título, resumo ou tags.
  - Filtro instantâneo por categorias (*Teoria Crítica*, *Radical Web*, *Design Systems*, *Tipografia*, *Anti-Patterns*, etc.).
  - Alternador de visualização em Grelha (*Grid Cards*) e Tabela Técnica (*Table View*).
  - Caixa de subscrição e manifesto.
- **Leitura do Artigo (`/article/[slug]`):**
  - Capa tipográfica gerada dinamicamente com carimbos, metadados e códigos de barras.
  - Renderizador customizado de **Markdown** com blocos de código com cópia rápida, citações pesadas, tabelas cruas e listas geométricas.
  - Contador interativo de curtidas (*Likes*) persistido via API.
  - Compartilhamento em 1 clique e modo de impressão brutalista.
  - Navegação entre artigo anterior e próximo.
- **O Manifesto (`/manifesto`):**
  - As 10 Teses sobre a materialidade e atrito no design digital.

### 2. Painel Admin / CMS (`/admin`)
- **Dashboard com Métricas em Tempo Real:**
  - Total de artigos, publicados, rascunhos, leituras totais e curtidas registradas.
- **Gerenciador de Artigos:**
  - Tabela completa com filtros por status (*Todos*, *Publicados*, *Rascunhos*) e busca.
  - Alternador instantâneo de publicação (*Publicado / Rascunho*) com 1 clique.
  - Prévia ao vivo do artigo no site em nova aba.
  - Exclusão com confirmação segura.
  - Exportação completa do banco de dados em **JSON** para backup.
  - Importação de dados via JSON.
  - Botão de restauração rápida para os ensaios seminais.
- **Editor Brutalista Dual-Pane (`/admin/new` e `/admin/edit/[id]`):**
  - Título, slug automático, subtítulo, resumo, categorias pré-definidas ou personalizadas.
  - Seletor de cores de acento brutalista da capa (`#FFE600`, `#FF4400`, `#0029FF`, `#00E575`, `#FFFFFF`, `#000000`).
  - Seletor de padrões geométricos de capa (`stripes`, `grid`, `dots`, `blocks`) com prévia em tempo real.
  - Suporte a URL de imagem externa com filtro de alto contraste.
  - Editor Markdown com botões de inserção rápida de tags (H2, H3, Citação, Código, Tabela, Lista).
  - **Live Preview lado a lado**: veja o ensaio sendo renderizado com toda a tipografia e estilização brutalista enquanto digita!

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- npm ou pnpm

### Passos

```bash
# Clone o repositório
git clone https://github.com/arthuraef/designcraft.git
cd designcraft

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

Para acessar o painel do CMS diretamente:
[http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🏗 Arquitetura do Projeto

```
designcraft/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── edit/[id]/page.tsx   # Editor de edição de artigo
│   │   │   ├── new/page.tsx          # Editor de novo artigo
│   │   │   └── page.tsx              # Dashboard do CMS
│   │   ├── api/
│   │   │   └── articles/
│   │   │       ├── [id]/
│   │   │       │   ├── route.ts      # GET, PUT, DELETE artigo
│   │   │       │   └── stats/route.ts# Curtidas e visualizações
│   │   │       ├── reset/route.ts    # Restauração das seeds
│   │   │       └── route.ts          # Listagem e criação de artigos
│   │   ├── article/[slug]/page.tsx   # Leitor individual do artigo
│   │   ├── manifesto/page.tsx        # Manifesto Brutalista
│   │   ├── globals.css               # Tokens, sombras e regras CSS brutais
│   │   ├── layout.tsx                # Layout raiz com fontes e nav
│   │   └── page.tsx                  # Home com hero, filtros e feed
│   ├── components/
│   │   ├── AdminArticleEditor.tsx    # Editor completo com live preview
│   │   ├── AdminDashboardClient.tsx  # Tabela administrativa e métricas
│   │   ├── ArticleCard.tsx           # Cartão brutalista de artigo
│   │   ├── ArticleDetailClient.tsx   # Visualizador de artigo
│   │   ├── BrutalistCover.tsx        # Capas tipográficas e geométricas
│   │   ├── Footer.tsx                # Rodapé com specs e links
│   │   ├── HomeClient.tsx            # Feed interativo com filtros
│   │   ├── MarkdownRenderer.tsx      # Renderizador estilizado de Markdown
│   │   ├── MarqueeTicker.tsx         # Ticker contínuo de manifesto
│   │   └── Navbar.tsx                # Header com relógio e atalhos
│   ├── data/
│   │   ├── articles.json             # Armazenamento em arquivo JSON
│   │   └── seed-articles.ts          # Artigos seminais de exemplo
│   ├── lib/
│   │   └── articles.ts               # Camada de persistência e regras de negócio
│   └── types/
│       └── article.ts                # Definições de tipos TypeScript
├── package.json
└── tailwind.config.ts / next.config.ts
```

---

## 📜 Licença

Distribuído sob licença livre MIT.
Projetado e desenvolvido para desafiar as convenções e resgatar a coragem estética na web.
