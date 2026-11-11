// A atualização do autor de 11/11/2026 (A.14 do PROMPT.md) contra o Tubo no verificador do Cosmos: o fragmento sustenta
// o ponto observador; no sono ele fecha o ponto e volta ao que já colidiu, sem observação, por isso embaçado; a matéria
// se junta até o ponto Omega, onde o Todo está concentrado. As frases do autor entram como fatos novos (N1 a N5), junto
// da base (realidade-v1 + tubo-v1); S20 é uma suposição minha, marcada. A energia está em tubo-6 (casos A2 a A4, D3, D4).
import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Termo } from '../../../src/motor/avaliacao'
import { FATOS, VOCABULARIO_REAL } from '../../../src/dados/realidade-v1'

type Resultado = 'segue' | 'contradiz' | 'independente' | 'inconsistente' | 'nao-decidiu'

const CAMINHO = process.env.BASE_TUBO ?? 'autor/projeto-tubo/base-tubo-v1.json'
const tubo = JSON.parse(readFileSync(CAMINHO, 'utf8'))
const BASE: string[] = [...FATOS, ...tubo.fatos].map((f: { formula: string }) => f.formula)

const p = (simbolo: string, leitura: string, aridade = 1): Termo => ({ simbolo, tipo: 'predicado', aridade, leitura })
const o = (simbolo: string, leitura: string): Termo => ({ simbolo, tipo: 'constante', aridade: 0, leitura })
const f = (simbolo: string, leitura: string, aridade = 1): Termo => ({ simbolo, tipo: 'funcao', aridade, leitura })

const VOCABULARIO: Termo[] = [
  ...[...VOCABULARIO_REAL, ...tubo.vocabulario].map(({ simbolo, tipo, aridade, leitura }: Termo) => ({ simbolo, tipo, aridade, leitura })),
  p('Dorme', 'x está dormindo'),
  p('PontoAberto', 'o ponto observador de x está aberto'),
  p('RevisitaOPassado', 'x volta ao que já colidiu no passado'),
  p('Embacado', 'o que x vê é embaçado'),
  p('ConcentraOTodo', 'em x o Todo está totalmente concentrado (o ponto Omega)'),
]

/** As frases de A.14, em m2. */
export const A14 = {
  N1: '∀x (Fragmento(x) ∧ ¬Dorme(x) ⟹ PontoAberto(x))', // o fragmento sustenta o ponto observador
  N2: '∀x (Dorme(x) ⟹ ¬PontoAberto(x))', // durante o sono ele fecha o ponto observador
  N3: '∀x (Dorme(x) ⟹ RevisitaOPassado(x))', // retornando ao que já colidiu no passado
  N4: '∀x (RevisitaOPassado(x) ∧ ¬PontoAberto(x) ⟹ Embacado(x))', // sem presença de observação, por isso é tudo embaçado
  N5: '∃x (ConcentraOTodo(x))', // até o ponto do Omega, onde está totalmente concentrado o Todo
}
/** Suposição minha (S20, à espera do autor): concentrar o Todo é ter o valor total. */
export const S20 = '∀x (ConcentraOTodo(x) ⟹ ValorTotal(x))'
const NOVOS = Object.values(A14)

describe('A.14 no verificador do Cosmos (Z3 real)', () => {
  let api: Awaited<ReturnType<typeof import('z3-solver')['init']>>
  let encerrar: typeof import('z3-solver')['killThreads']
  beforeAll(async () => { const z3 = await import('z3-solver'); encerrar = z3.killThreads; api = await z3.init() }, 120_000)
  afterAll(async () => { if (api) await encerrar(api.em) })

  const rodar = async (id: string, vocabulario: Termo[], premissas: string[], conclusao: string): Promise<Resultado> => {
    const { classificar } = await import('../../../src/motor/avaliacaoZ3')
    const inicio = performance.now()
    let r: Resultado
    try {
      r = await classificar(api, vocabulario, premissas, conclusao, 20_000) as Resultado
    } catch (e) {
      const m = (e as Error).message
      if (m.includes('inconsistentes')) r = 'inconsistente'
      else if (m.includes('não decidiu')) r = 'nao-decidiu'
      else throw e
    }
    console.log('caso ' + JSON.stringify({ id, resultado: r, ms: Math.round(performance.now() - inicio) }))
    return r
  }

  it('o sono: a base com A.14 é consistente; dormir fecha o ponto e embaça; dormir não pode ser descanso', async () => {
    const com = [...BASE, ...NOVOS]
    expect.soft(await rodar('S0 base + A.14 é consistente', VOCABULARIO, com, '∀x (Dorme(x) ⟹ Dorme(x))')).toBe('segue')
    expect.soft(await rodar('S1 todo humano que dorme vê embaçado', VOCABULARIO, com, '∀x (Humano(x) ∧ Dorme(x) ⟹ Embacado(x))')).toBe('segue')
    expect.soft(await rodar('S2 algum humano dorme e vê nítido', VOCABULARIO, com, '∃x (Humano(x) ∧ Dorme(x) ∧ ¬Embacado(x))')).toBe('contradiz')
    expect.soft(await rodar('S3 humano acordado sustenta o ponto aberto', VOCABULARIO, com, '∀x (Humano(x) ∧ ¬Dorme(x) ⟹ PontoAberto(x))')).toBe('segue')
    expect.soft(await rodar('S4 algum humano dorme e descansa', VOCABULARIO, com, '∃x (Humano(x) ∧ Dorme(x) ∧ Descansa(x))')).toBe('contradiz')
    expect.soft(await rodar('S5 algum humano dorme', VOCABULARIO, com, '∃x (Humano(x) ∧ Dorme(x))')).toBe('independente')
  }, 1_800_000)

  it('o ponto Omega: como fragmento contradiz a base (com S20); como o Todo depois do fim, cabe', async () => {
    const com = [...BASE, ...NOVOS, S20]
    expect.soft(await rodar('O0 base + A.14 + S20 é consistente', VOCABULARIO, com, '∀x (Dorme(x) ⟹ Dorme(x))')).toBe('segue')
    expect.soft(await rodar('O1 o ponto Omega é um fragmento', VOCABULARIO, com, '∃x (ConcentraOTodo(x) ∧ Fragmento(x))')).toBe('contradiz')
    expect.soft(await rodar('O2 o ponto Omega está fora do Tubo', VOCABULARIO, com, '∀x (ConcentraOTodo(x) ⟹ ¬DentroDoTubo(x))')).toBe('segue')
    expect.soft(await rodar('O3 sem S20, a base não decide', VOCABULARIO, [...BASE, ...NOVOS], '∃x (ConcentraOTodo(x) ∧ Fragmento(x))')).toBe('independente')
  }, 1_800_000)

  it('o ponto Omega contra os axiomas do Principia: um único fragmento contradiz Ax3, e com extensionalidade também Ax2', async () => {
    const v: Termo[] = [p('Frag', 'x é um fragmento'), o('todo', 'o Todo (A)'), o('u', 'o fragmento que sobrou')]
    const ax1 = '∀x (Frag(x) ⟹ x ⊆ todo)', ax2 = '∀x (Frag(x) ⟹ x ≠ todo)', ax3 = '∃x ∃y (Frag(x) ∧ Frag(y) ∧ x ≠ y)'
    const ax5 = '∀z (z ∈ todo ⟹ ∃x (Frag(x) ∧ z ∈ x))', ext = '∀x ∀y ((∀z (z ∈ x ⟺ z ∈ y)) ⟹ x = y)'
    const umSo = '∃x (Frag(x) ∧ ∀y (Frag(y) ⟹ y = x))'
    expect.soft(await rodar('P1 Ax1, Ax2, Ax3, Ax5: um único fragmento', v, [ax1, ax2, ax3, ax5], umSo)).toBe('contradiz')
    expect.soft(await rodar('P2 Ax1, Ax2, Ax5, sem Ax3 nem extensionalidade', v, [ax1, ax2, ax5], umSo)).toBe('independente')
    // a extensionalidade para todos os conjuntos: o Z3 não acha a instância no prazo (como a exponencial em tubo-6, F2)
    expect.soft(await rodar('P3 Ax1, Ax2, Ax5 e extensionalidade', v, [ax1, ax2, ax5, ext], umSo)).toBe('nao-decidiu')
    // dada a instância (o fragmento que sobrou e o Todo), a contradição sai na hora (como F3 e F8 em tubo-6)
    expect.soft(await rodar('P4 Ax1, Ax2, Ax5 e a instância da extensionalidade', v,
      [ax1, ax2, ax5, '(∀z (z ∈ u ⟺ z ∈ todo)) ⟹ u = todo', 'Frag(u)'], '∀y (Frag(y) ⟹ y = u)')).toBe('contradiz')
  }, 1_800_000)

  it('o embaçado: sem observação nova, nada separa o que o sono juntou; com observação nova, pode separar', async () => {
    const v: Termo[] = [f('lembra', 'o que o sono faz da colisão x'), f('pensa', 'o que se tira de x depois'), f('junta', 'o que se tira de x com a observação y', 2),
      o('c1', 'uma colisão do passado'), o('c2', 'outra colisão do passado'), o('ob1', 'uma observação nova'), o('ob2', 'outra observação nova')]
    expect.soft(await rodar('E1 sem observação', v, ['lembra(c1) = lembra(c2)', 'c1 ≠ c2'], 'pensa(lembra(c1)) = pensa(lembra(c2))')).toBe('segue')
    expect.soft(await rodar('E2 com observação nova', v, ['lembra(c1) = lembra(c2)', 'c1 ≠ c2', 'ob1 ≠ ob2'], 'junta(lembra(c1), ob1) = junta(lembra(c2), ob2)')).toBe('independente')
  }, 1_800_000)
})
