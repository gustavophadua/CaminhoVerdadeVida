# License inventory

**Português:** [licencas.md](licencas.md). This is a translation; if the two differ, the Portuguese text prevails.

Local check of 2026-10-30, complemented on 2026-10-31, without installation. A declarative inventory, not a legal opinion. The npm entries below come from the metadata of `package-lock.json`; a declared license does not amount to an audit of each distributed file. Optional packages for other platforms are listed because they are in the lockfile.

## Main pieces

| Piece | Version/reference | License and origin |
|---|---|---|
| Cosmos | package.json 0.1.0; base 63d31ff | AGPL-3.0-or-later, LICENSE and package.json |
| Own data | corpus documented in proveniencia-treino.md | CC BY 4.0 declared by the project; attribution and origin per batch |
| Qwen3-4B | training revision still to be pinned; Ollama qwen3:4b 359d7dd4bcda is a distinct artifact | Apache 2.0 in the specific repository https://huggingface.co/Qwen/Qwen3-4B/blob/main/LICENSE ; check the distributed revision and quantization |
| gpt-oss-120b via Groq | optional service; weights not distributed here | Weights Apache 2.0 in the [official upstream](https://github.com/openai/gpt-oss/blob/main/LICENSE); use of the service also subject to the Groq agreement https://console.groq.com/docs/legal/services-agreement |
| cvc5 | 1.4.2, according to scripts/conferir-cpc.py | Modified BSD (3 clauses) in the COPYING of tag cvc5-1.4.2, checked on 2026-10-30: https://raw.githubusercontent.com/cvc5/cvc5/cvc5-1.4.2/COPYING ; optional GPL/LGPL dependencies and the concrete build require examination |
| Carcara | there is a version/fork in the proofs documentation; revision per certificate | Apache 2.0 on upstream main, checked on 2026-10-30: https://raw.githubusercontent.com/ufmg-smite/carcara/main/LICENSE ; confirm the revision/fork of each certificate |
| Ethos | 0.2.5, reference 08e4aa4 according to especificacao/provas-t1/README.md | BSD-3-Clause in the [upstream main COPYING](https://github.com/cvc5/ethos/blob/main/COPYING), consulted 2026-10-31; associated GMP LGPLv3. The COPYING of historical commit 08e4aa4 was not confirmed in this consultation. |
| Lean | 4.34.0, documented in especificacao/provas-t1/README.md | Apache 2.0 in the [Lean upstream](https://github.com/leanprover/lean4/blob/master/LICENSE); confirm the notices of the exact distribution/revision. Not run in this mission. |
| Logos | a4ab2f8, revision indicated by cvc5 1.4.2, according to the proofs README | License not identified in the documented history; CI run without redistribution. Do not infer Lean's license for Logos. Clarification with the rights holder pending before distributing source/binary. |

## Direct and transitive npm dependencies

One line per location in the lockfile; duplicate versions may appear. `z3-solver` is included with its resolved version, besides being a devDependency of the project. There was no change of dependency.

| Name | Resolved version | Declared license | Recorded origin |
|---|---|---|---|
| @babel/code-frame | 7.29.7 | MIT | https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz |
| @babel/compat-data | 7.29.7 | MIT | https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz |
| @babel/core | 7.29.7 | MIT | https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz |
| @babel/generator | 7.29.8 | MIT | https://registry.npmjs.org/@babel/generator/-/generator-7.29.8.tgz |
| @babel/helper-annotate-as-pure | 7.29.7 | MIT | https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.29.7.tgz |
| @babel/helper-compilation-targets | 7.29.7 | MIT | https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz |
| @babel/helper-globals | 7.29.7 | MIT | https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz |
| @babel/helper-module-imports | 7.29.7 | MIT | https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz |
| @babel/helper-module-transforms | 7.29.7 | MIT | https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz |
| @babel/helper-plugin-utils | 7.29.7 | MIT | https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.29.7.tgz |
| @babel/helper-string-parser | 7.29.7 | MIT | https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz |
| @babel/helper-validator-identifier | 7.29.7 | MIT | https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz |
| @babel/helper-validator-option | 7.29.7 | MIT | https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz |
| @babel/helpers | 7.29.10 | MIT | https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.10.tgz |
| @babel/parser | 7.29.9 | MIT | https://registry.npmjs.org/@babel/parser/-/parser-7.29.9.tgz |
| @babel/plugin-syntax-jsx | 7.29.7 | MIT | https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.29.7.tgz |
| @babel/plugin-transform-react-jsx | 7.29.7 | MIT | https://registry.npmjs.org/@babel/plugin-transform-react-jsx/-/plugin-transform-react-jsx-7.29.7.tgz |
| @babel/plugin-transform-react-jsx-development | 7.29.7 | MIT | https://registry.npmjs.org/@babel/plugin-transform-react-jsx-development/-/plugin-transform-react-jsx-development-7.29.7.tgz |
| @babel/template | 7.29.7 | MIT | https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz |
| @babel/traverse | 7.29.10 | MIT | https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.10.tgz |
| @babel/types | 7.29.8 | MIT | https://registry.npmjs.org/@babel/types/-/types-7.29.8.tgz |
| @emnapi/runtime | 1.11.3 | MIT | https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.3.tgz |
| @img/colour | 1.1.0 | MIT | https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz |
| @img/sharp-darwin-arm64 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.35.5.tgz |
| @img/sharp-darwin-x64 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.35.5.tgz |
| @img/sharp-freebsd-wasm32 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-freebsd-wasm32/-/sharp-freebsd-wasm32-0.35.5.tgz |
| @img/sharp-libvips-darwin-arm64 | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.3.4.tgz |
| @img/sharp-libvips-darwin-x64 | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.3.4.tgz |
| @img/sharp-libvips-linux-arm | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.3.4.tgz |
| @img/sharp-libvips-linux-arm64 | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.3.4.tgz |
| @img/sharp-libvips-linux-ppc64 | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.3.4.tgz |
| @img/sharp-libvips-linux-riscv64 | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.3.4.tgz |
| @img/sharp-libvips-linux-s390x | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.3.4.tgz |
| @img/sharp-libvips-linux-x64 | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.3.4.tgz |
| @img/sharp-libvips-linuxmusl-arm64 | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.3.4.tgz |
| @img/sharp-libvips-linuxmusl-x64 | 1.3.4 | LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.3.4.tgz |
| @img/sharp-linux-arm | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.35.5.tgz |
| @img/sharp-linux-arm64 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.35.5.tgz |
| @img/sharp-linux-ppc64 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.35.5.tgz |
| @img/sharp-linux-riscv64 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.35.5.tgz |
| @img/sharp-linux-s390x | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.35.5.tgz |
| @img/sharp-linux-x64 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.35.5.tgz |
| @img/sharp-linuxmusl-arm64 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.35.5.tgz |
| @img/sharp-linuxmusl-x64 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.35.5.tgz |
| @img/sharp-wasm32 | 0.35.5 | Apache-2.0 AND LGPL-3.0-or-later AND MIT | https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.35.5.tgz |
| @img/sharp-webcontainers-wasm32 | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/@img/sharp-webcontainers-wasm32/-/sharp-webcontainers-wasm32-0.35.5.tgz |
| @img/sharp-win32-arm64 | 0.35.5 | Apache-2.0 AND LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.35.5.tgz |
| @img/sharp-win32-ia32 | 0.35.5 | Apache-2.0 AND LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.35.5.tgz |
| @img/sharp-win32-x64 | 0.35.5 | Apache-2.0 AND LGPL-3.0-or-later | https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.35.5.tgz |
| @jridgewell/gen-mapping | 0.3.13 | MIT | https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz |
| @jridgewell/remapping | 2.3.5 | MIT | https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz |
| @jridgewell/resolve-uri | 3.1.2 | MIT | https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz |
| @jridgewell/sourcemap-codec | 1.6.0 | MIT | https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz |
| @jridgewell/trace-mapping | 0.3.31 | MIT | https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz |
| @noble/curves | 2.4.0 | MIT | https://registry.npmjs.org/@noble/curves/-/curves-2.4.0.tgz |
| @noble/hashes | 2.4.0 | MIT | https://registry.npmjs.org/@noble/hashes/-/hashes-2.4.0.tgz |
| @oxc-project/types | 0.153.0 | MIT | https://registry.npmjs.org/@oxc-project/types/-/types-0.153.0.tgz |
| @preact/preset-vite | 2.10.6 | MIT | https://registry.npmjs.org/@preact/preset-vite/-/preset-vite-2.10.6.tgz |
| @prefresh/babel-plugin | 0.5.4 | MIT | https://registry.npmjs.org/@prefresh/babel-plugin/-/babel-plugin-0.5.4.tgz |
| @prefresh/core | 1.5.11 | MIT | https://registry.npmjs.org/@prefresh/core/-/core-1.5.11.tgz |
| @prefresh/utils | 1.2.1 | MIT | https://registry.npmjs.org/@prefresh/utils/-/utils-1.2.1.tgz |
| @prefresh/vite | 2.4.12 | MIT | https://registry.npmjs.org/@prefresh/vite/-/vite-2.4.12.tgz |
| @rollup/pluginutils | 4.2.1 | MIT | https://registry.npmjs.org/@rollup/pluginutils/-/pluginutils-4.2.1.tgz |
| picomatch | 2.3.2 | MIT | https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz |
| @radix-ui/react-compose-refs | 1.1.5 | MIT | https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.5.tgz |
| @radix-ui/react-slot | 1.5.0 | MIT | https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.5.0.tgz |
| @rolldown/binding-android-arm-eabi | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-android-arm-eabi/-/binding-android-arm-eabi-1.2.13.tgz |
| @rolldown/binding-android-arm64 | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.2.13.tgz |
| @rolldown/binding-darwin-arm64 | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.2.13.tgz |
| @rolldown/binding-darwin-x64 | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.2.13.tgz |
| @rolldown/binding-freebsd-x64 | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.2.13.tgz |
| @rolldown/binding-linux-arm-gnueabihf | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.2.13.tgz |
| @rolldown/binding-linux-arm64-gnu | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.2.13.tgz |
| @rolldown/binding-linux-arm64-musl | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.2.13.tgz |
| @rolldown/binding-linux-ppc64-gnu | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.2.13.tgz |
| @rolldown/binding-linux-s390x-gnu | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.2.13.tgz |
| @rolldown/binding-linux-x64-gnu | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.2.13.tgz |
| @rolldown/binding-linux-x64-musl | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.2.13.tgz |
| @rolldown/binding-openharmony-arm64 | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.2.13.tgz |
| @rolldown/binding-win32-arm64-msvc | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.2.13.tgz |
| @rolldown/binding-win32-x64-msvc | 1.2.13 | MIT | https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.2.13.tgz |
| @rolldown/pluginutils | 1.0.1 | MIT | https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz |
| @rollup/pluginutils | 5.4.0 | MIT | https://registry.npmjs.org/@rollup/pluginutils/-/pluginutils-5.4.0.tgz |
| @scure/base | 2.4.0 | MIT | https://registry.npmjs.org/@scure/base/-/base-2.4.0.tgz |
| @scure/bip32 | 2.4.0 | MIT | https://registry.npmjs.org/@scure/bip32/-/bip32-2.4.0.tgz |
| @tailwindcss/node | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/node/-/node-4.3.3.tgz |
| lightningcss | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz |
| lightningcss-android-arm64 | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz |
| lightningcss-darwin-arm64 | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz |
| lightningcss-darwin-x64 | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz |
| lightningcss-freebsd-x64 | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz |
| lightningcss-linux-arm-gnueabihf | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz |
| lightningcss-linux-arm64-gnu | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz |
| lightningcss-linux-arm64-musl | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz |
| lightningcss-linux-x64-gnu | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz |
| lightningcss-linux-x64-musl | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz |
| lightningcss-win32-arm64-msvc | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz |
| lightningcss-win32-x64-msvc | 1.32.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz |
| @tailwindcss/oxide | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.3.3.tgz |
| @tailwindcss/oxide-android-arm64 | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.3.tgz |
| @tailwindcss/oxide-darwin-arm64 | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.3.tgz |
| @tailwindcss/oxide-darwin-x64 | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.3.tgz |
| @tailwindcss/oxide-freebsd-x64 | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.3.tgz |
| @tailwindcss/oxide-linux-arm-gnueabihf | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.3.tgz |
| @tailwindcss/oxide-linux-arm64-gnu | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.3.tgz |
| @tailwindcss/oxide-linux-arm64-musl | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.3.tgz |
| @tailwindcss/oxide-linux-x64-gnu | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.3.tgz |
| @tailwindcss/oxide-linux-x64-musl | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.3.tgz |
| @tailwindcss/oxide-wasm32-wasi | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.3.tgz |
| @tailwindcss/oxide-win32-arm64-msvc | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.3.tgz |
| @tailwindcss/oxide-win32-x64-msvc | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.3.tgz |
| @tailwindcss/vite | 4.3.3 | MIT | https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.3.3.tgz |
| @types/chai | 5.2.3 | MIT | https://registry.npmjs.org/@types/chai/-/chai-5.2.3.tgz |
| @types/deep-eql | 4.0.2 | MIT | https://registry.npmjs.org/@types/deep-eql/-/deep-eql-4.0.2.tgz |
| @types/estree | 1.0.9 | MIT | https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz |
| @types/node | 22.20.5 | MIT | https://registry.npmjs.org/@types/node/-/node-22.20.5.tgz |
| @types/react | 19.3.0 | MIT | https://registry.npmjs.org/@types/react/-/react-19.3.0.tgz |
| @types/react-dom | 19.3.0 | MIT | https://registry.npmjs.org/@types/react-dom/-/react-dom-19.3.0.tgz |
| @typescript/typescript-aix-ppc64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-aix-ppc64/-/typescript-aix-ppc64-7.0.2.tgz |
| @typescript/typescript-darwin-arm64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-darwin-arm64/-/typescript-darwin-arm64-7.0.2.tgz |
| @typescript/typescript-darwin-x64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-darwin-x64/-/typescript-darwin-x64-7.0.2.tgz |
| @typescript/typescript-freebsd-arm64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-freebsd-arm64/-/typescript-freebsd-arm64-7.0.2.tgz |
| @typescript/typescript-freebsd-x64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-freebsd-x64/-/typescript-freebsd-x64-7.0.2.tgz |
| @typescript/typescript-linux-arm | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-linux-arm/-/typescript-linux-arm-7.0.2.tgz |
| @typescript/typescript-linux-arm64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-linux-arm64/-/typescript-linux-arm64-7.0.2.tgz |
| @typescript/typescript-linux-loong64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-linux-loong64/-/typescript-linux-loong64-7.0.2.tgz |
| @typescript/typescript-linux-mips64el | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-linux-mips64el/-/typescript-linux-mips64el-7.0.2.tgz |
| @typescript/typescript-linux-ppc64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-linux-ppc64/-/typescript-linux-ppc64-7.0.2.tgz |
| @typescript/typescript-linux-riscv64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-linux-riscv64/-/typescript-linux-riscv64-7.0.2.tgz |
| @typescript/typescript-linux-s390x | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-linux-s390x/-/typescript-linux-s390x-7.0.2.tgz |
| @typescript/typescript-linux-x64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-linux-x64/-/typescript-linux-x64-7.0.2.tgz |
| @typescript/typescript-netbsd-arm64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-netbsd-arm64/-/typescript-netbsd-arm64-7.0.2.tgz |
| @typescript/typescript-netbsd-x64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-netbsd-x64/-/typescript-netbsd-x64-7.0.2.tgz |
| @typescript/typescript-openbsd-arm64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-openbsd-arm64/-/typescript-openbsd-arm64-7.0.2.tgz |
| @typescript/typescript-openbsd-x64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-openbsd-x64/-/typescript-openbsd-x64-7.0.2.tgz |
| @typescript/typescript-sunos-x64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-sunos-x64/-/typescript-sunos-x64-7.0.2.tgz |
| @typescript/typescript-win32-arm64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-win32-arm64/-/typescript-win32-arm64-7.0.2.tgz |
| @typescript/typescript-win32-x64 | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/@typescript/typescript-win32-x64/-/typescript-win32-x64-7.0.2.tgz |
| @vitest/mocker | 5.0.3 | MIT | https://registry.npmjs.org/@vitest/mocker/-/mocker-5.0.3.tgz |
| estree-walker | 3.0.3 | MIT | https://registry.npmjs.org/estree-walker/-/estree-walker-3.0.3.tgz |
| magic-string | 1.4.3 | MIT | https://registry.npmjs.org/magic-string/-/magic-string-1.4.3.tgz |
| @vitest/spy | 5.0.3 | MIT | https://registry.npmjs.org/@vitest/spy/-/spy-5.0.3.tgz |
| assertion-error | 2.0.1 | MIT | https://registry.npmjs.org/assertion-error/-/assertion-error-2.0.1.tgz |
| async-mutex | 0.3.2 | MIT | https://registry.npmjs.org/async-mutex/-/async-mutex-0.3.2.tgz |
| babel-plugin-transform-hook-names | 1.0.2 | MIT | https://registry.npmjs.org/babel-plugin-transform-hook-names/-/babel-plugin-transform-hook-names-1.0.2.tgz |
| baseline-browser-mapping | 2.11.28 | Apache-2.0 | https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.28.tgz |
| boolbase | 1.0.0 | ISC | https://registry.npmjs.org/boolbase/-/boolbase-1.0.0.tgz |
| braces | 3.0.3 | MIT | https://registry.npmjs.org/braces/-/braces-3.0.3.tgz |
| browserslist | 4.29.3 | MIT | https://registry.npmjs.org/browserslist/-/browserslist-4.29.3.tgz |
| caniuse-lite | 1.0.30001815 | CC-BY-4.0 | https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001815.tgz |
| chai | 6.3.0 | MIT | https://registry.npmjs.org/chai/-/chai-6.3.0.tgz |
| class-variance-authority | 0.7.1 | Apache-2.0 | https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.1.tgz |
| clsx | 2.1.1 | MIT | https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz |
| convert-source-map | 2.0.0 | MIT | https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz |
| css-select | 5.2.2 | BSD-2-Clause | https://registry.npmjs.org/css-select/-/css-select-5.2.2.tgz |
| css-what | 6.2.2 | BSD-2-Clause | https://registry.npmjs.org/css-what/-/css-what-6.2.2.tgz |
| csstype | 3.2.3 | MIT | https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz |
| debug | 4.4.3 | MIT | https://registry.npmjs.org/debug/-/debug-4.4.3.tgz |
| detect-libc | 2.1.2 | Apache-2.0 | https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz |
| dom-serializer | 2.0.0 | MIT | https://registry.npmjs.org/dom-serializer/-/dom-serializer-2.0.0.tgz |
| domelementtype | 2.3.0 | BSD-2-Clause | https://registry.npmjs.org/domelementtype/-/domelementtype-2.3.0.tgz |
| domhandler | 5.0.3 | BSD-2-Clause | https://registry.npmjs.org/domhandler/-/domhandler-5.0.3.tgz |
| domutils | 3.2.2 | BSD-2-Clause | https://registry.npmjs.org/domutils/-/domutils-3.2.2.tgz |
| electron-to-chromium | 1.5.452 | ISC | https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.452.tgz |
| enhanced-resolve | 5.26.0 | MIT | https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.26.0.tgz |
| entities | 4.5.0 | BSD-2-Clause | https://registry.npmjs.org/entities/-/entities-4.5.0.tgz |
| es-module-lexer | 2.3.2 | MIT | https://registry.npmjs.org/es-module-lexer/-/es-module-lexer-2.3.2.tgz |
| escalade | 3.2.0 | MIT | https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz |
| estree-walker | 2.0.2 | MIT | https://registry.npmjs.org/estree-walker/-/estree-walker-2.0.2.tgz |
| expect-type | 1.4.0 | Apache-2.0 | https://registry.npmjs.org/expect-type/-/expect-type-1.4.0.tgz |
| fake-indexeddb | 6.2.5 | Apache-2.0 | https://registry.npmjs.org/fake-indexeddb/-/fake-indexeddb-6.2.5.tgz |
| fdir | 6.5.0 | MIT | https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz |
| fill-range | 7.1.1 | MIT | https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz |
| fsevents | 2.3.3 | MIT | https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz |
| gensync | 1.0.0-beta.2 | MIT | https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz |
| graceful-fs | 4.2.11 | ISC | https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz |
| he | 1.2.0 | MIT | https://registry.npmjs.org/he/-/he-1.2.0.tgz |
| is-number | 7.0.0 | MIT | https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz |
| jiti | 2.7.0 | MIT | https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz |
| js-tokens | 4.0.0 | MIT | https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz |
| jsesc | 3.1.0 | MIT | https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz |
| json5 | 2.2.3 | MIT | https://registry.npmjs.org/json5/-/json5-2.2.3.tgz |
| kolorist | 1.8.0 | MIT | https://registry.npmjs.org/kolorist/-/kolorist-1.8.0.tgz |
| lightningcss | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss/-/lightningcss-1.33.0.tgz |
| lightningcss-android-arm64 | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.33.0.tgz |
| lightningcss-darwin-arm64 | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.33.0.tgz |
| lightningcss-darwin-x64 | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.33.0.tgz |
| lightningcss-freebsd-x64 | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.33.0.tgz |
| lightningcss-linux-arm-gnueabihf | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.33.0.tgz |
| lightningcss-linux-arm64-gnu | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.33.0.tgz |
| lightningcss-linux-arm64-musl | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.33.0.tgz |
| lightningcss-linux-x64-gnu | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.33.0.tgz |
| lightningcss-linux-x64-musl | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.33.0.tgz |
| lightningcss-win32-arm64-msvc | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.33.0.tgz |
| lightningcss-win32-x64-msvc | 1.33.0 | MPL-2.0 | https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.33.0.tgz |
| lru-cache | 5.1.1 | ISC | https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz |
| magic-string | 0.30.21 | MIT | https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz |
| micromatch | 4.0.8 | MIT | https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz |
| picomatch | 2.3.2 | MIT | https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz |
| ms | 2.1.3 | MIT | https://registry.npmjs.org/ms/-/ms-2.1.3.tgz |
| nanoid | 3.3.20 | MIT | https://registry.npmjs.org/nanoid/-/nanoid-3.3.20.tgz |
| node-html-parser | 6.1.13 | MIT | https://registry.npmjs.org/node-html-parser/-/node-html-parser-6.1.13.tgz |
| node-releases | 2.0.58 | MIT | https://registry.npmjs.org/node-releases/-/node-releases-2.0.58.tgz |
| nth-check | 2.1.1 | BSD-2-Clause | https://registry.npmjs.org/nth-check/-/nth-check-2.1.1.tgz |
| obug | 2.2.1 | MIT | https://registry.npmjs.org/obug/-/obug-2.2.1.tgz |
| picocolors | 1.1.1 | ISC | https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz |
| picomatch | 4.0.7 | MIT | https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz |
| postcss | 8.5.29 | MIT | https://registry.npmjs.org/postcss/-/postcss-8.5.29.tgz |
| preact | 11.0.1 | MIT | https://registry.npmjs.org/preact/-/preact-11.0.1.tgz |
| react | 19.3.1 | MIT | https://registry.npmjs.org/react/-/react-19.3.1.tgz |
| react-dom | 19.3.1 | MIT | https://registry.npmjs.org/react-dom/-/react-dom-19.3.1.tgz |
| rolldown | 1.2.13 | MIT | https://registry.npmjs.org/rolldown/-/rolldown-1.2.13.tgz |
| scheduler | 0.28.0 | MIT | https://registry.npmjs.org/scheduler/-/scheduler-0.28.0.tgz |
| semver | 6.3.1 | ISC | https://registry.npmjs.org/semver/-/semver-6.3.1.tgz |
| sharp | 0.35.5 | Apache-2.0 | https://registry.npmjs.org/sharp/-/sharp-0.35.5.tgz |
| semver | 7.8.5 | ISC | https://registry.npmjs.org/semver/-/semver-7.8.5.tgz |
| simple-code-frame | 1.3.0 | MIT | https://registry.npmjs.org/simple-code-frame/-/simple-code-frame-1.3.0.tgz |
| source-map | 0.7.6 | BSD-3-Clause | https://registry.npmjs.org/source-map/-/source-map-0.7.6.tgz |
| source-map-js | 1.2.2 | BSD-3-Clause | https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.2.tgz |
| stack-trace | 1.0.0 | MIT | https://registry.npmjs.org/stack-trace/-/stack-trace-1.0.0.tgz |
| std-env | 4.3.0 | MIT | https://registry.npmjs.org/std-env/-/std-env-4.3.0.tgz |
| tailwind-merge | 3.7.0 | MIT | https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.7.0.tgz |
| tailwindcss | 4.3.3 | MIT | https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.3.tgz |
| tapable | 2.3.3 | MIT | https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz |
| tinybench | 6.2.1 | MIT | https://registry.npmjs.org/tinybench/-/tinybench-6.2.1.tgz |
| tinyexec | 1.3.1 | MIT | https://registry.npmjs.org/tinyexec/-/tinyexec-1.3.1.tgz |
| tinyglobby | 0.2.17 | MIT | https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz |
| to-regex-range | 5.0.1 | MIT | https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz |
| tslib | 2.8.1 | 0BSD | https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz |
| tweetnacl | 1.0.3 | Unlicense | https://registry.npmjs.org/tweetnacl/-/tweetnacl-1.0.3.tgz |
| typescript | 7.0.2 | Apache-2.0 | https://registry.npmjs.org/typescript/-/typescript-7.0.2.tgz |
| undici-types | 6.21.0 | MIT | https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz |
| update-browserslist-db | 1.3.4 | MIT | https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.4.tgz |
| vite | 8.3.4 | MIT | https://registry.npmjs.org/vite/-/vite-8.3.4.tgz |
| vite-plugin-singlefile | 2.3.3 | MIT | https://registry.npmjs.org/vite-plugin-singlefile/-/vite-plugin-singlefile-2.3.3.tgz |
| vite-prerender-plugin | 0.5.14 | MIT | https://registry.npmjs.org/vite-prerender-plugin/-/vite-prerender-plugin-0.5.14.tgz |
| vitest | 5.0.3 | MIT | https://registry.npmjs.org/vitest/-/vitest-5.0.3.tgz |
| magic-string | 1.4.3 | MIT | https://registry.npmjs.org/magic-string/-/magic-string-1.4.3.tgz |
| why-is-node-running | 3.2.1 | MIT | https://registry.npmjs.org/why-is-node-running/-/why-is-node-running-3.2.1.tgz |
| yallist | 3.1.1 | ISC | https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz |
| z3-solver | 5.2.0 | MIT | https://registry.npmjs.org/z3-solver/-/z3-solver-5.2.0.tgz |
| zimmerframe | 1.1.5 | MIT | https://registry.npmjs.org/zimmerframe/-/zimmerframe-1.1.5.tgz |

## Points for review

Missing licenses, compound expressions, copyleft dependencies and the conditions of the external binaries need documentary checking before redistribution. Permissive licenses require preserving notices; incompatibility is not concluded from the name alone. An API does not inherit the AGPL license by being called by the program. Code, weights, corpus and service have distinct instruments.

This inventory does not conclude the legal compatibility of the whole product. The exact licenses of the formal artifacts and the revision of the base model remain pending. No secrets, closed files or user content were read.

External sources were only read, never run. The initial attempt at LICENSE in cvc5/ethos/main returned 404. Complement of 2026-10-31: the correct COPYING file on upstream main declares BSD-3-Clause and describes GMP under LGPLv3; the file at the historical abbreviated revision was not retrieved by the research browser, so the confirmation of that artifact remains pending. Apache/BSD on the upstream does not, on its own, prove the notices of a distributed binary or fork.

## Specific alerts for review, without a legal conclusion

| Piece/class | Flag | Limit and action before redistributing |
|---|---|---|
| Logos without an identified license | High documentary priority | Availability of the code does not amount to a redistribution license; obtain permission/license. Do not distribute a binary just because Lean is Apache. |
| LGPL-3.0-or-later and AND expressions with LGPL | Attention to obligations of combined components | Check linking, the possibility of replacement, notices and the corresponding source of the concrete distribution; the name in the lockfile does not end the analysis. |
| MPL-2.0 | Per-file copyleft and combination conditions | Examine modified files and secondary licensing conditions in the concrete version, without declaring automatic incompatibility with AGPL. |
| Apache/MIT/BSD/ISC/Unlicense/0BSD | Notices and origin | Preserve the applicable licenses/notices; Cosmos code does not replace the license of components. |
| CC-BY-4.0 in data/lockfile and OFL in fonts | Objects with their own regimes | Separate data, code and fonts; attribution, origin and modifications must accompany the objects. Do not relabel everything as AGPL. |
| Groq as a service | An agreement distinct from the license of the weights | Do not distribute weights in this flow; reassess the conditions of the service when it is actually used, with no contracting in this mission. |
| cvc5/Ethos/GMP and Carcara forks | Dependencies and build configuration | Check the revisions and options of the actual binaries. Apache/BSD in the main repository does not authenticate the composition of every binary. |

### Declarative coverage of the lockfile

242 npm locations (direct/transitive/optional), without installation or change of package/lockfile. Count by declaration, AND expressions count as one entry:

| Declaration | Locations |
|---|---:|
| 0BSD | 1 |
| Apache-2.0 | 39 |
| Apache-2.0 AND LGPL-3.0-or-later | 3 |
| Apache-2.0 AND LGPL-3.0-or-later AND MIT | 1 |
| BSD-2-Clause | 7 |
| BSD-3-Clause | 2 |
| CC-BY-4.0 | 1 |
| ISC | 8 |
| LGPL-3.0-or-later | 10 |
| MIT | 145 |
| MPL-2.0 | 24 |
| Unlicense | 1 |

There are also notices already included in LICENSES/, among them OFL-JetBrainsMono and Unicode-3.0. The presence of these notices does not show that the list covers every third-party visual resource. Explicit pending items: revision of the weights/quantization, rights and attribution of the corpus per batch, the Logos license and the exact composition of the formal binaries. There was no installation, external compilation, acceptance of terms, download of weights or legal opinion.
