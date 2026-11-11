# M11 — Cosmos + 120b on the test half: external dependency

**Português:** [M11-DEPENDENCIA-GROQ.md](M11-DEPENDENCIA-GROQ.md). This is a translation; if the two differ, the
Portuguese text prevails.

On 2026-10-31, the boolean check for the presence of `GROQ_API_KEY` in this process's environment returned **missing**. No credential value was read, shown or written; no key was searched for in a file, profile, vault or another session.

**Measurement not carried out.** There is no new Cosmos+120b/100 number, there was no public call and the old partial sample was not extrapolated. The absence of the variable is not a failure of Groq or a result of the model.

When the operator makes the variable available to the authorized process, keep cego-v2, the clean half and the frozen configuration; one slice of 25 items per day, distinct output `tmp/frases-gpt/cosmos120-teste/respostas/fatia-NN`. Check existing results before starting. On HTTP 429 stop, without switching account/key/provider to get around the quota; resume on another day. Unload the local model before the Z3 score, one process per short slice, without parallelism. Do not record the key in a log, Git, browser or VITE_*. The measurement was not replaced by a mock.

Resuming depends on the operator's configuration. No key was requested over the chat and no automatic billing was accepted. The adapter tests that come with this delivery are regressions with fake transport, not a real 120b measurement.

New check before the authorized integration into main (2026-10-31): the variable is still absent from the process environment, a boolean-only check. M11 remains not carried out; integration/deployment of the code does not represent a Cosmos+120b/100 result nor connect a provider on GitHub Pages. Do not search for credentials in files, vaults or other sessions.
