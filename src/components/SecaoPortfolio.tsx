import { Maximize2 } from 'lucide-react'
import { useState } from 'react'

import { artes, fotos, srcsetDe, type Imagem } from '../data/portfolio'
import { videosMotion } from '../data/videos'
import { useDeslizeHorizontal, useTelaLarga } from '../lib/movimento'
import { cn } from '../lib/utils'
import Revelar from './Revelar'
import TituloSecao from './TituloSecao'
import Video from './Video'
import Visor from './Visor'

/** Qual lista está aberta no visor, e em que imagem. */
type Aberto = { lista: readonly Imagem[]; indice: number } | null

/**
 * Bloco 4, o portfólio. O coração do site.
 * =======================================
 *
 * Três trabalhos diferentes, cada um na montagem que serve a ele. É a mesma
 * sequência da Danielli (o deslize dos modelos, o tríptico de vídeos, o mural
 * dos casamentos), com outro conteúdo:
 *
 *   1. ARTES    deslizando de lado. Arte de atleta é feita para ser vista uma
 *               de cada vez, em tamanho de tela, como no feed.
 *   2. MOTION   três vídeos verticais lado a lado, sobre o preto.
 *   3. EM CAMPO o mural de fotografia: aqui o volume é o argumento, e grade
 *               mostra volume melhor que qualquer carrossel.
 *
 * Toda imagem abre em tela cheia no visor. Um visor só para as duas listas: a
 * seta de "próxima" percorre a lista de onde a pessoa clicou.
 */
export default function SecaoPortfolio() {
  const [aberto, setAberto] = useState<Aberto>(null)

  return (
    <section id="portfolio" aria-labelledby="titulo-portfolio">
      <div className="container-yz pt-[var(--secao-g)]">
        <Revelar>
          <TituloSecao
            id="titulo-portfolio"
            barra="Portfólio"
            descricao="Mais de 700 projetos entre artes, vídeos e fotos. Aqui vai uma amostra."
          >
            Trabalho que <mark>entra em campo</mark>
          </TituloSecao>
        </Revelar>
      </div>

      <Artes aoAbrir={(indice) => setAberto({ lista: artes, indice })} />
      <Motion />
      <EmCampo aoAbrir={(indice) => setAberto({ lista: fotos, indice })} />

      <Visor
        imagens={aberto?.lista ?? []}
        indice={aberto?.indice ?? null}
        aoMudar={(indice) => setAberto((atual) => (atual && indice !== null ? { ...atual, indice } : null))}
      />
    </section>
  )
}

/** O título pequeno de cada parte do portfólio. */
function Subtitulo({ numero, texto, claro }: { numero: string; texto: string; claro?: boolean }) {
  return (
    <h3 className={cn('flex items-baseline gap-4', claro ? 'text-branco' : 'text-preto')}>
      <span className="t-h3 text-[1.75rem] md:text-[2rem]">{numero}</span>
      <span className="t-h3">{texto}</span>
    </h3>
  )
}

/* ==========================================================================
   1 · AS ARTES
   ========================================================================== */

/**
 * No computador a seção prende e as artes andam de lado com a rolagem; no
 * celular é um carrossel de arrastar. São duas montagens, e não duas
 * aparências: com media query as duas ficariam no HTML e o navegador baixaria
 * as imagens das duas.
 */
function Artes({ aoAbrir }: { aoAbrir: (indice: number) => void }) {
  const larga = useTelaLarga(1024)
  return larga ? <ArtesDeslizando aoAbrir={aoAbrir} /> : <ArtesCarrossel aoAbrir={aoAbrir} />
}

function ArtesDeslizando({ aoAbrir }: { aoAbrir: (indice: number) => void }) {
  const { externo, trilho } = useDeslizeHorizontal<HTMLDivElement, HTMLDivElement>(true, 0.7)

  return (
    <div ref={externo} className="deslize">
      <div className="deslize_janela">
        <div className="container-yz mb-8 flex items-end justify-between">
          <Subtitulo numero="01" texto="Artes" />
          <p className="text-sm text-cinza">Role para ver mais →</p>
        </div>

        <div ref={trilho} className="deslize_trilho pl-[max(3.5rem,calc((100%_-_var(--largura-conteudo))/2_+_3.5rem))] pr-14">
          {artes.map((arte, indice) => (
            <CartaoArte
              key={arte.src}
              arte={arte}
              /* As três primeiras já estão na tela quando a seção prende. */
              adiantada={indice < 3}
              aoAbrir={() => aoAbrir(indice)}
              className="deslize_cartao"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ArtesCarrossel({ aoAbrir }: { aoAbrir: (indice: number) => void }) {
  return (
    <div className="pt-[var(--secao-m)]">
      <div className="container-yz mb-6 flex items-end justify-between">
        <Subtitulo numero="01" texto="Artes" />
        <p className="text-sm text-cinza">Arraste →</p>
      </div>

      <ul className="carrossel" aria-label="Artes">
        {artes.map((arte, indice) => (
          <li key={arte.src}>
            <CartaoArte
              arte={arte}
              adiantada={indice < 2}
              aoAbrir={() => aoAbrir(indice)}
              className="w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function CartaoArte({
  arte,
  adiantada,
  aoAbrir,
  className,
}: {
  arte: Imagem
  adiantada: boolean
  aoAbrir: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={aoAbrir}
      aria-label={`Ampliar: ${arte.alt}`}
      className={cn('group relative block aspect-[4/5] overflow-hidden rounded-sm bg-borda', className)}
    >
      <img
        src={arte.pequena}
        srcSet={srcsetDe(arte)}
        sizes="(max-width: 1023px) 78vw, 32rem"
        alt=""
        width={arte.largura}
        height={arte.altura}
        loading={adiantada ? 'eager' : 'lazy'}
        decoding="async"
        className="size-full object-cover transition-transform duration-700 ease-suave group-hover:scale-[1.03]"
      />
      <IconeAmpliar />
    </button>
  )
}

function IconeAmpliar() {
  return (
    <span
      aria-hidden
      className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-preto/60 text-branco
                 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <Maximize2 size={16} strokeWidth={2} />
    </span>
  )
}

/* ==========================================================================
   2 · MOTION
   ========================================================================== */

/**
 * Três verticais lado a lado sobre o preto: três 9:16 formam uma faixa que
 * ocupa a largura sem cortar quadro nenhum. No celular, carrossel.
 *
 * ⏳ Os três ainda são placeholder. Ver data/videos.ts.
 */
function Motion() {
  return (
    <div className="mt-[var(--secao-m)] bg-preto py-[var(--secao-m)]">
      <div className="container-yz mb-8 md:mb-10">
        <Subtitulo numero="02" texto="Motion" claro />
        <p className="mt-3 max-w-[48ch] text-cinza-claro">
          Reels, apresentações e lances editados para o atleta ser visto em movimento.
        </p>
      </div>

      <ul className="carrossel md:mx-auto md:grid md:max-w-conteudo md:grid-cols-3 md:gap-5 md:overflow-visible md:px-10 lg:px-14">
        {videosMotion.map((video, indice) => (
          <Revelar key={video.arquivo} como="li" atraso={indice * 120} distancia="curta">
            <Video video={video} className="rounded-sm" />
          </Revelar>
        ))}
      </ul>
    </div>
  )
}

/* ==========================================================================
   3 · EM CAMPO
   ========================================================================== */

function EmCampo({ aoAbrir }: { aoAbrir: (indice: number) => void }) {
  return (
    <div className="container-yz py-[var(--secao-g)]">
      <div className="mb-8 md:mb-10">
        <Subtitulo numero="03" texto="Em campo" />
        <p className="mt-3 max-w-[48ch] text-cinza">
          Cobertura de jogos, treinos e convocações.
        </p>
      </div>

      <ul className="mural">
        {fotos.map((foto, indice) => (
          <li
            key={foto.src}
            className={cn('mural_item', foto.alta && 'mural_item--alto')}
          >
            <button
              type="button"
              onClick={() => aoAbrir(indice)}
              aria-label={`Ampliar: ${foto.alt}`}
              className="group relative block size-full overflow-hidden rounded-sm bg-borda"
            >
              <img
                src={foto.pequena}
                srcSet={srcsetDe(foto)}
                sizes="(max-width: 1023px) 50vw, 25vw"
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 ease-suave group-hover:scale-[1.04]"
              />
              <IconeAmpliar />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
