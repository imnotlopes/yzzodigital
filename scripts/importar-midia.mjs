/**
 * Importa a mídia que a Yzzo mandou (banco-de-midia/) para public/.
 *
 *   node scripts/importar-midia.mjs
 *
 * Três trabalhos:
 *
 *   1. A LOGO. O arquivo oficial é um PNG quadrado de fundo branco. Daqui saem
 *      duas versões recortadas e de fundo transparente: a escura (letras
 *      pretas, para fundo claro) e a clara (letras brancas, para fundo preto).
 *      A seta amarela é igual nas duas.
 *   2. O ÍCONE DA ABA, a partir da logo sobre o fundo da marca, que é o que o
 *      Instagram usa de foto de perfil.
 *   3. AS ARTES DE MATCH DAY, em duas larguras, como as do Instagram (ver
 *      scripts/importar-instagram.mjs).
 *
 * A pasta banco-de-midia/ NÃO faz parte do repositório: são 200 MB de PNG e
 * vídeo como saíram da edição. O que o site publica é o resultado deste
 * script. Os vídeos têm script próprio, scripts/videos.mjs.
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const ORIGEM = path.resolve(import.meta.dirname, '..', 'banco-de-midia')
const DESTINO = path.resolve(import.meta.dirname, '..', 'public')

const LOGO = '57203B6A-9B53-4832-8455-4DBDD18D547F.PNG'
const LOGO_SOBRE_FUNDO = 'IMG_9203.PNG'

/** Largura da logo recortada. O topo mostra uns 120px; isto cobre tela retina com folga. */
const LARGURA_LOGO = 720

/**
 * O canal azul da seta sólida, medido no arquivo: mediana 75, 95% abaixo de
 * 85. Com 85, todo pixel do miolo da seta sai 100% opaco.
 */
const AZUL_DA_SETA = 85

/**
 * As artes de Match Day: arquivo em banco-de-midia/ → caminho em public/.
 *
 * Ficaram de fora: a convocação do festival Sub-15 (já está no site, veio
 * do Instagram), os posts de texto (as frases vão para os títulos, não para
 * a grade) e as versões da logo sobre fundo.
 */
const MATCH_DAYS = {
  'BRASIL-VC-PERU-[-YZZO-].png': 'matchday/brasil-x-peru',
  'Brasil--Equador-Sexta-feira,-10-de-setembro-s-0840Paraguai.png': 'matchday/brasil-x-equador',
  'Brasil--Venezuela-Segunda-feira,-12-de-setembro-s-0840Paraguai.png': 'matchday/brasil-x-venezuela',
  'Fc-estrela-x-vila-nova-[-YZZO-].png': 'matchday/estrela-x-vila-nova',
  'Grmio-x-so-paulo-[-YZZO-].png': 'matchday/gremio-x-sao-paulo',
  'PAULISTA-SUB-15,-SEGUNDA-FASECORINTHIANS--PINDA.png': 'matchday/paulista-sub-15-corinthians',
  'PINDA--CORINTHIANS-SBADO---0900-[-yzzo-].png': 'matchday/pinda-x-corinthians',
}

/**
 * TIRA O FUNDO BRANCO SEM SERRILHAR A BORDA.
 *
 * Recortar "o que é branco" deixaria um halo claro em volta das letras, onde
 * o antisserrilhado mistura preto e branco. Aqui o branco vira transparência
 * na medida exata: a opacidade de cada pixel é o quanto ele se afasta do
 * branco, e a cor é recalculada sem o branco que estava misturado nela.
 * Um cinza 50% vira preto com 50% de opacidade, e não cinza opaco.
 *
 * Na versão clara, o que é preto (pouca cor) vira branco, com a mesma
 * opacidade. A seta, que tem cor, fica como está.
 */
async function recortarLogo() {
  const { data, info } = await sharp(path.join(ORIGEM, LOGO))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const escura = Buffer.alloc(info.width * info.height * 4)
  const clara = Buffer.alloc(info.width * info.height * 4)

  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    /*
      A SETA PRECISA DE CONTA PRÓPRIA.

      Para o preto, "o quanto se afasta do branco" é o menor canal. A seta é
      amarela, e o menor canal dela (o azul) nunca chega a zero: fica perto de
      75. Pela conta das letras ela sairia 70% opaca e escureceria sobre o
      preto. Para pixel de seta (vermelho bem acima do azul), a opacidade é
      medida contra o azul da seta sólida, e não contra zero.
    */
    const seta = r - b > 25 && r >= g
    const alfa = seta
      ? Math.min(1, (255 - b) / (255 - AZUL_DA_SETA))
      : 1 - Math.min(r, g, b) / 255

    if (alfa < 0.02) continue

    const semBranco = (c) => Math.max(0, Math.min(255, Math.round((c - 255 * (1 - alfa)) / alfa)))
    const rr = semBranco(r)
    const gg = semBranco(g)
    const bb = semBranco(b)
    const a = Math.round(alfa * 255)

    escura[j] = rr
    escura[j + 1] = gg
    escura[j + 2] = bb
    escura[j + 3] = a

    /* Letra é o que não tem cor: diferença pequena entre os canais. */
    const letra = Math.max(rr, gg, bb) - Math.min(rr, gg, bb) < 70
    clara[j] = letra ? 255 : rr
    clara[j + 1] = letra ? 255 : gg
    clara[j + 2] = letra ? 255 : bb
    clara[j + 3] = a
  }

  await mkdir(path.join(DESTINO, 'marca'), { recursive: true })

  for (const [nome, pixels] of [
    ['logo', escura],
    ['logo-claro', clara],
  ]) {
    const recortada = await sharp(pixels, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim({ threshold: 1 })
      .png()
      .toBuffer()

    const final = sharp(recortada).resize({ width: LARGURA_LOGO })
    await final.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(DESTINO, 'marca', `${nome}.webp`))
    /* PNG também: é o que o script dos cartões de link compõe. */
    await final.clone().png().toFile(path.join(DESTINO, 'marca', `${nome}.png`))

    const { width, height } = await sharp(path.join(DESTINO, 'marca', `${nome}.webp`)).metadata()
    console.log(`✓ marca/${nome}  ${width}x${height}`)
  }
}

async function icones() {
  const origem = path.join(ORIGEM, LOGO_SOBRE_FUNDO)
  await sharp(origem).resize(64, 64).png().toFile(path.join(DESTINO, 'favicon.png'))
  await sharp(origem).resize(180, 180).png().toFile(path.join(DESTINO, 'apple-touch-icon.png'))
  console.log('✓ favicon.png e apple-touch-icon.png')
}

async function matchDays() {
  for (const [arquivo, destino] of Object.entries(MATCH_DAYS)) {
    const origem = path.join(ORIGEM, arquivo)
    const cheia = path.join(DESTINO, `${destino}.webp`)
    await mkdir(path.dirname(cheia), { recursive: true })

    await sharp(origem)
      .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(cheia)
    await sharp(origem)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(path.join(DESTINO, `${destino}-600.webp`))

    const { width, height } = await sharp(cheia).metadata()
    console.log(`✓ ${destino}  ${width}x${height}`)
  }
}

async function main() {
  await recortarLogo()
  await icones()
  await matchDays()
}

main().catch((erro) => {
  console.error(erro)
  process.exit(1)
})
