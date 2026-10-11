import { novosClientes } from '../data/portfolio'
import { linkInstagram } from '../lib/brand'
import { IconeInstagram } from './icones'
import Faixa from './Faixa'
import Revelar from './Revelar'
import TituloSecao from './TituloSecao'

/**
 * Bloco 5, a prova social: quem já é #TimeYzzoDigital.
 *
 * É o lugar das avaliações do Google da Danielli, e com o mesmo motor: uma
 * faixa lenta que para no dedo e no mouse. Aqui os cartões são os posts
 * "Novo Cliente!", que a agência já publica a cada atleta que fecha. Cada um
 * é um atleta real, com nome e clube, e é isso que os torna prova e não
 * enfeite.
 *
 * Quando houver depoimento de atleta ou de pai, ele entra aqui, intercalado
 * com os posts.
 */
export default function SecaoTime() {
  return (
    <section className="overflow-hidden bg-amarelo" aria-labelledby="titulo-time">
      <div className="container-yz pt-[var(--secao-m)]">
        <Revelar>
          <TituloSecao
            id="titulo-time"
            barra={false}
            descricao="Atletas que confiaram a própria imagem à Yzzo. Cada um ganhou o seu post de boas-vindas."
          >
            Quem já é #TimeYzzoDigital
          </TituloSecao>
        </Revelar>
      </div>

      <Revelar distancia="curta" className="mt-12 md:mt-14">
        <Faixa
          itens={novosClientes}
          chave={(post) => post.src}
          duracao={novosClientes.length * 6}
          respiro="0.5rem"
          nome="os novos clientes"
          desenhar={(post) => (
            <img
              src={post.pequena}
              alt={post.alt}
              width={600}
              height={750}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-56 rounded-sm object-cover shadow-[0_10px_30px_rgb(0_0_0/0.18)] md:w-72"
            />
          )}
        />
      </Revelar>

      <div className="container-yz flex justify-center pb-[var(--secao-m)] pt-10">
        <a
          href={linkInstagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-preto"
        >
          <IconeInstagram width={18} height={18} />
          Ver tudo no Instagram
        </a>
      </div>
    </section>
  )
}
