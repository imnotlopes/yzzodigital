import { useEffect, useState } from 'react'

import { movimentoReduzido, useRevelar } from '../lib/movimento'
import { cn } from '../lib/utils'

interface ContadorProps {
  /** O valor como ele aparece no fim: "+700", "12", "98%". */
  valor: string
  /** Duração da contagem, em milissegundos. */
  duracao?: number
  className?: string
}

/**
 * O NÚMERO QUE SOBE CONTANDO.
 *
 * Conta do zero até o valor quando aparece na tela, rápido no começo e
 * devagar no fim (a curva desacelera como placar parando). Uma vez só.
 *
 * O que fica fixo: o prefixo e o sufixo ("+" de "+700"), a largura (reservada
 * pelo tamanho do valor final, em algarismos de largura igual, para o texto ao
 * lado não andar enquanto conta) e o que o leitor de tela lê, que é sempre o
 * valor final, nunca "+137".
 *
 * Com menos movimento pedido no sistema, ou se o valor não for um número,
 * mostra o valor final direto.
 */
export default function Contador({ valor, duracao = 1600, className }: ContadorProps) {
  const partes = /^(\D*)(\d+)(\D*)$/.exec(valor)
  const fim = partes ? Number(partes[2]) : 0

  const { alvo, visivel } = useRevelar<HTMLSpanElement>({ margem: '0px' })
  const [atual, setAtual] = useState(() => (partes && !movimentoReduzido() ? 0 : fim))

  useEffect(() => {
    if (!visivel || !partes || movimentoReduzido()) return

    let quadro = 0
    const inicio = performance.now()

    const passo = (agora: number) => {
      const progresso = Math.min(1, (agora - inicio) / duracao)
      /* Desacelera no fim: 1 - (1 - p)³. */
      setAtual(Math.round(fim * (1 - Math.pow(1 - progresso, 3))))
      if (progresso < 1) quadro = requestAnimationFrame(passo)
    }

    quadro = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(quadro)
    // A contagem roda uma vez, quando o número aparece; o resto é fixo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visivel])

  if (!partes) return <span className={className}>{valor}</span>

  return (
    <span
      ref={alvo}
      className={cn('inline-block tabular-nums', className)}
      style={{ minWidth: `${valor.length * 0.5}em` }}
    >
      <span aria-hidden>
        {partes[1]}
        {atual}
        {partes[3]}
      </span>
      <span className="sr-only">{valor}</span>
    </span>
  )
}
