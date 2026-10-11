import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

import Rodape from '../components/Rodape'
import Topo, { type LinkDoTopo } from '../components/Topo'
import '../index.css'

/**
 * DUAS PÁGINAS, DOIS HTML.
 * =======================
 *
 *   index.html       a landing, para quem chega pelo Instagram ou pela busca
 *   parceiros.html   "Como funciona a Yzzo", para agências e empresários
 *
 * É a lição da Danielli: o link de parceiros vai ser colado no WhatsApp, e o
 * robô que monta o cartão do link não executa JavaScript. Para o cartão de
 * /parceiros ser diferente do da landing, cada página precisa ser um HTML de
 * verdade, com as próprias tags escritas no arquivo.
 *
 * O preço disso: as duas são aplicações separadas. Ir de uma para a outra é
 * `<a href>` comum, que recarrega a página, e não navegação de roteador.
 */
export function montar(
  pagina: ReactNode,
  topo?: { links?: readonly LinkDoTopo[]; inicio?: string; mensagem?: string },
) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Topo links={topo?.links} inicio={topo?.inicio} mensagem={topo?.mensagem} />
      <main>{pagina}</main>
      <Rodape />
    </StrictMode>,
  )

  /*
    Diagnóstico de rolagem lateral, ligado por `?overflow` na URL. Import
    dinâmico de propósito: vira um arquivo separado que visitante nenhum baixa.
  */
  if (new URLSearchParams(location.search).has('overflow')) {
    import('./diagnosticoOverflow')
      .then(({ diagnosticarOverflow }) => setTimeout(diagnosticarOverflow, 1500))
      .catch(() => {})
  }
}
