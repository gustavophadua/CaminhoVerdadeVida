# Test coin — recommended and decided rules

**Português:** [moeda-teste.md](moeda-teste.md). This is a translation; if the two differ, the Portuguese text prevails.

This document gathers what is recommended for the Cosmos test coin, based on the I-AI study plan, on what the local test
network already does (`src/v4/localnet.ts`) and on public sources about testnets and about regulation in Brazil.
**It is not a legal opinion.** The owner of the project accepted the recommendations on 2026-10-25 (Decision section);
nothing here issues a coin by itself.

## What already exists

- A simulated local network (`cosmos-localnet-simulada-v4`), only on `localhost`, with the unit
  `UNIDADE-TESTE-SEM-VALOR` (test unit without value).
- Issuance only at the genesis of a new simulation: 1,000,000 units by default (at most 1 billion), with no new issuance
  afterwards; a 5% burn (500 basis points) on operations; a secp256k1 test wallet and a signed ledger.
- The study plan: a test coin on the three laptops before any public, **no sale, no promise of profit, no custody, coins
  locked for 30 days**; issuance with an equal cap per person, plus payment by whoever requests a certificate; in the
  worst case, k colluding people issue k times the cap.

## Recommended rules

1. **A name that does not mislead.** The test unit is not called COSM or COSMOS: it stays `UNIDADE-TESTE-SEM-VALOR` (on
   screen, "unidade de teste", test unit). Every screen that shows a balance says "sem valor" (no value).
2. **No value and no exchange.** The units are not sold, not bought and not exchanged for money, another currency or any
   good. They represent no stake, right, debt or promise. This is the standard of public testnets (Avalanche, Cardano,
   the Paxos and First Digital faucets), which say so in their terms.
3. **No promise about the future.** Test balances do **not** become real money, give no right to an "airdrop" and count
   for nothing afterwards. This has to be written before the first use. It is the most important point: in CVM (the
   Brazilian securities regulator) Guidance Opinion 40, the expectation of economic benefit is one of the criteria of a
   collective investment contract (a security).
4. **No raising from the public.** Invited participants only: first the three laptops (the owner themself), then a
   small, known group. No open offer; raising funds from the public is another criterion of the same opinion.
5. **No custody.** Each person has their own key; the project keeps nobody's balance or key. Custody and intermediation
   of virtual assets are services that, since Central Bank of Brazil Resolutions 519, 520 and 521 (in force since
   February 2, 2026), require authorization from the Central Bank.
6. **Issuance tied to what Cosmos measures.** The mechanics to test are the study's:
   - a small, fixed genesis (or zero), with no new issuance outside the rules;
   - units only for a **record accepted by the public verifier** (certificate checked independently), never for a
     sealed or pending record;
   - an **equal cap per key and per period** (proposal: 100 units per key per week), to limit collusion;
   - whoever requests a certificate pays in test units; a 5% burn on each payment;
   - received units stay **locked for 30 days** before they can be transferred.
7. **Term and reset.** The test network has a version and a term (proposal: 90 days) and can be reset at any time; the
   participants know this beforehand.
8. **Everything checkable.** Each issuance, transfer and burn goes signed into the ledger, and the public verifier checks
   the total (genesis + issued − burned = sum of balances).
9. **Identity still open.** "One person, one account" is not yet solved (Phase 6). Meanwhile, the cap per key only holds
   among known participants.
10. **Before any real coin**, a legal opinion (CVM, Central Bank and tax). Issuing to the public with an expectation of
    value, or offering exchange or custody, changes the nature of the project.

## Decision (2026-10-25)

The owner of the project kept the recommended rules above and these values for the first test network
(`cosmos-teste-1`). They hold for the three laptops; changing any of them is a new version of the test network.

| Point | Decided value |
| --- | --- |
| Unit | `UNIDADE-TESTE-SEM-VALOR` ("unidade de teste"), no value, no sale, no exchange |
| Genesis | 100 test units per participant, to test payments from the start |
| Reward per record accepted by the public verifier | 10 units |
| Cap per key | 100 units per week |
| Payment per certificate request | in test units, with a 5% burn |
| Lock | 30 days before transferring what was received |
| Term of the test network | 90 days; afterwards it is reset, without migrating balances |
| Participants | the three laptops (the owner themself); afterwards, named invitees |
| Promise | none: a test balance does not become real money or give a right to anything |

## Implementation of cosmos-teste-1 (2026-10-26)

The v4 simulation stays as it was; the network decided above is another piece, tied to the personal chain.

- **Genesis:** `redes/cosmos-teste-1/genese.json`, with the values of the table and the keys of the three laptops from
  the Phase 3 test (A `c39ce485…`, B `d84233c1…`, C `36fe5abf…`). Start on 2026-10-26; the last day is 2027-01-23 (90
  days). The identifier of the network is the SHA-256 of the genesis text (`textoDaGenese` in
  `src/motor/moedaTeste.ts`), which goes into every operation: an operation from another network is not valid on this
  one.
- **Units:** integers in hundredths of a test unit (100 units = 10000). The burn is 5% rounded down.
- **Ledger:** each participant has a ledger with the structure of cadeia-v1 (links with index, previous, text and
  signature; the same C1–C8 check), signed by the same Ed25519 key as the personal chain, but with the format
  `livro-cosmos-teste-1` on the first line of the signed text: a ledger signature is not valid in a cadeia-v1, nor the
  other way round. Each link is an `operacao-teste-v1` operation: transferring an amount to another participant, on a
  date, as an ordinary payment or as payment for a certificate (with the SHA-256 of the requested record).
- **Double spending:** two different histories of the same ledger are a fork, which the receiving device flags and keeps
  as proof; the network reads one ledger per key.
- **State:** `estadoDaRede` redoes the accounts from the genesis, the ledgers and `redes/cosmos-teste-1/recompensas.json`.
  The operations are checked in date order; each one only spends the balance free on that day (the genesis, plus what
  was received at least 30 days earlier, minus what has already gone out). The first operation that is not valid
  rejects the rest of that ledger, and whoever would receive from it receives nothing. The accounts must balance:
  issued − burned = sum of balances.
- **Rewards:** 10 units per record, locked for 30 days, up to 100 per key per week (counted from the start), without
  repeating the same record. The CI only accepts a reward if the record is published in `cadeias/`, belongs to the key of
  the reward and was opened with a certificate by the public verifier (`testes/cadeias-publicadas.test.ts`). The first
  is for record 0 of chain `teste-3-notebooks-a` (A).
- **In the app:** Labs → Moeda de teste (Test coin). Transferring only on `localhost`, with the key from Minha cadeia;
  the operation is checked against the state of the network before being stored. Receiving another device's ledger
  works anywhere.
- **Known limits:** the dates of the operations are declared by whoever signs (there is no trusted clock; the receiver
  rejects a date in the future, and the CI checks against its own date). A key does not prove who the person is (Phase
  6). The network has no consensus: each device sees the ledgers it received, and the version published in
  `redes/cosmos-teste-1/livros/` is the one the public verifier checks.

Scenarios M01–M10 of `testes/moeda-teste.test.ts` cover each rule; the script for the three laptops is in
`especificacao/teste-moeda-3-notebooks.md`.

## Sources

- CVM, Guidance Opinion 40 (2022-10-11), commented on by [Lefosse](https://lefosse.com/noticias/alerta/cvm-divulga-parecer-de-orientacao-sobre-o-mercado-de-valores-mobiliarios-e-criptoativos/), [Machado Meyer](https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/mercado-de-capitais-ij/orientacoes-da-cvm-para-o-mercado-de-criptoativos) and [Mattos Filho](https://www.mattosfilho.com.br/unico/cvm-parecer-criptoativos/) (in Portuguese).
- Central Bank of Brazil, Resolutions 519, 520 and 521 (2025-11-10), commented on by [Machado Meyer](https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/bancario-seguros-e-financeiro-ij/bcb-regulamenta-o-mercado-de-ativos-virtuais-no-brasil) and [Demarest](https://demarest.com.br/wp-content/uploads/2025/11/Demarest_BC_regulamenta_a_prestacao_de_servicos_de_ativos_virtuais.pdf) (in Portuguese); Law 14.478/2022.
- Testnet terms: [Avalanche](https://support.avax.network/en/articles/6639882-core-web-how-do-i-use-the-test-faucet), [Cardano](https://docs.cardano.org/cardano-testnet/tools/faucet), [Paxos](https://faucet.paxos.com/legal), [First Digital](https://www.firstdigitallabs.com/legal/fdusd-faucet-disclaimer).
