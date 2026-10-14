import { brand, linkInstagram } from '../lib/brand'
import Logo from './Logo'

/**
 * O rodapé. Curto: o contato inteiro acabou de aparecer na seção de cima, e
 * repetir tudo aqui seria a mesma lista duas vezes seguidas.
 *
 * Fica a marca, a assinatura da bio e os dois endereços que alguém procura
 * no rodapé de propósito: o Instagram e o link da bio.
 */
export default function Rodape() {
  return (
    <footer className="bg-papel">
      <div className="container-yz flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <Logo className="w-28" />
          <p className="text-sm text-cinza">
            {brand.slogan}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-1 text-sm font-medium">
          <li>
            <a
              href={linkInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:underline"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={brand.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:underline"
            >
              Linktree
            </a>
          </li>
          <li>
            <a href="#inicio" className="inline-flex min-h-11 items-center hover:underline">
              Voltar ao topo ↑
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-borda">
        <p className="container-yz py-5 text-xs text-cinza">
          © {new Date().getFullYear()} {brand.nome}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
