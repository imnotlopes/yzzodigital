/**
 * Constantes da marca, fonte única de verdade.
 *
 * Tudo que é identidade ou contato mora aqui; nenhum componente deve escrever
 * número, @ ou e-mail à mão. Número digitado em dois lugares acaba diferente
 * nos dois, e o botão errado é justamente o que ninguém testa.
 */
export const brand = {
  nome: 'Yzzo Digital',

  /** A linha de cima da bio do Instagram. */
  descricao: 'Agência de marketing esportivo',

  /** O complemento da bio: "+700 Projetos | Criatividade & Qualidade". */
  assinatura: 'Criatividade & Qualidade',

  /** O fecho da proposta comercial que a Yzzo escreveu. */
  slogan: 'Profissionalismo, qualidade e valorização da imagem do atleta.',

  /** A hashtag dos posts, usada como rótulo de seção. */
  hashtag: '#TimeYzzoDigital',

  instagram: '@yzzodigital',

  /** Formato internacional, apenas dígitos: 55 + DDD + número. */
  whatsapp: '5511960394405',
  /** O mesmo número, formatado para leitura. */
  whatsappExibicao: '(11) 96039-4405',

  email: 'yzzodigital@gmail.com',

  /** O link da bio. */
  linktree: 'https://linktr.ee/yzzodigital',
} as const

/** Sufixo de todos os títulos de aba. */
export const TITULO_BASE = 'Yzzo Digital'

/**
 * Endereço onde o site está publicado. Sem barra no fim.
 *
 * Usado na URL canônica e na imagem de compartilhamento, que precisam ser
 * absolutas: robô de preview não resolve caminho relativo.
 *
 * TODO: provisório. Trocar quando houver domínio, e atualizar junto as URLs
 * escritas à mão no index.html, que não acompanham esta constante.
 */
export const SITE_URL = 'https://yzzodigital.vercel.app'

export const linkInstagram = `https://instagram.com/${brand.instagram.replace(/^@/, '')}`

/**
 * A mensagem que já chega escrita no WhatsApp.
 *
 * "Vim pelo site" é o que separa o contato que veio daqui do que veio do
 * Instagram, sem instalar ferramenta nenhuma de medição.
 */
const MENSAGEM_PADRAO = 'Olá, Yzzo! Vim pelo site e quero saber mais sobre o trabalho de vocês.'

export function linkWhatsapp(mensagem: string = MENSAGEM_PADRAO) {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
