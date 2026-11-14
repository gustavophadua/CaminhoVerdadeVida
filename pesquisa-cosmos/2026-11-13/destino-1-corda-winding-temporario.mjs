/** Hipótese ADITIVA: epsilon=|n|hc/R+|w|hc R/alpha.
 * Escolhida para testar o limite aditivo explicitamente solicitado, NÃO como
 * espectro completo de corda quantizada (osciladores e restrições ausentes).
 * R em pm (>0), alpha em pm² (>0), energias em keV; 1 pm=1e-12 m.
 * hc=197327/1000 keV pm é aproximação física tratada como racional exato.
 * c=299792458 m/s. n,w inteiros; nm,wm representam seus módulos.
 * Teorema geral vale até para módulos reais >=0; testemunhos fixam inteiros.
 * Par (+n,+w),(-n,-w) conserva ambas cargas. Energia 3D:
 * sqrt((p c)^2+epsilon^2), com unidades compatíveis; excesso cinético >=0.
 * E=1022 keV é energia inicial arredondada adotada exatamente no ensaio.
 * PICO significa borda simétrica, não taxa nem linha espectral demonstrada.
 */
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
    'rhoNova', 'hm', 'hr', 'hl', 'hsq', 'aUm', 'aDois', 'bUm', 'bDois', 's', 'rr', 'hc', 'modo', 'extra', 'visUm', 'visDois', 'total', 'luz', 'vel', 'energia', 'repouso', 'alpha', 'nm', 'wm', 'en', 'ew', 'em', 'cin', 'ep', 'mix', 'puro']
    .map(simbolo => ficha(simbolo, 'constante', 0, true)),
]
const numeros = nomesNumericos(dicionario)
const casos = [
  {
    "id": "DOIS_RW",
    "premissas": {
      "A": "rr > 0 ∧ alpha > 0 ∧ hc > 0 ∧ nm ≥ 0 ∧ wm ≥ 0 ∧ rr × en = nm × hc ∧ alpha × ew = wm × hc × rr ∧ em = en + ew",
      "B": "total = 1022 ∧ cin ≥ 0 ∧ visUm > 0 ∧ visDois > 0 ∧ visUm + visDois + 2 × em + cin = total"
    },
    "alvo": "visUm + visDois ≤ total − 2 × em",
    "esperado": "SEGUE"
  },
  {
    "id": "PICO_RW",
    "premissas": {
      "A": "rr = 1 ∧ alpha = 1 ∧ nm = 1 ∧ wm = 1 ∧ 1000 × hc = 197327 ∧ rr × en = nm × hc ∧ alpha × ew = wm × hc × rr ∧ em = en + ew",
      "B": "total = 1022 ∧ visUm = visDois ∧ visUm + visDois + 2 × em = total"
    },
    "alvo": "1000 × em = 394654 ∧ 1000 × (2 × em) = 789308 ∧ 1000 × (visUm + visDois) = 232692 ∧ 1000 × visUm = 116346",
    "esperado": "SEGUE"
  },
  {
    "id": "DEGENERESCENCIA",
    "premissas": {
      "A": "rr > 0 ∧ alpha = rr × rr ∧ hc > 0 ∧ nm = 1 ∧ wm = 1",
      "B": "rr × en = nm × hc ∧ alpha × ew = wm × hc × rr"
    },
    "alvo": "en = ew",
    "esperado": "SEGUE"
  },
  {
    "id": "DISTINCAO",
    "premissas": {
      "A": "rr = 1 ∧ alpha = 1 ∧ 1000 × hc = 197327 ∧ rr × en = hc ∧ alpha × ew = hc × rr",
      "B": "em = en + ew ∧ puro = 511 − en ∧ mix = 511 − em"
    },
    "alvo": "en = ew ∧ em > en ∧ mix < puro ∧ mix > 0",
    "esperado": "SEGUE"
  },
  {
    "id": "RECUPERA_MOMENTO",
    "premissas": {
      "A": "rr = 1 ∧ alpha > 0 ∧ nm = 1 ∧ wm = 0 ∧ 1000 × hc = 197327 ∧ rr × en = nm × hc ∧ alpha × ew = wm × hc × rr",
      "B": "em = en + ew ∧ visUm = visDois ∧ visUm + visDois + 2 × em = 1022"
    },
    "alvo": "1000 × (visUm + visDois) = 627346 ∧ 1000 × visUm = 313673",
    "esperado": "SEGUE"
  },
  {
    "id": "EXCLUSIVIDADE_CONTRAEXEMPLO",
    "premissas": {
      "A": "rr = 1 ∧ alpha = 1 ∧ hc > 0 ∧ rr × en = hc ∧ alpha × ew = hc × rr",
      "B": "em = en + ew ∧ rr × ep = 2 × hc"
    },
    "alvo": "em > ep ∨ em < ep",
    "esperado": "CONTRADIZ"
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


console.log('n,w | epsilon keV | soma maxima keV | Egamma simetrico keV')
for (const [n,w] of [[1,0],[0,1],[1,1]]) {
 const e=(n+w)*197327; // inteiros em unidades de 0.001 keV
 console.log(`${n},${w} | ${(e/1000).toFixed(3)} | ${((1022000-2*e)/1000).toFixed(3)} | ${((511000-e)/1000).toFixed(3)}`)
}
