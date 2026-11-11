// A base do Tubo passa pelo leitor de bases locais do Cosmos (src/motor/bases.ts)? Sem Z3.
import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'
import { lerBase } from '../../../src/motor/bases'

it('a base do Tubo é aceita pelo leitor de bases locais', () => {
  const b = lerBase(JSON.parse(readFileSync(process.env.BASE_TUBO ?? 'autor/projeto-tubo/base-tubo-v1.json', 'utf8')))
  expect(b.nome).toBe('tubo-v1')
  expect(b.comRealidade).toBe(true)
  console.log(`tubo-v1: ${b.vocabulario.length} termos, ${b.fatos.length} fatos (com a realidade-v1)`)
})
