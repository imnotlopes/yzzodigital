import { servicos, sobre, srcsetServico } from '../data/servicos'
import Revelar from './Revelar'
import TituloSecao from './TituloSecao'

/**
 * Bloco 2, quem é a Yzzo e o que ela faz. A primeira folha escura da página.
 *
 * Era duas seções: "A agência", com texto e uma dupla de vídeo e foto, e
 * "Serviços". A Yzzo pediu menos informação (áudio de outubro de 2026), e o
 * "sobre" da proposta dela cabe numa frase, que virou a linha de apoio do
 * título. Ficam os seis serviços, com uma imagem de trabalho real cada.
 *
 * O preto é o do post "Grandes conquistas": depois da capa de papel, a troca
 * de fundo diz "mudou o assunto" sem precisar de título nenhum.
 */
/**
 * A largura da imagem do cartão: 36% da linha no celular, metade da tela em
 * duas colunas, um terço do container em três.
 */
const TAMANHO_SERVICO = '(max-width: 639px) calc(36vw - 1rem), (max-width: 1023px) 46vw, 25rem'

export default function SecaoServicos() {
  return (
    <section id="servicos" className="fundo-escuro adiar" aria-labelledby="titulo-servicos">
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao id="titulo-servicos" barra="A Yzzo" claro lado descricao={sobre}>
            O que a <mark>Yzzo</mark> faz
          </TituloSecao>
        </Revelar>

        {/*
          No celular, um serviço por linha, com a imagem quadrada ao lado do
          texto. Em duas colunas, numa tela de 360px, cada cartão ficava com
          140px de largura e o texto quebrava em cinco linhas de letra miúda.
        */}
        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:mt-16 lg:grid-cols-3">
          {servicos.map((servico, indice) => (
            <Revelar
              key={servico.titulo}
              como="li"
              atraso={(indice % 3) * 90}
              className="cartao-elevar group flex overflow-hidden rounded-sm bg-grafite ring-1 ring-branco/[0.06] sm:flex-col"
            >
              <div className="relative aspect-square w-[36%] shrink-0 overflow-hidden sm:aspect-[4/3] sm:w-auto">
                {/* AVIF para quem abre: os seis cartões ficam logo abaixo da capa, e
                    no 4G disputavam a conexão com a foto dela. */}
                <picture className="contents">
                  <source type="image/avif" srcSet={srcsetServico(servico.imagem, 'avif')} sizes={TAMANHO_SERVICO} />
                  <img
                    src={servico.imagem}
                    srcSet={srcsetServico(servico.imagem, 'webp')}
                    sizes={TAMANHO_SERVICO}
                    alt={servico.alt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover object-[50%_22%] transition-transform duration-700 ease-suave group-hover:scale-105"
                  />
                </picture>
                <span className="t-h3 absolute left-0 top-0 bg-amarelo px-2.5 pb-0.5 pt-1.5 text-[1.375rem] text-preto md:px-3 md:pb-1 md:pt-2 md:text-[2rem]">
                  {String(indice + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center p-4 sm:justify-start md:p-6">
                <h3 className="t-h3 text-[1.75rem] text-branco md:text-[2.25rem]">{servico.titulo}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-snug text-cinza-claro md:mt-3 md:text-[0.9375rem] md:leading-relaxed">
                  {servico.texto}
                </p>
              </div>
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  )
}
