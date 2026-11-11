# Translation to Z3 — version t1

**Português:** [traducao-z3-t1.md](traducao-z3-t1.md). This is a translation; if the two differ, the Portuguese text
prevails.

This file defines how the Caderno Lógico takes formulas to Z3 and what Z3's
answer means. It applies together with `gramatica-m2.md`, where the
expanded tree comes from (section 5), and with `traducao-z3-t1-exemplos.json`, the normative
examples. With the three, another implementation can translate the same formulas
without reading the Caderno's code and check whether the semantics is preserved.

## 1. What goes in and what comes out

In goes a list of accepted, already expanded formulas, and the set **N** of
numeric names: the symbols of the entries that say `numerico` (constants and
functions whose value is a number).

Out comes Z3's verdict for the conjunction of the formulas, all asserted in the real
world:

| Verdict | Means |
| --- | --- |
| `unsat` | There is no model of any size, not even an infinite one |
| `sat` | There is a model, which may be larger than any bound, or infinite |
| `unknown` | Z3 did not decide within the time limit (20 s in the Caderno) |

The Caderno's questions are conjunctions. "Follows" is: the premises and the negation of the
conclusion have no model. "Contradicts" is: the premises and the conclusion have no
model. "Consistent" is: the premises have a model. Before asking, the Caderno
may leave out the premises that share no name with the
conclusion, not even through other premises; this chooses what goes to Z3, and
does not change the translation.

## 2. Semantics

The formulas speak of Kripke structures with a constant domain:

- a non-empty set **O** of objects and a non-empty set **W** of
  worlds, with a real world **w₀**;
- each constant outside N is an object, the same in every world (rigid);
- each constant in N is a real number, rigid;
- each function outside N gives, in each world, an object for each list of
  arguments (it may change from one world to another);
- each function in N gives a real number and is the same in every world;
- each predicate (and each proposition, the predicate of arity 0) is, in each world,
  a set of argument lists;
- membership (∈) is, in each world, a relation between objects;
- each holder `a` of B[a] has an accessibility relation **Rₐ** between worlds, serial,
  transitive and euclidean (KD45);
- ∅ is an object to which no object belongs, in any world.

The value of a formula in a world `w`:

| Formula | Holds in `w` when |
| --- | --- |
| `t = u` | the two terms are the same object, or the same number |
| `t ∈ u` | the pair is in the membership of `w` |
| `t < u`, `≤`, `>`, `≥` | the comparison holds in the reals |
| `P(t…)` | the list is in the predicate in `w` |
| ¬, ∧, ∨, ⟹, ⟺ | as in classical logic |
| `□φ` | φ holds in **all** worlds (S5: there is no accessibility relation for □) |
| `◇φ` | φ holds in some world |
| `B[a] φ` | φ holds in every `v` with Rₐ(w, v) |
| `∀x φ`, `∃x φ` | for every / some object, the same domain in every world |
| `∀x∈ℝ φ`, `∃x∈ℝ φ` | for every / some real number |
| `∀x∈ℤ φ`, `∃x∈ℤ φ` | for every / some integer |

Arithmetic is that of the reals. Dividing by zero gives some number, which depends only on the
numerator (`n / 0 = 5` has a model; with `n = m`, `n / 0` and `m / 0` are the same
number). A power with a natural exponent written as a number is repeated
multiplication; the others follow Z3's real power.

The formulas hold in w₀. The Caderno's finite engine uses the same semantics, with O
and W finite, and does not read numbers: formulas with numbers only go to Z3.

## 3. Translation

Z3 types: `Obj` and `Mundo` (world) (uninterpreted), `Bool` and `Real`. There is a
constant `w0 : Mundo` and a function `pertence : Mundo × Obj × Obj → Bool` (belongs).

**Symbols.** The names in Z3 are informative; what counts is the type of each
symbol and whether it receives the world.

| In the tree | In Z3 |
| --- | --- |
| constant `c`, outside N | `c:c : Obj` |
| constant `n`, in N | `n:n : Real` |
| `∅` | `c:∅ : Obj`, plus the axiom ∀w ∀z ¬pertence(w, z, c:∅) |
| number | `Real` with the written decimal value |
| `f(t₁…tₖ)`, f outside N | `f:f/k[:sig](w, t₁…tₖ) : Obj` |
| `f(t₁…tₖ)`, f in N | `fn:f/k[:sig](t₁…tₖ) : Real`, without the world |
| `P(t₁…tₖ)`; proposition `A` | `p:P/k[:sig](w, t₁…tₖ) : Bool`; `p:A/0(w)` |
| holder `a` | `R:a : Mundo × Mundo → Bool` |

`[:sig]` appears when the arguments mix numbers and objects: a colon and
one letter per argument, R for number and O for object. Different signatures
are different symbols; the validator guarantees that a name is always used the
same way.

**Formulas.** T(φ, w) translates φ in world `w`:

| φ | T(φ, w) |
| --- | --- |
| ⊤, ⊥ | true, false |
| `t = u` | τ(t) = τ(u) |
| `t ∈ u` | pertence(w, τ(t), τ(u)) |
| `t < u`, `≤`, `>`, `≥` | Z3's comparison on the reals |
| `P(t₁…tₖ)` | `p:P/k[:sig](w, τ(t₁)…τ(tₖ))` |
| ¬φ, φ ∧ ψ, φ ∨ ψ, φ ⟹ ψ | Z3's own |
| φ ⟺ ψ | T(φ, w) = T(ψ, w) |
| □φ | ∀v:Mundo. T(φ, v) |
| ◇φ | ∃v:Mundo. T(φ, v) |
| B[a] φ | ∀v:Mundo. R:a(w, v) ⟹ T(φ, v) |
| ∀x φ, ∃x φ | ∀x:Obj, ∃x:Obj |
| ∀x∈ℝ φ, ∃x∈ℝ φ | ∀x:Real, ∃x:Real |
| ∀x∈ℤ φ | ∀x:Real. éInteiro(x) ⟹ T(φ, w) |
| ∃x∈ℤ φ | ∃x:Real. éInteiro(x) ∧ T(φ, w) |

(`éInteiro` = is-integer.) The expanded tree has no ≠, ∉, ⊆, ⋂, ⋃ or ∀x∈S: the expansion has already replaced them
(`gramatica-m2.md`, section 5).

**Terms.** τ(t) translates a term:

| t | τ(t) |
| --- | --- |
| bound variable | the quantifier's variable |
| `−t` | −τ(t) |
| `t + u`, `t − u`, `t · u`, `t / u` | +, −, ·, / of the reals |
| `t ^ k`, with `k` a written natural number, from 0 to 12 | 1 if k = 0; otherwise, τ(t) multiplied k times |
| `t ^ u`, in the other cases | Z3's real power |

**Assertions.** Each formula φ in the list goes in as T(φ, w0). Also going in are the
axiom for ∅, if ∅ appears, and, for each holder `a` that appears:

- serial: ∀p ∃q R:a(p, q);
- transitive: ∀p ∀q ∀r (R:a(p, q) ∧ R:a(q, r) ⟹ R:a(p, r));
- euclidean: ∀p ∀q ∀r (R:a(p, q) ∧ R:a(p, r) ⟹ R:a(q, r)).

## 4. Known limitations of t1

1. **Number only through the entry.** A free name without an entry, used where a number is asked for,
   is not in N. It is translated as `Obj`, and the translation fails: it gives an error, not a
   verdict. The validator does not reject these cases because the name's sort is
   unknown (`gramatica-m2.md`, section 4.3). A version t2 could take the
   sort from the use.
2. **Belief with a model.** With the KD45 axioms, Z3 sometimes does not decide a
   problem that has a model: it gives `unknown` in 20 s. Two examples show this
   ("titulares independentes", independent holders, and "crença e possibilidade", belief and possibility). Writing the
   serial axiom with a choice function (∀p R(p, s(p))) did not solve it. The finite engine
   finds these models, with 1 object and 2 worlds. When Z3 decides `unsat`, the
   answer holds for any size.
3. **Arithmetic.** Division by zero and power follow Z3's conventions.

## 5. Normative examples

`traducao-z3-t1-exemplos.json` has, for each example, the formulas, the entries, the
rule it isolates, Z3's verdict in the Caderno and, for those that do not use numbers, the
result of the finite engine (up to 8 objects and 3 worlds). The two engines
agree on every example: where Z3 says `unsat`, the finite engine finds no
model; where there is a finite model, Z3 does not say `unsat`.

## 6. The Caderno's environment

The Caderno runs **Z3 5.1.0.0**, in WebAssembly, through the `z3-solver` 5.2.0 package,
with a new context for each check and a 20 s time limit. The names of fresh
variables are counted from zero in each check, so the same list of
formulas always reaches Z3 with the same text, and the answer does not depend on what
ran before. The version is recorded in
`traducao-z3-t1-exemplos.json` (field `z3`), and the translation test fails if it
changes, so that a version change never goes through silently. An `unknown` may
change with the Z3 version, the platform and the time limit. A decided verdict must not
change. The independent audit of 2026-10-19, with native Z3 4.13.3,
reproduced the 42 verdicts.

## 7. Conformance

An independent translation conforms to the examples when:

1. on every example where the Caderno's Z3 decided, it does not decide the opposite (an
   `unknown` from it is not a divergence, but it is recorded);
2. on the examples where the Caderno's Z3 gave `unknown`, a `sat` from it is right, and
   an `unsat` is a failure (there is a finite model).

The strongest check that the semantics is preserved is to evaluate the formulas on
finite structures by another route (as the finite engine does) and cross it with
Z3's verdict: an `unsat` can never have a finite model.

The version is **t1**. A change in what a formula means to Z3 (or in the
Z3 version) changes the version, and the stored answers of the previous version
no longer count: their key starts with `h2:t1|`.

## 8. Independent audit

A second implementation, written from this file and from `gramatica-m2.md`,
with native Z3 4.13.3, was compared with the Caderno on 2026-10-19. In each blind
batch, one side received only the inputs, both stored their answers with SHA-256
before seeing the other's, and the comparison was made case by case.

| Set | Cases | Opposite verdicts (sat × unsat) | Differences | Finite engine |
| --- | --- | --- | --- | --- |
| normative examples | 42 | 0 | none | equal on the 27 without numbers |
| blind Z3 batch 1 | 300 | 0 | 7, all `unknown` | equal on the 68 without numbers |
| blind Z3 batch 2 | 300 | 0 | 8, all `unknown` | equal on the 195 without numbers |

Batch 2 covered functions and indexed names in 2 and 3 worlds, KD45 belief, indices
bound by a quantifier, numeric functions with a non-rigid argument and hidden
variables (E5). In it, the finite models were exchanged as certificates: the 90
from each side passed the other's check, without search (shape, the KD45 frame of
each holder and each formula in the real world).

The differential audit of t1 is closed. It does not prove that the two translations
agree on everything; it shows that, in these 642 cases, neither decided the opposite of the
other. An `unsat` is still Z3's word: the next step is the verifiable proof
(Alethe, checked by another program), tied to the formula, the expanded tree, the
version t1 and the problem sent to the solver. The first ones are in
`provas-t1/`: 28 of the 30 unsat examples have a proof; Z36 and Z40 are outside the
format.
