/**
 * Importa as imagens baixadas do Instagram da Yzzo para public/.
 *
 *   node scripts/importar-instagram.mjs
 *
 * O dump do Instagram vem com nome de arquivo ilegível
 * (`imgi_12_808699723_..._n.webp`). Este script traduz aquele número para o
 * caminho que o site usa e já redimensiona. Cada imagem sai em duas larguras:
 * a cheia (até 1600px de lado maior) e uma de 600px, que é o que a grade do
 * portfólio pede no celular. O `srcset` dos componentes escolhe entre as duas.
 *
 * A tabela MAPA abaixo é a fonte de verdade dessa tradução. Para trocar uma
 * imagem, mude o número à esquerda e rode de novo: o resto do site continua
 * apontando para o mesmo caminho.
 *
 * A pasta instagram/ NÃO faz parte do repositório (ver .gitignore). Ela é
 * material de trabalho; o que o site publica é o resultado deste script.
 */
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const ORIGEM = path.resolve(import.meta.dirname, '..', 'instagram')
const DESTINO = path.resolve(import.meta.dirname, '..', 'public')

/** Lado maior da versão cheia. Acima disso é peso sem ganho. */
const LADO_MAXIMO = 1600
/** Largura da versão pequena, a de grade e de faixa. */
const LARGURA_PEQUENA = 600

/**
 * número da foto no dump → caminho dentro de public/, sem extensão.
 *
 * Ficaram de fora: os ícones dos destaques (3 a 5), o "Feliz Natal" (43), o
 * "Dia dos pais" (25), o "1000 seguidores" (45), os dois "Projetos
 * desenvolvidos" (23 e 40), que são capa de carrossel e não trabalho, e as
 * fotos de outras contas que vieram junto no download (47 e 48).
 */
const MAPA = {
  // ------------------------------------------------------------ artes
  6: 'artes/convocado-selecao-amarelo',
  7: 'artes/convocado-selecao-azul',
  8: 'artes/campeao-selecao',
  9: 'artes/convocado-festival-sub-15',
  13: 'artes/convocado-liga-sub-15',
  26: 'artes/convocado-tropical',
  27: 'artes/convocada-selecao-feminina',
  28: 'artes/convocado-sub-17',
  37: 'artes/convocado-corinthians',
  42: 'artes/agenda-corinthians-futsal',
  44: 'artes/temporada-2025',

  // ------------------------------------------------ "Novo Cliente!"
  19: 'clientes/novo-cliente-01',
  20: 'clientes/novo-cliente-02',
  21: 'clientes/novo-cliente-03',
  22: 'clientes/novo-cliente-04',
  29: 'clientes/novo-cliente-05',
  35: 'clientes/novo-cliente-06',
  36: 'clientes/novo-cliente-07',

  // ------------------------------------------------------- fotografia
  12: 'fotos/camisa-20',
  10: 'fotos/trofeu-no-gramado',
  11: 'fotos/foto-do-trofeu',
  14: 'fotos/conducao',
  15: 'fotos/barreira',
  16: 'fotos/flamula',
  17: 'fotos/chute',
  18: 'fotos/disputa',
  30: 'fotos/escanteio',
  31: 'fotos/trofeu-colegio',
  32: 'fotos/entre-predios',
  33: 'fotos/retrato',
  34: 'fotos/jogada',
  38: 'fotos/ajoelhado',
  39: 'fotos/bandeirinha',
  41: 'fotos/entrevista',

  // ------------------------------------------------------------ marca
  24: 'marca/sua-imagem-tambem-deveria',
  46: 'marca/grandes-conquistas',
}

/** A foto de perfil vira favicon e ícone de tela inicial até a logo chegar. */
const PERFIL = 2

async function main() {
  const arquivos = await readdir(ORIGEM)

  /** `imgi_12_...` → 12 */
  const porNumero = new Map()
  for (const arquivo of arquivos) {
    const achado = /^imgi_(\d+)_/.exec(arquivo)
    if (achado) porNumero.set(Number(achado[1]), arquivo)
  }

  let feitos = 0
  for (const [numero, destino] of Object.entries(MAPA)) {
    const arquivo = porNumero.get(Number(numero))
    if (!arquivo) {
      console.log(`· ${numero} não está em instagram/, pulando`)
      continue
    }

    const origem = path.join(ORIGEM, arquivo)
    const cheia = path.join(DESTINO, `${destino}.webp`)
    const pequena = path.join(DESTINO, `${destino}-600.webp`)
    await mkdir(path.dirname(cheia), { recursive: true })

    await sharp(origem)
      .rotate()
      .resize(LADO_MAXIMO, LADO_MAXIMO, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(cheia)

    await sharp(origem)
      .rotate()
      .resize({ width: LARGURA_PEQUENA, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(pequena)

    feitos++
  }

  const perfil = porNumero.get(PERFIL)
  if (perfil) {
    const origem = path.join(ORIGEM, perfil)
    await sharp(origem).resize(64, 64).png().toFile(path.join(DESTINO, 'favicon.png'))
    await sharp(origem).resize(180, 180).png().toFile(path.join(DESTINO, 'apple-touch-icon.png'))
  }

  console.log(`✓ ${feitos} imagens em public/`)
}

main().catch((erro) => {
  console.error(erro)
  process.exit(1)
})
