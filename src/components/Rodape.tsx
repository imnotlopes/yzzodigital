import { brand, linkInstagram } from '../lib/brand'
import Logo from './Logo'

/** Os links do rodapé. Poucos: o contato inteiro acabou de aparecer acima. */
const LINKS = [
  { href: linkInstagram, texto: 'Instagram', fora: true },
  { href: brand.linktree, texto: 'Linktree', fora: true },
  { href: '#inicio', texto: 'Voltar ao topo ↑', fora: false },
] as const

/**
 * O rodapé.
 *
 * ESCURO, COMO O CONVITE DE CIMA
 * ------------------------------
 * Era papel, e a página terminava num degrau: o convite preto e, de repente,
 * uma faixa clara com a logo pequena. Agora o convite e o rodapé são um bloco
 * escuro só, separados por um fio, e a página termina na logo clara e no
 * fecho da proposta da Yzzo, como uma última página.
 *
 * Curto de propósito: o contato inteiro acabou de aparecer no convite, e
 * repetir tudo aqui seria a mesma lista duas vezes seguidas.
 */
export default function Rodape() {
  return (
    <footer className="fundo-escuro [--brilho-y:-60%]">
      <div className="container-yz">
        <div className="flex flex-col gap-8 border-t border-branco/10 py-12 md:flex-row md:items-end md:justify-between md:py-16">
          <div className="flex flex-col gap-4">
            <Logo tom="claro" className="w-36 md:w-44" />
            <p className="max-w-[36ch] text-sm text-cinza-claro">{brand.slogan}</p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-1 text-sm font-medium">
            {LINKS.map((link) => (
              <li key={link.texto}>
                <a
                  href={link.href}
                  {...(link.fora ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex min-h-11 items-center text-branco/80 decoration-amarelo decoration-2 underline-offset-[6px] transition-colors hover:text-branco hover:underline"
                >
                  {link.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="border-t border-branco/10 py-5 text-xs text-cinza-claro">
          © {new Date().getFullYear()} {brand.nome}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
