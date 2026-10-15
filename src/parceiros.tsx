import { MENSAGEM_PARCEIRO } from './components/parceiros/mensagens'
import { agenciaDoLink } from './lib/agencia'
import { montar } from './lib/montar'
import Parceiros from './pages/Parceiros'

/*
  "Como funciona a Yzzo": o pacote do atleta e o do empresário.

  O topo tem as âncoras desta página, e a logo volta para a landing, que é
  onde mora o portfólio.
*/
/*
  Com ?agencia= no link, a aba do navegador também diz para quem é. O cartão
  do WhatsApp não muda: o robô dele não executa JavaScript e lê o título
  escrito no parceiros.html.
*/
if (agenciaDoLink) document.title = `Como funciona a Yzzo | Para ${agenciaDoLink}`

montar(<Parceiros />, {
  inicio: '/',
  mensagem: MENSAGEM_PARCEIRO,
  links: [
    { href: '#atletas', texto: 'Para atletas' },
    { href: '#empresas', texto: 'Para empresas' },
    { href: '#estrela', texto: 'Estrela do Mês' },
    { href: '/#portfolio', texto: 'Portfólio' },
  ],
})
