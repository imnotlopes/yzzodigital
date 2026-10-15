# Yzzo Digital: etapas do projeto

Site da Yzzo Digital, agência de artes e conteúdo visual para o futebol. Duas
páginas, na mesma base técnica do projeto da Danielli Noivas (Vite + React +
Tailwind, publicado na Vercel):

| endereço | para quem | o que faz |
| --- | --- | --- |
| `/` | quem chega pelo Instagram ou pela busca | mostra o que a Yzzo faz, o portfólio e os pacotes do atleta |
| `/parceiros` | quem pergunta "como funciona a empresa de vocês?" | explica o pacote do atleta e o do empresário |

Repositório: [imnotlopes/yzzodigital](https://github.com/imnotlopes/yzzodigital).

---

## Fase 1: a primeira versão ✅ (aprovada)

Base e limpeza do projeto da Danielli, identidade tirada do Instagram,
landing, página de parceiros e publicação no GitHub. O que era da Danielli
está em `_legado-danielli/`, fora do Git.

---

## Fase 2: o conteúdo oficial e um site mais sofisticado

Começou com a proposta comercial que a Yzzo escreveu e o áudio que veio com
ela (outubro de 2026):

- "Ficou muita informação." O foco é **só arte**.
- A Yzzo **não faz cobertura de jogo**. Quando o atleta se destaca, ela pega
  as fotos do jogo, edita e publica.
- Carreira e transferência são do empresário. A Yzzo trabalha só com a
  imagem do atleta.
- O que precisa ficar claro: **como funciona o pacote do atleta e o do
  empresário**. "É só isso."
- Ajustar a logo: a oficial chegou na mídia nova.

Cada etapa termina com prints no computador e no celular e um commit local.
Só sobe para o GitHub com aprovação.

### Etapa 1: conteúdo oficial e enxugamento ✅ (aprovada)

**Landing**, de 9 blocos para 5:

| # | seção | o que tem |
| --- | --- | --- |
| 1 | Capa | "Sua imagem também deveria." · os serviços numa linha · +700 projetos |
| 2 | O que a Yzzo faz | o "sobre" da proposta numa frase e os **6 serviços**: Match Days, Motion Design, Convocação, Novo clube, Comemorativas e DVD esportivo |
| 3 | Portfólio | artes deslizando e Motion (o mural de fotos de jogo saiu) |
| + | #TimeYzzoDigital | a faixa dos "Novo Cliente!", que também são artes da Yzzo |
| 4 | Pacotes para atletas | **Essencial R$ 90 · Profissional R$ 115 · Motion R$ 140** por mês, DVD esportivo "valor sob negociação" e o caminho para o pacote de empresas |
| 5 | Contato | "Grandes conquistas começam com grandes decisões." |

**`/parceiros`**, de 11 blocos para 4:

| # | seção | o que tem |
| --- | --- | --- |
| 1 | Como funciona a Yzzo | "O empresário cuida da carreira. A Yzzo cuida da imagem." |
| 2 | Pacotes para atletas | os mesmos três, com preço, e o DVD |
| 3 | Pacote para empresas | semanal, quinzenal e mensal (com o calendário de entregas de cada um) e **como funciona a parceria**: quantidade de atletas, serviços e artes, valor por atleta e condições, data de pagamento |
| 4 | Estrela do Mês ⭐ | um atleta por agência com mais destaque, e a recomendação de uma publicação por semana para o melhor da semana |
| + | Contato | com mensagem pronta de parceiro |

**O que saiu**, por não estar na proposta: gestão de imagem, fotografia em
campo e o mural de fotos, relatório mensal, mídia kit, os planos que eu tinha
proposto, o processo em 6 passos, a seção de atleta de base, as perguntas
frequentes, a comparação com o agenciamento (virou uma frase) e o bloco "A
agência" (virou a linha de apoio dos serviços).

Rodapé: "Profissionalismo, qualidade e valorização da imagem do atleta.", o
fecho da proposta.

Cada botão de pacote abre o WhatsApp com o pacote e o valor escritos ("Vim
pelo site e quero o pacote Profissional (R$ 115/mês)").

Onde mexer: `src/data/servicos.ts` (serviços) e `src/data/pacotes.ts`
(pacotes, modalidades, parceria e Estrela do Mês).

### Etapa 2: logo oficial e mídia nova ✅ (aprovada)

A mídia está em `banco-de-midia/` (fora do Git, são 200 MB).

| o que | onde entrou |
| --- | --- |
| **Logo oficial**, com a seta de crescimento nos dois Z | topo, rodapé e os dois cartões de link. Fundo transparente, em versão escura (letras pretas) e clara (letras brancas). Nunca sobre o amarelo: a seta some |
| **Ícone da aba** | a logo sobre o fundo da marca, como a foto de perfil do Instagram |
| **2 Match Days em Motion** (Brasil x Paraguai e FC Estrela x Vila Nova) | bloco Motion do portfólio, ao lado do texto, e a Estrela do Mês em /parceiros. De 77 MB para 5 MB, com versão menor para celular, e só baixam quando aparecem na tela |
| **7 artes de Match Day** | bloco novo "Match Day" no portfólio, numa fileira de arrastar, abrindo em tela cheia. Também viraram as imagens de Match Days e Motion em "O que a Yzzo faz" |
| **Posts de texto** | "Talento sem visibilidade não é visto." abre os pacotes do atleta |

Ficaram de fora: a convocação do festival Sub-15 (já estava no site) e os
outros posts de texto, para não voltar a encher a página.

Para refazer depois de trocar algum arquivo: `npm run midia` (logo, ícones e
artes) e `npm run videos` (vídeos, a partir de `videos-originais/`).

### Etapa 3: visual mais sofisticado ✅ (em aprovação)

O conteúdo não mudou; mudou o acabamento.

| o quê | como ficou |
| --- | --- |
| **Títulos de seção** | versão editorial no computador: título à esquerda, linha de apoio à direita, separados por um fio. No celular, como antes |
| **Seções escuras** | grão quase invisível e um brilho de luz no alto, no lugar do preto chapado |
| **Rodapé** | escuro, continuando o convite: a página termina num bloco só, com a logo clara e o fecho da proposta |
| **Botões** | sobem 1px com sombra no mouse; o ícone do WhatsApp inclina e as setas andam para onde apontam. Nas seções escuras, o amarelo fica branco no hover em vez de sumir no fundo |
| **Cartões** (serviços, pacotes, modalidades) | sobem 4px com sombra longa no mouse |
| **Menu** | um fio amarelo cresce embaixo do link no hover |
| **Cantos e sombras** | cantos de 6px em todo o site; sombras em duas camadas |
| **Entrada das seções** | mais lenta e suave: o bloco "pousa" |

O hover só existe com mouse: no celular, nada fica preso no estado de hover depois do toque.

### Etapa 4: capa e movimento ⏳
O Motion na capa, o título aparecendo palavra por palavra e o "+700"
contando.

### Etapa 5: portfólio ⏳
Filtros por categoria, vídeo no visor e gesto de arrastar no celular.

### Etapa 6: pacotes ⏳
Cartões de preço e a seção de empresa e da Estrela do Mês no mesmo nível do
resto.

### Etapa 7 (opcional): link com o nome da agência ⏳
`/parceiros?agencia=Nome` preenchendo o "(NOME DA AGÊNCIA)" da proposta.

### Etapa 8: acabamento e publicação ⏳
Celular, acessibilidade, peso, textos para o Google e envio ao GitHub.

---

## Pendências

| o que | situação |
| --- | --- |
| **Domínio** | provisório: `yzzodigital.vercel.app` (`src/lib/brand.ts`, `index.html`, `parceiros.html`) |
| **Vercel** | criar o projeto ligado ao repositório |
| **Autorização de imagem** | boa parte dos atletas é menor de idade. Confirmar que o contrato com os responsáveis cobre o site |
| **Arte "2025"** | tem a marca da Sabu Sports. Hoje não aparece em destaque; se voltar, combinar com eles |

---

## Para rodar

```bash
npm install
```

```bash
npm run dev
```

| comando | o que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | gera `dist/` para publicar |
| `npm run fotos` | converte as imagens de `instagram/` para `public/` |
| `npm run videos` | comprime os vídeos de `videos-originais/` para `public/videos/` |
| `npm run og` | gera os cartões de link |
