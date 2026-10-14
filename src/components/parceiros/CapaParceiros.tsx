import { ArrowDown } from 'lucide-react'

import { numeros } from '../../data/numeros'
import { artes, srcsetDe } from '../../data/portfolio'
import { cn } from '../../lib/utils'
import Barra from '../Barra'
import BotaoWhatsapp from '../BotaoWhatsapp'
import Revelar from '../Revelar'
import { MENSAGEM_PARCEIRO } from './mensagens'

/** As três artes do leque: amarela, azul e preta, para não virarem uma mancha só. */
const LEQUE = [artes[0], artes[1], artes[3]]

/**
 * A abertura da página de parceiros.
 *
 * A RESPOSTA VEM NO TÍTULO
 * ------------------------
 * Esta página existe para uma pergunta só, "como funciona a empresa de
 * vocês?", e o título é ela respondida. A linha de baixo é a frase que separa
 * a Yzzo de quem está lendo: o empresário cuida da carreira, a Yzzo cuida da
 * imagem. É a única menção a carreira na página, e basta: a Yzzo pediu foco
 * só nas artes (áudio de outubro de 2026), e quem agencia só precisa saber
 * que não está falando com um concorrente.
 *
 * O leque de artes à direita é o portfólio em um relance: antes de ler os
 * pacotes, o empresário já viu o nível do que o atleta dele vai receber.
 */
export default function CapaParceiros() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-papel pt-topo" aria-labelledby="titulo-parceiros">
      <div aria-hidden className="caco caco--a -bottom-px right-0 h-24 w-1/2 -scale-x-100 md:h-36" />

      <div className="container-yz relative grid items-center gap-14 pb-20 pt-10 lg:min-h-[calc(100svh-var(--altura-topo))] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-12">
        <div>
          <Revelar distancia="curta" naPrimeiraTela>
            <Barra texto="Para atletas e empresários" />
          </Revelar>

          <Revelar distancia="curta" atraso={120} naPrimeiraTela>
            <h1 id="titulo-parceiros" className="t-display mt-9">
              Como funciona
              <br />a <mark className="marca-texto">Yzzo</mark>
            </h1>
          </Revelar>

          <Revelar distancia="curta" atraso={240} naPrimeiraTela>
            <p className="mt-8 font-sans text-[1.375rem] leading-snug md:text-[1.625rem]">
              O empresário cuida da <strong className="font-bold">carreira</strong>.
              <br />A Yzzo cuida da <strong className="font-bold">imagem</strong>.
            </p>
            <p className="mt-6 max-w-[44ch] text-[1.0625rem] text-cinza">
              Artes e conteúdo visual para o futebol, em dois pacotes: um para o
              atleta e outro para empresas e assessorias.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#atletas" className="btn btn-preto">
                Ver os pacotes
                <ArrowDown size={17} strokeWidth={2} aria-hidden />
              </a>
              <BotaoWhatsapp texto="Falar com a Yzzo" mensagem={MENSAGEM_PARCEIRO} />
            </div>

            {numeros.map((numero) => (
              <p key={numero.rotulo} className="mt-10 flex items-baseline gap-3">
                <span className="t-h3 text-[2.75rem]">{numero.valor}</span>
                <span className="text-sm font-medium text-cinza">{numero.rotulo}</span>
              </p>
            ))}
          </Revelar>
        </div>

        {/*
          O LEQUE. Três artes sobrepostas e giradas, como cartas na mão. A do
          meio vem na frente. No celular o leque encolhe junto, porque tudo é
          porcentagem da largura do bloco.
        */}
        <Revelar distancia="nenhuma" atraso={160} naPrimeiraTela className="relative mx-auto aspect-[5/4] w-full max-w-xl">
          {LEQUE.map((arte, indice) => (
            <img
              key={arte.src}
              src={arte.pequena}
              srcSet={srcsetDe(arte)}
              sizes="(max-width: 1023px) 50vw, 22vw"
              alt={arte.alt}
              width={arte.largura}
              height={arte.altura}
              fetchPriority={indice === 1 ? 'high' : undefined}
              decoding="async"
              className={cn(
                'absolute top-1/2 aspect-[4/5] w-[46%] rounded-sm object-cover shadow-[0_18px_40px_rgb(0_0_0/0.22)]',
                indice === 0 && 'left-[2%] -translate-y-[46%] -rotate-[9deg]',
                indice === 1 && 'left-1/2 z-10 -translate-x-1/2 -translate-y-1/2',
                indice === 2 && 'right-[2%] -translate-y-[46%] rotate-[9deg]',
              )}
            />
          ))}
        </Revelar>
      </div>
    </section>
  )
}
