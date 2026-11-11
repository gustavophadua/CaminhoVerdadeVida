# Certificates of the t1 examples — version c3

**Português:** [README.md](README.md). This is a translation; if the two differ, the Portuguese text prevails.

This folder keeps, for the 42 normative examples of translation t1
(`../traducao-z3-t1-exemplos.json`), the exact problem that the Caderno sends to Z3;
for the unsats, a step-by-step proof in the Alethe format; for the sats without
numbers, a finite model; and for the sats with numbers, an exact model
(`../modelos-exatos-t1.md`). Other programs check the proofs and the models
without trusting any solver and without searching.

| File | What it is |
| --- | --- |
| `problemas/Zxx.smt2` | The problem in SMT-LIB 2: the declarations and assertions that translation t1 produces (the function `problemaSmt` in `src/motor/z3.ts`), with the example's formulas in a comment at the top |
| `provas/Zxx.alethe` | cvc5's Alethe proof for that problem, only the commands (the `unsat` line and the outer parentheses were removed) |
| `regras.rare` | The 17 rewrite rules (RARE) that the proofs use, copied from Carcara (with a single change of notation, noted at the top of the file) |
| `certificados.json` | The record: for each example, formulas, entries, expanded trees, translation version, Z3's verdict, problem and proof, with SHA-256, and the model of each sat |
| `conferir.py` | The verifier: checks the proofs with Carcara, tampers with each proof in seven ways, runs the adversarial cases and checks the link between the formula and the problem |
| `vinculo.py` | The part of the verifier that rebuilds the problem from the formulas and compares it with the certificate's |
| `modelos.py` | The part of the verifier that checks the models of the sats, finite and exact, with the independent check |
| `registros.py` | The part of the verifier that checks the example records of the open format (`../registros-v1/`) and blind batch 1 (`../registros-v1/lote-cego-1/`), with the independent reading and translation and Carcara, and that also runs GPT's record reader |
| `requisitos.txt` | SymPy and mpmath, with pinned version and hash, for the independent check of the exact models |
| `independente/` | The independent implementation, written by GPT from the specification alone, unchanged: the m2 reader, translation t1, the model checks (finite and exact) and the record reader |
| `adversarios/` | Satisfiable problems with false "proofs" written by hand, and a certificate with swapped formulas, which the verifier must reject |

## What belongs to the verifier and what belongs to the certificate

Whoever issues a certificate does not choose the axioms or the translation with which it will
be checked. The verifier is `conferir.py` and `vinculo.py`, Carcara (at a fixed
commit, compiled by a fixed version of Rust), the file `regras.rare`,
whose SHA-256 is written in `conferir.py` itself (`REGRAS_CONFIADAS_SHA256`), and
the independent implementation in the `independente/` folder, with the SHA-256 of each
file written in `vinculo.py`. The certificate is the formulas, the problem, the
proof and the record. If a package brought another rules file, with a
false rule and the hash updated in the record, the verifier would reject it, because
it compares the file with its own hash, not with the package's. Changing a rule or the
translation requires changing the verifier, and that change is reviewed.

## The certificate

An unsat certificate ties together four things, and each link is checked by a
different path:

1. **the formula to the expanded tree**, by the m2 grammar, which two independent
   readers read the same way (blind batches of 750 and 1,000 cases);
2. **the formula to the SMT problem**, by translation t1. The verifier rebuilds the
   problem from the formulas with the independent implementation (see "The
   link between the formula and the problem", below), and `testes/provas-t1.test.ts`
   rebuilds the exact text with the Caderno's code. The audit of t1 is in section 8
   of `../traducao-z3-t1.md`;
3. **the problem to the proof**, by Carcara, which checks each step;
4. **the proof to the rule of each step**, by the Alethe rules and the file
   `regras.rare`.

## How the proofs were made

With cvc5 1.4.2 (`cvc5-Win64-x86_64-static.zip`, SHA-256
`9055de9b724724890ba5a19cfdc98f68a8c0653284afa843096dec432a0f88c3`, from cvc5's
GitHub) and the options

```
--dump-proofs --proof-format-mode=alethe --proof-granularity=dsl-rewrite
--proof-alethe-res-pivots --simplification=none --dag-thresh=0 --tlimit=20000
```

plus `--enum-inst` on Z16, Z20, Z21 and Z24, which cvc5 does not decide in
20 s without it. No proof has a `hole` or `trust` step. Each one also passed
cvc5's internal check (`--check-proofs`), which does not count as
independent.

## Result on the 42 examples

| Z3's verdict | Examples | Certificate |
| --- | --- | --- |
| unsat | 28 | Alethe proof |
| unsat | Z36 (power on the right) | **None.** The translation uses Z3's real power (`^`), which Alethe does not have |
| unsat | Z40 (division by zero) | **None.** cvc5 solves it with an internal symbol (`div_by_zero`) that Alethe does not write |
| sat | Z02, Z03, Z04, Z14, Z15 (without numbers) | Finite model, from the Caderno's engine, in the format of blind Z3 batch 2 |
| sat | Z07, Z08, Z33, Z35, Z39 (with numbers) | Exact model, taken from Z3's model, in the format modelo-exato-t1-v1 (in Z33, n = −√2, the root of x² − 2 in (−3/2, −1)) |
| unknown | Z19, Z22 | None. cvc5 with `--finite-model-find` gives sat on both |

Z36 and Z40 are unsat by the solvers' word (Z3 and cvc5 agree),
but they are outside the certificate format.

## The independent check

The workflow `../../.github/workflows/conferir-provas.yml` runs on a GitHub
machine on every change in this folder. It compiles the development version of
Carcara, at the fixed commit `20bf49c5ce31089ac83118574c888669355aaae1`,
with Rust 1.99.1 on an `ubuntu-24.04` machine (all three fixed: the same commit
compiled by another Rust, or on another system, is not the same build), and runs
`conferir.py`, which

- checks the SHA-256 of each file against the record;
- runs, for each proof,
  `carcara check --allow-int-real-subtyping --expand-let-bindings --rare-file regras.rare provas/Zxx.alethe problemas/Zxx.smt2`
  in both modes, each on its own: resolution checked by the pivots that
  cvc5 gives at each step, and with `--rup-resolution`, which checks each resolution
  by unit propagation, without depending on the pivots. Both modes are
  sound; the workflow requires `valid` in at least one, and the report shows both
  for each proof;
- tampers with each proof in up to seven ways, one at a time, and Carcara has to
  reject all of them, in both modes (see below). The report says where each
  rejection came from, in the mode in which the original proof passes;
- runs the cases in `adversarios/`, which must also be rejected.

### The tamperings

Each tampering changes a single thing and leaves the proof well written, so that the rejection
comes from the logic and not from the form. The report says where each rejection came from: from
reading (a step cited outside its scope, a wrong type, or another reading
error), from the rule of a step (and which), or from the lack of the empty clause at the end.

| Tampering | What it tests |
| --- | --- |
| one literal negated | the conclusion of a step swapped for another |
| one literal removed from a resolution | a clause stronger than the resolution gives, like concluding q from p ∨ q and ¬p ∨ r |
| a premise swapped for an earlier step visible in the same scope | a wrong inference with premises that are available |
| a premise swapped for a step from an already closed subproof | scope discipline |
| the rule of a step swapped for `false`, without premises or arguments | a rule that does not justify the conclusion |
| the conclusion of a `rare_rewrite` (= L R) swapped for (= L L) | a true equality that is not an instance of the rule |
| an assumption swapped for its negation | the link between the proof and the problem |

Left out are the tamperings that would leave the step correct, because then accepting would not
be an error:

- in a resolution, the tampered step that still follows from the premises by
  unit propagation, the criterion of the second mode. This catches, for example,
  removing one of two copies of the same literal, negating one of two copies (the
  clause becomes X ∨ ¬X) or swapping a premise for another that also gives the
  conclusion;
- the premise swapped for a step with the same clause, disregarding the order of the
  literals and that of the sides of equalities, which `trans`, `cong` and Carcara's check
  of assumptions do not distinguish;
- the steps that the `false` rule would prove;
- the `rare_rewrite`s in which L and R differ only in the order of the sides of
  equalities: there (= L L) is the instance itself up to that order, and accepting
  would not be an error.

The unit propagation of this filter copies Carcara's (the function `rup` in
`src/checker/rules/resolution.rs`, at the fixed commit): it compares the literals without
the outer negations and uses only the premises of the step. The filter only chooses the
tamperings; it checks no proof. Swapping a premise for a step of a closed
subproof has no filter: using a step outside its scope is an error
even if the clause closes the account.

### The adversarial cases

| Case | The attack |
| --- | --- |
| `rup-resolvente-falso` | from p ∨ q and ¬p ∨ r, conclude q (the right resolvent is q ∨ r) |
| `rare-tipo-errado` | apply `arith-leq-norm`, which only holds for integers, to two reals |
| `forall-inst-errado` | instantiate a ∀ and drop its condition |
| `premissa-fora-do-problema` | assume a formula that is not in the problem |
| `regra-fora-do-arquivo-confiado` | bring a false rule (p = true) in a rules file of the certificate itself (`atacante.rare`) |

The five problems are satisfiable (cvc5 checks), so accepting any
of these "proofs" would be an error of the verifier. In the last one, the report also shows
what would happen if the verifier used the attacker's rules file.

### The link between the formula and the problem

A proof holds for the problem it proves. To hold for the formula, the
problem has to be the translation of the formula, and a hash does not guarantee that: whoever
issues the certificate computes whatever hashes they like. That is why the verifier rebuilds the
problem of each certificate from the formulas and the entries, with the
independent implementation in the `independente/` folder (the m2 reader and
translation t1 that GPT wrote from the specification alone), and compares it with the
certificate's problem.

Before comparing, each problem has to be in the t1 profile: only the commands,
sorts and built-in operators that the translation emits, only names declared in the
pattern of section 3 (`c:`, `n:`, `f:`, `fn:`, `p:`, `R:`, `pertence`, `w0`),
no bound variable hiding another symbol, the commands in the t1 order
(one `(set-logic ALL)`, the sorts, the declarations, the assertions and, if there is one, a
`(check-sat)` at the end) and each term well typed: each application with the right arity and
sorts, and every assertion `Bool`. Without this, the comparison would be fooled. GPT
showed three pairs of problems with different meanings that earlier versions
treated as equal: in round 28, two that declared functions called `and` and
`-`, which the comparator treated as conjunction and negation; in round 29, one with
the `(check-sat)` before an assertion, which the query does not see, while the
comparison looked at the whole set. In round 30, it noticed that the profile did not
check types: `(and |c:a| true)`, with `c:a` an object, went through. The three pairs
and the ill-typed problem are in `adversarios/comparador/`, and the verifier
requires them to be rejected. `conferir.py` also refuses to run with
`python -O`, which removes the `assert`s with which the independent check rejects. In
real use there was no gap (the rebuilt translation never declares these names, and
Carcara checks the proof against all the assertions of the problem), but the comparison
has to hold on its own. While building blind batch 1 of records, one more appeared: a
problem with an extra `)`, which closes the root in the middle, broke the link's reader
(`IndexError`) and brought down the whole check. Now the reader rejects the
unmatched parenthesis, a problem that cannot be read, in any way, comes out as
different (the comparison fails closed), and the control
`adversarios/comparador/parentese-a-mais-recusar.smt2` stays so that this does not
come back. The Caderno's check (`src/motor/vinculo.ts`) uses the same
comparison.

The comparison is structural and ignores only what does not change the meaning: comments,
`(set-logic)` and `(check-sat)`, the bars around symbols, the names of the
bound variables, `let`s, the way a number is written (`2` and `2.0`), nested `and`
and `or`, the order of the declarations and of the assertions, and the declarations that
no assertion uses. Each symbol enters by its base name and its signature,
because section 3 of `../traducao-z3-t1.md` says that the names in Z3 are
informative and that what counts is the type of each symbol and whether it receives the
world. So `c:n` and `n:n`, both `Real`, are the same symbol, and P(a) is still
different from P(b).

The link is also attacked:

| Attack | What must happen |
| --- | --- |
| The formula with an operator swapped for its dual (□ and ◇, ∀ and ∃, ∧ and ∨), or negated, if there is none of them | Rejected, on the 42 certificates |
| The formulas of another example, with this one's problem and proof | Rejected, on the 42 × 41 pairs |
| `adversarios/vinculo-trocado.json`: the formulas P(a) and ¬□P(a), which have a model, with the problem and the true proof of Z09, which are for P(a) and ¬◇P(a) | The proof passes Carcara, and the link rejects it |
| `adversarios/comparador/`: GPT's three pairs, with declared functions called `and` and `-`, and with a `(check-sat)` in the middle; an ill-typed problem; and one with an extra `)` | The comparator rejects all five |

A finding of the comparison: the specification says that the `[:sig]` suffix appears
when the arguments mix numbers and objects, and that is how the independent
implementation writes it. The Caderno also adds it when all the arguments of a
predicate are numbers (in Z08, `p:Q/1:R`) and when all the arguments of a
numeric function are objects. The two also name numeric constants
differently (`n:n` in the Caderno, `c:n` in the other). Since the names are
informative, none of this changes the meaning.

### The models of the sats

The certificate of a sat is a model: the objects, the worlds, the complete tables
of the functions, the true predicates, membership and the accesses of each holder
(the format is in `src/motor/certificadoModelo.ts`). The checker does no search
at all: it checks the shape, the tables, the KD45 frame of each holder and whether each
formula holds in the real world.

The models come from the Caderno's finite engine and are checked by two
implementations: the Caderno's, in `testes/provas-t1.test.ts`, and the independent one
(`independente/verificar_certificados_sem_z3.py`), in `modelos.py`. Both
checks are also attacked: each model must be rejected with the first
formula negated, because the model of F does not satisfy ¬F; and the independent
verifier must also reject a function table missing a line and a
belief frame without the accesses of the real world. The model of one example with the
formulas of another does not serve as an attack, because one model may hold for
both: Z04's holds for Z14.

For sats with numbers the model is not finite: a function of a real argument has
infinitely many arguments, and √2 cannot be written with decimals. The certificate is then an
exact model (`../modelos-exatos-t1.md`): functions piecewise, with a default
value; numbers as rationals or in Q(α), with α given by an irreducible
polynomial and an interval with a single root (by Sturm); division by zero as
a function D0 of the numerator; and a witness for each ∃ over ℝ or ℤ of
positive polarity. The Caderno takes it from Z3's model (`src/motor/z3Modelo.ts`)
and checks it in `testes/modelos-exatos.test.ts` and `testes/provas-t1.test.ts`. In
round 31, GPT's numeric evaluator (round 30) accepted the Caderno's five,
and the Caderno's check accepted its five; but GPT's evaluator had
three defects (the witness used under ¬, ∅ outside the objects, and an `assert`
that `python -O` removes). Fixed (`independente/avaliador_kripke_numerico_v1.py`,
from the Phase 2 package), it is in `modelos.py`: it accepts the five and rejects their
tamperings (the first formula negated, α in an interval without a root, the witness
swapped and D0 swapped). In the workflow, it runs with the SymPy from `requisitos.txt`. Blind
batch 1 of records found one more defect in it: without α, a true order comparison
gave SymPy's `BooleanTrue`, which did not pass the `res is True`
at the end, and right models were rejected (with n = 3, n > 2 came out false). The defect
only rejected too much. GPT fixed it in round 35, with two lines, and that is the
version here.

### Blind batch 1 of records

Step 8 of `conferir.py` checks the 62 records of
`../registros-v1/lote-cego-1/`, already revealed. Each one has to give, in the
verifier's reader and in GPT's reader, the answer the Caderno recorded before
GPT's answers (`caderno.json`, the commitment). For the pending ones, which only had the
proof left to check, Carcara has to give what the commitment predicted. The folder's README
tells the protocol and the result.

The result comes out in annotations on the page of each run, in the Actions tab, which
anyone can see without logging in (the full log only opens for administrators).

**The first round** used commit `394edbb15ba95c47893f1d821fddde7e016af178`,
the one that cvc5 1.4.2's script `contrib/get-carcara-checker` indicates (the fork from
which the script downloaded was merged into `ufmg-smite/carcara`). It gave `valid`
on 26 of the 28 proofs. Z34 and Z37 were rejected for using two nonlinear
arithmetic rules that this version does not know (`la_mult_sign` and
`la_mult_abs_comparison`); the development version knows both. Of the 84
tamperings, 83 were rejected. The accepted one was not a tampering: the `bind` rule of a
step concluding `(= t t)` had been swapped for `refl`, which also proves
that, and the proof was still right. Since then the rule of a step is swapped
for `false`, which only proves `(cl (not false))`, and those steps are left out.

**The second round**, already with commit `20bf49c`, gave `valid` on 27 of the 28
proofs, and the 84 tamperings were rejected. Z34 (root of 2 in the integers) was
rejected at a resolution step (`t423.t8`): the pivot that cvc5 indicates, a
literal with a `choice` term it created for a quantifier, was not
found in the premise's clause. Hence the second mode, by unit propagation,
which does not depend on the pivots.

**The third round** (commit `61c602c`) gave `valid` on the 28 proofs, 27 by the
pivots and Z34 by RUP, and the 84 tamperings of the time were rejected. An
independent audit of these tamperings showed that they tested form more than
logic: 11 of the 28 swapped premises pointed to later steps, the
rules swapped for `false` kept premises and arguments, and no tampering
attacked a `rare_rewrite`. The tamperings were redone as above, and the
adversarial cases came in.

**The fourth round** (commit `3ed62b5`, the first with the seven tamperings) gave
`valid` on the 28 proofs, 27 by the pivots and all 28 by RUP alone; the 176 tamperings
and the 5 adversarial cases were rejected, and with the attacker's rules file
the false proof went through. The classes of the rejections came out incomplete: Carcara's
command line writes reading errors without a prefix, and puts the step and the
rule at the end of the message, which was cut before being classified. The
classification now uses the whole message, and the machine's system was
pinned.

## The RARE rules

Each rule in `regras.rare` is an axiom for Carcara: it checks that the step
is an instance of the rule, not that the rule holds. That is why the file carries only the 17
the proofs use, and each one is a simple identity that can be checked by hand,
like ¬¬t = t or (t ⟹ s) = (¬t ∨ s). Carcara's full file has rules that
its own authors mark as not necessarily valid, like x/0 = 0, which
contradicts t1 (in it, x/0 is some number that depends only on x). None of them
goes in here. The only change relative to Carcara's file is one of notation: in
`or-not-refl`, the type parameter declared `T0` and used as `@T0` is now
declared `@T0`, as in the other rules. Version 394edbb accepts both
forms, but the code that accepts the first is not in the development
version.

## The second checker (CPC, through Ethos)

The 28 problems with an Alethe proof are also checked by another proof, in
another format, in another checker (`scripts/conferir-cpc.py`, the
segundo-conferidor part of the public verifier). cvc5 1.4.2 generates, for each
problem, a proof in the CPC format (with `--enum-inst` on the same four), and
Ethos 0.2.5 checks it against the Eunoia signature of CPC published with cvc5
1.4.2: Ethos is the checker that cvc5 1.4.2 indicates (commit `08e4aa4`, the
0.2.5 release), the official binary with a pinned SHA-256, and the signature is pinned
by the hash of the `proofs/eo/cpc` tree (51 files). The rules of this signature
are verified in Lean by the Logos project, from the same group.

- The proof has to end in false (`--require-proof-of-false`), and each
  of its assumptions has to be an assertion of the published problem (Ethos's
  reference), read once with the SHA-256 of the record.
- Only `correct` counts: an `incomplete` proof (with the `trust` rule, without
  formal justification) is a failure.
- Two tamperings per proof: without the last step, and with a problem without the
  assertions. Both must be rejected.

Result of 2026-10-27: **28 of 28 `correct`**, none incomplete, 56
tamperings rejected. Ethos is a different code base from Carcara's and reads another
format; what the two have in common is cvc5, which generates both proofs. A
wrong proof from cvc5 is rejected by the checkers; the common cvc5 only matters when
it cannot prove, not for accepting what does not hold.

### Layer 4: Logos, with correctness proved in Lean

The same CPC proof also goes through Logos, a checker written in Lean whose
correctness is a theorem in Lean (`correct___logos_check_proof`): `correct` means
that the conjunction of the proof's assumptions is unsatisfiable by the semantics
of SMT-LIB formalized in Lean (`Cpc/SmtModel.lean`). It is the commit that cvc5
1.4.2 indicates (`contrib/get-logos-checker`, `a4ab2f8`), compiled in CI with
Lean 4.34.0 from its `lean-toolchain` (official binary, pinned SHA-256).

- Logos ignores the reference to the problem; that is why cvc5 prints the proof
  twice, with the reference (for Ethos) and with the declarations (for
  Logos), and the script requires both to have the same steps and the same
  assumptions. The assumptions Logos reads are the ones Ethos tied to the problem.
- `incomplete` in Logos means that the proof is outside the fragment the
  theorem covers; it is listed separately. `incorrect` or an error on a proof that Ethos
  accepted is a failure.
- One tampering per proof (without the last step), which must be rejected.

Result of 2026-10-27: **28 of 28 `correct`** by Logos, none outside the
fragment, 28 tamperings rejected.

Limits: the executable is compiled here, but the whole of Logos's correctness proofs
take Lean more than two hours to check and are not compiled
in this CI (nor in Logos's, which compiles a sample); the trust in them comes from the
project. The Logos repository has no license file: it is only compiled
and run in CI for checking, without redistribution.

## What this does not prove

- The proof holds for the SMT problem. The link with the formula is translation t1, which the
  verifier rebuilds on every run with a second implementation. Both
  were written by AIs, from different sides and from the specification alone, and
  neither was proved correct: an error that both make the same way gets through.
- Carcara is also a program, and the RARE rules enter it as axioms.
- Z36 and Z40 remain without a certificate.
- The exact models depend on SymPy, which enters the trusted base along with
  the evaluator. The inconsistent theory is checked in the records of the open format
  (`../registros-v1.md`), which separate premises and conclusion; in the 42 examples,
  which are only sets of formulas, it does not apply.
