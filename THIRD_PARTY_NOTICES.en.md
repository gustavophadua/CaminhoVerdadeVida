# Third-party notices

**Português:** [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). This is a translation; if the two differ, the
Portuguese text prevails.

The Caderno Lógico includes, or ships in the published app, these third-party
works, each under its own license. The full texts are in
[LICENSES/](LICENSES/).

| What | Where | License | Text |
| --- | --- | --- | --- |
| 17 rewrite rules from Carcara | `especificacao/provas-t1/regras.rare` | Apache-2.0, by the authors of Carcara | [LICENSES/Apache-2.0.txt](LICENSES/Apache-2.0.txt) |
| Ranges of the Unicode 16.0 L and N classes | `src/logica/unicode16.ts` | Unicode License V3, © 1991-2026 Unicode, Inc. | [LICENSES/Unicode-3.0.txt](LICENSES/Unicode-3.0.txt) |
| Preact | Bundled in the app | MIT, © 2015-present Jason Miller | [LICENSES/MIT-preact.txt](LICENSES/MIT-preact.txt) |
| TweetNaCl.js 1.0.3 | Ed25519 signatures of the Cosmos seal | Unlicense, public domain | [LICENSES/Unlicense-tweetnacl.txt](LICENSES/Unlicense-tweetnacl.txt) |
| @scure/bip32 2.4.0 | secp256k1 derivation in the V4 lab | MIT, Patricio Palladino / Paul Miller | [LICENSES/MIT-scure-bip32.txt](LICENSES/MIT-scure-bip32.txt) |
| @scure/base 2.4.0 | Local Bech32 encoding, V4 | MIT, Paul Miller | [LICENSES/MIT-scure-base.txt](LICENSES/MIT-scure-base.txt) |
| @noble/hashes 2.4.0 | SHA-256 and RIPEMD-160, V4 | MIT, Paul Miller | [LICENSES/MIT-noble-hashes.txt](LICENSES/MIT-noble-hashes.txt) |
| @noble/curves 2.4.0 | secp256k1 dependency of scure/bip32 | MIT, Paul Miller | [LICENSES/MIT-noble-curves.txt](LICENSES/MIT-noble-curves.txt) |
| React / React DOM 19.3.1 | Three product interfaces; separate historical Preact core | MIT, Meta Platforms | [React](LICENSES/MIT-react.txt), [React DOM](LICENSES/MIT-react-dom.txt) |
| shadcn/ui | Button/Input adapted in `src/interfaces/ui/` | MIT, shadcn | [LICENSES/MIT-shadcn.txt](LICENSES/MIT-shadcn.txt) |
| Radix Slot / Compose Refs | Primitive of the shadcn components | MIT, WorkOS | [Slot](LICENSES/MIT-radix-slot.txt), [Compose Refs](LICENSES/MIT-radix-compose-refs.txt) |
| class-variance-authority 0.7.1 | Component variants | Apache-2.0 | [LICENSES/Apache-cva.txt](LICENSES/Apache-cva.txt) |
| clsx / tailwind-merge | Class composition | MIT | [clsx](LICENSES/MIT-clsx.txt), [tailwind-merge](LICENSES/MIT-tailwind-merge.txt) |
| Tailwind CSS 4.3.3 | CSS utilities without a global preflight | MIT, Tailwind Labs | [LICENSES/MIT-tailwindcss.txt](LICENSES/MIT-tailwindcss.txt) |
| JetBrains Mono Regular | Local font for the Terminal's numbers | SIL OFL-1.1, JetBrains | [LICENSES/OFL-JetBrainsMono.txt](LICENSES/OFL-JetBrainsMono.txt) |
| Z3 (z3-solver package) | Source and historical tests; development dependency, outside the V3/V4 web runtime | MIT, © Microsoft Corporation | [LICENSES/MIT-z3-solver.txt](LICENSES/MIT-z3-solver.txt) |
| Vite support snippet (the `modulepreload` polyfill) | Bundled in the app | MIT, © 2019-present, VoidZero Inc. and Vite contributors | [LICENSES/MIT-vite.txt](LICENSES/MIT-vite.txt) |

## Details

- **regras.rare** is a copy of 17 rules from the `rewrites.eo` file of
  [Carcara](https://github.com/ufmg-smite/carcara), at commit
  `394edbb15ba95c47893f1d821fddde7e016af178`. The only change, noted at the top
  of the file, is one of notation: in `or-not-refl`, the type parameter `T0` is now
  declared `@T0`. Carcara has no NOTICE file.
- **unicode16.ts** carries the ranges of letters and numbers from the Unicode 16.0
  character data, as Node ships them, read by the script
  `scripts/gerar-unicode16.mjs`. The Unicode license asks for its notice to
  accompany the data or its documentation.
- **Preact, Z3 and the Vite snippet** go into the published app: on the website, which carries
  this file and the `LICENSES/` folder along with it, and in the single-file build, which carries the
  notices in a comment at the top of the HTML.

## Data

- **Physical constants** (`src/dados/codata.ts`): CODATA 2018 values,
  recommended by NIST ([physics.nist.gov/constants](https://physics.nist.gov/constants)).
  They are numerical facts, and each note cites the source.
- **Wikidata**: the app queries Wikidata on the spot (data under CC0), and none of it
  stays in the repository.
- **TPTP**: the TPTP library is not in the repository. Whoever loads it on their
  device follows TPTP's own terms.

## Tools

The build and the tests use Vite, TypeScript, Vitest and other development
dependencies, each under its own license, which `npm install` brings into
`node_modules/`. Of these, only the Vite snippet from the table goes into the app. cvc5 and
Carcara, which generate and check the proofs, are not in the repository, apart from the
17 rules above. SymPy and mpmath (3-clause BSD license, each) are
installed by the conferir-provas workflow, at the versions and with the hashes in
`especificacao/provas-t1/requisitos.txt`, for the independent check of the
exact models; they are not in the repository either.
