/**
 * O QUE A YZZO FAZ.
 *
 * Os seis serviços da proposta comercial que a própria Yzzo escreveu
 * (outubro de 2026), na ordem dela. Antes daqui havia "gestão de imagem" e
 * "fotografia em campo", que eram leitura minha do Instagram e saíram: a
 * Yzzo não cobre jogo. Quando o atleta se destaca, ela pega as fotos do jogo,
 * edita e publica, e isso faz parte das artes.
 *
 * O foco é só arte. Carreira e transferência são do empresário.
 *
 * A imagem de cada serviço é trabalho real da agência.
 */

/** O "sobre" da proposta, numa frase só. */
export const sobre =
  'A Yzzo Digital é uma agência especializada na criação de artes e conteúdos visuais voltados ao futebol, atendendo atletas, assessorias esportivas e empresas do ramo.'

export interface Servico {
  titulo: string
  texto: string
  /** Caminho em public/, na versão de 600px: o cartão é pequeno. */
  imagem: string
  alt: string
}

export const servicos: Servico[] = [
  {
    titulo: 'Match Days',
    texto: 'A arte do dia de jogo: adversário, data, horário e o atleta em destaque.',
    imagem: '/matchday/gremio-x-sao-paulo-600.webp',
    alt: 'Match Day de Grêmio x São Paulo, em azul.',
  },
  {
    titulo: 'Motion Design',
    texto: 'As artes em vídeo, com movimento, para Reels e Stories.',
    imagem: '/videos/brasil-x-paraguai.webp',
    alt: 'Quadro do Match Day em Motion de Brasil x Paraguai.',
  },
  {
    titulo: 'Convocação',
    texto: 'O anúncio da convocação, no tamanho do momento.',
    imagem: '/artes/convocado-selecao-amarelo-600.webp',
    alt: 'Arte "Convocado!" de um atleta da Seleção.',
  },
  {
    titulo: 'Novo clube',
    texto: 'A apresentação do atleta no clube novo.',
    imagem: '/artes/temporada-2025-600.webp',
    alt: 'Arte de temporada de um atleta do Internacional, em vermelho.',
  },
  {
    titulo: 'Comemorativas',
    texto: 'Título, gol marcante, aniversário. Cada conquista com a sua arte.',
    imagem: '/artes/campeao-selecao-600.webp',
    alt: 'Arte "Campeão" com dois atletas da Seleção comemorando.',
  },
  {
    titulo: 'DVD esportivo',
    texto: 'O material atualizado do atleta, para mostrar a clubes e empresários.',
    imagem: '/fotos/chute-600.webp',
    alt: 'Atleta de branco batendo na bola num estádio.',
  },
]
