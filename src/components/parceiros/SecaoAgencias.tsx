import { vantagensAgencia } from '../../data/planos'
import { artes, srcsetDe } from '../../data/portfolio'
import Revelar from '../Revelar'
import TituloSecao from '../TituloSecao'

/** A "2025", que saiu assinada pela Yzzo junto com outra marca. */
const ARTE_EM_PARCERIA = artes.find((arte) => arte.src.includes('temporada-2025')) ?? artes[0]

/**
 * PARA QUEM TEM UMA CARTEIRA DE ATLETAS.
 *
 * O que muda quando quem contrata não é o atleta, é a agência: pacote por
 * atleta, a marca dela nas artes, prazo de urgência e um contato só.
 *
 * A arte ao lado é a prova da segunda vantagem: ela já saiu com duas
 * assinaturas no Instagram da Yzzo. A legenda não diz o nome da marca
 * parceira de propósito: citar o parceiro numa página de vendas é coisa a
 * combinar com ele antes.
 *
 * ⚠️ As vantagens são proposta, ver data/planos.ts.
 */
export default function SecaoAgencias() {
  return (
    <section className="relative overflow-hidden bg-preto text-branco" aria-labelledby="titulo-agencias">
      <div aria-hidden className="caco caco--b -bottom-px left-0 h-24 w-1/3 md:h-32" />
      <div className="container-yz secao relative grid items-center gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Revelar distancia="nenhuma" className="mx-auto w-full max-w-sm lg:max-w-none">
          <figure>
            <img
              src={ARTE_EM_PARCERIA.pequena}
              srcSet={srcsetDe(ARTE_EM_PARCERIA)}
              sizes="(max-width: 1023px) 80vw, 30vw"
              alt={ARTE_EM_PARCERIA.alt}
              width={ARTE_EM_PARCERIA.largura}
              height={ARTE_EM_PARCERIA.altura}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full -rotate-2 rounded-sm object-cover shadow-[0_18px_40px_rgb(0_0_0/0.5)]"
            />
            <figcaption className="mt-4 text-sm text-cinza-claro">
              Arte assinada pela Yzzo em conjunto com uma agência parceira.
            </figcaption>
          </figure>
        </Revelar>

        <div>
          <Revelar>
            <TituloSecao id="titulo-agencias" barra="Para agências" claro>
              Para quem tem uma <mark>carteira</mark> de atletas
            </TituloSecao>
          </Revelar>

          <ul className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {vantagensAgencia.map((vantagem, indice) => (
              <Revelar key={vantagem.titulo} como="li" atraso={indice * 90} className="border-t border-branco/20 pt-5">
                <span className="t-h3 text-amarelo">{String(indice + 1).padStart(2, '0')}</span>
                <h3 className="t-h3 mt-2 text-branco">{vantagem.titulo}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-cinza-claro">{vantagem.texto}</p>
              </Revelar>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
