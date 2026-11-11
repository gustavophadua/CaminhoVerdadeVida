# M7 - states of the Conversation

**Português:** [M7-ESTADOS.md](M7-ESTADOS.md). This is a translation; if the two differ, the Portuguese text prevails.

Check of 2026-10-31. The captures were made with public fixtures, fake transport/solver and real components, on a separate server http://127.0.0.1:5180 with HMR disabled. There was no real model, key, account, password or access to the vault. The fixture does not prove that an argument received that class in the solver; it proves the presentation of the state supplied. Navigation of an authenticated account was not reproduced. The temporary server and tab were closed after the check.

| Case | Origin of the text | Capture |
|---|---|---|
| Text without an argument | assistente.ts:186; executar rejects input that cannot be split | sem-argumento.png |
| Model unavailable | assistente.ts:194; a transport failure gets no class | modelo-fora.png |
| Unreadable answer | assistente.ts:198; a reading error does not call the checker | ilegivel.png |
| Provider refused | assistente.ts:193; a closed code coming from an explicit refusal | recusa.png |
| Z3 without decision/time limit | assistente.ts:228-231; ConversaIA.tsx:150 | z3.png |
| Incompatible premises | assistente.ts:228-230; ConversaIA.tsx:150 | incompativel.png |
| Logical class | assistente.ts:222; ConversaIA.tsx:152 | segue.png, contradiz.png, independente.png |
| Certificate | ConversaIA.tsx:156; unavailable for this answer | warning visible in segue.png and the other cards |

The lines are from the closing of the mission and may change in future commits. The absence of "logo" (therefore) is not by itself an error: the splitter accepts other markers and formats. The input case of this check is an isolated sentence that does not split into premises/conclusion.

## Refusal and transport security

The adapter recognizes only a non-empty message.refusal or finish_reason content_filter in the provider's structured response. It does not try to infer a safety refusal by reading free text. HTTP 401/403 is not this state. The bridge passes on only the code provedor-recusou (provider refused) in HTTP 422; the formalize client recognizes this code and the UI uses its own message. The free detail of the refusal is not passed on. The end-to-end test uses fake transport, not real Groq.

## Certificate

The current flow of the Conversation does not receive an independent proof per answer. The interface declares this absence; no green certificate case was invented. The solver's logical result stays separate from this guarantee. A future integration will need its own contract, artifact and check.

## Local evidence

Captures and accessibility snapshots are in the local delivery entrega-gpt/m7-capturas/ (nine PNGs and a contact sheet), outside the repository. The temporary harness tmp/m7-ui/ uses the real executar and CartaoIA; it is identified on the page itself as a fixture. Cases inspected visually, with no compilation error screen or overlay preventing reading.
