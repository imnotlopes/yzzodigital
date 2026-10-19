import CapaParceiros from '../components/parceiros/CapaParceiros'
import { mensagemParceiro, origemParceiros } from '../components/parceiros/mensagens'
import SecaoEmpresas from '../components/parceiros/SecaoEmpresas'
import SecaoEstrela from '../components/parceiros/SecaoEstrela'
import FaixaPalavras from '../components/FaixaPalavras'
import SecaoContato from '../components/SecaoContato'
import SecaoPacotes from '../components/SecaoPacotes'
import { useAgencia } from '../lib/agencia'

/** A faixa de baixo da capa: os serviços da proposta. */
const SERVICOS = ['Match Day', 'Motion', 'Convocação', 'Novo clube', 'Comemorativas', 'DVD esportivo']

/**
 * "COMO FUNCIONA A YZZO": O PACOTE DO ATLETA E O DO EMPRESÁRIO.
 * ============================================================
 *
 * O link que a Yzzo manda quando alguém pergunta "como funciona a empresa de
 * vocês?". Tem cartão próprio no WhatsApp (ver parceiros.html).
 *
 * QUATRO SEÇÕES, E SÓ
 * -------------------
 * Eram dez. A Yzzo achou informação demais e pediu o essencial (áudio de
 * outubro de 2026): "falar como funciona o pacote de empresário, e como
 * funciona o pacote de atleta. É só isso." Saíram a comparação com o
 * agenciamento (virou uma frase na capa), as entregas, o processo em seis
 * passos, a seção de atleta de base e as perguntas frequentes.
 *
 *   1. Como funciona a Yzzo    a capa
 *   2. Pacotes para atletas    com preço
 *   3. Pacote para empresas    modalidades e como funciona a parceria
 *   4. Estrela do Mês          o diferencial da proposta
 *   +  o convite, no fim
 */
export default function Parceiros() {
  const agencia = useAgencia()

  return (
    <>
      <CapaParceiros />
      <FaixaPalavras palavras={SERVICOS} />
      <SecaoPacotes id="atletas" origem={origemParceiros(agencia)} fundo="branco" />
      <SecaoEmpresas />
      <SecaoEstrela />
      <SecaoContato
        texto="Conte quantos atletas você atende e quais artes precisa. A gente responde no WhatsApp com a proposta da parceria."
        mensagem={mensagemParceiro(agencia)}
      />
    </>
  )
}
