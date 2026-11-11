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

  it('a 90° que se anulam contraria; toda aniquilação vira luz é fato', async () => {
    const r = await confrontar([t('Perp', 'x e y estão a 90° (eixos perpendiculares)', 2), t('Anul', 'x e y se anulam', 2), t('Aniq', 'x é uma aniquilação de matéria com antimatéria'), t('Luz', 'x vira luz')],
      ['∃x ∃y (Perp(x, y) ∧ Anul(x, y))'], '∀x (Aniq(x) ⟹ Luz(x))', ['Matéria e antimatéria a 90° se anulam.', 'Logo, toda aniquilação vira luz.'])
    console.log('90 graus e luz', JSON.stringify(situacoes(r)))
    expect(r.frases.map((f) => f.situacao)).toEqual(['contraria', 'fato'])
  }, 600_000)
})
