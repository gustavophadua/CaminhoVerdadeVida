# M10 — Faithfulness of the M1 explanations (2026-10-31)

**Português:** [M10-FIDELIDADE.md](M10-FIDELIDADE.md). This is a translation; if the two differ, the Portuguese text
prevails.

## Correction of attribution

The current code **does not extract the Conversation's scenarios from Z3's model**. Z3 decides the class; `ollama-node.ts` calls `cenarioDoSalto`, in `src/motor/revisor.ts:123`, which uses the Caderno's finite engine, without Z3, up to four objects/200,000 nodes/one world/a 5 s time limit. That is why this audit identifies the origin correctly instead of attributing to Z3 a model it did not provide.

## Real result

The M1 cego-v2 scores contain **62 independent ones**. For the 62, the same search and the same limits as the product found a scenario. The `Avaliador` in `src/motor/avaliar.ts` checked, by program, each premise formula as true and the conclusion as false. The Portuguese rendering of that model was compared with the one returned by `cenarioDoSalto`.

**62/62 checked (100% of the M1 independent ones), zero unavailable and zero failures.** The M1 translations and classes were not run again or tuned. Single measurement: 178 ms of harness; Vitest 2/2 tests, 1.60 s, exit 0. The duration does not include translation or Z3.

There is also a standard regression with an explicitly tampered model: the evaluator flags a false premise and a true conclusion. It confirms that the test does not accept any model by definition.

## Evidence

- Harness: `testes/missao10-cenarios.test.ts`, opt-in measurement `MISSAO10_MEDIR=1`, refuses an existing folder.
- Full results, including models, outside Git: `tmp/missoes/m10-cenarios/resultados.jsonl` and `resumo.json`.
- M1 scores preserved: `e711c7e733c65553da16a6cf14fc23b04e40cbfa687799b7d42e572c3993ec26`.
- M1 answers preserved: `41aa3c9e91b398ace6d148dcc57e67c6d4c95ca813094f62e4ed3647da1a2185`.
- Results of this audit: `aa354ba20e1571915fb800cb27e3ef6b8038d2eb034070afa1b0ff024c124e7c`.

## Limits

The evaluator and the generator belong to the project itself: this is not certification by an independent kernel, Carcara or extraction/checking of Z3's internal model. It checks the structured models and the link with the product's rendering, not an independent reverse interpretation of each Portuguese sentence shown. Nor does it check faithfulness between the human argument and the translation; a wrong translation can still have a correct countermodel for its own formulas. Result limited to M1 cego-v2, not generalized to all inputs or to the other historical versions.
