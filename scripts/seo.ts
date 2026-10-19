import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { Plugin } from 'vite'

// A extensão .js nos caminhos é exigência do moduleResolution node16 deste
// tsconfig; o arquivo em disco é .ts, e tanto o TypeScript quanto o Vite
// fazem essa correspondência sozinhos.
import { pacotesAtleta } from '../src/data/pacotes.js'
import { SITE_URL, brand, linkInstagram } from '../src/lib/brand.js'

/**
 * Gera sitemap.xml, robots.txt e o JSON-LD da agência durante o build.
 *
 * DIFERENTE DA DANIELLI, ESTE SITE QUER SER ACHADO
 * ------------------------------------------------
 * A apresentação dela era `noindex`: material de conversa, mandado pronto.
 * Site de agência é o contrário, e quem procura "agência de marketing
 * esportivo" precisa chegar aqui. Por isso robots liberado, sitemap com a raiz
 * e os dados estruturados da organização.
 *
 * Só roda no build. Em desenvolvimento os arquivos não existem, e tudo bem:
 * quem os lê é robô de busca, que só vê produção.
 */

/** As páginas públicas. Mesma lista de PAGINAS em vite.config.ts. */
const CAMINHOS = ['/', '/parceiros']

function montarSitemap(): string {
  /* A data do build: diz ao Google que vale a pena passar de novo. */
  const hoje = new Date().toISOString().slice(0, 10)
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...CAMINHOS.map(
      (caminho) => `  <url>\n    <loc>${SITE_URL}${caminho}</loc>\n    <lastmod>${hoje}</lastmod>\n  </url>`,
    ),
    '</urlset>',
    '',
  ].join('\n')
}

function montarRobots(): string {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n')
}

/**
 * A agência em JSON-LD. Vai no HTML, e não num componente, para não depender
 * de o robô executar JavaScript. Os valores saem de brand.ts e pacotes.ts:
 * uma fonte de verdade só, e o preço aqui nunca fica diferente do da página.
 *
 * Os pacotes do atleta entram como ofertas, com preço e "por mês": é o que
 * permite ao Google mostrar "a partir de R$ 90" sem a pessoa abrir o site.
 */
function montarOrganizacao() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#agencia`,
    name: brand.nome,
    description: `${brand.descricao}: artes e conteúdo visual para o futebol, para atletas, assessorias esportivas e empresas do ramo.`,
    url: `${SITE_URL}/`,
    /* PNG, e não WebP: é o que o Google aceita com certeza para logo. */
    logo: `${SITE_URL}/marca/logo.png`,
    image: `${SITE_URL}/og-yzzo.jpg`,
    email: brand.email,
    telephone: `+${brand.whatsapp}`,
    sameAs: [linkInstagram, brand.linktree],
    areaServed: { '@type': 'Country', name: 'Brasil' },
    makesOffer: pacotesAtleta.map((pacote) => ({
      '@type': 'Offer',
      name: `Pacote ${pacote.nome}`,
      description: pacote.itens.join('; '),
      url: `${SITE_URL}/#pacotes`,
      priceCurrency: 'BRL',
      price: pacote.preco.toFixed(2),
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: pacote.preco.toFixed(2),
        priceCurrency: 'BRL',
        unitText: 'MONTH',
      },
      itemOffered: {
        '@type': 'Service',
        name: `Artes para atletas: pacote ${pacote.nome}`,
        serviceType: 'Marketing esportivo',
      },
    })),
  }
}

export function pluginSeo(): Plugin {
  return {
    name: 'seo-yzzo',
    apply: 'build',

    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(montarOrganizacao()),
          injectTo: 'head',
        },
      ]
    },

    async closeBundle() {
      await writeFile(join('dist', 'sitemap.xml'), montarSitemap(), 'utf8')
      await writeFile(join('dist', 'robots.txt'), montarRobots(), 'utf8')
    },
  }
}
