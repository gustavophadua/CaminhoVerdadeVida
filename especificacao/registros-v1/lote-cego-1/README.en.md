# Blind batch 1 of records — registro-v1

**Português:** [README.md](README.md). This is a translation; if the two differ, the Portuguese text prevails. The
English translations in this folder (`*.en.md`) were added on 2026-11-11 and are not part of the batch: the files and
hashes of the protocol are the Portuguese ones listed below, which stay byte for byte.

The first blind batch of the open format (`../../registros-v1.md`): 62 new
records, from L01 to L62, with theories and formulas that are not in the normative
examples. There are valid and invalid ones, shuffled, and all come written as
JSON text. The batch was the confirmation of Phase 2: an independent program, GPT's
record reader, written from the specification alone, had to give the
same answers as the Caderno without knowing them.

## The protocol

1. The Caderno sent GPT only the inputs (`entradas.json` and `arquivos/`, in the
   package `lote1-para-gpt.zip`, of 89,863 bytes, SHA-256
   `a186450faab54d51d662a2953491cfb05b27d49a21266a20764be95dc0071b88`). Along with them
   went the protocol in `LEIAME.md` and the SHA-256 of two stored files: the
   Caderno's answers, with a salt (`caderno.json`), and the prediction of what could
   diverge (`previsao.txt`).
2. GPT ran the frozen reader from round 33, without Carcara, and recorded the
   SHA-256 of its answers before seeing the Caderno's.
3. The Caderno revealed `caderno.json` and `previsao.txt`, and the hashes matched
   those of the commitment.

| File | Bytes | SHA-256 | What it is |
| --- | --- | --- | --- |
| `LEIAME.md` | 2,555 | `2d001c454a0c973f9683988ecdc5165e050a27c83b3ee2bca5369d6e33fa44d2` | The protocol, as it went to GPT |
| `entradas.json` | 80,938 | `c8776209bdebf9677a1730bdfc734dae3e9c559409d8a0296cfe166f98931b74` | The 62 records, each in `registroTexto` |
| `arquivos/` | 72 files | in the record that cites each one | The SMT-LIB problems and the Alethe proofs |
| `caderno.json` | 10,166 | `5ab1cb73a384bcb58a1c7dea12da8322c7e71a7314ff8066fd0c1b1e5f397b3d` | The Caderno's answers: the commitment |
| `previsao.txt` | 4,225 | `b5cff539b47ef063a87b914b1550e8fb23783f7d7c04ae9665a5dc0ce511f5eb` | The prediction, given beforehand |
| `respostas-gpt-rodada33.json` | 4,869 | `08e8b61de49d64cdb98a7cfc74ba6227a286d22303889de50ffdd88abefed601` | GPT's answers, from the frozen code of round 33 |
| `respostas-gpt-rodada35.json` | 4,775 | `c7d29b4fdccd16ad1f5f90852e8c75f3ddb5d8451b45c7d20270b5a28684c4eb` | GPT's answers, with the fixed numeric evaluator |
| `comparacao-caderno.md` | 10,284 | `ef10b9e38eb6cea7f8fdfefb3ee15a96acbcf9a1a15a4460edc7f95653cdb4fd` | The case-by-case comparison, as it was at the reveal |

Each answer is `aceito` (accepted), `recusado` (rejected) with the reason, or `pendente` (pending), when only the
proof was left to check. For the pending ones, `caderno.json` says in
`previstoComCarcara` what Carcara has to give.

## The result

- **GPT, with the frozen code of round 33:** 58 of 62 equal to the
  Caderno's, in verdict and reason. The four divergences (L10, L40, L52 and L53)
  were in the prediction, with their ids. They were a defect of GPT's numeric evaluator v1,
  which rejected right exact models without α when an order comparison
  was true: SymPy's `BooleanTrue` did not pass the `res is True`. The
  defect only rejected too much.
- **GPT, with the fixed evaluator (round 35, two lines):** 62 of 62.
- **The Caderno's side:** the batch also showed two defects, which were in the
  prediction.
  - The public verifier's link reader broke on a problem with an extra
    `)` (L46), and the whole check fell over.
  - The app's check compared the problem exactly with the Caderno's translation, and
    rejected (R9) assertions in another order (L17) and the names of GPT's
    translation (L40), which section 5.1 accepts.

  Both are fixed. The link fails closed and has one more control
  (`../../provas-t1/adversarios/comparador/parentese-a-mais-recusar.smt2`). The
  app's check uses the comparison of section 5.1 (`src/motor/vinculo.ts`).
- **The format:** showed no defect.

## How it is checked

- `testes/registros.test.ts`: the Caderno's check
  (`src/motor/registro.ts`) has to give, for each record, the answer in
  `caderno.json`; for the pending ones, only the proof is left to check.
- `../../provas-t1/conferir.py`, in GitHub's conferir-provas workflow (step 8):
  the public verifier and GPT's record reader have to give the answer in
  `caderno.json`. For the 11 pending ones, with Carcara, they have to give what it
  predicted: accepted on all, except L13, with R10 (the first assumption of the proof,
  negated, is not an assertion of the problem).

## How the batch was built

By a generator of the Caderno, from 18 valid records with new theories:
functions, □ and ◇, belief, ⊆ and ∉, numbers (∛2, ∃ over ℤ, division by zero), an
inconsistent theory and sealed records. Each invalid one has a subtle defect,
and five have two, to test the order of the check. The proofs are from cvc5
1.4.2, with the options of `../../provas-t1/`, and only use the RARE rules of
`regras.rare`. The problems have a neutral header, and each record has its
own files (the copies have the same bytes), so that the names do not
say where it came from. The salts come from a secret of the Caderno, not from a
public text, as in the examples. The author is the SHA-256 of the public key of test
1 of RFC 8032 (Ed25519), which belongs to no one.
