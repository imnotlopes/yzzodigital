import type { Config } from 'tailwindcss'

/**
 * Design System, Yzzo Digital.
 * Papel cinza-claro, preto e o amarelo da marca, tirados do Instagram.
 * Todos os valores apontam para as CSS variables de src/index.css, que é a
 * fonte única de verdade dos tokens.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /**
       * O placeholder `<alpha-value>` é obrigatório: é ele que permite
       * `text-preto/70`, `bg-branco/10` etc. Por isso as variáveis guardam o
       * trio de canais, e não o hex.
       */
      colors: {
        preto: 'rgb(var(--preto-rgb) / <alpha-value>)',
        grafite: 'rgb(var(--grafite-rgb) / <alpha-value>)',
        branco: 'rgb(var(--branco-rgb) / <alpha-value>)',
        papel: 'rgb(var(--papel-rgb) / <alpha-value>)',
        amarelo: 'rgb(var(--amarelo-rgb) / <alpha-value>)',
        cinza: 'rgb(var(--cinza-rgb) / <alpha-value>)',
        'cinza-claro': 'rgb(var(--cinza-claro-rgb) / <alpha-value>)',
        borda: 'rgb(var(--borda-rgb) / <alpha-value>)',
      },

      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-corpo)'],
      },

      maxWidth: {
        conteudo: 'var(--largura-conteudo)',
      },

      spacing: {
        secao: 'var(--espaco-secao)',
        topo: 'var(--altura-topo)',
      },

      transitionDuration: {
        DEFAULT: '300ms',
      },

      transitionTimingFunction: {
        suave: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
