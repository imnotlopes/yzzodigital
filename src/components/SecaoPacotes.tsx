import { ArrowRight, Check } from 'lucide-react'

import { dvd, formatarPreco, pacotesAtleta } from '../data/pacotes'
import { cn } from '../lib/utils'
import BotaoWhatsapp from './BotaoWhatsapp'
import Revelar from './Revelar'
import TituloSecao from './TituloSecao'

interface SecaoPacotesProps {
  /** Âncora da seção. */
  id?: string
  /**
   * De onde a pessoa vem, para a primeira linha da mensagem de WhatsApp. É
   * assim que a Yzzo sabe se o contato veio da landing ou da página de
   * parceiros, sem ferramenta nenhuma.
   */
  origem: 'pelo site' | 'pela página de parceiros'
  /** Na landing, o convite para o pacote de empresas, que mora em /parceiros. */
  comLinkEmpresas?: boolean
  fundo?: 'papel' | 'branco'
}

/**
 * OS PACOTES DO ATLETA.
 * ====================
 *
 * Os três da proposta da Yzzo, com o valor à mostra, e o DVD esportivo à
 * parte, porque ele é negociado caso a caso. Valores em data/pacotes.ts.
 *
 * O preço é o maior texto do cartão depois do nome: quem chega aqui quer
 * saber quanto custa, e esconder o valor de um pacote que tem valor fechado
 * só adiciona uma pergunta à conversa.
 *
 * A mesma seção aparece nas duas páginas. Na landing ela termina num
 * convite para o pacote de empresas; na de parceiros, o pacote de empresas
 * vem logo em seguida.
 */
export default function SecaoPacotes({
  id = 'pacotes',
  origem,
  comLinkEmpresas = false,
  fundo = 'papel',
}: SecaoPacotesProps) {
  return (
    <section id={id} className={fundo === 'branco' ? 'bg-branco' : 'bg-papel'} aria-labelledby={`titulo-${id}`}>
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao
            id={`titulo-${id}`}
            barra="Para atletas"
            descricao="Escolha o pacote do mês. As artes chegam prontas para postar."
          >
            Pacotes para <mark>atletas</mark>
          </TituloSecao>
        </Revelar>

        <ul className="mt-14 grid gap-4 lg:grid-cols-3">
          {pacotesAtleta.map((pacote, indice) => (
            <Revelar
              key={pacote.nome}
              como="li"
              atraso={indice * 110}
              className={cn(
                'flex flex-col rounded-sm p-7 md:p-9',
                pacote.destaque ? 'bg-amarelo' : 'border border-borda bg-branco',
              )}
            >
              <h3 className="t-h3">Pacote {pacote.nome}</h3>

              <p className="mt-5 flex items-baseline gap-2">
                <span className="t-display text-[4.25rem] leading-none md:text-[5rem]">
                  {formatarPreco(pacote.preco)}
                </span>
                <span className={cn('text-sm font-medium', pacote.destaque ? 'text-preto/70' : 'text-cinza')}>
                  /mês
                </span>
              </p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-preto/15 pt-6">
                {pacote.itens.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug">
                    <Check size={18} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <BotaoWhatsapp
                texto={`Quero o ${pacote.nome}`}
                mensagem={`Olá, Yzzo! Vim ${origem} e quero o pacote ${pacote.nome} (${formatarPreco(pacote.preco)}/mês).`}
                variante={pacote.destaque ? 'preto' : 'amarelo'}
                className="mt-9 w-full"
              />
            </Revelar>
          ))}
        </ul>

        {/* O DVD, à parte: não tem valor de tabela. */}
        <Revelar className="mt-4">
          <div className="flex flex-col gap-6 rounded-sm bg-preto p-7 text-branco md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <h3 className="t-h3 text-amarelo">{dvd.nome}</h3>
              <p className="mt-2 text-[0.9375rem] text-cinza-claro">
                {dvd.texto} {dvd.preco}.
              </p>
            </div>
            <BotaoWhatsapp
              texto="Quero o DVD"
              mensagem={`Olá, Yzzo! Vim ${origem} e quero saber sobre o DVD esportivo.`}
              className="shrink-0"
            />
          </div>
        </Revelar>

        {comLinkEmpresas && (
          <Revelar className="mt-12">
            <a
              href="/parceiros"
              className="group inline-flex items-center gap-3 text-[1.0625rem] font-semibold"
            >
              <span className="border-b-2 border-amarelo pb-0.5">
                É empresário ou assessoria? Conheça o pacote para empresas
              </span>
              <ArrowRight size={18} strokeWidth={2} aria-hidden className="shrink-0 transition-transform group-hover:translate-x-1" />
            </a>
          </Revelar>
        )}
      </div>
    </section>
  )
}
