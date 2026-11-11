// O conjunto fechado revelado (avaliacao/fechado-v1/, especificacao/avaliacao-v1.md §3): os itens e os sais publicados
// refazem os 120 compromissos e a raiz carimbada no Bitcoin antes de qualquer treino (bloco 973304), e as respostas e as
// notas das duas medições têm os SHA-256 que os resumos carimbados declaram. Sem Z3: só hashes.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { CLASSES, compromissoDoItem, raizDoConjunto, type Item } from '../src/motor/avaliacao'

const PASTA = 'avaliacao/fechado-v1'
const sha = (arquivo: string) => createHash('sha256').update(readFileSync(arquivo)).digest('hex')
const linhas = readFileSync(`${PASTA}/conjunto.jsonl`, 'utf8').split('\n').filter(Boolean)
  .map((l) => JSON.parse(l) as { sal: string; padrao: string; item: Item })
const publicado = JSON.parse(readFileSync('avaliacao/conjunto-fechado-v1.json', 'utf8'))

describe('o conjunto fechado revelado', () => {
  it('os itens e os sais refazem os compromissos e a raiz carimbada', async () => {
    expect(linhas).toHaveLength(publicado.itens)
    expect(linhas.every((l) => /^[0-9a-f]{64}$/.test(l.sal))).toBe(true)
    const compromissos = await Promise.all(linhas.map((l) => compromissoDoItem(l.item, l.sal)))
    expect(compromissos).toEqual(publicado.compromissos)
    expect(await raizDoConjunto(compromissos)).toBe(publicado.raiz)
    expect(readFileSync('public/cosmos-avaliacao-v1-raiz.txt', 'utf8')).toBe(`avaliacao-frases-v1 ${publicado.itens} ${publicado.raiz}\n`)
    for (const c of CLASSES) expect(linhas.filter((l) => l.item.gabarito.classe === c)).toHaveLength(publicado.porClasse[c])
  })

  it('as respostas e as notas das medições 1 e 2 são as que os resumos carimbados declaram', () => {
    const medicoes = [
      ['public/cosmos-iai-v1-resultado.txt', 'medicao-1-linha-de-base'],
      ['public/cosmos-iai-v1-medicao-2.txt', 'medicao-2-pedido-v3'],
    ]
    for (const [resumo, pasta] of medicoes) {
      const texto = readFileSync(resumo, 'utf8').split('\n')
      expect(texto, resumo).toContain(`respostas_sha256 ${sha(`${PASTA}/${pasta}/respostas.jsonl`)}`)
      expect(texto, resumo).toContain(`notas_sha256 ${sha(`${PASTA}/${pasta}/notas.jsonl`)}`)
      expect(JSON.parse(readFileSync(`${PASTA}/${pasta}/meta.json`, 'utf8')).respostas_sha256).toBe(sha(`${PASTA}/${pasta}/respostas.jsonl`))
    }
  })
})
