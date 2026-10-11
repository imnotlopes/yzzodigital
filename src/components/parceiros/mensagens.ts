/**
 * As mensagens que já chegam escritas no WhatsApp a partir de /parceiros.
 *
 * Todas começam com "Vim pela página de parceiros": é assim que a Yzzo sabe,
 * sem ferramenta nenhuma, que o contato é de agência ou empresário e não de
 * atleta, e de qual botão ele veio.
 */
export const MENSAGEM_PARCEIRO =
  'Olá, Yzzo! Vim pela página de parceiros e quero saber como funciona para a minha agência.'

export function mensagemDoPlano(plano: string) {
  return `Olá, Yzzo! Vim pela página de parceiros e quero saber sobre o plano ${plano}.`
}
