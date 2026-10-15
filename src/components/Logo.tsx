import { cn } from '../lib/utils'

interface LogoProps {
  /** `claro` para fundo escuro: letras brancas. A seta é amarela nas duas. */
  tom?: 'escuro' | 'claro'
  /** Primeira coisa da página: carrega sem esperar a rolagem. */
  prioridade?: boolean
  className?: string
}

/**
 * A LOGO OFICIAL.
 *
 * "YZZO" com a seta de crescimento amarela atravessando os dois Z. Veio na
 * mídia de outubro de 2026, num PNG de fundo branco; scripts/importar-midia.mjs
 * tira o fundo e gera as duas versões, escura e clara.
 *
 * Substituiu um desenho em código que eu tinha feito a partir da foto de
 * perfil de 150px, com um raio no lugar da seta. Foi o "ajustar logo" que a
 * Yzzo pediu.
 *
 * NUNCA SOBRE O AMARELO: a seta é da mesma cor e some.
 */
export default function Logo({ tom = 'escuro', prioridade = false, className }: LogoProps) {
  return (
    <img
      src={tom === 'claro' ? '/marca/logo-claro.webp' : '/marca/logo.webp'}
      alt="Yzzo Digital"
      width={720}
      height={198}
      decoding="async"
      loading={prioridade ? 'eager' : 'lazy'}
      className={cn('h-auto', className)}
    />
  )
}
