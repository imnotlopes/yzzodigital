import type { ReactNode } from 'react'

import { cn } from '../lib/utils'
import Revelar from './Revelar'

interface DuplaProps {
  /** A foto (ou vídeo) grande. Precisa preencher a largura que recebe. */
  grande: ReactNode
  /** A foto pequena, que ganha moldura branca e cai sobre a borda da grande. */
  pequena: ReactNode
  /**
   * O rótulo no vão debaixo da grande, ao lado da pequena. Curto, porque é
   * uma linha só. Ver `.dupla_rotulo`.
   */
  rotulo?: string
  /** Grande à esquerda e pequena à direita, para alternar folhas seguidas. */
  invertida?: boolean
  /** Sem revelação, para quando a dupla já está dentro de algo que se move. */
  parada?: boolean
  className?: string
}

/**
 * A DUPLA DE FOTOS.
 * ================
 *
 * Herdada do projeto da Danielli Noivas. É a montagem de revista: uma foto
 * grande e uma pequena de moldura branca caindo sobre a borda dela.
 *
 *        ┌─────────────────┐
 *        │                 │
 *        │     grande      │   colunas 4 a 12 de 12
 *        │                 │
 *   ┌──────────┐           │
 *   │ pequena  │───────────┘   colunas 1 a 6, com moldura branca,
 *   │          │ Bastidores    caindo SOBRE a borda da grande, e o
 *   └──────────┘               rótulo no vão ao lado dela
 *
 * A pequena desce abaixo da grande, e é isso que cria a profundidade: uma
 * foto está na frente da outra. Sem a sobreposição seriam duas fotos lado a
 * lado, cada uma na sua caixa, e nenhuma conversaria com a outra.
 *
 * A DESCIDA É MARGEM, E NÃO POSIÇÃO
 * ---------------------------------
 * As duas moram na mesma linha da grade. A grande tem margem embaixo e a
 * pequena encosta no fundo da linha, então a linha fica com a altura das duas
 * juntas e o que vem depois não é atropelado. Com `position` ou `transform`
 * a pequena sobraria para fora da caixa e cobriria o parágrafo seguinte.
 *
 * Tudo em porcentagem da largura, e por isso a montagem encolhe inteira no
 * celular, na mesma proporção, em vez de desmontar.
 */
export default function Dupla({
  grande,
  pequena,
  rotulo,
  invertida = false,
  parada = false,
  className,
}: DuplaProps) {
  const Parte = parada ? Estatico : Revelar

  return (
    <div className={cn('dupla', invertida && 'dupla--invertida', className)}>
      <Parte distancia="curta" className="dupla_grande">
        {grande}
      </Parte>

      <Parte distancia="curta" atraso={180} className="dupla_pequena">
        <div className="moldura">{pequena}</div>
      </Parte>

      {rotulo && (
        <Parte distancia="curta" atraso={320} className="dupla_rotulo">
          <p className="rotulo text-cinza">{rotulo}</p>
        </Parte>
      )}
    </div>
  )
}

/** O mesmo invólucro, sem movimento. Aceita e ignora as props da Revelar. */
function Estatico({
  children,
  className,
}: {
  children: ReactNode
  className?: string
  distancia?: string
  atraso?: number
}) {
  return <div className={className}>{children}</div>
}
