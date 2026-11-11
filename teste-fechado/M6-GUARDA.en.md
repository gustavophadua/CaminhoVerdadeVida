# M6 - measurement of the repetition guard

**Português:** [M6-GUARDA.md](M6-GUARDA.md). This is a translation; if the two differ, the Portuguese text prevails.

Single measurement on 2026-10-31: qwen3:4b 359d7dd4, cego-v2, temperature/seed 0, context 4096. Neither the guard nor the prompt was changed.

| Group | Items | Empty conclusion | Failure/result not classifiable as empty | Not empty |
|---|---|---|---|---|
| Legitimate paraphrase | 10 | 7 | 1 | 2 |
| Risk of improper copy | 10 | 1 | 1 | 8 |

That is 7/10 legitimate ones with an empty conclusion observed; the additional failure is separate and was not counted as empty. Do not conclude that the eight non-empty conclusions of the second group are correct: this mission measures the guard, not class or faithfulness by Z3. The risk cases do not presume that the model would necessarily copy.

Harness time: 2,324,444 ms; Vitest duration 2325.58 s. Real result: Tests 2 passed (2), exit 0. Hash of the answers: 2720a034fe9ce8a93a9c13beeb5379212d1eb7273ef0ee2b1923b12f4c22b1d2. Public set: avaliacao/guarda-parafrase-v1.jsonl. Local receipts outside Git: tmp/missoes/m6-guarda/.

## Proposal, not implemented

Repetition should open a confirmation of the interpretation: show the premise and the conclusion and let the user declare that they meant to reaffirm the same proposition. An automatic paraphrase rule would need a separate evaluation of faithfulness; formal equivalence alone does not prove faithfulness to the text. Until that evaluation, keep the conservative guard and give a specific warning, without turning absence into a logical class. Do not tune using the M1 test set.
