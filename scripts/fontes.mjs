/**
 * Copia as fontes da marca para `public/fontes/`.
 *
 *   node scripts/fontes.mjs
 *
 * As fontes eram do Google Fonts. Servidas daqui, a página deixa de abrir
 * duas conexões a outros servidores (a da folha de estilo e a dos arquivos)
 * antes de desenhar o texto, e no 4G cada conexão nova custa uns meio segundo.
 * O nome do arquivo é fixo, para o `preload` do index.html achar.
 *
 * Só o alfabeto latino (o português cabe nele) e só os pesos que o site usa:
 * Sofia 700 nos títulos e 900 itálico no "grito" (faixa e fecho), Poppins de
 * 400 a 700 no texto. As @font-face estão no começo de src/index.css.
 *
 * Os arquivos vêm dos pacotes @fontsource (as mesmas fontes do Google, com
 * licença livre, a OFL).
 */
import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const RAIZ = path.resolve(import.meta.dirname, '..')
const DESTINO = path.join(RAIZ, 'public', 'fontes')

const FONTES = {
  'sofia-700.woff2': 'sofia-sans-extra-condensed/files/sofia-sans-extra-condensed-latin-700-normal.woff2',
  'sofia-900-italico.woff2': 'sofia-sans-extra-condensed/files/sofia-sans-extra-condensed-latin-900-italic.woff2',
  'poppins-400.woff2': 'poppins/files/poppins-latin-400-normal.woff2',
  'poppins-500.woff2': 'poppins/files/poppins-latin-500-normal.woff2',
  'poppins-600.woff2': 'poppins/files/poppins-latin-600-normal.woff2',
  'poppins-700.woff2': 'poppins/files/poppins-latin-700-normal.woff2',
}

await mkdir(DESTINO, { recursive: true })
for (const [nome, origem] of Object.entries(FONTES)) {
  await copyFile(path.join(RAIZ, 'node_modules', '@fontsource', origem), path.join(DESTINO, nome))
}
console.log(`✓ ${Object.keys(FONTES).length} fontes em public/fontes/`)
