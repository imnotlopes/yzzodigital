/**
 * Gera a versão AVIF das fotos da primeira tela.
 *
 *   node scripts/avif.mjs
 *
 * A foto da capa é a primeira coisa grande que a página baixa, e no celular
 * de tela densa (o iPhone, quase todo Android bom) o `srcset` escolhe a
 * versão cheia: 326 KB em WebP. No 4G fraco ela chegava vários segundos
 * depois do texto. Em AVIF, a mesma foto tem 140 KB.
 *
 * Só as fotos da primeira tela: no resto da página a imagem chega enquanto a
 * pessoa ainda está rolando, e o WebP basta. O navegador que não abre AVIF
 * fica com o WebP, pelo `<picture>` (ver Capa.tsx).
 *
 * Qualidade 50: o AVIF alisa o granulado de filme da foto, e abaixo disso o
 * granulado some de vez. Lê as versões WebP de `public/`, então roda depois
 * de `npm run fotos`.
 */
import { stat } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const PUBLICO = path.resolve(import.meta.dirname, '..', 'public')
const FOTOS = ['fotos/camisa-20', 'fotos/camisa-20-600']

for (const foto of FOTOS) {
  const destino = path.join(PUBLICO, `${foto}.avif`)
  await sharp(path.join(PUBLICO, `${foto}.webp`))
    .avif({ quality: 50, effort: 6 })
    .toFile(destino)
  const { size } = await stat(destino)
  console.log(`✓ ${foto}.avif  ${Math.round(size / 1024)} KB`)
}
