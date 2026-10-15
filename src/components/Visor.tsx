import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { srcsetDe, type Imagem } from '../data/portfolio'
import type { EspacoDeVideo } from '../data/videos'
import { movimentoReduzido } from '../lib/movimento'
import { cn } from '../lib/utils'
import Foto from './Foto'

/** A largura da arte no visor: a tela inteira no celular, 70% da altura no resto. */
const TAMANHO_NO_VISOR = '(max-width: 767px) 100vw, 70vh'

/**
 * Baixa uma arte antes de ela aparecer, na mesma versão que o visor vai
 * pedir: um `<picture>` solto, com os mesmos `srcset` e `sizes` da `<Foto>`.
 * Uma `<img>` comum baixaria o WebP, e o visor depois pediria o AVIF.
 */
function adiantar(imagem: Imagem) {
  const picture = document.createElement('picture')
  const fonte = document.createElement('source')
  fonte.type = 'image/avif'
  fonte.srcset = srcsetDe(imagem, 'avif')
  fonte.sizes = TAMANHO_NO_VISOR
  const img = document.createElement('img')
  img.sizes = TAMANHO_NO_VISOR
  img.srcset = srcsetDe(imagem)
  picture.append(fonte, img)
  img.src = imagem.pequena
}

/** O que o visor mostra: uma arte ou um Motion. */
export type ItemVisor = Imagem | EspacoDeVideo

function ehVideo(item: ItemVisor): item is EspacoDeVideo {
  return 'arquivo' in item
}

interface VisorProps {
  itens: readonly ItemVisor[]
  /** Índice aberto, ou `null` com o visor fechado. */
  indice: number | null
  aoMudar: (indice: number | null) => void
}

/** Quantos pixels de arrasto contam como "passar", e não como toque tremido. */
const ARRASTO_MINIMO = 50

/**
 * O PORTFÓLIO EM TELA CHEIA.
 * =========================
 *
 * Arte de atleta é feita para a tela inteira do celular, e numa fileira ela
 * aparece pequena. O visor devolve o tamanho dela. Mostra arte e Motion: o
 * vídeo toca sozinho, mudo e em laço, com os controles do navegador.
 *
 * `<dialog>` NATIVO, E NÃO UMA DIV
 * --------------------------------
 * `showModal()` dá de graça o que uma div precisaria de três bibliotecas para
 * fingir: prende o foco dentro, fecha no Esc, esconde o resto da página do
 * leitor de tela e devolve o foco para a miniatura clicada ao fechar.
 *
 * TRÊS JEITOS DE PASSAR
 * ---------------------
 * As setas do teclado, os dois botões laterais e, no celular, arrastar o dedo
 * para o lado, que é o gesto que todo mundo já faz no Stories. A peça nova
 * entra deslizando do lado para onde a pessoa foi, e a anterior e a próxima
 * já ficam baixadas, para a troca não esperar a rede.
 */
export default function Visor({ itens, indice, aoMudar }: VisorProps) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const toque = useRef<{ x: number; y: number } | null>(null)
  const [direcao, setDirecao] = useState<1 | -1>(1)

  const aberto = indice !== null
  const atual = aberto ? itens[indice] : null

  useEffect(() => {
    const elemento = dialogo.current
    if (!elemento) return
    if (aberto && !elemento.open) elemento.showModal()
    if (!aberto && elemento.open) elemento.close()
  }, [aberto])

  /* Baixa a vizinha de cada lado enquanto a pessoa olha a atual. */
  useEffect(() => {
    if (indice === null || itens.length < 2) return
    for (const passo of [1, -1]) {
      const vizinha = itens[(indice + passo + itens.length) % itens.length]
      if (!ehVideo(vizinha)) adiantar(vizinha)
    }
  }, [indice, itens])

  function passar(sentido: 1 | -1) {
    if (indice === null || itens.length < 2) return
    setDirecao(sentido)
    aoMudar((indice + sentido + itens.length) % itens.length)
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
      /* Clique fora da peça fecha, como em qualquer galeria. */
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) aoMudar(null)
      }}
      onTouchStart={(evento) => {
        const dedo = evento.touches[0]
        toque.current = { x: dedo.clientX, y: dedo.clientY }
      }}
      onTouchEnd={(evento) => {
        const inicio = toque.current
        toque.current = null
        if (!inicio) return
        const dedo = evento.changedTouches[0]
        const dx = dedo.clientX - inicio.x
        const dy = dedo.clientY - inicio.y
        /* Só conta arrasto de lado: arrasto vertical é a pessoa tentando rolar. */
        if (Math.abs(dx) > ARRASTO_MINIMO && Math.abs(dx) > Math.abs(dy) * 1.2) {
          passar(dx < 0 ? 1 : -1)
        }
      }}
    >
      {atual && (
        <>
          {/*
            A `key` troca a cada peça, e é ela que refaz a animação de entrada.
            O lado da entrada vem de `direcao`.
          */}
          <div
            key={indice}
            className={cn(
              'visor_peca flex items-center justify-center',
              !movimentoReduzido() && (direcao === 1 ? 'visor_peca--direita' : 'visor_peca--esquerda'),
            )}
          >
            {ehVideo(atual) && atual.src ? (
              <video
                src={atual.src}
                poster={atual.poster}
                aria-label={atual.alt}
                autoPlay={!movimentoReduzido()}
                muted
                loop
                playsInline
                controls
                className="max-h-[86svh] max-w-[calc(100vw-2rem)] rounded-sm"
              />
            ) : !ehVideo(atual) ? (
              <Foto
                imagem={atual}
                sizes={TAMANHO_NO_VISOR}
                className="max-h-[86svh] max-w-[calc(100vw-2rem)] select-none object-contain"
                draggable={false}
              />
            ) : null}
          </div>

          <p className="rotulo absolute left-1/2 top-5 -translate-x-1/2 text-branco/70">
            {indice! + 1} / {itens.length}
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

          {itens.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => passar(-1)}
                aria-label="Anterior"
                className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center
                           rounded-full bg-preto/50 text-branco transition-colors hover:bg-amarelo hover:text-preto md:left-6"
              >
                <ChevronLeft size={26} strokeWidth={1.75} />
              </button>

              <button
                type="button"
                onClick={() => passar(1)}
                aria-label="Próxima"
                className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center
                           rounded-full bg-preto/50 text-branco transition-colors hover:bg-amarelo hover:text-preto md:right-6"
              >
                <ChevronRight size={26} strokeWidth={1.75} />
              </button>
            </>
          )}

          <p className="rotulo absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.625rem] text-branco/50 md:hidden">
            Arraste para o lado
          </p>
        </>
      )}
    </dialog>
  )
}
