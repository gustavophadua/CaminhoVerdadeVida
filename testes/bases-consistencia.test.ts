// A consistência de uma base local, pelo Z3 (src/motor/bases.ts): base sem contradição passa; base contraditória é
// recusada com os fatos que colidem (um conjunto mínimo); e a camada de fatos confronta contra a base local, citando os
// fatos dela. Num processo próprio: o Z3 em WebAssembly reserva cerca de 2 GB.
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Termo } from '../src/motor/avaliacao'
import { conferirConsistencia, lerBase } from '../src/motor/bases'
import { confrontarRealidade, fatosCitados, type ClassificarComVocabulario } from '../src/motor/realidade'

const termo = (simbolo: string, leitura: string, sinonimos: string[] = []) => ({ simbolo, tipo: 'predicado', aridade: 1, leitura, sinonimos })
const fato = (id: string, formula: string) => ({ id, enunciado: `fato ${id}`, formula, fonte: { nome: 'exemplo' } })
const VOCABULARIO = [termo('Macieira', 'x é uma macieira', ['macieira']), termo('Arvore', 'x é uma árvore', ['arvore']), termo('Planta', 'x é uma planta', ['planta']), termo('DaFruto', 'x dá fruto', ['da fruto'])]
const base = (fatos: ReturnType<typeof fato>[]) => lerBase({ formato: 'cosmos-base-v1', nome: 'pomar', descricao: 'exemplo', vocabulario: VOCABULARIO, fatos })
const t = (simbolo: string, leitura: string): Termo => ({ simbolo, tipo: 'predicado', aridade: 1, leitura })

describe('bases locais (Z3 real)', () => {
  let api: Awaited<ReturnType<typeof import('z3-solver')['init']>>
  let encerrar: typeof import('z3-solver')['killThreads']
  beforeAll(async () => { const z3 = await import('z3-solver'); encerrar = z3.killThreads; api = await z3.init() }, 120_000)
  afterAll(async () => { if (api) await encerrar(api.em) })
  const classificar: ClassificarComVocabulario = async (v, ps, c) => (await import('../src/motor/avaliacaoZ3')).classificar(api, v, ps, c, 5_000)

  const certos = [fato('P01', '∀x (Macieira(x) ⟹ Arvore(x))'), fato('P02', '∀x (Arvore(x) ⟹ Planta(x))'), fato('P03', '∀x (Macieira(x) ⟹ DaFruto(x))'), fato('P04', '∃x (Macieira(x))')]

  it('a base sem contradição passa', async () => {
    await expect(conferirConsistencia(classificar, base(certos))).resolves.toEqual({ consistente: true })
  }, 120_000)

  it('a base contraditória é recusada, com só os fatos que colidem', async () => {
    const r = await conferirConsistencia(classificar, base([...certos, fato('P05', '∀x (Planta(x) ⟹ ¬Arvore(x))')]))
    // P03 (dá fruto) não tem nada com a contradição: fica de fora
    expect(r).toEqual({ consistente: false, colidem: ['P01', 'P02', 'P04', 'P05'] })
  }, 120_000)

  it('a camada de fatos confronta contra a base local e cita os fatos dela', async () => {
    const b = base(certos)
    const r = await confrontarRealidade(classificar,
      { vocabulario: [t('Mac', 'x é uma macieira'), t('Pl', 'x é uma planta'), t('Fr', 'x dá fruto')], premissas: ['∃x (Mac(x) ∧ ¬Pl(x))'], conclusao: '∀x (Mac(x) ⟹ Fr(x))' },
      { premissas: ['Há uma macieira que não é planta.'], conclusao: 'Logo, toda macieira dá fruto.' }, b)
    expect(r.frases.map((f) => [f.situacao, f.fatos])).toEqual([['contraria', ['P01', 'P02']], ['fato', ['P03']]])
    expect(fatosCitados(r, b).map((f) => f.id)).toEqual(['P01', 'P02', 'P03'])
  }, 120_000)
})
