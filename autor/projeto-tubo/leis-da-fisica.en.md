# The laws of physics inside the logic of Cosmos

**Português:** [leis-da-fisica.md](leis-da-fisica.md). This is a translation; if the two differ, the Portuguese text prevails.

Research requested by the author on 2026-11-11 (A.4, item 7), together with the check of A.14 (sleep, energy and the
Omega point). Everything was checked on the same day with the Cosmos engine (m2 reading, t1 translation and Z3 in
WebAssembly), in two test files that live in Cosmos, at `autor/projeto-tubo/cosmos/`:

- `tubo-6-leis-da-fisica.test.ts`: 29 physics cases (Newton, gravitation, relativity, thermodynamics, quantum
  mechanics and the limits of the logic itself);
- `tubo-5-sono-energia-omega.test.ts`: 16 cases from A.14, against the Tube base and against the axioms of the
  Principia.

All 45 cases pass with the recorded result. In three of them (F2, F4 and P3) I expected a decision, and Z3 did not
decide within the time limit. The test records what happened, not what I expected; section 5 (finding 4) explains why.
To repeat it, see section 9.

## 1. In one sentence

In Cosmos, a law of physics goes in as a premise, with its origin, and Z3 checks what follows from it, what contradicts
it and what it leaves open. It never proves the law: whether the law holds is for measurement to say.

What works: everything that can be written as an equality or inequality between numbers, with addition, multiplication
and division. That includes conservation, collisions, Kepler, Lorentz, Carnot, Heisenberg and Bell, and it is decided in
less than half a second. What does not work on its own: derivatives (the law goes in through its solution), functions
such as the exponential (they go in through axioms, and with ∀ Z3 gets stuck), questions about integers (there may be no
procedure at all) and units (the logic does not see them).

## 2. How a law goes into Cosmos

For the engine, a law is a formula of the Cosmos logic (m2). It can be universal, such as
`∀x (Aniquilacao(x) ⟹ ViraLuz(x))`, or a relation between numbers, such as `m1·u1 + m2·u2 = m1·v1 + m2·v2`. The
question is another formula, the conclusion. The answer follows the same rule as the Conversation (function
`classificar`, in `src/motor/avaliacaoZ3.ts`), with three calls to Z3:

| Call | If Z3 says | Result |
|---|---|---|
| 1. the premises alone | they do not fit together | **inconsistent** (the given laws contradict each other) |
| 2. the premises and the opposite of the conclusion | they do not fit | **follows** |
| 3. the premises and the conclusion | they do not fit | **contradicts** |
| 2 and 3 | both fit | **independent** (the given laws do not decide) |
| any of them | no answer within the time limit | **not decided** (never becomes true or false) |

**Necessary law and contingent case.** The Cosmos logic has □ (necessary) and ◇ (possible), with the rules of S5. A law
can go in as necessary, `□(∀x (Aniq(x) ⟹ Luz(x)))`. The concrete case goes in without □, because it could have been
different: it is the initial condition, the "value" of A.10. F5 and F6 show the difference: the necessary law applied to
the case gives the result in the real world (follows), but the result does not become necessary (independent). Physics
is the same: the laws are the same everywhere, and what happens also depends on how things started.

**Finding: the Conversation does not accept numbers yet.** The Cosmos engine accepts numeric constants and functions
(reals and integers) when it receives the list of symbols that are numbers (`checarZ3`, in `src/motor/z3.ts`). But the
Conversation route builds the vocabulary with `fichasDe` (`src/motor/avaliacao.ts`), which keeps only symbol, type and
arity and loses the number mark. The first attempt of this study through the Conversation's function stopped right at
`m1 > 0`, with the message "'m1' é objeto, mas aqui precisa ser número" ('m1' is an object, but here it has to be a
number). The physics tests go through the engine, with the same three-call rule. Today all the physics with numbers in
this document is out of reach for whoever asks through the Conversation (section 8, item 1). A.14 (section 6) uses no
numbers and goes through the Conversation's own function.

## 3. The 29 physics cases

Z3 is the real one, with a time limit of 20 s per call (F9: 10 s). The time is that of the three calls together, on an
ordinary laptop.

| Case | Law (premises) | Question (conclusion) | Result | ms |
|---|---|---|---|---|
| **A** | **Conservation and collisions (Newton)** | | | |
| A1 | elastic collision: momentum and energy conserved | v1 = ((m1 − m2)·u1 + 2·m2·u2) ÷ (m1 + m2) | follows | 489 |
| A2 | merger ("matter swallows matter"): momentum conserved, the two become one | the heat of the merger is never negative | follows | 185 |
| A3 | the same merger | the heat is ½·μ·(u1 − u2)², with μ = m1·m2 ÷ (m1 + m2) | follows | 222 |
| A4 | the same merger | "the merger creates energy" (heat < 0) | contradicts | 284 |
| A5 | Newton's second and third laws | total momentum is conserved | follows | 188 |
| **B** | **Gravitation** | | | |
| B1 | circular orbit and Newton's gravitation | Kepler's third law: T²·G·M = 4π²·r³ | follows | 237 |
| B2 | gravitation, with g = 9.81 m/s² at the surface | the Moon, at 60 Earth radii, falls with 0.0027 < a < 0.0028 m/s² | follows | 200 |
| **C** | **Special relativity** | | | |
| C1 | Lorentz factor | γ ≥ 1 | follows | 123 |
| C2 | relativistic addition of velocities | two velocities below c add up to less than c | follows | 263 |
| C3 | Galilean addition as an absolute law | 0.6·c + 0.6·c < c | contradicts | 122 |
| C4 | bridge: relativistic addition up to c ÷ 1000 | Galilean addition errs by at most 1 part in 1 million | follows | 343 |
| C5 | annihilation at rest: energy and momentum conserved | each photon leaves with m·c² | follows | 156 |
| **D** | **Thermodynamics** | | | |
| D1 | second law (the entropy of the reservoirs does not decrease) | Carnot's limit: W ≤ Qh·(1 − Tc ÷ Th) | follows | 125 |
| D2 | the same second law | an engine that turns all the heat into work (Qc = 0) | contradicts | 124 |
| D3 | total conserved and energy to spend that only goes down | the accumulated heat grows | follows | 48 |
| D4 | only the total conserved | the energy to spend goes down | independent | 46 |
| **E** | **Quantum mechanics** | | | |
| E1 | Heisenberg's uncertainty: Δx·Δp ≥ ħ ÷ 2 | exact position (Δx = 0) | contradicts | 79 |
| E2 | prior and local values (Bell): each result is +1 or −1 | the CHSH sum stays between −2 and 2 | follows | 125 |
| E3 | the same prior and local values | the measured value, S² = 8 (S = 2√2) | contradicts | 143 |
| **F** | **The limits of the logic** | | | |
| F1 | free fall through its solution, pos(t) = g·t² ÷ 2 for every t | pos(2) = 19.62 | follows | 109 |
| F2 | exponential through axioms: E(s + t) = E(s)·E(t) for all reals | E(2) = E(1)² | not decided | 22,334 |
| F3 | only the instance E(1 + 1) = E(1)·E(1) | E(2) = E(1)² | follows | 54 |
| F4 | exponential through axioms | E(1) between 2.7 and 2.8 (the number e) | not decided | 44,504 |
| F5 | □(every annihilation turns into light) and the event is an annihilation | the event turns into light | follows | 111 |
| F6 | the same | the event necessarily turns into light (□) | independent | 93 |
| F7 | E = m·c, with m = 2 and c = 3 (wrong units) | E = 6 | follows | 44 |
| F8 | Booker's witness (2019): x = 8866128975287528, y = −8778405442862239, z = −2736111468807040 | x³ + y³ + z³ = 33 | follows | 60 |
| F9 | none | there are integers with x³ + y³ + z³ = 33 | not decided | 20,072 |

Groups A to E are known physics, and each result is what physics says. Group F tests the logic itself: what it reads,
what it does not read and where it gets stuck.

Two right answers that Z3 did not give. In F2, the conclusion follows: it is enough to put s = t = 1 in the law (that is
F3). In F4, the right answer is "independent", because any base b > 0 satisfies the axioms (E(t) = bᵗ), and the axioms
do not say which one it is. To say "independent", Z3 would have to build a whole exponential function, and it does not.

## 4. The laws by logical form

What decides the fate of a law in Cosmos is not its field (mechanics, quantum, cosmology). It is the form in which it is
written.

| Form | Examples | In Cosmos | Why |
|---|---|---|---|
| Equalities and inequalities between reals, with +, −, × and ÷ | collisions, Kepler, Lorentz, Carnot, Heisenberg, Bell | always decides; the time can grow a lot, but here it stayed below 0.5 s | the arithmetic of the reals with addition and multiplication is decidable (Tarski, 1951); Z3 uses the nlsat procedure (Jovanović and de Moura, 2012) |
| With the exponential | decay, cooling, growth | goes in as a function without definition, with axioms; with ∀ it gets stuck (F2, F4) | with the exponential, the decidability of the reals is only proved assuming Schanuel's conjecture (Macintyre and Wilkie, 1996), and neither Cosmos nor Z3 has that procedure |
| With sine and cosine | waves, the Tube's clock | goes in as a function without definition, with axioms | with the sine, the arithmetic of the reals becomes undecidable (Richardson, 1968): sin(π·x) = 0 defines the integers |
| Integers with multiplication | counting, quantization, x³ + y³ + z³ = 33 | without a witness it may never decide (F9); with a witness, it checks at once (F8) | there is no general procedure: it is Hilbert's tenth problem (Matiyasevich, 1970) |
| With derivatives (differential equations) | F = m·a as an equation of motion, Schrödinger, Maxwell | does not go in as a derivative; goes in through the closed-form solution (F1) or as a relation between before and after (A1 to A5, D1 to D4) | the first-order logic of Cosmos has no calculus |
| Necessary laws (□) | "every annihilation turns into light" in every possible world | decides (F5, F6) | Cosmos translates □ and ◇ (S5) into first-order logic |
| Sets | the axioms of the Principia, extensionality | decides when the instance is given; with ∀ over sets it can get stuck (tubo-5, P3) | the same case as the exponential |

## 5. Five findings

1. **Conservation is the strongest bridge between physics and logic.** The laws that Cosmos decides effortlessly are
   the conservation laws (momentum, energy, mass and energy) and the inequalities that come out of them (Carnot, the
   heat of a merger, Bell). There is a reason for that. By Noether's theorem (1918), each conservation is a symmetry:
   energy comes from the laws not changing with time, and momentum, from them not changing with place. And a
   conservation law is an equality between before and after, without derivatives, which is exactly the format that
   first-order logic with numbers reads. It is also the law that A.14 points to.

2. **Theories that contradict each other as absolutes fit in the same Whole if each one has its domain.** Galilean
   addition as an absolute law contradicts the limit of light (C3). Restricted to velocities up to c ÷ 1000, it is a
   consequence of relativity, with an error of at most 1 part in 1 million (C4). This is D34 and item 3 of the verifier
   plan (§8.1 of the PROMPT): each fact needs to carry the domain where it holds. Without domains, a base with Newton and
   Einstein together is inconsistent, and from an inconsistent base everything follows (the explosion, shown in
   `comprovador.py`).

3. **The logic does not check units.** E = m·c (F7) passes without complaint: for Z3, mass and velocity are just
   numbers. Dimensional analysis (Buckingham, 1914) would catch the error at once, because on one side there are joules
   and on the other, kg·m/s. Today, a law with the wrong unit goes into the base and produces wrong "proved"
   conclusions. For physics, it is a real flaw of the verifier.

4. **What is not decided never becomes true, and a witness settles it.** The cases without a decision (F2, F4, F9 and,
   in A.14, P3) are the ones that ask to find an object the logic does not build on its own: a whole exponential
   function, three 16-digit integers or the right instance of an axiom about all sets. Given the instance (F3, P4) or
   the witness (F8), the answer comes out in less than 0.11 s. It is A.13 (Gödel inside the Tube) in small: there are
   truths the system does not reach on its own and that it checks at once when someone from outside brings the answer.
   Checking is cheap; finding can be impossible.

5. **Z3 proves consequences, never the law.** In every case the law went in as a premise. "Follows" means: if the law
   holds, this holds. Whether the law holds is a question for measurement. Galilean addition held for almost three
   centuries within the domain where it was measured; relativity did not erase it, it gave its limit (C4). In Cosmos,
   "proved" is always relative to the premises.

## 6. A.14 checked

The author's update (A.14, 2026-11-11), sentence by sentence, with what physics and neuroscience say and what Cosmos
checked. The sentences went in as new facts (N1 to N5), together with the base (realidade-v1 and `base-tubo-v1.json`,
facts T01 to T13). The formulas are my reading of the sentences; the author may read them another way.

| Fact | Formula | Sentence of A.14 |
|---|---|---|
| N1 | ∀x (Fragmento(x) ∧ ¬Dorme(x) ⟹ PontoAberto(x)) | the fragment sustains the observer point |
| N2 | ∀x (Dorme(x) ⟹ ¬PontoAberto(x)) | during sleep it closes the observer point |
| N3 | ∀x (Dorme(x) ⟹ RevisitaOPassado(x)) | going back to what already collided in the past |
| N4 | ∀x (RevisitaOPassado(x) ∧ ¬PontoAberto(x) ⟹ Embacado(x)) | without the presence of observation, that's why everything is blurry |
| N5 | ∃x (ConcentraOTodo(x)) | up to the Omega point, where the Whole is totally concentrated |
| S20 (my supposition) | ∀x (ConcentraOTodo(x) ⟹ ValorTotal(x)) | concentrating the Whole is having the total value |

The predicates are in Portuguese, as in the base: Dorme = sleeps, PontoAberto = the observer point is open,
RevisitaOPassado = goes back to the past, Embacado = sees blurry, ConcentraOTodo = the Whole is concentrated in it,
ValorTotal = has the total value. The facts of the base that enter the calculations: T01 (every fragment is inside the
Tube), T02 (whoever is inside the Tube does not see the Whole), T03 (whoever has the total value sees the Whole), T04
(whoever is inside the Tube does not rest) and T11 (every human is a fragment).

### 6.1 Sleep

**What closes.** In deep sleep (NREM), a magnetic stimulus to the cortex, which spreads over several areas when awake,
stays local and fades quickly (Massimini and others, 2005). The cortex stays active, but its parts stop integrating. In
neuroscience, it is the closest thing to "closing the observer point".

**What is revisited.** In sleep, the hippocampal cells that fired together while a rat explored fire together again
(Wilson and McNaughton, 1994), in the same order and several times faster (Nádasdy and others, 1999). It is "going back
to what already collided", and compressed in time.

**The blur.** Dreams bring pieces of waking life, almost never a whole episode: one study found the faithful replay of
an episode in less than 2% of the reports (Fosse, Fosse, Hobson and Stickgold, 2003; I checked this number only in
secondary sources). In REM sleep, the dorsolateral prefrontal cortex, which checks and judges, is among the least active
areas of the brain (Maquet and others, 1996). In lucid dreaming, where the person knows they are dreaming, frontal
activity comes back (Voss and others, 2009). So the point is not all or nothing: in deep sleep it closes almost
entirely; in REM it stays half open (there is experience, the checking is missing); in lucid dreaming, it opens a
little.

**The spending.** The sleeping brain does not switch off. In deep sleep, PET measurements give 12% to 44% less glucose
than awake, depending on the study (Heiss and others, 1985; Maquet, 1995); the reviews speak of about 40%. In REM, the
brain uses almost the same as awake (Maquet and others, 1990: a difference of 4.3%, not significant). In sleep, the space
between brain cells grows by about 60% and waste clearance speeds up (Xie and others, 2013, in mice). Sleeping is another
operation, not the absence of operation.

In Cosmos, with the base and N1 to N5 (through the function `classificar`, the same as the Conversation's):

| Case | Question | Result | Where it comes from | ms |
|---|---|---|---|---|
| S0 | is the base with A.14 consistent? | consistent | | 798 |
| S1 | every human who sleeps sees blurry | follows | N2, N3, N4 | 343 |
| S2 | some human sleeps and sees sharp | contradicts | N2, N3, N4 | 346 |
| S3 | the awake human sustains the open point | follows | T11, N1 | 325 |
| S4 | some human sleeps and rests | contradicts | T11, T01, T04 | 277 |
| S5 | some human sleeps | independent | nothing forces or forbids it | 313 |

The column "where it comes from" is the chain I found by hand; Z3 checks the result, not the chain. The case that
matters is S4. The "sleeping" of A.14 cannot be "resting" in the sense of T04 ("you only rest after the completion of
the Whole", A.6). Sleep is closing the observer point without leaving the Tube and without stopping spending.
Neuroscience agrees on the spending. This is D36.

**The blur has an exact version.** It is the data processing inequality (Cover and Thomas). If what is drawn afterwards
(Z) depends on what happened (X) only through the memory (Y), then Z has no more information about X than Y has.
Replaying without a new observation keeps or loses distinction, never gains it. In logic, with two different collisions
that sleep merged into a single memory:

| Case | Question | Result | ms |
|---|---|---|---|
| E1 | lembra(c1) = lembra(c2), with c1 ≠ c2: what is drawn afterwards from the memory alone is equal for both | follows | 46 |
| E2 | the same, with a different new observation for each | independent | 61 |

E1 says that a function does not separate what it received together. E2 shows the way out: only a new observation can
separate. Awake, with the point open, the blur can be corrected; asleep, it cannot. To put this in the machine, the
fragment would need to keep the collisions it had (D38).

### 6.2 The energy that is preserved and the energy to spend

A.14 says two things: the Whole's energy is preserved, and this "does not cancel that the Whole has energy to spend, it
only adds". In physics they are two laws. The first (conservation) says the total does not change. The second
(Clausius, 1865) says that the part that can be used, the free energy, only goes down, because it turns into heat and
does not come back. A constant total and a useful part going down fit together: the difference becomes spending.

| Case | Premises | Question | Result | ms |
|---|---|---|---|---|
| D3 | total conserved and energy to spend that only goes down | the accumulated heat grows | follows | 48 |
| D4 | only the total conserved | the energy to spend goes down | independent | 46 |

D4 is A.14's "only adds" in the form of a proof: conservation alone does not decide the spending, and spending is one
more law, added to the first without contradicting it (D3 is consistent). The machine already obeys both: reserve +
motion + spent = total (test 1 of section 9 of the PROMPT; `confere-z3.py`, items 7 to 9), and the spent part only
grows. The Principia already speaks of free energy without that name: "Each star that forms is gravitational order
being spent" (page 5).

A caveat of scale. In general relativity, in an expanding universe, total energy has no well-defined global
conservation: light that crosses expanding space loses energy (redshift), and that energy does not go to a place where
it can be added up (Carroll, 2010). Locally, conservation always holds. "The Whole's energy is preserved" holds without
caveat for the Tube as a closed system, and for the whole universe only in the local sense.

### 6.3 Matter swallows matter, up to the Omega point

**At the local scale, it is physics.** Gravity gathers matter. In a merger, mass and momentum are conserved, and the heat
of the merger is ½·μ·(Δv)², which is never negative (A2 to A4). Even so, not even the merger of neighbouring galaxies is
certain: that of the Milky Way with Andromeda, once taken as certain, has about a 50% chance in the next 10 billion years
(Sawala and others, 2025).

**At the scale of the universe, it depends on dark energy.**

| Scenario | What it says | Status in 2025 | The end |
|---|---|---|---|
| Constant dark energy (the standard model, ΛCDM) | the expansion accelerates forever | it is the standard and fits the data well | cold, diluted and uniform; black holes evaporate (Hawking) in 10⁶⁷ years or more |
| Dark energy that changes with time (DESI, 2025) | the acceleration weakens | preferred at 2.8σ to 4.2σ, depending on the supernovae used; below the 5σ physics asks for a discovery | open |
| Recollapse (Luu, Qiu and Tye, 2025) | a model with a negative cosmological constant and an extra field; in the best fit to the data, the universe lasts 33.3 billion years and about 20 are left | a model, not confirmed | concentrated (Big Crunch), the closest to A.14's Omega point |

**The name "Omega point" already exists.** Teilhard de Chardin (1955) gave this name to the final point of maximum
complexity and consciousness of evolution: it is philosophy and theology, not physics. Tipler (1994) gave a physical
version: the end of a closed universe that contracts again, with everything concentrated and information processing
without limit. Tipler's version needs a recollapse, and the acceleration of the expansion, measured since 1998, takes
that scenario out of the standard model. A.14's Omega point, with the Whole concentrated at the end, has the geometry of
Tipler's.

**It clashes with the Principia.** The Principia (page 5) says: "the end is the equality of everything through the
exhaustion of that order. Beginning and end have the same uniform temperature". A.14 says the end is the Whole totally
concentrated. The two only fit together if gravity wins at the end. The same page of the Principia gives the key: "The
state of maximum entropy of a mass in a region is a black hole". With constant dark energy, gravity does not win, and
the end is the Principia's. With a recollapse, it is A.14's. This is D39.

In Cosmos, with the base, N1 to N5 and S20:

| Case | Question | Result | Where it comes from | ms |
|---|---|---|---|---|
| O0 | is the base with A.14 and S20 consistent? | consistent | | 296 |
| O1 | the Omega point is a fragment | contradicts | S20, T03, T01, T02 | 327 |
| O2 | the Omega point is outside the Tube | follows | S20, T03, T02 | 360 |
| O3 | without S20: the Omega point is a fragment | independent | | 377 |

And against the axioms of the Principia (Ax1: every fragment is inside the Whole; Ax2: no fragment is the Whole; Ax3:
there are at least two distinct fragments; Ax5: the fragments cover the Whole):

| Case | Premises | Question | Result | ms |
|---|---|---|---|---|
| P1 | Ax1, Ax2, Ax3, Ax5 | a single fragment is left | contradicts (Ax3) | 200 |
| P2 | Ax1, Ax2, Ax5, without Ax3 and without extensionality | a single fragment is left | independent | 109 |
| P3 | Ax1, Ax2, Ax5 and extensionality for all sets | a single fragment is left | not decided | 20,169 |
| P4 | Ax1, Ax2, Ax5 and only the instance of extensionality (the fragment that is left and the Whole) | a single fragment is left | contradicts | 108 |

The reading of P4: the fragment that is left is inside the Whole (Ax1) and, alone, covers the Whole (Ax5); so it has the
same elements as the Whole and, by extensionality, it is the Whole, which Ax2 forbids. The Principia already needed this
extensionality to prove T1 (note "Extensionality", currently turned off in `principia.json`). P2 shows that without it
nothing is decided: a set could have the same elements as the Whole and be another one.

Conclusion: in the Tube and in the Principia, there is no fragment at the Omega point. What is left with everything
concentrated is the Whole itself. This matches A.14 ("the whole is totally concentrated") and T01 in words ("while it
does not close"): the fragment axioms hold while the Tube is open. This is D40.

### 6.4 A.14 in summary

| Sentence of A.14 | What science says | In Cosmos | Decision |
|---|---|---|---|
| the fragment sustains the observer point | awake, the cortex integrates; that integration falls in deep sleep (Massimini, 2005) | N1; S3 follows | D37 |
| in sleep, it closes the point | in deep sleep it closes almost entirely; in REM it stays half open | N2; the base stays consistent (S0) | D36, D37 |
| it goes back to what already collided | the hippocampus replays what was lived, compressed in time | N3 | D38 |
| without observation, everything blurry | dreams are pieces; the data processing inequality | N4; S1 follows, S2 contradicts; E1, E2 | D38 |
| energy does not disappear, it is preserved | first law; the machine already obeys it; in an expanding universe, only locally | D3 follows | |
| matter swallows matter | gravity gathers; in a merger, mass and momentum are conserved and the heat is never negative | A2 to A4 | D41 |
| up to the Omega point, the Whole concentrated | only with a recollapse; the standard model does not recollapse; the 2025 data leave it open | O0 to O3; P1 to P4 | D39, D40 |
| it does not cancel the energy to spend, it only adds | the second law adds to the first | D4 independent | |

## 7. Limits

- The tests check logic, not measurement. No laboratory data goes in, only the given constants (g = 9.81 m/s²; π
  between 3.14 and 3.15).
- The 20 s time limit is a choice. A "not decided" can become a decision with more time (F2, in principle) or never
  (F9, in the general case). The times are from an ordinary laptop; on another machine they change, and the results do
  not, except the "not decided" ones, which depend on the time limit.
- Z3 in WebAssembly takes about 2 GB per instance; that is why each test file runs in its own process.
- The observer point and sleep are a structural correspondence, not a measurement of the machine. The machine has
  neither sleep nor memory.
- Part of the neuroscience sources was checked only in reviews: Fosse's less than 2% (2003) and the range of 12% to 44%
  of glucose drop in deep sleep.
- The cosmology numbers of 2025 are preliminary (from 2.8σ to 4.2σ, below the 5σ of a discovery), and Luu, Qiu and
  Tye's recollapse is the best fit of one model, not a measurement.
- The formulas N1 to N5 are my reading of A.14, and S20 is a supposition of mine. Another reading may give other
  results.

## 8. What this asks of Cosmos

1. **Numbers in the Conversation.** Pass `numerico` and `argumentos` in `fichasDe` (`src/motor/avaliacao.ts`), so that
   a question with numbers reaches the engine the way it does in the tests.
2. **Units as a type.** Each numeric symbol with its dimension (mass, length, time), and the reader refusing to add or
   equate different dimensions. It would catch F7.
3. **A domain in each fact** (D34; §8.1 of the PROMPT, item 3): "holds for v ≤ c ÷ 1000". C3 and C4 show what
   changes.
4. **Conservation as a module.** A ready-made block with the conservation laws (momentum, energy, charge), for
   collisions and reactions. It is the strongest bridge (finding 1).
5. **Ask for the witness.** When Z3 does not decide, Cosmos can ask whoever makes the claim (person or AI) for the
   witness or the instance, and check it. That is what closes F2 and F3, F8 and F9, P3 and P4. "Not decided" should
   come with "bring an example or the instance".

## 9. How to repeat

At the root of the Cosmos repository, one file at a time (each one opens its own Z3):

```
npx vitest run --config autor/projeto-tubo/cosmos/vitest.config.ts autor/projeto-tubo/cosmos/tubo-6-leis-da-fisica.test.ts --reporter verbose
npx vitest run --config autor/projeto-tubo/cosmos/vitest.config.ts autor/projeto-tubo/cosmos/tubo-5-sono-energia-omega.test.ts --reporter verbose
```

Each case prints a line `caso {...}` with the result and the time (the results are printed in Portuguese: segue =
follows, contradiz = contradicts, independente = independent, nao-decidiu = not decided). The physics one took 93 s (the
three "not decided" wait for the time limit); the A.14 one, 26 s.

## Sources

Sleep neuroscience:

- Massimini M. and others (2005). Breakdown of cortical effective connectivity during sleep. *Science* 309: 2228–2232.
  <https://pubmed.ncbi.nlm.nih.gov/16195466/>
- Wilson M. A., McNaughton B. L. (1994). Reactivation of hippocampal ensemble memories during sleep. *Science* 265:
  676–679. <https://doi.org/10.1126/science.8036517>
- Nádasdy Z. and others (1999). Replay and time compression of recurring spike sequences in the hippocampus. *Journal of
  Neuroscience* 19: 9497–9507. <https://doi.org/10.1523/JNEUROSCI.19-21-09497.1999>
- Fosse M. J., Fosse R., Hobson J. A., Stickgold R. J. (2003). Dreaming and episodic memory: a functional dissociation?
  *Journal of Cognitive Neuroscience* 15: 1–9. <https://www.scilit.net/publications/22c6d22a09f608636a76a4afd58ed8b2>
- Maquet P. and others (1996). Functional neuroanatomy of human rapid-eye-movement sleep and dreaming. *Nature* 383:
  163–166. <https://doi.org/10.1038/383163a0>
- Maquet P. and others (1990). Cerebral glucose utilization during sleep-wake cycle in man determined by positron
  emission tomography and [18F]2-fluoro-2-deoxy-D-glucose method. *Brain Research* 513: 136–143.
  <https://doi.org/10.1016/0006-8993(90)91099-3>
- Heiss W.-D. and others (1985). Regional cerebral glucose metabolism in man during wakefulness, sleep, and dreaming.
  *Brain Research* 327: 362–366.
- Maquet P. (1995). Sleep function(s) and cerebral metabolism. *Behavioural Brain Research* 69: 75–83.
- Maquet P. Positron emission tomography studies of sleep and sleep disorders (review).
  <https://doi.org/10.1007/BF03160568>
- Voss U. and others (2009). Lucid dreaming: a state of consciousness with features of both waking and non-lucid
  dreaming. *Sleep* 32: 1191–1200. <https://pmc.ncbi.nlm.nih.gov/articles/PMC2737577>
- Xie L. and others (2013). Sleep drives metabolite clearance from the adult brain. *Science* 342: 373–377. NIH note:
  <https://www.nih.gov/news-events/news-releases/brain-may-flush-out-toxins-during-sleep>

Physics and cosmology:

- Noether E. (1918). Invariante Variationsprobleme. *Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen*.
- Clausius R. (1865). Über verschiedene für die Anwendung bequeme Formen der Hauptgleichungen der mechanischen
  Wärmetheorie. *Annalen der Physik*.
- Carroll S. (2010). Energy is not conserved.
  <https://www.preposterousuniverse.com/blog/2010/02/22/energy-is-not-conserved/>
- DESI Collaboration (2025). DESI DR2 Results II: Measurements of baryon acoustic oscillations and cosmological
  constraints. <https://arxiv.org/abs/2503.14738>
- Luu H. N., Qiu Y.-C., Tye S.-H. H. (2025). The lifespan of our universe. <https://arxiv.org/abs/2506.24011>
- Sawala T. and others (2025). *Nature Astronomy*. <https://doi.org/10.1038/s41550-025-02563-1>
- Teilhard de Chardin P. (1955). *Le phénomène humain*.
- Tipler F. J. (1994). *The Physics of Immortality*.
- Buckingham E. (1914). On physically similar systems; illustrations of the use of dimensional equations. *Physical
  Review* 4: 345–376.

Logic and decidability:

- Tarski A. (1951). *A Decision Method for Elementary Algebra and Geometry*.
- Richardson D. (1968). Some undecidable problems involving elementary functions of a real variable. *Journal of
  Symbolic Logic* 33: 514–520.
- Macintyre A., Wilkie A. (1996). On the decidability of the real exponential field. In *Kreiseliana*.
- Matiyasevich Y. (1970). Enumerable sets are Diophantine. *Soviet Mathematics Doklady* 11: 354–358.
- Jovanović D., de Moura L. (2012). Solving non-linear arithmetic. *IJCAR 2012*.
- Booker A. R. (2019). Cracking the problem with 33. *Research in Number Theory* 5: 26. <https://arxiv.org/abs/1903.04284>
- Cover T. M., Thomas J. A. (2006). *Elements of Information Theory*, 2nd edition, section 2.8 (data processing
  inequality).
