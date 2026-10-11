import { cn } from '../../lib/utils'
import Revelar from '../Revelar'
import TituloSecao from '../TituloSecao'

/**
 * QUEM FAZ O QUÊ.
 * ===============
 *
 * O mercado tem dois negócios que se confundem: o AGENCIAMENTO (o empresário,
 * que negocia contrato e ganha comissão, com licença FIFA/CBF) e o MARKETING
 * DE IMAGEM (a Yzzo, que produz e cobra mensalidade). Esta seção desfaz a
 * confusão logo no começo, porque é a primeira desconfiança de quem agencia:
 * "essa agência vai tentar pegar meu atleta?".
 *
 * A linha de baixo diz com todas as letras que a Yzzo não agencia. Não é só
 * argumento de venda: FIFA e CBF restringem a representação de menores, e boa
 * parte da carteira da Yzzo é Sub-15 e Sub-17. O site não pode dar a entender
 * que a agência representa atleta de base.
 */
const LADOS = [
  {
    quem: 'Vocês',
    papel: 'Agenciamento',
    itens: ['Negociam contrato e transferência', 'Falam com clubes e olheiros', 'Cuidam da carreira do atleta'],
    yzzo: false,
  },
  {
    quem: 'A Yzzo',
    papel: 'Imagem',
    itens: [
      'Arte de cada conquista, na hora',
      'Vídeo de melhores momentos para mostrar ao clube',
      'Perfil ativo, profissional e com identidade',
    ],
    yzzo: true,
  },
] as const

export default function SecaoPapeis() {
  return (
    <section id="papeis" className="bg-branco" aria-labelledby="titulo-papeis">
      <div className="container-yz secao">
        <Revelar>
          <TituloSecao
            id="titulo-papeis"
            barra="O que fazemos"
            descricao="Quando o atleta chega no clube, o perfil dele chegou antes. A Yzzo é a parte criativa de quem agencia, sem disputar o atleta com ninguém."
          >
            Vocês negociam. A Yzzo <mark>mostra</mark>.
          </TituloSecao>
        </Revelar>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {LADOS.map((lado, indice) => (
            <Revelar
              key={lado.quem}
              atraso={indice * 120}
              className={cn('rounded-sm p-7 md:p-10', lado.yzzo ? 'bg-amarelo' : 'bg-papel')}
            >
              <p className="rotulo text-preto/70">{lado.papel}</p>
              <h3 className="t-h2 mt-3">{lado.quem}</h3>
              <ul className="mt-7 space-y-3">
                {lado.itens.map((item) => (
                  <li key={item} className="flex gap-3 text-[1.0625rem] leading-snug">
                    <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-preto" />
                    {item}
                  </li>
                ))}
              </ul>
            </Revelar>
          ))}
        </div>

        <Revelar className="mt-8">
          <p className="max-w-[60ch] text-sm text-cinza">
            A Yzzo não agencia atletas e não negocia contratos. Trabalhamos para
            quem agencia.
          </p>
        </Revelar>
      </div>
    </section>
  )
}
