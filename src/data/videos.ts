/**
 * OS VÍDEOS DO SITE.
 *
 * ⏳ AINDA NÃO CHEGARAM. Cada espaço abaixo está com `src: null`, e enquanto
 * estiver assim o componente mostra um placeholder: a foto de fundo, um play e
 * o aviso de "vídeo em breve". Ver components/Video.tsx.
 *
 * COMO UM VÍDEO ENTRA
 * -------------------
 *   1. O original vai para `videos-originais/` (fora do Git), com o nome do
 *      `arquivo` abaixo.
 *   2. `node scripts/videos.mjs` comprime, tira o áudio e gera o pôster.
 *   3. Aqui, `src`, `srcCelular` e `poster` passam a apontar para
 *      `public/videos/`. O placeholder vira vídeo sozinho.
 *
 * Todos verticais (9:16), mudos e em laço, como os Reels de onde vêm.
 */

export interface EspacoDeVideo {
  /** Nome esperado em videos-originais/. */
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

/** O vídeo da seção "A agência". */
export const videoAgencia: EspacoDeVideo = {
  arquivo: 'agencia.mp4',
  src: null,
  poster: '/fotos/entrevista.webp',
  alt: 'Bastidores da Yzzo Digital em campo.',
  rotulo: 'Bastidores',
}

/** O tríptico de Motion do portfólio. */
export const videosMotion: EspacoDeVideo[] = [
  {
    arquivo: 'motion-1.mp4',
    src: null,
    poster: '/fotos/conducao-600.webp',
    alt: 'Vídeo de motion de um atleta em campo.',
    rotulo: 'Motion 01',
  },
  {
    arquivo: 'motion-2.mp4',
    src: null,
    poster: '/fotos/flamula-600.webp',
    alt: 'Vídeo de motion de uma convocação.',
    rotulo: 'Motion 02',
  },
  {
    arquivo: 'motion-3.mp4',
    src: null,
    poster: '/fotos/chute-600.webp',
    alt: 'Vídeo de motion com os melhores lances de um atleta.',
    rotulo: 'Motion 03',
  },
]
