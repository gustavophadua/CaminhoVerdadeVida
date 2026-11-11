# Example records — registro-v1

**Português:** [README.md](README.md). This is a translation; if the two differ, the Portuguese text prevails.

This folder has the example records of the open format
(`../registros-v1.md`), valid and invalid, with the certificate files.
They are what an independent check has to read and verify.

| File | What it is |
| --- | --- |
| `exemplos.json` | The 28 examples: 10 valid (R01 to R09 and R27) and 18 invalid (R10 to R26 and R28), each with the expected verdict and, for the invalid ones, the reason |
| `arquivos/` | The SMT-LIB problems (translation t1 of the set the certificate checks) and the Alethe proofs from cvc5 1.4.2, for the refutations and the `vazio` mark |
| `lote-cego-1/` | Blind batch 1: 62 new records, with the answers the Caderno recorded before GPT's, the prediction and GPT's answers (see the folder's README) |

## The valid ones

| Example | Claim | What it shows |
| --- | --- | --- |
| R01 | segue (follows) | Every P is Q, and a is P; therefore a is Q. Refutation and model of the premises |
| R02 | nao-segue (does not follow) | From "every P is Q" it does not follow that a is Q. Finite model |
| R03 | consistente (consistent) | "a is P" fits together with "every P is Q" |
| R04 | contradiz (contradicts) | If every P is Q and a is not Q, a is not P |
| R05 | segue | A and ¬A, with the `vazio` mark: the record only says that the premises have no model |
| R06 | segue | A law of logic, without premises: no model of the premises is asked for |
| R07 | nao-segue | With numbers: from n · n = 2 it does not follow that n > 0. Exact model, with n = −√2 |
| R08 | consistente | With belief: Ana believing that a is P fits together with a not being P |
| R09 | nao-segue | R02 sealed: only the commitment |
| R27 | segue | With numbers: from Q(n) it follows that some number is Q. The Caderno's translation declares `n:n` and `p:Q/1:R`, and another may declare `c:n` and `p:Q/1`: the comparison goes by base name and signature |

The invalid ones have one defect each, built from a valid one with the other
hashes redone, and they cover the twelve reasons for rejection in section 7 of the
specification. Among them are the inconsistent theory without the `vazio` mark
(R22), the `vazio` mark with the proof of another theory (R24) and the record written
with a repeated key (R28, given in `registroTexto`).

## How they are checked

- `testes/registros.test.ts`: the Caderno's check (`src/motor/registro.ts`),
  which does everything except the Alethe proof. Its link is that of section 5.1
  (`src/motor/vinculo.ts`), the same comparison as the public verifier.
- `provas-t1/registros.py`, in GitHub's conferir-provas workflow, with two
  readers. The verifier's uses the reading and translation of the independent
  implementation (`provas-t1/independente/`), the independent model
  checks and Carcara. GPT's (`provas-t1/independente/registros_independente.py`)
  is entirely its own, written from the specification alone, with its own SMT comparator;
  the proofs it leaves pending go to Carcara.

The examples come from a generator of the Caderno, with cvc5 1.4.2 and the same options
as the proofs in `provas-t1/`; the generator rejects a proof that uses a RARE rule outside
`provas-t1/regras.rare`. The author of the examples is the SHA-256 of the public key of
test 1 of RFC 8032 (Ed25519), which belongs to no one. The salt of each example is
fixed, so that the files always come out the same; in a real record, it is
random.
