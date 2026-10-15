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

### Etapa 3: visual mais sofisticado ✅ (aprovada)

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

### Etapa 4: capa e movimento ✅ (aprovada)

| onde | o que acontece |
| --- | --- |
| **Capa da landing** | "Sua imagem também deveria." chega palavra por palavra, cada uma subindo de trás de uma máscara, e o amarelo pinta o "imagem" depois, como caneta de marca-texto |
| | o Match Day em Motion (Brasil x Paraguai) entra por cima da borda da foto, com moldura branca e levemente girado. Começa no segundo 7,2, já com o atleta, pulando a vinheta de cor |
| | a foto anda um pouco mais devagar que a página e os cacos amarelos andam no sentido contrário: três planos, e é daí que vem a profundidade |
| | o "+700" sobe contando, de 0 até 700, desacelerando no fim |
| **Capa de /parceiros** | "Como funciona a Yzzo" palavra por palavra, o "+700" contando e o leque de artes que chega empilhado e se abre como cartas na mão |
| **Fecho das duas páginas** | "Grandes conquistas começam com grandes decisões." chega palavra por palavra |

Quem pediu menos movimento no sistema vê tudo já no lugar: sem animação,
sem contagem, e o vídeo vira a imagem parada. No celular, o vídeo da capa
só baixa quando aparece na tela.

### Etapa 5: portfólio ✅ (aprovada)

Mudou no meio, a pedido de vocês: em vez de filtros, as duas fileiras
deslizando em sentidos opostos, no celular e no computador.

| o quê | como ficou |
| --- | --- |
| **01 Artes** | a seção prende na tela e as artes andam para a esquerda enquanto a pessoa rola. Vale no celular também: antes era um carrossel de arrastar, e quem só rolava a página nem percebia que tinha mais |
| **02 Match Day** | espelho da de cima: título à direita, a fileira começa encostada na direita (com Brasil x Peru) e as artes andam para a direita |
| **03 Motion** | os dois vídeos, que agora também abrem em tela cheia |
| **Visor** | mostra arte e vídeo (tocando, com controles), troca com as setas, com os botões ou arrastando o dedo para o lado no celular. A peça nova entra do lado para onde a pessoa foi, e a vizinha já fica baixada |

Os filtros saíram do plano: com as fileiras separadas por tipo, eles
seriam informação a mais.

### Etapa 6: pacotes ✅ (em aprovação)

A seção de preços foi refeita do zero, a pedido de vocês ("tá bem ruim").

| no cartão | o quê |
| --- | --- |
| **Para quem é** | uma linha embaixo do nome. ⚠️ Texto meu, tirado da proposta: confirmar |
| **Peças no mês, desenhadas** | uma miniatura de arte de verdade para cada peça do pacote: 4 no Essencial, 5 + 1 de novo clube no Profissional, 4 Motion (com play) + 1 de novo clube no Motion. A diferença entre os pacotes se vê, sem comparar listas |
| **Preço** | grande, com o "R$" pequeno ao lado e "/mês" |
| **Custo por arte** | o preço dividido pelas peças: R$ 22,50 · R$ 19,17 · R$ 28,00 |
| **Destaque** | o cartão preto com borda amarela e a etiqueta "Melhor custo por arte" é o de menor custo por peça. É calculado: se o preço mudar, o destaque acompanha |

Embaixo, o DVD esportivo ("valor sob negociação") e, na landing, um cartão
amarelo que leva ao pacote de empresas em /parceiros.

### Etapa 6b: carregamento e celular ✅ (em aprovação)

Medido na versão de produção, simulando celular em 4G e processador 4x mais
lento.

| o quê | antes | depois |
| --- | --- | --- |
| **Página pulando enquanto carrega** (CLS, bom é abaixo de 0,1) | 0,124 na landing · 0,229 em /parceiros | 0,007 · 0,011 |
| **Peso da abertura da landing** | 349 KB | 203 KB |
| **Miniaturas dos pacotes** | arte de 600px (até 92 KB cada) para um selo de 50px | versão de 160px (8 KB) |

O que foi feito:

- **Fontes de reserva na medida:** enquanto a fonte da marca não chega, o
  texto aparece numa fonte do sistema ajustada para ocupar o mesmo espaço. Era
  a causa de quase todo o pulo: o título quebrava em mais linhas e tudo descia.
- **Fontes sem travar a página:** o CSS do Google Fonts deixou de bloquear a
  primeira pintura.
- **Pôsteres dos vídeos:** só baixam quando o vídeo está a uma tela de
  distância.
- **Miniaturas:** `npm run miniaturas` gera a versão de 160px das artes.
- **Serviços no celular:** um por linha, imagem ao lado do texto. Em duas
  colunas, numa tela de 360px, o texto quebrava em cinco linhas miúdas.
- **Preços no tablet e em 1024px:** coluna centralizada até 1024px, e o nome do
  pacote acompanha a largura ("Profissional" não cabia).

Fica para depois, se quiserem ir além: a página é montada pelo JavaScript,
então no celular lento há um instante em branco antes do conteúdo (1,5 a 2,3 s
na medição). Gerar o HTML pronto no build resolve, mas mexe nas animações de
entrada da capa, por isso não entrou sem combinar.

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
