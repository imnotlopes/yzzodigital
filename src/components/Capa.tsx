import { ArrowDown } from 'lucide-react'

import { numeros } from '../data/numeros'
import { fotoCapa, srcsetDe } from '../data/portfolio'
import { brand } from '../lib/brand'
import Barra from './Barra'
import BotaoWhatsapp from './BotaoWhatsapp'
import Revelar from './Revelar'

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
 * A FOTO É A CAMISA 20 DE COSTAS
 * ------------------------------
 * O nome e o número nas costas, sem o rosto: é a foto que diz "imagem do
 * atleta" sem precisar de legenda, e não depende de a pessoa reconhecer quem
 * é. Os cacos amarelos nas bordas são os dos posts.
 *
 * NO CELULAR O TEXTO VEM PRIMEIRO
 * -------------------------------
 * A frase é o que a pessoa precisa ler; a foto vem logo embaixo, com a ponta
 * aparecendo no pé da tela para dizer que a página continua.
 */
export default function Capa() {
  const [destaque] = numeros

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-papel pt-topo"
      aria-labelledby="titulo-capa"
    >
      {/* Os cacos do fundo, como os do canto dos posts. */}
      <div aria-hidden className="caco caco--a -bottom-px left-0 h-28 w-2/3 opacity-90 md:h-40 md:w-1/2" />

      <div className="container-yz relative grid items-center gap-12 pb-16 pt-10 md:pb-24 lg:min-h-[calc(100svh-var(--altura-topo))] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:py-12">
        <div>
          <Revelar distancia="curta" naPrimeiraTela>
            <Barra />
          </Revelar>

          <Revelar distancia="curta" atraso={120} naPrimeiraTela>
            <h1 id="titulo-capa" className="mt-9 font-normal">
              <span className="block font-sans text-[1.375rem] font-normal leading-tight md:text-[1.75rem]">
                Seu <strong className="font-bold">desempenho</strong>
                <br />
                fala por você.
              </span>
              <span className="t-display mt-4 block">
                Sua <mark className="marca-texto">imagem</mark>
                <br />
                também deveria.
              </span>
            </h1>
          </Revelar>

          <Revelar distancia="curta" atraso={240} naPrimeiraTela>
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
                <span className="t-h3 text-[2.75rem]">{destaque.valor}</span>
                <span className="text-sm font-medium text-cinza">
                  {destaque.rotulo} · {brand.assinatura}
                </span>
              </p>
            )}
          </Revelar>
        </div>

        <Revelar distancia="nenhuma" atraso={160} naPrimeiraTela className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden className="caco caco--c -right-6 -top-6 size-28 md:size-36" />
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
            className="relative aspect-[4/5] w-full rounded-sm object-cover lg:max-h-[78svh]"
          />
          <div aria-hidden className="caco caco--b -bottom-5 -left-5 h-20 w-24 md:h-28 md:w-32" />
        </Revelar>
      </div>
    </section>
  )
}
