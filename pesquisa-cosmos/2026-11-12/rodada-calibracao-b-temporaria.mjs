// Modelo: lambda=kappa*c+b; delta conhecido; kappa e b constantes entre leituras.
import { readFileSync } from 'node:fs'
import { createJiti } from 'jiti'
import { init, killThreads } from 'z3-solver'

const jiti = createJiti(import.meta.url, { fsCache: false })
const { analisar, nao, nomesNumericos } = await jiti.import('../../src/motor/motor.ts')
const { checarZ3ComNucleo } = await jiti.import('../../src/motor/z3.ts')
const base = JSON.parse(readFileSync(new URL('../../privado/projeto-tubo/base-tubo-v1.json', import.meta.url), 'utf8'))

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
    'rhoNova', 'hm', 'hr', 'hl', 'hsq', 'aUm', 'aDois', 'bUm', 'bDois', 's', 'rr', 'hc', 'modo', 'extra', 'visUm', 'visDois', 'total', 'luz', 'vel', 'energia', 'repouso', 'alpha', 'nm', 'wm', 'en', 'ew', 'em', 'cin', 'ep', 'mix', 'puro', 'kap', 'conc', 'fundo', 'delta', 'lam', 'lamMais', 'cc', 'bb', 'kk', 'h']
    .map(simbolo => ficha(simbolo, 'constante', 0, true)),
]
const numeros = nomesNumericos(dicionario)
const casos = [
  {
    "id": "FUNDO_KAPPA_SEGUE",
    "premissas": {
      "A": "kap > 0 ∧ conc ≥ 0 ∧ fundo ≥ 0 ∧ delta > 0",
      "B": "lam = kap × conc + fundo ∧ lamMais = kap × (conc + delta) + fundo"
    },
    "alvo": "kap × delta = lamMais − lam ∧ lamMais > lam",
    "esperado": "SEGUE"
  },
  {
    "id": "FUNDO_CB_NAO_IDENTIFICAVEL_SEGUE",
    "premissas": {
      "A": "kap > 0 ∧ conc > 0 ∧ fundo ≥ 0 ∧ delta > 0 ∧ h > 0 ∧ h < conc",
      "B": "cc = conc − h ∧ bb = fundo + kap × h"
    },
    "alvo": "cc ≥ 0 ∧ bb ≥ 0 ∧ cc < conc ∧ bb > fundo ∧ kap × cc + bb = kap × conc + fundo ∧ kap × (cc + delta) + bb = kap × (conc + delta) + fundo",
    "esperado": "SEGUE"
  },
  {
    "id": "FUNDO_UNICIDADE_KAPPA",
    "premissas": {
      "A": "delta > 0 ∧ lam = kap × conc + fundo ∧ lamMais = kap × (conc + delta) + fundo",
      "B": "lam = kk × cc + bb ∧ lamMais = kk × (cc + delta) + bb"
    },
    "alvo": "kap = kk",
    "esperado": "SEGUE"
  },
  {
    "id": "BRANCO_FECHA",
    "premissas": {
      "A": "kap > 0 ∧ lam = kap × conc + fundo",
      "B": "bb = fundo ∧ kap × cc = lam − bb"
    },
    "alvo": "cc = conc",
    "esperado": "SEGUE"
  }
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
      console.log(`${id}: premissas=${inicial.resultado}; consulta=${comAlvo.resultado}; negacao=${comNegacao.resultado}`)
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


