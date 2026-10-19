import type { ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import Casca, { type ConfigDoTopo } from '../components/Casca'
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
 *
 * O HTML VEM PRONTO
 * -----------------
 * No build, scripts/prerender.mjs monta a `Casca` de cada página e escreve o
 * resultado dentro do <div id="root"> do HTML. Quem abre o site vê a página
 * antes do JavaScript chegar, e o Google lê o texto sem precisar rodar nada.
 * No navegador, `montar` só "acorda" esse HTML (hydrateRoot). No servidor de
 * desenvolvimento o <div> vem vazio, e ela desenha do zero.
 *
 * A regra que isso impõe ao resto do código: o primeiro render no navegador
 * precisa sair igual ao do build (ver lib/movimento.ts e lib/agencia.ts).
 */
export function montar(pagina: ReactNode, topo?: ConfigDoTopo) {
  const raiz = document.getElementById('root')!
  const casca = <Casca pagina={pagina} topo={topo} />

  if (raiz.hasChildNodes()) hydrateRoot(raiz, casca)
  else createRoot(raiz).render(casca)

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
