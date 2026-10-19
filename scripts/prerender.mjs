/**
 * Escreve as páginas prontas dentro do HTML do build.
 *
 *   node scripts/prerender.mjs     (roda sozinho no fim de `npm run build`)
 *
 * POR QUE
 * -------
 * O site é montado por JavaScript. Sem isto, o HTML que chega no celular é um
 * <div> vazio, e a pessoa vê tela em branco até o JavaScript baixar e rodar;
 * no 4G fraco, era a maior parte do tempo de abertura. Com isto, o HTML já
 * chega com a página inteira: ela pinta assim que o HTML e o CSS chegam, e o
 * JavaScript só "acorda" o que já está na tela (lib/montar.tsx).
 *
 * É também o que o Google lê primeiro: título, textos, pacotes e links estão
 * no HTML, sem depender de ele rodar o site para indexar.
 *
 * O QUE FAZ, EM CADA PÁGINA
 * -------------------------
 *   1. monta a página com a versão de servidor do build
 *      (`vite build --ssr src/prerender.tsx`, na pasta dist-ssr/) e a escreve
 *      dentro do <div id="root">;
 *   2. troca o <link> do CSS pelo próprio CSS, dentro de um <style>. São uns
 *      10 KB comprimidos, e a página deixa de esperar um segundo arquivo para
 *      pintar.
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const RAIZ = path.resolve(import.meta.dirname, '..')
const DIST = path.join(RAIZ, 'dist')
const SSR = path.join(RAIZ, 'dist-ssr')

const { renderizar } = await import(pathToFileURL(path.join(SSR, 'prerender.js')).href)

for (const pagina of ['index', 'parceiros']) {
  const arquivo = path.join(DIST, `${pagina}.html`)
  let html = await readFile(arquivo, 'utf8')

  const vazio = '<div id="root"></div>'
  if (!html.includes(vazio)) throw new Error(`${pagina}.html: não achei ${vazio}`)
  html = html.replace(vazio, `<div id="root">${renderizar(pagina)}</div>`)

  const links = [...html.matchAll(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g)]
  for (const [tag, href] of links) {
    const css = await readFile(path.join(DIST, href), 'utf8')
    html = html.replace(tag, () => `<style>${css}</style>`)
  }

  await writeFile(arquivo, html)
  console.log(`✓ ${pagina}.html pronto (${Math.round(html.length / 1024)} KB, ${links.length} CSS embutido)`)
}

/* A versão de servidor só serve para isto: não vai para a Vercel. */
await rm(SSR, { recursive: true, force: true })
