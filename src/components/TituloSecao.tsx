import type { ReactNode } from 'react'

import { cn } from '../lib/utils'
import Barra from './Barra'

interface TituloSecaoProps {
  /**
   * O título. A palavra que leva o marca-texto vai num `<mark>`, que o
   * componente pinta: `<>Nosso <mark>portfólio</mark></>`.
   */
  children: ReactNode
  /** Texto da barra amarela. Sem ele, a hashtag. `false` tira a barra. */
  barra?: string | false
  /** A linha de apoio embaixo do título. */
  descricao?: ReactNode
  centralizado?: boolean
  /**
   * Título à esquerda e apoio à direita, no computador. Ver o porquê abaixo.
   * No celular não muda nada: o apoio continua embaixo.
   */
  lado?: boolean
  /** Sobre fundo preto: título branco, apoio em cinza claro. */
  claro?: boolean
  id?: string
  className?: string
}

/**
 * Título de seção padronizado. Único lugar onde esse ritmo é definido.
 *
 * É o post "Sua imagem também deveria" virado componente: a barra amarela no
 * alto, o título condensado grande com UMA palavra no marca-texto, e uma linha
 * de apoio em Poppins embaixo.
 *
 * A VERSÃO EDITORIAL (`lado`)
 * ---------------------------
 * Numa tela larga, título e apoio empilhados deixam meia tela vazia à
 * direita, e a seção começa torta. Com `lado`, o título fica com a coluna
 * maior e o apoio vai para a direita, alinhado pela base do título e
 * separado por um fio. É a abertura de matéria de revista, e é o que mais
 * muda a sensação de "site de modelo" para "site desenhado".
 *
 * O `<mark>` é o elemento certo para o marca-texto, e não um span com classe:
 * ele já diz "destaque" para quem usa leitor de tela, que é exatamente o que
 * a caixa amarela diz para quem vê.
 */
export default function TituloSecao({
  children,
  barra,
  descricao,
  centralizado = false,
  lado = false,
  claro = false,
  id,
  className,
}: TituloSecaoProps) {
  const editorial = lado && Boolean(descricao) && !centralizado

  return (
    <div
      className={cn(
        centralizado && 'flex flex-col items-center text-center',
        editorial && 'lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-16',
        className,
      )}
    >
      <div>
        {barra !== false && <Barra texto={barra} className="mb-8" />}

        <h2
          id={id}
          className={cn('t-h2 [&_mark]:marca-texto', claro ? 'text-branco' : 'text-preto')}
        >
          {children}
        </h2>
      </div>

      {descricao && (
        <p
          className={cn(
            'mt-6 max-w-[46ch] text-[1.0625rem]',
            claro ? 'text-cinza-claro' : 'text-cinza',
            editorial && 'lg:mt-0 lg:border-l lg:pb-1.5 lg:pl-8',
            editorial && (claro ? 'lg:border-branco/15' : 'lg:border-preto/15'),
          )}
        >
          {descricao}
        </p>
      )}
    </div>
  )
}
