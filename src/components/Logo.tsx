import { cn } from '../lib/utils'

interface LogoProps {
  /** `claro` para fundo escuro: letras brancas. O raio é amarelo nos dois. */
  tom?: 'escuro' | 'claro'
  className?: string
}

/**
 * ⚠️ LOGO PROVISÓRIA.
 * ==================
 *
 * A única logo que veio foi a foto de perfil do Instagram, com 150px: pequena
 * demais para o topo de um site, e em JPEG com fundo. Isto aqui é um
 * desenho em código do que ela é: "YZZO" em grotesco pesado, com um raio
 * amarelo atravessando os dois Z.
 *
 * É SVG, e não texto com fonte, para não depender da Poppins ter carregado: a
 * logo é a primeira coisa no topo e não pode piscar trocando de fonte.
 *
 * Quando o branding chegar, este componente inteiro vira um `<img>` do
 * arquivo oficial, com o mesmo `alt`, e nada mais muda no site.
 */
export default function Logo({ tom = 'escuro', className }: LogoProps) {
  const letra = tom === 'claro' ? 'var(--branco)' : 'var(--preto)'

  return (
    <svg
      viewBox="0 0 220 56"
      role="img"
      aria-label="Yzzo Digital"
      className={cn('h-auto', className)}
    >
      <g fill={letra}>
        {/* Y */}
        <path d="M0 4h15.5l11 18.5L37.5 4H53L34 32.5V52H19V32.5Z" />
        {/* Z */}
        <path d="M58 4h39v11.5L74.5 40.5H97V52H56.5V40.5L79 15.5H58Z" />
        {/* Z */}
        <path d="M103 4h39v11.5L119.5 40.5H142V52h-40.5V40.5L124 15.5h-21Z" />
        {/* O */}
        <path d="M172.5 3c15.2 0 26 10.8 26 25s-10.8 25-26 25-26-10.8-26-25 10.8-25 26-25Zm0 12.5c-7 0-11.6 5.3-11.6 12.5s4.6 12.5 11.6 12.5 11.6-5.3 11.6-12.5-4.6-12.5-11.6-12.5Z" />
      </g>

      {/* O raio, atravessando os dois Z na diagonal. */}
      <path
        d="M66 34 88 22l2.5 6L110 18l-3 9 26-11-27 22-2.5-6-20 10 2.5-7Z"
        fill="var(--amarelo)"
      />
    </svg>
  )
}
