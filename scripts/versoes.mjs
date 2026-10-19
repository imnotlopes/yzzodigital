/**
 * Gera as versões que deixam as imagens leves: as larguras intermediárias
 * (320, 800 e 1080), as AVIF e a logo de 360px.
 *
 *   node scripts/versoes.mjs
 *
 * POR QUE A DE 1080
 * -----------------
 * No celular de tela densa (iPhone, quase todo Android bom), uma arte do
 * deslize ocupa uns 350px de largura, e o navegador multiplica por 3: pede
 * uma imagem de 1050px. Com só 600 e a cheia (1280) para escolher, ele
 * baixava a cheia, de 200 a 416 KB cada. A página inteira passava de 6 MB.
 *
 * 1080 é a largura do próprio Instagram, e a diferença de nitidez para a
 * cheia não aparece na tela. O tamanho cai mais que a largura: a foto de
 * Instagram tem granulado, e reduzir alisa o granulado, que é o que mais pesa.
 * Só sai para quem é mais larga que 1080 (os Match Days, de 900, não têm).
 *
 * E AS DE 320 E 800
 * -----------------
 * As telas menos densas (o celular que o PageSpeed simula tem densidade 1,75,
 * e muito Android barato fica entre 1,5 e 2) pedem menos: 650px para a arte
 * do deslize, 300px para a carta do leque e o cartão de serviço. Sem as
 * intermediárias, o navegador pulava para a de cima, com o dobro do peso.
 * Cada largura só existe se a imagem cheia for mais larga que ela; a regra é
 * a mesma de `srcsetDe`, em src/data/portfolio.ts.
 *
 * POR QUE AVIF
 * ------------
 * O mesmo desenho, com uns 30% a menos que o WebP na mesma largura. Toda
 * largura ganha a sua AVIF; o navegador que não abre AVIF fica com o WebP,
 * pelo `<picture>` de components/Foto.tsx.
 *
 * Qualidade 55 nas artes (texto e contorno precisam ficar limpos) e 50 nas
 * fotos (o AVIF alisa o granulado de filme, e abaixo disso ele some de vez).
 *
 * Lê as versões WebP de `public/`, então roda depois de `npm run fotos` e
 * `npm run midia`. Só refaz o que falta: para refazer tudo, apague as .avif.
 */
import { access, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const PUBLICO = path.resolve(import.meta.dirname, '..', 'public')
/** As larguras intermediárias. Precisam bater com `LARGURAS` em src/data/portfolio.ts. */
const LARGURAS = [320, 800, 1080]

/** As pastas e a qualidade de cada uma. Em `fotos`, só as que aparecem no site: a da capa e as de jogo. */
const PASTAS = [
  { pasta: 'artes', qualidade: 55 },
  { pasta: 'matchday', qualidade: 55 },
  { pasta: 'fotos', qualidade: 50, so: ['camisa-20', 'lance-conducao', 'lance-camisa-18', 'lance-arbitro'] },
]

const existe = (arquivo) =>
  access(arquivo).then(
    () => true,
    () => false,
  )

let feitas = 0
let economia = 0

async function gerar(origem, destino, formato, qualidade, largura) {
  if (await existe(destino)) return
  let imagem = sharp(origem)
  if (largura) imagem = imagem.resize({ width: largura, withoutEnlargement: true })
  imagem =
    formato === 'avif'
      ? imagem.avif({ quality: qualidade, effort: 6 })
      : imagem.webp({ quality: 78 })
  await imagem.toFile(destino)
  feitas++
}

for (const { pasta, qualidade, so } of PASTAS) {
  const arquivos = (await readdir(path.join(PUBLICO, pasta))).filter(
    (nome) => nome.endsWith('.webp') && !/-(96|160|320|600|800|1080)\.webp$/.test(nome),
  )

  for (const arquivo of arquivos) {
    const nome = arquivo.replace(/\.webp$/, '')
    if (so && !so.includes(nome)) continue

    const cheia = path.join(PUBLICO, pasta, arquivo)
    const base = path.join(PUBLICO, pasta, nome)
    const { width } = await sharp(cheia).metadata()

    for (const largura of LARGURAS.filter((l) => width > l)) {
      await gerar(cheia, `${base}-${largura}.webp`, 'webp', qualidade, largura)
      await gerar(cheia, `${base}-${largura}.avif`, 'avif', qualidade, largura)
    }
    await gerar(cheia, `${base}.avif`, 'avif', qualidade)
    await gerar(`${base}-600.webp`, `${base}-600.avif`, 'avif', qualidade)

    const antes = (await stat(cheia)).size
    const depois = (await stat(width > 1080 ? `${base}-1080.avif` : `${base}.avif`)).size
    economia += antes - depois
  }
}

/*
  AS AVULSAS: imagens que o site usa fora do portfólio (os cartões de
  serviço que não vêm de uma arte). Ganham a AVIF e a versão de 320, a do
  cartão no celular; ver src/data/servicos.ts.
*/
const AVULSAS = ['videos/brasil-x-paraguai']
for (const avulsa of AVULSAS) {
  const origem = path.join(PUBLICO, `${avulsa}.webp`)
  const pequena = path.join(PUBLICO, `${avulsa}-320`)
  await gerar(origem, path.join(PUBLICO, `${avulsa}.avif`), 'avif', 55)
  await gerar(origem, `${pequena}.webp`, 'webp', 55, 320)
  await gerar(origem, `${pequena}.avif`, 'avif', 55, 320)
}

/*
  A LOGO PEQUENA. O topo mostra a logo com uns 110px de largura; a de 720px
  (26 KB) era para o rodapé de tela retina. A de 360 cobre o topo em qualquer
  tela, com uns 6 KB. Sai do PNG, que não tem perda. Qualidade 82: a 92 o
  PageSpeed apontava 5 KB a ganhar, e a diferença não aparece.
*/
for (const nome of ['logo', 'logo-claro']) {
  const destino = path.join(PUBLICO, 'marca', `${nome}-360.webp`)
  if (await existe(destino)) continue
  await sharp(path.join(PUBLICO, 'marca', `${nome}.png`))
    .resize({ width: 360 })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(destino)
  feitas++
}

console.log(`✓ ${feitas} versões novas`)
console.log(`  no celular de tela densa, as imagens somam ${Math.round(economia / 1024)} KB a menos`)
