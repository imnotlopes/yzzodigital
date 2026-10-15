import { cn } from '../lib/utils'

interface LogoProps {
  /** `claro` para fundo escuro: letras brancas. A seta é amarela nas duas. */
  tom?: 'escuro' | 'claro'
  /** Primeira coisa da página: carrega sem esperar a rolagem. */
  prioridade?: boolean
  /** A largura dela na tela, para escolher entre a versão de 360 e a de 720. */
  sizes?: string
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
export default function Logo({ tom = 'escuro', prioridade = false, sizes = '7rem', className }: LogoProps) {
  const nome = tom === 'claro' ? 'logo-claro' : 'logo'
  return (
    <img
      src={`/marca/${nome}.webp`}
      srcSet={`/marca/${nome}-360.webp 360w, /marca/${nome}.webp 720w`}
      sizes={sizes}
      alt="Yzzo Digital"
      width={720}
      height={198}
      decoding="async"
      loading={prioridade ? 'eager' : 'lazy'}
      className={cn('h-auto', className)}
    />
  )
}
