# Cosmos

[![Public verifier](https://github.com/gustavophadua/Cosmos/actions/workflows/verificador-publico.yml/badge.svg)](https://github.com/gustavophadua/Cosmos/actions/workflows/verificador-publico.yml)

**Português:** [README.md](README.md). This is a translation; if the two differ, the Portuguese text prevails.

A local application for querying, recording and verifying knowledge. Interfaces `#/i-ai`, `#/lab`, `#/terminal` and local integration settings. The Terminal and the wallet are simulations with no financial value; there is no public market and no distributed consensus.

## Public verifier

On every change to `main`, the [Public verifier](https://github.com/gustavophadua/Cosmos/actions/workflows/verificador-publico.yml) workflow checks, on a GitHub machine: the 13 protected files by their exact bytes; the F0-F8 chain (C1-C8), the recomputed hash and the Ed25519 signature of each phase; the Merkle checkpoint and the target of the OpenTimestamps stamp (`testes/verificador-publico.test.ts`); and the Alethe proofs through Carcara at a fixed commit, with tampering, attacks, the link through the independent implementation and blind batch 1 of 62 records (`especificacao/provas-t1/conferir.py`). Integrity and authorship do not prove that the statements are true. The Bitcoin stamp: the chain summary is anchored in block 972669 (2026-10-22 23:08:46 UTC); the `carimbo` part of the workflow checks the OTS proof against the block header in at least two public sources, without a Bitcoin node of its own (`scripts/cosmos-ots.py verify-publico`). The original proof from the calendars is preserved in `public/cosmos-502426c-resumo.txt.calendario.ots`. The public 5p4c proof (`software-public-v1/`, 5 pigeons in 4 holes) is checked by two independent Carcaras, one compiled from source and the official 1.1.0 binary with a pinned hash, with four tampered copies that must be rejected (`scripts/conferir-5p4c.py`); the GPU output is not in the package, and none of this attests to hardware. The "fase4" in the name of the source branch (`codex/fase4-b-5p4c`) is Codex's work phase (GPU and Carcara), not Phase 4 of the plan (contesting and the state of records).

## Bitcoin stamps

Each file below was stamped through OpenTimestamps and the confirmation is recorded in `src/dados/`; the public verifier checks each proof against the block header. A stamp proves that the file existed on that date, not that its content is true.

| Block | Stamped file | What it is |
|---|---|---|
| 972669 | `public/cosmos-502426c-resumo.txt` | summary of the historical F0-F8 chain |
| 973050 | `public/cosmos-checkpoint-raiz.txt` | root of the Merkle checkpoint |
| 973118 | `public/cosmos-fase3-resumo.txt` | summary of the four chains of the Phase 3 test (A, B, C and A's second history) |
| 973304 | `public/cosmos-avaliacao-v1-raiz.txt` | commitment to the closed evaluation set (items and salts revealed on 2026-11-11 in `avaliacao/fechado-v1/`) |
| 973562 | `public/cosmos-iai-v1-resultado.txt` | result of I-AI measurement 1 |
| 973687 | `public/cosmos-iai-v1-medicao-2.txt` | result of I-AI measurement 2 |

## Personal chain (Phase 3)

In Labs > Minha cadeia (My chain): the Ed25519 key stays in the browser and cannot be exported, with a password-encrypted copy (PBKDF2-SHA-256 + AES-256-GCM) downloaded when it is created. Each record goes in sealed (registro-v1: the commitment to the formula, without showing it), signed and tied to the previous one (especificacao/cadeia-v1.md). The chain is exported to a file and checked on another device, which flags any alteration (C1-C8), truncation or rewrite. Creating the key and signing only work on localhost; checking works on the public site. The test with three real laptops was done on 2026-10-25 (result in `especificacao/teste-3-notebooks.md`), and the summary of the test's four chains is anchored in block 973118: Phase 3 is done.

Publishing a chain: copy the exported `cadeia.json` and, if you want to open records, the `revelacoes.json` into `cadeias/<name>/`. The `cadeias` part of the public verifier opens each revealed record with a certificate (translation t1 through Z3 and a proof through cvc5 1.4.2, a finite model, or an exact model through Z3 when there are numbers) and checks it independently (registros.py, the GPT reader, Carcara at the fixed commit 20bf49c, with the audited RARE rules). Revealing makes the formula and the premises public. `cadeias/exemplo-rfc8032/` is an example signed with the RFC 8032 test key, which belongs to no one. Script for the test with three computers (G01-G06): `especificacao/teste-3-notebooks.md`.

When a revealed record does not hold up, the CI certifies the opposite claim (follows <-> does not follow, contradicts <-> consistent) and publishes that counter-record, which the same independent checks verify; without it, the result stays a diagnosis by the producer, not a refutation. Carcara's verdict only counts as `valid` on its own and with exit code 0 (`scripts/testar-veredito-carcara.py`), and the receipts carry the SHA-256 of the executable that ran.

## Installing on Windows (local AI)

Download the repository (Code > Download ZIP), extract it and open `Instalar-Cosmos.cmd`. It checks for Node.js 22 and Ollama (and installs them through winget if missing, after you confirm), installs the dependencies, downloads the qwen3:4b model (about 2.5 GB) and puts a "Cosmos" shortcut on the Desktop. The shortcut opens the local service and the browser on the Conversation: the first time, create the local account (the AI only serves the owner account). Write a line of reasoning or paste a plan: Cosmos draws the map of the argument (facts, the missing link and the conclusion) and Z3 decides whether the conclusion is proved, a leap or a contradiction. The text does not leave the computer, unless the large cloud model is switched on (optional). How to use it and the closed-test kit: `teste-fechado/`. Details and limits: `especificacao/revisor-v1.md` and `especificacao/formalizacao-v1.md`.

Note for English readers: the AI was set up and measured on sentences in Portuguese; other languages have not been tested.

The app has an English interface: the EN/PT button in the top bar switches it, and the choice stays on the device
(without a choice, the app follows the browser's language). The interface is translated on screen from a dictionary
(`src/ui/idioma-en.ts`); what the AI reads and answers, the reading back of the formulas, the downloaded reports and
the normative examples stay in Portuguese.

## Using it from a phone (remote mode)

With Cosmos installed, install the tunnel once (`winget install --id Cloudflare.cloudflared`) and open `Abrir-Cosmos-Remoto.cmd`. The first time, it asks for the owner's password. Then it shows an https address: open it on the phone and sign in with the password. The computer is still the server (it has to stay on): translation goes through Groq, with Ollama as a fallback, and Z3 decides on the computer. The encrypted account, the wallet and the test coin stay in local mode only. Details, security and limits: `especificacao/remoto-v1.md`.

## From the author, and open data

Since 2026-11-11, by the owner's decision, these are public:

- `autor/projeto-tubo/`: the Alpha and Omega model (the Tube), with the machine, the checks through Z3, the plates and the base for the verifier;
- `autor/principia/`: the Principia, without the author's personal name;
- `avaliacao/fechado-v1/`: the closed evaluation set, revealed and checked against the stamped root (`testes/avaliacao-revelada.test.ts`);
- `treino/dados/`: the training data for the project's own model.

What changed on publication, how to use it and the limits are in `autor/README.en.md` and in `avaliacao/fechado-v1/LEIA-ME.en.md`.

## Development

Node 22.14.0. Install the dependencies with `npm ci`. Run `npm run typecheck`, `npm test -- --maxWorkers=1` and `npm run build`. `npm run dev` opens the development environment; the base path of the public site is `/Cosmos/`. Local integrations: `node scripts/integracoes-p0.mjs`. Provider credentials only in the server process, never in VITE_*, the browser or Git. No credentials come with this repository.

## Independent export

This copy was prepared from the checkout of milestone aacecce9f606fe73789fbd74135fc01abd5ea356, including the reviewed local changes to the Python parser, the integer-number specification and the routing of the icon generator. It does not contain the original Git history, vaults, encrypted personal data, installed dependencies, databases, logs, executables, binary witnesses, Cargo.lock or workbench metadata.

The product implementation, tests and specifications come with the delivery. Sealing scripts and experimental hosts tied to the historical artifacts were excluded; this copy does not automatically reproduce the GPU workbench. The `software-public-v1/` package contains the proof and sanitized sources for the fixed 5p/4c instance. Receipts in that package describe historical results; they do not certify this export or attest to hardware.

GitHub Pages deployment authorized on 2026-10-25, with its own workflow and no provider credentials. URL: https://gustavophadua.github.io/Cosmos/. The public site offers a catalog and a demonstration; the account/vault and the operational integrations remain restricted to the local environment. The new repository does not inherit tags, commit signatures or CI results from the original. The hashes of the historical data are preserved. On the export date, OTS and the independent anchor had the limits recorded in their respective data; the later confirmations are in the "Bitcoin stamps" section.

The encrypted personal system was deliberately left out. Licenses, credits and third-party notices remain in LICENSE, LICENCAS.md (in English: LICENCAS.en.md), LICENSES/ and THIRD_PARTY_NOTICES.md (in English: THIRD_PARTY_NOTICES.en.md). The links to the original repository in those notices are historical attribution, not the publication destination of this copy.
