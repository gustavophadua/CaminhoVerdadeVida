# Records — format registro-v1

**Português:** [registros-v1.md](registros-v1.md). This is a translation; if the two differ, the Portuguese text
prevails. Field names and field values (such as `segue`, `contradiz`, `aberto`, `fechado`) are part of the format and
stay in Portuguese.

The record is the unit of the open format (Phase 2 of the plan): a claim
about a formula and a theory, with what is known about it and with the certificate that
checks it. This file applies together with `gramatica-m2.md` (the reading and the expanded
tree), `traducao-z3-t1.md` (the semantics and the translation),
`modelos-exatos-t1.md` (the model with numbers) and `provas-t1/README.md` (the link
between the formula and the problem, and the checking of the proofs). The normative examples,
valid and invalid, are in `registros-v1/exemplos.json`.

## 1. The claims

Let T be the theory (the premises) and φ the formula of the record.

| `afirmacao` | Means | The certificate carries |
| --- | --- | --- |
| `segue` (follows) | T ⊢ φ: the premises and ¬φ have no model | the refutation of T ∪ {¬φ}, and a model of T |
| `contradiz` (contradicts) | T ⊢ ¬φ: the premises and φ have no model | the refutation of T ∪ {φ}, and a model of T |
| `nao-segue` (does not follow) | T ⊬ φ | a model of T ∪ {¬φ} |
| `consistente` (consistent) | T and φ have a model together | a model of T ∪ {φ} |

**The inconsistent theory.** If T has no model, every formula follows from T, and a
`segue` says nothing. That is why a `segue` or a `contradiz` carries a model of T,
which shows that T has a model. The alternative is the `vazio` (empty) mark: the proof that T,
on its own, has no model, and then the record says that and nothing more. A record
that carries neither is rejected (R12). With T without premises, the model of
T is not asked for: the empty set has a model.

## 2. The fields

The record is a JSON object with these fields, and only these, with no repeated key in
any object: JSON readers disagree on which value of a repeated
key is kept, and two checks would read different records (R1). For the same
reason, every number in the JSON is an integer, written without a point and without an exponent (`1`, and
not `1.0` or `1e0`): one reader reads `1.0` as the integer 1, and another as a fraction
(R1). `NaN` and `Infinity` are not JSON. The situation
`aberto` (open)
shows everything; `fechado` (sealed) hides the formula, the premises and the certificate, and
keeps only the commitment (section 4) until the person reveals it.

| Field | Content | When sealed |
| --- | --- | --- |
| `formato` | `"registro-v1"` | same |
| `situacao` | `"aberto"` or `"fechado"` | same |
| `afirmacao` | `segue`, `contradiz`, `nao-segue` or `consistente` | same |
| `formula` | the text of φ, in m2 | absent |
| `formaCanonica` | the canonical form of φ (section 3) | absent |
| `teoria` | `{"nome", "fichas", "premissas", "hash"}` (section 3) | only `nome` and `hash` |
| `tipo` | `axioma matemático`, `observação`, `hipótese`, `definição`, `norma` or `teorema` | same |
| `dominio` | where the claim holds, in a non-empty text that the check does not interpret | same |
| `estado` | `proposta`, `corroborada`, `contestada`, `refutada` or `sem avaliação` | same |
| `semantica` | `{"gramatica": "m2", "traducao": "t1"}` | same |
| `autor` | the SHA-256 of the publisher's public key, in 64 lowercase hexadecimal digits | same |
| `compromisso` | `{"hash", "sal"}` (section 4) | only `hash` |
| `certificado` | section 5 | absent |

- `tipo` (type) says what the formula is: a mathematical axiom, an observation, a
  hypothesis, a definition, a norm, or a theorem, which is what follows from the
  theory. `teorema` goes with `segue`, and `segue` goes with `teorema`; anything else is
  rejected (R3).
- `estado` (state: proposed, corroborated, contested, refuted, not evaluated) is what the author declares. A change of
  state through contesting belongs to Phase 4.
- `teoria.nome` is a non-empty text, such as "Principia v1". The name is a label:
  it stays out of the hash.
- `teoria.fichas` is the theory's dictionary, with the entries of section 4.1 of
  `gramatica-m2.md`. Each entry has only `simbolo`, `tipo` (`constante`, `funcao`
  or `predicado`), `aridade` (an integer: 0 for a constant, 1 or more for a function, 0 or
  more for a predicate, and the one of arity 0 is a proposition), and, when they apply,
  `numerico` (true or false, for a constant and a function) and `argumentos` (`num` and
  `obj`, one per argument, for a function and a predicate). There are no two entries with the
  same symbol. The premises and the formula are read with this dictionary.
- `teoria.premissas` is the list of the texts of the premises, in m2, possibly empty.
- In Phase 3, `autor` comes to be checked by a signature; here only its
  spelling is checked.

## 3. The canonical form and the hash of the theory

**Canonical form** of a formula: the expanded tree (section 5 of
`gramatica-m2.md`), written as in section 6, with each bound variable replaced
by `#1`, `#2`, …, in the order in which its quantifier appears in the writing, from
left to right. The domain of `∃x∈D` is read outside the quantifier and does not
change name because of it. So `∀y (P(y) ⟹ Q(y))` and `∀x (P(x) ⟹ Q(x))` have the
same canonical form, `(∀ #1 (⟹ (P #1) (Q #1)))`.

**Entry line**: `ficha <simbolo> <tipo> <aridade> <n> <a>`, separated by one
space, with `<n>` equal to `numerico` if the entry says `"numerico": true`, or `-`; and
`<a>` equal to the arguments separated by commas, or `-`. Example:
`ficha g funcao 2 - num,obj`.

**Text of the theory**: the line `teoria-v1`; then the entry lines of the
dictionary; then a line `premissa <canonical form>` for each premise, without
repetition. The entry lines and the premise lines go, each group, in code point
order, and each line ends in `\n` (LF). The **hash of the theory** is the SHA-256
of the text in UTF-8, in lowercase hexadecimal. It depends neither on the order nor on the
repetition of the premises, nor on the names of the bound variables.

**Text of the formula**: the line `formula-v1`; the entry lines of the dictionary,
in the same order; and the line `formula <canonical form>`, each one ending in
`\n`.

## 4. The commitment

The salt has 32 random bytes, written as 64 lowercase hexadecimal digits.
The commitment is the SHA-256 of the 32 bytes of the salt followed by the text of the formula from
section 3 in UTF-8 (the lines `formula-v1`, the entry lines and the `formula` line, not the
`formula` field), in lowercase hexadecimal. In an open record, the salt comes along, and the
check redoes the computation (R7). In a sealed one, only the hash comes: the formula stays
hidden, and the hash later proves that it already existed. A hash without a salt does not
hide a short sentence, which can be found by trying sentences.

## 5. The certificate

A **file** is `{"arquivo": path, "sha256": hash}`. The path is relative to the
root of the set of records (in the examples, the folder of `exemplos.json`), with
`/`, with no empty segment, `.` or `..`, and does not leave the root, not even through a symbolic
link. What counts is the SHA-256 of the file's bytes (R8). The checker reads
each file **only once**: the hash, the comparison with translation t1 and
Carcara use these same bytes, and Carcara receives them in a copy, in a folder
created only for that check. Swapping the file after the hash does not change
what is checked; swapping it before gives R8 (CP04, `scripts/testar-cp04.py`).

The **set** that the certificate checks is the list of the premises, in the order of the
record, followed by ¬(φ) for `segue` and `nao-segue`, or φ for `contradiz` and
`consistente`. The set of the premises is just the list of the premises. In an exact
model, the `formula` index in the witnesses counts within this list.

| Certificate field | Content |
| --- | --- |
| `refutacao` | `{"problema": file, "prova": file}`: the SMT-LIB problem that translation t1 sends to Z3 for the set, and an Alethe proof that it has no model |
| `modeloDasPremissas` | a model of the set of the premises |
| `vazio` | `{"problema": file, "prova": file}`, for the set of the premises: the mark of an inconsistent theory |
| `modelo` | a model of the set |

These are the accepted combinations. For a `segue` or a `contradiz`, three are valid:
`refutacao` with `modeloDasPremissas`; only `refutacao`, when there are no premises;
or only `vazio`. For a `nao-segue` or a `consistente`, only `modelo` is valid. A
`segue` or `contradiz` with premises and only `refutacao` is rejected with R12; the
other combinations, with R1.

A **model** is the finite one of blind Z3 batch 2 (section 6), or the exact one
(`modelos-exatos-t1.md`), which is recognized by the `formato` field.

For a refutation, or for the `vazio` mark, the check:

1. rebuilds the problem from the formulas and the dictionary, by translation t1, and
   compares it with the one in the file through the link below (R9);
2. checks the proof with Carcara, with the RARE rules of `provas-t1/regras.rare`
   (R10). Without Carcara, or with its time exhausted, the proof stays pending
   (section 7), which is neither acceptance nor rejection.

### 5.1 The link

The problem in the file is translation t1 of the set when both are in the profile
of t1 and are equal up to form.

**The profile of t1** is what the translation emits, and nothing more:

- the commands `(set-logic ALL)`, `declare-sort`, `declare-fun`,
  `declare-const`, `assert` and `check-sat`, in this order: one `(set-logic ALL)`
  first; the sorts `Obj` and `Mundo`, of arity 0, once each; the
  declarations; the assertions; and at most one `(check-sat)`, at the end;
- the sorts `Obj`, `Mundo`, `Bool` and `Real`, and `Obj` and `Mundo` only after being
  declared;
- the declared names `w0`, `pertence` and those of section 3 of `traducao-z3-t1.md`
  (`c:`, `n:`, `f:…/k`, `fn:…/k` and `p:…/k`, with or without the `[:sig]` suffix, and
  `R:`), each one once;
- the operators `true`, `false`, `not`, `and`, `or`, `=>`, `=`, `+`, `-`, `*`,
  `/`, `^`, `<`, `<=`, `>`, `>=` and `is_int`, and the binders `forall`, `exists`
  and `let`; a bound variable does not have the name of an operator or of a declared
  symbol;
- the types: each application of a declared symbol with the arity and the sorts of the
  declaration; `not` with one `Bool`; `and`, `or` and `=>` with two or more `Bool`;
  `=` with two or more terms of the same sort; `+` and `*` with two or more `Real`;
  `-` with one or two `Real`; `/` and `^` with two `Real`; `<`, `<=`, `>` and `>=`
  with two or more `Real`; `is_int` with one `Real`; the body of `forall` and of
  `exists` is `Bool`; and every assertion is `Bool`.

**The comparison** ignores only what does not change the meaning:

- comments, `(set-logic)` and `(check-sat)`, after the profile;
- the bars around symbols;
- the names of the bound variables, numbered in the order of the binders;
- `let`s, replaced by their terms (a `let` that would capture a variable is
  rejected);
- the writing of numbers: `2`, `2.0` and `(/ 4 2)` are the same number, and `(- 2)` is
  −2;
- nested `and` and `or`, which are flattened keeping the order of the arguments;
- the order of the declarations and that of the assertions (the assertions are a multiset:
  order does not count, and repetition does);
- the declarations that no assertion uses;
- and, in each declared symbol, the name beyond the **base name** and the
  **signature**. The base name is the name without the prefix (`c:`, `n:`, `f:`, `fn:`,
  `p:`, `R:`) and without the `/k[:sig]`; the signature is the sorts of the arguments and
  that of the result. The names in t1 are informative (section 3 of
  `traducao-z3-t1.md`), and two translations may name things differently: `c:n` and `n:n`
  (`Real`) are the same symbol, and so are `p:Q/1` and `p:Q/1:R` (`Mundo × Real → Bool`),
  while `P(a)` is still different from `P(b)`. Two symbols declared
  in the same problem with the same base name and the same signature are rejected.

## 6. The finite model

The finite model is `{"objetos": n, "mundos": k, "constantes": {name: object},
"funcoes": {"name/arity": [[world, [arguments], value], …]}, "predicados":
{"name/arity": [[world, [arguments]], …]}, "pertence": [[world, x, y], …],
"acessos": {holder: [[w, v], …]}}`. The objects are 0 to n−1, the worlds 0 to k−1, and
world 0 is the real one.

- `constantes` carries each free object constant in the set, including the
  name of an index that no quantifier binds, and ∅, if it appears.
- `funcoes` carries, for each object function that appears (the base of an index
  too), one line for each world and each list of arguments, without repetition.
- `predicados` carries, for each predicate that appears, only the true lists.
- `pertence` carries the triples in which x ∈ y in that world; no triple has as y the
  object for ∅.
- `acessos` carries the pairs of each holder, which must be serial, transitive
  and euclidean.

The checker checks the shape, the frame of each holder and whether each formula of the
set, in the expanded tree, holds in world 0. The finite model has no numbers:
a set with numbers calls for the exact model. The format does not limit the size of the
model: the search limits of the Caderno's engine (5 objects and 3 worlds, in the blind
batches) are not part of the format.

## 7. The check and the reasons for rejection

The check gives one of three results: **accepted**; **rejected**, with the code
of the reason; or **pending**, with the step that was left unchecked (the proof without
Carcara, or a time or memory limit). Pending is neither acceptance nor rejection.
For a sealed record, acceptance is of the shape only: the claim stays unchecked until the
record is opened.

The check stops at the first step that fails, in this order:
1. the shape (R1, R2, R3);
2. the reading (R4);
3. the hashes (R5, R6, R7);
4. the combination of the certificate (R1, R12);
5. the files (R8), the refutation or the `vazio` mark (R9, then R10);
6. the models (R11).

For a sealed record, it does only the shape (R1, R2 and R3).

| Code | Rejects when |
| --- | --- |
| R1 | A field is missing, a field is extra or a field is badly written; an entry is malformed or repeated; a value is outside the list; the certificate has a combination that is not valid |
| R2 | The format or the semantics are not those of this version |
| R3 | `teorema` without `segue`, or `segue` without `teorema` |
| R4 | m2 rejects the formula or a premise, read with the theory's dictionary |
| R5 | `formaCanonica` is not the canonical form of the formula |
| R6 | `teoria.hash` is not the hash of the theory |
| R7 | `compromisso.hash` is not the commitment of the formula with the salt |
| R8 | A file is missing, has an invalid path or another SHA-256 |
| R9 | The problem is not translation t1 of the set |
| R10 | The proof does not pass Carcara |
| R11 | The model check rejects the model |
| R12 | `segue` or `contradiz` with premises, without a model of the premises and without the `vazio` mark |

## 8. Normative examples

`registros-v1/exemplos.json` has, for each example, `id`, `descricao`,
`esperado` (`{"veredito": "aceito"}` or `{"veredito": "recusado", "motivo":
code}`) and `registro`. When the defect is in the writing of the JSON (a repeated
key), the example carries `registroTexto`, the record as text, instead of
`registro`. The certificate files are in
`registros-v1/arquivos/`. Each invalid example has a single defect, built
from a valid one with the other hashes redone, and the expected reason is that of
that defect. An independent check conforms when it gives the same
verdict on every example; the reason is informative, but, with a single defect,
it should also match. The author of the examples is the SHA-256 of the public key of
test 1 of RFC 8032 (Ed25519), which belongs to no one.

## 9. Limits of v1

1. There is no signature, chaining or timestamp: that is Phase 3. The
   author only has the spelling checked.
2. `estado` and `dominio` are not checked; the change of state through contesting belongs
   to Phase 4.
3. The proof requires Carcara.
4. Files go by path and SHA-256; on the network, they would go by hash.
5. The canonical form does not recognize paraphrases beyond the names of the bound
   variables: `P(a) ∧ Q(a)` and `Q(a) ∧ P(a)` have different forms.
6. The certificate shows that there is a model; it does not say that it is the smallest.
7. There is no time or memory limit in the format: a check that
   exhausts its own gives pending.
