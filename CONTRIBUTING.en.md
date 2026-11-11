# How to contribute to the Caderno Lógico

**Português:** [CONTRIBUTING.md](CONTRIBUTING.md). This is a translation; if the two differ, the Portuguese text
prevails.

This guide says how to propose a change and what each change needs in order to go in.

## The path

1. Open an issue saying what you want to change and why. For a bug, say how to
   reproduce it: the exact formula, the message and the browser.
2. Make the change in a fork, on a branch of its own, and open a pull request that cites the
   issue.
3. Run the tests before asking for review:
    - `npm test` must pass. The suite uses Z3 in WebAssembly; with little
      memory, run `npx vitest run --maxWorkers=3`.
    - `npm run typecheck` must not give errors.
    - If the change touches `especificacao/provas-t1/`,
      `python3 especificacao/provas-t1/conferir.py --sem-carcara` must
      pass, and so must the GitHub workflow "Conferir as provas" (check the proofs), with Carcara.
4. Every change comes with the test that checks it.

## What is versioned and does not change in place

- **The grammar** (`especificacao/gramatica-m2.md` and the m2 JSON files) is
  closed at commit `091f631`. Changing the language means creating m3; m2 does not change.
- **The translation to Z3** (`especificacao/traducao-z3-t1.md`) is closed at
  commit `11a6b3a`. Changing the meaning means creating t2; t1 does not change.
- **The normative examples** only grow: a published example does not change its
  answer without a new version.
- **What belongs to the verifier**: the RARE rules in
  `especificacao/provas-t1/regras.rare`, with the SHA-256 pinned in `conferir.py`.
  A new or changed rule is a new axiom. It only goes in through review, with the
  justification of why it holds, and the same pull request changes the hash in
  `conferir.py`.

## What never goes up

- Private content: the `privado/` folder stays out of Git.
- Keys, passwords, tokens or any other secret.
- Third-party text, data or code without the license and the credit; see
  [THIRD_PARTY_NOTICES.en.md](THIRD_PARTY_NOTICES.en.md).

## Audits

Anyone who wants to check the Caderno from the outside uses a blind batch. They record the SHA-256
of their own answers before seeing the Caderno's, and only then do both sides
reveal. Each divergence becomes an issue, with the exact case.

## The sign-off (DCO)

Each commit carries a sign-off line at the end of the message:

```
Signed-off-by: Your Name <your-email@example.org>
```

`git commit -s` adds this line by itself. With it, you declare what the
[Developer Certificate of Origin, version 1.1](https://developercertificate.org/) says:
that the contribution is yours, or that you have the right to submit it under these terms,
and that it may be published under the project's license. Nobody assigns rights to the
project, and so changing the license later requires the agreement of those who contributed.

Whoever contributes licenses the contribution under the terms of [LICENCAS.en.md](LICENCAS.en.md):
AGPL-3.0-or-later for code, CC BY 4.0 for texts and axioms.

## Security flaws

Do not open a public issue for a security flaw. The path is in
[SECURITY.en.md](SECURITY.en.md).
