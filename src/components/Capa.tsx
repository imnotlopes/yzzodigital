import { ArrowDown } from 'lucide-react'

import { numeros } from '../data/numeros'
import { fotoCapa, srcsetAvif, srcsetDe } from '../data/portfolio'
import { brand } from '../lib/brand'
import Barra from './Barra'
import BotaoWhatsapp from './BotaoWhatsapp'
import Contador from './Contador'
import Revelar from './Revelar'
import TituloAnimado from './TituloAnimado'

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
 * A CAPA DA DANIELLI, COM A CAMISA 20
 * -----------------------------------
 * (Em teste: a capa anterior, com o Motion por cima da foto, está no commit
 * antes deste.)
 *
 * É a capa da apresentação da Danielli Noivas: uma foto só, grande, que se
 * desmancha no papel, e o texto centralizado ali onde ela some.
 *
 *   CELULAR     a foto ocupa o alto da tela e desmancha para baixo; o texto
 *               começa dentro do desmanche, com a ponta da foto atrás dele.
 *   DESKTOP     a foto fica em pé na coluna da direita e desmancha para a
 *               esquerda; o texto mora no papel da esquerda, centralizado.
 *
 * A camisa 20 de costas diz "imagem do atleta" sem legenda: o nome e o número
 * são exatamente o que a Yzzo põe em destaque nas artes. As paradas do
 * desmanche estão em `.capa_foto`, no index.css.
 *
 * O MOVIMENTO
 * -----------
 * A foto chega assentando, de um pouco mais perto para o lugar; o título
 * chega palavra por palavra e o amarelo pinta o "imagem" depois. O "+700"
 * sobe contando.
 */
/** A largura da foto na tela: inteira no celular, a coluna da direita no desktop. */
const TAMANHO_FOTO = '(max-width: 1023px) 100vw, 56vw'

export default function Capa() {
  const [destaque] = numeros

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col overflow-hidden bg-papel lg:flex-row lg:items-center"
      aria-labelledby="titulo-capa"
    >
      {/*
        Fora do fluxo, como na Danielli: no celular cobre o alto da tela, no
        desktop só a coluna da direita. O véu que desmancha a foto no papel é
        o ::after da caixa (`.capa_foto`, no index.css).
      */}
      <div className="capa_foto absolute inset-x-0 top-0 h-[78svh] overflow-hidden lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[56%]">
        {/*
          Em AVIF para quem abre (quase todo navegador): no celular de tela
          densa, 140 KB em vez de 326. O `sizes` e o `srcset` repetem o
          preload do index.html; se um mudar, o outro muda junto, ou a foto
          baixa duas vezes.
        */}
        <picture className="block size-full">
          <source type="image/avif" srcSet={srcsetAvif(fotoCapa)} sizes={TAMANHO_FOTO} />
          <img
            src={fotoCapa.src}
            srcSet={srcsetDe(fotoCapa)}
            sizes={TAMANHO_FOTO}
            alt={fotoCapa.alt}
            width={fotoCapa.largura}
            height={fotoCapa.altura}
            /* Primeira imagem da página: define quando a pessoa vê alguma coisa. */
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover object-[50%_30%]"
          />
        </picture>
      </div>

      <div className="relative px-6 pb-16 pt-[54svh] text-center sm:px-10 md:pb-24 md:pt-[58svh] lg:w-[48%] lg:px-10 lg:py-28 xl:px-16">
        <div className="mx-auto flex max-w-xl flex-col items-center md:max-w-2xl lg:max-w-xl">
          {/*
            A barra só no desktop, onde mora no papel. No celular ela caía em
            cima da camisa: amarelo sobre amarelo, embolado.
          */}
          <Revelar distancia="curta" naPrimeiraTela className="hidden w-full lg:block">
            <Barra className="mx-auto" />
          </Revelar>

          <h1 id="titulo-capa" className="font-normal lg:mt-10">
            <Revelar como="span" distancia="curta" atraso={80} naPrimeiraTela className="block">
              <span className="block font-sans text-[1.25rem] font-normal leading-tight md:text-[1.625rem]">
                Seu <strong className="font-bold">desempenho</strong> fala por você.
              </span>
            </Revelar>
            <TituloAnimado
              naPrimeiraTela
              atraso={260}
              className="t-display mt-4 max-md:text-[min(4rem,17vw)] lg:text-[clamp(5rem,7.6vw,8rem)]"
              linhas={[
                ['Sua', { texto: 'imagem', estilo: 'marca' }],
                ['também', 'deveria.'],
              ]}
            />
          </h1>

          <Revelar distancia="curta" atraso={640} naPrimeiraTela>
            <span aria-hidden className="mx-auto mt-6 block h-[3px] w-12 rounded-full bg-amarelo md:mt-8" />
            <p className="mx-auto mt-5 max-w-[38ch] text-[1.0625rem] text-cinza md:mt-7">
              Artes e conteúdo visual para o futebol: Match Days, Motion,
              convocação, novo clube e DVD esportivo.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:mt-9 lg:flex-col lg:items-center xl:flex-row">
              <BotaoWhatsapp texto="Quero falar com a Yzzo" />
              <a href="#portfolio" className="btn btn-contorno">
                Ver portfólio
                <ArrowDown size={17} strokeWidth={2} aria-hidden />
              </a>
            </div>

            {destaque && (
              <p className="mt-8 flex items-baseline justify-center gap-3 md:mt-10">
                <Contador valor={destaque.valor} className="t-h3 text-[2.75rem]" />
                <span className="text-sm font-medium text-cinza">
                  {destaque.rotulo} · {brand.assinatura}
                </span>
              </p>
            )}
          </Revelar>
        </div>
      </div>
    </section>
  )
}
