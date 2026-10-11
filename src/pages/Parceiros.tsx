import CapaParceiros from '../components/parceiros/CapaParceiros'
import { MENSAGEM_PARCEIRO } from '../components/parceiros/mensagens'
import SecaoAgencias from '../components/parceiros/SecaoAgencias'
import SecaoCuidados from '../components/parceiros/SecaoCuidados'
import SecaoDuvidas from '../components/parceiros/SecaoDuvidas'
import SecaoEntregas from '../components/parceiros/SecaoEntregas'
import SecaoPapeis from '../components/parceiros/SecaoPapeis'
import SecaoPlanos from '../components/parceiros/SecaoPlanos'
import FaixaPalavras from '../components/FaixaPalavras'
import SecaoContato from '../components/SecaoContato'
import SecaoProcesso from '../components/SecaoProcesso'
import SecaoTime from '../components/SecaoTime'

/** A faixa de baixo da capa: as entregas, no lugar dos títulos dos posts. */
const ENTREGAS = ['Convocação', 'Novo clube', 'Melhores momentos', 'Título', 'Agenda de jogos', 'Mídia kit']

/**
 * "COMO FUNCIONA A YZZO", PARA AGÊNCIAS E EMPRESÁRIOS.
 * ===================================================
 *
 * O link que a Yzzo manda quando alguém pergunta "como funciona a empresa de
 * vocês?". É a ideia da apresentação da Danielli de volta: um material para
 * colar na conversa, com cartão próprio no WhatsApp (ver parceiros.html).
 *
 * Usa as mesmas peças da landing (a faixa torta, a dupla de vídeo e arte, a
 * faixa dos "Novo Cliente!", o processo e o fecho) para as duas páginas
 * parecerem do mesmo autor, e alterna os fundos papel, preto e amarelo como
 * ela.
 *
 * A ORDEM RESPONDE ÀS PERGUNTAS NA ORDEM EM QUE ELAS VÊM
 * -----------------------------------------------------
 *   1. Como funciona?                a capa responde no título
 *   2. Vocês vão pegar meu atleta?   não: vocês negociam, a Yzzo mostra
 *   3. O que o atleta recebe?        as cinco entregas, com o vídeo na frente
 *   4. Quanto, e com que ritmo?      os planos, com o calendário de cada um
 *   5. E para a minha agência?       pacote, marca própria, urgência
 *   6. Quem já trabalha com vocês?   a faixa dos "Novo Cliente!"
 *   7. Como começa?                  os seis passos
 *   8. E com atleta menor?           autorização, imagem e não representação
 *   9. E aquela outra dúvida?        as perguntas frequentes
 *  10. Como falo com vocês?          o convite
 */
export default function Parceiros() {
  return (
    <>
      <CapaParceiros />
      <FaixaPalavras palavras={ENTREGAS} />
      <SecaoPapeis />
      <SecaoEntregas />
      <SecaoPlanos />
      <SecaoAgencias />
      <SecaoTime />
      <SecaoProcesso id="como-funciona" />
      <SecaoCuidados />
      <SecaoDuvidas />
      <SecaoContato
        texto="Conte quantos atletas você tem e o momento de cada um. A gente responde no WhatsApp com a proposta para a sua carteira."
        mensagem={MENSAGEM_PARCEIRO}
      />
    </>
  )
}
