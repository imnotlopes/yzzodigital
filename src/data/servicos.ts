/**
 * O QUE A AGÊNCIA FAZ.
 *
 * ⚠️ TEXTO PROVISÓRIO. Escrito a partir do que aparece no Instagram (as
 * artes, as fotos de jogo, o destaque "Motion's", o destaque "Agências" e a
 * categoria "Image management" do perfil), e não a partir de uma conversa com
 * a agência. Confirmar cada um: o que não for vendido sai da lista.
 *
 * A imagem de cada serviço é trabalho real da agência, e não ilustração: quem
 * lê "artes de convocação" vê uma arte de convocação.
 */

export interface Servico {
  titulo: string
  texto: string
  /** Caminho em public/, na versão de 600px: o cartão é pequeno. */
  imagem: string
  alt: string
}

export const servicos: Servico[] = [
  {
    titulo: 'Design de conquistas',
    texto:
      'Convocação, título, novo clube, agenda de jogos. Cada momento da carreira vira uma arte à altura dele.',
    imagem: '/artes/convocado-selecao-amarelo-600.webp',
    alt: 'Arte "Convocado!" de um atleta da Seleção.',
  },
  {
    titulo: 'Motion e vídeo',
    texto:
      'Reels, apresentações e os melhores lances editados para o atleta ser visto em movimento.',
    imagem: '/fotos/conducao-600.webp',
    alt: 'Atleta conduzindo a bola em velocidade.',
  },
  {
    titulo: 'Fotografia em campo',
    texto: 'Cobertura de jogos, treinos e convocações, com olhar de quem entende de futebol.',
    imagem: '/fotos/foto-do-trofeu-600.webp',
    alt: 'Atleta fotografando um troféu.',
  },
  {
    titulo: 'Gestão de imagem',
    texto:
      'O perfil do atleta cuidado de ponta a ponta: identidade, frequência e o tom certo para clubes e olheiros.',
    imagem: '/fotos/retrato-600.webp',
    alt: 'Retrato de um atleta com a camisa do clube.',
  },
]

/**
 * O atendimento a agências e assessorias, que tem destaque próprio no
 * Instagram. Fica fora da grade porque o público é outro: não é o atleta, é
 * quem cuida de vários.
 */
export const paraAgencias = {
  titulo: 'Para agências e assessorias',
  texto:
    'Também produzimos para quem gerencia atletas: a mesma qualidade, com a identidade da sua empresa.',
}
