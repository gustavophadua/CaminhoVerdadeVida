# Reality v1: translating physical reality into logic

**Português:** [realidade-v1.md](realidade-v1.md). This is a translation; if the two differ, the Portuguese text
prevails. The base of facts and the sentences tested are in Portuguese; the quotes below are translated.

Version `realidade-v1`, 2026-11-01. Code: `src/motor/realidade.ts` and `src/dados/realidade-v1.ts`. Tests:
`testes/realidade.test.ts` and `testes/assistente.test.ts`.

## 1. The problem

Until now, Cosmos checked whether the conclusion follows from what the person said, **accepting the premises as true**.
The mission is a different one: the person is a fragment of the whole, and what they say is not accepted as true. It is
checked against recorded reality, and the answer shows what physical reality is like, without bending to whoever asks
and without guessing.

## 2. What is exact and what is not

| Step | Who does it | Is it exact? |
|---|---|---|
| Reading the Portuguese and writing the formulas | the language model | **No.** It is the only statistical step, and it appears on screen ("entendi:", I understood) to be checked |
| Linking the person's words to the terms of the base | a fixed rule: exact synonym, without accents | Yes. It is deterministic; ambiguous or negated does not link |
| Saying whether each sentence is a fact, goes against the facts or is undecided | Z3 | Yes |
| The mechanism behind what the person observed | Z3 | Yes |
| The conclusion in light of the facts and the report | Z3 | Yes |
| The facts themselves | the base, each with a source | They are what is recorded: they hold at everyday scale and under the written conditions |

The model never decides. After the translation, the same input always gives the same answer, for any person.

## 3. The base of facts

Each fact has four parts:
- an id (`R01`…);
- the sentence in Portuguese;
- the formula in m2 (first-order logic);
- the source.

Three writing rules:

1. **The conditions stay in the formula.** "Every electronic device **in operation** generates heat", not "every
   electronic device generates heat". A fact without the condition that makes it true is fanaticism.
2. **Different words are different things.** "Heated up" (the temperature rose) is not "generates heat": a cup in the
   sun heats up without generating heat. The link between the two is the first law of thermodynamics:
   `Esquenta(x) ⟹ GeraCalor(x) ∨ RecebeEnergia(x)` (heats up ⟹ generates heat ∨ receives energy).
3. **Existence is a fact too.** With rules alone, "every human being flies" would contradict nothing, because a world
   without humans satisfies the rules. That is why the base states that there exist human beings, mobile phones,
   sounds, light and fire.

The synonyms link the person's speech to the symbols of the base. Left out are those that would link wrongly:
- "cai" (falls), because "the price falls" is also said;
- "vivo" (alive), because being alive is not being a living being;
- "coisa" (thing), for being too vague;
- "queimando" (burning), because it also means fever.

A reading with "não" (not), or that matches two terms of the base, **does not link**.

v1 has 31 facts (`R01`–`R31`) about devices and heat, living beings, gravity and mass, light and sound, combustion, the
observer and the sense of heat. It is small on purpose: growing it means adding facts with a source, and each one passes
the tests of reading and of consistency of the base.

## 4. What the answer shows

1. **Entendi (I understood):** the person's words linked to terms of the base, for example "x heated up" = "the
   temperature of x rises", and the constants recognized as instances of a type ("the phone is a phone").
2. **Each sentence:**

   | Status | When |
   |---|---|
   | Recorded fact | the base proves the sentence (with the facts used) |
   | Goes against the facts | the base proves the opposite (with the facts used) |
   | Your report | speaks of terms of the base, but the base does not decide. Example: "the phone heated up" |
   | View | does not speak of anything the base knows |
   | Z3 did not conclude | time exhausted or undefined answer; it never turns into something else |

   The facts used are the necessary ones: each one, if removed, changes the decision.
3. **The mechanism**, for each report:
   - what it implies through the facts;
   - the recorded conditions that produce each possibility.

   Each condition must be possible, cannot already hold and cannot be the report itself.
4. **The conclusion in light of the facts and of the report compatible with them.** The sentences that go against the
   facts are left out of this computation.

## 4b. The observer: the person as a fragment of the whole (R27–R31)

No fact says "the person is limited". Z3 derives it from four facts:

| Fact | What it says | Source |
|---|---|---|
| R27 | Perceiving something requires being physically affected by it | Perception: all perception results from the physical or chemical stimulation of the senses |
| R28 | For every human being there are events that do not affect them (outside their light cone) | Light cone |
| R29 | Perceiving everything is perceiving all events | definition |
| R30 | Being limited in what one perceives is not perceiving everything | definition |

From these, through Z3:
- "Every person is limited in what they see" is a **fact** (R27, R28, R29, R30).
- "Some person sees everything" **goes against the facts** (R27, R28, R29).

R31 links material body to part of the universe ("everything that exists physically").

## 4c. Chains of "logo" (therefore)

"A, therefore B, therefore C, therefore D" is not read as three premises and one conclusion. B and C are steps:
- each one is checked from what came before;
- the result says, step by step, whether it follows, contradicts or is a new claim.

A step that does not follow reveals a hidden premise, and the screen shows it.

## 5. Examples (checked in the tests with Z3)

**"The phone heated up. Therefore, it has a virus."**

| Sentence | Status |
|---|---|
| The phone heated up | Your report |
| It has a virus | View: no fact links viruses to heat |

- **What the report implies through the facts:** the phone generated heat or received energy from outside (R04).
- **Recorded paths:**
  - in operation → generates heat (R01, R03);
  - exposed to the sun → receives energy (R21).
- **The conclusion:** the facts, with the report, do not lead to it.

**"Every human being can die. Therefore, every human being flies."**

| Sentence | Status |
|---|---|
| Every human being can die | Recorded fact (R05, R06, R07) |
| Every human being flies | Goes against the facts (R10, R22) |

**"Maria sees others as gods. Therefore, Maria suffers."**

Both sentences are views. Recorded reality does not decide, and Cosmos says so instead of guessing.

## 6. End to end, with the local model (2026-11-01)

The same sentences went through the whole chain: the text in Portuguese, qwen3:4b on Ollama, Z3 and the base. The test
is in `testes/realidade-ponta.test.ts` and only runs when called; the result goes to `tmp/realidade-ponta/`.

| Sentence | First round | After the fixes |
|---|---|---|
| "The phone heated up. Therefore, it has a virus." | no conclusion | **works:** the heating up is a report, with two recorded paths; the virus is a view |
| "Ana is a person. Therefore, Ana flies." | works: by logic alone it is a leap; by the facts the conclusion is **false** | same |
| "Every human being can die. Therefore, every human being flies." | works: premise is a **fact**, conclusion **goes against the facts** | same |
| "The laptop was left in the sun. Therefore, the laptop heated up." | no conclusion | translates, but "was left in the sun" becomes a relation with the sun and does not link to "exposed to the sun" |
| "People see others as gods. Therefore, people suffer." | the model uses a symbol it did not declare | same |

**What was blocking the phone.** The 4B model, seeing the vocabulary in use, translated "the phone has a virus" as
`Esquentou(celular)`, a copy of the premise. The guard blocked it. Had it gone through, it would have been a false
"proved": wrong reasoning with a seal of logic.

**Two fixes, both in the translation:**

1. **cego-v4.** Once the copy is blocked, the conclusion is translated from scratch, alone and without the connective.
   Then it is joined to the vocabulary of the premises by a fixed rule: the same constant, or a predicate with the same
   reading. It only changes the cases that used to stay without a conclusion. Measured on the 99 review items on
   2026-11-01 (section 6c): the new path did not fire on any item, so there it changes nothing. What it is worth on
   everyday sentences does not yet have its own measurement.
2. **Hidden subject.** "Therefore, it has a virus" is read as "Therefore, the phone has a virus", with the subject of the
   first sentence. The screen warns that it read it that way.

## 6b. Measurement: 20 sentences with the expected result written beforehand (2026-11-01)

The set `avaliacao/realidade-frases-v1.jsonl` (commit ea70771) was published **before** running. For each sentence, the
expected result is what physical reality decides, not what the base covers. From that comes the scoreboard:

- **exact hit**: gave the expected result;
- **guess**: gave certainty ("fact", "goes against", "follows", "contradicts") where reality does not decide or decides
  something else;
- **miss**: did not give certainty where reality decides;
- **other**: both without certainty, but different.

Result (`avaliacao/realidade-frases-v1-resultado-qwen3-4b.json`, scored by `scripts/pontuar-realidade.py`):

| Judgments | Exact hit | Guess | Miss | Other |
|---|---|---|---|---|
| 60 (3 per sentence: each sentence and the conclusion in light of the report) | 26 | **0** | 20 | 14 |

- **7 of the 20 sentences** came out right end to end: the phone and the virus, "Ana flies", "every human being flies",
  "every person is part of the whole, therefore limited in what they see", "the computer that is on generates heat",
  "ice is cold, therefore it does not generate heat" (where the right thing is not to decide: cold ice does not prove
  that nothing generates heat in it) and "every animal can die, therefore every human being can die".
- **6 sentences were left without a parsed translation**: the 4B used a symbol it did not declare or did not write the
  conclusion.
- **The other misses are from the translation, not from the base.** Examples:
  - "light needs a medium" became `Precisa(x, luz)`, with the meaning inverted;
  - "no one sees everything" became a meaningless formula;
  - "faster than light" and "needs energy" became relations with a constant, which do not link to the terms of the base;
  - "está ligada" (is on, feminine) does not link to "in operation".
- **A defect in the alignment** (RF-07): the model declared a constant called `x`, and the facts of the base, which
  quantify over x, stopped parsing. It was fixed after the round: the constant gets another name. The sentence would
  still be a miss, because its translation was also wrong.

What the number says: **the layer of facts did not guess a single time**. Where the translation fails, it stays silent
instead of inventing. But, with the 4B translating, it only decides 26 of 60 judgments. The bottleneck is the
translation.

This set is now **seen**. Changing synonyms or facts while looking at these failures and measuring again on it would be
fitting to the test. The next measurement needs new sentences, written beforehand, as these were.

## 6c. cego-v4 on the review set and the variation between rounds (2026-11-01)

| Round | Right class (Z3) | False "follows" | No class | Faithful formulas |
|---|---|---|---|---|
| cego-v2, 2026-10-29 | 95 | 0 | 1 | 85 |
| cego-v4, 2026-11-01 | 92 | 1 | 3 | 82 |

- The new path of cego-v4 **did not fire on any of the 99 items**: no repair says "conclusion translated again".
- The translator of the premises is the same code in both versions.
- 6 of the 96 parsed translations changed anyway. qwen3:4b on the CPU **does not repeat the same output between rounds**,
  even with the same model, the same Ollama, temperature 0 and seed 0.
- The false "follows" is G-089: "can only vote **if** accredited" was read the other way round.

Consequence: cego-v2's "0 false follows" holds for that round; it is not a guarantee. The difference between two rounds
of the same code reaches 3 items of right class and 1 false "follows". From now on:
- compare versions only on the items where the new code acted;
- publish the variation between rounds along with the scoreboard.

## 7. Limits

- **The model can read wrongly.** The "entendi:" and the correction of terms are still the defense.
- **A fact is what is in the base, with a source.** What the base does not have is not false: it is undecided.
- **v1 has no numbers** (temperatures, speeds). The facts are qualitative.
- **The mechanism looks for conditions of a single term,** with the types of the base. Only states and events have a
  mechanism; saying what something is ("Ana is a person") has no physical cause to look for.
- **The translation by the 4B model still fails** on sentences with relations ("was left in the sun" became a relation
  with the sun) and sometimes declares symbols badly. The base does not fix this; it only leaves the sentence as a view.

## 8. Counterattack: why this may fail

**1. Every commonsense base in logic has failed at scale.** The best-known case is Cyc, a decades-long project to write
common knowledge in logic. The risk is real.

The answer here:
- **The scope is narrow:** only physical reality and only facts with a source, no general common sense.
- **There is no need to cover everything:** what is not in the base appears as "undecided", not as an error.
- **Each fact is tested** for reading, consistency and use.

**2. Alignment by synonym is fragile.** "Esquentou" (heated up) links and "ficou morno" (got lukewarm) does not. The
choice is deliberate: a false alignment would be a guess, and a missing alignment only leaves the sentence as a report.
Growing the list of synonyms is work, and each new synonym must pass the same yardstick: it cannot link in another common
sense.

**3. The translation is still statistical.** The layer of facts does not remove this step, it only makes it visible.
Measuring the faithfulness of the translation on everyday sentences is still the measurement that matters most.
