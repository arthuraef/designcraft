# Good Morning News ☼

> **A síntese diária das 07:00 AM.**  
> Um agente autônomo que varre as principais redações do mundo e seleciona exatamente as **2 notícias fundamentais** em **UX Design**, **Tecnologia**, **AI**, **Games**, **Board Games** e **Ciência**. Sem ruído, sem clickbait, sem feed infinito.

Disponível online em: **[https://arthuraef.github.io/designcraft/](https://arthuraef.github.io/designcraft/)**

---

## ☼ O Conceito: 6 Domínios × 2 Histórias

O **Good Morning News** combate a dispersão e a obesidade informacional da internet contemporânea através de uma regra estrita de seleção:

* **07:00 AM Diário**: A edição é compilada às 7 da manhã para fornecer clareza antes do início do dia produtivo.
* **12 Histórias**: Exatamente 2 por área em:
  1. **UX Design** (*Smashing Magazine*, *UX Collective*)
  2. **Tecnologia** (*Ars Technica*, *TechCrunch*)
  3. **AI** (*The Decoder*, *VentureBeat AI*)
  4. **Games** (*Polygon*, *PC Gamer*)
  5. **Board Games** (*Dicebreaker*, *BoardGameGeek*)
  6. **Ciência** (*Phys.org*, *ScienceDaily*)
* **Transparência de Fonte**: Cada matéria traz o link direto para a apuração original.
* **Estética Suíça (International Typographic Style)**: Fundo suave de concreto (`#E9ECEF`), linhas milimétricas de 1px (`#D0D5DD`), tipografia grotesque com tracking estreito e acento vermilion (`#E63926`).

---

## ⚙️ Comandos do Agente

| Comando | Descrição |
| :--- | :--- |
| `npm run curate` | Executa o agente curador (`scripts/curator-agent.mjs`), varre os feeds mundiais e atualiza os dados da edição. |
| `npm run morning` | Executa a curadoria diária, compila o site e publica a nova edição diretamente no GitHub Pages. |
| `npm run build` | Compila o Next.js com exportação 100% estática (`out/`). |
| `npm run deploy` | Publica o conteúdo da pasta `out/` no branch `gh-pages`. |

---

## ⏰ Agendamento Diário (07:00 AM)

### Opção 1: Crontab Local (macOS / Linux)
Para agendar o agente na sua máquina local todos os dias às 07:00 AM:
```bash
crontab -e
```
Adicione a linha:
```cron
0 7 * * * cd /Users/arthuraef/Documents/Work/designcraft && /usr/local/bin/npm run morning >> /tmp/gmn-curator.log 2>&1
```

### Opção 2: GitHub Actions (Nuvem)
O template pronto para execução em nuvem está disponível em `automation/morning-curator.yml`.  
Para habilitá-lo, crie o arquivo `.github/workflows/morning-curator.yml` na interface web do GitHub ou certifique-se de que seu Personal Access Token possui o escopo `workflow`.

---

© 2026 Good Morning News. Construído com Next.js 16, React 19 e Tailwind CSS.
