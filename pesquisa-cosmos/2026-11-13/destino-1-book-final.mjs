/** BOOK FINAL — pasta de entrega 13/11/2026, consolidado em 12/11/2026.
 * HIPÓTESE ADITIVA epsilon(n,w)=|n|hc/R+|w|hc R/alpha, não espectro completo de cordas.
 * Nenhuma medição física. Z3 prova apenas consequências das premissas A/B.
 * Energias keV, R pm, alpha pm², hc=197327/1000 keV pm (aproximação racional).
 * Luz 299792458 m/s; total de referência 1022 keV (arredondado).
 * Na seção 1, p em keV s/m e massa invariante mm em keV s²/m²;
 * converter keV para joules antes de interpretar como kg m/s e kg.
 * Tempos s e posições m. pUm/pDois são módulos de momentos opostos.
 * n,w inteiros; nm,wm são módulos, fixados em inteiros nos testemunhos.
 * Teoremas gerais sobre módulos reais não negativos também abrangem inteiros.
 * Cin é excesso cinético >=0 em keV; PICO significa limite, não linha observada.
 * TOF_MODO prova v<c; TOF_MODO_NUMERICO prova intervalo de arredondamento,
 * nunca a igualdade exata v/c=0.75323. Delta_c/c=v/c-1.
 * DEGENERESCENCIA usa |n|=|w|=1; R²=alpha sozinho não basta para n,w arbitrários.
 * DISTINCAO compara (1,1) com modos UNITÁRIOS. A alegação de exclusividade
 * contra todo campo pontual é falsa no modelo: (2,0) tem energia igual.
 * EXCLUSIVIDADE_CONTRAEXEMPLO preserva explicitamente essa refutação.
 * Cheiro: kap m³/s; conc,delta m^-3; fundo,lam s^-1; ganhos/fundos estáveis.
 * Precisão de amostras finitas e custo físico não são provados por Z3.
 * Mapeamento INTERPRETATIVO: Axioma4 -> kap/R (dois parâmetros em modelos
 * distintos, não o quociente kap dividido por R); Axioma5 -> fundo médio b;
 * c -> concentração LOCAL; T01–T03 -> observação parcial;
 * T09 -> motivação para custo temporal (não sua dedução); T10 -> emissão.
 * Regras T01–T13 não implicam sozinhas estas equações físicas.
 * Base: relatórios locais Destino 1, corda, winding, conexões 16 e 17.
 * Não é script autossuficiente: usa analisador Cosmos, base Tubo e z3-solver.
 */
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
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
    'rhoNova', 'hm', 'hr', 'hl', 'hsq', 'aUm', 'aDois', 'bUm', 'bDois', 's', 'rr', 'hc', 'modo', 'extra', 'visUm', 'visDois', 'total', 'luz', 'vel', 'energia', 'repouso', 'alpha', 'nm', 'wm', 'en', 'ew', 'em', 'cin', 'ep', 'mix', 'puro', 'ee', 'eUm', 'eDois', 'pUm', 'pDois', 'mm', 'xx', 'yy', 'tUm', 'tDois', 'll', 'lim', 'des', 'tt', 'estim', 'kap', 'conc', 'lam', 'kapDois', 'concDois', 'delta', 'lamMais', 'fundo', 'cc', 'bb', 'kk', 'h']
    .map(simbolo => ficha(simbolo, 'constante', 0, true)),
]
const numeros = nomesNumericos(dicionario)
const casos = [
  {
    "id": "DOIS",
    "premissas": {
      "A": "ee > 0 ∧ luz > 0",
      "B": "eUm + eDois = ee ∧ eUm = luz × pUm ∧ eDois = luz × pDois ∧ pUm = pDois ∧ pUm > 0"
    },
    "alvo": "2 × eUm = ee ∧ 2 × eDois = ee",
    "esperado": "SEGUE"
  },
  {
    "id": "UM",
    "premissas": {
      "A": "ee > 0 ∧ luz > 0 ∧ eUm = ee",
      "B": "eUm = luz × pUm ∧ pUm ≥ 0"
    },
    "alvo": "pUm = 0",
    "esperado": "CONTRADIZ"
  },
  {
    "id": "MASSA",
    "premissas": {
      "A": "eUm > 0 ∧ luz > 0 ∧ mm ≥ 0",
      "B": "mm × mm × luz × luz × luz × luz = 4 × eUm × eUm"
    },
    "alvo": "mm > 0 ∧ mm × luz × luz = 2 × eUm",
    "esperado": "SEGUE"
  },
  {
    "id": "LIMIAR",
    "premissas": {
      "A": "xx < yy ∧ luz > 0",
      "B": "luz × tUm = 2 × xx − ll ∧ luz × tDois = 2 × yy − ll ∧ 2 × lim = tUm + tDois"
    },
    "alvo": "tUm < lim ∧ lim < tDois ∧ luz × (tDois − tUm) = 2 × (yy − xx)",
    "esperado": "SEGUE"
  },
  {
    "id": "VIES",
    "premissas": {
      "A": "luz > 0 ∧ (des > 0 ∨ des < 0)",
      "B": "luz × tt = 2 × xx − ll + luz × des ∧ luz × tt = 2 × estim − ll"
    },
    "alvo": "2 × (estim − xx) = luz × des ∧ (estim > xx ∨ estim < xx)",
    "esperado": "SEGUE"
  },
  {
    "id": "DOIS_R",
    "premissas": {
      "A": "rr > 0 ∧ hc > 0 ∧ modo > 0 ∧ rr × extra = modo × hc",
      "B": "cin ≥ 0 ∧ visUm > 0 ∧ visDois > 0 ∧ visUm + visDois + 2 × extra + cin = total"
    },
    "alvo": "visUm + visDois ≤ total − 2 × extra",
    "esperado": "SEGUE"
  },
  {
    "id": "PICO",
    "premissas": {
      "A": "rr = 1 ∧ modo = 1 ∧ 1000 × hc = 197327 ∧ total = 1022",
      "B": "rr × extra = modo × hc ∧ visUm = visDois ∧ visUm + visDois + 2 × extra = total"
    },
    "alvo": "1000 × visUm = 313673",
    "esperado": "SEGUE"
  },
  {
    "id": "SEM_CANAL",
    "premissas": {
      "A": "rr = 1 ∧ modo = 1 ∧ hc > 0 ∧ total = 1022 ∧ rr × extra = modo × hc",
      "B": "visUm = visDois ∧ visUm + visDois + 2 × extra = total"
    },
    "alvo": "visUm = 511",
    "esperado": "CONTRADIZ"
  },
  {
    "id": "TOF_MODO",
    "premissas": {
      "A": "luz > 0 ∧ vel > 0 ∧ energia > repouso ∧ repouso > 0",
      "B": "vel × vel × energia × energia = luz × luz × (energia × energia − repouso × repouso)"
    },
    "alvo": "vel < luz",
    "esperado": "SEGUE"
  },
  {
    "id": "TOF_MODO_NUMERICO",
    "premissas": {
      "A": "luz = 299792458 ∧ energia = 300 ∧ 1000 × repouso = 197327 ∧ vel > 0",
      "B": "vel × vel × energia × energia = luz × luz × (energia × energia − repouso × repouso)"
    },
    "alvo": "1000000 × vel > 753225 × luz ∧ 1000000 × vel < 753235 × luz",
    "esperado": "SEGUE"
  },
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
  },
  {
    "id": "ESCALA_INVISIVEL",
    "premissas": {
      "A": "kap > 0 ∧ conc > 0 ∧ lam = kap × conc",
      "B": "kapDois = 2 × kap ∧ 2 × concDois = conc"
    },
    "alvo": "kapDois × concDois = lam ∧ concDois < conc",
    "esperado": "SEGUE"
  },
  {
    "id": "CALIBRACAO",
    "premissas": {
      "A": "kap > 0 ∧ conc > 0 ∧ delta > 0 ∧ lam = kap × conc",
      "B": "lamMais = kap × (conc + delta)"
    },
    "alvo": "lamMais > lam ∧ (lamMais − lam) × conc = lam × delta",
    "esperado": "SEGUE"
  },
  {
    "id": "UNICIDADE",
    "premissas": {
      "A": "delta > 0 ∧ kap > 0 ∧ kapDois > 0 ∧ lam = kap × conc ∧ lam = kapDois × concDois",
      "B": "lamMais = kap × (conc + delta) ∧ lamMais = kapDois × (concDois + delta)"
    },
    "alvo": "kap = kapDois ∧ conc = concDois",
    "esperado": "SEGUE"
  },
  {
    "id": "GANHO_INSTAVEL",
    "premissas": {
      "A": "kap = 1 ∧ conc = 10 ∧ delta = 2 ∧ lam = kap × conc",
      "B": "kapDois = 2 ∧ lamMais = kapDois × (conc + delta)"
    },
    "alvo": "(lamMais − lam) × conc = lam × delta",
    "esperado": "CONTRADIZ"
  },
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
let aprovados = 0
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
      if (comAlvo.resultado === 'unsat' && comNegacao.resultado === 'sat') {
        status = 'CONTRADIZ'
        nucleo = comAlvo.nucleo
      } else if (comNegacao.resultado === 'unsat' && comAlvo.resultado === 'sat') {
        status = 'SEGUE'
        nucleo = comNegacao.nucleo
      } else {
        status = comAlvo.resultado === 'sat' && comNegacao.resultado === 'sat' ? 'EM ABERTO' : 'INCONCLUSIVO'
      }
    }
    const envolvidos = nucleo?.map(indice => nomes[indice] ?? 'consulta').join(', ')
    console.log(`${id} ${status}${envolvidos ? ` [${envolvidos}]` : ''}`)
    const valido = inicial.resultado === 'sat' && status === esperado
    if (valido) aprovados++
    if (!valido) {
      console.error(`${id}: esperado ${esperado}, recebido ${status}`)
      process.exitCode = 1
    }
  }
} finally {
  await killThreads(api.em)
}



const referencia = Object.freeze({luz:299792458, ee:1022, hc:197327/1000, R:1, alpha:1})
console.log('REFERENCIA', JSON.stringify(referencia))
for (const [n,w] of [[1,0],[0,1],[1,1]]) {
 const milli=(n+w)*197327
 console.log(`MODO (${n},${w}): epsilon=${(milli/1000).toFixed(3)} keV; soma=${((1022000-2*milli)/1000).toFixed(3)} keV; Egamma=${((511000-milli)/1000).toFixed(3)} keV`)
}
const razao=Math.sqrt(1-(referencia.hc/300)**2)
console.log(`TOF ilustrativo: v/c=${razao}; Delta_c/c=${razao-1}`)
console.log('MAPEAMENTO interpretativo: Axioma4 -> kappa/R (parametros distintos); Axioma5 -> b; c -> concentracao LOCAL; T01-T03 -> observacao parcial; T09 -> custo temporal como investigacao; T10 -> emissao')
console.log('DISTINCAO nao exclusiva: (1,1) coincide com (2,0) no ponto R²=alpha. Nenhuma assinatura experimental de corda demonstrada.')
if (aprovados !== casos.length) process.exitCode=1
console.log(`BOOK FINAL: ${aprovados}/${casos.length} teoremas SEGUE/CONTRADIZ conforme esperado - ${process.exitCode ? 'FALHA' : 'código zero'}`)
console.log(`SHA-256: ${createHash('sha256').update(readFileSync(new URL(import.meta.url))).digest('hex')}`)
