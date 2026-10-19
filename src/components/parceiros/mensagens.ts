/**
 * A mensagem que já chega escrita no WhatsApp a partir de /parceiros.
 *
 * Começa dizendo de onde a pessoa vem: é assim que a Yzzo sabe, sem
 * ferramenta nenhuma, que o contato é de empresa ou assessoria e não de um
 * atleta que chegou pela landing. Com `?agencia=` no link, diz também de
 * qual agência (ver lib/agencia.ts; o nome vem de `useAgencia()`).
 */
export function mensagemParceiro(agencia: string) {
  return agencia
    ? `Olá, Yzzo! Sou da ${agencia} e vim pela página de parceiros. Quero saber como funciona a parceria.`
    : 'Olá, Yzzo! Vim pela página de parceiros e quero saber como funciona a parceria para a minha empresa.'
}

/** A origem que vai na mensagem dos pacotes do atleta, nesta página. */
export function origemParceiros(agencia: string) {
  return agencia ? `pela página de parceiros (${agencia})` : 'pela página de parceiros'
}
