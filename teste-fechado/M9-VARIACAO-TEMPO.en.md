# M9 — Variation and time (2026-10-31)

**Português:** [M9-VARIACAO-TEMPO.md](M9-VARIACAO-TEMPO.md). This is a translation; if the two differ, the Portuguese
text prevails.

## Protocol and result

The first ten items exclusively from `tmp/frases-gpt/revisao.jsonl`: G-001, G-002, G-006, G-008, G-013, G-015, G-016, G-017, G-018, G-020. Five runs per item, **50/50 unique pairs**, without using the test half. qwen3:4b `359d7dd4bcdab3d86b87d73ac27966f4dbb9f5efdfcc75d34a8764a09474fae7`, Ollama 0.40.12, cego-v2, temperature 0, seed 0, context 4096 and the vocabulary fixed by the set, as in the pilot. Integrated GPU, not used by the model.

**0/10 items changed** the final JSON answer; **0/10 changed** the pair of premise/conclusion formulas; **0/50 unreadable**. An observation limited to these five repetitions per item and configuration, not a guarantee of determinism on other machines/versions. Token counts and times are not part of the textual equality. No prompt was tuned from the results.

## Real times

| Stage | Samples | Median (s) | Largest (s) |
|---|---:|---:|---:|
| premissasMs | 50 | 42.9380 | 129.9710 |
| conclusaoMs | 50 | 34.5796 | 71.2739 |
| z3Ms | 50 | 0.4518 | 0.7392 |
| ponteMs | 35 | 0.4228 | 0.6153 |

Premises/conclusion include the calls and any repairs at each stage, measured with a monotonic clock. The first loading of the model may be included. Full translation: 4065.479 s of harness (Vitest 4066.74 s). These are not GPU times or an isolated benchmark.

After unloading Ollama (`ollama ps` empty), each of the 50 answers was checked by **a separate Z3 process**: 15 follows and 35 independent, zero without a class. The Z3 time measures `classificar`, without WASM/process initialization. The link measures `buscarPonte` only on the 35 independent ones, a formal search without an extra model; on the other 15 it is null/not applicable, not zero. It includes the real link search and validations; it does not represent the latency of a neural link. Times were collected in separate stages; they do not measure the total latency of the interface.

## Evidence and repeatability

- `testes/missao9-variacao.test.ts`: opt-in `MISSAO9_MEDIR=1`, refuses an existing folder; incremental output.
- `testes/missao9-conferencia.test.ts`: opt-in `MISSAO9_CONFERIR=0..49`, one pair per process, refuses a pair already written.
- Local results outside Git: `tmp/missoes/m9-variacao/respostas.jsonl`, `conferencias.jsonl` and `resumo-final.json`.
- Answers SHA-256: `3f3eeeb6fc0268137f99a6335e8cf58d175d3601ed6c59a87171bd76de9df856`.
- Checks SHA-256: `8a3420d3247d9219dc3e497cbf4eb16475754efcfefd06c2cd8dbcbe477d9d4b`.
- Review set SHA-256: `ea4477758eda67351675f4d3be3cc5fbf5d62dc883bc8d2251af7311c2189fa0`.
- Translator preserved: `e297fa24e6929f7a050f498e7238b16597a0ae0796ce8e1a033de65a04b866f8`.
- Link preserved: `e274d58d305caa26884010dfa5dd496b2c2ae554464f83b06aec1a7eabc37d7d`.

No translations were repeated after observing results. The standard regression skips the opt-in measurements. Zero variation does not demonstrate the faithfulness of the translations; the selection is review, with no inference about performance on the clean half.
