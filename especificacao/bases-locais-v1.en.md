# Local bases v1: checking against a base of facts the person maintains

**Português:** [bases-locais-v1.md](bases-locais-v1.md). This is a translation; if the two differ, the Portuguese text
prevails. Field names are part of the format and stay in Portuguese.

Version `cosmos-base-v1`, 2026-11-11. Code: `src/motor/bases.ts`, the `ollama/realidade` route in
`src/integracoes/ollama-node.ts` and the choice of base in the Conversation (`src/interfaces/Produtos.tsx`). Tests:
`testes/bases.test.ts`, `testes/bases-consistencia.test.ts` and `testes/integracoes-ollama.test.ts`.

## 1. The problem

The layer of facts (`especificacao/realidade-v1.md`) checks each sentence against recorded reality, a small, public
base. Whoever works with a model of their own (a theory, a notebook, the rules of a project) wants to check against its
rules, with the same rigor, without publishing them. The local base solves this: it has the same format as
realidade-v1, stays on the person's computer and never goes into the repository.

## 2. Where the base lives and who reads it

- The local service (`npm` with `scripts/integracoes-p0.mjs --ollama`) reads the `*.json` files in the `privado/bases/`
  folder. The `privado/` folder is in `.gitignore`: nothing from there goes into Git.
- Up to 20 bases, of up to 2 MB each. A file that does not check out is left out, with the reason, and the AI's status
  (`ollama/estado`) lists the bases read and those rejected.
- The base does not leave the computer: Z3 runs in the local service, and the browser only receives the name of the
  base and the facts cited in each answer.

## 3. The format

```json
{
  "formato": "cosmos-base-v1",
  "nome": "pomar",
  "descricao": "Um pomar de exemplo.",
  "juntarCom": ["realidade-v1"],
  "vocabulario": [
    { "simbolo": "Macieira", "tipo": "predicado", "aridade": 1, "leitura": "x é uma macieira", "sinonimos": ["macieira"] }
  ],
  "fatos": [
    { "id": "P01", "enunciado": "Toda macieira é uma árvore.", "formula": "∀x (Macieira(x) ⟹ Arvore(x))", "fonte": { "nome": "definição" } }
  ]
}
```

(An example orchard: "x is an apple tree"; "Every apple tree is a tree"; source: definition.)

| Field | Rule |
|---|---|
| `nome` | lowercase letters, numbers and hyphens, up to 40; cannot be `realidade-v1` |
| `descricao` | up to 500 characters |
| `juntarCom` | optional; only `["realidade-v1"]`: the base adds recorded reality to its own rules |
| `vocabulario` | from 1 to 200 predicates; symbol with a capital letter, letters and numbers only; arity from 1 to 3; reading with `x`; up to 40 synonyms (realidade-v1's fixed alignment rule uses the synonyms) |
| `fatos` | from 1 to 500; id of up to 10 characters; statement in Portuguese; formula in m2 that parses with the vocabulary; source with a name and, if there is one, an `https://` address |

Added to realidade-v1, the base cannot redefine any of its symbols or facts (the ids `R01`…`R31` are reserved). An
unknown field is rejected: the file says exactly what the base has, nothing more.

## 4. No contradiction gets in

A contradictory base would turn everything into "fact": from the impossible anything follows. That is why, on the first
use of each base, Z3 checks that the whole base has a model (`conferirConsistencia`). If it does not:

- the route answers **409** (`cosmos-base-recusada-v1`) and confronts nothing;
- the AI's status then shows `consistente: false` and the colliding facts;
- the colliding facts are a **minimal set by inclusion**: found by removing one fact at a time; removing any one of them
  undoes the contradiction. There may be another minimal set; this one is what the order of the base produces.

If Z3 does not decide, the base is not used either, and the check is tried again on the next request.

## 5. The confrontation

With a base chosen, the layer of facts does exactly the same as always (alignment by synonyms, each sentence as fact,
contrary, observation or outside, the necessary facts, the mechanisms), only against that base. The answer carries
`base: { nome, fatos }`, with the cited facts and the sources, so that the interface can show any base. With no base
chosen, nothing changes: it is realidade-v1.

In the Conversation, when the service has local bases, the choice "Conferir os fatos contra" (Check the facts against)
appears: recorded reality or a local base. The choice stays on this device.

## 6. What the local base is not

- It is not truth about the world: it is what the person recorded. The card says "a base de fatos *name*" (the base of
  facts *name*), not "a realidade registrada" (recorded reality).
- It does not replace realidade-v1: whoever wants both uses `"juntarCom": ["realidade-v1"]`, and a contradiction between
  the base and reality shows up in the check of section 4.
