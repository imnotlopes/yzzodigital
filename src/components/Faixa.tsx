import { Pause, Play } from 'lucide-react'
import { useState, type CSSProperties, type ReactNode } from 'react'

import { movimentoReduzido } from '../lib/movimento'
import { cn } from '../lib/utils'

interface FaixaProps<T> {
  itens: readonly T[]
  /** Como cada item se desenha. Chamada duas vezes por item: ver o laço. */
  desenhar: (item: T) => ReactNode
  chave: (item: T) => string
  /** Segundos para uma volta inteira. */
  duracao: number
  /** Respiro de cada lado do item. Padding, e não gap: ver index.css. */
  respiro?: string
  /** Esmaece as pontas. Para conteúdo que se lê; a faixa de palavras corta seco. */
  esmaecida?: boolean
  /** Nome do conteúdo, para o botão de pausa: "Pausar os novos clientes". */
  nome: string
  className?: string
}

/**
 * A FAIXA EM MOVIMENTO.
 * =====================
 *
 * O motor da faixa de marcas da Danielli, genérico: serve à faixa de palavras
 * logo abaixo da capa e à faixa dos posts "Novo Cliente!".
 *
 * COMO O LAÇO FECHA
 * -----------------
 * A lista é renderizada DUAS vezes e o trilho anda até -50%. Nesse ponto a
 * segunda cópia está onde a primeira começou, e a volta ao zero é invisível.
 *
 * PARAR É EXIGÊNCIA, NÃO CORTESIA
 * -------------------------------
 * Conteúdo que se move sozinho por mais de cinco segundos precisa ter como
 * parar (WCAG 2.2.2). Quem pediu menos movimento no sistema recebe a lista
 * parada; o mouse por cima para a faixa; e quem navega por teclado encontra
 * um botão de pausa que só aparece no foco.
 */
export default function Faixa<T>({
  itens,
  desenhar,
  chave,
  duracao,
  respiro,
  esmaecida = false,
  nome,
  className,
}: FaixaProps<T>) {
  const [parada, setParada] = useState(false)

  if (movimentoReduzido()) {
    return (
      <ul className={cn('flex flex-wrap items-center justify-center gap-4', className)}>
        {itens.map((item) => (
          <li key={chave(item)}>{desenhar(item)}</li>
        ))}
      </ul>
    )
  }

  const fileira = (copia: boolean) => (
    <ul className="faixa_fileira" aria-hidden={copia || undefined}>
      {itens.map((item) => (
        <li key={chave(item)} className="faixa_item">
          {desenhar(item)}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={className}>
      <div
        className={cn('faixa', esmaecida && 'faixa--esmaecida')}
        style={
          {
            '--faixa-duracao': `${duracao}s`,
            ...(respiro ? { '--faixa-respiro': respiro } : {}),
          } as CSSProperties
        }
      >
        <div className={cn('faixa_trilho', parada && 'esta-parada')}>
          {fileira(false)}
          {/* A segunda cópia é só desenho: o leitor de tela não a lê. */}
          {fileira(true)}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setParada((estava) => !estava)}
          aria-pressed={parada}
          className="sr-only focus:not-sr-only focus:mt-3 focus:inline-flex focus:min-h-11
                     focus:items-center focus:gap-2 focus:px-3 focus:text-sm focus:font-semibold"
        >
          {parada ? (
            <Play size={14} strokeWidth={2} aria-hidden />
          ) : (
            <Pause size={14} strokeWidth={2} aria-hidden />
          )}
          {parada ? `Retomar ${nome}` : `Pausar ${nome}`}
        </button>
      </div>
    </div>
  )
}
