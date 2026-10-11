import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { srcsetDe, type Imagem } from '../data/portfolio'

interface VisorProps {
  imagens: readonly Imagem[]
  /** Índice aberto, ou `null` com o visor fechado. */
  indice: number | null
  aoMudar: (indice: number | null) => void
}

/**
 * A IMAGEM DO PORTFÓLIO EM TELA CHEIA.
 * ===================================
 *
 * Arte de atleta é feita para a tela inteira do celular, e numa grade de duas
 * colunas ela aparece do tamanho de um selo. O visor devolve o tamanho dela.
 *
 * `<dialog>` NATIVO, E NÃO UMA DIV
 * --------------------------------
 * `showModal()` dá de graça o que uma div precisaria de três bibliotecas para
 * fingir: prende o foco dentro, fecha no Esc, esconde o resto da página do
 * leitor de tela e devolve o foco para a miniatura clicada ao fechar.
 *
 * As setas do teclado trocam de imagem. No toque, os dois botões laterais.
 */
export default function Visor({ imagens, indice, aoMudar }: VisorProps) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const aberto = indice !== null
  const atual = aberto ? imagens[indice] : null

  useEffect(() => {
    const elemento = dialogo.current
    if (!elemento) return
    if (aberto && !elemento.open) elemento.showModal()
    if (!aberto && elemento.open) elemento.close()
  }, [aberto])

  function passar(direcao: 1 | -1) {
    if (indice === null) return
    aoMudar((indice + direcao + imagens.length) % imagens.length)
  }

  return (
    <dialog
      ref={dialogo}
      className="visor"
      aria-label="Portfólio em tela cheia"
      /* O Esc fecha o dialog sozinho; isto mantém o estado do React igual. */
      onClose={() => aoMudar(null)}
      onKeyDown={(evento) => {
        if (evento.key === 'ArrowRight') passar(1)
        if (evento.key === 'ArrowLeft') passar(-1)
      }}
      /* Clique fora da imagem fecha, como em qualquer galeria. */
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) aoMudar(null)
      }}
    >
      {atual && (
        <>
          <img
            src={atual.src}
            srcSet={srcsetDe(atual)}
            sizes="(max-width: 767px) 100vw, 70vh"
            alt={atual.alt}
            className="max-h-[86svh] max-w-[calc(100vw-2rem)] object-contain"
          />

          <p className="rotulo absolute left-1/2 top-5 -translate-x-1/2 text-branco/70">
            {indice! + 1} / {imagens.length}
          </p>

          <button
            type="button"
            onClick={() => aoMudar(null)}
            aria-label="Fechar"
            className="absolute right-3 top-3 flex size-12 items-center justify-center rounded-full
                       text-branco transition-colors hover:bg-branco/10"
          >
            <X size={24} strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={() => passar(-1)}
            aria-label="Imagem anterior"
            className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center
                       rounded-full bg-preto/50 text-branco transition-colors hover:bg-amarelo hover:text-preto md:left-6"
          >
            <ChevronLeft size={26} strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={() => passar(1)}
            aria-label="Próxima imagem"
            className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center
                       rounded-full bg-preto/50 text-branco transition-colors hover:bg-amarelo hover:text-preto md:right-6"
          >
            <ChevronRight size={26} strokeWidth={1.75} />
          </button>
        </>
      )}
    </dialog>
  )
}
