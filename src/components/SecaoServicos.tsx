import { servicos, sobre } from '../data/servicos'
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
export default function SecaoServicos() {
  return (
    <section id="servicos" className="bg-preto text-branco" aria-labelledby="titulo-servicos">
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao id="titulo-servicos" barra="A Yzzo" claro descricao={sobre}>
            O que a <mark>Yzzo</mark> faz
          </TituloSecao>
        </Revelar>

        <ul className="mt-14 grid grid-cols-2 gap-3 md:gap-4 lg:mt-16 lg:grid-cols-3">
          {servicos.map((servico, indice) => (
            <Revelar
              key={servico.titulo}
              como="li"
              atraso={(indice % 3) * 90}
              className="group flex flex-col overflow-hidden rounded-sm bg-grafite"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={servico.imagem}
                  alt={servico.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-[50%_22%] transition-transform duration-700 ease-suave group-hover:scale-105"
                />
                <span className="t-h3 absolute left-0 top-0 bg-amarelo px-2.5 pb-0.5 pt-1.5 text-[1.375rem] text-preto md:px-3 md:pb-1 md:pt-2 md:text-[2rem]">
                  {String(indice + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4 md:p-6">
                <h3 className="t-h3 text-[1.5rem] text-branco md:text-[2.25rem]">{servico.titulo}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-cinza-claro md:mt-3 md:text-[0.9375rem]">
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
