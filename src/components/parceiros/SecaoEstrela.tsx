import { Star } from 'lucide-react'

import { estrelaDoMes } from '../../data/pacotes'
import { artes, srcsetDe } from '../../data/portfolio'
import Revelar from '../Revelar'

/** O atleta de medalha no peito: a arte que mais parece "estrela do mês". */
const ARTE = artes.find((arte) => arte.src.includes('convocado-festival-sub-15')) ?? artes[0]

/**
 * A ESTRELA DO MÊS.
 *
 * O diferencial que a própria Yzzo pôs na proposta: cada agência escolhe um
 * atleta para ganhar mais destaque no mês. Ganha seção própria, em amarelo,
 * porque é a única coisa da página que nenhuma outra agência oferece com
 * esse nome.
 *
 * A arte com a estrela por cima é placeholder até a Etapa 2, quando entra o
 * vídeo "Estrela Matchday" que veio na mídia nova.
 */
export default function SecaoEstrela() {
  return (
    <section id="estrela" className="overflow-hidden bg-amarelo" aria-labelledby="titulo-estrela">
      <div className="container-yz secao grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        <div>
          <Revelar>
            <p className="flex items-center gap-2">
              {[0, 1, 2].map((estrela) => (
                <Star key={estrela} size={22} strokeWidth={0} fill="currentColor" aria-hidden />
              ))}
            </p>
            <h2 id="titulo-estrela" className="t-display mt-6">
              Estrela
              <br />
              do Mês
            </h2>
          </Revelar>

          <Revelar atraso={120}>
            <p className="mt-8 max-w-[44ch] text-[1.1875rem] leading-snug md:text-[1.375rem]">
              {estrelaDoMes.texto}
            </p>
            <p className="mt-6 max-w-[52ch] border-l-2 border-preto pl-5 text-[1rem] text-preto/75">
              {estrelaDoMes.recomendacao}
            </p>
          </Revelar>
        </div>

        <Revelar distancia="nenhuma" className="relative mx-auto w-full max-w-sm">
          <img
            src={ARTE.pequena}
            srcSet={srcsetDe(ARTE)}
            sizes="(max-width: 1023px) 80vw, 28vw"
            alt={ARTE.alt}
            width={ARTE.largura}
            height={ARTE.altura}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rotate-2 rounded-sm object-cover shadow-[0_24px_50px_rgb(0_0_0/0.28)]"
          />
          <span
            aria-hidden
            className="absolute -top-4 left-3 flex size-20 items-center justify-center rounded-full bg-preto text-amarelo shadow-lg md:-left-5 md:-top-5 md:size-24"
          >
            <Star size={40} strokeWidth={0} fill="currentColor" />
          </span>
        </Revelar>
      </div>
    </section>
  )
}
