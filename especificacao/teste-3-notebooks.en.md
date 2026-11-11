# Script — the three-laptop test (Phase 3 and network tests G01–G06)

**Português:** [teste-3-notebooks.md](teste-3-notebooks.md). This is a translation; if the two differ, the Portuguese
text prevails. The on-screen messages are quoted as they appeared, in Portuguese, with a translation.

Phase 3 is done when three real computers exchange their chains as files and each one flags any alteration. This
script says what to do on each one and what must happen. Its simulation, on a single device, is in
`testes/rede-g01-g06.test.ts`; it shows that the software responds as the script expects, but it does not replace the
test.

## Preparation (on each computer: A, B and C)

1. Run Cosmos locally (`npm ci` and `npm run dev`) and open **Labs → Minha cadeia** (My chain) through `localhost`.
2. **Create the key**, with a password of at least 12 characters. Keep the downloaded `cosmos-chave-….json` file.
3. Sign at least one record (for example, `P(a)` consistent with `∀x (P(x) ⟹ Q(x))`).
4. **Export the chain** (`cosmos-cadeia-….json`) and take the file to the other two (USB stick, e-mail, whatever).

Write down, on each computer, the beginning of the public key (it appears under "Sua chave", Your key).

## The six tests

All in **Conferir uma cadeia recebida** (Check a received chain), on the receiving computer.

| Test | What to do | What must happen |
| --- | --- | --- |
| G06 · Three laptops | B and C receive A's chain; A and C, B's; A and B, C's | Each one: "aceita" (accepted) and "Cadeia nova para este aparelho" (New chain for this device) |
| G01 · Altered formula | Open A's chain in a text editor, change one letter inside a record (for example `proposta` → `Proposta`), save under another name and give it to B | B: **rejected (C8, link 0)**: the signature is not valid |
| G02 · Duplicate request | Give B the same chain from A again | B: "Igual à versão que este aparelho já tinha" (Same as the version this device already had) |
| G04 · Node offline | With C receiving nothing, A signs two more records and exports; then give it to C | C: "Extensão da versão conhecida" (Extension of the known version): nothing C had was lost |
| G05 · Fork | Give C A's old chain (the one from the beginning, shorter) | C: **truncated**: what A had already published disappears. If A restores the key in another browser and signs something else as the first record, B and C flag it as **forked** and keep both versions |
| G03 · False conclusion | A publishes in the repository's `cadeias/` folder a "segue" (follows) record that does not follow (with the reveal) | The public verifier lists the record as "não se sustenta" (does not hold up) |

## Recording the result

For each test, write down the computer, the message that appeared and the time. Screenshots are enough. With the six
expected results, Phase 3 can be considered done and the summary of the three chains can be stamped in Bitcoin.

## Result of 2026-10-25

Done by the operator with three Windows laptops, each running Cosmos through `localhost`, with the files carried on a
USB stick. Keys (beginning): A `c39ce485…`, B `d84233c1…`, C `36fe5abf…`. The screenshots stay with the operator.

| Test | Where | Message that appeared |
| --- | --- | --- |
| G06 · Three laptops | A, B and C | "aceita" and "Cadeia nova para este aparelho"; each one kept the other two's chains |
| G02 · Duplicate request | B, with A's chain | "Igual à versão que este aparelho já tinha" |
| G01 · Altered formula | B, with A's chain altered (`proposta` → `Proposta`) | "recusada (C8, elo 0): uma assinatura não vale" (rejected (C8, link 0): a signature is not valid) |
| G04 · Node offline | C, with A's chain of 3 records | "aceita · 3 elo(s)", "Extensão da versão conhecida" |
| G05 · Truncated | C, with A's old chain | "ALTERAÇÃO: a versão recebida é mais curta do que a conhecida" (ALTERATION: the received version is shorter than the known one) |
| G05 · Forked | B and C, with A's key restored in another browser | "ALTERAÇÃO: a mesma chave assinou duas histórias diferentes" (ALTERATION: the same key signed two different histories); conflict kept |
| G03 · False conclusion | `cadeias/teste-3-notebooks-a/` | the public verifier opens link 1 as "não se sustenta", with the counter-record |

The chain published for G03 is the second history of A's key (the one from the browser where the key was restored):
link 0 claims that `Q(b)` is consistent and link 1 claims, on purpose, that `Q(b)` follows from `∀x (P(x) ⟹ Q(x))`
and `P(a)`.

The main chains of the three laptops are also published, without reveals: `cadeias/teste-3-notebooks-a-principal/`
(3 records), `cadeias/teste-3-notebooks-b/` (2) and `cadeias/teste-3-notebooks-c/` (1). The summary
`public/cosmos-fase3-resumo.txt` carries, for each of the four chains, the key, the number of records and the head
(C1–C8); the CI checks that it matches the published chains. The summary was sent to the OpenTimestamps calendars on
2026-10-25 (`public/cosmos-fase3-resumo.txt.ots`, SHA-256 of the summary `929a947c…`) and confirmed in Bitcoin **block
973118** (2026-10-25 19:52:52 UTC), checked against public headers. The record is in `src/dados/ancora-fase3.json`;
the original proof from the calendars is preserved in `public/cosmos-fase3-resumo.txt.calendario.ots`, and the stamp
part of the public verifier checks the confirmation on every commit. With that, Phase 3 is done.

## What this script does not cover

- **Test coin.** The plan puts a test coin on the three laptops before any public, with no sale, no promise of profit
  and no custody. The rules were decided on 2026-10-25 (`especificacao/moeda-teste.md`); this script issues no coin: the
  test network is a later step.
- **Identity.** A key does not prove who the person behind it is (Phase 6).
