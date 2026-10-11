# Yzzo Digital: landing page

Site de uma página da Yzzo Digital, agência de marketing esportivo para
atletas de futebol. Vite + React + Tailwind, estático na Vercel.

As etapas do projeto, o que já está feito e o que falta: **[ETAPAS.md](ETAPAS.md)**.

## Rodar

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
| `npm run lint` | roda o oxlint |
| `npm run fotos` | converte as imagens de `instagram/` para `public/` |
| `npm run videos` | comprime os vídeos de `videos-originais/` para `public/videos/` |
| `npm run og` | gera `og-yzzo.jpg` e `og-parceiros.jpg`, os cartões de link |

## Onde mexer

| o quê | arquivo |
| --- | --- |
| WhatsApp, e-mail, Instagram, mensagem pronta | `src/lib/brand.ts` |
| Cores e fontes | `src/index.css` (tokens no `:root`) |
| Artes, fotos e posts "Novo Cliente!" | `src/data/portfolio.ts` + `scripts/importar-instagram.mjs` |
| Vídeos (hoje placeholder) | `src/data/videos.ts` |
| Serviços | `src/data/servicos.ts` |
| Como trabalhamos (as duas páginas) | `src/data/processo.ts` |
| Planos, avulsos e pacote para agências | `src/data/planos.ts` |
| Números | `src/data/numeros.ts` |
| Logo (hoje provisória) | `src/components/Logo.tsx` |
| Título, descrição e cartão de link | `index.html` e `parceiros.html` |

## As páginas

| endereço | arquivo | para quem |
| --- | --- | --- |
| `/` | `index.html` → `src/pages/Inicio.tsx` | quem chega pelo Instagram ou pela busca |
| `/parceiros` | `parceiros.html` → `src/pages/Parceiros.tsx` | agências e empresários: "como funciona a Yzzo" |

Cada página é um HTML próprio para ter o próprio cartão no WhatsApp (o robô
do cartão não executa JavaScript). Para criar uma terceira: um HTML na raiz,
uma entrada em `src/`, uma linha em `PAGINAS` (`vite.config.ts`) e outra em
`CAMINHOS` (`scripts/seo.ts`). Ver `src/lib/montar.tsx`.

## Imagens

O dump do Instagram fica em `instagram/`, fora do Git. A tabela `MAPA` em
`scripts/importar-instagram.mjs` traduz o número de cada arquivo para o
caminho que o site usa, e cada imagem sai em duas larguras (cheia e 600px).

## Vídeos

1. Coloque o original em `videos-originais/` com o nome de `arquivo` em
   `src/data/videos.ts` (`agencia.mp4`, `motion-1.mp4`…).
2. `npm run videos` (precisa do `ffmpeg` instalado).
3. Em `src/data/videos.ts`, preencha `src`, `srcCelular` e `poster`.

## Publicar

Repositório: [imnotlopes/yzzodigital](https://github.com/imnotlopes/yzzodigital).
O histórico começa limpo, sem os commits da Danielli. O remoto dela continua
configurado nesta pasta como `danielli` (e o histórico dela no ramo local
`danielli-legado`): nunca dê push para ele daqui.
