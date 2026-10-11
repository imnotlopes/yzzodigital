import { FileSignature, ShieldCheck, UserRound } from 'lucide-react'

import Revelar from '../Revelar'
import TituloSecao from '../TituloSecao'

/**
 * ATLETA DE BASE, COM RESPONSABILIDADE.
 * ====================================
 *
 * Boa parte da carteira da Yzzo é Sub-15 e Sub-17, e é aqui que a agência
 * mostra que sabe o que isso exige. Para o empresário isso é argumento, não
 * aviso: ele responde à família pelo que sai com o nome do atleta.
 *
 * O QUE ESTÁ POR TRÁS DE CADA LINHA
 * ---------------------------------
 *   AUTORIZAÇÃO   LGPD (art. 14) e ECA Digital (Lei 15.211/2025, em vigor desde
 *                 março de 2026): consentimento dos responsáveis específico,
 *                 com finalidade e prazo, e revogável. A autorização genérica
 *                 "para tudo" ficou frágil.
 *   NÃO AGENCIA   FIFA e CBF restringem a representação de menores. A Yzzo
 *                 cuida da imagem; representar é com o agente licenciado.
 *   RESPEITO      ECA, art. 17 e 18: nem autorização dos pais torna lícita a
 *                 exposição que vá contra o interesse do adolescente.
 *
 * ⚠️ O texto é cuidadoso de propósito e não promete o que a Yzzo não
 * confirmou. Um advogado deve conferir o modelo de autorização, e em especial
 * se impulsionamento pago de post de atleta menor cai na exigência de alvará
 * judicial do Decreto 12.880/2026.
 */
const CUIDADOS = [
  {
    Icone: FileSignature,
    titulo: 'Autorização dos responsáveis',
    texto: 'Com atleta menor de idade, o uso de imagem é autorizado por escrito pelos pais, com finalidade e prazo definidos.',
  },
  {
    Icone: UserRound,
    titulo: 'Imagem, não representação',
    texto: 'A Yzzo cuida da imagem do atleta. Contrato e representação ficam com o agente.',
  },
  {
    Icone: ShieldCheck,
    titulo: 'Conteúdo que respeita o atleta',
    texto: 'Antes de ser atleta, ele é um adolescente. Nada vai ao ar sem aprovação, e nada que o exponha.',
  },
] as const

export default function SecaoCuidados() {
  return (
    <section className="bg-branco" aria-labelledby="titulo-cuidados">
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao id="titulo-cuidados" barra="Atleta de base">
            Imagem de atleta jovem, com <mark>responsabilidade</mark>
          </TituloSecao>
        </Revelar>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {CUIDADOS.map(({ Icone, titulo, texto }, indice) => (
            <Revelar key={titulo} como="li" atraso={indice * 100} className="rounded-sm bg-papel p-7">
              <Icone size={28} strokeWidth={1.75} aria-hidden />
              <h3 className="t-h3 mt-5">{titulo}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-cinza">{texto}</p>
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  )
}
