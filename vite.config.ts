import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { pluginSeo } from './scripts/seo.js'

/*
  Uma página só, no index.html da raiz.

  O projeto da Danielli tinha uma tabela de peças (um HTML por apresentação)
  e um plugin que imitava os rewrites da Vercel no desenvolvimento. Com uma
  página só, nada disso tem trabalho a fazer, e o Vite padrão serve.
*/
export default defineConfig({
  plugins: [react(), pluginSeo()],

  server: {
    // O Vite ignora PORT e vai somando a partir da 5173 quando a porta está
    // ocupada. Respeitar a variável deixa quem sobe o servidor escolher a
    // porta, o que importa quando há outro projeto rodando na mesma máquina.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
