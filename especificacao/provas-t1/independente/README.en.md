# Independent implementation of t1

**Português:** [README.md](README.md). This is a translation; if the two differ, the Portuguese text prevails. This
translation is not one of the files of the GPT packages listed below, and `../conferir.py` does not use it.

These files were written by GPT, from OpenAI, at the request of the author of the Caderno,
from the specification alone. The m2 grammar reader came from
`especificacao/gramatica-m2.md` and the conformance package (rounds 12 to 16); the
t1 translation and the model evaluator came from `especificacao/traducao-z3-t1.md`
(rounds 18 to 21). GPT never received the Caderno's code: the t1 package it
received had only the specification, the 42 examples and a manifest.

They are here unchanged, byte for byte as they came in the package
`auditoria_z3_cego_2_independente.zip` (round 21, 163,738 bytes, SHA-256
`2f43a8c68c978f8bf5f4e7407cc4e080ec955aa354c21c1dfb6ec2e6189cdc11`), with
CRLF line endings. `../conferir.py` checks the SHA-256 of each one before using it.

| File | What it does | SHA-256 |
| --- | --- | --- |
| `parser_independente_m2.py` | Reads a formula by the m2 grammar and expands the shorthands | `f416e2b8137b02d0f64c55efa7ef9955fdda95d028a58231d99576f14f73d2f7` |
| `validador_independente_m2.py` | The m2 diagnostics | `8482f9d89ce4971e031b3f2eeb9f50a26faa721c18e3d9015a53eea6c3ac54de` |
| `tradutor_t1_independente.py` | Translates the formulas into SMT-LIB by t1, in pure Python, without Z3 | `59c711b1f36d43d4c524c4536c1c2b0242da5d1c174ddc881b3aee0f0c45ef58` |
| `avaliador_kripke_puro.py` | Evaluates a formula in a finite Kripke model, without Z3 | `86400fe1c7b7349579c3c7193d40c27763a1888d29f2b9fa71c567bdd4fca272` |
| `verificar_certificados_sem_z3.py` | Checks a model: shape, total tables, KD45 frame and the truth of the formulas in the real world | `36329ac9c336f4e011d33912be7cad07adf049d0392fb1a35dfc2c90d5493b15` |
| `lexico-m2.json` | The m2 lexicon, which the reader loads from its own folder | `0fa7876fabecb42ae4fddb9ea8c7c12a7288b802dac393a49f3c32457215266c` |

The `lexico-m2.json` here has the same content as `../../lexico-m2.json`, and
`conferir.py` checks that.

Three files came later, in the package
`auditoria_independente_registros_v1_fase2.zip` (Phase 2, 100,663 bytes,
SHA-256 `c6f65fe2d3baccc3425712267dcf868d03a698ffba5dd0cbeab2ef2159fb99be`),
also unchanged:

| File | What it does | SHA-256 |
| --- | --- | --- |
| `verificar_finito_reforcado.py` | `verificar_certificados_sem_z3.py` with each `assert` replaced by a `ValueError` and without the search limits of the blind batch (5 objects, 3 worlds). It is a mechanical transformation of the Python tree, and `conferir.py` redoes it and checks that it gives this file | `21c56ea78a4e6e9c4e26c477bd81f68518349ee38ca3ca1feb89a171f113627e` |
| `avaliador_kripke_numerico_v1.py` | Checks an exact model (`../../modelos-exatos-t1.md`), with numbers in Q(α), without Z3; uses SymPy | `acdcf7177c8718e85e085c443f4fada925f75dba3e9596fcf678341b794d8c8e` |
| `registros_independente.py` | The record reader (`../../registros-v1.md`), written from the specification alone, with its own SMT comparator (it does not use `../vinculo.py`) | `a4b52a0f098f391ea3932f7bd7119627a8619a430c151ab3c181810ce86c7001` |

The numeric evaluator is round 30's with the three correctness defects
fixed: the witness only in positive polarity, the `assert`s replaced by
explicit requirements, and ∅ as an object. The last two files are those of
round 33 (package `auditoria_independente_registros_v1_rodada33.zip`, 118,183
bytes, SHA-256 `59faca18f5d67ccbde90ef5a64e05e220ef7063211b58ee0e98f243226d69a01`):
the reader now compares symbols by base name and signature and
rejects repeated JSON keys, and the evaluator now reads numbers only by the
grammar of the format. The record reader is checked on the examples in
`../../registros-v1/` and on blind batch 1 (`../../registros-v1/lote-cego-1/`).

The numeric evaluator is round 35's (package
`auditoria_independente_registros_cego1_rodada35_corrigida.zip`, 512,190
bytes, SHA-256
`a571892c3f27d5e3393cc92b8900a57d7515575d59348477ae060c0c67aae266`). Blind
batch 1 found a defect in it: without α, a true order comparison gave
SymPy's `BooleanTrue`, which did not pass the `res is True` at the end, and right
models were rejected. GPT's fix is two lines: `sinal` returns an
`int` also without α, and the comparison returns a `bool`. The previous version had
SHA-256 `2f8d728b5b2ae6847edb74aaae40577294d162b8ba1b3ed5c536ed2b16378310`.

What has already been checked with them:

- the reader gave the same answers as the Caderno on the 185 normative m2 examples
  and on the blind batches of 750 and 1,000 cases;
- the translation decided the 42 t1 examples and the two blind Z3 batches, of 300
  cases each, without any verdict opposite to the Caderno's;
- the evaluator checked the Caderno's 90 models in blind Z3 batch 2.

Here, `conferir.py` uses the reader and the translation to rebuild the problem of each
certificate from the formulas, and compares it with the certificate's problem
(see `../README.md`).

These files are in the repository under the terms of `../../../LICENCAS.md`, as
code.
