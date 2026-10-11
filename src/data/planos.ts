/**
 * OS PLANOS, OS AVULSOS E O PACOTE PARA AGÊNCIAS.
 * ==============================================
 *
 * ⚠️ PROPOSTA, NÃO TABELA DA YZZO. Tudo aqui saiu da pesquisa de mercado de
 * outubro de 2026 (ver ETAPAS.md), e cada número é um ponto de partida para
 * a agência corrigir. Nenhum foi confirmado. Ajustar as quantidades é mexer
 * só neste arquivo: a página inteira se monta a partir dele.
 *
 * A COBRANÇA É SEMPRE MENSAL; O QUE MUDA É O RITMO
 * -----------------------------------------------
 * "Semanal", "quinzenal" e "mensal" são a frequência das entregas, não do
 * boleto. É o modelo que o mercado recomenda: mensalidade com escopo
 * fechado (quantas peças, quais redes, relatório), e não cobrança por post,
 * que gera discussão sobre o que estava incluído.
 *
 * SEM PREÇO NO SITE
 * -----------------
 * Nenhuma agência de imagem de atleta pesquisada publica preço, e a Yzzo
 * ainda não definiu os dela. Cada plano termina num botão que abre o
 * WhatsApp já com o nome do plano escrito: o preço é dito na conversa.
 */

export interface Plano {
  nome: string
  /** Para quem ele é, numa linha. */
  publico: string
  /** O que vem no plano. Uma linha por item, curta. */
  itens: readonly string[]
  /**
   * Em quais das quatro semanas do mês há entrega. Desenha o calendário do
   * cartão, que é o jeito mais rápido de explicar "semanal" e "quinzenal"
   * sem um parágrafo: a pessoa vê quatro marcas, duas ou uma.
   */
  semanas: readonly number[]
  /** O plano em destaque ganha o fundo amarelo. Só um. */
  destaque?: boolean
}

export const planos: Plano[] = [
  {
    nome: 'Semanal',
    publico: 'Para o atleta em alta: Seleção, vitrine, janela de transferência.',
    semanas: [1, 2, 3, 4],
    itens: [
      'Entregas toda semana',
      'Até 12 artes no mês',
      '1 Reels por semana',
      'Cobertura de 1 jogo no mês',
      'Prioridade em convocação e transferência',
      'Relatório mensal',
    ],
    destaque: true,
  },
  {
    nome: 'Quinzenal',
    publico: 'Para o atleta em crescimento, que precisa de presença constante.',
    semanas: [2, 4],
    itens: [
      'Entregas a cada 15 dias',
      'Até 6 artes no mês',
      '2 Reels no mês',
      'Cobertura de jogo sob agenda',
      'Relatório mensal',
    ],
  },
  {
    nome: 'Mensal',
    publico: 'Para manter o perfil vivo e profissional o ano inteiro.',
    semanas: [4],
    itens: [
      'Um pacote por mês',
      'Até 3 artes no mês',
      '1 Reels no mês',
      'Relatório mensal',
    ],
  },
]

/**
 * O que se contrata sem plano.
 *
 * O vídeo de melhores momentos vem primeiro porque é o que o empresário mais
 * pede: o mercado chama de "currículo em vídeo", e é ele que vai para o
 * clube e para o olheiro.
 */
export const avulsos = [
  {
    titulo: 'Vídeo de melhores momentos',
    texto: 'O currículo em vídeo do atleta: ficha técnica e os lances da função dele, na horizontal para clubes e na vertical para as redes.',
  },
  {
    titulo: 'Arte de momento',
    texto: 'Convocação, novo clube, título, agenda de jogos. Uma peça, na hora que o momento acontece.',
  },
  {
    titulo: 'Cobertura de jogo',
    texto: 'Fotografia em campo, com as melhores imagens tratadas e entregues para as redes.',
  },
  {
    titulo: 'Identidade do atleta',
    texto: 'O visual próprio do atleta, que vira a base de todas as artes dele.',
  },
  {
    titulo: 'Mídia kit',
    texto: 'A apresentação do atleta para patrocinadores e marcas.',
  },
] as const

/**
 * O que muda quando quem contrata é uma agência ou um empresário.
 *
 * As artes com duas assinaturas não são promessa: o Instagram da Yzzo já tem
 * peça assinada junto com outra marca (a "2025", com a Sabu Sports).
 */
export const vantagensAgencia = [
  {
    titulo: 'Pacote por atleta',
    texto: 'Um plano para a carteira inteira, com o valor ajustado ao número de atletas.',
  },
  {
    titulo: 'Com a sua marca',
    texto: 'As artes saem assinadas pela sua agência junto com a Yzzo, ou só com a sua.',
  },
  {
    titulo: 'Prazo de urgência',
    texto: 'Convocação e janela de transferência não esperam. Parceiro tem fila própria.',
  },
  {
    titulo: 'Um ponto de contato',
    texto: 'Uma pessoa da Yzzo cuida de todos os seus atletas, num grupo só.',
  },
] as const
