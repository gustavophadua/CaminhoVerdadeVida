// A interface em inglês (src/ui/idioma.ts): o tradutor troca o texto exato e os modelos com valores no meio, e deixa
// em paz o que não está no dicionário. O dicionário (src/ui/idioma-en.ts) é coerente: cada modelo tem no inglês as
// mesmas marcas {n} do português, e nenhum texto em inglês é ele mesmo uma chave (a troca não roda duas vezes).
import { describe, expect, it } from 'vitest'
import { criarTradutor } from '../src/ui/idioma'
import { MODELOS, TEXTOS } from '../src/ui/idioma-en'

describe('o tradutor da interface', () => {
  const traduzir = criarTradutor(
    { 'Conferir uma cadeia recebida': 'Check a received chain', 'Provado': 'Proved' },
    [['aceita · {0} elo(s)', 'accepted · {0} link(s)'], ['Resultado: {0} em {1}', '{1}: {0}']],
  )

  it('troca o texto exato, com os espaços normalizados', () => {
    expect(traduzir('Conferir uma cadeia recebida')).toBe('Check a received chain')
    expect(traduzir('  Conferir   uma\n cadeia recebida ')).toBe('Check a received chain')
  })

  it('troca os modelos e mantém os valores, na ordem do inglês', () => {
    expect(traduzir('aceita · 3 elo(s)')).toBe('accepted · 3 link(s)')
    expect(traduzir('Resultado: 12 em 2026-11-11')).toBe('2026-11-11: 12')
  })

  it('traduz o valor quando ele mesmo está no dicionário', () => {
    expect(traduzir('Resultado: Provado em hoje')).toBe('hoje: Proved')
  })

  it('não mexe no que não conhece, nem em números e símbolos', () => {
    expect(traduzir('Uma frase que não está no dicionário')).toBeNull()
    expect(traduzir('973118')).toBeNull()
    expect(traduzir('∀x (P(x) ⟹ Q(x))')).toBeNull()
    expect(traduzir('   ')).toBeNull()
  })
})

describe('o dicionário em inglês', () => {
  it('tem texto nos dois lados e nenhuma tradução que seja chave de outra', () => {
    const chaves = Object.keys(TEXTOS)
    expect(chaves.length).toBeGreaterThan(500)
    for (const [pt, en] of Object.entries(TEXTOS)) {
      expect(pt.trim(), pt).toBe(pt)
      expect(en.trim().length, pt).toBeGreaterThan(0)
      expect(TEXTOS[en] === undefined || en === pt, `${pt} -> ${en}`).toBe(true)
    }
  })

  it('cada modelo tem as mesmas marcas nos dois idiomas e se compila', () => {
    const marcas = (s: string) => [...s.matchAll(/\{(\d+)\}/g)].map((m) => m[1]).sort().join(',')
    for (const [pt, en] of MODELOS) {
      expect(marcas(en), pt).toBe(marcas(pt))
      expect(marcas(pt).length, pt).toBeGreaterThan(0)
    }
    const traduzir = criarTradutor(TEXTOS, MODELOS)
    expect(traduzir('aceita · 2 elo(s)')).toBe('accepted · 2 link(s)')
    expect(traduzir('Salto: a conclusão não decorre das premissas')).toBe('Leap: the conclusion does not follow from the premises')
  })
})
