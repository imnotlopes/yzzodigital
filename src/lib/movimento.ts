import { useEffect, useRef, useState } from 'react'

/**
 * MOVIMENTO, as fundações do editorial.
 * ======================================
 *
 * A apresentação precisa parecer uma sequência de páginas de revista, e não
 * uma página que rola. O que faz essa diferença não é o layout sozinho: é o
 * conteúdo CHEGAR quando a pessoa alcança ele, em vez de já estar lá.
 *
 * POR QUE À MÃO, E NÃO COM BIBLIOTECA
 * -----------------------------------
 * A recomendação inicial era usar uma biblioteca de animação. Duas coisas
 * mudaram a conta:
 *
 *  1. São duas páginas independentes (ver lib/montar.tsx), cada uma com o
 *     próprio bundle, e o bundle inteiro de cada uma tem uns 20 KB. Uma
 *     dependência de ~30 KB dobraria o peso.
 *  2. O que este projeto precisa é revelar ao entrar, escalonar e as
 *     fileiras que andam com a rolagem. Nada disso é animação de layout, é
 *     transição de CSS disparada por um observador. Biblioteca resolveria o
 *     mesmo com uma API maior.
 *
 * O custo de fazer à mão é não ter interpolação entre estados arbitrários.
 * Se um dia aparecer transição de página ou reordenação animada de grade,
 * aí sim vale trazer uma biblioteca, este arquivo não impede isso.
 *
 * ACESSIBILIDADE NÃO É OPCIONAL AQUI
 * ----------------------------------
 * Quem pediu `prefers-reduced-motion` costuma ter enjoo ou vertigem com
 * paralaxe. Neste arquivo o respeito a isso não é um `if` no fim: o estado
 * inicial já nasce "visível", então nenhum elemento chega a se mover.
 */

/** `true` quando o sistema pediu para reduzir movimento. */
export function movimentoReduzido(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Sem observador não pode haver conteúdo escondido.
 *
 * A regra que evita o pior defeito possível deste arquivo: se o navegador não
 * tem `IntersectionObserver`, ou se a pessoa pediu menos movimento, tudo
 * começa revelado. Página em branco por causa de enfeite é falha grave, o
 * texto é o produto, a animação é o embrulho.
 */
function comecaRevelado(): boolean {
  if (typeof window === 'undefined') return true
  if (typeof IntersectionObserver === 'undefined') return true
  return movimentoReduzido()
}

interface OpcoesRevelar {
  /**
   * Quanto antes do elemento tocar a borda inferior a revelação dispara.
   * O padrão adianta um pouco, para o conteúdo já estar chegando quando entra
   * no campo de visão, revelar exatamente na borda parece atraso.
   */
  margem?: string
}

/**
 * Revela um elemento quando ele entra na tela. Uma vez só.
 *
 * Devolve a `ref` para pendurar no elemento e o estado. O visual mora no CSS
 * (`.revelar` / `.revelar-visivel` em index.css); aqui só se decide o quando.
 *
 * @example
 * const { alvo, visivel } = useRevelar<HTMLDivElement>()
 * return <div ref={alvo} className={cn('revelar', visivel && 'revelar-visivel')} />
 */
export function useRevelar<T extends HTMLElement = HTMLDivElement>({
  margem = '0px 0px -10% 0px',
}: OpcoesRevelar = {}) {
  const alvo = useRef<T>(null)
  const [visivel, setVisivel] = useState(comecaRevelado)

  useEffect(() => {
    if (visivel) return
    const elemento = alvo.current
    if (!elemento) return

    const observador = new IntersectionObserver(
      ([entrada]) => {
        /*
          `isIntersecting` resolve o caso normal. O `top < 0` resolve o caso
          que quebra silenciosamente: recarregar a página no meio da rolagem,
          quando o navegador restaura a posição e o bloco já ficou ACIMA da
          tela. Ele nunca mais entra, e sem esta linha ficaria invisível para
          sempre.
        */
        if (entrada.isIntersecting || entrada.boundingClientRect.top < 0) {
          setVisivel(true)
          observador.disconnect()
        }
      },
      { rootMargin: margem, threshold: 0 },
    )

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [visivel, margem])

  return { alvo, visivel }
}

/**
 * `true` quando a tela tem largura de desktop.
 *
 * Existe para UMA decisão, e ela é grande: a seção de modelos tem duas
 * montagens completamente diferentes, e não duas aparências da mesma. Media
 * query não resolve isso, porque as duas montagens ficariam no HTML e o
 * navegador baixaria as fotos das duas.
 */
export function useTelaLarga(minimo = 1024): boolean {
  const [larga, setLarga] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= minimo,
  )

  useEffect(() => {
    const consulta = window.matchMedia(`(min-width: ${minimo}px)`)
    const atualizar = () => setLarga(consulta.matches)
    atualizar()
    consulta.addEventListener('change', atualizar)
    return () => consulta.removeEventListener('change', atualizar)
  }, [minimo])

  return larga
}

/**
 * ROLAGEM VERTICAL VIRANDO DESLOCAMENTO HORIZONTAL.
 * =================================================
 *
 * A seção fica presa na tela e o conteúdo dela anda de lado enquanto a pessoa
 * rola normalmente. É o que a referência faz com GSAP e ScrollTrigger; aqui é
 * um ouvinte de rolagem e uma variável de CSS, pelo mesmo motivo de sempre:
 * são quatro aplicações independentes e nenhuma delas paga 60 KB por isto.
 *
 * COMO A ALTURA APARECE
 * ---------------------
 * A seção não tem altura própria. Quem a cria é este arquivo: mede o trilho,
 * calcula quanto ele precisa andar, e escreve `--percurso`. A folha de estilo
 * transforma isso em altura (`100svh + percurso`), e essa altura extra é
 * exatamente o quanto a pessoa rola enquanto a tela fica parada.
 *
 * Sem a medida, a altura seria um número escolhido no chute, e ele quebraria
 * no dia em que entrasse uma arte nova no portfólio.
 *
 * O SENTIDO
 * ---------
 * `esquerda` (o padrão) começa no início do trilho e anda até o fim. `direita`
 * começa já no fim e volta: é a fileira espelhada do portfólio, que anda no
 * sentido contrário da de cima com a mesma rolagem.
 *
 * O RITMO NÃO É 1:1, E ISSO É DELIBERADO
 * --------------------------------------
 * Na referência, um pixel rolado é um pixel andado. Lá são três cartões; aqui
 * são uma dúzia de artes, e 1:1 daria telas demais de rolagem presa numa
 * página que precisa chegar ao contato. O ritmo abaixo de 1 faz o
 * conteúdo andar mais rápido que o dedo, encurtando a seção sem tirar peça
 * nenhuma da tela.
 */
export function useDeslizeHorizontal<
  E extends HTMLElement = HTMLDivElement,
  T extends HTMLElement = HTMLDivElement,
>(ativo: boolean, ritmo = 0.62, sentido: 'esquerda' | 'direita' = 'esquerda') {
  const externo = useRef<E>(null)
  const trilho = useRef<T>(null)

  useEffect(() => {
    const fora = externo.current
    const dentro = trilho.current
    if (!fora || !dentro) return

    /*
      Desligado, a seção precisa VOLTAR ao normal, e não só parar de animar.
      Sem esta limpeza, trocar de desktop para celular deixaria a altura
      inflada e o conteúdo deslocado, com a seção presa em silêncio.
    */
    if (!ativo || movimentoReduzido()) {
      fora.style.removeProperty('--percurso')
      fora.style.removeProperty('--deslocamento')
      fora.style.removeProperty('--tela')
      return
    }

    let agendado = false
    let percurso = 0

    function medir() {
      const f = externo.current
      const d = trilho.current
      if (!f || !d) return

      /*
        A LARGURA DE REFERÊNCIA É A DA JANELA, E NUNCA `100vw`.

        `100vw` inclui a barra de rolagem: num desktop com barra clássica ele
        dá 1440 onde o conteúdo tem 1425. Os painéis de tela cheia nasciam 15px
        mais largos que a tela, saíam do centro, e a conta do percurso ficava
        devendo os mesmos 15px por painel. É a mesma armadilha que já obrigou
        `overflow-x: clip` no html deste projeto.

        Medido aqui, o número é o que a tela realmente tem, e a folha de estilo
        recebe pronto em `--tela`.
      */
      const janela = d.parentElement
      const largura = janela ? janela.clientWidth : window.innerWidth
      f.style.setProperty('--tela', `${largura}px`)

      /* O quanto o trilho é mais largo que a tela. Zero quando cabe, e aí a
         seção inteira se comporta como um bloco comum. */
      percurso = Math.max(0, d.scrollWidth - largura)
      f.style.setProperty('--percurso', `${Math.round(percurso * ritmo)}px`)
      posicionar()
    }

    function posicionar() {
      agendado = false
      const f = externo.current
      if (!f || percurso === 0) return

      const caixa = f.getBoundingClientRect()

      /*
        Quanto já passou do topo da seção, limitado ao trecho em que ela fica
        presa. Antes de encostar no topo é 0; depois de a seção terminar é o
        percurso inteiro. O limite é o que impede o trilho de continuar andando
        enquanto a próxima seção já está na tela.
      */
      const rolado = Math.min(Math.max(-caixa.top, 0), caixa.height - window.innerHeight)
      const progresso = (caixa.height - window.innerHeight) > 0
        ? rolado / (caixa.height - window.innerHeight)
        : 0

      /*
        Para a esquerda, o trilho sai do começo e anda até o fim. Para a
        direita (a fileira espelhada), começa já deslocado até o fim e volta
        ao começo: as peças andam no sentido contrário com a mesma rolagem.
      */
      const andado = sentido === 'esquerda' ? progresso : 1 - progresso
      f.style.setProperty('--deslocamento', `${-(andado * percurso).toFixed(1)}px`)
    }

    function aoRolar() {
      if (agendado) return
      agendado = true
      requestAnimationFrame(posicionar)
    }

    medir()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', medir)

    /* O trilho muda de largura quando as fontes carregam e quando uma foto
       chega: sem observar, o percurso ficaria calculado sobre a medida errada
       do primeiro quadro e a última arte nunca apareceria inteira. */
    const observador = new ResizeObserver(medir)
    observador.observe(dentro)

    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', medir)
      observador.disconnect()
    }
  }, [ativo, ritmo, sentido])

  return { externo, trilho }
}
