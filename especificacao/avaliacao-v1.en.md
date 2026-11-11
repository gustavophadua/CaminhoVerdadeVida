# Evaluation v1 — formalizing short sentences (closed set)

**Português:** [avaliacao-v1.md](avaliacao-v1.md). This is a translation; if the two differ, the Portuguese text
prevails. The sentences being evaluated are in Portuguese; the examples below are translated only so the reader can
follow them.

The I-AI pilot measures a single task, chosen by the owner on 2026-10-26: reading short sentences in Portuguese (every,
some, no, not every, if… then, only if, or, not) and writing the formalization in m2 with the class of the conclusion.
This document says what an item is, how an answer is evaluated and why the set stays closed. The code is
`src/motor/avaliacao.ts`; the tests, `testes/avaliacao.test.ts`.

## 1. The item

Each item (format `avaliacao-frases-v1`) has:

- **text:** the premises and the conclusion, in Portuguese;
- **vocabulary:** the symbols the answer may use, each with its reading ("x is a doctor", "Ana", "x admires y");
- **answer key:** the premises and the conclusion in m2, and the class.

The class is one of three, mutually exclusive, always with consistent premises:

| Class | Means | How Z3 decides |
| --- | --- | --- |
| follows (segue) | the premises guarantee the conclusion | premises ∧ ¬conclusion is unsatisfiable |
| contradicts (contradiz) | the premises guarantee the negation of the conclusion | premises ∧ conclusion is unsatisfiable |
| independent (independente) | neither one nor the other | both are satisfiable |

The answer key of every item is checked by Z3 (translation t1): the class the generator expected must be the one the
solver gives. An item with inconsistent premises, or on which Z3 does not decide, does not go in. The logic is classical
first-order logic: "Every duck is clever" does not guarantee that a duck exists, and so it does not imply "Some duck is
clever".

## 2. The answer and the score

The answer carries the premises in m2, the conclusion in m2 and the class. It only counts as **correct** if:

1. it reads in m2 using only the item's vocabulary (an invented symbol or one with the wrong arity is rejected);
2. the class is that of the answer key;
3. the conjunction of the answer's premises is equivalent to that of the answer key, and so is the conclusion (Z3 checks
   that the negation of the biconditional is unsatisfiable).

Getting the class right with the wrong formula is not correct: with three classes, chance already gives one third.
Writing the same thing another way (another order, double negation, contrapositive) is correct, because the score
compares meaning, not text. The summary of a batch gives the fully correct ones, those that only got the class right
and the correct ones per class.

## 3. The closed set

- **120 items, 40 per class**, generated on 2026-10-26 from reasoning patterns (syllogisms, modus ponens and tollens,
  the fallacies of affirming the consequent and denying the antecedent, quantifier scope, existential import,
  disjunction, conditional, only if, double negation, relations) with a vocabulary of professions, adjectives, people
  and relations, drawn with `os.urandom`. The content is absurd on purpose ("Every mail carrier is a gardener"): the
  answer has to come from logic, not from knowledge of the world.
- **The content is not published.** The set, the generator and the salts stay on the owner's machine (`privado/`,
  outside Git). Only `avaliacao/conjunto-fechado-v1.json` is published: the number of items, the count per class, the
  commitment of each item and the root. The commitment is the SHA-256 of `avaliacao-frases-v1`, a 32-byte salt and the
  item in JSON, one per line; the salt prevents anyone from guessing a short sentence by testing candidates. The root
  is the SHA-256 of the commitments, one per line, and is stamped in Bitcoin (`public/cosmos-avaliacao-v1-raiz.txt`):
  **confirmed in block 973304** (2026-10-26 22:50:05 UTC), before any training. The record is in
  `src/dados/ancora-avaliacao.json`, the public verifier checks it on every run, and the original proof from the
  calendars is in `.calendario.ots`.
- **Rules:** the items never go into training or into a prompt example; the evaluation of a model runs on the owner's
  machine; the published result states the model, the date and the version of the set. When the set is retired, the
  items and the salts are revealed, and anyone can check that they match the commitments and the root stamped before
  training.
- **Revealed on 2026-11-11**, by the owner's decision, after two of the three measurements: items, salts, generator and
  the two measurements are in `avaliacao/fechado-v1/`, and `testes/avaliacao-revelada.test.ts` redoes the commitments
  and the root on every CI run. The third measurement can no longer be blind on this set: that of the trained model
  needs a new set, generated and stamped before training.
- **Public examples:** `avaliacao/exemplos-publicos-v1.jsonl` carries 12 items (4 per class) in the same format, with an
  animal vocabulary, only to show the format and to test the score. They are not part of the closed set.

## 4. How to run

On the owner's machine, with the set in `privado/avaliacao-fechada-v1/conjunto.jsonl`:

- check the answer keys and the published commitments:
  `AVALIACAO_PRIVADA=<conjunto.jsonl> npx vitest run testes/avaliacao.test.ts`;
- score a batch of answers (one JSON per line: `id`, `premissas`, `conclusao`, `classe`): the same, with
  `AVALIACAO_RESPOSTAS=<respostas.jsonl>`.

Z3 in WebAssembly wears out after hundreds of consecutive calls (one of them hangs without respecting the time limit),
and a new instance in the same process does not gain memory. That is why the set is checked in slices of 20 items, one
process per slice: `AVALIACAO_FATIA=0-20`, `20-40` and so on. The commitments always come from the whole set.

## 5. Limits

- The items were written by a generator, not by people; sentences from real people are more varied. A second set, with
  sentences written by hand, is the natural step after the pilot.
- The set measures formalization within the m2/t1 fragment; it does not measure long proofs or mathematics.
- Faithfulness is checked against the answer key; the answer key itself was checked by Z3 as to the class, and the
  translation of each sentence into the answer key follows the generator's patterns, reviewed by hand on the public
  examples.

## 6. Validation, training data and item-by-item scoring

The 120 closed items cannot be used to tune anything: the prompt, the examples, voting and the training checkpoint are
chosen on a separate set, and the 120 are measured at most three times (the pilot records each measurement; see
`especificacao/formalizacao-v1.md`).

- **Public generator:** `scripts/gerar-frases.py`. Seed fixed by the name of the mode; running it again gives the same
  file, byte for byte. It never reads the closed set.
- **Validation:** `avaliacao/validacao-v1.jsonl` (SHA-256 `0c8126c6152388865c3b9c47c823a2ccb6d688219ef21a231116026c2cb194a6`),
  150 items, 50 per class, a fantasy vocabulary (wizard, elf, knight, sage, Aurora, Bento, challenges…), only the base
  sentence forms, the same phenomena as the closed set. The CI rebuilds the file through the generator and checks the
  answer key of the 150 through Z3, in 6 slices of 25 (one process per slice; the 150 in a single process hung the Z3
  wasm).
- **Training:** `python -I -X utf8 -B scripts/gerar-frases.py treino SAIDA.jsonl [ITENS_POR_CLASSE]`, by default 1000
  per class. Its own vocabulary (space and countryside: robot, astronaut, cowgirl, methodical, Alice, Benito, warns…),
  varied sentence forms (Portuguese equivalents of "Each…", "All the… are…", "There is a… that…", "only if", "In case…
  is…") and 7 more patterns (and, if and only if, neither… nor, or without simplifying, if without turning back). The
  batch is rebuilt identically and checked by Z3 with `FRASES_ARQUIVO` and `FRASES_FATIA` in
  `testes/frases-geradas.test.ts`.
- **Anti-leakage:** `scripts/anti-vazamento.py <closed set> <batches…>`, only on the owner's machine, counts content
  words, symbols, sentences and formulas in common and only prints counts. On 2026-10-27: validation, training (3000
  items) and public examples with **0 / 0 / 0 / 0**. The detector was checked against the closed set itself (it flags
  everything).
- **Item-by-item score:** `testes/nota.test.ts` (`NOTA_CONJUNTO`, `NOTA_RESPOSTAS`, `NOTA_SAIDA`, `NOTA_FATIA`) writes
  one line per item with the score from §2 and the class Z3 gives to the model's formulas (the one that counts in
  Cosmos). The report is `scripts/relatorio-nota.py NOTAS.jsonl [--comparar ANTES.jsonl]`: 95% interval (Wilson), per
  class, per pattern, confusion matrix, reasons for error and, comparing two measurements, exact McNemar on the items in
  common. With 120 items the margin is about ±8 to 9 points; a difference without p < 0.05 does not count.

**Declared limit:** the public generator was written by whoever wrote the closed set's generator and covers the same
reasoning patterns (which are already public in §3). That is why the score on the 120 measures the transfer to **new
vocabulary**, not to sentences written by people; the hand-written set (§5) is still the next step for that.

## 7. Measurements on the closed set

| # | Date | Model | Configuration | Faithful formulas | Class by Z3 | Stated class | Fully correct |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 2026-10-28 | `qwen3:4b` on Ollama 0.40.12, no training | `formalizacao-v1`, `esquema-json-v1`, no thinking mode, temperature 0 | **115/120 = 95.8%** (90.6–98.2%) | **116/120 = 96.7%** (91.7–98.7%) | 95/120 = 79.2% (71.1–85.5%) | 93/120 = 77.5% (69.2–84.1%) |

The intervals are 95% (Wilson). It ran on the owner's computer, on the CPU only (about 48 s per item, 1 h 36 min in
total); no item left the device. The model's digest is
`359d7dd4bcdab3d86b87d73ac27966f4dbb9f5efdfcc75d34a8764a09474fae7`.

- **Faithful formulas** is the number that counts: in Cosmos, the class comes from Z3 based on the formulas, and the
  person approves the reading back. Of the 5 that failed, 2 used a symbol outside the item's vocabulary (rejected on
  reading) and 3 brought a premise or a conclusion that is not equivalent to the answer key's.
- **The class stated by the model** is the weak point: by answer-key class, fully correct on 37/40 (follows), 36/40
  (contradicts) and only 20/40 (independent). On the independent ones, the model falls for the fallacies the set tests
  (it says "follows" or "contradicts" where nothing can be concluded). Cosmos does not use this class to decide
  anything.
- Matrix of the stated class (row = answer key, column = model): follows 37 / 0 / 3 / 0; contradicts 3 / 36 / 1 / 0;
  independent 5 / 11 / 22 / 2 (the last column: no answer read).
- The score per reasoning pattern is not published, because it would say how many items of each pattern the set has.

**Goal and decision:** the owner set the goal at 85% faithful formulas after seeing the baseline (see
`decisoes-do-dono.md`); the lower bound of the interval is already above it, so I-AI v1 keeps the untrained model and
the other two measurements are kept in reserve. The summary with the hashes of the answers and the scores is in
`public/cosmos-iai-v1-resultado.txt`, stamped in Bitcoin through OpenTimestamps: **confirmed in block 973562**
(2026-10-28 13:58:24 UTC). The record is in `src/dados/ancora-iai.json`, the public verifier checks it on every run, and
the original proof from the calendars is in `.calendario.ots`. When the set is revealed (§3), anyone can redo the score
from the answers and check the two hashes.

**Limits of this score:** it holds for sentences in the generator's style, with new vocabulary (§6); with sentences
written by people the number may be lower. There are 120 items: at this level of accuracy, the interval goes down to
about 5 points below the measured value.
