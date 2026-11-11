# Blind batch 1 of records (registro-v1)

**Português:** [LEIAME.md](LEIAME.md). This is a translation, added on 2026-11-11; the protocol that went to GPT is
the Portuguese file, whose SHA-256 is recorded in `README.md`, and if the two differ, it prevails.

There are 62 records, from L01 to L62, all new: the theories and the formulas are not in the normative examples. There
are valid and invalid ones, shuffled, and nothing says which is which. Some invalid ones have two defects; then the
reason of the first step in the order of section 7 of `registros-v1.md` counts. Each record comes written as JSON text,
in the `registroTexto` field of `entradas.json`, and has to be read as text (section 2 rejects repeated keys). The paths
of the certificate files are relative to the folder of `entradas.json`.

## What to do

Check each record from the specification alone, at commit dac2368 (the same bytes as the package `fase2b-para-gpt.zip`):

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `especificacao/registros-v1.md` | 15289 | `ca61687eddbedd5b158a0c77768522abcbb3abaa93b2352110076ff26b47007a` |
| `especificacao/modelos-exatos-t1.md` | 8913 | `fc17eac43eb8f2b95df186879545f55480aac0e367e9bbc2976c3a03d4b8e56b` |
| `especificacao/traducao-z3-t1.md` | 10576 | `abce21ce9786b19e914c0f829f6e3739f56d71645f50587c15f2f3eae6b248bf` |
| `especificacao/gramatica-m2.md` | 23870 | `f38d7af13e18b5acb731cf62a3bb5d1c4592659d21dfd221c060d4383df1d5dc` |
| `especificacao/lexico-m2.json` | 32461 | `0fa7876fabecb42ae4fddb9ea8c7c12a7288b802dac393a49f3c32457215266c` |
| `especificacao/provas-t1/README.md` | 20031 | `3c0ff0bd347322e23b4213f8ebe5a2e465beeae4800f84ae7b4859f4271af2bd` |
| `especificacao/provas-t1/regras.rare` | 3273 | `ffbfc076411a039624a55dfbb9f0c588996aeac10bb8e72161cd64039b071fad` |

(These are the bytes at commit dac2368; the files have changed since then, and the reference stays the commit.)

Without Carcara: a proof stays pending. For each record, one of these results:

- `aceito` (accepted);
- `recusado` (rejected), with the `motivo` (reason, R1 to R12);
- `pendente` (pending), when only the proof is missing.

## The answer

A JSON file, like this:

```json
{"lote": "registros-cego-1", "resultados": [{"id": "L01", "veredito": "recusado", "motivo": "R4"}, {"id": "L02", "veredito": "pendente"}]}
```

Along with it, its SHA-256 and the code used, with the SHA-256 of each file. All before seeing the Caderno's answers.

## The Caderno's commitment

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `caderno.json`: the Caderno's answers, with a salt | 10166 | `5ab1cb73a384bcb58a1c7dea12da8322c7e71a7314ff8066fd0c1b1e5f397b3d` |
| `previsao.txt`: where the Caderno predicts divergence, and why | 4225 | `b5cff539b47ef063a87b914b1550e8fb23783f7d7c04ae9665a5dc0ce511f5eb` |

Both are only shown after GPT's answer arrives. After that, the public verifier checks the pending proofs with Carcara.
