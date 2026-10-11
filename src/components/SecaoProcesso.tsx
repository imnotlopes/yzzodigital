import { ArrowRight } from 'lucide-react'

import { passos } from '../data/processo'
import Revelar from './Revelar'
import TituloSecao from './TituloSecao'

interface SecaoProcessoProps {
  /** Âncora da seção. A página de parceiros aponta o topo para ela. */
  id?: string
  /** Na landing, o convite para a página completa de parceiros. */
  comLinkParceiros?: boolean
  /** Fundo da seção, para alternar com a vizinha. */
  fundo?: 'papel' | 'branco'
}

/**
 * Como funciona, em seis passos. A mesma resposta nas duas páginas, ver
 * data/processo.ts.
 *
 * O número é grande e o texto é curto: a pessoa não vai ler um processo, vai
 * conferir que existe um. Três colunas no computador, duas linhas de três.
 *
 * ⚠️ Texto provisório.
 */
export default function SecaoProcesso({
  id,
  comLinkParceiros = false,
  fundo = 'papel',
}: SecaoProcessoProps) {
  return (
    <section
      id={id}
      className={fundo === 'branco' ? 'bg-branco' : 'bg-papel'}
      aria-labelledby="titulo-processo"
    >
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao id="titulo-processo" barra="Como trabalhamos">
            Do primeiro contato ao <mark>feed</mark>
          </TituloSecao>
        </Revelar>

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {passos.map((passo, indice) => (
            <Revelar
              key={passo.titulo}
              como="li"
              atraso={(indice % 3) * 90}
              className="border-t-2 border-preto pt-5"
            >
              <span aria-hidden className="t-display block text-[4.5rem] text-amarelo [-webkit-text-stroke:1.5px_var(--preto)]">
                {indice + 1}
              </span>
              <h3 className="t-h3 mt-3">{passo.titulo}</h3>
              <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-cinza">{passo.texto}</p>
            </Revelar>
          ))}
        </ol>

        {comLinkParceiros && (
          <Revelar className="mt-14">
            <a href="/parceiros" className="btn btn-preto">
              <span>
                Para agências e empresários
                <span className="hidden sm:inline">: veja como funciona</span>
              </span>
              <ArrowRight size={17} strokeWidth={2} aria-hidden />
            </a>
          </Revelar>
        )}
      </div>
    </section>
  )
}
