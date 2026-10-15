import { Star } from 'lucide-react'

import { estrelaDoMes, textoEstrela } from '../../data/pacotes'
import { matchDayEstrela } from '../../data/videos'
import { agenciaDoLink } from '../../lib/agencia'
import Revelar from '../Revelar'
import Video from '../Video'

/**
 * A ESTRELA DO MÊS.
 *
 * O diferencial que a própria Yzzo pôs na proposta: cada agência escolhe um
 * atleta para ganhar mais destaque no mês. Ganha seção própria, em amarelo,
 * porque é a única coisa da página que nenhuma outra agência oferece com
 * esse nome.
 *
 * Ao lado, um Match Day em Motion, girado como um post fixado: é o tipo de
 * conteúdo que a Estrela do Mês ganha a mais. O vídeo é do FC Estrela pela
 * Copa Goiás; a coincidência do nome é bem-vinda, mas não é o motivo.
 */
export default function SecaoEstrela() {
  return (
    <section id="estrela" className="adiar overflow-hidden bg-amarelo" aria-labelledby="titulo-estrela">
      <div className="container-yz secao grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
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
              {textoEstrela(agenciaDoLink)}
            </p>
            <p className="mt-6 max-w-[52ch] border-l-2 border-preto pl-5 text-[1rem] text-preto/75">
              {estrelaDoMes.recomendacao}
            </p>
          </Revelar>
        </div>

        <Revelar distancia="nenhuma" className="relative mx-auto w-full max-w-[17rem] md:max-w-[19rem]">
          <Video
            video={matchDayEstrela}
            className="rotate-2 rounded-sm shadow-[0_24px_50px_rgb(0_0_0/0.28)]"
          />
          <span
            aria-hidden
            className="absolute -left-4 -top-4 flex size-20 items-center justify-center rounded-full bg-preto text-amarelo shadow-lg md:-left-6 md:-top-6 md:size-24"
          >
            <Star size={40} strokeWidth={0} fill="currentColor" />
          </span>
        </Revelar>
      </div>
    </section>
  )
}
