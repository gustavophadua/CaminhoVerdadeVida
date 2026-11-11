# From the author

**Português:** [README.md](README.md). This is a translation; if the two differ, the Portuguese text prevails.

Works by the author of Cosmos, public since 2026-11-11 by the author's decision. They are not results of Cosmos: they are
what the author thinks. What the verifier has already checked is marked as checked, and the rest is still the author's
hypothesis.

| Folder | What it is |
|---|---|
| `projeto-tubo/` | The Alpha and Omega model, the Tube. `PROMPT.md` gathers what the author said (Appendix A, as it was written), what is supposition (S1 to S16), the open decisions (D1 to D35) and what has been checked. With it come the machine (`maquina-do-tubo.html`), the checks through Z3, the 22 plates (`ilustracoes/`) and the base `base-tubo-v1.json` for the verifier. |
| `principia/` | The Principia: the text (`principia-texto.txt`, extracted from the original PDF page by page) and the notes organized for the app (`principia.json`: 68 notes and 38 dictionary terms, with the checks made by the app from 2026-10-10 to 2026-10-12). |

The English translations sit next to the originals, with `.en` in the name. In every case the Portuguese original
prevails.

## What changed on publication

- The author's own name was replaced with "[nome do autor]" ("[author's name]"), in the text and in the "titular" field
  of the notes. Nothing else was changed in the text.
- In `principia-texto.txt`, the 26 characters that the PDF extraction lost (subscripts such as ⱼ) appear as "�".
- In the Tube tests (`projeto-tubo/cosmos/`), the path to the base is now the one in this repository.

## How to use

- **The machine:** open `projeto-tubo/maquina-do-tubo.html` in the browser. The engine tests, inside the folder:
  `node teste-do-motor.js maquina-do-tubo.html`.
- **The checks in Python** (`confere-z3.py`, `equacoes-sem-solucao.py`, `solucoes-z3.py`, `multiverso-z3.py`,
  `pi-confere.py`, `comprovador.py`, `ponte.py`, `godel.py`) need Python's `z3-solver` package.
- **The Tube in the Cosmos verifier**, at the root of the repository:
  `npx vitest run --config autor/projeto-tubo/cosmos/vitest.config.ts`. Each test file opens Z3 (about
  2 GB), which is why they stay out of the CI suite.
- **Checking sentences against the Tube in the Conversation:** copy `projeto-tubo/base-tubo-v1.json` to `privado/bases/`
  and choose "a base local tubo-v1" (the local base tubo-v1) (`especificacao/bases-locais-v1.md`). The base adds the
  recorded reality to the rules of the Tube.

## Limits

- "Checked by Z3" means that the conclusion follows from the written rules, not that the model describes the world.
- Many rules of the machine are still suppositions awaiting the author's decision.
- `Selo.pdf` carries the five initial images and four photos of the notebook. The fifth image uses an electromagnetic
  wave diagram of unrecorded origin, which may belong to a third party.
- `PROMPT.md` cites `graficos-gen.js`, which is not in the folder, and links to the author's private artifacts, which do
  not open for other people.
- The collaborator's text (Appendix A.2 of `PROMPT.md`) is quoted, without the collaborator's name, for the critique in
  section 3.4.

## License

The code in the folders is under AGPL-3.0-or-later. The author's texts and images are under CC BY 4.0 since 2026-11-11
(`LICENSES/CC-BY-4.0.txt`): anyone may copy, adapt and reuse them, including commercially, provided they give credit
and indicate what changed. Credit: "by the author of Cosmos (github.com/gustavophadua/Cosmos), CC BY 4.0".

Left out of that license are the third-party elements: the electromagnetic wave diagram in the fifth image of `Selo.pdf`
and the collaborator's text (Appendix A.2 of `PROMPT.md`). Details in `LICENCAS.en.md`.
