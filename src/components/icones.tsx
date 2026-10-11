import type { SVGProps } from 'react'

/**
 * O lucide-react v1 removeu os ícones de marca: não existem mais `Instagram`
 * nem WhatsApp no pacote. Estes são desenhados aqui, seguindo as convenções
 * do lucide (viewBox 24, traço em currentColor, cantos arredondados) para
 * ficarem coerentes com os ícones importados.
 */

const base: SVGProps<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  width: 20,
  height: 20,
  'aria-hidden': true,
}

export function IconeInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconeWhatsapp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2Z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c-.1.1-.1.3 0 .5a6 6 0 0 0 2.7 2.4c.2.1.4.1.5-.1l.6-.6c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5v.4c0 .4-.2.8-.6 1-.7.4-1.6.5-2.6.1a9.4 9.4 0 0 1-4.9-4.5c-.5-1.1-.4-2.2.2-3Z" />
    </svg>
  )
}
