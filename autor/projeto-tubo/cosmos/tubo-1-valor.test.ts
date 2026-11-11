// O Tubo como base do verificador do Cosmos: o mesmo confronto da camada de fatos (src/motor/realidade.ts), com a base
// do Tubo somada à da realidade (A.12: o Tubo precisa de todas). A base fica em autor/projeto-tubo/base-tubo-v1.json.
import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Termo } from '../../../src/motor/avaliacao'
import { confrontarRealidade, type Base, type ClassificarComVocabulario } from '../../../src/motor/realidade'
import { FATOS, VOCABULARIO_REAL } from '../../../src/dados/realidade-v1'

const CAMINHO = process.env.BASE_TUBO ?? 'autor/projeto-tubo/base-tubo-v1.json'
const tubo = JSON.parse(readFileSync(CAMINHO, 'utf8'))
const BASE: Base = { vocabulario: [...VOCABULARIO_REAL, ...tubo.vocabulario], fatos: [...FATOS, ...tubo.fatos] }

const t = (simbolo: string, leitura: string, aridade = 1): Termo => ({ simbolo, tipo: 'predicado', aridade, leitura })
const situacoes = (r: Awaited<ReturnType<typeof confrontarRealidade>>) => r.frases.map((f) => [f.situacao, f.fatos])

describe('o Tubo no verificador (Z3 real)', () => {
  let api: Awaited<ReturnType<typeof import('z3-solver')['init']>>
  let encerrar: typeof import('z3-solver')['killThreads']
  beforeAll(async () => { const z3 = await import('z3-solver'); encerrar = z3.killThreads; api = await z3.init() }, 120_000)
  afterAll(async () => { if (api) await encerrar(api.em) })
  const classificar: ClassificarComVocabulario = async (v, ps, c) => (await import('../../../src/motor/avaliacaoZ3')).classificar(api, v, ps, c, 5_000)
  const confrontar = (vocabulario: Termo[], premissas: string[], conclusao: string, texto: string[]) =>
    confrontarRealidade(classificar, { vocabulario, premissas, conclusao }, { premissas: texto.slice(0, -1), conclusao: texto[texto.length - 1] }, BASE)

  it('a base junta (realidade + Tubo) não tem contradição: o Todo é consistente', async () => {
    const todos = BASE.fatos.map((f) => f.formula)
    const v = BASE.vocabulario.map(({ simbolo, tipo, aridade, leitura }) => ({ simbolo, tipo, aridade, leitura }) as Termo)
    await expect(classificar(v, todos, '∀x (Fragmento(x) ⟹ Fragmento(x))')).resolves.toBe('segue')
  }, 600_000)

  it('"toda pessoa é um fragmento" é fato; "alguma pessoa tem o valor total" contraria', async () => {
    const r = await confrontar([t('Pessoa', 'x é uma pessoa'), t('Frag', 'x é um fragmento'), t('VT', 'x tem o valor total')],
      ['∀x (Pessoa(x) ⟹ Frag(x))'], '∃x (Pessoa(x) ∧ VT(x))', ['Toda pessoa é um fragmento.', 'Logo, alguma pessoa tem o valor total.'])
    console.log('valor total', JSON.stringify(situacoes(r)))
    expect(r.frases.map((f) => f.situacao)).toEqual(['fato', 'contraria'])
  }, 600_000)
})
