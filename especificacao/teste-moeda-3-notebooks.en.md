# Script — the test coin on the three laptops (cosmos-teste-1)

**Português:** [teste-moeda-3-notebooks.md](teste-moeda-3-notebooks.md). This is a translation; if the two differ, the
Portuguese text prevails. Amounts are written as on screen, with a decimal comma (100,00 = 100.00).

The test network is done when the three computers from the Phase 3 test exchange test units as files and each one flags
spending above the balance, double spending and alteration. The rules are in `especificacao/moeda-teste.md`; the
simulation of each one, on a single device, in `testes/moeda-teste.test.ts` (M01–M10).

**Test unit, without value.** It is not sold, not bought, not exchanged and does not become real money.

## Preparation (on each laptop: A, B and C)

1. Check the clock's date: all three on the same day. The receiver rejects an operation dated in the future.
2. In PowerShell: `cd Cosmos`, `git pull`, `npm.cmd ci` and `npm.cmd run dev`.
3. In the **same browser as the Phase 3 test** (that is where the key is), open
   `http://localhost:5173/Cosmos/#/lab` and click **Moeda de teste** (Test coin). The port has to be 5173: on another
   port the browser does not find the key.

"VOCÊ · A" (YOU · A) (or B, or C) and "100,00 livres" (100.00 free) must appear. On A, also "10,00 presas: 10,00 em
2026-11-25" (10.00 locked: 10.00 on 2026-11-25): the reward for the record the public verifier opened.

The exported ledger is called `cosmos-livro-<beginning of the key>-<operations>.json`: A `c39ce485`, B `d84233c1`, C
`36fe5abf`.

## The tests

The "arrive" amounts and the "locked until" dates below are for a test done on 2026-10-27 (today + 30 days).

| Test | Where | What to do | What must happen |
| --- | --- | --- | --- |
| M01 · Genesis | A, B and C | Open Moeda de teste | 100,00 free; the network shows all three; "a conta fecha" (the accounts balance) |
| M02 · Transfer | A | Transfer 20 to B; export (`cosmos-livro-c39ce485-1.json`) | A: 80,00 free; "chegam 19,00, presas até 2026-11-26" (19.00 arrive, locked until 2026-11-26) |
| M02 · Receive | B and C | Receive A's ledger | "aceito · 1 operação(ões) · A" (accepted · 1 operation(s) · A); B with 19,00 locked; 1,00 burned |
| M03 · Lock | B | Transfer 110 to C | Rejected: "saldo livre insuficiente … há 100,00" (insufficient free balance … there is 100.00): the 19 received are locked; nothing is appended |
| M07 · Round | B, then C | B transfers 30 to C and exports; C receives, transfers 10 to A and exports | B: 70,00 free; C: 90,00 free and 28,50 locked |
| M08 · Same accounts | A, B and C | Each one receives the missing ledgers | All three show the same network: A 80,00 + 19,50 locked, B 70,00 + 19,00, C 90,00 + 28,50; issued 310,00, burned 3,00, in circulation 307,00, "a conta fecha" |
| M09 · Duplicate request | B | Receive A's ledger again | "Igual à versão que este aparelho já tinha" (Same as the version this device already had) |
| M05 · Alteration | B | Receive a copy of A's ledger with `quantia\":2000` replaced by `quantia\":9000` in Notepad | "recusado (C8, elo 0)" (rejected (C8, link 0)); the network does not change |
| M04 · Double spending | A (second browser) | In the browser where A's key was restored (Edge), transfer 90 to C and export (`A-livro-edge.json`) | — |
| M04 · Accusation | B and C | Receive `A-livro-edge.json` | "GASTO DUPLO: a mesma chave assinou duas histórias diferentes" (DOUBLE SPENDING: the same key signed two different histories); the network flags A and goes on with the first history |
| M06 · Publication | this computer | Bring the three ledgers and `A-livro-edge.json` | Published in `redes/cosmos-teste-1/livros/`, the public verifier redoes the accounts and they balance |

For each test, write down the computer and the message that appeared. Screenshots are enough.

## What this script does not cover

- **The lock expiring.** The 30 days do not pass during the test; the release on the 30th day is in scenarios M02 and
  M03.
- **A new reward.** A reward comes in when a new record is published in `cadeias/` and opened by the public verifier.
- **Identity.** A key does not prove who the person behind it is (Phase 6).

## Result of 2026-10-27

Done by the operator with **two** laptops, A and C (B was left without Node.js installed), with the files carried on a
USB stick; the two-laptop script is the one above without the step of the round through the third. B stayed idle on
the network, with the 100 from the genesis. The files are published byte for byte and checked by
`testes/moeda-teste.test.ts`:

| Test | File | What the file shows |
| --- | --- | --- |
| M02 · Transfer | `livros/cosmos-livro-c39ce485-1.json` | A signed 20 to C on 2026-10-27; 19,00 arrive, locked until 2026-11-26 |
| M07 · Return | `livros/cosmos-livro-36fe5abf-1.json` | C signed 30 to A; 28,50 arrive |
| M08 · Same accounts | the two ledgers | A 80,00 free and 38,50 locked, B 100,00, C 70,00 and 19,00; issued 310,00, burned 2,50, in circulation 307,50; the accounts balance |
| M09 · Repeated | A's ledger twice | "igual" (equal) |
| M05 · Alteration | `acusacoes/A-alterado.json` | the amount changed from 20,00 to 90,00: rejected (C8, link 0) |
| M04 · Double spending | `acusacoes/A-livro-edge.json` | A's key, in Edge, signed another operation 0 (90 to C): forked at link 0 |

The lock (M03) produces no file: the rejected operation is not stored, and it is checked on screen.
