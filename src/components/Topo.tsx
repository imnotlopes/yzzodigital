import { useEffect, useState } from 'react'

import { linkWhatsapp } from '../lib/brand'
import { cn } from '../lib/utils'
import { IconeWhatsapp } from './icones'
import Logo from './Logo'

/** As âncoras. Cada `href` é o `id` de uma seção em pages/Inicio.tsx. */
const LINKS = [
  { href: '#agencia', texto: 'A agência' },
  { href: '#servicos', texto: 'Serviços' },
  { href: '#portfolio', texto: 'Portfólio' },
  { href: '#contato', texto: 'Contato' },
] as const

/**
 * O TOPO, E POR QUE AQUI ELE EXISTE.
 * ==================================
 *
 * A apresentação da Danielli não tinha topo nenhum, de propósito: era um link
 * aberto de dentro de uma conversa de WhatsApp, e cada saída era uma chance
 * de perder a noiva. Aqui é o contrário. Quem chega vem do Instagram ou de
 * uma busca, ainda não conversou com ninguém, e o trabalho do site é levar a
 * pessoa ATÉ a conversa. O botão de WhatsApp precisa estar à mão o tempo
 * todo, e é por ele que o topo existe.
 *
 * As âncoras só aparecem no computador. No celular a página é uma rolagem
 * só, e um menu escondido atrás de um ícone é um toque a mais para chegar a
 * um lugar que o polegar alcança rolando.
 *
 * Transparente sobre a capa, papel depois dela: a foto da capa ganha a tela
 * inteira no primeiro instante, e o topo só ganha fundo quando o conteúdo
 * começa a passar por baixo dele.
 */
export default function Topo() {
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ease-suave',
        rolou ? 'bg-papel/95 shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur' : 'bg-transparent',
      )}
    >
      <div className="container-yz flex h-topo items-center justify-between gap-6">
        <a href="#inicio" aria-label="Yzzo Digital, voltar ao início" className="-m-2 p-2">
          <Logo className="w-24 md:w-28" />
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-preto/75 transition-colors hover:text-preto"
                >
                  {link.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={linkWhatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-preto min-h-11 px-5 text-sm"
        >
          <IconeWhatsapp width={17} height={17} />
          <span>
            Fale<span className="hidden sm:inline"> conosco</span>
          </span>
        </a>
      </div>
    </header>
  )
}
