import { cn } from '../lib/utils'

interface BarraProps {
  /** O texto da esquerda. Sem ele, a hashtag da agência. */
  texto?: string
  className?: string
}

/**
 * A BARRA DO #TimeYzzoDigital.
 *
 * É a pílula amarela que abre os posts da agência: a hashtag, um fio e o ano
 * com ©. Aqui ela abre as seções, no lugar do rótulo pequeno de sempre, e é o
 * que faz o site parecer do mesmo autor que o feed.
 *
 * O "Yzzo" da hashtag vai em negrito, como nos posts. O ano é calculado:
 * escrito à mão, ele vira mentira em janeiro e ninguém lembra de voltar aqui.
 */
export default function Barra({ texto, className }: BarraProps) {
  return (
    <span className={cn('barra', className)}>
      {/* Nome comprido (o da agência, no link) corta com reticências em vez de estourar a tela. */}
      <span className="min-w-0 truncate">
        {texto ?? (
          <>
            #Time<strong className="font-bold">YzzoDigital</strong>
          </>
        )}
      </span>
      <span aria-hidden className="barra_fio" />
      <span className="shrink-0 whitespace-nowrap">{new Date().getFullYear()} ©</span>
    </span>
  )
}
