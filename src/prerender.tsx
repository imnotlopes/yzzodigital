import { renderToString } from 'react-dom/server'

import Casca from './components/Casca'
import Inicio from './pages/Inicio'
import Parceiros from './pages/Parceiros'
import { topoParceiros } from './pages/topoParceiros'

/**
 * AS PÁGINAS MONTADAS NO BUILD.
 *
 * Só roda no build, em Node (ver scripts/prerender.mjs): devolve o HTML de
 * cada página, que o script escreve dentro do <div id="root">. É a mesma
 * `Casca` que o navegador monta, com as mesmas peças de main.tsx e
 * parceiros.tsx.
 */
export function renderizar(pagina: 'index' | 'parceiros'): string {
  return renderToString(
    pagina === 'index' ? <Casca pagina={<Inicio />} /> : <Casca pagina={<Parceiros />} topo={topoParceiros} />,
  )
}
