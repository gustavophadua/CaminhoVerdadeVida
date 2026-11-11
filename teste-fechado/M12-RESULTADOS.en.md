# M12 redefined — result on 2026-10-31

**Português:** [M12-RESULTADOS.md](M12-RESULTADOS.md). This is a translation; if the two differ, the Portuguese text
prevails.

**The three parts of M12 recorded within the scope of the trial, with caveats. Manual confirmation received from Gustavo; see [manual record](M12-CONFIRMACAO-MANUAL.en.md).** No browser automation, no access by the executor to the real account/private data/vault, no Groq and no change to authentication. The manual step was done by the operator themself, with a login the operator entered and without sharing credentials. The previous definition that counted all of Chrome was replaced by the operator. The old browser-control monitor was deleted.

| Part | Fact | Source | Limit |
|---|---|---|---|
| 1 — CSP | HTML HTTP 200, `Content-Security-Policy: connect-src 'self'`, no `script-src` added | `src/integracoes/html-local-node.ts`, `testes/integracoes-html.test.ts`; local capture `tmp/missoes/m12-node-v3/html.json` | HTTP/build alone do not demonstrate rendering; the operation of the Conversation was confirmed manually in part 3, without browser attestation |
| 2 — Node | Three questions completed; translation 3×, Z3 3×, link 1×; 774 TCP samples, only `127.0.0.1`, zero external destinations observed | `perguntas.jsonl`, `tcp.jsonl`, `resultado-node.json`, `fim-node.json`, `conferencia-artefatos.json` in the local output | Original ExitCode not measured; median interval 1,010 ms, maximum 5,103 ms. Sampling can miss short connections and does not measure UDP |
| 3 — Page | Keep log and three answers confirmed; complementary filter empty; sanitized HAR with 15 local entries, zero external | [Manual record](M12-CONFIRMACAO-MANUAL.en.md), [summary](m12-har-resumo.json) | Human confirmation; later visual counters not reconciled. data: and chrome-extension: resources separated from external HTTP network |

## Node trial observed

Prepared by `node scripts/m12-preparar.mjs`. Run only once:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/m12-rede-node.ps1 -Saida tmp/missoes/m12-node-v3
```

PID 1584; origin `http://127.0.0.1:4175`; service and trial driver in the same PID. Bridge, HTTP, authentication by signed challenge, model and Z3 worker real; no mocked adapter. The cryptographic fixture is of the same family as the tests in `integracoes-ollama.test.ts`; no token or seed was written. The temporary owner file contains only a disposable public key, not a real account. Cloud absent from the status, no Groq option supplied. Model qwen3:4b, digest `359d7dd4bcdab3d86b87d73ac27966f4dbb9f5efdfcc75d34a8764a09474fae7`, Ollama 0.40.12. Integrated GPU, not used by the model.

| ID | Public text | Z3 check | Flow time |
|---|---|---|---|
| M12-01 | Todo cliente tem suporte. A loja é cliente. Então a loja tem suporte. | follows | 291,386 ms |
| M12-02 | Todo cliente tem suporte. A loja tem suporte. Então a loja é cliente. | independent; one link option | 243,503 ms |
| M12-03 | Clientes do plano anual normalmente renovam. A padaria é cliente do plano anual. Então a padaria renova. | follows on the translated formulas | 254,192 ms |

(The three texts are the ones in DEMO.en.md: "Every client has support…", "…the store is a client", "Clients on the annual plan normally renew…".) These are classes of the formulas, not proof of a faithful translation. "Normalmente" (normally) requires the Conversation's linguistic warning; the Node capture does not demonstrate its presentation in the UI. The operator confirmed that the answers finished, without separate proof of the content of that warning.

Collection: first sample `2026-10-31T18:20:28.9304314Z`, last `2026-10-31T18:33:39.4146486Z`; questions from `18:20:30.689Z` to `18:33:39.781Z`. Total duration of the collector 794,294 ms, median interval 1,010 ms, maximum 5,103 ms; slowest query 5,014 ms. Exact one-second periodicity or continuous capture is not claimed. Listen/Bound with remote port zero, recorded as having no destination, were not counted as external connections. The report does not attribute the `0.0.0.0` of these states to an external connection.

### Accounting defect of the collector — evidence preserved

`Start-Process` supplied `ExitCode=null`; the test `$hospedeiro.ExitCode -ne 0` treated it as an error. So the **PowerShell script ended with exit 1**, even though `resultado-node.json` contains the three questions and `fim-node.json` records `sucesso:true`. Node's stdout/stderr are empty. **The null code was not converted into zero and the trial was not repeated.** The original `coletor-falha.json` and `coletor-resumo.json` remain intact.

The next version keeps the process Handle before it ends and distinguishes an unmeasured code from a failure of the questions. Trivial trials with exit 0 and 3 returned the expected values; they did not reproduce the null and do not prove a single cause. The fixed version was not used to invent a new result for the original trial. The check derived from the artifacts records this limit.

SHA-256 of the collector used: `3c8f93d20f8990defb007610a4021283ab0e83160af25245cece3f2380e45c18`. Questions are `dado público` (public data); raw HAR, tokens, vault, raw logs and temporary data stay out of the commit. Local receipts have their own hashes in `conferencia-artefatos.json`.

## Chrome and Ollama, separated from the scope

Ollama was active during the trial; its own connections were not captured. Chrome's internal update/component traffic was identified in the historical investigation, outside the current scope; no Chrome was opened or controlled here. This does **not** allow discarding external requests that appear in the Network panel of the Cosmos page. The manual filtered list must be empty.

## Code validation

- `npm.cmd run typecheck`: exit 0.
- `npm.cmd test -- testes/integracoes-html.test.ts testes/m12-har.test.ts testes/integracoes-ollama.test.ts --maxWorkers=1`: **16/16**, three files, 7.40 s.
- `npm.cmd run build`: exit 0, two builds completed; chunk >500 KiB warning preserved, last build 2.62 s.
- `VERIFICADOR_EXIGE_DIST=1 npm.cmd test -- --maxWorkers=1`: exit 0, **1,177 passed, 17 skipped, zero failures**, 97 files passed + six skipped (103), 299.77 s. Four new tests relative to the 1,173/17 snapshot.
- Check of the protected files: **13/13** before the build, after the build and after the suite; including `config.ts` byte for byte and the historical export.
- Raw HAR ignored by `*.har`; the summary's test proves removal of session, userinfo, path, query and bodies; an empty/invalid capture is not accepted. The summary alone does not authenticate the completeness of the capture.

Local logs: `tmp/missoes/m12-node-v3/{typecheck.log,focados.log,build-final.log,suite.log,preservacao-apos-build.json,preservacao-apos-suite.json}`. The first Windows PowerShell orchestration stopped at the normal `PLUGIN_TIMINGS` warning, treated as a NativeCommandError by the Stop option. The `build.log` log was preserved; the next closing uses native exit codes, keeps all the warnings and ended with exit zero. The full suite was run only once in this round.

The data above do not depend on repeating measurements M1–M15. The operator's later authorization allows integrating this delivery into main and publishing through Pages after the validations. It does not close M11, which is still without a Groq key in the process, nor does it authorize publishing credentials. Acceptance instructions and protection of the HAR: [M12-REDE.en.md](M12-REDE.en.md).
