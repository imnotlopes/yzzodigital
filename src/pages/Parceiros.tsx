import CapaParceiros from '../components/parceiros/CapaParceiros'
import { MENSAGEM_PARCEIRO } from '../components/parceiros/mensagens'
import SecaoAgencias from '../components/parceiros/SecaoAgencias'
import SecaoCuidados from '../components/parceiros/SecaoCuidados'
import SecaoEntregas from '../components/parceiros/SecaoEntregas'
import SecaoPapeis from '../components/parceiros/SecaoPapeis'
import SecaoPlanos from '../components/parceiros/SecaoPlanos'
import SecaoContato from '../components/SecaoContato'
import SecaoProcesso from '../components/SecaoProcesso'

/**
 * "COMO FUNCIONA A YZZO", PARA AGÊNCIAS E EMPRESÁRIOS.
 * ===================================================
 *
 * O link que a Yzzo manda quando alguém pergunta "como funciona a empresa de
 * vocês?". É a ideia da apresentação da Danielli de volta: um material para
 * colar na conversa, com cartão próprio no WhatsApp (ver parceiros.html).
 *
 * A ORDEM RESPONDE ÀS PERGUNTAS NA ORDEM EM QUE ELAS VÊM
 * -----------------------------------------------------
 *   1. Como funciona?           a capa responde no título
 *   2. Vocês vão pegar meu atleta?   não: vocês negociam, a Yzzo mostra
 *   3. O que o atleta recebe?   as cinco entregas
 *   4. Quanto, e com que ritmo? os planos
 *   5. E para a minha agência?  pacote, marca própria, urgência
 *   6. Como começa?             os seis passos
 *   7. E com atleta menor?      autorização, imagem e não representação
 *   8. Como falo com vocês?     o convite
 *
 * O portfólio não se repete aqui: o topo leva para ele na landing.
 */
export default function Parceiros() {
  return (
    <>
      <CapaParceiros />
      <SecaoPapeis />
      <SecaoEntregas />
      <SecaoPlanos />
      <SecaoAgencias />
      <SecaoProcesso id="como-funciona" />
      <SecaoCuidados />
      <SecaoContato
        texto="Conte quantos atletas você tem e o momento de cada um. A gente responde no WhatsApp com a proposta para a sua carteira."
        mensagem={MENSAGEM_PARCEIRO}
      />
    </>
  )
}
