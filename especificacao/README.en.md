# Grammar conformance package — version m2

**Português:** [README.md](README.md). This is a translation; if the two differ, the Portuguese text prevails. The
English translations of the specifications sit next to them, with `.en.md` in the name. The JSON files and the
normative examples are not translated: the formulas and the sentences in them are the test data.

This package lets anyone write another formula reader for the Caderno Lógico without
looking at the Caderno's code, and compare the two.

| File | Content |
| --- | --- |
| `gramatica-m2.md` | The specification: lexicon, normative PEG, scope, precedence, stages, dictionary, expansion, tree format, limits, warnings and conformance |
| `lexico-m2.json` | The symbols and every accepted spelling, in the order the lexer tries them; rules for names, indices and numbers; adjacencies |
| `diagnosticos-m2.json` | The codes E0 to E18: level, stage, exact condition, position and the order in which they are chosen |
| `exemplos-m2.json` | The normative examples: text, dictionary entries, whether the entries are required, whether it is accepted, tree, expanded tree and diagnostics |
| `traducao-z3-t1.md` | The translation of the expanded tree into Z3 (version t1): semantics, types, symbols, translation table, axioms and known limitations |
| `traducao-z3-t1-exemplos.json` | The normative examples of the translation: formulas, entries, Z3's verdict in the Caderno and the result of the finite engine |
| `modelos-exatos-t1.md` | The certificate of a sat with numbers (modelo-exato-t1-v1): exact numbers in Q(α), piecewise functions, D0, witnesses and the polarity rule |
| `registros-v1.md` | The record of the open format (registro-v1): the claim about a formula and a theory, the nine fields, the canonical form, the hashes, the commitment, the certificate and the reasons for rejection |
| `registros-v1/` | The example records, valid and invalid, with the certificate files, and blind batch 1, already revealed |
| `provas-t1/` | The certificates of the translation examples (version c3): the exact SMT problem of each one, the Alethe proofs of the unsats, the models of the sats and the record, checked in a GitHub workflow |

The files are checked by the Caderno on every change: `testes/traducao-z3.test.ts` redoes the translation verdicts, and
`testes/gramatica.test.ts` reads `exemplos-m2.json`, `lexico-m2.json` and `diagnosticos-m2.json` and fails if the
Caderno's reader disagrees with any line.

## How to use

For each example in `exemplos-m2.json`, read `texto` with the `fichas` and with the
`exigirFichas` option, and compare with `aceita`, `arvore`, `arvoreExpandida` and
`diagnosticos` (code, level, `inicio` and, for E13, `sugestao`, in order). The tree format is in section 6 of
`gramatica-m2.md`; the position and order of the diagnostics, in section 3.1. `inicio` counts Unicode characters
(code points), not UTF-16 units; in the syntax errors, E0 to E3, it is informative.

A divergence is classified as an implementation failure, a gap in the
specification or a pending decision; by default it is not resolved in favor of either
reader.

## Versions

Semantics **m2**, translation to Z3 **t1**. A change of meaning only goes in
with a new version, and the files of the previous version stay here.
