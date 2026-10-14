import Faixa from './Faixa'

/**
 * As palavras que mais aparecem no feed da agência, passando em faixa.
 *
 * É o lugar da faixa de marcas da Danielli, logo depois da abertura. Lá eram
 * os logotipos das marcas representadas; aqui, enquanto não há logotipo de
 * clube para mostrar, são os momentos que a agência transforma em arte. Cada
 * um é o título de um post de verdade.
 *
 * Quando chegarem os logotipos dos clubes onde os atletas jogam, esta faixa
 * pode virar a faixa de clubes, que prova mais que palavra.
 */
const PALAVRAS = ['Match Day', 'Convocado!', 'Novo clube', 'Motion', 'Campeão', '#TimeYzzoDigital']

interface FaixaPalavrasProps {
  /** Outra lista de palavras. A página de parceiros passa os serviços. */
  palavras?: readonly string[]
}

export default function FaixaPalavras({ palavras = PALAVRAS }: FaixaPalavrasProps) {
  /*
    Levemente torta, como as faixas dos posts. O invólucro corta as pontas que
    a rotação joga para fora da tela, senão a página ganharia rolagem lateral.
  */
  return (
    <div className="overflow-hidden py-3">
      <div className="-rotate-1 scale-[1.03] bg-preto py-4 md:py-5">
        <Faixa
          itens={palavras}
          chave={(palavra) => palavra}
          duracao={28}
          respiro="1.5rem"
          nome="a faixa de palavras"
          desenhar={(palavra) => (
            <span className="flex items-center gap-12 text-[2.25rem] leading-none text-branco md:text-[3rem]">
              <span className="t-grito">{palavra}</span>
              <Raio />
            </span>
          )}
        />
      </div>
    </div>
  )
}

/** O raio da logo, como separador. */
function Raio() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-7 shrink-0 md:size-9" fill="var(--amarelo)">
      <path d="M13.5 1 4 14h7l-1.5 9L20 9.5h-7Z" />
    </svg>
  )
}
