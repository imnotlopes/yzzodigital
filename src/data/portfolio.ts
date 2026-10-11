/**
 * O PORTFÓLIO.
 * ============
 *
 * Tudo veio do Instagram da agência, convertido por
 * scripts/importar-instagram.mjs. Cada imagem existe em duas larguras: a cheia
 * e a de 600px (`-600.webp`), e é o `srcset` que escolhe.
 *
 * TRÊS LISTAS, PORQUE SÃO TRÊS TRABALHOS DIFERENTES
 * -------------------------------------------------
 *   artes     o design: convocação, título, agenda. É o que a agência mais
 *             publica e o que mais se reconhece de longe.
 *   fotos     a cobertura em campo: jogo, treino, retrato.
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
  /**
   * No mural, ocupa duas linhas. Só para foto em pé de corpo inteiro: numa
   * foto deitada, o recorte alto mostraria só céu ou gramado.
   */
  alta?: boolean
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
    alt,
    largura,
    altura,
  }
}

/** `srcset` pronto para as duas versões. */
export function srcsetDe(imagem: Imagem) {
  return `${imagem.pequena} 600w, ${imagem.src} ${imagem.largura}w`
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
 * A fotografia, na ordem do mural.
 *
 * A camisa 20 de costas é a capa, e por isso não se repete aqui.
 *
 * 14 fotos, duas delas altas: 16 casas, que fecham 4 linhas de 4 no
 * computador e 8 de 2 no celular, sem buraco no fim. Mexeu na quantidade,
 * refaça a conta. A da bandeirinha saiu porque traz o "Seja Bem-Vindo"
 * escrito por cima, que o recorte do mural cortava no meio.
 */
export const fotoCapa = imagem(
  'fotos/camisa-20',
  'Atleta de costas, vestindo a camisa amarela número 20 com o nome Gabriel.',
)

export const fotos: Imagem[] = [
  { ...imagem('fotos/flamula', 'Atleta de agasalho azul segurando a flâmula da CBF antes do jogo.'), alta: true },
  imagem('fotos/barreira', 'Dois atletas da Seleção, camisas 8 e 20, lado a lado no campo.', 1304),
  imagem('fotos/conducao', 'Atleta de amarelo conduzindo a bola em velocidade.'),
  imagem('fotos/foto-do-trofeu', 'Atleta com a camisa 20 fotografando um troféu com o celular.'),
  imagem('fotos/trofeu-no-gramado', 'Atleta deitado no gramado ao lado de um troféu, em luz de fim de tarde.', 1120, 1408),
  imagem('fotos/chute', 'Atleta de branco batendo na bola num estádio.', 935, 1223),
  { ...imagem('fotos/entrevista', 'Atleta da Seleção segurando a bola durante uma entrevista.', 1200), alta: true },
  imagem('fotos/escanteio', 'Atleta de vermelho cobrando escanteio.', 1200),
  imagem('fotos/ajoelhado', 'Goleiro de joelhos no gramado.', 1204),
  imagem('fotos/retrato', 'Retrato de um atleta com a camisa branca do clube.', 1290),
  imagem('fotos/disputa', 'Dois atletas disputando a bola perto do gol.', 960, 1280),
  imagem('fotos/trofeu-colegio', 'Atleta com a camisa 11 segurando um troféu no campo.', 1200),
  imagem('fotos/entre-predios', 'Atleta caminhando no campo com prédios ao fundo.', 1200),
  imagem('fotos/jogada', 'Lance de jogo com três atletas disputando a bola.', 1282),
]

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

/** Peças da própria marca, usadas como apoio nas seções. */
export const pecaSuaImagem = imagem(
  'marca/sua-imagem-tambem-deveria',
  'Post da Yzzo: "Seu desempenho fala por você. Sua imagem também deveria."',
)
