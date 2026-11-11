# Blind batch 1 of records: the comparison

**Português:** [comparacao-caderno.md](comparacao-caderno.md). This is a translation, added on 2026-11-11; the
comparison as it was at the reveal is the Portuguese file, whose SHA-256 is recorded in `README.md`, and if the two
differ, it prevails. Verdicts: aceito = accepted, recusado = rejected, pendente = pending.

GPT's answers (`respostas_independentes_rodada33_congelada.json`, SHA-256 `08e8b61de49d64cdb98a7cfc74ba6227a286d22303889de50ffdd88abefed601`), from the frozen reader of round 33, against
the Caderno's (`caderno.json`, SHA-256 `5ab1cb73a384bcb58a1c7dea12da8322c7e71a7314ff8066fd0c1b1e5f397b3d`, the commitment given beforehand, intact). The prediction
(`previsao.txt`, SHA-256 `b5cff539b47ef063a87b914b1550e8fb23783f7d7c04ae9665a5dc0ce511f5eb`) was also given beforehand.

**Equal in verdict and reason: 58 of 62.** The divergences are L10, L40, L52, L53: the four in item 1 of the
prediction, with the ids it gave. Numeric evaluator v1 rejects right exact models without α in which an order
comparison is true with a non-zero difference (SymPy's `BooleanTrue` in the `res is True` on line 483). It is a defect of one
of the checks, not of the format: the models are n = 3 and m = 4 for n > 2 and m = n + 1, and n = 4 with k = 2 for n > 3 and
∃k∈ℤ (k · k = n).

The rest of the prediction: GPT's reader gave R9 on the malformed problem (item 3), and got all the cases of item 4 right. The
pending ones go to Carcara in the public verifier (item 5).

GPT's answers were redone here with the copy of the frozen reader that is in the repository (hashes checked), on the
same inputs: the same 62.

The last two columns are the Caderno's checks, as they ran before the commitment (they are not part of it): the app
(`src/motor/registro.ts`, which compares the problem exactly with the Caderno's translation: item 2 of the prediction) and the
public verifier (`especificacao/provas-t1/registros.py`, with the fixed link of item 3 and GPT's evaluator v1:
item 1).

| Id | The case | Caderno | GPT (round 33) | App | Public verifier |
| --- | --- | --- | --- | --- | --- |
| L01 | L53 with L10's problem and a false model of the premises (n = 1) | recusado, R9 | recusado, R9 | recusado, R9 | recusado, R9 |
| L02 | L44 sealed | aceito | aceito | aceito | aceito |
| L03 | L29 as segue (type teorema), with the problem of T ∪ {φ}, which is that of contradiz | recusado, R9 | recusado, R9 | recusado, R9 | recusado, R9 |
| L04 | L44 with the theory hash made with the texts of the premises, not with the canonical forms | recusado, R6 | recusado, R6 | recusado, R6 | recusado, R6 |
| L05 | L59 with the author in upper-case hexadecimal | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
| L06 | L15 with the arity of mae written as text ("1"), which does not change the hashes | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
| L07 | L24 with the proof of the vazio mark in a file that does not exist | recusado, R8 | recusado, R8 | recusado, R8 | recusado, R8 |
| L08 | does not follow, with belief: Ana believing that it rains and that rain wets does not make anything wet | aceito | aceito | aceito | aceito |
| L09 | L15 with one line fewer in the table of mae in the model of the premises | recusado, R11 | recusado, R11 | recusado, R11 | recusado, R11 |
| L10 | L53 with the premises in another order and one repeated: the same theory hash, and the problem with the assertion repeated | pendente → aceito with Carcara | **recusado, R11** | pendente | recusado, R11 |
| L11 | L38 with the path of the proof starting with / | recusado, R8 | recusado, R8 | recusado, R8 | recusado, R8 |
| L12 | L15 with L29's theory hash and the wrong SHA-256 of the problem | recusado, R6 | recusado, R6 | recusado, R6 | recusado, R6 |
| L13 | L15 with the first assumption of the proof negated (only Carcara sees it) | pendente → R10 with Carcara | pendente | pendente | pendente |
| L14 | L52 with the formula without closing the parenthesis and another commitment | recusado, R4 | recusado, R4 | recusado, R4 | recusado, R4 |
| L15 | follows, with a function: the same mother gives sisters | pendente → aceito with Carcara | pendente | pendente | pendente |
| L16 | L15 with the path of the problem arquivos/./… | recusado, R8 | recusado, R8 | recusado, R8 | recusado, R8 |
| L17 | L29 with the assertions of the problem in another order (the comparison is by multiset) | pendente → aceito with Carcara | pendente | recusado, R9 | pendente |
| L18 | L29 with the commitment made with the salt as text (64 characters), not as 32 bytes | recusado, R7 | recusado, R7 | recusado, R7 | recusado, R7 |
| L19 | L53 with the SHA-256 of the problem and of the proof swapped | recusado, R8 | recusado, R8 | recusado, R8 | recusado, R8 |
| L20 | L24 with the vazio mark and a refutation | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
| L21 | L15 with the theory hash made with the premises in the record's order | recusado, R6 | recusado, R6 | recusado, R6 | recusado, R6 |
| L22 | L38 with the problem without any comment | pendente → aceito with Carcara | pendente | pendente | pendente |
| L23 | L53 written with teoria.nome repeated, with the same value | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
| L24 | contradicts with the vazio mark: Russell's barber does not exist | pendente → aceito with Carcara | pendente | pendente | pendente |
| L25 | L59 with the formula Zero(n): the argument of a predicate without an entry asks for an object, and n is a number (E15) | recusado, R4 | recusado, R4 | recusado, R4 | recusado, R4 |
| L26 | L52 with the commitment made over the formula field, not over the text of the formula | recusado, R7 | recusado, R7 | recusado, R7 | recusado, R7 |
| L27 | L29 without the model of the premises and with the proof in a file that does not exist | recusado, R12 | recusado, R12 | recusado, R12 | recusado, R12 |
| L28 | L08 (does not follow) with a model and a model of the premises | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
| L29 | contradicts, with □ and ◇: if it is necessary that every human is mortal and that Socrates is human, it is not possible that he is not mortal | pendente → aceito with Carcara | pendente | pendente | pendente |
| L30 | L53 with a finite model instead of the exact one | recusado, R11 | recusado, R11 | recusado, R11 | recusado, R11 |
| L31 | L08 with the claim "não-segue" (with an accent) | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
| L32 | L35 with the state "sem avaliacao" (without an accent) | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
| L33 | L15 with the type hipótese and another canonical form | recusado, R3 | recusado, R3 | recusado, R3 | recusado, R3 |
| L34 | L44 with the polynomial 2x³ − 4, which has the same root and is not primitive | recusado, R11 | recusado, R11 | recusado, R11 | recusado, R11 |
| L35 | consistent, with ⊆ and ∉ | aceito | aceito | aceito | aceito |
| L36 | follows without premises, with the model of the premises (that of the empty set, which the specification accepts) | pendente → aceito with Carcara | pendente | pendente | pendente |
| L37 | L35 with the canonical form of the tree without expanding (∉ instead of ¬∈) | recusado, R5 | recusado, R5 | recusado, R5 | recusado, R5 |
| L38 | follows without premises, with belief: belief is closed under modus ponens (K) | pendente → aceito with Carcara | pendente | pendente | pendente |
| L39 | L15 sealed showing the salt | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
| L40 | L53 with the names of the problem and of the proof like those of GPT's translation (c:n instead of n:n) | pendente → aceito with Carcara | **recusado, R11** | recusado, R9 | recusado, R11 |
| L41 | L15 with mae applied to two arguments in a premise (E10) | recusado, R4 | recusado, R4 | recusado, R4 | recusado, R4 |
| L42 | L53 with the type axioma matemático | recusado, R3 | recusado, R3 | recusado, R3 | recusado, R3 |
| L43 | L29 with "numerico": false in the entry of a predicate, which does not change the hashes | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
| L44 | does not follow, with numbers: from n³ = 2 it does not follow that n < 1 (the exact model has n = ∛2, degree 3) | aceito | aceito | aceito | aceito |
| L45 | L29 without the model of the premises | recusado, R12 | recusado, R12 | recusado, R12 | recusado, R12 |
| L46 | L29 with the malformed problem: the lines of the assertions in reverse order, and the first assertion has two lines (a parenthesis closes the root in the middle) | recusado, R9 | recusado, R9 | recusado, R9 | recusado, R9 |
| L47 | L15 without the model of the premises | recusado, R12 | recusado, R12 | recusado, R12 | recusado, R12 |
| L48 | L35 sealed with the format registro-v2 | recusado, R2 | recusado, R2 | recusado, R2 | recusado, R2 |
| L49 | L10 with L53's problem, which does not have the repeated assertion (repetition counts) | recusado, R9 | recusado, R9 | recusado, R9 | recusado, R9 |
| L50 | consistent, with a formula that has the scope warning (E16), which is not an error: ∀x Ave(x) ⟹ Voa(piu) is ∀x (Ave(x) ⟹ Voa(piu)) | aceito | aceito | aceito | aceito |
| L51 | L15 sealed | aceito | aceito | aceito | aceito |
| L52 | consistent, with ∃ over ℤ: n > 3 and n is a square (integer witness) | aceito | **recusado, R11** | aceito | recusado, R11 |
| L53 | follows, with numbers: n > 2 and m = n + 1 give m > 3 | pendente → aceito with Carcara | **recusado, R11** | pendente | recusado, R11 |
| L54 | L36 with translation t2 | recusado, R2 | recusado, R2 | recusado, R2 | recusado, R2 |
| L55 | L52 with n = 25/4 and the witness k = 5/2: k · k = n holds, but k is not an integer | recusado, R11 | recusado, R11 | recusado, R11 | recusado, R11 |
| L56 | L24 with the vazio mark for T ∪ {φ}, not for T | recusado, R9 | recusado, R9 | recusado, R9 | recusado, R9 |
| L57 | L36 with both bound variables numbered #1 (the numbering is per quantifier) | recusado, R5 | recusado, R5 | recusado, R5 | recusado, R5 |
| L58 | L29 sealed with the type teorema | recusado, R3 | recusado, R3 | recusado, R3 | recusado, R3 |
| L59 | consistent, with division by zero: q = 1 / n and n = 0 (D0) | aceito | aceito | aceito | aceito |
| L60 | L08 with the real world without any access for Ana (the frame is not serial) | recusado, R11 | recusado, R11 | recusado, R11 | recusado, R11 |
| L61 | L35 with the formula ∃x∈x (x ∈ Animais) (E18) | recusado, R4 | recusado, R4 | recusado, R4 | recusado, R4 |
| L62 | L52 written with a comma after the last field (invalid JSON) | recusado, R1 | recusado, R1 | recusado, R1 | recusado, R1 |
