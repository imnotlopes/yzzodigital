import { ArrowRight } from 'lucide-react'

import { paraAgencias, servicos } from '../data/servicos'
import Revelar from './Revelar'
import TituloSecao from './TituloSecao'

/**
 * Bloco 3, os serviços. A primeira folha escura da página.
 *
 * O preto é o do post "Grandes conquistas": depois de duas seções de papel, a
 * troca de fundo diz "mudou o assunto" sem precisar de título nenhum.
 *
 * Cada serviço ganha uma imagem de trabalho real, e não ícone. Ícone de
 * câmera para "fotografia" é o que qualquer agência tem; a foto de um atleta
 * fotografando o próprio troféu só esta tem.
 */
export default function SecaoServicos() {
  return (
    <section id="servicos" className="bg-preto text-branco" aria-labelledby="titulo-servicos">
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao
            id="titulo-servicos"
            barra="Serviços"
            claro
            descricao="Tudo o que o atleta precisa para ser visto do jeito certo, dentro e fora de campo."
          >
            O que a <mark>Yzzo</mark> faz
          </TituloSecao>
        </Revelar>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {servicos.map((servico, indice) => (
            <Revelar
              key={servico.titulo}
              como="li"
              atraso={indice * 90}
              className="group flex flex-col overflow-hidden rounded-sm bg-grafite"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={servico.imagem}
                  alt={servico.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 ease-suave group-hover:scale-105"
                />
                <span className="t-h3 absolute left-0 top-0 bg-amarelo px-3 pb-1 pt-2 text-preto">
                  {String(indice + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="t-h3 text-branco">{servico.titulo}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-cinza-claro">{servico.texto}</p>
              </div>
            </Revelar>
          ))}
        </ul>

        {/*
          O destaque "Agências" do Instagram: o outro público da agência. Leva
          para a página de parceiros, que explica planos e processo, e não
          direto para o WhatsApp: quem tem uma carteira de atletas quer
          entender como funciona antes de chamar.
        */}
        <Revelar className="mt-4">
          <a
            href="/parceiros"
            className="group flex flex-col gap-4 rounded-sm border border-branco/15 p-6 transition-colors
                       hover:border-amarelo md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div>
              <h3 className="t-h3 text-amarelo">{paraAgencias.titulo}</h3>
              <p className="mt-2 max-w-[60ch] text-[0.9375rem] text-cinza-claro">{paraAgencias.texto}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              Ver como funciona
              <ArrowRight
                size={18}
                strokeWidth={2}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </a>
        </Revelar>
      </div>
    </section>
  )
}
