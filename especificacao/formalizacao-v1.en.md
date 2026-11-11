# Assisted formalization v1 and the pilot without training

**Português:** [formalizacao-v1.md](formalizacao-v1.md). This is a translation; if the two differ, the Portuguese text
prevails. The model reads sentences in Portuguese; the quoted sentences are given in English, with the Portuguese
words kept where the point depends on them ("só se" = only if, "nem…nem" = neither…nor, "cada" = each).

The first piece of the I-AI that works inside Cosmos. A language model **proposes** the formalization of short sentences
in m2; Cosmos reads the proposal, rejects what does not parse and **reads it back in Portuguese**, without a model; the
person approves or corrects it; verification (Z3 and cvc5, Carcara) decides whether the conclusion follows. The model
approves nothing and decides nothing. Code: `src/motor/formalizacao.ts`, `src/interfaces/FormalizacaoAssistida.tsx`,
`testes/formalizacao.test.ts` and `testes/piloto.test.ts`.

## 1. The prompt to the model (version `formalizacao-v1`)

Always the same for the same input: the m2 syntax instructions and the Portuguese reading rules ("todo" = every,
"nenhum" = no, "algum" = some, "nem todo" = not every, "só se", inclusive "ou" = or, no knowledge of the world, no
existential import), two solved examples taken from the **public examples** (never from the closed set, and never the
item itself) and the input. The requested answer is a JSON object with vocabulary, premises, conclusion and class. A
measurement only counts together with the version of the prompt; changing the prompt is another version.

Version `formalizacao-v2` (2026-10-28) adds the rules that the error review (§8) showed were missing: a variable always
bound to a quantifier, "cada" and "if someone is A, then they are B", "every A R some B" versus "there is a B that every
A R", "apenas se" (only if) in one direction only, "nem…nem", the conclusion written as it is in the text even when
false, and "independent" for the conclusion that merely does not follow (with the most common fallacies as examples).
The official score in §5b is from v1 (commit 3cdfaeb). `formalizacao-v3` (2026-10-29) asks for one formula per premise,
in the order of the text: v2 left premises out.

The repair (`reparo-v1`, 2026-10-29, `formalizarComReparo`): an answer that does not parse, or that does not have one
formula for each premise of the text, goes back to the model once with the reader's error ("'(' at column 4 was not
closed", "the text has 2 premise(s) and the answer has 1"), and the second answer counts as it comes. The local service
always repairs; the pilot only with `PILOTO_REPARO=1`, and the version goes into meta.json. A measurement with repair is
another configuration: measurement 2 on the closed set (§5b) was without it.

## 2. Reading the answer

- Strips the reasoning between `<think>` and the code fences; reads the first JSON object.
- With a given vocabulary (the pilot), it uses exactly that one; without vocabulary (the screen), it accepts the
  proposed one only in the standard form: predicate with a capital letter and no accent, constant in lower case, arity
  from 0 to 4, no repeated symbol.
- Each formula must parse in m2 with the vocabulary alone (`lerFormula` in `avaliacao.ts`); what does not parse is
  rejected with the reason. The proposed class is optional: an unknown class does not bring down the proposal.
- The reading back uses the Caderno's deterministic reader (`lerEmPortugues`) with the words of the vocabulary: "todo
  médico é paciente" (every doctor is a patient), "Ana não é paciente" (Ana is not a patient).

## 3. On screen (Labs → Formalizar)

**With Ollama (the default since 2026-10-28):** `node scripts/integracoes-p0.mjs --ollama`, with Ollama open and
`qwen3:4b` downloaded, at `http://127.0.0.1:4175/cosmos/`. It is the model of the official score, and the text does not
leave the computer. The bridge (`src/integracoes/ollama-node.ts`) accepts from the browser only premises and conclusion
(up to 10 premises of up to 500 characters) and builds the fixed prompt itself, with the output tied to the schema and
temperature 0: the browser chooses neither messages, nor model, nor destination, and it only talks to
`127.0.0.1:11434`. One proposal at a time; on the CPU, from 1 to 2.5 minutes. If Ollama is not ready, the screen uses
Groq, if it is on. On Windows, the launcher `Abrir-Cosmos-IA.cmd` checks Ollama (opens the application if it is closed),
starts the service and opens the browser on Labs. The route does not depend on the 15-minute P0 session, which is the
one for the Groq key: it lasts as long as the service is open.

**Integrated graphics:** Ollama finds the AMD Vega 8 through Vulkan, but discards it for being integrated. With
`OLLAMA_IGPU_ENABLE=1` the whole model goes to it (measured on 2026-10-28, same prompt as the screen, same answer):
reading the prompt becomes 2 times faster (64 versus 32 tokens/s) and writing almost the same (8 versus 7.5), and the
proposal for Tico drops from 132 s to 68 s. The official score was measured on the CPU; the graphics card can change the
answer in rare cases, through rounding, and it does not go into an official measurement without saying so.

Without a given vocabulary (the screen), `qwen3:4b` proposes symbols with accents ("Pássaro") and constants with a
capital letter ("Tico"); the reading fixes the form (no accent, predicate with a capital letter, constant in lower case)
in the vocabulary and in the formulas, only as a whole word. With the given vocabulary (the pilot and the score),
nothing changes. First real test on screen, on 2026-10-28: "Every bird has feathers. Tico does not have feathers." ⟹
"Tico is not a bird." came back with the three readings right and the class "follows", in about 2 and a half minutes.

A symbol used in the formulas and not declared in the vocabulary (the real case, Diogenes' chicken: the model wrote
`¬Penas(galinha)` without declaring `Penas`) goes in with the type and the arity of the use and a provisional reading
taken from the name ("TemPenas" → "x has feathers", "Ave" → "x is a bird"), marked as completed on screen. A name used
in two ways, outside the standard form or already declared another way is still rejected. Only without a given
vocabulary: the pilot and the score do not change.

### 3c. Automatic mode (2026-10-28)

So as not to approve them one by one: the person pastes several problems (the premises, one per line, the conclusion on
the last line, a blank line between them; up to 50), and Cosmos does the rest. First the model proposes all of them,
one at a time; then the local service takes the model out of memory and Z3, in a separate thread of the Node process
(`src/integracoes/z3-trabalhador-node.ts`), checks each one (route `ollama/conferir`). **Only the proposal that parses
and in which the class the model stated is the one Z3 gives its formulas passes**; the rest is discarded with the reason
(until 2026-10-29; see the new rule at the end of this section) (does not parse, different class, inconsistent premises,
Z3 undecided). The Z3 thread shuts down before each request to the model and after one minute idle: the two together do
not fit in this computer's memory.

The accepted ones go to Minha cadeia (My chain) with one click ("Levar as N aceitas", take the N accepted), and there
one click signs them all, with the claim Z3 gave and the state "proposta". The whole result (accepted, discarded and
reasons) can be exported.

The limit is the same as the score's: the check catches a formula that does not say what the model thought it said (the
class does not match), but it does not catch the error in which the wrong formula and the wrong class agree. Applied to
the answers of the official score (§5b), the rule would accept 95 of the 120 items, 93 of them with faithful formulas
(98%), and would discard 25 (23 with a diverging class and 2 that did not parse), of which 22 had the right formulas: it
discards more than necessary, in exchange for almost nothing wrong getting through. The class the model gets wrong most
is "independent".

**The rule since 2026-10-29** (after the error review, §8): the proposal that parses, has one formula for each premise of
the text and that Z3 decides passes; the class is Z3's, and the one the model stated stays only as a record. A proposal
with more or fewer premises than the text is discarded with the reason.

**With Groq:** only through the local service with Groq on (`node scripts/integracoes-p0.mjs --groq`, with
`GROQ_API_KEY` in the environment, at `http://127.0.0.1:4175/cosmos/`): the key stays in the Node process and never
reaches the browser. The screen warns that the text leaves the computer and must not carry the Principia, personal data
or items from the closed set. The person writes the premises and the conclusion, receives the proposal with the reading
back of each formula, corrects it if needed and approves: approval takes formula, premises and claim to the record in
Minha cadeia, where the usual verification decides.

**Cost measurement** (requested in GPT's answer to the counterpoint): each proposal records the model's time, the
tokens, the time until the decision and the decision (approved as it came, corrected, rejected, not parsed). It stays
only in this browser and can be exported. It counts rejections and the ones that did not parse, so that the cost per
formalization put to use does not hide failures.

## 4. The pilot without training

`testes/piloto.test.ts` only runs when called. The model proposes the formalization of each item; the answers go to
`respostas.jsonl` and the score comes afterwards, through Z3, in `testes/avaliacao.test.ts` (`AVALIACAO_RESPOSTAS`).

| Phase | Provider | Set | For what |
| --- | --- | --- | --- |
| Development | Groq, `openai/gpt-oss-120b` | only the 12 public examples | tuning the prompt; free and fast |
| Official score | Ollama on 127.0.0.1 (Qwen3) | the 120 closed items | the honest number, without the items leaving the computer |

The code refuses to send the closed set to any provider other than local Ollama. The score separates the faithfulness of
the formulas (what matters: Z3 decides the class from them) from the class stated by the model.

**On Ollama** (`src/integracoes/provedores/ollama.ts`, only `127.0.0.1:11434`, native API `/api/chat`), the default
model is `qwen3:4b` and each request goes out with:

- `think: false`: Qwen3's "thinking mode" turned off, for comparable time and format across measurements;
- `format` with the JSON schema of the answer (`ESQUEMA_RESPOSTA`, version `esquema-json-v1`): the model only generates
  JSON that meets the format, so broken JSON ceases to exist without training; whether the formulas parse is still up
  to `lerProposta`;
- temperature 0, seed 0 and a fixed context of 4096 tokens.

The `meta.json` of each run stores the model's digest (the SHA-256 of the manifest, which pins the weights), the Ollama
version, the prompt's, the output's and the SHA-256 of the answers. On the closed set, the answers must stay in its
folder (outside Git, because they reveal the items), and each measurement is recorded in `medicoes-no-fechado.jsonl`,
next to the set. The closing plan allows **3 measurements** on the 120 (baseline, best configuration without training,
final model); a fourth requires `PILOTO_ALEM_DO_LIMITE=declarado` and stays marked in the record. Adjustments are chosen
on a separate validation set, never on the 120.

To run (in PowerShell, in the Cosmos folder, with Ollama open):

```
$env:PILOTO_PROVEDOR='ollama'; $env:PILOTO_SAIDA='saida-piloto'; node node_modules/vitest/vitest.mjs run testes/piloto.test.ts
```

Without `PILOTO_CONJUNTO`, it runs on the 12 public examples (step B3 of the plan).

**Voting** (step D3): with `PILOTO_VOTOS=5`, each item receives 5 answers (temperature 0.7, seeds 1 to 5) and those that
parse go to `candidatos.jsonl`. `testes/votacao.test.ts` (`VOTACAO_CONJUNTO`, `VOTACAO_CANDIDATOS`, `VOTACAO_SAIDA`,
`VOTACAO_FATIA`) chooses the answer through Z3: the largest group of **equivalent** formulas, not of identical text,
with the most stated class within it. The cost is about 5 times the time; it only stays if the gain on validation pays
for it.

**Training:** `testes/exportar-treino.test.ts` turns a batch from the public generator into conversations with this same
prompt and the right answer (it rejects ids that are not from the public generator). The training step by step is in
`treino/README.md`.

## 5. Development result (2026-10-26)

`openai/gpt-oss-120b` through Groq, prompt `formalizacao-v1`, on the 12 public examples: **12 of 12 fully correct**
(right class and formulas equivalent to the answer key's, checked by Z3), including existential import and the reversed
"só se"; from 1.2 to 2.1 s per item, from 1,106 to 1,167 input tokens and from 324 to 837 output tokens, on the free
plan. **It is not the official score**: these are 12 public items, and the prompt carries the reading rules. On screen,
a new sentence ("No cat likes baths. Mimi is a cat." ⟹ "Mimi does not like baths.") came back right in 1.7 s and was
taken to the record with formula, premises and claim filled in.

## 5b. The official score (2026-10-28)

`qwen3:4b` on local Ollama, without training, on the 120 closed items (measurement 1 of 3): **115/120 faithful formulas
(95.8%)** and the right class by Z3 on 116/120; the class the model itself states is right on 95/120. The owner's goal,
85% faithful formulas, was reached; the numbers, the intervals and the limits are in `avaliacao-v1.md` §7.

Measurement 2 of 3 (2026-10-29, prompt `formalizacao-v3`, the same model on the Vega 8): **117/120 faithful formulas
(97.5%, 95% CI 92.9–99.1%)**, right class by Z3 on 117/120, stated class on 97/120, fully correct 97/120 (it was 93). The
three missing did not parse (two unclosed parentheses, one symbol outside the vocabulary); all those that parsed were
faithful. Item by item against measurement 1: two more formulas, none fewer (McNemar p = 0.5; fully correct p = 0.39):
the improvement is not significant with 120 items. The prompt was tuned only with the public R- batches (§8), never with
the closed set. Difference in conditions: measurement 1 ran on the CPU, measurement 2 on the graphics card. With the
automatic-mode rule (§3c), the 117 would pass, none wrong. One measurement on the closed set remains. The public summary
of measurement 2 (`public/cosmos-iai-v1-medicao-2.txt`: the model, the configuration, the hashes of the answers and the
scores and the numbers, without any item) was sent to OpenTimestamps on 2026-10-29 and confirmed in Bitcoin in block
973687 (2026-10-29T11:32:47Z); the anchor is in `src/dados/ancora-iai-medicao-2.json`, and the public verifier checks the
proof on every run.

## 6. The memory of refutations

`src/motor/memoriaRefutacoes.ts`, with the design from chapter 6 of GPT's answer to the counterpoint. It stores each
attempt with the **exact obligation** (semantics, claim, hash of the theory and hash of the canonical formula), the type
of the result and where the evidence is. Only "contramodelo conferido" (checked countermodel) and "refutação conferida"
(checked refutation) establish that the claim does not hold; time exhausted, unsupported rule and invalid proof only say
that the attempt did not get there. The query returns the attempts with the same obligation and, as a suggestion, those
with the same formula under another theory; **it never blocks**, and the history only grows.

`cadeias/exemplo-contraponto/` takes the cases to the public verifier, with the real cvc5 and Carcara (key from test 2
of RFC 8032, private key public on purpose; generated by `testes/gerar-cadeia-contraponto.test.ts`):

| Link | Case | What the CI requires |
| --- | --- | --- |
| 0 | CP07: "Q(b) follows from ∀x (P(x) ⟹ Q(x)) and P(a)" | does not hold up, with an exportable countermodel in the counter-record |
| 1 | CP08: the same with P(b) added | opens with a refutation and a model of the premises; the memory with link 0 does not block it |
| 2 | CP05: "R follows from S and ¬S" | opens only with the `vazio` mark; the CI summary says the conclusion follows only because the premises are inconsistent |

The other cases have their own tests: CP01 (`verificado: true` coming from outside is rejected,
`testes/contraponto-cp01.test.ts`), CP02 and CP03 (strict reading of Carcara's verdict,
`scripts/testar-veredito-carcara.py`), CP04 (the proof swapped after the hash does not change what Carcara reads, and
swapped before gives R8, `scripts/testar-cp04.py`) and CP06 (a correct proof against another statement, rejected by the
link, `especificacao/provas-t1/vinculo.py`).

## 7. Limits

- The reading back helps with checking, but does not replace the person: it reads the formula, not the intended meaning.
- The pilot's sentences come from a generator; real use has more varied sentences.
- Groq does not train models and would only run a trained model on the Enterprise plan with a Llama 3.1 8B base; a
  trained Qwen3 runs locally.

## 8. The error review (2026-10-28)

To see where the model errs without spending the closed set: a generated public batch, with the errors looked at one by
one. `scripts/gerar-frases.py revisao` generates 501 R- items (167 per class, the forms and vocabulary of training, its
own seed); the pilot runs with `PILOTO_PUBLICO=gerado` and `PILOTO_FATIA` (one process per slice of 50) and the score
with `testes/nota.test.ts`. The batch stays outside Git and never goes into training (the export only accepts V- and
T-). Correcting the prompt based on it is allowed; the measure that counts is still the closed set's.

First round (prompt v1, qwen3:4b on the Vega 8, about 30 s per item, 4 h in total):

| | items |
|---|---|
| parse | 497/501 (99.2%) |
| faithful formulas | 477/501 (95.2%) |
| right class by Z3, from the model's formulas | 487/501 (97.2%) |
| right stated class | 410/501 (81.8%) |
| fully correct (faithful formulas and right stated class) | 399/501 (79.6%) |

The model formalizes well and classifies badly: on the 167 independent ones it said "contradicts" 42 times and "follows"
33. The formula errors concentrate in a few patterns: "every A R some B" (10, with ∃ instead of ∀ or the order of the
quantifiers swapped), "nem…nem" read as ∨ (3), "apenas se" read as ⟺ (2), the false conclusion swapped for the one that
follows (2), and four that did not parse (three with a loose variable, without a quantifier, and one unclosed
parenthesis). The automatic-mode rule (§3c) would accept 414, 399 of them faithful, and would discard 87, 78 of them with
the right formulas; without requiring the stated class, only Z3, it would accept 497 with 477 faithful. The check by the
stated class barely separates the errors (15 in 414 versus 20 in 497) and throws away one in six right answers. Hence v2
of the prompt (§1).

Second round, the same 501 with prompt v2 (2026-10-28 to 29):

| | v1 | v2 |
|---|---|---|
| parse | 497 | 500 |
| faithful formulas | 477 (95.2%) | 475 (94.8%) |
| right stated class | 410 (81.8%) | 448 (89.4%) |
| fully correct | 399 (79.6%) | 424 (84.6%), McNemar p = 0.004 |

The new rules fixed what they aimed at ("every A R some B" in 9 of the 10, "nem…nem" in all 3) and the stated class on
the independent ones rose from 91 to 138 out of 167. But a new error appeared: in 22 answers the model left a premise out
(16 of them in the items with "só se", in which the second premise repeats one side of the conditional). No v1 answer
had this defect. The count is a mechanical check: with it and Z3, and without the stated class, the automatic mode would
accept 478 v2 answers, only 3 with a wrong formula (99.4%), and would discard no right one; also requiring the stated
class would accept 427, with the same 3 wrong ones, and would discard 51 right ones. Hence the new automatic-mode rule
(§3c) and v3 of the prompt (§1).

Measurement 2 on the closed set, with v2, started on 2026-10-29 at 01:49 and was interrupted at 01:55, before writing any
answer, when this defect appeared; it does not count as a measurement (the closed set's log still has one). The next
one is v3's, after being checked on a second lot of 501 new items (`gerar-frases.py revisao … 167 2`), on which the
prompt was not tuned.

Lot 2, 501 new items with prompt v3 (2026-10-29, no text in common with lot 1):

| | lot 2, v3 |
|---|---|
| parse | 501 (100%) |
| faithful formulas | 495 (98.8%, CI 97.4–99.5%) |
| right class by Z3 | 499 (99.6%) |
| right stated class | 448 (89.4%) |
| fully correct | 444 (88.6%) |

Six wrong formulas were left: four with a premise left out (all in "só se"), one with the conclusion swapped for the one
that follows and one that lost a "não" (not). The automatic mode would accept 497, only the last two wrong, and would
discard no right one. With that came measurement 2 on the closed set (§5b).

The repair (§1), on the four answers from lot 2 that left a premise out: all four came back with both premises, equal
to the answer key, in 60 to 110 s each (the question goes to the model twice). With it, v3 reaches 499/501 faithful
formulas on lot 2 (99.6%); the two left parse, have the right count and would pass in automatic mode. It is a check on
the items that showed the defect, not a new round: the first answer, at temperature 0, is the same, and the repair only
acts when it fails.

### 8b. Sentences written by another model (2026-10-29)

The R- sentences come from our generator, with the same forms the prompt was tuned on: they measure little variety. The
owner asked GPT for a batch of sentences with different profiles and ways of speaking (`frases-gpt/`, outside Git): 200
problems without an answer key, 150 from 6 families of templates in 25 scenarios and 50 in free speech ("então abre",
"não vou usar os dois", "pode misturar"). GPT's `gerar.py` was not run: its literals were read with `ast`, the sentences
rebuilt and checked against the file. The answer keys were made by hand (those of the templates per family) and Z3 gave
the expected class on the 199 that went in, with ids G-. Left out was "A ficha azul fica com a ficha verde. Ela está
incompleta." (The blue card goes with the green card. It is incomplete.): the "ela" (it) is ambiguous on purpose, and the
right thing would be to ask. Three free sentences admit more than one reasonable formula; they count for the class and
faithfulness is given with and without them. Before looking at any answer, the split: a review half (families 1, 5 and
6 and 25 drawn free sentences) and a test half (families 2, 3 and 7 and 24 free ones), by family, as the batch itself
recommends, so that the templates do not leak from one half to the other.

Prompt v3 with repair, with no tuning at all:

| | faithful formulas | right class by Z3 |
|---|---|---|
| all (199) | 174 (87.4%, CI 82.1–91.3%) | 185 (93.0%) |
| templates (150) | 136 (90.7%) | 141 (94.0%) |
| free speech (49) | 38 (77.6%, CI 64.1–87.0%) | 44 (89.8%) |
| review half (99) | 81 (81.8%) | 88 (88.9%) |
| test half (100) | 93 (93.0%) | 97 (97.0%) |

The dominant error, in the review half: the model **bends the premise so that the conclusion follows**. "Someone can
only vote if they are accredited" becomes "whoever is accredited can vote"; "all the monitors are students" becomes "all
the students are monitors" when the conclusion is the converse; a "não" disappears from the conclusion. In 9 items, an
argument that does not follow came out "follows". The others: "either… or…, but not both" split into two formulas with a
premise lost, and the restriction on the subject lost in "no opinion without a test" and "every stall that takes cards".

v4 of the prompt (explicit rules for "can only A if B", the restricted subject, "but not both", and "translate each
premise as if you did not know the conclusion") was not adopted: on the review half, 83 faithful formulas against v3's
81 (+7 −5, McNemar p = 0.77), and 10 arguments that do not follow came out "follows" (it was 9). The rule in the prompt
does not remove the bias; the diff is kept outside Git. Hence the blind translation (`formalizarCego`, `cego-v1`): the
premises in one call without the conclusion, the conclusion in another that sees only the vocabulary. For training, the
generator gained the modes `treino2` and `revisao2`, with the templates of these errors (the old modes are rebuilt byte
for byte as before).

### 8c. The blind translation, measured (2026-10-29)

Same model, same reading rules as prompt v3, repair at each step; the class is left to Z3. On the two G- halves:

| | v3 with repair | v4 (not adopted) | blind (`cego-v1`) |
|---|---|---|---|
| faithful formulas, review (99) | 81 | 83 | 82 |
| faithful formulas, test (100) | 93 | 91 | 92 |
| right class by Z3, review | 88 | 86 | 93 |
| right class by Z3, test | 97 | 99 | 96 |
| **does not follow, but came out "follows"** (review + test) | **9 + 2** | 10 + 0 | **0 + 2** |
| time per argument (median, Vega 8) | 40 s | — | 58 s |

Faithfulness is the same (McNemar p = 1.0 on both halves); what changes is the side of the error. In v3, 11 arguments
that do not follow came out "proved"; in the blind one, 2. The errors left in the blind one are, for the most part, on
the cautious side (an argument that follows came out "does not follow", or the sentence did not parse). For a reviewer,
saying "proved" when it is not is the error that cannot happen: the blind translation was adopted in the local service
(`ollama`, reviewer and Conversation) and in the reviewer's server. The one-shot formalization prompt remains in the
pilot and in formalization through Groq.

One more safeguard, found in a user's sentence ("every man is part of God, God is eternal, therefore man is eternal"):
the conclusion "man is eternal" came out with the formula for "God is eternal", which would give "proved". In the 199 G-
sentences this happened once (G-196). Now, a conclusion that repeats the formula of a premise with a different text goes
back to the model with the error; if it insists, it stays without a conclusion and the argument comes out "undecided",
never "proved". The underlying cause is that the reading rules do not speak of the generic "o A é B" ("the A is B",
man in general), and a probe showed more: with the vocabulary in the order `Homem, deus, Eterno…`, the model made the
sentence `Eterno(deus)`; with the constants at the end, `∀x (Homem(x) ⟹ Eterno(x))`. The order of the list decided the
subject.

`cego-v2`: the rule for the generic ("o A é B" speaking of A in general = "todo A é B", every A is B; the unique
individual is a constant) in both calls, and in the conclusion's call the predicates before the constants. On the G-
review half, against `cego-v1`:

| | cego-v1 | cego-v2 |
|---|---|---|
| faithful formulas (99) | 82 | 85 (+3 −0, McNemar p = 0.25) |
| right class by Z3 | 93 | 95 (+2 −0) |
| does not follow, but came out "follows" | 0 | 0 |

No sentence got worse; adopted. The test half is kept for the next check. With the real model, the user's sentence comes
out `∀x (Homem(x) ⟹ ParteDeDeus(x))`, `Eterno(deus)` ⊢ `∀x (Homem(x) ⟹ Eterno(x))`: a leap, with the scenario of
someone who is a man, is part of God and is not eternal.

## 9. The missing link (`ponte-v1`, 2026-10-30)

A worldview sentence rarely brings everything. The owner's argument ("each person is part of the whole; each person is
necessary to the whole; every person fulfills a function; none owns its function; therefore no person invalidates the
existence of another"), formalized by hand, is a leap: nothing in the premises speaks of invalidating. What closes it is
in the head of whoever writes, and that is what Cosmos now shows.

When Z3 says leap, the Conversation asks for the link (`src/motor/ponte.ts`, route `ollama/ponte`):

1. **Search by form, without a model.** "For any A and B: if [what the premises say about A and B], then [what the
   conclusion says]", with one or two conditions taken from the predicates of the premises (with the sign they have
   there). The predicates of the conclusion are left out: "if A is a man, then A is eternal" is the conclusion, not the
   link. A conclusion about an individual ("Eterno(socrates)") becomes "every x".
2. **Z3 decides whether it works:** with the premises, the conclusion has to follow; on its own, not (otherwise it is the
   conclusion in other words); and it cannot contradict the premises. A Z3 failure gets a second chance and never counts
   as "does not follow".
3. **Up to four options**, varied (each with the conditions the others did not use), with the facts each one uses and
   those that are not needed. Choosing among them is the person's view; the answer says how many others also close it.
4. **The model only if the search finds nothing** (a conclusion with ∃, more complex forms), with one round through the
   reason. In the argument above, qwen3:4b proposed "no one invalidates themselves", copying the scenario; that is why
   it is the fallback, not the path.

In the owner's argument, the search finds 36 links; among the four shown, "if A is necessary to the whole and B is
necessary to the whole, then A does not invalidate the existence of B" uses only "every person is necessary" (the rest
is not needed), and "if A does not own its function and B does not own its function…" uses only the last premise. The
answer separates fact, view and logic: the premises the link uses are facts (they need a source, or they are the
assumed base); the link is the view (what the person chooses to accept); with both, the conclusion is mandatory, and Z3
guarantees it. "Aceito esta" (I accept this one) takes the argument with the link to Minha cadeia, as proved.

What this piece does not solve: the translation of abstract sentences by the small model (the same argument, translated
by qwen3:4b, came out with "x is whole" instead of "x is part of the whole"). That stays with the correction of the
vocabulary on screen and with training.

### 9b. Correcting the terms (2026-10-30)

The Conversation card shows how Cosmos read each term and lets the person correct the reading or add a term (a property,
a relation between two, or a name). Verification is redone with this fixed vocabulary in both calls of the blind
translation (the `ollama` route accepts the vocabulary along with the text, only in the format of the terms). A changed
reading gets a new symbol, taken from it ("x é parte do todo" → `ParteDoTodo`), because the model reads the name of the
symbol along with it.

In the owner's argument, with "part of the whole", "necessary to the whole", "owner of its function" and "x invalidates
the existence of y" given, qwen3:4b translated three premises and the conclusion right (only "without each person, the
whole would not exist" came out bent); Z3 gave a leap and the search found, among others, "if A is part of the whole and
A does not own its function, then A does not invalidate the existence of any person". The search understands the
conclusion written from the inside (`∀x (A(x) ⟹ ∀y (B(y) ⟹ C(x, y)))`), as the model usually writes it.

### 9c. The large model in the cloud, optional (2026-10-30)

With the service opened with `--ollama --groq` (the launcher `Abrir-Cosmos-IA.cmd` adds `--groq` when the variable
`GROQ_API_KEY` exists), the Conversation shows the option of translating with `openai/gpt-oss-120b` on Groq. It starts
off and is remembered on the device; when on, the text of the argument leaves the computer (to Groq), and the screen
says so. The prompt is the same (blind translation `cego-v2`, the same rules and examples, temperature 0, with the
repair); Z3 decides here, and the card says who translated. We chose gpt-oss-120b (Apache 2.0) and not Llama, whose
license places conditions on derived models: the translations Z3 approves can become training data for the local model
(distillation), except for the closed set and the test half of the G- sentences.

First measure, with the owner's argument (2026-10-30): gpt-oss-120b read all the terms right without correction ("part
of the whole", "owner of its function", "x invalidates the existence of y") in 6 s; Z3 gave a leap and the search found
the four links, including "if A does not own its function and B does not own its function, then A does not invalidate
the existence of B". With the reason written in, "every person has their own sense of reality…" came out proved. In
both, the first answer came with an empty list of premises and the repair solved it: the cost was about 6 thousand tokens
per argument.

### 9d. "Sees as" in the prompt: not adopted (2026-10-30)

A user's case ("people see others as if they were gods…") became `Deus(y)`: "sees B as C" read as "B is C". `cego-v3`
added to the rules: "sees/treats/considers B as C" is a two-place relation, never the property C(b), and "the others" is
someone different (x ≠ y). On the G- review half, against `cego-v2`: faithful formulas 83 against 85 (+1 −3), right class
by Z3 92 against 95 (+0 −3), false "follows" 0 in both. The three losses do not come from the rule: with the longer
prompt, the small model added an extra premise, left an x loose and invented a subject ("eu", I). By the rule that only
what does not make things worse goes in, it was left out. The case is still covered by other paths: the "entendi" (I
understood) shows the error, the correction of terms accepts "x vê y como deus" (x sees y as god) as a relation, and the
large cloud model reads this kind of sentence.

### 9e. Comparison with a large model (2026-10-30)

"Alone" = the class asked directly of the model, with the same definitions as the prompt
(`testes/comparar-sozinho.test.ts`); "Cosmos" = the model translates (blind translation) and Z3 decides. On the 199 G-
sentences:

| System | 199: right class | 199: false "follows" (of 153) | 41: right class | 41: false "follows" (of 34) |
| --- | --- | --- | --- | --- |
| qwen3:4b alone (class stated in prompt v3) | 136 | 57 | 27 | 13 |
| gpt-oss-120b alone (Groq) | 184 | 0 | 38 | 0 |
| Cosmos with qwen3:4b (`cego-v1`) | 189 | 2 | 39 | 0 |
| Cosmos with gpt-oss-120b (`cego-v2`, Groq) | — | — | 40 | 0 |

The measurement of gpt-oss-120b inside Cosmos stopped at the first 50 sentences (by id), 41 of them translated: Groq's
free plan has a daily token limit, and the blind translation spends about 5 thousand per sentence (the other 9 came back
"sem cota", out of quota). The 41 column compares all the systems on these same sentences. Reading: the large model
alone already almost never gets "follows" wrong on these sentences; Z3 adds accuracy (the small one inside Cosmos beats
the large one alone) and, above all, the proof: formulas, the "entendi", the case that brings down the conclusion and
the missing link.


## Evaluation update - 2026-10-31

This note replaces the earlier aggregated comparative interpretation. On the clean half of set G, gpt-oss-120b alone got
99/100 right, with 0 false "follows" in 92 negatives. Cosmos + qwen3:4b cego-v1 got 96/100 right, with 2/92 false
"follows". On M1, the current translator cego-v2 also got 96/100 right, with 2/92 false "follows" and 1 item without a
class. It has not been shown that Cosmos improves the large model. The numbers 189/199 and 184/199 are only the history
of the two halves added together; they include the review half used for tuning and are not the main comparison.

On M1, G-030 changed (independent to contradicts, correct), G-091 (independent to follows, error), G-161 (contradicts to
no class) and G-196 (follows to contradicts, correct). The translations took 9,862.64 seconds adding the two processes;
this time excludes intervals and the evaluation interrupted for lack of memory. Equipment with an integrated GPU, not
used by the model: Ollama reported running on the CPU. The translations were not repeated and the prompt was not tuned
after observing the test.

Local evidence: `tmp/frases-gpt/cego2-teste/resumo-m1.json`, scores with 100 ids and SHA-256
`e711c7e733c65553da16a6cf14fc23b04e40cbfa687799b7d42e572c3993ec26`. The measurement files remain outside Git. The
confirmation of 117/120 on the closed set is historical, not redone in this mission.
