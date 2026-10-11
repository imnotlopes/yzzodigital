import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Rodape from './components/Rodape'
import Topo from './components/Topo'
import Inicio from './pages/Inicio'
import './index.css'

/*
  Uma página só, sem roteador.

  A Danielli tinha um HTML por apresentação e um React Router em cada um. Aqui
  não há para onde navegar além das âncoras da própria página, e o roteador
  seria peso sem função.
*/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Topo />
    <main>
      <Inicio />
    </main>
    <Rodape />
  </StrictMode>,
)

/*
  Diagnóstico de rolagem lateral, ligado por `?overflow` na URL. Import
  dinâmico de propósito: vira um arquivo separado que visitante nenhum baixa.
*/
if (new URLSearchParams(location.search).has('overflow')) {
  import('./lib/diagnosticoOverflow')
    .then(({ diagnosticarOverflow }) => setTimeout(diagnosticarOverflow, 1500))
    .catch(() => {})
}
