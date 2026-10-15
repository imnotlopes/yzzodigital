/**
 * O PORTFÓLIO.
 * ============
 *
 * Tudo veio do Instagram da agência, convertido por
 * scripts/importar-instagram.mjs. Cada imagem existe em até três larguras (a
 * de 600px, a de 1080 e a cheia), em WebP e em AVIF (scripts/versoes.mjs), e
 * é o `<picture>` de components/Foto.tsx que escolhe.
 *
 * DUAS LISTAS, PORQUE SÃO DOIS TRABALHOS DIFERENTES
 * -------------------------------------------------
 *   artes     o design: convocação, título, agenda. É o que a agência mais
 *             publica e o que mais se reconhece de longe.
 *   clientes  os posts "Novo Cliente!". Não são portfólio, são prova: cada um
 *             é um atleta que fechou com a agência. Vão para a faixa do
 *             #TimeYzzoDigital, e não para a grade.
 *
 * ⚠️ AUTORIZAÇÃO: boa parte dos atletas é menor de idade. Já são públicas no
 * Instagram da agência, mas o site é outro uso: confirmar que o contrato com
 * os responsáveis cobre o site também.
 */

export interface Imagem {
  /** Versão cheia, até 1600px. */
  src: string
  /** Versão de 600px de largura, para grade e faixa. */
  pequena: string
  /** Versão de 160px, para miniatura (scripts/miniaturas.mjs). Só artes e Match Days têm. */
  mini: string
  /** O que se vê, para quem não vê. */
  alt: string
  largura: number
  altura: number
}

/** `artes/campeao-selecao` → as duas versões. Dimensões da versão cheia. */
function imagem(caminho: string, alt: string, largura = 1280, altura = 1600): Imagem {
  return {
    src: `/${caminho}.webp`,
    pequena: `/${caminho}-600.webp`,
    mini: `/${caminho}-160.webp`,
    alt,
    largura,
    altura,
  }
}

/** A largura do meio. Só existe nas imagens mais largas que ela. */
const LARGURA_MEDIA = 1080

/**
 * `srcset` pronto: 600, 1080 (quando houver) e a cheia, no formato pedido.
 * Ver o porquê das larguras em scripts/versoes.mjs.
 */
export function srcsetDe(imagem: Imagem, formato: 'webp' | 'avif' = 'webp') {
  const base = imagem.src.replace(/\.webp$/, '')
  const versoes = [`${base}-600.${formato} 600w`]
  if (imagem.largura > LARGURA_MEDIA) versoes.push(`${base}-${LARGURA_MEDIA}.${formato} ${LARGURA_MEDIA}w`)
  versoes.push(`${base}.${formato} ${imagem.largura}w`)
  return versoes.join(', ')
}

/**
 * As artes, na ordem em que deslizam.
 *
 * A ordem alterna cor de fundo de propósito: amarelo, azul, amarelo, preto.
 * Duas artes amarelas lado a lado viram uma mancha só e a pessoa para de
 * distinguir uma da outra.
 */
export const artes: Imagem[] = [
  imagem('artes/convocado-selecao-amarelo', 'Arte "Convocado!" de um atleta da Seleção Brasileira, em fundo amarelo e verde com estrelas.', 1281),
  imagem('artes/convocado-selecao-azul', 'Arte "Convocado!" de um atleta com a camisa azul da Seleção, em fundo azul-claro.'),
  imagem('artes/campeao-selecao', 'Arte "Campeão" com dois atletas da Seleção comemorando, em amarelo e verde.'),
  imagem('artes/convocado-corinthians', 'Arte "Convocado" de um atleta do Corinthians, em preto e branco.'),
  imagem('artes/convocado-festival-sub-15', 'Arte "Convocado!" de um atleta com medalha, para um festival internacional Sub-15.', 1200),
  imagem('artes/convocado-sub-17', 'Arte "Convocado" de um atleta com o agasalho azul da Seleção Sub-17.', 1200),
  imagem('artes/convocado-liga-sub-15', 'Arte "Convocado!" da Seleção Brasileira Sub-15, em amarelo com folhas tropicais.', 1200),
  imagem('artes/temporada-2025', 'Arte da temporada 2025 de um atleta do Internacional, em vermelho.', 1281),
  imagem('artes/convocada-selecao-feminina', 'Arte "Convocada" de atletas da Seleção Feminina, com araras e estrelas.', 1281),
  imagem('artes/agenda-corinthians-futsal', 'Arte de agenda de jogos de um atleta do futsal e do campo do Corinthians.', 1281),
  imagem('artes/convocado-tropical', 'Arte "Convocado!" de um atleta com a camisa amarela, em fundo tropical.'),
]

/**
 * Os Match Days: a arte do dia de jogo, com adversário, data e horário.
 *
 * Vieram na mídia de outubro de 2026, em formato de Stories (9:16), e por
 * isso moram num bloco próprio do portfólio: no deslize das artes, que é
 * 4:5, o corte comeria a data e o horário, que são o assunto da arte.
 */
export const matchDays: Imagem[] = [
  imagem('matchday/brasil-x-peru', 'Match Day de Brasil x Peru: o atleta com a camisa 20 da Seleção, em amarelo e verde.', 900, 1600),
  imagem('matchday/estrela-x-vila-nova', 'Match Day do FC Estrela contra o Vila Nova, pela Copa Goiás, em azul-marinho.', 900, 1600),
  imagem('matchday/brasil-x-venezuela', 'Match Day de Brasil x Venezuela, em azul com raios.', 900, 1600),
  imagem('matchday/pinda-x-corinthians', 'Match Day de Pinda x Corinthians, em preto e branco, com uma águia.', 900, 1600),
  imagem('matchday/brasil-x-equador', 'Match Day de Brasil x Equador: dois atletas da Seleção em amarelo.', 900, 1600),
  imagem('matchday/gremio-x-sao-paulo', 'Match Day de Grêmio x São Paulo, em azul.', 900, 1600),
  imagem('matchday/paulista-sub-15-corinthians', 'Match Day do Corinthians pelo Paulista Sub-15, em preto e vermelho, com uma águia.', 900, 1600),
]

/**
 * A foto da capa: a camisa 20 de costas.
 *
 * A Yzzo não fotografa jogo. Esta é uma foto de jogo editada por ela, que é
 * o que ela faz quando um atleta se destaca. O mural de fotos que existia
 * aqui saiu em outubro de 2026, a pedido dela: o foco é só arte.
 */
export const fotoCapa = imagem(
  'fotos/camisa-20',
  'Atleta de costas, vestindo a camisa amarela número 20 com o nome Gabriel.',
)

/** Os posts "Novo Cliente!", para a faixa do #TimeYzzoDigital. */
export const novosClientes: Imagem[] = [
  imagem('clientes/novo-cliente-01', 'Post "Novo Cliente!" de um atleta de Curitiba.'),
  imagem('clientes/novo-cliente-02', 'Post "Novo Cliente!" de um atleta com a camisa amarela da Seleção.'),
  imagem('clientes/novo-cliente-03', 'Post "Novo Cliente!" de um atleta com a camisa branca do clube.'),
  imagem('clientes/novo-cliente-04', 'Post "Novo Cliente!" de um atleta com a camisa branca e vermelha.'),
  imagem('clientes/novo-cliente-05', 'Post "Novo Cliente!" de um atleta de agasalho preto.'),
  imagem('clientes/novo-cliente-06', 'Post "Novo Cliente!" de um atleta com a camisa azul-clara.'),
  imagem('clientes/novo-cliente-07', 'Post "Novo Cliente!" de um atleta com a camisa tricolor do Grêmio.'),
]


