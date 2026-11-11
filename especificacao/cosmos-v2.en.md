# Cosmos Provenance Ledger v2 — initial local profile

**Português:** [cosmos-v2.md](cosmos-v2.md). This is a translation; if the two differ, the Portuguese text prevails.

Status: experimental local implementation. No commit/push/deploy or external publication in this delivery. F0–F8 v1 are preserved byte for byte. v2 does not redefine its phases.

## 1. Canonicalization

`cosmos-provenance-v2`: a restricted JSON profile compatible with JCS RFC 8785. ECMAScript primitives and ordering by UTF-16 units. Only safe integers; fractional numbers, BigInt, NaN, Infinity, objects with accessors/special prototypes and sparse arrays are rejected.

Duplicate keys are rejected after decoding escapes. Strings/keys with lone Unicode surrogates or outside NFC are rejected. **NFC is an additional restriction of the profile, not a JCS operation.** There is no automatic normalization. Admission documents must already be canonical, without extra spaces or LFs.

Limits: 262,144 bytes of UTF-8, depth 32, lexical check before recursive reading. v1 does not use this new canonicalization.

## 2. Record and admission signature

The envelope has exactly `registro` and `assinatura`. Record:

```json
{"anterior":"64 hex","autor":"chave pública Ed25519, 64 hex","conteudo":{},"evidencias":[],"formato":"cosmos-provenance-v2","indice":0,"pedido":"identificador-idempotente"}
```

(`autor` = Ed25519 public key, 64 hex; `pedido` = idempotent identifier.) Signed message: the UTF-8 of `cosmos-provenance-v2\n` concatenated with the canonical JSON of the record. Link hash: SHA-256 of these same bytes. Signature: 128 lowercase hexadecimal characters. Strict verification uses the existing `conferirAssinatura`, including the rejection of small-order keys.

`autor` is a key, not a provably unique person. There is no pin of the v1 key in this new protocol. The first link has index zero and a previous hash of 64 zeros. Each following link has a consecutive index and the exact previous hash. Up to 32 evidence hashes. `pedido` uses `[a-zA-Z0-9._:-]`, 1–128 characters, and is part of the signature.

## 3. Admission/concurrency

`POST /v2/elos`, `Content-Type: application/json`: authentication by possession of the key that signs the whole record. There is no authorization to mint, change configuration or write to third parties' chains. Valid authorship does not equal humanity or truth.

SQLite WAL, `synchronous=FULL`, `busy_timeout=5000`, `BEGIN IMMEDIATE`. Constraints `PRIMARY KEY(autor,indice)`, `UNIQUE(autor,pedido)` and a unique hash; triggers reject UPDATE/DELETE of links. An identical idempotent request returns 200; a new link returns 201; an invalid signature 401; conflict/fork/gap 409. Reusing a request id with different content is a conflict.

Before the transaction, signature and evidence are checked. Inside BEGIN IMMEDIATE, sequence/idempotency conflicts are rejected before writing objects. Accepted objects are replicated before the INSERT: an I/O/commit failure may leave an orphan object, it never promotes an object to an accepted link. Files are written to a temporary file, synced and atomically linked to the name by hash, without overwriting the destination. There is no automatic mechanism to delete orphans, forks or historical evidence.

HTTP limits: 256 KiB, 60 requests/minute per IP, up to 2,000 entries in the rate-limit map, 64 connections, request timeout 10 s and headers 5 s. X-Forwarded-For is not trusted. This is a local base, not sufficient resistance to distributed DDoS/Sybil.

`GET /v2/cadeias/<pubkey>` exports signed envelopes. The export header does not receive a signature from a new central authority; each link must be revalidated and continuity checked against a trusted checkpoint.

## 4. Index, files and reconstruction

The SQLite index is a searchable projection of the accepted signed records. The signed content is preserved in objects addressed by SHA-256, in at least two configured directories. The evidence is bound by hash. Reads verify the hash and try another replica in case of corruption. There is no promise of physical independence of the default directories.

JSON is the transport/export of the signed records, not a substitute for transactional control. Reconstruction re-runs validation/signature/continuity for each record. If a reconstruction fails in the middle, only the already verified prefix stays admitted; there is no silent promotion of the rest. The checkpoint policy detects truncations relative to a previously known anchor.

## 5. Transparency and trust

Leaf: SHA-256(0x00 || bytes of the record). Node: SHA-256(0x01 || left hash || right hash). Empty tree SHA-256(empty). Split at the largest power of two strictly smaller than the size. Inclusion and consistency follow RFC 9162 §2.1.

The anchor must come from an authenticated external channel, distributed beforehand or consciously selected by the user. The same origin is not independence. A different author/log is rejected; a smaller size signals rollback; the same position/size with a different root signals a fork; an extension without a valid proof is rejected. The client keeps the previous checkpoint in case of conflict.

The file prepared in this delivery was not published through an independent channel, by the owner's explicit choice. Detection of replay on first contact cannot be guaranteed without a trusted previous anchor. Local proofs do not replace external monitoring/gossip.

## 6. Four seals and evidence

Separate results: integrity, signature, formal proof and timestamp; the conclusion may be `inconclusivo` (inconclusive). A valid hash/signature does not produce a formal proof, human review or truth. No new kernel was implemented; the v1 certificates remain within the original scope of their verifiers. A future formal integration must declare language, kernel version and certificate, and only emit `conferida` (checked) after an actual isolated run/check.

OTS: the real sidecar proof commits to the text file containing the v1 summary + LF. A local link and a calendar do not confirm Bitcoin. Only real validation against Bitcoin Core and six confirmations produces `confirmado_bitcoin`; metadata declared by the package is not enough. Human review is not inferred from OTS.

## 7. Budget and disputes — no coin

Initial budget for transferable issuance: zero. No balance or transfer implemented. Reputation is also not granted automatically by number of signatures.

A future evaluation campaign must have a pre-funded and limited budget, a published objective criterion, reviewers with declared conflicts, evidence addressed by hash, a contesting period and an explicitly chosen independent judgment. New evidence creates a new record; it never deletes history. No automatic penalty by stake until there is a verifiable rule of infraction and an appeal procedure. These are design rules, not an active market.

References: RFC 8785; RFC 9162; https://opentimestamps.org/; https://www.sqlite.org/lang_transaction.html; https://www.postgresql.org/docs/current/transaction-iso.html (reference model; the backend implemented in this delivery is SQLite).
