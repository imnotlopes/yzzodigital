import { ArrowDown } from 'lucide-react'
import type { CSSProperties } from 'react'

import { numeros } from '../../data/numeros'
import { artes, srcsetDe } from '../../data/portfolio'
import { agenciaDoLink } from '../../lib/agencia'
import { useRevelar } from '../../lib/movimento'
import { cn } from '../../lib/utils'
import Barra from '../Barra'
import BotaoWhatsapp from '../BotaoWhatsapp'
import Contador from '../Contador'
import Revelar from '../Revelar'
import TituloAnimado from '../TituloAnimado'
import { MENSAGEM_PARCEIRO } from './mensagens'

/**
 * As três artes do leque: amarela, azul e preta, para não virarem uma mancha
 * só. Cada uma com a posição aberta, em porcentagem da própria largura (o
 * cartão tem 46% do bloco) e o giro. Fechado, as três ficam no centro, retas.
 */
const LEQUE = [
  { arte: artes[0], tx: '-104%', ty: '-46%', giro: '-9deg' },
  { arte: artes[3], tx: '4%', ty: '-46%', giro: '9deg' },
  { arte: artes[1], tx: '-50%', ty: '-50%', giro: '0deg' },
]

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
  const { alvo: leque, visivel: aberto } = useRevelar<HTMLDivElement>({ margem: '0px' })

  return (
    <section id="inicio" className="relative overflow-hidden bg-papel pt-topo" aria-labelledby="titulo-parceiros">
      <div aria-hidden className="caco caco--a -bottom-px right-0 h-24 w-1/2 -scale-x-100 md:h-36" />

      <div className="container-yz relative grid grid-cols-1 items-center gap-14 pb-20 pt-10 lg:min-h-[calc(100svh-var(--altura-topo))] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-12">
        <div>
          <Revelar distancia="curta" naPrimeiraTela>
            {/* Com ?agencia= no link, a barra diz para quem é esta página. */}
            <Barra texto={agenciaDoLink ? `Para ${agenciaDoLink}` : 'Para atletas e empresários'} />
          </Revelar>

          <h1 id="titulo-parceiros" className="t-display mt-9">
            <TituloAnimado
              naPrimeiraTela
              atraso={200}
              linhas={[
                ['Como', 'funciona'],
                ['a', { texto: 'Yzzo', estilo: 'marca' }],
              ]}
            />
          </h1>

          <Revelar distancia="curta" atraso={560} naPrimeiraTela>
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
                <Contador valor={numero.valor} className="t-h3 text-[2.75rem]" />
                <span className="text-sm font-medium text-cinza">{numero.rotulo}</span>
              </p>
            ))}
          </Revelar>
        </div>

        {/*
          O LEQUE. Três artes sobrepostas e giradas, como cartas na mão, com a
          do meio na frente. Chegam empilhadas no centro e se abrem: é o
          portfólio "sendo mostrado", e não só exposto. No celular o leque
          encolhe junto, porque tudo é porcentagem da largura do bloco.
        */}
        <div
          ref={leque}
          className={cn('leque relative mx-auto aspect-[5/4] w-full max-w-xl', aberto && 'esta-aberto')}
        >
          {LEQUE.map(({ arte, tx, ty, giro }, indice) => (
            <img
              key={arte.src}
              src={arte.pequena}
              srcSet={srcsetDe(arte)}
              sizes="(max-width: 1023px) 50vw, 22vw"
              alt={arte.alt}
              width={arte.largura}
              height={arte.altura}
              fetchPriority={indice === 2 ? 'high' : undefined}
              decoding="async"
              style={{ '--tx': tx, '--ty': ty, '--giro': giro } as CSSProperties}
              className="leque_carta absolute aspect-[4/5] w-[46%] rounded-sm object-cover shadow-[0_18px_40px_rgb(0_0_0/0.22)]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
