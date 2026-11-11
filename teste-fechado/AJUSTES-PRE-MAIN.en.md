# Review adjustments before main — 2026-10-31

**Português:** [AJUSTES-PRE-MAIN.md](AJUSTES-PRE-MAIN.md). This is a translation; if the two differ, the Portuguese text
prevails.

## Links

At the operator's explicit correction, the M5 preference for fewer conditions was reverted. `src/motor/ponte.ts` returns to the design of 63d31ff: candidates with more restrictive antecedents first and a selection of up to four with diversity. For the same consequent, A∧B→C commits less than A→C. This does not establish a total semantic ordering among incomparable antecedents.

The new circularity tests with real Z3 were kept. The priority regression now also checks the relative strength: A→C implies (A∧B)→C, but the converse is independent. The original diversity expectations were restored, without the fallback that accepted the absence of an option.

## Card and certificate

The repeated warning was removed from the main body. The information is still true and accessible inside **Fórmulas (m2) e verificação** (Formulas (m2) and verification), closed by default. No per-answer certificate was invented and the seal of the phases was not changed. The regression renders the real component on the server and checks that the warning only appears in closed details.

## Diagnostics

The distinct phases were kept: translation unavailable, unreadable reading, explicit refusal, inconsistent base and absence of a Z3 decision. A missing service gets specific guidance to open Cosmos/Ollama; reading failures preserve the parser's reason. Other transport failures keep their textual diagnosis instead of all being converted into "o modelo ou serviço não respondeu" (the model or service did not respond).

No stack or raw body of the provider's response is included. Recognized credential markers are hidden in the textual detail, with limited size. This is not a universal classifier of sensitive data; the adapters remain responsible for not passing on secrets. The test uses only a fictitious credential and checks that it is hidden. No call to a real model/API is needed in this review.

## Validation and history

- Before the fixes: 6 failures/21 passed in 3 files, 5.66 s.
- After the fixes: 27/27 in 3 files, 6.73 s.
- Typecheck passed; extended regression: 111/111 in 8 files, 15.91 s; terms CLEAN.
- M1 and the other historical measurements were not repeated. M9's link times describe the implementation before this review and are not new benchmarks of this version.
- Historical hashes, prompts and phases unchanged. Build/full suite and 13/13 must be checked before pushing this review.

Status at the original delivery of this review: no merge/deploy, on the dedicated branch. Later the operator completed the manual step M12 ([record](M12-CONFIRMACAO-MANUAL.en.md)) and authorized integrating into main/publishing through Pages after the final validations. M11 still depends on the key in the environment, without a new real measurement. M12's caveats are preserved; no closure without limits is declared.
