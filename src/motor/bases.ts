// As bases locais (especificacao/bases-locais-v1.md): uma base de fatos que a pessoa mantém no próprio computador, no
// mesmo formato da realidade-v1, para a camada de fatos (realidade.ts) conferir o que se diz contra ela. A base não entra
// no repositório nem sai do aparelho: o serviço local a lê de uma pasta fora do Git. O que vem do arquivo não é aceito
// como está: cada campo é conferido, cada fórmula tem de ler com o vocabulário, e nenhum símbolo ou fato da realidade-v1
// pode ser redefinido. Antes do primeiro uso, o Z3 confere que a base inteira não tem contradição: uma contradição
// admitida tornaria tudo "fato" (do impossível segue qualquer coisa), então a base contraditória é recusada, com os fatos
// que colidem.

import { lerFormula, type Termo } from './avaliacao'
import { BASE_REAL, type Base, type ClassificarComVocabulario } from './realidade'
import type { Fato, TermoReal } from '../dados/realidade-v1'

export const FORMATO_BASE = 'cosmos-base-v1'
export const BASE_REAL_NOME = 'realidade-v1'
export const MAX_TERMOS_BASE = 200
export const MAX_FATOS_BASE = 500

export interface BaseNomeada extends Base {
  nome: string
  descricao: string
  /** a base foi somada à realidade-v1 ("juntarCom": ["realidade-v1"]) */
  comRealidade: boolean
}

export class ErroBase extends Error {}

const texto = (s: unknown, max: number): s is string => typeof s === 'string' && s.trim().length > 0 && s.length <= max
const so = (o: Record<string, unknown>, permitidas: string[], onde: string) => {
  const sobra = Object.keys(o).filter((k) => !permitidas.includes(k))
  if (sobra.length) throw new ErroBase(`${onde}: campo desconhecido "${sobra[0]}"`)
}
const objeto = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x) && Object.getPrototypeOf(x) === Object.prototype

function lerTermo(x: unknown, i: number): TermoReal {
  const onde = `vocabulário, termo ${i + 1}`
  if (!objeto(x)) throw new ErroBase(`${onde}: não é um objeto`)
  so(x, ['simbolo', 'tipo', 'aridade', 'leitura', 'sinonimos', 'especie'], onde)
  if (typeof x.simbolo !== 'string' || !/^[A-Z][A-Za-z0-9]{0,39}$/.test(x.simbolo)) throw new ErroBase(`${onde}: o símbolo começa com maiúscula e tem só letras e números (até 40)`)
  if (x.tipo !== 'predicado') throw new ErroBase(`${onde} (${x.simbolo}): só predicados entram numa base`)
  if (!Number.isSafeInteger(x.aridade) || (x.aridade as number) < 1 || (x.aridade as number) > 3) throw new ErroBase(`${onde} (${x.simbolo}): a aridade vai de 1 a 3`)
  if (!texto(x.leitura, 300) || !/\bx\b/.test(x.leitura)) throw new ErroBase(`${onde} (${x.simbolo}): a leitura diz o que x é ou faz ("x é uma macieira"), até 300 caracteres`)
  if (!Array.isArray(x.sinonimos) || x.sinonimos.length > 40 || !x.sinonimos.every((s) => texto(s, 80))) throw new ErroBase(`${onde} (${x.simbolo}): os sinônimos são uma lista de até 40 textos curtos`)
  if (x.especie !== undefined && x.especie !== true) throw new ErroBase(`${onde} (${x.simbolo}): "especie" só pode ser true`)
  return { simbolo: x.simbolo, tipo: 'predicado', aridade: x.aridade as number, leitura: x.leitura, sinonimos: x.sinonimos as string[], ...(x.especie ? { especie: true as const } : {}) }
}

function lerFato(x: unknown, i: number, vocabulario: Termo[]): Fato {
  const onde = `fatos, item ${i + 1}`
  if (!objeto(x)) throw new ErroBase(`${onde}: não é um objeto`)
  so(x, ['id', 'enunciado', 'formula', 'fonte'], onde)
  // o id cabe no resultado que a interface confere (até 10 caracteres)
  if (typeof x.id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9-]{0,9}$/.test(x.id)) throw new ErroBase(`${onde}: o id tem até 10 letras, números ou hífens`)
  if (!texto(x.enunciado, 1000)) throw new ErroBase(`${onde} (${x.id}): falta o enunciado em português (até 1000 caracteres)`)
  if (!texto(x.formula, 1000)) throw new ErroBase(`${onde} (${x.id}): falta a fórmula (até 1000 caracteres)`)
  try { lerFormula(x.formula, vocabulario) } catch (e) { throw new ErroBase(`${onde} (${x.id}): a fórmula não lê: ${(e as Error).message}`) }
  if (!objeto(x.fonte)) throw new ErroBase(`${onde} (${x.id}): falta a fonte`)
  so(x.fonte, ['nome', 'url'], `${onde} (${x.id}), fonte`)
  if (!texto(x.fonte.nome, 300)) throw new ErroBase(`${onde} (${x.id}): a fonte tem um nome (até 300 caracteres)`)
  if (x.fonte.url !== undefined && (typeof x.fonte.url !== 'string' || x.fonte.url.length > 500 || !/^https:\/\/[^\s]+$/.test(x.fonte.url))) throw new ErroBase(`${onde} (${x.id}): o endereço da fonte começa com https://`)
  return { id: x.id, enunciado: x.enunciado, formula: x.formula, fonte: { nome: x.fonte.nome, ...(x.fonte.url ? { url: x.fonte.url as string } : {}) } }
}

/** Lê e confere uma base vinda de um arquivo. Lança ErroBase com o motivo, em português. */
export function lerBase(x: unknown): BaseNomeada {
  if (!objeto(x)) throw new ErroBase('a base não é um objeto JSON')
  so(x, ['formato', 'nome', 'descricao', 'juntarCom', 'vocabulario', 'fatos'], 'base')
  if (x.formato !== FORMATO_BASE) throw new ErroBase(`o formato tem de ser "${FORMATO_BASE}"`)
  if (typeof x.nome !== 'string' || !/^[a-z0-9][a-z0-9-]{0,39}$/.test(x.nome) || x.nome === BASE_REAL_NOME) throw new ErroBase(`o nome tem letras minúsculas, números e hífens (até 40) e não pode ser "${BASE_REAL_NOME}"`)
  if (!texto(x.descricao, 500)) throw new ErroBase('falta a descrição (até 500 caracteres)')
  const junta = x.juntarCom === undefined ? [] : x.juntarCom
  if (!Array.isArray(junta) || !junta.every((j) => j === BASE_REAL_NOME)) throw new ErroBase(`"juntarCom" só aceita "${BASE_REAL_NOME}"`)
  const comRealidade = junta.length > 0
  if (!Array.isArray(x.vocabulario) || !x.vocabulario.length || x.vocabulario.length > MAX_TERMOS_BASE) throw new ErroBase(`o vocabulário tem de 1 a ${MAX_TERMOS_BASE} termos`)
  if (!Array.isArray(x.fatos) || !x.fatos.length || x.fatos.length > MAX_FATOS_BASE) throw new ErroBase(`a base tem de 1 a ${MAX_FATOS_BASE} fatos`)
  const proprios = x.vocabulario.map(lerTermo)
  const herdados = comRealidade ? BASE_REAL.vocabulario : []
  const simbolos = new Set<string>()
  for (const t of [...herdados, ...proprios]) {
    if (simbolos.has(t.simbolo)) throw new ErroBase(`o símbolo ${t.simbolo} aparece duas vezes${comRealidade && herdados.some((h) => h.simbolo === t.simbolo) ? ` (já existe na ${BASE_REAL_NOME}; use outro nome)` : ''}`)
    simbolos.add(t.simbolo)
  }
  const vocabulario = [...herdados, ...proprios]
  const leitura = vocabulario.map(({ simbolo, tipo, aridade, leitura }) => ({ simbolo, tipo, aridade, leitura }))
  const fatos = x.fatos.map((f, i) => lerFato(f, i, leitura))
  const ids = new Set<string>()
  for (const f of [...(comRealidade ? BASE_REAL.fatos : []), ...fatos]) {
    if (ids.has(f.id)) throw new ErroBase(`o fato ${f.id} aparece duas vezes${comRealidade ? ` (os ids da ${BASE_REAL_NOME} são R01 a R31)` : ''}`)
    ids.add(f.id)
  }
  return { nome: x.nome, descricao: x.descricao, comRealidade, vocabulario, fatos: [...(comRealidade ? BASE_REAL.fatos : []), ...fatos] }
}

export type Consistencia = { consistente: true } | { consistente: false; colidem: string[] } | { consistente: null; motivo: string }

/**
 * A base inteira tem modelo? Se não tem, devolve os fatos que colidem: um conjunto mínimo (tirar qualquer um deles
 * desfaz a contradição), achado tirando um fato por vez. Z3 sem decidir não é aceito como consistente.
 */
export async function conferirConsistencia(classificar: ClassificarComVocabulario, base: Base): Promise<Consistencia> {
  const v: Termo[] = base.vocabulario.map(({ simbolo, tipo, aridade, leitura }) => ({ simbolo, tipo, aridade, leitura }))
  const p = base.vocabulario[0]
  const vars = ['x', 'y', 'z'].slice(0, p.aridade)
  const atomo = `${p.simbolo}(${vars.join(', ')})`
  const tautologia = `${vars.map((x) => `∀${x}`).join(' ')} (${atomo} ⟹ ${atomo})`
  const tem = async (fatos: Fato[]): Promise<boolean> => {
    try { await classificar(v, fatos.map((f) => f.formula), tautologia); return true } catch (e) {
      if (/inconsistentes/.test((e as Error).message)) return false
      throw e
    }
  }
  try {
    if (await tem(base.fatos)) return { consistente: true }
    let colidem = [...base.fatos]
    for (const f of base.fatos) {
      const sem = colidem.filter((x) => x !== f)
      if (!(await tem(sem))) colidem = sem
    }
    return { consistente: false, colidem: colidem.map((f) => f.id) }
  } catch (e) {
    return { consistente: null, motivo: (e as Error).message }
  }
}
