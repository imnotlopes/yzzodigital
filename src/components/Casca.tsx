import { StrictMode, type ReactNode } from 'react'

import ProvedorDaAgencia from './ProvedorDaAgencia'
import Rodape from './Rodape'
import Topo, { type LinkDoTopo } from './Topo'

export interface ConfigDoTopo {
  links?: readonly LinkDoTopo[]
  inicio?: string
  mensagem?: string | ((agencia: string) => string)
}

/**
 * A página inteira: o topo, o conteúdo e o rodapé. É o que o build monta
 * (src/prerender.tsx) e o que o navegador acorda (lib/montar.tsx).
 */
export default function Casca({ pagina, topo }: { pagina: ReactNode; topo?: ConfigDoTopo }) {
  return (
    <StrictMode>
      <ProvedorDaAgencia>
        {/* Só aparece com o Tab: quem navega pelo teclado pula o topo de uma vez. */}
        <a href="#conteudo" className="pular">
          Pular para o conteúdo
        </a>
        <Topo links={topo?.links} inicio={topo?.inicio} mensagem={topo?.mensagem} />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {pagina}
        </main>
        <Rodape />
      </ProvedorDaAgencia>
    </StrictMode>
  )
}
