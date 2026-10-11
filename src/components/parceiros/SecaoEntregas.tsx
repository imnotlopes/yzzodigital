import { avulsos } from '../../data/planos'
import { fotos, srcsetDe } from '../../data/portfolio'
import Revelar from '../Revelar'
import TituloSecao from '../TituloSecao'

/** A foto ao lado da lista: o atleta segurando a flâmula, antes do jogo. */
const FOTO = fotos.find((foto) => foto.src.includes('flamula')) ?? fotos[0]

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

        <Revelar distancia="nenhuma" className="hidden lg:block">
          <img
            src={FOTO.pequena}
            srcSet={srcsetDe(FOTO)}
            sizes="35vw"
            alt={FOTO.alt}
            width={FOTO.largura}
            height={FOTO.altura}
            loading="lazy"
            decoding="async"
            className="sticky top-28 aspect-[4/5] w-full rounded-sm object-cover"
          />
        </Revelar>
      </div>
    </section>
  )
}
