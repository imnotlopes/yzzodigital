import { cn } from '../lib/utils'

interface RitmoProps {
  /** Em quais das quatro semanas do mês há entrega. */
  semanas: readonly number[]
  /** Sobre fundo preto: as semanas vazias em grafite, as cheias em amarelo. */
  escuro?: boolean
}

/**
 * O CALENDÁRIO DE UMA MODALIDADE.
 *
 * Quatro semanas lado a lado, e uma marca em cada semana com entrega. É o que
 * explica "semanal", "quinzenal" e "mensal" num relance: quatro marcas, duas
 * ou uma. Para quem lê com leitor de tela, a frase escondida diz o mesmo.
 */
export default function Ritmo({ semanas, escuro = false }: RitmoProps) {
  return (
    <div>
      <p className={cn('rotulo text-[0.625rem]', escuro ? 'text-cinza-claro' : 'text-preto/60')} aria-hidden>
        Entregas no mês
      </p>
      <p className="sr-only">Entregas em {semanas.length} de 4 semanas do mês.</p>
      <ol aria-hidden className="mt-2.5 grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((semana) => {
          const entrega = semanas.includes(semana)
          return (
            <li
              key={semana}
              className={cn(
                'flex h-11 flex-col items-center justify-center rounded-sm text-[0.6875rem] font-semibold',
                entrega
                  ? 'bg-amarelo text-preto'
                  : escuro
                    ? 'bg-branco/[0.06] text-branco/30'
                    : 'bg-papel text-preto/35',
              )}
            >
              <span>S{semana}</span>
              {entrega && <span className="mt-0.5 size-1.5 rounded-full bg-current" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
