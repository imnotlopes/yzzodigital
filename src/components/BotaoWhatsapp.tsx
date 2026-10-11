import { linkWhatsapp } from '../lib/brand'
import { cn } from '../lib/utils'
import { IconeWhatsapp } from './icones'

interface BotaoWhatsappProps {
  texto?: string
  /** A mensagem que já chega escrita. Sem ela, a padrão de brand.ts. */
  mensagem?: string
  variante?: 'amarelo' | 'preto'
  className?: string
}

/**
 * O botão que importa. Todo caminho da página termina nele.
 *
 * Abre em outra aba: no computador, o WhatsApp Web toma a aba inteira, e quem
 * fechar a conversa perderia o site junto.
 */
export default function BotaoWhatsapp({
  texto = 'Fale com a Yzzo',
  mensagem,
  variante = 'amarelo',
  className,
}: BotaoWhatsappProps) {
  return (
    <a
      href={linkWhatsapp(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('btn', variante === 'amarelo' ? 'btn-amarelo' : 'btn-preto', className)}
    >
      <IconeWhatsapp width={19} height={19} />
      {texto}
    </a>
  )
}
