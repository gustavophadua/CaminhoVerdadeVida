# The multiverse: the logic, and whether it is possible

**Português:** [multiverso.md](multiverso.md). This is a translation; if the two differ, the Portuguese text prevails.

Checked on 10 November 2026 with Z3 (`multiverso-z3.py`) and with the machine (`multiverso-confere.js`). To repeat:

```
python -I -X utf8 -B multiverso-z3.py
node multiverso-confere.js maquina-do-tubo.html
```

"Multiverse" is not one theory: it is at least four different ideas, with different logics. And "possible" has three senses that must not be mixed: (1) it does not contradict itself; (2) it fits the known laws; (3) it actually exists. The table separates the three.

## 1. The four multiverses

| Level | What it states | Where it comes from | The logic | Evidence | Verdict |
|---|---|---|---|---|---|
| 1. Beyond the horizon | Space continues beyond the 46 billion light-years we see; if it is infinite and similar everywhere, every finite configuration repeats somewhere | Standard cosmology + infinite space | Pigeonhole: more regions than possible states forces repetition (proved, M4). It needs infinite space and a finite number of states per region (quantum physics gives the finite) | The measured curvature is zero within the error (Planck 2018: Ω_k = 0.001 ± 0.002), compatible with infinite and also with finite and huge. By construction, nothing beyond the horizon can be seen | Does not contradict itself: yes. Fits the laws: yes. Exists: undecidable; "infinite" cannot be measured |
| 2. Bubbles of eternal inflation | Inflation never stops everywhere; each bubble that stops becomes a universe, possibly with different constants (the string "landscape", with about 10⁵⁰⁰ vacua) | Some models of inflation; string theory | It has a hole: the measure problem. With infinitely many bubbles, "the fraction of universes like ours" depends on the order in which they are counted (M5: the same list gives 1/2 or 2/3). Without choosing the measure, the model predicts nothing; with it, it predicts strange things (Boltzmann brains, the youngness paradox) | The mark of collisions between bubbles was sought in the background radiation (Feeney and others, 2011): nothing significant. The 10⁵⁰⁰ vacua are a count of solutions of equations, not of worlds | Does not contradict itself: only after choosing a measure. Fits the laws: in some models. Exists: no evidence |
| 3. Everett (many worlds) | Quantum mechanics without collapse: the state of the whole evolves only by the Schrödinger equation; a measurement does not choose a result, it branches; each branch sees one ("relative state", Everett 1957) | The equations of quantum mechanics themselves, minus one postulate | Consistent: it is the known law with one rule fewer. It escapes Bell by denying that each measurement has a single result (M2: weighted branches, with no signal between the sides, give S = 2√2). Open: why the weights of the branches work as probabilities (Born rule; Deutsch 1999 and Wallace 2012 derive it through decision theory, contested) | It makes the same predictions as ordinary quantum mechanics in every experiment done to date, so none of them confirms or refutes it. In principle, undoing a measurement would distinguish them (Deutsch, 1985); ever larger superpositions have been made (molecules of 2,000 atoms, 2019), none decisive | Does not contradict itself: yes. Fits the laws: it is the law. Exists: undecidable today; it is an interpretation |
| 4. Mathematical universe | Every consistent mathematical structure exists physically (Tegmark, 2008); a relative of Lewis's modal realism (1986): every possible world is real | Philosophy | It has no content that can turn out wrong; the measure problem returns in full (which structure is "more probable"?); to escape Gödel, Tegmark restricts it to computable structures | None, by construction | It is not a physical claim. It is a philosophical position, consistent and empty of prediction |

A caveat that holds for all four: "what happens is possible" does not imply "everything that is possible happens". The multiverse states the second sentence; nothing in the first supports it. And "possible" is not "probable" while there is no measure (M5).

## 2. The logic, checked

| No. | Checked | Result | What it means |
|---|---|---|---|
| M1 | A single world, with one result per measurement fixed beforehand and local | no solution for S = 2√2 | It is Bell: a world of prior, local values does not reproduce what is measured |
| M2 | Many weighted branches, with no signal between the sides | exists (S = 2√2) | Everett's way out is logically open: it drops "a single result", keeps that one side does not signal to the other and that the whole is deterministic |
| M3 | The same logic of branches, asking for S = 4 | exists | The logic of branches accepts the "PR box" (Popescu and Rohrlich, 1994), which nature does not produce. The real bound, 2√2 (Tsirelson, 1980), comes from the structure of quantum mechanics, not from "there being many worlds". Branching removes the contradiction; it does not predict the number |
| M4 | 4 regions, 3 states each | proved that two repeat | Level 1 is forced if space is infinite with finitely many states per region |
| M5 | Fraction of even numbers among the integers, in two counting orders | 0.500 and 0.667 | In an infinite collection, probability does not exist before a measure is chosen. It hits levels 1, 2 and 4, and the Born rule of level 3 |

## 3. The Tube and the multiverse

**As it is, the Tube is a single history.** The engine has neither chance nor branching: zero calls to any source of randomness; two runs with the same initial state give exactly the same (1,292 collisions, 351.4125 s). It is Laplace, and it is the author's A.10: the values go down through the mechanisms.

**The "testing all the possibilities" of A.6 is a multiverse in series.** All the possibilities are realized, one after another, in a single history, until the stock runs out. In physics this has a name: the ergodic hypothesis (Boltzmann), the system visits all its states over time. Measured in the machine, with the S11 stock of 180 possibilities, in 30 turns of the clock:

| Scenario | Reached |
|---|---|
| all at rest, no loss | 18 of 180 (10 %) |
| all at rest, 50 % loss | 18 of 180 (10 %), with only 36 meetings |
| all with force, 50 % loss | 18 of 180 (10 %) |
| half with force, 50 % loss | 180 of 180 (100 %) |

A single history only exhausts the stock with force and loss together: the force replenishes energy and the loss changes the ratios between speeds (E9 in `solucoes.md`). On its own, the loss shrinks the visited set (that is what dissipation does: it contracts the state space). The multiverse in series is not automatic; it needs an engine.

**The Alpha and Omega structure is Everett's.** Side by side:

| Author (A.1) | Everett (1957) |
|---|---|
| Alpha knows all the values and mechanisms; for Alpha there is no "will be" | The state of the whole evolves deterministically; nothing is chosen |
| The fragment only possesses its value, limited to what it sees | Each observer has a "relative state": it sees one branch, not the whole |
| "From inside the tube it is impossible to know" (A.6) | No branch observes the others; that is why the multiverse cannot be measured from inside |

The parallel is structural, not evidence: the sentence "from inside it is impossible" is exactly the reason why the multiverse is undecidable, not a sign that it exists.

**What the branching version would cost the Tube:**

- The stock is not exhausted; it is realized all at once. The cone cannot close "when the possibilities run out". It needs another closing rule (for example, the clock of engine B, D32: all branches end at the apex at T_f).
- Each meeting becomes a bifurcation. With 1,319 meetings, there would be 2¹³¹⁹ branches, if none merged; with a finite stock (180), equal branches merge and the number of distinct histories stays limited. Logically it fits; the machine would have to go from one history to a set of histories.
- "Collision" would stop being an exchange of speed and become the point where the history splits: a new rule, which the author would have to give.

**Bell forces a choice.** A single history with prior values only survives as superdeterminism (D29). Branching survives as Everett (D33). Both are consistent; neither can be tested from inside. What does not survive is the middle ground: a single, local history with prior values per fragment (M1).

## 4. Verdict

- **Is it possible?** In senses 1 and 2 (does not contradict itself; fits the laws), yes for levels 1 and 3; level 2 only after resolving the measure; level 4 is not physics.
- **Is it real?** None has been shown to be real, and most cannot be observed by construction. No current experiment decides. Whoever states that the multiverse exists is stating more than they know; so is whoever states that it is impossible (except for level 2 without a measure, which today predicts nothing).
- **For the Tube:** today it is a model of a single, deterministic history. A multiverse version is logically possible, but it replaces the closing rule and the collision rule. It is decision D33, and it is up to the author.
