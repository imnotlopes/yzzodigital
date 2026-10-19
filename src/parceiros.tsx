import { agenciaDaUrl } from './lib/agencia'
import { montar } from './lib/montar'
import Parceiros from './pages/Parceiros'
import { topoParceiros } from './pages/topoParceiros'

/*
  "Como funciona a Yzzo": o pacote do atleta e o do empresário. O topo desta
  página (âncoras e mensagem) mora em pages/Parceiros.tsx, junto com ela,
  porque o build também precisa dele para montar o HTML pronto.
*/
/*
  Com ?agencia= no link, a aba do navegador também diz para quem é. O cartão
  do WhatsApp não muda: o robô dele não executa JavaScript e lê o título
  escrito no parceiros.html.
*/
const agencia = agenciaDaUrl()
if (agencia) document.title = `Como funciona a Yzzo | Para ${agencia}`

montar(<Parceiros />, topoParceiros)
