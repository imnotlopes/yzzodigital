/**
 * OS DOIS PACOTES: O DO ATLETA E O DO EMPRESÁRIO.
 * ==============================================
 *
 * Tudo aqui vem da proposta comercial que a Yzzo escreveu (outubro de 2026)
 * e do áudio que veio com ela: "eu ia precisar falar como funciona o pacote
 * de empresário, e como funciona o pacote de atleta. É só isso."
 *
 * Substitui os planos que eu tinha proposto a partir de pesquisa de mercado
 * (relatório mensal, cobertura de jogo, Reels por semana). Nada disso estava
 * na proposta, e a Yzzo não cobre jogo.
 *
 * O ATLETA TEM PREÇO; O EMPRESÁRIO, NÃO
 * ------------------------------------
 * Os pacotes de atleta têm valor fechado e aparecem com o valor. O da
 * empresa é combinado na parceria (quantos atletas, quais artes, valor por
 * atleta), e por isso termina em conversa.
 *
 * Os valores são por mês: a proposta diz "até 4 artes por mês".
 */

/** As peças que o pacote entrega no mês, por tipo. */
export interface PecasDoMes {
  /** Artes estáticas: Match Day, convocação, comemorativa. */
  artes: number
  /** Artes em vídeo. */
  motion: number
  /**
   * Arte de anúncio de novo clube. Saiu dos pacotes em outubro de 2026, a
   * pedido da Yzzo (o Profissional ficou com 5 artes e o Motion com 4); fica
   * aqui para voltar com um número, se um dia voltar.
   */
  novoClube: number
}

export interface PacoteAtleta {
  nome: string
  /** Em reais, por mês. */
  preco: number
  /** Para quem ele é, numa linha. Leitura minha da proposta: confirmar. */
  publico: string
  itens: readonly string[]
  /**
   * O que chega no mês, peça por peça. Desenha as miniaturas do cartão e dá
   * o custo por peça. Precisa bater com `itens`.
   */
  pecas: PecasDoMes
}

export const pacotesAtleta: PacoteAtleta[] = [
  {
    nome: 'Essencial',
    preco: 100,
    publico: 'Para manter o perfil ativo, com arte nova toda semana.',
    itens: ['Até 4 artes por mês'],
    pecas: { artes: 4, motion: 0, novoClube: 0 },
  },
  {
    nome: 'Profissional',
    preco: 110,
    publico: 'Para quem quer mais presença, com uma arte a mais por mês.',
    itens: ['Até 5 artes por mês'],
    pecas: { artes: 5, motion: 0, novoClube: 0 },
  },
  {
    nome: 'Motion',
    preco: 140,
    publico: 'Para quem quer o perfil em movimento, nos Reels e Stories.',
    itens: ['4 artes em vídeo (Motion)'],
    pecas: { artes: 0, motion: 4, novoClube: 0 },
  },
]

export function totalDePecas(pecas: PecasDoMes) {
  return pecas.artes + pecas.motion + pecas.novoClube
}

/** Quanto sai cada peça no pacote. É só a divisão: não é desconto nem promessa. */
export function custoPorPeca(pacote: PacoteAtleta) {
  return pacote.preco / totalDePecas(pacote.pecas)
}

/**
 * O pacote em destaque: o de menor custo por peça. Calculado, e não marcado à
 * mão, para continuar certo se a Yzzo mudar preço ou quantidade.
 */
export const pacoteVantajoso = pacotesAtleta.reduce((melhor, pacote) =>
  custoPorPeca(pacote) < custoPorPeca(melhor) ? pacote : melhor,
)

/** O DVD não tem preço de tabela: é negociado à parte. */
export const dvd = {
  nome: 'DVD esportivo',
  texto: 'Produção de material atualizado do atleta.',
  preco: 'Valor sob negociação',
} as const

/**
 * As modalidades de contratação da empresa.
 *
 * `semanas` desenha o calendário do cartão: em quais das quatro semanas do
 * mês há entrega. É o jeito mais rápido de mostrar a diferença entre as três.
 */
export const modalidades = [
  { nome: 'Semanal', semanas: [1, 2, 3, 4] },
  { nome: 'Quinzenal', semanas: [2, 4] },
  { nome: 'Mensal', semanas: [4] },
] as const

/** O que a Yzzo e a agência definem juntas depois de fechar a parceria. */
export const definicoesDaParceria = [
  'A quantidade de atletas atendidos',
  'Os serviços e as artes que serão produzidos',
  'O valor por atleta e as condições da parceria',
  'A data de pagamento',
] as const

export const estrelaDoMes = {
  texto:
    'Cada agência pode escolher um atleta para ser a Estrela do Mês, com mais destaque nas publicações e nos conteúdos produzidos.',
  recomendacao:
    'Nossa recomendação: uma publicação por semana para o melhor atleta da semana. Fortalece a presença digital dele, valoriza o desempenho e mantém o perfil ativo.',
} as const

/** O texto da Estrela do Mês, com o nome da agência quando o link traz um. */
export function textoEstrela(agencia: string) {
  return agencia
    ? `A ${agencia} pode escolher um atleta para ser a Estrela do Mês, com mais destaque nas publicações e nos conteúdos produzidos.`
    : estrelaDoMes.texto
}

export function formatarPreco(reais: number, centavos = false) {
  return reais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: centavos ? 2 : 0,
    maximumFractionDigits: centavos ? 2 : 0,
  })
}
