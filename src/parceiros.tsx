import { MENSAGEM_PARCEIRO } from './components/parceiros/mensagens'
import { montar } from './lib/montar'
import Parceiros from './pages/Parceiros'

/*
  "Como funciona a Yzzo", para agências e empresários.

  O topo tem as âncoras desta página, e a logo volta para a landing, que é
  onde mora o portfólio.
*/
montar(<Parceiros />, {
  inicio: '/',
  mensagem: MENSAGEM_PARCEIRO,
  links: [
    { href: '#papeis', texto: 'O que fazemos' },
    { href: '#planos', texto: 'Planos' },
    { href: '#como-funciona', texto: 'Como funciona' },
    { href: '/#portfolio', texto: 'Portfólio' },
    { href: '#contato', texto: 'Contato' },
  ],
})
