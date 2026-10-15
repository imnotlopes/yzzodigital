/**
 * OS VÍDEOS DO SITE.
 *
 * Os dois Match Days em Motion que a Yzzo mandou em outubro de 2026. Antes
 * eram três espaços com "vídeo em breve"; com dois vídeos, ficaram dois
 * espaços, porque um placeholder que sobra diz que falta trabalho.
 *
 * COMO UM VÍDEO ENTRA
 * -------------------
 *   1. O original vai para `videos-originais/` (fora do Git), com o nome do
 *      `arquivo` abaixo, e entra no PLANO de scripts/videos.mjs.
 *   2. `node scripts/videos.mjs` comprime, tira o áudio e gera o pôster.
 *   3. Aqui, `src`, `srcCelular` e `poster` apontam para `public/videos/`.
 *
 * Um espaço com `src: null` mostra o placeholder de "vídeo em breve" (ver
 * components/Video.tsx). Hoje não há nenhum.
 *
 * Todos verticais (9:16), mudos e em laço, como os Reels de onde vêm.
 */

export interface EspacoDeVideo {
  /** Nome em videos-originais/. */
  arquivo: string
  /** `null` enquanto o vídeo não chegou. */
  src: string | null
  srcCelular?: string
  /** Pôster do vídeo, ou a foto que segura o lugar enquanto ele não chega. */
  poster: string
  /** O que se vê, para quem não vê. */
  alt: string
  /** Rótulo do placeholder: diz que tipo de vídeo vai ali. */
  rotulo: string
}

function video(nome: string, alt: string, rotulo: string): EspacoDeVideo {
  return {
    arquivo: `${nome}.mp4`,
    src: `/videos/${nome}.mp4`,
    srcCelular: `/videos/${nome}-540.mp4`,
    poster: `/videos/${nome}.webp`,
    alt,
    rotulo,
  }
}

export const matchDayEstrela = video(
  'estrela-x-vila-nova',
  'Match Day em Motion do FC Estrela contra o Vila Nova, pela Copa Goiás Sub-15: o rosto do atleta de perfil e ele conduzindo a bola.',
  'Copa Goiás',
)

export const matchDayBrasil = video(
  'brasil-x-paraguai',
  'Match Day em Motion de Brasil x Paraguai: o atleta da Seleção com a camisa 20, em amarelo e azul.',
  'Brasil x Paraguai',
)

/** Os Motion do portfólio. */
export const videosMotion: EspacoDeVideo[] = [matchDayBrasil, matchDayEstrela]
