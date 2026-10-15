import { ArrowRight, Check, Clapperboard, Play } from 'lucide-react'

import {
  custoPorPeca,
  dvd,
  formatarPreco,
  pacoteVantajoso,
  pacotesAtleta,
  type PacoteAtleta,
} from '../data/pacotes'
import { artes, matchDays } from '../data/portfolio'
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
  origem: string
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
 * O QUE O CARTÃO MOSTRA, DE CIMA PARA BAIXO
 * ----------------------------------------
 *   1. o nome e para quem ele é
 *   2. AS PEÇAS DO MÊS, DESENHADAS: uma miniatura de arte de verdade para
 *      cada peça que o pacote entrega. "Até 5 artes + 1 de novo clube" é uma
 *      frase que se lê; seis miniaturas lado a lado é uma quantidade que se
 *      vê, e a diferença entre os pacotes fica óbvia sem comparar listas.
 *   3. o preço, grande, com o "R$" pequeno: é o número que a pessoa procura
 *   4. quanto sai cada peça, que é só a divisão do preço pelas peças
 *   5. a lista e o botão, que abre o WhatsApp já com o pacote e o valor
 *
 * O DESTAQUE É CALCULADO
 * ----------------------
 * O cartão escuro é o de menor custo por peça (hoje o Profissional, R$ 19,17
 * por arte). Não é escolha minha de "mais vendido", que eu não sei: é a
 * conta, e continua certa se a Yzzo mudar preço ou quantidade.
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
            lado
            descricao="Talento sem visibilidade não é visto. Escolha o pacote do mês: as artes chegam prontas para postar."
          >
            Pacotes para <mark>atletas</mark>
          </TituloSecao>
        </Revelar>

        {/*
          Uma coluna até 1024px, mas estreita e no centro: esticado na largura
          de um tablet, o cartão vira uma faixa com o preço perdido no meio.
        */}
        <ul className="mx-auto mt-14 grid max-w-xl items-stretch gap-4 lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:gap-5">
          {pacotesAtleta.map((pacote, indice) => (
            <Revelar key={pacote.nome} como="li" atraso={indice * 110} className="flex">
              <CartaoPacote pacote={pacote} origem={origem} />
            </Revelar>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-cinza">
          Valores por mês. A conta por arte é o preço dividido pelas peças do pacote.
        </p>

        <Revelar className={cn('mt-10 grid gap-4', comLinkEmpresas && 'lg:grid-cols-2')}>
          <FaixaDvd origem={origem} sozinha={!comLinkEmpresas} />
          {comLinkEmpresas && <FaixaEmpresas />}
        </Revelar>
      </div>
    </section>
  )
}

function CartaoPacote({ pacote, origem }: { pacote: PacoteAtleta; origem: SecaoPacotesProps['origem'] }) {
  const destaque = pacote === pacoteVantajoso
  const porPeca = custoPorPeca(pacote)

  return (
    <article
      className={cn(
        'cartao-elevar relative flex w-full flex-col overflow-hidden rounded-sm p-7 md:p-8',
        destaque ? 'fundo-escuro ring-2 ring-amarelo' : 'border border-borda bg-branco',
      )}
    >
      {destaque && (
        <span className="rotulo absolute right-0 top-0 rounded-bl-sm bg-amarelo px-3 py-2 text-[0.625rem] text-preto">
          Melhor custo por arte
        </span>
      )}

      <p className={cn('rotulo text-[0.6875rem]', destaque ? 'text-amarelo' : 'text-cinza')}>Pacote</p>
      {/*
        O nome acompanha a largura da tela: no tamanho de título de seção,
        "Profissional" não cabia no cartão entre 1024 e 1280px.
      */}
      <h3
        className={cn(
          't-h2 mt-1 text-[clamp(2.75rem,4.2vw,4.25rem)]',
          destaque ? 'text-branco' : 'text-preto',
        )}
      >
        {pacote.nome}
      </h3>
      <p className={cn('mt-2 text-[0.9375rem] leading-snug lg:min-h-[3lh] xl:min-h-[2lh]', destaque ? 'text-cinza-claro' : 'text-cinza')}>
        {pacote.publico}
      </p>

      <PecasDoMes pacote={pacote} escuro={destaque} />

      <div className={cn('mt-7 border-t pt-6', destaque ? 'border-branco/15' : 'border-preto/10')}>
        <p className="flex items-start gap-1.5">
          <span className={cn('mt-2 font-sans text-lg font-semibold', destaque ? 'text-amarelo' : 'text-preto')}>R$</span>
          <span className={cn('t-display text-[5.25rem] leading-[0.85]', destaque ? 'text-branco' : 'text-preto')}>
            {pacote.preco}
          </span>
          <span className={cn('mt-auto pb-1 text-sm font-medium', destaque ? 'text-cinza-claro' : 'text-cinza')}>/mês</span>
        </p>
        <p className={cn('mt-3 text-sm', destaque ? 'text-cinza-claro' : 'text-cinza')}>
          <strong className={cn('font-semibold', destaque ? 'text-amarelo' : 'text-preto')}>
            {formatarPreco(porPeca, true)}
          </strong>{' '}
          por arte
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {pacote.itens.map((item) => (
          <li
            key={item}
            className={cn('flex gap-3 text-[0.9375rem] leading-snug', destaque ? 'text-branco' : 'text-preto')}
          >
            <span
              className={cn(
                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
                destaque ? 'bg-amarelo text-preto' : 'bg-preto text-amarelo',
              )}
            >
              <Check size={12} strokeWidth={3} aria-hidden />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <BotaoWhatsapp
        texto={`Quero o ${pacote.nome}`}
        mensagem={`Olá, Yzzo! Vim ${origem} e quero o pacote ${pacote.nome} (${formatarPreco(pacote.preco)}/mês).`}
        variante={destaque ? 'amarelo' : 'preto'}
        className="mt-8 w-full"
      />
    </article>
  )
}

/** Miniaturas de onde sai cada peça, por tipo. Trabalho real da Yzzo. */
const MINIATURAS = {
  artes: [artes[0], matchDays[1], artes[3], matchDays[0], artes[1]],
  motion: [matchDays[0], matchDays[1], matchDays[2], matchDays[5]],
  novoClube: artes.find((arte) => arte.src.includes('temporada-2025')) ?? artes[0],
}

/**
 * AS PEÇAS DO MÊS, UMA MINIATURA POR PEÇA.
 *
 * Arte estática é a miniatura pura; Motion ganha o ícone de play; a de novo
 * clube ganha a etiqueta. A quantidade de miniaturas é a quantidade do pacote.
 */
function PecasDoMes({ pacote, escuro }: { pacote: PacoteAtleta; escuro: boolean }) {
  const pecas = [
    ...MINIATURAS.artes.slice(0, pacote.pecas.artes).map((imagem) => ({ imagem, tipo: 'arte' as const })),
    ...MINIATURAS.motion.slice(0, pacote.pecas.motion).map((imagem) => ({ imagem, tipo: 'motion' as const })),
    ...Array.from({ length: pacote.pecas.novoClube }, () => ({ imagem: MINIATURAS.novoClube, tipo: 'novo-clube' as const })),
  ]

  return (
    <div className="mt-6">
      <p className={cn('rotulo text-[0.625rem]', escuro ? 'text-cinza-claro' : 'text-preto/55')}>
        Peças no mês · {pecas.length}
      </p>
      <ul className="mt-3 grid grid-cols-6 gap-1.5" aria-hidden>
        {pecas.map(({ imagem, tipo }, indice) => (
          <li
            key={`${tipo}-${indice}`}
            className={cn(
              'relative aspect-[4/5] overflow-hidden rounded-[0.25rem]',
              tipo === 'novo-clube' && 'ring-2 ring-amarelo',
            )}
          >
            <img
              src={imagem.mini}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-top"
            />
            {tipo === 'motion' && (
              <span className="absolute inset-0 flex items-center justify-center bg-preto/35 text-branco">
                <Play size={12} strokeWidth={0} fill="currentColor" />
              </span>
            )}
          </li>
        ))}
      </ul>
      {/*
        A legenda existe nos três cartões, invisível onde não se aplica: sem
        ela, o preço do Essencial ficaria mais alto que o dos vizinhos e os
        três valores deixariam de se alinhar.
      */}
      <p
        aria-hidden={pacote.pecas.novoClube === 0 || undefined}
        className={cn(
          'mt-2 flex items-center gap-1.5 text-[0.75rem]',
          escuro ? 'text-cinza-claro' : 'text-cinza',
          pacote.pecas.novoClube === 0 && 'invisible',
        )}
      >
        <span className="inline-block size-2.5 rounded-[2px] ring-2 ring-amarelo" />
        anúncio de novo clube
      </p>
    </div>
  )
}

/** O DVD, à parte: não tem valor de tabela. */
function FaixaDvd({ origem, sozinha }: { origem: SecaoPacotesProps['origem']; sozinha: boolean }) {
  return (
    <div
      className={cn(
        'fundo-escuro flex flex-col justify-between gap-6 overflow-hidden rounded-sm p-7 md:p-8',
        /* Na largura toda, o botão vai para a direita, na mesma linha. */
        sozinha && 'md:flex-row md:items-center',
      )}
    >
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amarelo text-preto">
          <Clapperboard size={20} strokeWidth={2} aria-hidden />
        </span>
        <div>
          <h3 className="t-h3 text-branco">{dvd.nome}</h3>
          <p className="mt-2 text-[0.9375rem] text-cinza-claro">
            {dvd.texto} <span className="text-branco">{dvd.preco}.</span>
          </p>
        </div>
      </div>
      <BotaoWhatsapp
        texto="Quero o DVD"
        mensagem={`Olá, Yzzo! Vim ${origem} e quero saber sobre o DVD esportivo.`}
        className={cn('w-full shrink-0 sm:w-auto', !sozinha && 'sm:self-start')}
      />
    </div>
  )
}

/** O caminho para o pacote de empresas, que mora em /parceiros. */
function FaixaEmpresas() {
  return (
    <a
      href="/parceiros"
      className="cartao-elevar group flex flex-col justify-between gap-6 rounded-sm bg-amarelo p-7 md:p-8"
    >
      <div>
        <p className="rotulo text-[0.6875rem] text-preto/70">Para empresas e assessorias</p>
        <h3 className="t-h3 mt-2 text-preto">É empresário ou cuida de vários atletas?</h3>
        <p className="mt-2 text-[0.9375rem] text-preto/75">
          Contratação semanal, quinzenal ou mensal, com valor por atleta.
        </p>
      </div>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-preto">
        Ver o pacote para empresas
        <ArrowRight size={18} strokeWidth={2} aria-hidden className="transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  )
}
