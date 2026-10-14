import { MENSAGEM_PARCEIRO } from './components/parceiros/mensagens'
import { montar } from './lib/montar'
import Parceiros from './pages/Parceiros'

/*
  "Como funciona a Yzzo": o pacote do atleta e o do empresário.

  O topo tem as âncoras desta página, e a logo volta para a landing, que é
  onde mora o portfólio.
*/
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
