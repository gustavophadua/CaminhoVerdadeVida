# Chains — format cadeia-v1

**Português:** [cadeia-v1.md](cadeia-v1.md). This is a translation; if the two differ, the Portuguese text prevails.
Field names and values are part of the format and stay in Portuguese.

The personal chain is Phase 3 of the plan: the sequence of a person's records
(`registros-v1.md`), each tied to the previous one by its digest and signed by
the person's key. Whoever receives a chain as a file checks everything without trusting whoever
sent it, and flags any alteration:

- a record changed, removed or inserted in the middle;
- a signature that is not from the key;
- a new version that rewrites or truncates what the old one already had.

The chain says that each record belongs to that key and has not changed. It does not say that the
record is valid: that is the check of the record, by section 7 of
`registros-v1.md`.

## 1. The key and the signature

The key is Ed25519, from RFC 8032, in the pure form: no pre-hash and no context. The
public key is 32 bytes, written as 64 lowercase hexadecimal digits; the
signature is 64 bytes, in 128 digits. The author of a record (section 2 of
`registros-v1.md`) is the SHA-256 of the 32 bytes of the public key.

**The signature check** is this one, and not that of an arbitrary library. Libraries
disagree on edge cases, and one of the most widely used (OpenSSL's)
accepts a forged signature for any message when the key is the neutral
point. A signature (R, S) of a message M by key A is valid when:

1. A decodes as a point on the curve: y < p, the root for x exists, and x = 0 does not come with
   the sign bit 1 (section 5.1.3 of RFC 8032);
2. A has order L: [L]A is the neutral point and A is not the neutral point. This rejects the neutral
   point and every point with a small-order component. A key made according to RFC 8032
   always passes;
3. S, the last 32 bytes read as a little-endian integer, is smaller than L;
4. with k = SHA-512(R ‖ A ‖ M) read as little-endian and reduced modulo L, the
   encoding of [S]B − [k]A (section 5.1.2 of RFC 8032) equals the 32 bytes of R.

Here p = 2²⁵⁵ − 19, L = 2²⁵² + 27742317777372353535851937790883648493, and B is the
base point of RFC 8032. Comparing by the encoding also rejects an R written
outside the canonical form.

## 2. The link (elo)

Each record enters the chain in a link:

| Field | Content |
| --- | --- |
| `indice` | the position of the link, starting from 0 |
| `anterior` | the digest of the previous link; in link 0, 64 zeros |
| `registroTexto` | the record (registro-v1), as JSON text |
| `assinatura` | the signature of the link text, in 128 lowercase hexadecimal digits |

**The link text** is what the key signs. It is five lines, each ending
in `\n` (LF), in UTF-8:

```
cadeia-v1
chave <the public key, 64 digits>
indice <the index, in decimal, without leading zeros>
anterior <the anterior field>
registro <the SHA-256 of the UTF-8 bytes of registroTexto, 64 digits>
```

**The digest of the link** is the SHA-256 of the link text, in lowercase hexadecimal. The
digest of the chain is that of the last link: it is what a timestamp will pin down
(section 8).

The record goes as text, not as an object, so that there are no two encodings of the
same record: the hash is of the bytes that are in the file. The text is read by the
strict JSON reader of section 2 of `registros-v1.md`, which rejects repeated
keys.

## 3. The chain file

The chain goes in a JSON file with these fields, and only these, with no repeated key
in any object and with integers written without a point and without an exponent,
as in section 2 of `registros-v1.md`:

| Field | Content |
| --- | --- |
| `formato` | `"cadeia-v1"` |
| `chave` | the public key, in 64 lowercase hexadecimal digits |
| `elos` | the list of links, in order, with at least one |
| `arquivos` | optional: `{path: content}`, the files of the records' certificates, as text |

A link has only the four fields of section 2. In `arquivos`, each path is one of
those the records cite, in the form of section 5 of `registros-v1.md`, and the content
is the text of the file. The files are not signed: the SHA-256 of each one is
in the record, which is signed.

## 4. The check and the reasons for rejection

The check gives **accepted**, with the number of links and the digest of the chain, or
**rejected**, with the code and, when the defect is in a link, its index.

It stops at the first step that fails, in this order:

1. the file: the reading and the shape (C1), the format (C2);
2. the key (C3);
3. each link, from first to last: the index (C4), the previous digest (C5), the record
   (C6), the author (C7) and the signature (C8).

| Code | Rejects when |
| --- | --- |
| C1 | The JSON cannot be read, or has a repeated key; a field is missing or extra; a field is badly written (hexadecimal with upper case or the wrong length, an index that is not an integer); `elos` is empty |
| C2 | The format is not `cadeia-v1` |
| C3 | The key does not decode as a point, or does not have order L (steps 1 and 2 of section 1) |
| C4 | The index of the link is not its position |
| C5 | The previous digest is not the digest of the previous link (in link 0, it is not 64 zeros) |
| C6 | `registroTexto` cannot be read by the strict reader, is not an object, or does not have `autor` as text |
| C7 | The author of the record is not the SHA-256 of the chain's key |
| C8 | The signature is not valid for the link text (steps 3 and 4 of section 1) |

## 5. Versions of the same chain

Whoever already has an accepted chain and receives another, also accepted, with the same key,
compares the two by the digests of the links:

| Relation | When | What to do |
| --- | --- | --- |
| equal | the same digests, in the same number | nothing |
| extension | the old one is the beginning of the new one | replace it with the new one |
| truncated | the new one is the beginning of the old one, with fewer links | flag it: what the person had already published disappears |
| forked | there is an index at which the digests differ | flag it: the key signed two different histories |

In a fork, the two links with the same index, signed by the same key, are the
proof: both versions are kept. With different keys, they are not versions of the
same chain.

## 6. Keeping the key

This is not part of the format, and another implementation may keep the key however it likes.
The Caderno keeps the private key in the browser, as a WebCrypto key that the
page's code cannot export. On creation, the person saves a backup
copy in a file encrypted with a password, to recover the identity if they
lose the device.

## 7. Normative examples

`cadeia-v1/exemplos.json` has valid and invalid chains, each with
`esperado` (`{"veredito": "aceita"}` or `{"veredito": "recusada", "motivo":
code, "elo": index}`), and pairs of versions with the expected relation. Each
invalid one has a single defect. When the defect is in the writing of the JSON, the chain
comes in `cadeiaTexto`, as text. The keys in the examples are those of tests 1, 2
and 3 of RFC 8032 (section 7.1), which belong to no one.

## 8. Limits of v1

1. There is no timestamp. The digest of the chain will be stamped in Bitcoin through
   OpenTimestamps in a later version.
2. Without a stamp, a truncation at the end is only seen by whoever already had the old
   version.
3. There is no key change or revocation: losing the key without the copy means losing the
   chain.
4. One key, one chain. The identity of the person behind the key belongs to Phase 6.
5. The chain does not check the records: the check of each one is that of
   `registros-v1.md`.
