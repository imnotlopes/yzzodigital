import type { ConfigDoTopo } from '../components/Casca'
import { mensagemParceiro } from '../components/parceiros/mensagens'

/**
 * O topo desta página: as âncoras dela, e a logo volta para a landing, que é
 * onde mora o portfólio. A mensagem do WhatsApp leva o nome da agência do
 * link, quando houver.
 */
export const topoParceiros: ConfigDoTopo = {
  inicio: '/',
  mensagem: mensagemParceiro,
  links: [
    { href: '#atletas', texto: 'Para atletas' },
    { href: '#empresas', texto: 'Para empresas' },
    { href: '#estrela', texto: 'Estrela do Mês' },
    { href: '/#portfolio', texto: 'Portfólio' },
  ],
}
