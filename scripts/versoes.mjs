/**
 * Gera as versões que deixam as imagens leves: a de 1080px, as AVIF e a
 * logo de 360px.
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
const LARGURA_MEDIA = 1080

/** As pastas e a qualidade de cada uma. `fotos` é só a da capa: as outras não aparecem no site. */
const PASTAS = [
  { pasta: 'artes', qualidade: 55 },
  { pasta: 'matchday', qualidade: 55 },
  { pasta: 'fotos', qualidade: 50, so: ['camisa-20'] },
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
    (nome) => nome.endsWith('.webp') && !/-(160|600|1080)\.webp$/.test(nome),
  )

  for (const arquivo of arquivos) {
    const nome = arquivo.replace(/\.webp$/, '')
    if (so && !so.includes(nome)) continue

    const cheia = path.join(PUBLICO, pasta, arquivo)
    const base = path.join(PUBLICO, pasta, nome)
    const { width } = await sharp(cheia).metadata()

    if (width > LARGURA_MEDIA) {
      await gerar(cheia, `${base}-1080.webp`, 'webp', qualidade, LARGURA_MEDIA)
      await gerar(cheia, `${base}-1080.avif`, 'avif', qualidade, LARGURA_MEDIA)
    }
    await gerar(cheia, `${base}.avif`, 'avif', qualidade)
    await gerar(`${base}-600.webp`, `${base}-600.avif`, 'avif', qualidade)

    const antes = (await stat(cheia)).size
    const depois = (await stat(width > LARGURA_MEDIA ? `${base}-1080.avif` : `${base}.avif`)).size
    economia += antes - depois
  }
}

/*
  AS AVULSAS: imagens que o site usa numa largura só, fora do portfólio (os
  cartões de serviço). Ganham só a AVIF da mesma largura.
*/
const AVULSAS = ['fotos/chute-600', 'videos/brasil-x-paraguai']
for (const avulsa of AVULSAS) {
  await gerar(path.join(PUBLICO, `${avulsa}.webp`), path.join(PUBLICO, `${avulsa}.avif`), 'avif', 55)
}

/*
  A LOGO PEQUENA. O topo mostra a logo com uns 110px de largura; a de 720px
  (26 KB) era para o rodapé de tela retina. A de 360 cobre o topo em qualquer
  tela, com uns 8 KB. Sai do PNG, que não tem perda.
*/
for (const nome of ['logo', 'logo-claro']) {
  const destino = path.join(PUBLICO, 'marca', `${nome}-360.webp`)
  if (await existe(destino)) continue
  await sharp(path.join(PUBLICO, 'marca', `${nome}.png`))
    .resize({ width: 360 })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(destino)
  feitas++
}

console.log(`✓ ${feitas} versões novas`)
console.log(`  no celular de tela densa, as imagens somam ${Math.round(economia / 1024)} KB a menos`)
