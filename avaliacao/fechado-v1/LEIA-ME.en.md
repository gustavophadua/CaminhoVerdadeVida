# Closed set v1, revealed

**Português:** [LEIA-ME.md](LEIA-ME.md). This is a translation; if the two differ, the Portuguese text prevails.

Revealed on 2026-11-11, by the owner's decision, before the third measurement. Until then only the commitments were
published (`avaliacao/conjunto-fechado-v1.json`), with the root stamped in Bitcoin in block 973304 (2026-10-26), before
any training.

The items are sentences in Portuguese; they were not translated, because the measurement is on the Portuguese text.

| File | What it is |
|---|---|
| `conjunto.jsonl` | the 120 items, each with its 32-byte salt and its reasoning pattern |
| `gerar.py` | the generator that made the set; the vocabulary is drawn with `os.urandom`, so running it again gives another set |
| `medicao-1-linha-de-base/` | measurement 1: qwen3:4b, prompt formalizacao-v1, 2026-10-28 (answers, scores, report) |
| `medicao-2-pedido-v3/` | measurement 2: prompt v3, 2026-10-29 |
| `medicao-2-interrompida/LEIA.txt` | the attempt interrupted before any answer was written |
| `medicoes-no-fechado.jsonl` | the log of the measurements (the agreed limit was three) |

## How to check

`npx vitest run testes/avaliacao-revelada.test.ts` recomputes the 120 commitments from the items and the salts and
recomputes the root. It also checks that the answers and the scores of the two measurements have the SHA-256 declared in
the stamped summaries (blocks 973562 and 973687). The CI runs this test on every change.

The answer keys through Z3, one slice per process:
`AVALIACAO_PRIVADA=avaliacao/fechado-v1/conjunto.jsonl AVALIACAO_FATIA=0-20 npx vitest run testes/avaliacao.test.ts`,
then `20-40` and so on.

## What the reveal changes

- The set is no longer closed. The third measurement, reserved for the trained model, can no longer be done blind
  on it: an honest final measurement needs a new set, generated and stamped before training.
- Measurements 1 and 2 still stand: they were made while the set was still closed, and the results were stamped
  before the reveal.
- The training data (`treino/dados/`) were checked against this set before the reveal, by
  `scripts/anti-vazamento.py` (`treino/README.en.md`).

What was changed: in `medicoes-no-fechado.jsonl`, the `saida_pasta` field had the path of the folder on the owner's
computer and now has the path of this folder. The other files are byte-for-byte copies, and `.gitattributes` protects
them from line-ending conversion.
