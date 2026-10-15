/**
 * O NOME DA AGÊNCIA NO LINK.
 * =========================
 *
 *   /parceiros?agencia=Sabu Sports
 *
 * A proposta comercial da Yzzo tem um espaço "(NOME DA AGÊNCIA)" em "Após o
 * fechamento da parceria entre a Yzzo Digital e a (NOME DA AGÊNCIA)". Com o
 * nome no link, a página preenche esse espaço e mais três: a barra da capa,
 * a Estrela do Mês e a mensagem do WhatsApp. Cada agência recebe uma página
 * que parece feita para ela, e a Yzzo sabe de qual delas veio o contato.
 *
 * É a mesma ideia do `?nome=` das apresentações da Danielli.
 *
 * RECUSA, EM VEZ DE LIMPAR
 * ------------------------
 * O valor vem de um link montado à mão. Ou ele é um nome de empresa, ou é
 * ignorado inteiro e a página mostra a versão neutra, que está sempre certa.
 * "Limpar" uma tentativa de código deixaria uma frase estropiada na página
 * ("entre a Yzzo Digital e a scriptalert"), que é pior que frase nenhuma.
 *
 * Vale letra (com acento), número, espaço e os sinais que aparecem em nome de
 * empresa: & . - ' (R&M Assessoria, F.C. Sports, D'Ávila). Até 40 caracteres:
 * mais que isso quebra a barra da capa no celular.
 */

const NOME_VALIDO = /^[\p{L}\p{N}][\p{L}\p{N}\s&.'’-]*$/u

export function nomeDaAgencia(bruto: string | null): string {
  if (!bruto) return ''
  const limpo = bruto.replace(/\s+/g, ' ').trim()
  if (!limpo || limpo.length > 40) return ''
  return NOME_VALIDO.test(limpo) ? limpo : ''
}

/**
 * O nome da agência que veio no link desta página, ou vazio.
 *
 * Lido uma vez: o endereço não muda enquanto a pessoa está na página (as
 * âncoras só mexem no `#`).
 */
export const agenciaDoLink: string =
  typeof window === 'undefined' ? '' : nomeDaAgencia(new URLSearchParams(window.location.search).get('agencia'))
