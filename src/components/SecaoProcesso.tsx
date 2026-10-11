import { passos } from '../data/processo'
import Revelar from './Revelar'
import TituloSecao from './TituloSecao'

/**
 * Bloco 6, como funciona.
 *
 * Quatro passos, e cada um cabe numa linha lida de relance. O número é grande
 * e o texto é curto: a pessoa não vai ler um processo, vai conferir que existe
 * um.
 *
 * ⚠️ Texto provisório, ver data/processo.ts.
 */
export default function SecaoProcesso() {
  return (
    <section className="bg-papel" aria-labelledby="titulo-processo">
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao id="titulo-processo" barra="Como trabalhamos">
            Do primeiro contato ao <mark>feed</mark>
          </TituloSecao>
        </Revelar>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {passos.map((passo, indice) => (
            <Revelar
              key={passo.titulo}
              como="li"
              atraso={indice * 90}
              className="border-t-2 border-preto pt-5"
            >
              <span aria-hidden className="t-display block text-[5rem] text-amarelo [-webkit-text-stroke:1.5px_var(--preto)]">
                {indice + 1}
              </span>
              <h3 className="t-h3 mt-3">{passo.titulo}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-cinza">{passo.texto}</p>
            </Revelar>
          ))}
        </ol>
      </div>
    </section>
  )
}
