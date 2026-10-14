import Capa from '../components/Capa'
import FaixaPalavras from '../components/FaixaPalavras'
import SecaoContato from '../components/SecaoContato'
import SecaoPacotes from '../components/SecaoPacotes'
import SecaoPortfolio from '../components/SecaoPortfolio'
import SecaoServicos from '../components/SecaoServicos'
import SecaoTime from '../components/SecaoTime'

/**
 * A LANDING PAGE DA YZZO DIGITAL.
 * ==============================
 *
 * Mais curta desde outubro de 2026, a pedido da Yzzo: "ficou muita
 * informação", e o foco dela é só arte. Saíram "A agência" (o sobre virou a
 * linha de apoio dos serviços), o mural de fotos de jogo e o processo em
 * passos. Entraram os pacotes do atleta, com preço.
 *
 *   1. Capa
 *   2. O que a Yzzo faz       os seis serviços da proposta
 *   3. Portfólio              artes e Motion
 *   +  #TimeYzzoDigital        a faixa dos "Novo Cliente!", que também são artes
 *   4. Pacotes para atletas   com preço, e o caminho para o pacote de empresas
 *   5. Contato
 *
 * As âncoras do topo apontam para os `id` das seções: #servicos, #portfolio,
 * #pacotes e #contato.
 */
export default function Inicio() {
  return (
    <>
      <Capa />
      <FaixaPalavras />
      <SecaoServicos />
      <SecaoPortfolio />
      <SecaoTime />
      <SecaoPacotes origem="pelo site" comLinkEmpresas />
      <SecaoContato />
    </>
  )
}
