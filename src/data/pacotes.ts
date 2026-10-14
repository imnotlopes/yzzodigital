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

export interface PacoteAtleta {
  nome: string
  /** Em reais, por mês. */
  preco: number
  itens: readonly string[]
  /** O cartão do meio, em amarelo. Só um. */
  destaque?: boolean
}

export const pacotesAtleta: PacoteAtleta[] = [
  {
    nome: 'Essencial',
    preco: 90,
    itens: ['Até 4 artes por mês'],
  },
  {
    nome: 'Profissional',
    preco: 115,
    itens: ['Até 5 artes por mês', '1 arte de anúncio de novo clube'],
    destaque: true,
  },
  {
    nome: 'Motion',
    preco: 140,
    itens: ['4 artes em vídeo (Motion)', '1 arte de anúncio de novo clube'],
  },
]

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

export function formatarPreco(reais: number) {
  return reais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}
