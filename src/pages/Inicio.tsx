import Capa from '../components/Capa'
import FaixaPalavras from '../components/FaixaPalavras'
import SecaoAgencia from '../components/SecaoAgencia'
import SecaoContato from '../components/SecaoContato'
import SecaoPortfolio from '../components/SecaoPortfolio'
import SecaoProcesso from '../components/SecaoProcesso'
import SecaoServicos from '../components/SecaoServicos'
import SecaoTime from '../components/SecaoTime'

/**
 * A LANDING PAGE DA YZZO DIGITAL.
 * ==============================
 *
 * Uma página só, com a ordem de raciocínio que a apresentação da Danielli
 * provou: abrir forte, provar autoridade, mostrar o trabalho, mostrar quem já
 * confiou, e fechar com o convite. O que muda é o fim: lá a pessoa voltava
 * sozinha para uma conversa que já existia; aqui a página precisa COMEÇAR a
 * conversa, e por isso o WhatsApp está no topo, na capa e no fecho.
 *
 * As âncoras do topo apontam para os `id` das seções: #agencia, #servicos,
 * #portfolio e #contato.
 */
export default function Inicio() {
  return (
    <>
      {/* 1 · Abertura */}
      <Capa />
      <FaixaPalavras />

      {/* 2 · Quem é */}
      <SecaoAgencia />

      {/* 3 · O que faz */}
      <SecaoServicos />

      {/* 4 · O trabalho */}
      <SecaoPortfolio />

      {/* 5 · Quem já confiou */}
      <SecaoTime />

      {/* 6 · Como funciona */}
      <SecaoProcesso />

      {/* 7 · O convite */}
      <SecaoContato />
    </>
  )
}
