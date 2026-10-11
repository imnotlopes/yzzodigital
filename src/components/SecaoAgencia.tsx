import { numeros } from '../data/numeros'
import { pecaSuaImagem, srcsetDe } from '../data/portfolio'
import { videoAgencia } from '../data/videos'
import { brand } from '../lib/brand'
import Dupla from './Dupla'
import Revelar from './Revelar'
import TituloSecao from './TituloSecao'
import Video from './Video'

/**
 * Bloco 2, a agência.
 *
 * É o "O ateliê" da Danielli com outro assunto: quem é, e o número que prova.
 * A mesma dupla de mídia (o grande é vídeo, o pequeno é foto com moldura
 * branca) e o mesmo texto curto ao lado.
 *
 * O VÍDEO É O DE BASTIDORES, E AINDA NÃO CHEGOU
 * ---------------------------------------------
 * Enquanto não chega, o espaço mostra o placeholder sobre a foto da
 * entrevista. A pequena é o post "Sua imagem também deveria", que é a tese da
 * agência num quadrado só.
 *
 * ⚠️ O parágrafo é meu, escrito a partir da bio e do feed. Confirmar o tom e
 * o que a agência quer dizer de si mesma.
 */
export default function SecaoAgencia() {
  return (
    <section id="agencia" className="bg-papel" aria-labelledby="titulo-agencia">
      <div className="container-yz secao">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <div className="mx-auto w-full max-w-md lg:order-2 lg:max-w-lg">
            <Dupla
              rotulo={videoAgencia.rotulo}
              grande={<Video video={videoAgencia} />}
              pequena={
                <img
                  src={pecaSuaImagem.pequena}
                  srcSet={srcsetDe(pecaSuaImagem)}
                  sizes="(max-width: 1023px) 45vw, 20vw"
                  alt={pecaSuaImagem.alt}
                  width={pecaSuaImagem.largura}
                  height={pecaSuaImagem.altura}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/5] w-full object-cover"
                />
              }
            />
          </div>

          <div className="lg:order-1">
            <Revelar>
              <TituloSecao id="titulo-agencia" barra="A agência">
                Marketing esportivo com <mark>DNA</mark> de futebol
              </TituloSecao>
            </Revelar>

            <Revelar atraso={120}>
              <p className="mt-8 max-w-[52ch] text-[1.0625rem] text-cinza">
                A {brand.nome} cuida da imagem de atletas de futebol, da base ao
                profissional. Da arte da convocação ao vídeo do jogo, cada
                conquista vira conteúdo à altura de quem entrou em campo.
              </p>
              <p className="mt-5 max-w-[52ch] text-[1.0625rem] text-cinza">
                Porque olheiro, clube e patrocinador também olham o perfil. E a
                primeira impressão fora de campo começa no jeito como o atleta se
                apresenta.
              </p>
            </Revelar>

            <Revelar atraso={220}>
              <dl className="mt-12 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-sm bg-borda">
                {numeros.map((numero) => (
                  <div key={numero.rotulo} className="bg-papel py-5 pr-4">
                    <dt className="sr-only">{numero.rotulo}</dt>
                    <dd>
                      <span className="t-h2 block">{numero.valor}</span>
                      <span className="mt-2 block text-sm text-cinza">{numero.rotulo}</span>
                    </dd>
                  </div>
                ))}
                <div className="bg-papel py-5 pl-6">
                  <dt className="sr-only">O que nos move</dt>
                  <dd>
                    <span className="t-h3 block leading-[1.05]">
                      Criatividade
                      <br />& Qualidade
                    </span>
                    <span className="mt-2 block text-sm text-cinza">o que nos move</span>
                  </dd>
                </div>
              </dl>
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  )
}
