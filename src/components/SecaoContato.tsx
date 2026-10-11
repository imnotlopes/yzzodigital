import { Mail } from 'lucide-react'

import { brand, linkInstagram } from '../lib/brand'
import BotaoWhatsapp from './BotaoWhatsapp'
import { IconeInstagram } from './icones'
import Revelar from './Revelar'

interface SecaoContatoProps {
  /** A linha embaixo do título. Muda com quem está lendo. */
  texto?: string
  /** A mensagem que já chega escrita no WhatsApp. */
  mensagem?: string
}

const TEXTO_ATLETA =
  'Conte quem é o atleta e o momento da carreira. A gente responde no WhatsApp com o caminho para a imagem dele.'

/**
 * Bloco 7, o convite.
 *
 * A FRASE TAMBÉM É DA AGÊNCIA
 * ---------------------------
 * "Grandes conquistas começam com grandes decisões." é o post que termina em
 * "Conheça a Yzzo Digital >>>". Aqui ela faz o mesmo trabalho, no fim da
 * página: a decisão é a mensagem no WhatsApp. Mesmo tratamento do post:
 * caixa alta condensada sobre o preto, com as duas palavras de peso em
 * amarelo e itálico.
 *
 * A Danielli terminava sem botão, porque a noiva já estava no WhatsApp. Aqui
 * ninguém está: o fim da página é o botão.
 */
export default function SecaoContato({ texto = TEXTO_ATLETA, mensagem }: SecaoContatoProps) {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-preto text-branco"
      aria-labelledby="titulo-contato"
    >
      {/* O raio do post, entrando pelo canto. */}
      <svg
        aria-hidden
        viewBox="0 0 200 300"
        className="pointer-events-none absolute -bottom-10 -right-10 w-56 text-branco/10 md:w-96"
        fill="none"
        stroke="currentColor"
        strokeWidth="14"
      >
        <path d="M20 290 70 200l40 30 40-90 30 40" />
        <path d="M0 210 50 120l40 30 40-90 30 40" />
      </svg>

      <div className="container-yz secao relative">
        <Revelar>
          <h2 id="titulo-contato" className="t-grito text-[3.5rem] leading-[0.88] md:text-[7rem]">
            Grandes
            <br />
            <span className="text-amarelo">conquistas</span>
            <br />
            começam com
            <br />
            grandes <span className="text-amarelo">decisões.</span>
          </h2>
        </Revelar>

        <Revelar atraso={140}>
          <p className="mt-9 max-w-[42ch] text-[1.0625rem] text-cinza-claro">
            {texto}
          </p>

          <div className="mt-10">
            <BotaoWhatsapp texto="Chamar no WhatsApp" mensagem={mensagem} className="w-full sm:w-auto" />
          </div>
        </Revelar>

        <Revelar atraso={220}>
          <ul className="mt-14 flex flex-col gap-1 border-t border-branco/15 pt-8 sm:flex-row sm:flex-wrap sm:gap-x-10">
            <li>
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-3 text-cinza-claro transition-colors hover:text-amarelo"
              >
                <span className="rotulo text-branco">WhatsApp</span>
                {brand.whatsappExibicao}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="inline-flex min-h-11 items-center gap-3 text-cinza-claro transition-colors hover:text-amarelo"
              >
                <Mail size={18} strokeWidth={1.75} aria-hidden className="text-branco" />
                {brand.email}
              </a>
            </li>
            <li>
              <a
                href={linkInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-3 text-cinza-claro transition-colors hover:text-amarelo"
              >
                <IconeInstagram width={18} height={18} className="text-branco" />
                {brand.instagram}
              </a>
            </li>
          </ul>
        </Revelar>
      </div>
    </section>
  )
}
