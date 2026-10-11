/**
 * AS PERGUNTAS DE QUEM AGENCIA.
 *
 * As que vêm depois de "como funciona", na ordem em que costumam vir numa
 * conversa com empresário. Cada resposta repete o que a página já diz em
 * outro lugar, em forma de pergunta: quem chega com a dúvida pronta vai
 * direto a ela, sem ler a página inteira.
 *
 * ⚠️ PROVISÓRIO, como os planos (ver data/planos.ts). Nenhuma resposta
 * promete o que a página não promete, mas todas dependem da Yzzo confirmar
 * os planos e o processo. Pergunta sobre preço, cidade atendida e contrato
 * mínimo ficou de fora de propósito: a resposta não existe ainda, e chute
 * em página de vendas vira problema na primeira conversa.
 */
export const duvidas = [
  {
    pergunta: 'A Yzzo agencia atletas?',
    resposta:
      'Não. A Yzzo cuida da imagem do atleta: arte, vídeo, foto e perfil. Contrato, transferência e representação ficam com o empresário ou a agência.',
  },
  {
    pergunta: 'As artes podem sair com a marca da minha agência?',
    resposta:
      'Podem. As artes saem assinadas pela sua agência junto com a Yzzo, ou só com a sua, como for combinado.',
  },
  {
    pergunta: 'Dá para mudar o plano de um atleta?',
    resposta:
      'Dá. Os planos podem ser combinados: um atleta no semanal na época da convocação e no mensal no resto do ano.',
  },
  {
    pergunta: 'Quem aprova o que vai ao ar?',
    resposta:
      'Tudo é enviado para aprovação antes de publicar. Nada sai sem o ok de quem contratou.',
  },
  {
    pergunta: 'Como funciona com atleta menor de idade?',
    resposta:
      'O uso de imagem é autorizado por escrito pelos pais ou responsáveis, com a finalidade e o prazo definidos. Sem autorização, não há publicação.',
  },
  {
    pergunta: 'E quando surge uma convocação de última hora?',
    resposta:
      'Parceiro tem fila própria. Convocação e janela de transferência entram na frente, com prazo de urgência combinado.',
  },
] as const
