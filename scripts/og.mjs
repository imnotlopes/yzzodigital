/**
 * Gera a imagem do cartão de link: public/og-yzzo.jpg.
 *
 *   node scripts/og.mjs
 *
 * Quando alguém cola o link do site no WhatsApp ou no Instagram, o robô monta
 * um cartão com esta imagem. É a primeira impressão, antes de qualquer
 * clique, e por isso ela repete a capa do site: a barra do #TimeYzzoDigital,
 * a frase com o "imagem" no marca-texto e a camisa 20.
 *
 * JPEG e 1200x630: é o formato que todo robô de preview entende. WebP falha
 * em parte deles, e proporção diferente vira corte imprevisível.
 *
 * ⚠️ PROVISÓRIA, como a logo. As letras são Impact e Arial, que existem em
 * qualquer Windows, e não as fontes do site, que não estão instaladas na
 * máquina. Refazer quando o branding chegar.
 */
import path from 'node:path'

import sharp from 'sharp'

const RAIZ = path.resolve(import.meta.dirname, '..')
const PUBLICO = path.join(RAIZ, 'public')

const LARGURA = 1200
const ALTURA = 630

const AMARELO = '#F0C40F'
const PRETO = '#111111'
const PAPEL = '#F3F3F3'

/** Margem esquerda do texto. */
const X = 72

/**
 * Um pedaço de texto já rasterizado, com a largura medida.
 *
 * A medida é o motivo de usar o texto do sharp, e não SVG: o marca-texto
 * precisa saber onde a palavra "imagem" começa e termina, e SVG não mede.
 */
async function texto(conteudo, fonte, cor = PRETO) {
  const { data, info } = await sharp({
    text: {
      text: `<span foreground="${cor}">${conteudo}</span>`,
      font: fonte,
      rgba: true,
      dpi: 72,
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true })
  return { input: data, largura: info.width, altura: info.height }
}

function retangulo(largura, altura, cor, raio = 0) {
  return Buffer.from(
    `<svg width="${largura}" height="${altura}"><rect width="${largura}" height="${altura}" rx="${raio}" fill="${cor}"/></svg>`,
  )
}

function poligono(largura, altura, pontos, cor = AMARELO) {
  return Buffer.from(
    `<svg width="${largura}" height="${altura}"><polygon points="${pontos}" fill="${cor}"/></svg>`,
  )
}

async function main() {
  const camadas = []

  /* A foto, à direita, cortada pelo alto: o nome e o número ficam na parte de cima. */
  const foto = await sharp(path.join(PUBLICO, 'fotos/camisa-20.webp'))
    .resize(470, ALTURA, { fit: 'cover', position: 'top' })
    .toBuffer()
  camadas.push({ input: foto, left: LARGURA - 470, top: 0 })

  /* Os cacos amarelos, como nos cantos dos posts. */
  camadas.push({ input: poligono(420, 120, '0,120 420,30 420,120'), left: 0, top: ALTURA - 120 })
  camadas.push({ input: poligono(140, 140, '0,0 140,0 140,140'), left: LARGURA - 140, top: 0 })

  /* A barra do #TimeYzzoDigital. */
  const barraY = 64
  camadas.push({ input: retangulo(430, 44, AMARELO, 22), left: X, top: barraY })
  const hashtag = await texto('#Time<b>YzzoDigital</b>', 'Arial 19')
  camadas.push({ input: hashtag.input, left: X + 22, top: barraY + Math.round((44 - hashtag.altura) / 2) })
  const ano = await texto(`${new Date().getFullYear()} ©`, 'Arial 19')
  camadas.push({ input: ano.input, left: X + 430 - 22 - ano.largura, top: barraY + Math.round((44 - ano.altura) / 2) })
  const fioX = X + 22 + hashtag.largura + 16
  camadas.push({
    input: retangulo(X + 430 - 22 - ano.largura - 16 - fioX, 1, PRETO),
    left: fioX,
    top: barraY + 22,
  })

  /* "Seu desempenho fala por você." */
  const apoio = await texto('Seu <b>desempenho</b> fala por você.', 'Arial 34')
  camadas.push({ input: apoio.input, left: X, top: 160 })

  /* "Sua imagem / também deveria.", com o marca-texto em "imagem". */
  const linha1Y = 222
  const sua = await texto('Sua', 'Impact 92')
  const imagem = await texto('imagem', 'Impact 92')
  camadas.push({ input: sua.input, left: X, top: linha1Y })
  camadas.push({
    input: retangulo(imagem.largura + 16, Math.round(imagem.altura * 0.86), AMARELO, 6),
    left: X + sua.largura + 18 - 8,
    top: linha1Y + Math.round(imagem.altura * 0.1),
  })
  camadas.push({ input: imagem.input, left: X + sua.largura + 18, top: linha1Y })

  const linha2 = await texto('também deveria.', 'Impact 92')
  camadas.push({ input: linha2.input, left: X, top: linha1Y + Math.round(sua.altura * 0.92) })

  /* A assinatura, no pé. */
  const assinatura = await texto(
    '<b>YZZO DIGITAL</b>  ·  Agência de marketing esportivo',
    'Arial 20',
  )
  camadas.push({ input: assinatura.input, left: X, top: ALTURA - 150 })

  await sharp({
    create: { width: LARGURA, height: ALTURA, channels: 3, background: PAPEL },
  })
    .composite(camadas)
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(PUBLICO, 'og-yzzo.jpg'))

  console.log('✓ public/og-yzzo.jpg')
}

main().catch((erro) => {
  console.error(erro)
  process.exit(1)
})
