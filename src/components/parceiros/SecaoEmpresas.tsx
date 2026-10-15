import { definicoesDaParceria, modalidades } from '../../data/pacotes'
import { servicos } from '../../data/servicos'
import BotaoWhatsapp from '../BotaoWhatsapp'
import Revelar from '../Revelar'
import Ritmo from '../Ritmo'
import TituloSecao from '../TituloSecao'
import { MENSAGEM_PARCEIRO } from './mensagens'

/**
 * O PACOTE PARA EMPRESAS E ASSESSORIAS.
 * ====================================
 *
 * Tudo da proposta da Yzzo, e só isso: as três modalidades de contratação,
 * o que se define junto depois de fechar e a frase de início dos trabalhos.
 *
 * SEM PREÇO, DE PROPÓSITO
 * -----------------------
 * O valor é por atleta e sai da conversa, junto com a quantidade de atletas
 * e as artes. Por isso as modalidades não têm cartão de preço: têm o
 * calendário de entregas, que é o que realmente muda de uma para outra, e a
 * seção inteira termina num botão só.
 *
 * Os serviços entram como etiquetas porque o empresário escolhe entre eles
 * ("os serviços e as artes que serão produzidos"), e a lista completa, com
 * imagem, mora na landing.
 */
export default function SecaoEmpresas() {
  return (
    <section id="empresas" className="fundo-escuro" aria-labelledby="titulo-empresas">
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao
            id="titulo-empresas"
            barra="Para empresas"
            claro
            lado
            descricao="Parcerias com empresas e assessorias esportivas, com contratação semanal, quinzenal ou mensal, conforme a necessidade de cada parceiro."
          >
            Pacote para <mark>empresas</mark> e assessorias
          </TituloSecao>
        </Revelar>

        <ul className="mt-14 grid gap-3 sm:grid-cols-3 md:gap-4">
          {modalidades.map((modalidade, indice) => (
            <Revelar
              key={modalidade.nome}
              como="li"
              atraso={indice * 100}
              className="cartao-elevar rounded-sm border border-branco/10 bg-grafite p-6 md:p-7"
            >
              <h3 className="t-h2 mb-6 text-branco">{modalidade.nome}</h3>
              <Ritmo semanas={modalidade.semanas} escuro />
            </Revelar>
          ))}
        </ul>

        {/* Como funciona a parceria: os quatro pontos da proposta. */}
        <div className="mt-20 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Revelar>
            <h3 className="t-h2 text-branco">Como funciona a parceria</h3>
            <p className="mt-6 max-w-[42ch] text-[1.0625rem] text-cinza-claro">
              Depois de fechar a parceria entre a Yzzo Digital e a sua empresa,
              definimos juntos:
            </p>
          </Revelar>

          <div>
            <ol className="border-t border-branco/15">
              {definicoesDaParceria.map((definicao, indice) => (
                <Revelar
                  key={definicao}
                  como="li"
                  atraso={indice * 80}
                  distancia="curta"
                  className="flex items-baseline gap-6 border-b border-branco/15 py-5"
                >
                  <span className="t-h3 w-9 shrink-0 text-amarelo">{String(indice + 1).padStart(2, '0')}</span>
                  <span className="t-h3 text-[1.5rem] text-branco md:text-[1.875rem]">{definicao}</span>
                </Revelar>
              ))}
            </ol>

            <Revelar className="mt-8">
              <p className="rotulo text-[0.625rem] text-cinza-claro">Serviços</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {servicos.map((servico) => (
                  <li
                    key={servico.titulo}
                    className="rounded-full border border-branco/20 px-4 py-2 text-sm text-branco"
                  >
                    {servico.titulo}
                  </li>
                ))}
              </ul>
            </Revelar>

            <Revelar className="mt-10">
              <p className="max-w-[52ch] text-[1.0625rem] text-cinza-claro">
                Com tudo alinhado, começamos os trabalhos, com organização entre
                as duas empresas e qualidade para os atletas envolvidos.
              </p>
              <BotaoWhatsapp
                texto="Quero fechar uma parceria"
                mensagem={MENSAGEM_PARCEIRO}
                className="mt-8 w-full sm:w-auto"
              />
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  )
}
