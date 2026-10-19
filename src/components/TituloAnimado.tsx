import { Fragment, type CSSProperties } from 'react'

import { useRevelar } from '../lib/movimento'
import { cn } from '../lib/utils'

/**
 * Um pedaço do título: uma palavra comum, ou uma palavra com tratamento.
 *
 *   'Sua'                              palavra comum
 *   { texto: 'imagem', estilo: 'marca' }   no marca-texto amarelo
 *   { texto: 'decisões.', estilo: 'amarelo' }  letra amarela (só sobre preto)
 */
export type Pedaco = string | { texto: string; estilo: 'marca' | 'amarelo' }

interface TituloAnimadoProps {
  /** Uma lista por linha; cada linha, uma lista de palavras. */
  linhas: readonly (readonly Pedaco[])[]
  /** Quando a primeira palavra começa a subir. */
  atraso?: number
  /** Milissegundos entre uma palavra e a seguinte. */
  passo?: number
  /** Para o que já está na primeira tela: dispara assim que toca a tela. */
  naPrimeiraTela?: boolean
  className?: string
}

/**
 * O TÍTULO QUE CHEGA PALAVRA POR PALAVRA.
 * ======================================
 *
 * Cada palavra sobe de trás de uma máscara, uma depois da outra, como letreiro
 * de abertura de transmissão. Na palavra do marca-texto, o amarelo só "pinta"
 * depois que ela chega, da esquerda para a direita, como a caneta de
 * marca-texto passando: é o recurso dos posts da Yzzo ganhando movimento.
 *
 * Reservado para os títulos de abertura e de fecho. Em todo título da página
 * vira tique, e o primeiro uso perde a força.
 *
 * ACESSIBILIDADE
 * --------------
 * As palavras são texto de verdade, separadas por espaços de verdade, dentro
 * do elemento de título: o leitor de tela lê a frase inteira, normalmente.
 * Sem JavaScript, ou com `prefers-reduced-motion`, tudo aparece no lugar (ver
 * o `.js` em index.css e lib/movimento.ts).
 */
export default function TituloAnimado({
  linhas,
  atraso = 150,
  passo = 90,
  naPrimeiraTela = false,
  className,
}: TituloAnimadoProps) {
  const { alvo, visivel } = useRevelar<HTMLSpanElement>()

  let ordem = 0

  /*
    Na primeira tela, a entrada é só CSS (`--entrada`, no index.css): começa
    com o HTML pronto do build, sem esperar o JavaScript. No resto, espera o
    título entrar na tela.
  */
  const classe = naPrimeiraTela ? 'titulo-animado--entrada' : visivel && 'esta-visivel'

  return (
    <span ref={naPrimeiraTela ? undefined : alvo} className={cn('titulo-animado block', classe, className)}>
      {linhas.map((linha, l) => (
        <span key={l} className="block">
          {linha.map((pedaco, p) => {
            const texto = typeof pedaco === 'string' ? pedaco : pedaco.texto
            const estilo = typeof pedaco === 'string' ? null : pedaco.estilo
            const quando = atraso + ordem++ * passo

            const palavra = (
              <span className="palavra">
                <span style={{ '--atraso': `${quando}ms` } as CSSProperties}>{texto}</span>
              </span>
            )

            return (
              <Fragment key={`${texto}-${p}`}>
                {estilo === 'marca' ? (
                  <mark
                    className="marca-texto marca-anima"
                    style={{ '--atraso-marca': `${quando + 450}ms` } as CSSProperties}
                  >
                    {palavra}
                  </mark>
                ) : estilo === 'amarelo' ? (
                  <span className="text-amarelo">{palavra}</span>
                ) : (
                  palavra
                )}
                {/* O espaço fica fora da palavra: dentro de um inline-block ele some. */}
                {p < linha.length - 1 && ' '}
              </Fragment>
            )
          })}
        </span>
      ))}
    </span>
  )
}
