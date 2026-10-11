import { Check } from 'lucide-react'

import { planos } from '../../data/planos'
import { cn } from '../../lib/utils'
import BotaoWhatsapp from '../BotaoWhatsapp'
import Revelar from '../Revelar'
import TituloSecao from '../TituloSecao'
import { mensagemDoPlano } from './mensagens'

/**
 * OS PLANOS.
 * ==========
 *
 * Três cartões lado a lado, o semanal em destaque no amarelo. A frase de
 * apoio explica o que mais confunde quem lê "semanal, quinzenal, mensal": a
 * cobrança é sempre por mês, o que muda é o ritmo das entregas.
 *
 * SEM PREÇO, COM BOTÃO
 * --------------------
 * Cada cartão termina num botão que abre o WhatsApp já com o nome do plano.
 * O preço é dito na conversa, que é onde ele depende do número de atletas.
 * Quando a Yzzo decidir publicar valores, entra um campo `preco` em
 * data/planos.ts e uma linha aqui.
 *
 * ⚠️ As quantidades são proposta, ver data/planos.ts.
 */
export default function SecaoPlanos() {
  return (
    <section id="planos" className="bg-papel" aria-labelledby="titulo-planos">
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao
            id="titulo-planos"
            barra="Planos"
            descricao="A cobrança é mensal. O que muda é o ritmo das entregas, de acordo com o momento do atleta."
          >
            Semanal, quinzenal ou <mark>mensal</mark>
          </TituloSecao>
        </Revelar>

        <ul className="mt-14 grid gap-4 lg:grid-cols-3">
          {planos.map((plano, indice) => (
            <Revelar
              key={plano.nome}
              como="li"
              atraso={indice * 110}
              className={cn(
                'flex flex-col rounded-sm p-7 md:p-9',
                plano.destaque ? 'bg-amarelo' : 'border border-borda bg-branco',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="t-h2">{plano.nome}</h3>
                {plano.destaque && (
                  <span className="rotulo mt-2 whitespace-nowrap rounded-full bg-preto px-3 py-1.5 text-[0.625rem] text-amarelo">
                    Mais completo
                  </span>
                )}
              </div>
              <p className={cn('mt-3 min-h-[3lh] text-[0.9375rem] leading-snug', plano.destaque ? 'text-preto/80' : 'text-cinza')}>
                {plano.publico}
              </p>

              <Ritmo semanas={plano.semanas} destaque={plano.destaque} />

              <ul className="mt-6 flex-1 space-y-3 border-t border-preto/15 pt-6">
                {plano.itens.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug">
                    <Check size={18} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <BotaoWhatsapp
                texto={`Quero o plano ${plano.nome}`}
                mensagem={mensagemDoPlano(plano.nome)}
                variante={plano.destaque ? 'preto' : 'amarelo'}
                className="mt-9 w-full"
              />
            </Revelar>
          ))}
        </ul>

        <Revelar className="mt-8">
          <p className="max-w-[64ch] text-sm text-cinza">
            Valores sob consulta, de acordo com o plano e o número de atletas. Os
            planos podem ser combinados: um atleta no semanal na época da
            convocação e no mensal no resto do ano.
          </p>
        </Revelar>
      </div>
    </section>
  )
}

/**
 * O CALENDÁRIO DO PLANO.
 *
 * Quatro semanas lado a lado, e uma marca em cada semana com entrega. É o que
 * explica "semanal", "quinzenal" e "mensal" num relance: quatro marcas, duas
 * ou uma. Para quem lê com leitor de tela, a frase escondida diz o mesmo.
 */
function Ritmo({ semanas, destaque }: { semanas: readonly number[]; destaque?: boolean }) {
  return (
    <div className="mt-6">
      <p className="rotulo text-[0.625rem] text-preto/60" aria-hidden>
        Entregas no mês
      </p>
      <p className="sr-only">
        Entregas em {semanas.length} de 4 semanas do mês.
      </p>
      <ol aria-hidden className="mt-2.5 grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((semana) => {
          const entrega = semanas.includes(semana)
          return (
            <li
              key={semana}
              className={cn(
                'flex h-11 flex-col items-center justify-center rounded-sm text-[0.6875rem] font-semibold',
                entrega
                  ? destaque
                    ? 'bg-preto text-amarelo'
                    : 'bg-amarelo text-preto'
                  : destaque
                    ? 'bg-preto/10 text-preto/40'
                    : 'bg-papel text-preto/35',
              )}
            >
              <span>S{semana}</span>
              {entrega && <span aria-hidden className="mt-0.5 size-1.5 rounded-full bg-current" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
