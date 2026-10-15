import { Play } from 'lucide-react'

import type { EspacoDeVideo } from '../data/videos'
import { cn } from '../lib/utils'
import VideoVertical from './VideoVertical'

interface VideoProps {
  video: EspacoDeVideo
  /** Segundo em que começa na primeira vez. Ver VideoVertical. */
  inicio?: number
  className?: string
}

/**
 * Um espaço de vídeo vertical: o vídeo, se ele já chegou, ou o placeholder.
 *
 * O PLACEHOLDER NÃO FINGE SER VÍDEO
 * ---------------------------------
 * Um play no meio de uma foto que não toca nada é um botão quebrado, e a
 * pessoa clica. Por isso o ícone fica pequeno e apagado, e a etiqueta diz com
 * todas as letras que o vídeo ainda vai chegar.
 *
 * Quando `src` deixar de ser `null` em data/videos.ts, este componente passa
 * a montar o VideoVertical, que só baixa o arquivo quando ele entra na tela.
 */
export default function Video({ video, inicio, className }: VideoProps) {
  if (video.src) {
    return (
      <VideoVertical
        src={video.src}
        srcCelular={video.srcCelular}
        poster={video.poster}
        alt={video.alt}
        inicio={inicio}
        className={className}
      />
    )
  }

  return (
    <div className={cn('relative aspect-[9/16] overflow-hidden bg-grafite', className)}>
      <img
        src={video.poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-full object-cover opacity-45 grayscale"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-branco">
        <span className="flex size-14 items-center justify-center rounded-full border border-branco/40">
          <Play size={20} strokeWidth={1.75} aria-hidden className="translate-x-0.5" />
        </span>
        <span className="rotulo">{video.rotulo}</span>
      </div>

      <span className="rotulo absolute inset-x-0 bottom-0 bg-amarelo py-2 text-center text-[0.6875rem] text-preto">
        Vídeo em breve
      </span>
    </div>
  )
}
