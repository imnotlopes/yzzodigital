import { resolve } from 'node:path'

import preact from '@preact/preset-vite'
import { defineConfig, type Plugin } from 'vite'

import { pluginSeo } from './scripts/seo.js'

/**
 * As páginas, e o endereço de cada uma.
 *
 * Cada página é um HTML de verdade, com as próprias tags de compartilhamento:
 * o robô que monta o cartão do link no WhatsApp não executa JavaScript, e é
 * isso que dá a /parceiros um cartão diferente do da landing. Ver
 * src/lib/montar.tsx.
 *
 * Mexeu aqui, confira o sitemap em scripts/seo.ts. Em produção, quem resolve
 * `/parceiros` → `parceiros.html` é o `cleanUrls` do vercel.json.
 */
const PAGINAS = [
  { nome: 'index', rota: '/', arquivo: 'index.html' },
  { nome: 'parceiros', rota: '/parceiros', arquivo: 'parceiros.html' },
] as const

/**
 * Faz o servidor de desenvolvimento responder `/parceiros` como a Vercel.
 *
 * Sem isto, `/parceiros` em desenvolvimento cai no index.html e mostra a
 * landing, sem erro nenhum no console. Mesma armadilha que o projeto da
 * Danielli já tinha resolvido.
 */
function rotasDasPaginas(): Plugin {
  return {
    name: 'rotas-das-paginas',
    apply: 'serve',
    configureServer(servidor) {
      servidor.middlewares.use((req, _res, proximo) => {
        const caminho = (req.url ?? '/').split('?')[0].replace(/\/$/, '')
        const pagina = PAGINAS.find((p) => p.rota !== '/' && p.rota === caminho)
        if (pagina) req.url = `/${pagina.arquivo}`
        proximo()
      })
    },
  }
}

export default defineConfig({
  /*
    PREACT NO LUGAR DO REACT.

    O código continua escrevendo `import { useState } from 'react'`: o preset
    troca o React pelo Preact no build, pela camada de compatibilidade dele.
    O Preact faz o mesmo com uns 4 KB, contra uns 60 KB do React. No celular
    fraco é a maior parte do tempo que a página leva para aparecer, porque
    nada aparece antes do JavaScript rodar.
  */
  plugins: [preact(), rotasDasPaginas(), pluginSeo()],

  build: {
    rollupOptions: {
      input: Object.fromEntries(
        PAGINAS.map((p) => [p.nome, resolve(import.meta.dirname, p.arquivo)]),
      ),
    },
  },

  server: {
    // O Vite ignora PORT e vai somando a partir da 5173 quando a porta está
    // ocupada. Respeitar a variável deixa quem sobe o servidor escolher a
    // porta, o que importa quando há outro projeto rodando na mesma máquina.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
