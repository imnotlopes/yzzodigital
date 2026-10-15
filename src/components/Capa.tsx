import { ArrowDown } from 'lucide-react'

import { numeros } from '../data/numeros'
import { fotoCapa, srcsetDe } from '../data/portfolio'
import { matchDayBrasil } from '../data/videos'
import { brand } from '../lib/brand'
import { useParallax } from '../lib/movimento'
import Barra from './Barra'
import BotaoWhatsapp from './BotaoWhatsapp'
import Contador from './Contador'
import Revelar from './Revelar'
import TituloAnimado from './TituloAnimado'
import Video from './Video'

/**
 * Bloco 1, a abertura.
 *
 * A FRASE É DA PRÓPRIA AGÊNCIA
 * ----------------------------
 * "Seu desempenho fala por você. Sua imagem também deveria." é um post do
 * Instagram da Yzzo, palavra por palavra, com o "imagem" no marca-texto. Não
 * inventei slogan: o melhor resumo do que a agência vende já estava escrito
 * por ela, e repetir aqui é o que liga o site ao feed de onde a pessoa veio.
 *
 * A FOTO E O MOTION, UM SOBRE O OUTRO
 * -----------------------------------
 * A camisa 20 de costas diz "imagem do atleta" sem legenda. Por cima da borda
 * dela, com moldura branca e levemente girado, o Match Day em Motion: é a
 * dupla de fotos da Danielli com o trabalho da Yzzo no lugar da foto pequena.
 * A foto mostra o atleta; o vídeo mostra o que a Yzzo faz com ele.
 *
 * O vídeo começa no segundo 7,2, pulando a vinheta de cor: na capa, quem
 * chega precisa ver o atleta. Ele só baixa depois da foto, e com menos
 * movimento pedido no sistema vira o pôster.
 *
 * O MOVIMENTO
 * -----------
 * O título chega palavra por palavra e o amarelo pinta o "imagem" depois. A
 * foto anda um pouco mais devagar que a página e os cacos amarelos andam no
 * sentido contrário: três planos, e é isso que dá profundidade. O "+700"
 * sobe contando.
 *
 * NO CELULAR O TEXTO VEM PRIMEIRO
 * -------------------------------
 * A frase é o que a pessoa precisa ler; a foto vem logo embaixo, com a ponta
 * aparecendo no pé da tela para dizer que a página continua.
 */
export default function Capa() {
  const [destaque] = numeros
  const foto = useParallax<HTMLDivElement>(0.05)
  const cacoAlto = useParallax<HTMLDivElement>(-0.09)
  const cacoBaixo = useParallax<HTMLDivElement>(-0.05)

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-papel pt-topo"
      aria-labelledby="titulo-capa"
    >
      {/* Os cacos do fundo, como os do canto dos posts. */}
      <div aria-hidden className="caco caco--a -bottom-px left-0 h-28 w-2/3 opacity-90 md:h-40 md:w-1/2" />

      <div className="container-yz relative grid grid-cols-1 items-center gap-12 pb-20 pt-10 md:pb-28 lg:min-h-[calc(100svh-var(--altura-topo))] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:py-12">
        <div>
          <Revelar distancia="curta" naPrimeiraTela>
            <Barra />
          </Revelar>

          <h1 id="titulo-capa" className="mt-9 font-normal">
            <Revelar como="span" distancia="curta" atraso={80} naPrimeiraTela className="block">
              <span className="block font-sans text-[1.375rem] font-normal leading-tight md:text-[1.75rem]">
                Seu <strong className="font-bold">desempenho</strong>
                <br />
                fala por você.
              </span>
            </Revelar>
            <TituloAnimado
              naPrimeiraTela
              atraso={260}
              className="t-display mt-4"
              linhas={[
                ['Sua', { texto: 'imagem', estilo: 'marca' }],
                ['também', 'deveria.'],
              ]}
            />
          </h1>

          <Revelar distancia="curta" atraso={640} naPrimeiraTela>
            <p className="mt-7 max-w-[40ch] text-[1.0625rem] text-cinza">
              Artes e conteúdo visual para o futebol: Match Days, Motion,
              convocação, novo clube e DVD esportivo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BotaoWhatsapp texto="Quero falar com a Yzzo" />
              <a href="#portfolio" className="btn btn-contorno">
                Ver portfólio
                <ArrowDown size={17} strokeWidth={2} aria-hidden />
              </a>
            </div>

            {destaque && (
              <p className="mt-10 flex items-baseline gap-3">
                <Contador valor={destaque.valor} className="t-h3 text-[2.75rem]" />
                <span className="text-sm font-medium text-cinza">
                  {destaque.rotulo} · {brand.assinatura}
                </span>
              </p>
            )}
          </Revelar>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div ref={cacoAlto} aria-hidden className="caco caco--c flutuar -right-6 -top-6 size-28 md:size-36" />

          <Revelar distancia="nenhuma" atraso={160} naPrimeiraTela>
            <div ref={foto} className="parallax relative aspect-[4/5] rounded-sm">
              <img
                src={fotoCapa.src}
                srcSet={srcsetDe(fotoCapa)}
                sizes="(max-width: 1023px) 90vw, 40vw"
                alt={fotoCapa.alt}
                width={fotoCapa.largura}
                height={fotoCapa.altura}
                /* Primeira imagem da página: define quando a pessoa vê alguma coisa. */
                fetchPriority="high"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          </Revelar>

          <div ref={cacoBaixo} aria-hidden className="caco caco--b flutuar -bottom-6 -right-5 h-20 w-24 md:h-28 md:w-32" />

          {/* O Motion, por cima da borda da foto. */}
          <Revelar
            distancia="curta"
            atraso={900}
            naPrimeiraTela
            className="absolute -bottom-10 left-3 w-[38%] sm:-left-6 lg:-left-14 lg:w-[40%]"
          >
            <div className="moldura -rotate-3 rounded-[0.6rem] shadow-[var(--sombra-cartao)]">
              <Video video={matchDayBrasil} inicio={7.2} className="rounded-[0.3rem]" />
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
