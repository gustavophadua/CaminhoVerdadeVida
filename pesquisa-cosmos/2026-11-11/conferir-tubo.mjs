import { readFileSync } from 'node:fs'
import { createJiti } from 'jiti'
import { init, killThreads } from 'z3-solver'

const jiti = createJiti(import.meta.url, { fsCache: false })
const { analisar, nao, nomesNumericos } = await jiti.import('../../src/motor/motor.ts')
const { checarZ3ComNucleo } = await jiti.import('../../src/motor/z3.ts')
const base = JSON.parse(readFileSync(new URL('../../autor/projeto-tubo/base-tubo-v1.json', import.meta.url), 'utf8'))

const ficha = (simbolo, tipo, aridade, numerico = false) => ({
  id: simbolo, termo: simbolo, simbolo, tipo, aridade, definicao: '', numerico,
})
const dicionario = [
  ...base.vocabulario.map(({ simbolo, tipo, aridade }) => ficha(simbolo, tipo, aridade)),
  ...['Humano', 'PercebeTudo', 'Dorme', 'FechaObservador', 'AcessoConscienteExterno',
    'RespostaSensorial', 'Experiencia', 'ReativaMemoria', 'RelatoEmbacado']
    .map(simbolo => ficha(simbolo, 'predicado', 1)),
  ...['Et', 'R', 'K', 'G', 'Q', 'Kg', 'Gg', 'Rg', 'E', 'n', 'N', 'r', 'rIni',
    'mi', 'ai', 'mf', 'af', 'p', 'rho', 'volume', 'volumeNovo',
    'rhoNova', 'hm', 'hr', 'hl', 'hsq', 'aUm', 'aDois', 'bUm', 'bDois', 's']
    .map(simbolo => ficha(simbolo, 'constante', 0, true)),
]
const numeros = nomesNumericos(dicionario)
const tubo = Object.fromEntries(base.fatos.map(({ id, formula }) => [id, formula]))
const sono = {
  B1: 'Humano(h) ∧ Dorme(h)',
  H1: '∀x (Dorme(x) ⟹ FechaObservador(x))',
  H2: '∀x (FechaObservador(x) ⟹ ¬AcessoConscienteExterno(x))',
  B2: 'Dorme(hSom) ∧ RespostaSensorial(hSom)',
  B3: 'Dorme(hSonho) ∧ Experiencia(hSonho)',
  B4: 'Dorme(hMemoria) ∧ ReativaMemoria(hMemoria)',
}
// Cada constante representa um caso de sono. Os três estudos oferecem
// testemunhos de tipos diferentes, sem exigir um participante em comum.
const energia = {
  F1: 'E = R + K + G',
  F2: 'R = 50 ∧ K = 30 ∧ G = 20',
  F3: 'Q = 10 ∧ Rg = R ∧ Kg = K − Q ∧ Gg = G + Q',
  F4: 'Et = Rg + Kg + Gg',
}
const possibilidades = { M1: 'N = 100 ∧ n = 60', M2: 'n ≥ 0 ∧ n ≤ N' }
const cone = { M3: 'E > 0 ∧ rIni > 0 ∧ r ≥ 0', M4: 'E × r × r = rIni × rIni × (E − G)' }
const pares = { F5: 'mi = ai', F6: 'mf = mi − p ∧ af = ai − p', F7: 'p > 0 ∧ mf ≥ 0 ∧ af ≥ 0' }
const friedmann = { C1: 'hsq = hm + hr + hl', C2: 'hm ≥ 0 ∧ hr ≥ 0 ∧ hl > 0' }

const casos = [
  { id: 'TUBO', premissas: tubo, esperado: 'CONSISTENTE' },
  { id: 'BIO1', premissas: { ...tubo, ...sono }, alvo: 'Fragmento(h) ∧ FechaObservador(h)', esperado: 'SEGUE' },
  { id: 'BIO2', premissas: { ...tubo, ...sono }, alvo: 'RelatoEmbacado(h)', esperado: 'EM ABERTO' },
  { id: 'BIO3', premissas: { ...tubo, ...sono }, alvo: '∀x (FechaObservador(x) ⟹ ¬RespostaSensorial(x))', esperado: 'CONTRADIZ' },
  { id: 'BIO4', premissas: { ...tubo, ...sono }, alvo: '∀x (FechaObservador(x) ⟹ ¬Experiencia(x))', esperado: 'CONTRADIZ' },
  { id: 'BIO5', premissas: { ...tubo, B1: sono.B1 }, alvo: '∀x (Dorme(x) ⟹ Descansa(x))', esperado: 'CONTRADIZ' },
  { id: 'BIO6', premissas: { ...tubo, ...sono }, alvo: '∀x (Dorme(x) ⟹ ReativaMemoria(x))', esperado: 'EM ABERTO' },
  { id: 'ENE1', premissas: energia, alvo: 'Et = E ∧ Gg = 30 ∧ Rg + Kg = 70', esperado: 'SEGUE' },
  { id: 'ENE2', premissas: energia, alvo: 'Et > E', esperado: 'CONTRADIZ' },
  { id: 'ENE3', premissas: energia, alvo: 'n = N', esperado: 'EM ABERTO' },
  { id: 'MAT1', premissas: { ...possibilidades, ...cone, M5: 'G = E' }, alvo: 'r = 0 ∧ n < N', esperado: 'SEGUE' },
  { id: 'MAT2', premissas: { ...cone, M6: '100 × G = 99 × E' }, alvo: '10 × r = rIni', esperado: 'SEGUE' },
  { id: 'FIS1', premissas: pares, alvo: 'mf > af', esperado: 'CONTRADIZ' },
  { id: 'FIS2', premissas: friedmann, alvo: 'hsq = 0', esperado: 'CONTRADIZ' },
  {
    id: 'FIS3',
    premissas: { C3: 'rho = 2 ∧ volume = 1 ∧ volumeNovo = 8', C4: 'rhoNova × 16 = rho' },
    alvo: '2 × rhoNova × volumeNovo = rho × volume',
    esperado: 'SEGUE',
  },
  {
    id: 'FIS4',
    premissas: {
      Q1: 'aUm × aUm = 1 ∧ aDois × aDois = 1 ∧ bUm × bUm = 1 ∧ bDois × bDois = 1',
      Q2: 's = aUm × (bUm + bDois) + aDois × (bUm − bDois)',
    },
    alvo: 's > 2',
    esperado: 'CONTRADIZ',
  },
]

const api = await init()
try {
  for (const { id, premissas, alvo, esperado } of casos) {
    const nomes = Object.keys(premissas)
    const textos = [...Object.values(premissas), ...(alvo ? [alvo] : [])]
    const prontos = analisar(textos, dicionario, true)
    if (prontos.length !== textos.length || prontos.some(({ texto }, i) => texto !== textos[i])) {
      throw new Error(`${id}: fórmula recusada: ${textos.filter(texto => !prontos.some(p => p.texto === texto)).join('; ')}`)
    }
    const fs = prontos.map(({ expandida }) => expandida)
    const consulta = alvo ? fs.pop() : null
    const checar = extra => {
      const formulas = extra ? [...fs, extra] : fs
      return checarZ3ComNucleo(api, formulas, 10_000, numeros, formulas.map((_, i) => i))
    }
    const inicial = await checar(null)
    let status = inicial.resultado === 'sat' ? 'CONSISTENTE' : inicial.resultado
    let nucleo = inicial.nucleo
    if (consulta && inicial.resultado === 'sat') {
      const comAlvo = await checar(consulta)
      const comNegacao = await checar(nao(consulta))
      if (comAlvo.resultado === 'unsat') {
        status = 'CONTRADIZ'
        nucleo = comAlvo.nucleo
      } else if (comNegacao.resultado === 'unsat') {
        status = 'SEGUE'
        nucleo = comNegacao.nucleo
      } else {
        status = comAlvo.resultado === 'sat' && comNegacao.resultado === 'sat' ? 'EM ABERTO' : 'INCONCLUSIVO'
      }
    }
    const envolvidos = nucleo?.map(indice => nomes[indice] ?? 'consulta').join(', ')
    console.log(`${id} ${status}${envolvidos ? ` [${envolvidos}]` : ''}`)
    if (status !== esperado) {
      console.error(`${id}: esperado ${esperado}, recebido ${status}`)
      process.exitCode = 1
    }
  }
} finally {
  await killThreads(api.em)
}
