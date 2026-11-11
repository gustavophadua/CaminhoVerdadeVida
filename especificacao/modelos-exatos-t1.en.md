# Exact models — format modelo-exato-t1-v1

**Português:** [modelos-exatos-t1.md](modelos-exatos-t1.md). This is a translation; if the two differ, the Portuguese
text prevails. The JSON field names stay in Portuguese, as in the format.

This file defines the certificate of a `sat` with numbers: a model that can be
checked without search and without floating point. It applies together with `traducao-z3-t1.md`
(the semantics, section 2) and with `gramatica-m2.md` (the expanded tree). The `sat`
without numbers keep the finite model of blind Z3 batch 2
(`provas-t1/certificados.json`, field `modelo` without `formato`).

With numbers, the model is not finite: a function of a real argument has infinitely many
arguments, and √2 cannot be written with decimals. That is why the certificate gives each
function piecewise, with a default value, and the numbers as rationals or as
elements of a field Q(α).

## 1. The certificate

A JSON object with these fields, and only these (an unknown field is rejected):

| Field | Content |
| --- | --- |
| `formato` | `"modelo-exato-t1-v1"` |
| `objetos` | non-empty list of distinct names (objects) |
| `mundos` | non-empty list of distinct names (worlds) |
| `mundoReal` | one of the worlds (the real world) |
| `algebrico` | optional: the number α (section 2) |
| `constantesObjeto` | name → object, for each constant outside N free in the formulas (including the name of an index that no quantifier binds), and `"∅"` when ∅ appears |
| `constantesReais` | name → number, for each constant in N |
| `funcoesObjeto` | `"name/arity"` → cases per world (section 3), for each function outside N |
| `funcoesReais` | `"name/arity"` → rigid cases (section 3), for each function in N |
| `predicados` | `"name/arity"` → cases per world, with values `true` and `false` |
| `pertence` | list of triples `[world, x, y]`: x ∈ y in that world; the others are false |
| `acessos` | holder → list of pairs `[w, v]` of the relation, for each holder of B[·] |
| `divZero` | D0, division by zero (section 3); required when some formula has `/` |
| `testemunhas` | list: one witness for each ∃ over ℝ or ℤ of positive polarity (section 4); `[]` if there are none |

Symbols the formulas do not use are ignored.

## 2. Numbers

A number is written in one of these ways:

- a rational: `-?d+`, `-?d+/d+` (denominator greater than zero) or `-?d+.d+`, such as
  `"2"`, `"-3/2"`, `"0.5"`;
- `"alpha"`, the number α;
- `{"coeficientes": [a₀, a₁, …]}`, the number a₀ + a₁·α + a₂·α² + …, with each aᵢ
  a written rational; without `algebrico`, with one coefficient only.

The `algebrico` field defines α:

- `polinomio`: the integer coefficients, in increasing degree (`[-2, 0, 1]` is
  x² − 2), JSON integers with absolute value up to 2⁵³ − 1, degree 1 or more, positive
  leading coefficient, primitive (gcd 1) and **irreducible** over Q;
- `intervaloAberto`: two written rationals `[a, b]`, with a < b, p(a) ≠ 0,
  p(b) ≠ 0 and **exactly one** real root of p in (a, b), counted by the Sturm
  sequence. α is that root;
- `indiceDaRaiz`: optional; if present, it must be 1 plus the number of real roots
  of p smaller than a (1 is the smallest, as in Z3's `root-obj`).

With p irreducible, Q(α) = Q[x]/(p) is a field: the arithmetic is that of polynomials
modulo p, a number is zero only if the reduced polynomial is zero, and the sign is
decided by halving α's interval until the number has no root in it.

## 3. Functions, predicates and D0

**Cases per world** (object functions and predicates, which change with the world):
`{"padrao": v, "porMundo": {world: v}, "excecoes": [{"mundo": w, "argumentos":
[…], "valor": v}]}`, with `porMundo` and `excecoes` optional. The value at (w,
arguments) is that of the exception with that world and those arguments; if there is none, that of
`porMundo[w]`; if there is none, the default (`padrao`). Every exception states the world.

**Rigid cases** (functions in N, which do not change with the world): `{"padrao": v,
"excecoes": [{"argumentos": […], "valor": v}]}`; no exception states a world.

Each argument is the name of an object or a number, according to the sort of the argument
in the formulas. Two exceptions with the same world and equal arguments are rejected;
numbers are compared as numbers (`"2"` and `"4/2"` are equal).

**D0**: `{"padrao": v, "excecoes": [{"numerador": n, "valor": v}]}`. By section
2 of `traducao-z3-t1.md`, dividing by zero gives a number that depends only on the
numerator: x / 0 = D0(x). Two equal numerators are rejected.

## 4. Witnesses and polarity

The polarity of a subformula is positive at the top; ¬ and the left side of ⟹
invert it; inside ⟺ it is both; ∧, ∨, the right side of ⟹, □, ◇, B[·] and the
quantifiers keep it.

- An **∃x∈ℝ** or **∃x∈ℤ** is only accepted in positive polarity, and it carries a
  witness: `{"formula": i, "variavel": "x", "valor": number}`, with `i` the
  index of the formula starting from 0. Among those ∃, each formula has each
  variable name only once. In an ∃x∈ℤ, the value is an integer.
- A **∀ over ℝ or ℤ** is rejected, and so is an ∃ over ℝ or ℤ in negative
  polarity or inside ⟺.
- The shape of the formula decides, before evaluating: a ∀ over ℝ in a branch that
  evaluation would not visit is also rejected. That way the answer does not depend on the
  order of evaluation.
- The list of witnesses has exactly one for each accepted ∃: no more, no
  fewer.

Why only the positive one: replacing ∃x φ with φ(t) gives a formula that implies the
original, and in a positive position that is enough (if the whole holds with φ(t), it holds with
∃x φ). Under ¬, the ∃ becomes a ∀, and a ∀ over ℝ cannot be checked with a single
point: ¬∃x∈ℝ x = 1, with the witness x = 0, would give true, and the formula is false
in every model. A single witness, under ∀ over objects, □ or B[·],
remains correct; it only leaves out the models that would need one witness
per object or per world.

## 5. The check

The certificate is accepted when the shape is right (sections 1 to 4), the frame of
each holder is KD45 (serial, transitive and euclidean, in all worlds),
no triple in `pertence` has as y the object for ∅, and each formula, in the
expanded tree, holds in the real world by the t1 semantics:

| In the tree | Value |
| --- | --- |
| `t = u` | the same object, or the same number; between an object and a number, rejected |
| `t ∈ u` | the triple is in `pertence` (between objects) |
| `<`, `≤`, `>`, `≥` | the comparison of the numbers, exact |
| `t / u` | t · u⁻¹ if u ≠ 0; D0(t) if u = 0 |
| `t ^ k` | only with k a written natural from 0 to 12: t multiplied k times (1 if k = 0); any other power is rejected |
| □, ◇ | all worlds, some world |
| B[a] φ | φ in every v with `[w, v]` in a's accesses |
| ∀x φ, ∃x φ | all objects, some object |
| ∃x∈ℝ φ, ∃x∈ℤ φ | φ with x taking the witness's value |

∅ is an object (that of `constantesObjeto["∅"]`): ∀x (x ≠ ∅) is false, because x can
be ∅. There is no search at all.

## 6. Limits of v1

1. Only one α per certificate. A model with √2 and √3 would need a primitive
   element, or another version.
2. ∀ over ℝ or ℤ cannot be certified: it calls for a symbolic proof, not a model.
3. One constant witness per ∃; a witness that changes with the object or with
   the world is left for another version.
4. Only the power with a written natural exponent, which translation t1 does by
   multiplication.
5. The Caderno's check decides irreducibility up to degree 3 (in degree 3,
   by searching for a rational root, with coefficients of absolute value up to 10⁶) and rejects
   above that. Another check can go further; the rule of the format is the same.
6. The certificate shows that there is a model; it does not say that it is the smallest.

## 7. Where they are

The five `sat` with numbers in the normative examples (Z07, Z08, Z33, Z35 and Z39)
have the exact model in `provas-t1/certificados.json`, from version c3 on. The
Caderno takes it from Z3's model (`src/motor/z3Modelo.ts`): before the query,
each ∃ over ℝ or ℤ of positive polarity becomes a new constant, and Z3's model
gives the functions piecewise; the `root-obj` becomes the polynomial and an isolating
interval, and Z3 itself checks that its value is in the interval. The
Caderno's check (`src/motor/modeloExato.ts`) is tested in
`testes/modelos-exatos.test.ts`, with the counterexamples from section 4 and from round
31.

In round 31, the models were crossed with GPT's independent
implementation (the numeric evaluator from round 30, written from this specification alone, in
the experimental format that preceded it): it accepted the Caderno's five, and the
Caderno's check accepted its five. Two correctness defects were found in it
(the witness used in any polarity, and ∅ outside the domain of
objects), which this format rejects, and one fragility (an `assert` that `python -O`
removes). Fixed, in the Phase 2 package, it is in the public verifier
(`provas-t1/independente/avaliador_kripke_numerico_v1.py`): it accepts the five and
rejects their tampered copies.
