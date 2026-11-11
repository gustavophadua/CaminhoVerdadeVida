// As bases locais (src/motor/bases.ts): o que entra, o que é recusado e por quê; a pasta lida pelo serviço; o pedido da
// camada de fatos com o nome da base. Sem Z3 (a consistência fica em bases-consistencia.test.ts, num processo próprio).
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { ErroBase, lerBase } from '../src/motor/bases'
import { carregarBasesLocais, validarPedidoRealidade } from '../src/integracoes/ollama-node'
import { fatoDoResultado, lerResultadoRealidade, type ResultadoRealidade } from '../src/motor/realidade'

const termo = (simbolo: string, leitura: string, sinonimos: string[] = [], aridade = 1) => ({ simbolo, tipo: 'predicado', aridade, leitura, sinonimos })
const POMAR = () => ({
  formato: 'cosmos-base-v1', nome: 'pomar', descricao: 'Um pomar de exemplo.',
  vocabulario: [termo('Macieira', 'x é uma macieira', ['macieira', 'pe de maca']), termo('Arvore', 'x é uma árvore', ['arvore']), termo('DaFruto', 'x dá fruto', ['da fruto', 'da frutos'])],
  fatos: [
    { id: 'P01', enunciado: 'Toda macieira é uma árvore.', formula: '∀x (Macieira(x) ⟹ Arvore(x))', fonte: { nome: 'definição' } },
    { id: 'P02', enunciado: 'Toda macieira dá fruto.', formula: '∀x (Macieira(x) ⟹ DaFruto(x))', fonte: { nome: 'botânica', url: 'https://pt.wikipedia.org/wiki/Macieira' } },
    { id: 'P03', enunciado: 'Existem macieiras.', formula: '∃x (Macieira(x))', fonte: { nome: 'observação direta' } },
  ],
})
const recusa = (mudar: (b: ReturnType<typeof POMAR> & Record<string, unknown>) => void, motivo: RegExp) => {
  const b = POMAR() as ReturnType<typeof POMAR> & Record<string, unknown>
  mudar(b)
  expect(() => lerBase(b)).toThrow(ErroBase)
  expect(() => lerBase(b)).toThrow(motivo)
}

describe('lerBase', () => {
  it('aceita uma base certa, sozinha ou somada à realidade-v1', () => {
    const so = lerBase(POMAR())
    expect(so).toMatchObject({ nome: 'pomar', comRealidade: false })
    expect(so.fatos.map((f) => f.id)).toEqual(['P01', 'P02', 'P03'])
    const junta = lerBase({ ...POMAR(), juntarCom: ['realidade-v1'] })
    expect(junta.comRealidade).toBe(true)
    expect(junta.vocabulario.some((t) => t.simbolo === 'Humano')).toBe(true)
    expect(junta.fatos.some((f) => f.id === 'R01')).toBe(true)
    expect(junta.fatos.at(-1)!.id).toBe('P03')
  })
  it('recusa o que não confere, dizendo o motivo', () => {
    recusa((b) => { b.formato = 'outro' }, /formato/)
    recusa((b) => { b.nome = 'Pomar Grande' }, /nome/)
    recusa((b) => { b.nome = 'realidade-v1' }, /nome/)
    recusa((b) => { b.extra = 1 }, /campo desconhecido "extra"/)
    recusa((b) => { b.juntarCom = ['outra-base'] }, /juntarCom/)
    recusa((b) => { b.vocabulario.push(termo('Arvore', 'x é outra árvore')) }, /Arvore aparece duas vezes/)
    recusa((b) => { b.vocabulario[0].simbolo = 'macieira' }, /maiúscula/)
    recusa((b) => { b.vocabulario[0].tipo = 'constante' }, /só predicados/)
    recusa((b) => { b.vocabulario[0].leitura = 'uma macieira' }, /leitura/)
    recusa((b) => { b.fatos[0].formula = '∀x (Pera(x) ⟹ Arvore(x))' }, /P01.*não lê/)
    recusa((b) => { b.fatos[1].id = 'P01' }, /P01 aparece duas vezes/)
    recusa((b) => { b.fatos[0].id = 'ID-LONGO-DEMAIS' }, /até 10/)
    recusa((b) => { b.fatos[1].fonte.url = 'http://inseguro.example' }, /https/)
  })
  it('somada à realidade-v1, não deixa redefinir símbolo nem fato dela', () => {
    expect(() => lerBase({ ...POMAR(), juntarCom: ['realidade-v1'], vocabulario: [...POMAR().vocabulario, termo('Humano', 'x é gente')] })).toThrow(/Humano aparece duas vezes \(já existe na realidade-v1/)
    expect(() => lerBase({ ...POMAR(), juntarCom: ['realidade-v1'], fatos: [{ ...POMAR().fatos[0], id: 'R01' }] })).toThrow(/R01 aparece duas vezes/)
  })
})

describe('a pasta de bases do serviço', () => {
  const pasta = mkdtempSync(join(tmpdir(), 'cosmos-bases-'))
  afterAll(() => rmSync(pasta, { recursive: true, force: true }))
  it('lê as bases certas e lista as recusadas com o motivo', () => {
    writeFileSync(join(pasta, 'a-pomar.json'), JSON.stringify(POMAR()))
    writeFileSync(join(pasta, 'b-quebrada.json'), '{ isto não é JSON')
    writeFileSync(join(pasta, 'c-repetida.json'), JSON.stringify(POMAR()))
    writeFileSync(join(pasta, 'leia-me.txt'), 'não é base')
    const r = carregarBasesLocais(pasta)
    expect(r.bases.map((b) => b.nome)).toEqual(['pomar'])
    expect(r.recusadas.map((x) => x.arquivo)).toEqual(['b-quebrada.json', 'c-repetida.json'])
    expect(r.recusadas[1].motivo).toMatch(/já existe uma base chamada pomar/)
  })
  it('sem a pasta, nenhuma base', () => {
    expect(carregarBasesLocais(join(pasta, 'nao-existe'))).toEqual({ bases: [], recusadas: [] })
  })
})

describe('o pedido da camada de fatos', () => {
  const pedido = { vocabulario: [{ simbolo: 'Mac', tipo: 'predicado', aridade: 1, leitura: 'x é uma macieira' }], premissas: ['∃x (Mac(x))'], conclusao: '∃x (Mac(x))', texto: { premissas: ['Há macieiras.'], conclusao: 'Logo, há macieiras.' } }
  it('aceita o nome de uma base, ou nenhum', () => {
    expect(validarPedidoRealidade(pedido)).not.toHaveProperty('base')
    expect(validarPedidoRealidade({ ...pedido, base: 'pomar' })).toMatchObject({ base: 'pomar' })
  })
  it('recusa nome de base fora da forma', () => {
    expect(() => validarPedidoRealidade({ ...pedido, base: '../segredo' })).toThrow()
    expect(() => validarPedidoRealidade({ ...pedido, base: 42 })).toThrow()
  })
})

describe('o resultado com uma base local', () => {
  const r: ResultadoRealidade = {
    versao: 'realidade-v1', alinhamentos: [], tipagens: [], mecanismos: [], conclusaoComRelato: 'segue',
    frases: [{ frase: 'Há macieiras.', formula: '∃x (Macieira(x))', conclusao: false, situacao: 'fato', fatos: ['P03'] }],
    base: { nome: 'pomar', fatos: [POMAR().fatos[2]] },
  }
  it('a interface aceita e mostra os fatos da base local', () => {
    expect(lerResultadoRealidade(r)).toBe(true)
    expect(fatoDoResultado(r, 'P03')?.enunciado).toBe('Existem macieiras.')
    expect(fatoDoResultado({ ...r, base: undefined }, 'R01')?.id).toBe('R01')
  })
  it('recusa base com nome ou fato fora da forma', () => {
    expect(lerResultadoRealidade({ ...r, base: { nome: 'Pomar!', fatos: [] } })).toBe(false)
    expect(lerResultadoRealidade({ ...r, base: { nome: 'pomar', fatos: [{ ...POMAR().fatos[1], fonte: { nome: 'x', url: 'javascript:alert(1)' } }] } })).toBe(false)
  })
})
