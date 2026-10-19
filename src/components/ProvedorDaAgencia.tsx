import { useEffect, useState, type ReactNode } from 'react'

import { AgenciaContexto, agenciaDaUrl } from '../lib/agencia'

/**
 * Dá o nome da agência do link (`?agencia=`) a quem estiver dentro dele.
 *
 * Vazio no build e na primeira montagem; o nome do link logo depois. Lido
 * uma vez: o endereço não muda enquanto a pessoa está na página (as âncoras
 * só mexem no `#`). O porquê de esperar está em lib/agencia.ts.
 */
export default function ProvedorDaAgencia({ children }: { children: ReactNode }) {
  const [agencia, setAgencia] = useState('')
  useEffect(() => setAgencia(agenciaDaUrl()), [])
  return <AgenciaContexto.Provider value={agencia}>{children}</AgenciaContexto.Provider>
}
