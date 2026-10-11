import { Plus } from 'lucide-react'

import { duvidas } from '../../data/duvidas'
import Revelar from '../Revelar'
import TituloSecao from '../TituloSecao'

/**
 * AS DÚVIDAS DE QUEM AGENCIA.
 *
 * `<details>` nativo, e não um acordeão em JavaScript: abre e fecha no
 * teclado e no leitor de tela sem uma linha de código, e funciona até antes
 * de o React carregar. O "+" gira para "×" quando abre, só com CSS.
 *
 * Duas colunas no computador: título à esquerda, perguntas à direita. Quem
 * chega aqui veio procurar uma resposta específica, e a lista precisa ser
 * varrida de cima a baixo num olhar.
 *
 * ⚠️ Respostas provisórias, ver data/duvidas.ts.
 */
export default function SecaoDuvidas() {
  return (
    <section id="duvidas" className="bg-papel" aria-labelledby="titulo-duvidas">
      <div className="container-yz secao grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Revelar>
          <TituloSecao
            id="titulo-duvidas"
            barra="Dúvidas"
            descricao="O que os empresários mais perguntam antes de fechar."
          >
            Perguntas <mark>frequentes</mark>
          </TituloSecao>
        </Revelar>

        <Revelar atraso={120}>
          <ul className="border-t border-preto/15">
            {duvidas.map((duvida) => (
              <li key={duvida.pergunta} className="border-b border-preto/15">
                <details className="group">
                  <summary
                    className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5
                               [&::-webkit-details-marker]:hidden"
                  >
                    <span className="t-h3 text-[1.5rem] md:text-[1.75rem]">{duvida.pergunta}</span>
                    <span
                      aria-hidden
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amarelo
                                 transition-transform duration-300 ease-suave group-open:rotate-45"
                    >
                      <Plus size={20} strokeWidth={2.25} />
                    </span>
                  </summary>
                  <p className="max-w-[58ch] pb-6 pr-16 text-[1rem] leading-relaxed text-cinza">
                    {duvida.resposta}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </Revelar>
      </div>
    </section>
  )
}
