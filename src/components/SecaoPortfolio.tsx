import { Maximize2 } from 'lucide-react'
import { useState, type CSSProperties } from 'react'

import { artes, matchDays, type Imagem } from '../data/portfolio'
import { videosMotion } from '../data/videos'
import { useDeslizeHorizontal, useTelaLarga } from '../lib/movimento'
import { cn } from '../lib/utils'
import Foto from './Foto'
import Revelar from './Revelar'
import TituloSecao from './TituloSecao'
import Video from './Video'
import Visor, { type ItemVisor } from './Visor'

/** Qual lista está aberta no visor, e em que peça. */
type Aberto = { lista: readonly ItemVisor[]; indice: number } | null

/**
 * Bloco 4, o portfólio. O coração do site.
 * =======================================
 *
 * Três trabalhos, cada um na montagem que serve a ele:
 *
 *   1. ARTES      deslizando de lado. Arte de atleta é feita para ser vista
 *                 uma de cada vez, em tamanho de tela, como no feed.
 *   2. MATCH DAY  a arte do dia de jogo, em formato de Stories, na fileira
 *                 espelhada: título à direita, andando no sentido contrário.
 *   3. MOTION     os dois Match Days em vídeo, ao lado do texto, sobre o
 *                 preto.
 *
 * Havia um terceiro, o mural "Em campo" de fotografia de jogo, e ele saiu:
 * a Yzzo não cobre jogo (áudio de outubro de 2026). Ela pega as fotos do jogo
 * em que o atleta se destacou, edita e publica, e isso já está nas artes.
 *
 * Toda arte e todo Motion abrem em tela cheia no visor. Um visor só para as
 * três listas: a seta de "próxima" percorre a lista de onde a pessoa clicou.
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
            lado
            descricao="Mais de 700 projetos entre artes e vídeos. Aqui vai uma amostra."
          >
            Trabalho que <mark>entra em campo</mark>
          </TituloSecao>
        </Revelar>
      </div>

      <Fileira
        numero="01"
        titulo="Artes"
        imagens={artes}
        aoAbrir={(indice) => setAberto({ lista: artes, indice })}
      />
      <Fileira
        numero="02"
        titulo="Match Day"
        imagens={matchDays}
        espelhada
        aoAbrir={(indice) => setAberto({ lista: matchDays, indice })}
      />
      <Motion aoAbrir={(indice) => setAberto({ lista: videosMotion, indice })} />

      <Visor
        itens={aberto?.lista ?? []}
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
   1 E 2 · AS FILEIRAS QUE DESLIZAM
   ========================================================================== */

interface FileiraProps {
  numero: string
  titulo: string
  imagens: readonly Imagem[]
  aoAbrir: (indice: number) => void
  /**
   * A fileira espelhada: título à direita, a primeira peça encostada na
   * direita, e as peças andando no sentido contrário ao da fileira de cima.
   */
  espelhada?: boolean
}

/**
 * UMA FILEIRA QUE ANDA DE LADO COM A ROLAGEM.
 * ==========================================
 *
 * A seção prende na tela e as peças atravessam de lado enquanto a pessoa rola
 * para baixo: é o deslize da apresentação da Danielli. Vale no celular e no
 * computador, a pedido da Yzzo (outubro de 2026): antes, no celular, era um
 * carrossel de arrastar com o dedo, e quem só rolava a página nem percebia
 * que tinha mais.
 *
 * AS DUAS FILEIRAS SÃO ESPELHO UMA DA OUTRA
 * ----------------------------------------
 *   01 Artes      título à esquerda; as artes andam para a esquerda.
 *   02 Match Day  título à direita; a fileira começa encostada na direita e
 *                 as artes andam para a direita.
 *
 * Duas fileiras seguidas andando no mesmo sentido leriam como a mesma seção
 * repetida. Em sentidos opostos, a segunda é claramente outra coisa, e o
 * movimento ganha o vai e vem de um campo de futebol.
 *
 * Na espelhada, a ordem das peças é invertida no HTML: a primeira do dado
 * fica na ponta direita, que é onde a fileira começa. O visor recebe a ordem
 * original, então "próxima" continua sendo a próxima.
 */
function Fileira({ numero, titulo, imagens, aoAbrir, espelhada = false }: FileiraProps) {
  const larga = useTelaLarga(1024)
  const { externo, trilho } = useDeslizeHorizontal<HTMLDivElement, HTMLDivElement>(
    true,
    /* No celular cada peça ocupa quase a tela: o trilho anda mais por rolagem. */
    larga ? 0.62 : 0.8,
    espelhada ? 'direita' : 'esquerda',
  )

  const ordem = imagens.map((imagem, indice) => ({ imagem, indice }))
  if (espelhada) ordem.reverse()

  return (
    <div ref={externo} className="deslize" aria-label={titulo} role="region">
      <div className="deslize_janela">
        <div
          className={cn(
            'container-yz mb-6 flex items-end justify-between md:mb-8',
            espelhada && 'flex-row-reverse',
          )}
        >
          <Subtitulo numero={numero} texto={titulo} />
          <p className="text-sm text-cinza">{espelhada ? '← Role para ver mais' : 'Role para ver mais →'}</p>
        </div>

        <div ref={trilho} className="deslize_trilho">
          {ordem.map(({ imagem, indice }) => (
            <CartaoArte
              key={imagem.src}
              arte={imagem}
              aoAbrir={() => aoAbrir(indice)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * A largura do cartão na tela, para o navegador escolher a versão certa.
 *
 * É a conta do `.deslize_cartao` (index.css) passada para largura: a altura
 * é o menor entre 62% da tela, 40rem e o que cabe na largura, e a largura é
 * a altura vezes a proporção da arte. Antes era um "90vw" para tudo, e o
 * Match Day, que é estreito, baixava a versão grande sem precisar.
 */
function tamanhoNoDeslize(arte: Imagem) {
  const proporcao = arte.largura / arte.altura
  const vh = +(62 * proporcao).toFixed(1)
  const rem = +(40 * proporcao).toFixed(2)
  return `min(${vh}vh, ${rem}rem, calc(100vw - 2.5rem))`
}

function CartaoArte({ arte, aoAbrir }: { arte: Imagem; aoAbrir: () => void }) {
  return (
    <button
      type="button"
      onClick={aoAbrir}
      aria-label={`Ampliar: ${arte.alt}`}
      /* A proporção vem da própria arte: 4:5 nas do feed, 9:16 nos Match Days. */
      style={{ '--proporcao': arte.largura / arte.altura } as CSSProperties}
      className="deslize_cartao group relative block overflow-hidden rounded-sm bg-borda"
    >
      <Foto
        imagem={arte}
        sizes={tamanhoNoDeslize(arte)}
        alt=""
        /*
          Todas "lazy", até as três da frente: o portfólio fica a umas quatro
          telas da capa, e o navegador já começa a baixar quando a pessoa se
          aproxima. Antes as da frente eram baixadas na abertura, e no 4G
          disputavam a conexão com a foto da capa (ela chegava 2 s depois).
        */
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-700 ease-suave group-hover:scale-[1.03]"
      />
      <span
        aria-hidden
        className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-preto/60 text-branco
                   opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <Maximize2 size={16} strokeWidth={2} />
      </span>
    </button>
  )
}

/* ==========================================================================
   3 · MOTION
   ========================================================================== */

/**
 * O texto numa coluna e os dois vídeos nas outras duas, no computador. No
 * celular, o texto em cima e os vídeos num carrossel de arrastar.
 *
 * Os vídeos só baixam quando entram na tela e pausam quando saem. Ver
 * VideoVertical.
 */
function Motion({ aoAbrir }: { aoAbrir: (indice: number) => void }) {
  return (
    <div className="fundo-escuro mt-[var(--secao-m)] py-[var(--secao-m)] [--brilho-x:20%]">
      <div className="md:mx-auto md:grid md:max-w-conteudo md:grid-cols-3 md:items-end md:gap-5 md:px-10 lg:px-14">
        <div className="container-yz mb-8 md:mb-0 md:self-center md:px-0 md:pr-6">
          <Subtitulo numero="03" texto="Motion" claro />
          <p className="mt-4 max-w-[34ch] text-cinza-claro">
            As artes em vídeo, com movimento, para Reels e Stories. Cada Match
            Day ganha vida antes do jogo.
          </p>
        </div>

        <ul className="carrossel md:col-span-2 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0">
          {videosMotion.map((video, indice) => (
            <Revelar
              key={video.arquivo}
              como="li"
              atraso={indice * 120}
              distancia="curta"
              className="group relative isolate"
            >
              <Video video={video} className="rounded-sm" />
              {/*
                O vídeo inteiro abre o visor. O botão fica por cima do vídeo e
                por baixo da pausa (z-[2] no VideoVertical), que continua
                funcionando: parar o vídeo é exigência de acessibilidade.
              */}
              <button
                type="button"
                onClick={() => aoAbrir(indice)}
                aria-label={`Ver em tela cheia: ${video.alt}`}
                className="absolute inset-0 z-[1] rounded-sm"
              >
                <span
                  aria-hidden
                  className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-full bg-preto/60 text-branco
                             opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  <Maximize2 size={16} strokeWidth={2} />
                </span>
              </button>
            </Revelar>
          ))}
        </ul>
      </div>
    </div>
  )
}
