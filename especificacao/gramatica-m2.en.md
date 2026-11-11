# Grammar of the Caderno Lógico formulas — semantic version m2

**Português:** [gramatica-m2.md](gramatica-m2.md). This is a translation; if the two differ, the Portuguese text
prevails. The rule names in the PEG and the field names of the JSON files are kept in Portuguese, as they are in the
normative files.

This file defines how a text becomes a tree in the Caderno Lógico. It applies together
with three data files, in this same folder:

- `lexico-m2.json`: the symbols, every accepted spelling and the rules for names,
  indices and numbers.
- `diagnosticos-m2.json`: the codes E0 to E17, the condition of each one and the order
  in which they are chosen.
- `exemplos-m2.json`: the normative examples, each with the expected tree, the
  expanded tree and the diagnostics.

Versions: semantics **m2**; translation to Z3 **t1**. A change of meaning only
goes in with a new version; no note and no certificate changes meaning
silently.

## 1. Lexicon

The text is split into symbols before parsing. Character, throughout this
file, means a whole Unicode character (code point): `𝑥` (U+1D465) is a
letter and starts a name, and an emoji is a single E8. At each position, the reader tries,
in this order:

1. Whitespace: separates symbols. The reader notes whether there was space before
   each symbol, because this decides application, belief and index (section 1.4).
   Whitespace is exactly the 25 characters of the `espacos` field of
   `lexico-m2.json`, those of ECMAScript's `\s`: U+0009 to U+000D, U+0020, U+00A0,
   U+1680, U+2000 to U+200A, U+2028, U+2029, U+202F, U+205F, U+3000 and U+FEFF.
   U+0085 and U+001F are not whitespace: they give E8.
2. Unicode subscripts: a sequence of them becomes an index.
3. `_` followed by name characters or an apostrophe: index. `_` alone is E8.
4. Digits 0 to 9: number, with an optional decimal part (`2`, `0.5`).
5. `ℝ` and `ℤ`.
6. Name character: starts a name (section 1.1).
7. Symbols from `lexico-m2.json`, in the given order. The longest spelling comes before
   any spelling that is a prefix of it: `<=>` is ⟺, not ≤ followed by >.
8. Anything else: E8. After `\`, the whole command (letters A–Z, a–z)
   becomes a single E8.

### 1.1 Names

A name starts with a character from the L or N classes of **Unicode 16.0**, except
subscripts and except the digits 0 to 9, which start numbers. It continues with
characters from the L or N classes (except subscripts) and with apostrophes. The ranges of L
and N in Unicode 16.0 are in the `letrasENumeros` field of `lexico-m2.json`; they are
the definition, not the environment's Unicode table, which changes from version to
version. So U+11380, U+1E5D0 and U+10D50, letters new in 16.0, start names.

- `x`, `x'`, `Ω`, `αβ`, `²x`, `٣x` and `xᵃ` are names.
- Upper case and lower case are different names.
- There is no Unicode normalization: a name in NFD is rejected (E8 on each combining
  mark).
- Superscripts are name characters. The twelve `⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁿ ⁱ` give the
  warning E17, because they look like exponents; `x²` is still a name, not x
  squared. `⁺ ⁻ ⁼ ⁽ ⁾` are not name characters (E8).

### 1.2 Indices

The subscripts in `lexico-m2.json`, or `_` followed by letters and digits, attached
to the name, form an index: `xᵢ` is the same as `x_i`, and both become
`(_ x i)`. Subscripts are never part of a name.

### 1.3 Numbers

`[0-9]+(\.[0-9]+)?`. A number attached to a name is not multiplication: `2x = 4` is E2.

### 1.4 Adjacencies

- Application: `(` attached to the name, with no space. `P(a)` is an application; `P (a)` is not.
- Belief: `B` attached to the `[`. With a space, `B` is an ordinary name.
- Index: attached to the name.

## 2. Syntax

The normative reading is that of this PEG (parsing expression grammar),
applied to the symbols of the lexicon:

```peg
Formula       <- Equivalencia
Equivalencia  <- Implicacao ("⟺" Implicacao)*
Implicacao    <- Disjuncao ("⟹" Implicacao)?
Disjuncao     <- Conjuncao ("∨" Conjuncao)*
Conjuncao     <- Unaria ("∧" Unaria)*
Unaria        <- "¬" Unaria
               / "□" Unaria
               / "◇" Unaria
               / Crenca
               / Quantificador
               / Termo Relacao Termo
               / "(" Formula ")"
               / Aplicacao
               / Proposicao
Crenca        <- "B" "[" Nome+ "]" Unaria
Quantificador <- ("∀" / "∃") Variavel ("∈" (Termo / "ℝ" / "ℤ"))? Formula
Relacao       <- "=" / "≠" / "∈" / "∉" / "⊆" / "<" / "≤" / ">" / "≥"

Termo         <- Produto (("+" / "−") Produto)*
Produto       <- Sinal (("·" / "/") Sinal)*
Sinal         <- "−" Sinal / Potencia
Potencia      <- Uniao ("^" Sinal)?
Uniao         <- Intersecao ("⋃" Intersecao)*
Intersecao    <- Primario ("⋂" Primario)*
Primario      <- "∅" / Numero / Aplicacao / Indexado / Nome / "(" Termo ")"
Aplicacao     <- Nome "(" Termo ("," Termo)* ")"
Indexado      <- Nome Indice
Proposicao    <- Nome
Variavel      <- Nome
```

(Rule names, in English: Equivalencia = equivalence, Implicacao = implication, Disjuncao = disjunction, Conjuncao =
conjunction, Unaria = unary, Crenca = belief, Quantificador = quantifier, Relacao = relation, Termo = term, Produto =
product, Sinal = sign, Potencia = power, Uniao = union, Intersecao = intersection, Primario = primary, Numero = number,
Aplicacao = application, Indexado = indexed, Proposicao = proposition, Variavel = variable, Nome = name, Indice = index.)

### 2.1 How the PEG is read

- **Ordered choice.** In `/`, the alternatives are tried in the written order, and
  the first one that succeeds is kept.
- **Greedy repetition.** `*` and `?` consume as much as they can and do not give it back.
- **Decision by the first symbol.** In almost every rule, the first
  symbol already decides the alternative. There is only one backtrack: a `(` in formula
  position. There the reader first tries `Termo Relacao Termo`, as in
  `(A ⋃ B) ⊆ C`. If the attempt gives a syntax error or does not reach a relation,
  it goes back to the `(` and reads `"(" Formula ")"`. The error from the attempt is discarded; a
  limit error (section 7) is not.
- **Atom starting with a name.** The reader reads a term. If a relation follows, it is a
  relation. If the term is an application without an index, it is a predicate. If it is a name
  on its own that the dictionary says is a predicate of arity 0, it is a proposition. Otherwise,
  E2.
- **Whole input.** A formula is only accepted if the reading consumes all the
  symbols. If something is left over that starts a formula, E3; otherwise, E0.
- **The `)` of each group.** Balancing is checked before syntax (E7).
  `"(" Formula ")"` and `"(" Termo ")"` consume the `)` that matches their `(`.

### 2.2 Scope of the quantifier

The body of the quantifier is read by the `Formula` rule, the one with the lowest precedence.

1. On finding ∀ or ∃ in a prefix position, the reader reads the variable and, if present,
   `∈` and the domain.
2. The body consumes symbols up to the end of the text or up to the `)` that closes the group in
   which the quantifier is.
3. Only after that do the loops for ∧, ∨, ⟹ and ⟺ at the outer level look at the
   text again, and nothing is left for them.

| Input | Tree |
| --- | --- |
| `∀x P(x) ⟹ Q(b)` | `(∀ x (⟹ (P x) (Q b)))` |
| `(∀x P(x)) ⟹ Q(b)` | `(⟹ (∀ x (P x)) (Q b))` |
| `P(a) ∧ ∀x P(x) ⟹ Q(b)` | `(∧ (P a) (∀ x (⟹ (P x) (Q b))))` |
| `(P(a) ∧ ∀x P(x)) ⟹ Q(b)` | `(⟹ (∧ (P a) (∀ x (P x))) (Q b))` |
| `¬∀x P(x) ∨ Q(b)` | `(¬ (∀ x (∨ (P x) (Q b))))` |
| `∀x ∃y P(x) ⟹ Q(y)` | `(∀ x (∃ y (⟹ (P x) (Q y))))` |
| `∃x ∀y R(x, y) ∧ ∃z P(z) ⟹ Q(x)` | `(∃ x (∀ y (∧ (R x y) (∃ z (⟹ (P z) (Q x))))))` |
| `(∀x P(x) ∧ Q(x)) ∨ ∃y R(y, y) ⟹ P(y)` | `(∨ (∀ x (∧ (P x) (Q x))) (∃ y (⟹ (R y y) (P y))))` |
| `B[Ana] ∀x P(x) ∧ Q(x)` | `(B "Ana" (∀ x (∧ (P x) (Q x))))` |

With nested quantifiers, the rule applies to each one. Those in the same
group all end at the same point; a quantifier inside a group of its own
ends at that group's `)`. A connective to the right of a quantifier stays with
it, even if it binds less tightly than the outer connective: in
`(∀x P(x) ∧ Q(x)) ∨ ∃y R(y, y) ⟹ P(y)`, the ⟹ belongs to ∃y. This can be checked from the
text alone: the predicates and relations in the body of a quantifier are exactly those
between the ∀ or ∃ and the `)` that closes the group around it, or the end of the
text, when there is no group.

### 2.3 Precedence and associativity

From the tightest binding to the loosest:

| Level | Operators | Associativity |
| --- | --- | --- |
| Terms | ⋂ | left |
| Terms | ⋃ | left |
| Terms | ^ | right: `2^3^2` = `2^(3^2)` |
| Terms | unary − | prefix: `−x^2` = `−(x^2)` |
| Terms | · / | left |
| Terms | + − | left |
| Relations | = ≠ ∈ ∉ ⊆ < ≤ > ≥ | do not chain: `a = b = c` is E0 |
| Formulas | ¬ □ ◇ B[…] | prefixes: bind only what comes right after |
| Formulas | ∧ | left |
| Formulas | ∨ | left |
| Formulas | ⟹ | right: `A ⟹ B ⟹ C` = `A ⟹ (B ⟹ C)` |
| Formulas | ⟺ | left |
| Formulas | ∀ ∃ | prefix whose body runs to the end (2.2) |

### 2.4 Code of each syntax error

The code of the first error depends on what the reader expected and on the symbol it
found. These start a term: name, number, `(`, ∅ and `−`. These start a formula:
those plus ¬, □, ◇, ∀ and ∃ (`B[` is a name followed by `[`).

**Expecting a formula** (at the start, after a connective or a prefix,
in the body of a quantifier, right after a `(` in formula position):

| Finds | Code |
| --- | --- |
| ∧ ∨ ⟹ ⟺ | E1 |
| a relation | E1 |
| + · / ^ ⋂ ⋃ | E1 |
| `)` right after the `(` | E0 (empty parentheses) |
| ℝ, ℤ, `]`, `[`, `,` or a subscript without a name | E0 |

**Right after an operator**, the code goes on the operator:

| Operator | Finds | Code |
| --- | --- | --- |
| ∧ ∨ ⟹ ⟺ | end, `)`, `,`, `]`, another connective or a relation | E1 |
| ¬ □ ◇ and B[…] | end, `)`, `,`, `]` or a connective | E1 |
| ∀ or ∃ | something that is not a name | E0 |
| ∀x | an index on the variable | E0 |
| ∀x and ∀x∈S | end, `)`, `,`, `]`, connective or relation (the body is missing) | E1 |
| the ∈ of ∀x∈ | end, `)`, `,`, `]`, connective, relation or ¬ | E1 |
| a relation | end, `)`, `,`, `]`, connective, another relation, ¬, ∀ or ∃ | E1 |
| + − · / ^ ⋂ ⋃, including the sign − | something that does not start a term | E1 |

A relation after ¬, □, ◇ or B[…] falls under the previous table (E1 on the relation).
After a relation, what is not in its row is read as a term: in
`a ≤ / b`, the `/` gives E0 by the next table.

**Expecting a term** (after a relation, in the domain of ∀x∈, in the
arguments of an application):

| Finds | Code |
| --- | --- |
| end, `)`, `,` or a connective | E1 |
| ℝ or ℤ, a subscript without a name or another symbol | E0 |
| `f()`, an application with no arguments | E0 |

**After a complete formula** (at the end of the text or inside a formula
group), expecting the end, `)` or a connective:

| Finds | Code |
| --- | --- |
| something that starts a formula | E3 |
| a relation | E0 (a relation applied to a formula, or chained relations) |
| another symbol | E0 |

**Inside a term** — in a term `(`, expecting `)`, and in the arguments of
`f(…)`, expecting `,` or `)` — any other symbol gives E0. There are no two
formulas side by side there, and E3 does not apply.

**Atoms.** A term with no relation after it, which is neither an application attached to the name nor
a proposition from the dictionary, gives E2; so do ¬, □, ◇ or B[…] applied to a term.
**Belief.** `B[]`, `[` without `]` and something that is not a name inside `B[…]`: E0.

## 3. Stages and choice of diagnostics

Reading has three stages. The exact order in which diagnostics are chosen
is in `diagnosticos-m2.json`, field `selecao`.

1. **Lexicon and syntax**: text into symbols, symbols into a tree. Consults the
   dictionary only for the proposition (2.1). Errors: E0, E1, E2, E3, E7, E8.
2. **Names and types**: checks the use of each name across the whole tree, with the
   dictionary when there is one (section 4). Errors: E4, E9, E10, E11, E15, E18. Warnings: E5, E6, E14, E16,
   E17; E12 and E13 only when entries are required.
3. **Evaluation**: finite engine, Z3 and the scenario evaluator. It emits no codes:
   it answers follows, does not follow, contradicts or undecided.

A tree can be built and the formula still be rejected in stage 2:
`a ≠ a` (E9) and `(A ⋂ B) = C` (E11). The formula is accepted when it has no
error-level diagnostic.

### 3.1 Position and order of the diagnostics

Each diagnostic has an `inicio` (start): the position of the first character it
refers to, counting the Unicode characters (code points) of the text as
written, from 0. In the examples, `inicio` is normative for E7, E8 and for
all the codes of the names-and-types stage. In syntax errors (E0 to E3) it
is informative: it is the code that has to match.

The span of a tree node starts: in a relation, a connective, ⋂ or ⋃ and
arithmetic, at the left operand; in a prefix (¬ □ ◇ B[…] and the sign −) and
in a quantifier, at its symbol; in an application or an indexed name, at the
name. The index itself starts at the `_`, or at the first subscript: in `A_x`, the `x`
of the index starts at the position of the `_`. A term or formula in parentheses
starts at the `(` (the outermost one, when there are several pairs around it).

| Code | `inicio` |
| --- | --- |
| E4, E5 | the quantifier's variable (for E5, that of the inner quantifier) |
| E6 | the span of the free occurrence; one per occurrence |
| E7 | the chosen parenthesis |
| E8 | the first character of the unknown symbol; in a command, the `\` |
| E9 | the span of the relation |
| E10 | the span of the disagreeing occurrence (predicate, application or name); in a quantifier, the variable |
| E11 | the span of the ⋂ or ⋃ term |
| E12, E13 | the name at its first occurrence, without the surrounding parentheses |
| E14, E16 | the span of the quantifier |
| E15 | the span of the term of the wrong sort; or that of the relation, when the two sides of = or ≠ disagree |
| E17 | the name, without the surrounding parentheses |
| E18 | the span of the occurrence in the domain |

For E10, the first occurrence of a name, in text order, decides its use;
each later occurrence that disagrees gets an E10. With an entry, each occurrence
that disagrees with the entry gets one.

Order: by `inicio`; at the same `inicio`, by the code number. In
`x ≠ x ∧ ∀x P(x)` come E6 and E9, both at 0, and then E6 at 4. Two
diagnostics with the same code and the same `inicio` are not distinguished in the package.

## 4. Dictionary and names

### 4.1 Entries (fichas)

Each entry has `simbolo` (symbol), `tipo` (type: constante, função or predicado — constant, function or predicate),
`aridade` (arity), `numerico` (a constant or function whose value is a number) and `argumentos` (a list of
`num` and `obj`, one per argument, when the function or predicate mixes numbers
and objects). A predicate of arity 0 is a proposition (2.1).

Without an entry, a name counts by its use: applied in formula position it is a predicate;
applied inside a term it is a function; alone in a term it is a constant. That is why
an independent verifier needs to receive, along with the formula, the entries for the
names it uses; in the normative examples, they are in the `fichas` field.

**Required entries.** On most screens, the Caderno requires an entry for
each name, and then E12 and E13 come in (4.4). It is a reading option: in the
examples, the `exigirFichas` field says whether it applies. It changes neither the tree nor the
other diagnostics.

### 4.2 Uses of names (E4, E10)

The names-and-types stage walks the tree in text order, carrying the
bound variables around it. The domain of a quantifier is read before the body
and outside it (section 5).

1. Each free occurrence of a name is a use: constant (a name alone in a
   term), function of arity n (an application in a term, including the name of an
   index: `x_i` is x applied to i) or predicate of arity n (the proposition has
   arity 0).
2. If the name has an entry and the use disagrees with it (another type; or, for a function or a
   predicate, another arity), E10 on that occurrence, and that use does not count for
   step 3.
3. Without an entry, the first use, in text order, decides; each later use with
   another type or another arity gives E10 on that occurrence.
4. A bound variable used as a function or as a predicate gives E10 on the occurrence.
5. A quantifier over a name that has an entry gives E4, if the entry is for a
   constant, or E10, if it is for a function or a predicate, on the variable.

### 4.3 Numbers and objects (E15)

Each term has a sort: number, object or unknown.

- Number: a numeral, arithmetic (+ − · / ^), sign (−t) and a variable bound by ∀x∈ℝ,
  ∀x∈ℤ, ∃x∈ℝ or ∃x∈ℤ.
- Object: the other bound variables, ∅, ⋂ and ⋃.
- By the entry: a free name with a constant entry, or an application f(…) with a
  function entry (f is not a bound variable), is a number if the entry says `numerico`
  and an object if it does not. An entry of another type, which already gives E10, says nothing.
- Unknown: a free name or an application without an entry of the type of the use, and an
  application whose name is a bound variable.

Each place asks for a number, an object or either.

- Predicate argument: what the predicate entry says in `argumentos` for
  that position; otherwise, object.
- Function argument, including the index of `x_i`: what the function entry says
  in `argumentos`; otherwise, number if the function is a number, or if it is unknown
  and its place asks for a number; otherwise, object.
- Both sides of < ≤ > ≥, the operands of arithmetic and that of the sign: number.
- = and ≠: if the sorts of the two sides are known and different, E15 on the
  relation, and both sides then ask for either. Otherwise, both ask for a
  number if one of them is a number, an object if one of them is an object, and either if both
  are unknown.
- Both sides of ∈, ∉ and ⊆, the operands of ⋂ and ⋃ and the domain of ∀x∈S:
  object.

A term of known sort in a place that asks for the other gives E15 on that term. The
whole term is checked before its parts, and the parts are also
checked. The domain of ∀x∈S is read outside the quantifier, with the sort the
variables have outside: in `∃u∈ℝ ∃u∈u P(u)`, the `u` in the inner domain is the outer
one, a number, and gives E15, in addition to E18. Examples G134 to G143.

### 4.4 Required entries (E12, E13)

Only with `exigirFichas`. For each name without an entry, at its first occurrence, in
text order, an E12 or an E13 is emitted, on the name, without the surrounding parentheses. Not
counted: names bound by some quantifier anywhere in the formula
(not even in the free occurrences, which already have E6), the holders of `B[…]` and
numbers.

E13 is emitted instead of E12 when there is a similar name in the dictionary, and that name
goes in the `sugestao` (suggestion) field:

- both names have 3 or more characters, and their lengths differ by at most 2;
- the edit distance between them is at most 2: inserting, removing or replacing a
  character, or swapping two neighbors, each costing 1, without editing
  the same stretch twice (Damerau distance in the restricted version, OSA);
- the name at the smallest distance wins; on a tie, the first in the order of the entries.

Characters, here, are Unicode characters (code points). Examples G144 to
G153.

## 5. Expansion

The finite engine and Z3 receive the expanded tree. Expansion replaces:

| Form | Becomes |
| --- | --- |
| `t ⊆ u` | `∀z (z ∈ t ⟹ z ∈ u)` |
| `z ∈ t ⋂ u` | `z ∈ t ∧ z ∈ u` |
| `z ∈ t ⋃ u` | `z ∈ t ∨ z ∈ u` |
| `z ∈ ∅` | false (`⊥`) |
| `∀x∈S φ` | `∀x (x ∈ S ⟹ φ)` |
| `∃x∈S φ` | `∃x (x ∈ S ∧ φ)` |
| `t ≠ u` | `¬(t = u)` |
| `t ∉ u` | `¬(t ∈ u)` |

**Fresh variable for ⊆.** Before expanding, the set U of the formula's names is
gathered: constants, functions, predicates (including propositions), quantifier
variables and names in the domains. The holders of `B[…]` do not enter U:
they are another kind of name, which no ∀ binds. The ⊆ are expanded in the order
in which they appear in the text. Each one gets the first name in the sequence `z`, `z1`,
`z2`, … that is not in U, and that name enters U. That is why two ⊆ in the same
formula get `z` and `z1` (example G088), `z ⊆ z1` gets `z2` (G093) and
`B[z] (A ⊆ B)` gets `z` (G096). Since the fresh variable appears nowhere
else in the formula, it neither binds nor is bound by anything.

**Domain.** In `∀x∈S φ` and `∃x∈S φ`, `S` is read outside the quantifier. That is why
the variable `x` cannot appear in `S` as a term, nor inside an argument or
an index (E18): the expansion puts `x ∈ S` inside the ∀x, and there that occurrence
would be bound. The name of a function does not count. `∀x∈A ∀y∈x P(y)` is accepted: the `x`
in the inner domain is that of the outer quantifier (G113).

`∀x∈ℝ` and `∀x∈ℤ` are not expanded: they mark the variable as a number.

## 6. Tree format

The examples write the tree as an S-expression:

| Node | Notation |
| --- | --- |
| Predicate with arguments | `(P a b)` |
| Proposition | `A` |
| Relation | `(= a b)`, `(∈ a A)`… with the canonical symbol |
| Not, necessary, possible | `(¬ φ)`, `(□ φ)`, `(◇ φ)` |
| Belief | `(B "holder" φ)`, with the holder in quotes |
| Connectives | `(∧ φ ψ)`, `(∨ φ ψ)`, `(⟹ φ ψ)`, `(⟺ φ ψ)` |
| Quantifier | `(∀ x φ)`, `(∃ x ∈ D φ)` |
| Name, number, empty set | `a`, `2`, `∅` |
| Application, index | `(f a)`, `(_ x i)` |
| Arithmetic and sets | `(+ a b)`, `(− a)`, `(^ a b)`, `(⋂ A B)`, `(⋃ A B)` |
| True, false | `⊤`, `⊥` (only in the expanded tree) |

`arvore` is the tree as read, without expansion. `arvoreExpandida` is the tree after
section 5, present only when the formula is accepted.

## 7. Limits

| Situation | What happens |
| --- | --- |
| Nesting of up to 200 levels (parentheses, prefixes, quantifiers, signs, applications), in any mixture | Must be accepted |
| Tree with depth up to 2,000 (for example, 1,999 terms joined by ∧) | Must be accepted |
| Tree with depth above 2,000 | Must be rejected with E0 |
| Nesting between 200 and 2,000 levels | Each implementation may reject with E0, for resource limits |

The Caderno rejects above 500 open descents in the reader, about 250 levels.

## 8. Scope and superscript warnings

- **E14**: appears if, and only if, the body of a quantifier starts with `(` and
  continues after the `)` that closes that `(`.
- **E16**: appears if, and only if, the body of a quantifier does not start with `(` and
  has ∧, ∨, ⟹ or ⟺ at the top; never together with E14 on the same quantifier; one
  warning per quantifier. The message shows the whole formula in two ways: the
  same formula, with the quantifier's body in parentheses (no warning), and the
  other formula, in which the quantifier applies only to the first part of the body.
  It can be turned off without changing the tree or the certificate.
- **E17**: appears on every name that has one of the twelve superscripts of section 1.1,
  including a quantifier's variable and the name of an index written with `_`
  (`x_²`), which is a name like the others (section 4.2); the span of the index starts at the
  `_`.

## 9. Conformance

An implementation conforms to the examples when, for each example in
`exemplos-m2.json`, reading `texto` with the `fichas` and with the
`exigirFichas` option:

1. it accepts or rejects as `aceita` says;
2. it builds the tree `arvore` (or none, when it is `null`);
3. it builds the expanded tree `arvoreExpandida`, when it accepts;
4. it emits the diagnostics in `diagnosticos`, with the same code, the same level,
   the same `inicio` and, for E13, the same `sugestao`, in the same order (section 3.1);
   in the syntax errors, E0 to E3, `inicio` is informative.

The texts of the messages are not part of conformance. The examples were
taken from the current reader: they are characterization examples, not interpretations
established independently. A divergence between implementations is
classified as an implementation failure, a gap in the specification or a pending
decision, and by default is not resolved in favor of either reader.
