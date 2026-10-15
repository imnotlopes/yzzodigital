import type { ImgHTMLAttributes } from 'react'

import { srcsetDe, type Imagem } from '../data/portfolio'

interface FotoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> {
  imagem: Imagem
  /** A largura que a imagem ocupa na tela. Errar para mais faz baixar a versão grande. */
  sizes: string
}

/**
 * UMA IMAGEM DO PORTFÓLIO, NO FORMATO MAIS LEVE QUE O NAVEGADOR ABRE.
 *
 * AVIF para quem abre (quase todo navegador), WebP para o resto, e o
 * `srcset` de cada formato com as larguras que existirem (ver
 * scripts/versoes.mjs). O `alt`, a largura e a altura vêm da própria imagem.
 *
 * O `<picture>` é `display: contents`: não ganha caixa própria, e a `<img>`
 * continua sendo filha direta de quem a posiciona. Tudo o que já estilizava
 * a `<img>` continua valendo do mesmo jeito.
 */
export default function Foto({ imagem, sizes, alt, ...resto }: FotoProps) {
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcsetDe(imagem, 'avif')} sizes={sizes} />
      <img
        src={imagem.pequena}
        srcSet={srcsetDe(imagem)}
        sizes={sizes}
        alt={alt ?? imagem.alt}
        width={imagem.largura}
        height={imagem.altura}
        {...resto}
      />
    </picture>
  )
}
