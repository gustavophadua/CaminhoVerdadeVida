# Licenses of the Caderno Lógico

**Português:** [LICENCAS.md](LICENCAS.md). This is a translation; if the two differ, the Portuguese text prevails. What
binds is always the text of each license.

Caderno Lógico — Copyright © 2026 Gustavo Phadua Silva da Costa and the authors of the
Caderno Lógico.

The authors of the Caderno Lógico are the people who have contributed to the project. The
Git history says who did what.

| What | License | Text |
| --- | --- | --- |
| The code: everything not in the rows below | GNU Affero General Public License, version 3 or later (AGPL-3.0-or-later) | [LICENSE](LICENSE) |
| The `especificacao/` folder (specifications, normative examples and certificates), except for the exceptions below, and the `.md` texts | Creative Commons Attribution 4.0 International (CC BY 4.0) | [LICENSES/CC-BY-4.0.txt](LICENSES/CC-BY-4.0.txt) |
| `especificacao/provas-t1/conferir.py`, `vinculo.py`, `modelos.py` and `registros.py` | AGPL-3.0-or-later (it is code) | [LICENSE](LICENSE) |
| `especificacao/provas-t1/independente/` (the code that GPT, by OpenAI, wrote at the author's request, from the specification alone; see the folder's README) | AGPL-3.0-or-later (it is code) | [LICENSE](LICENSE) |
| `especificacao/provas-t1/regras.rare` | Apache-2.0 (comes from Carcara) | [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) |
| Axioms and theories published in this repository | CC BY 4.0 | [LICENSES/CC-BY-4.0.txt](LICENSES/CC-BY-4.0.txt) |
| `src/dados/cifrado/principia.json` | None: all rights reserved | — |
| `autor/principia/` and the author's texts and images in `autor/projeto-tubo/` (the `.md` files, `Selo.pdf`, the plates and the images), except for the third-party elements listed in `autor/README.md` | CC BY 4.0, by the author's decision on 2026-11-11 | [LICENSES/CC-BY-4.0.txt](LICENSES/CC-BY-4.0.txt) |
| The code in `autor/projeto-tubo/` (`.js`, `.py`, `.html` and the tests in `cosmos/`) | AGPL-3.0-or-later (it is code) | [LICENSE](LICENSE) |
| Other third-party files and data | Each one's own license | [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) |

The English translations (`.en.md` files) follow the license of the text they translate.

## The code

The notice the license asks for, in the original:

```
Caderno Lógico
Copyright (C) 2026 Gustavo Phadua Silva da Costa e os autores do Caderno Lógico

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

Anyone who modifies the Caderno and offers the modified version as a service on the
network (a node, a validator, a website) must offer the source code of that version to
the people who use the service (section 13 of the license). The code of this version is at
<https://github.com/onethink-stack/cosmos>.

## Specifications, examples and texts

Under CC BY 4.0, anyone may copy, distribute and adapt this material, including for
commercial use, provided they give credit: the names of the authors, the copyright
notice, a reference to the license and to the absence of warranties, a link to the
material and an indication of what was changed.

Suggested credit: "Caderno Lógico, © 2026 Gustavo Phadua Silva da Costa and the
authors of the Caderno Lógico, CC BY 4.0, https://github.com/onethink-stack/cosmos".

## The Principia

The file `src/dados/cifrado/principia.json` holds the author's Principia, encrypted. It
is not under any of the licenses of this repository: all rights are reserved to the
author. Copying the encrypted file grants no rights over its content. Since 2026-11-11
the author has also published the Principia in clear text, without the author's
personal name, in `autor/principia/`, under CC BY 4.0 (row above).

## Contributions

Whoever contributes licenses the contribution under the same terms: AGPL-3.0-or-later
for code, CC BY 4.0 for texts and axioms. Each commit carries the DCO sign-off. The
step-by-step guide is in [CONTRIBUTING.en.md](CONTRIBUTING.en.md).
