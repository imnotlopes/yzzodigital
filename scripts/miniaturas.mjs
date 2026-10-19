/**
 * Gera as versões miniatura (160 e 96px de largura) de cada arte.
 *
 *   node scripts/miniaturas.mjs
 *
 * As miniaturas dos cartões de pacote aparecem com uns 50px de largura. Sem
 * versão própria, cada uma baixava a arte de 600px (até 92 KB) para mostrar
 * um selo: eram uns 600 KB de imagem na seção de preços do celular. A de
 * 160px cobre tela de densidade 3 e pesa uns 6 KB; a de 96, as telas menos
 * densas (o PageSpeed simula uma de 1,75), com uns 3 KB.
 *
 * Lê as versões de 600px que os outros scripts já geraram, então roda depois
 * deles (`npm run fotos` e `npm run midia`).
 */
import { readdir } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const PUBLICO = path.resolve(import.meta.dirname, '..', 'public')
const PASTAS = ['artes', 'matchday']

let feitas = 0
for (const pasta of PASTAS) {
  const arquivos = await readdir(path.join(PUBLICO, pasta))
  for (const arquivo of arquivos.filter((nome) => nome.endsWith('-600.webp'))) {
    const origem = path.join(PUBLICO, pasta, arquivo)
    for (const largura of [160, 96]) {
      const destino = path.join(PUBLICO, pasta, arquivo.replace('-600.webp', `-${largura}.webp`))
      await sharp(origem).resize({ width: largura }).webp({ quality: 72 }).toFile(destino)
      feitas++
    }
  }
}

console.log(`✓ ${feitas} miniaturas`)
