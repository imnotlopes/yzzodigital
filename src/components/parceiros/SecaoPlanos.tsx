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
              <h3 className="t-h2">{plano.nome}</h3>
              <p className={cn('mt-3 min-h-[3lh] text-[0.9375rem] leading-snug', plano.destaque ? 'text-preto/80' : 'text-cinza')}>
                {plano.publico}
              </p>

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
