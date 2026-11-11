// As leis da física dentro da lógica do Cosmos (leis-da-fisica.md): cada lei vira fórmula em m2, e o motor do Cosmos
// (leitura m2, expansão, tradução t1 e Z3) diz se a conclusão segue, contradiz ou é independente das premissas, pela
// mesma regra da função classificar da Conversa. A Conversa ainda não aceita números (o vocabulário dela só tem objetos
// e predicados); o motor aceita, e é por ele que este teste passa. Nenhuma lei é provada aqui: as leis entram como
// premissas; o que se confere são as consequências, as contradições e os limites da própria lógica. Cada caso imprime
// uma linha "caso {...}" com o resultado e o tempo.
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Formula } from '../../../src/logica/ast'
import { expandir } from '../../../src/logica/acucar'
import { validar } from '../../../src/logica/validador'
import type { Termo } from '../../../src/motor/avaliacao'
import { comoDicionario, type Ficha } from '../../../src/motor/registro'
import { checarZ3, type ResultadoZ3 } from '../../../src/motor/z3'

type Resultado = 'segue' | 'contradiz' | 'independente' | 'inconsistente' | 'nao-decidiu'
interface Caso { id: string; lei: string; vocabulario: Termo[]; premissas: string[]; conclusao: string; esperado: Resultado }

// um número (constante real), uma função de números e um predicado
const n = (simbolo: string, leitura: string): Termo => ({ simbolo, tipo: 'constante', aridade: 0, numerico: true, leitura })
const fn = (simbolo: string, leitura: string, aridade = 1): Termo =>
  ({ simbolo, tipo: 'funcao', aridade, numerico: true, argumentos: Array(aridade).fill('num'), leitura })
const p = (simbolo: string, leitura: string, aridade = 1): Termo => ({ simbolo, tipo: 'predicado', aridade, leitura })
const o = (simbolo: string, leitura: string): Termo => ({ simbolo, tipo: 'constante', aridade: 0, leitura })

const MASSAS = [n('m1', 'massa do corpo 1'), n('m2', 'massa do corpo 2')]

export const CASOS: Caso[] = [
  // A. Conservação e colisões (Newton)
  { id: 'A1', lei: 'colisão elástica: momento e energia conservados dão a velocidade final', esperado: 'segue',
    vocabulario: [...MASSAS, n('u1', 'velocidade de 1 antes'), n('u2', 'velocidade de 2 antes'), n('v1', 'velocidade de 1 depois'), n('v2', 'velocidade de 2 depois')],
    premissas: ['m1 > 0', 'm2 > 0', 'm1·u1 + m2·u2 = m1·v1 + m2·v2', 'm1·u1^2 + m2·u2^2 = m1·v1^2 + m2·v2^2', 'v1 ≠ u1'],
    conclusao: 'v1 = ((m1 − m2)·u1 + 2·m2·u2) / (m1 + m2)' },
  { id: 'A2', lei: 'fusão (choque totalmente inelástico, "matéria engole matéria"): o calor nunca é negativo', esperado: 'segue',
    vocabulario: [...MASSAS, n('u1', 'velocidade de 1 antes'), n('u2', 'velocidade de 2 antes'), n('v', 'velocidade do corpo fundido'), n('q', 'calor da fusão')],
    premissas: ['m1 > 0', 'm2 > 0', 'v = (m1·u1 + m2·u2) / (m1 + m2)', 'q = (m1·u1^2 + m2·u2^2 − (m1 + m2)·v^2) / 2'],
    conclusao: 'q ≥ 0' },
  { id: 'A3', lei: 'fusão: o calor é ½·μ·(Δv)², com μ a massa reduzida', esperado: 'segue',
    vocabulario: [...MASSAS, n('u1', 'velocidade de 1 antes'), n('u2', 'velocidade de 2 antes'), n('v', 'velocidade do corpo fundido'), n('q', 'calor da fusão')],
    premissas: ['m1 > 0', 'm2 > 0', 'v = (m1·u1 + m2·u2) / (m1 + m2)', 'q = (m1·u1^2 + m2·u2^2 − (m1 + m2)·v^2) / 2'],
    conclusao: 'q = m1·m2·(u1 − u2)^2 / (2·(m1 + m2))' },
  { id: 'A4', lei: '"a fusão cria energia" contradiz a conservação', esperado: 'contradiz',
    vocabulario: [...MASSAS, n('u1', 'velocidade de 1 antes'), n('u2', 'velocidade de 2 antes'), n('v', 'velocidade do corpo fundido'), n('q', 'calor da fusão')],
    premissas: ['m1 > 0', 'm2 > 0', 'v = (m1·u1 + m2·u2) / (m1 + m2)', 'q = (m1·u1^2 + m2·u2^2 − (m1 + m2)·v^2) / 2'],
    conclusao: 'q < 0' },
  { id: 'A5', lei: 'segunda e terceira leis de Newton dão a conservação do momento', esperado: 'segue',
    vocabulario: [...MASSAS, n('d1', 'variação da velocidade de 1'), n('d2', 'variação da velocidade de 2'), n('j1', 'impulso sobre 1'), n('j2', 'impulso sobre 2')],
    premissas: ['m1 > 0', 'm2 > 0', 'j1 = −j2', 'm1·d1 = j1', 'm2·d2 = j2'],
    conclusao: 'm1·d1 + m2·d2 = 0' },

  // B. Gravitação
  { id: 'B1', lei: 'órbita circular + gravitação de Newton dão a terceira lei de Kepler', esperado: 'segue',
    vocabulario: [n('G', 'constante gravitacional'), n('M', 'massa central'), n('r', 'raio da órbita'), n('v', 'velocidade na órbita'), n('T', 'período'), n('pi', 'o número π')],
    premissas: ['G > 0', 'M > 0', 'r > 0', 'v > 0', 'pi > 3.14', 'pi < 3.15', 'v^2 / r = G·M / r^2', 'T·v = 2·pi·r'],
    conclusao: 'T^2·G·M = 4·pi^2·r^3' },
  { id: 'B2', lei: 'teste da Lua: a 60 raios terrestres a aceleração é g/60²', esperado: 'segue',
    vocabulario: [n('G', 'constante gravitacional'), n('M', 'massa da Terra'), n('R', 'raio da Terra'), n('g', 'aceleração na superfície'), n('a', 'aceleração da Lua')],
    premissas: ['G > 0', 'M > 0', 'R > 0', 'g = G·M / R^2', 'a = G·M / (60·R)^2', 'g = 9.81'],
    conclusao: 'a > 0.0027 ∧ a < 0.0028' },

  // C. Relatividade restrita
  { id: 'C1', lei: 'o fator de Lorentz nunca é menor que 1', esperado: 'segue',
    vocabulario: [n('c', 'velocidade da luz'), n('v', 'velocidade'), n('y', 'fator de Lorentz')],
    premissas: ['c > 0', 'v ≥ 0', 'v < c', 'y > 0', 'y^2·(1 − v^2 / c^2) = 1'],
    conclusao: 'y ≥ 1' },
  { id: 'C2', lei: 'a soma relativística de velocidades abaixo de c fica abaixo de c', esperado: 'segue',
    vocabulario: [n('c', 'velocidade da luz'), n('u', 'velocidade 1'), n('v', 'velocidade 2'), n('w', 'soma relativística')],
    premissas: ['c > 0', 'u > −c', 'u < c', 'v > −c', 'v < c', 'w = (u + v) / (1 + u·v / c^2)'],
    conclusao: 'w < c ∧ w > −c' },
  { id: 'C3', lei: 'a soma de Galileu como lei absoluta contradiz o limite de c', esperado: 'contradiz',
    vocabulario: [n('c', 'velocidade da luz'), n('u', 'velocidade 1'), n('v', 'velocidade 2'), n('w', 'soma de Galileu')],
    premissas: ['c > 0', 'u = 0.6·c', 'v = 0.6·c', 'w = u + v'],
    conclusao: 'w < c' },
  { id: 'C4', lei: 'ponte: em velocidades até c/1000, a soma de Galileu erra no máximo 1 parte em um milhão', esperado: 'segue',
    vocabulario: [n('c', 'velocidade da luz'), n('u', 'velocidade 1'), n('v', 'velocidade 2'), n('w', 'soma relativística')],
    premissas: ['c > 0', 'u ≥ 0', 'v ≥ 0', 'u ≤ c / 1000', 'v ≤ c / 1000', 'w = (u + v) / (1 + u·v / c^2)'],
    conclusao: '(u + v) − w ≤ 0.000001·(u + v)' },
  { id: 'C5', lei: 'aniquilação em repouso: os dois fótons saem opostos, cada um com m·c²', esperado: 'segue',
    vocabulario: [n('m', 'massa da partícula (e da antipartícula)'), n('c', 'velocidade da luz'), n('e1', 'energia do fóton 1'), n('e2', 'energia do fóton 2'), n('p1', 'momento do fóton 1'), n('p2', 'momento do fóton 2')],
    premissas: ['m > 0', 'c > 0', 'e1 + e2 = 2·m·c^2', 'p1 + p2 = 0', 'e1 ≥ 0', 'e2 ≥ 0', 'e1^2 = p1^2·c^2', 'e2^2 = p2^2·c^2'],
    conclusao: 'e1 = m·c^2 ∧ e2 = m·c^2' },

  // D. Termodinâmica
  { id: 'D1', lei: 'a segunda lei (entropia dos reservatórios) dá o limite de Carnot', esperado: 'segue',
    vocabulario: [n('qh', 'calor tirado da fonte quente'), n('qc', 'calor entregue à fonte fria'), n('th', 'temperatura quente'), n('tc', 'temperatura fria'), n('w', 'trabalho')],
    premissas: ['th > tc', 'tc > 0', 'qh > 0', 'qc ≥ 0', 'w = qh − qc', 'qc / tc − qh / th ≥ 0'],
    conclusao: 'w ≤ qh·(1 − tc / th)' },
  { id: 'D2', lei: 'motor que transforma todo o calor em trabalho (moto-perpétuo de segunda espécie) contradiz a segunda lei', esperado: 'contradiz',
    vocabulario: [n('qh', 'calor tirado da fonte quente'), n('qc', 'calor entregue à fonte fria'), n('th', 'temperatura quente'), n('tc', 'temperatura fria')],
    premissas: ['th > tc', 'tc > 0', 'qh > 0', 'qc ≥ 0', 'qc / tc − qh / th ≥ 0'],
    conclusao: 'qc = 0' },
  { id: 'D3', lei: 'energia total conservada e energia livre que só desce: o calor acumulado cresce', esperado: 'segue',
    vocabulario: [n('e0', 'energia total antes'), n('e1', 'energia total depois'), n('u0', 'energia para gastar antes'), n('u1', 'energia para gastar depois'), n('g0', 'energia gasta (calor) antes'), n('g1', 'energia gasta (calor) depois')],
    premissas: ['e0 = u0 + g0', 'e1 = u1 + g1', 'e1 = e0', 'u1 ≤ u0', 'g0 ≥ 0', 'u0 > 0'],
    conclusao: 'g1 ≥ g0' },
  { id: 'D4', lei: 'a conservação sozinha não diz se a energia para gastar diminui: o gasto é outra lei (a segunda)', esperado: 'independente',
    vocabulario: [n('e0', 'energia total antes'), n('e1', 'energia total depois'), n('u0', 'energia para gastar antes'), n('u1', 'energia para gastar depois'), n('g0', 'energia gasta (calor) antes'), n('g1', 'energia gasta (calor) depois')],
    premissas: ['e0 = u0 + g0', 'e1 = u1 + g1', 'e1 = e0', 'g0 ≥ 0', 'g1 ≥ 0', 'u0 > 0'],
    conclusao: 'u1 < u0' },

  // E. Mecânica quântica
  { id: 'E1', lei: 'pela incerteza de Heisenberg, uma posição exata (Δx = 0) é impossível', esperado: 'contradiz',
    vocabulario: [n('dx', 'incerteza na posição'), n('dp', 'incerteza no momento'), n('h', 'constante de Planck reduzida')],
    premissas: ['h > 0', 'dx ≥ 0', 'dp ≥ 0', 'dx·dp ≥ h / 2'],
    conclusao: 'dx = 0' },
  { id: 'E2', lei: 'valores prévios e locais (Bell): a soma CHSH fica entre −2 e 2', esperado: 'segue',
    vocabulario: [n('a', 'resultado de A no ajuste 1'), n('a2', 'resultado de A no ajuste 2'), n('b', 'resultado de B no ajuste 1'), n('b2', 'resultado de B no ajuste 2'), n('s', 'soma CHSH')],
    premissas: ['a = 1 ∨ a = −1', 'a2 = 1 ∨ a2 = −1', 'b = 1 ∨ b = −1', 'b2 = 1 ∨ b2 = −1', 's = a·b + a·b2 + a2·b − a2·b2'],
    conclusao: 's ≤ 2 ∧ s ≥ −2' },
  { id: 'E3', lei: 'o valor medido 2√2 contradiz valores prévios e locais', esperado: 'contradiz',
    vocabulario: [n('a', 'resultado de A no ajuste 1'), n('a2', 'resultado de A no ajuste 2'), n('b', 'resultado de B no ajuste 1'), n('b2', 'resultado de B no ajuste 2'), n('s', 'soma CHSH')],
    premissas: ['a = 1 ∨ a = −1', 'a2 = 1 ∨ a2 = −1', 'b = 1 ∨ b = −1', 'b2 = 1 ∨ b2 = −1', 's = a·b + a·b2 + a2·b − a2·b2'],
    conclusao: 's^2 = 8' },

  // F. Os limites da lógica
  { id: 'F1', lei: 'a lei de queda entra pela solução em forma fechada, não pela derivada', esperado: 'segue',
    vocabulario: [fn('pos', 'posição no instante t'), n('g', 'aceleração da gravidade')],
    premissas: ['g = 9.81', '∀t∈ℝ (pos(t) = g·t^2 / 2)'],
    conclusao: 'pos(2) = 19.62' },
  { id: 'F2', lei: 'a exponencial só entra por axiomas, e com E(s+t) = E(s)·E(t) para todo real o Z3 não decide nem E(2) = E(1)²', esperado: 'nao-decidiu',
    vocabulario: [fn('E', 'a função exponencial')],
    premissas: ['E(0) = 1', '∀s∈ℝ ∀t∈ℝ (E(s + t) = E(s)·E(t))', '∀t∈ℝ (E(t) > 0)'],
    conclusao: 'E(2) = E(1)^2' },
  { id: 'F3', lei: 'com a instância dada (s = t = 1), a mesma conclusão sai na hora', esperado: 'segue',
    vocabulario: [fn('E', 'a função exponencial')],
    premissas: ['E(0) = 1', 'E(1 + 1) = E(1)·E(1)'],
    conclusao: 'E(2) = E(1)^2' },
  { id: 'F4', lei: 'os axiomas não fixam a base (E(1) entre 2,7 e 2,8, o número e): o Z3 não constrói a exponencial e não decide', esperado: 'nao-decidiu',
    vocabulario: [fn('E', 'a função exponencial')],
    premissas: ['E(0) = 1', '∀s∈ℝ ∀t∈ℝ (E(s + t) = E(s)·E(t))', '∀t∈ℝ (E(t) > 0)'],
    conclusao: 'E(1) > 2.7 ∧ E(1) < 2.8' },
  { id: 'F5', lei: 'a lei necessária (□) vale no mundo real para o caso dado', esperado: 'segue',
    vocabulario: [p('Aniq', 'x é uma aniquilação de matéria com antimatéria'), p('Luz', 'x vira luz'), o('ev', 'um evento')],
    premissas: ['□(∀x (Aniq(x) ⟹ Luz(x)))', 'Aniq(ev)'],
    conclusao: 'Luz(ev)' },
  { id: 'F6', lei: 'a condição inicial é contingente: o caso dado não vira necessário', esperado: 'independente',
    vocabulario: [p('Aniq', 'x é uma aniquilação de matéria com antimatéria'), p('Luz', 'x vira luz'), o('ev', 'um evento')],
    premissas: ['□(∀x (Aniq(x) ⟹ Luz(x)))', 'Aniq(ev)'],
    conclusao: '□Luz(ev)' },
  { id: 'F7', lei: 'a lógica não confere unidades: E = m·c (unidades erradas) passa sem queixa', esperado: 'segue',
    vocabulario: [n('E', 'energia'), n('m', 'massa'), n('c', 'velocidade da luz')],
    premissas: ['m = 2', 'c = 3', 'E = m·c'],
    conclusao: 'E = 6' },
  { id: 'F8', lei: 'com a testemunha dada, x³ + y³ + z³ = 33 se confere na hora (Booker, 2019)', esperado: 'segue',
    vocabulario: [n('x', 'primeiro inteiro'), n('y', 'segundo inteiro'), n('z', 'terceiro inteiro')],
    premissas: ['x = 8866128975287528', 'y = −8778405442862239', 'z = −2736111468807040'],
    conclusao: 'x^3 + y^3 + z^3 = 33' },
]

/** Sem a testemunha, a mesma pergunta sobre os inteiros: o Z3 não acha a resposta no prazo. */
export const SEM_TESTEMUNHA: Caso = { id: 'F9', lei: 'sem a testemunha, "existem inteiros com x³ + y³ + z³ = 33" não se decide no prazo', esperado: 'nao-decidiu',
  vocabulario: [], premissas: [], conclusao: '∃x∈ℤ ∃y∈ℤ ∃z∈ℤ (x^3 + y^3 + z^3 = 33)' }

describe('as leis da física na lógica do Cosmos (Z3 real)', () => {
  let api: Awaited<ReturnType<typeof import('z3-solver')['init']>>
  let encerrar: typeof import('z3-solver')['killThreads']
  beforeAll(async () => { const z3 = await import('z3-solver'); encerrar = z3.killThreads; api = await z3.init() }, 120_000)
  afterAll(async () => { if (api) await encerrar(api.em) })

  /** A regra da classificar (avaliacaoZ3.ts), com as fichas numéricas que a Conversa ainda não passa ao motor. */
  const classificarComNumeros = async (c: Caso, prazoMs: number): Promise<Resultado> => {
    const fichas: Ficha[] = c.vocabulario.map(({ simbolo, tipo, aridade, numerico, argumentos }) =>
      ({ simbolo, tipo, aridade, ...(numerico ? { numerico } : {}), ...(argumentos ? { argumentos } : {}) }))
    const numericos = new Set(c.vocabulario.filter((t) => t.numerico).map((t) => t.simbolo))
    const ler = (texto: string): Formula => {
      const v = validar(texto, comoDicionario(fichas))
      if (!v.ast || !v.ok) throw new Error(`"${texto}" não se lê: ${v.diags.find((d) => d.nivel === 'erro')?.msg ?? 'erro de leitura'}`)
      return expandir(v.ast)
    }
    const z = (fs: Formula[]): Promise<ResultadoZ3> => checarZ3(api, fs, prazoMs, numericos)
    const ps = c.premissas.map(ler)
    const base = await z(ps)
    if (base === 'unsat') return 'inconsistente'
    if (base !== 'sat') return 'nao-decidiu'
    const semConclusao = await z([...ps, ler(`¬(${c.conclusao})`)])
    const comConclusao = await z([...ps, ler(c.conclusao)])
    if (semConclusao === 'unknown' || comConclusao === 'unknown') return 'nao-decidiu'
    return semConclusao === 'unsat' ? 'segue' : comConclusao === 'unsat' ? 'contradiz' : 'independente'
  }

  const rodar = async (c: Caso, prazoMs: number): Promise<Resultado> => {
    const inicio = performance.now()
    const r = await classificarComNumeros(c, prazoMs)
    console.log('caso ' + JSON.stringify({ id: c.id, resultado: r, esperado: c.esperado, ms: Math.round(performance.now() - inicio) }))
    return r
  }

  it('cada lei dá o resultado esperado', async () => {
    for (const c of CASOS) expect.soft(await rodar(c, 20_000), `${c.id}: ${c.lei}`).toBe(c.esperado)
  }, 1_800_000)

  it('sem a testemunha, a pergunta sobre os inteiros não se decide no prazo', async () => {
    expect(await rodar(SEM_TESTEMUNHA, 10_000)).toBe(SEM_TESTEMUNHA.esperado)
  }, 300_000)
})
