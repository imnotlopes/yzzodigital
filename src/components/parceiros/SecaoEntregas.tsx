import { avulsos } from '../../data/planos'
import { artes, srcsetDe } from '../../data/portfolio'
import { videoMelhoresMomentos } from '../../data/videos'
import Dupla from '../Dupla'
import Revelar from '../Revelar'
import TituloSecao from '../TituloSecao'
import Video from '../Video'

/** A arte pequena da dupla: uma convocação, a entrega mais reconhecível. */
const ARTE = artes.find((arte) => arte.src.includes('convocado-sub-17')) ?? artes[0]

/**
 * O QUE O ATLETA RECEBE.
 *
 * A lista é a dos serviços que também se contratam avulsos (data/planos.ts),
 * e o vídeo de melhores momentos vem primeiro: é o "currículo em vídeo" que o
 * empresário leva ao clube, e o item que mais interessa a quem agencia.
 *
 * Lista numerada sobre o preto, e não cartões: são cinco coisas que se leem
 * de cima para baixo, como um cardápio, e cartão deixaria cinco caixas
 * disputando o olho.
 *
 * ⚠️ Os serviços são proposta, ver data/planos.ts.
 */
export default function SecaoEntregas() {
  return (
    <section className="bg-preto text-branco" aria-labelledby="titulo-entregas">
      <div className="container-yz secao grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        <div>
          <Revelar>
            <TituloSecao
              id="titulo-entregas"
              barra="As entregas"
              claro
              descricao="Tudo entra nos planos, e tudo também se contrata avulso."
            >
              O que o seu atleta <mark>recebe</mark>
            </TituloSecao>
          </Revelar>

          <ol className="mt-12 divide-y divide-branco/15 border-y border-branco/15">
            {avulsos.map((item, indice) => (
              <Revelar key={item.titulo} como="li" atraso={indice * 70} distancia="curta" className="flex gap-6 py-6">
                <span className="t-h3 w-10 shrink-0 text-amarelo">{String(indice + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="t-h3 text-branco">{item.titulo}</h3>
                  <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-cinza-claro">{item.texto}</p>
                </div>
              </Revelar>
            ))}
          </ol>
        </div>

        {/*
          A DUPLA DA LANDING, AGORA COM O VÍDEO QUE O EMPRESÁRIO QUER VER.

          O grande é o vídeo de melhores momentos (placeholder até o vídeo
          chegar, ver data/videos.ts) e o pequeno, com moldura, uma arte de
          convocação: as duas entregas que mais pesam, uma sobre a outra.
          Presa no alto enquanto a lista passa ao lado, no computador.
        */}
        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="lg:sticky lg:top-28">
            <Dupla
              grande={<Video video={videoMelhoresMomentos} />}
              pequena={
                <img
                  src={ARTE.pequena}
                  srcSet={srcsetDe(ARTE)}
                  sizes="(max-width: 1023px) 45vw, 18vw"
                  alt={ARTE.alt}
                  width={ARTE.largura}
                  height={ARTE.altura}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/5] w-full object-cover"
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
