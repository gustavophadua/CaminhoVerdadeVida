# M12 — connections of the page and of the Node process, separately

**Português:** [M12-REDE.md](M12-REDE.md). This is a translation; if the two differ, the Portuguese text prevails. The
three test sentences are kept in Portuguese, as they must be typed.

The operator's redefinition on 2026-10-31 replaces the previous criterion that included the whole browser. **Acceptance requires the three parts below.** There is no browser automation or window control in this procedure.

## 1. Page: lock by code

The HTML of `scripts/integracoes-p0.mjs` is served by `src/integracoes/html-local-node.ts`, with the exact header `Content-Security-Policy: connect-src 'self'`. The bridge keeps authentication, Host/Origin and marker. No `script-src` directive was added; inline scripts and WASM compilation are not restricted by this policy. The HTTP test in `testes/integracoes-html.test.ts` checks the three HTML URLs, content, CSP and existing refusals.

This directive prevents external connections started by the page through fetch/XHR/WebSocket/EventSource/beacon in browsers that apply it. **It is not a firewall for Node and does not block every category of resource, such as images, scripts or navigation.** That is why part 3 remains mandatory. Build and HTTP response do not demonstrate rendering/execution of WASM in the browser; the Node trial checks real Z3, and the check of the page is manual.

## 2. Node process: automatic trial

Preparation, without opening a browser or reading a real account:

```powershell
node scripts/m12-preparar.mjs
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/m12-rede-node.ps1 -Saida tmp/missoes/m12-node-NOVO
```

The output must be new; there is no automatic repetition. The collector creates an exclusive Node, whose PID appears in `coletor-meta.json`. The trial's service and HTTP driver use the same PID. API, bridge, HTML, Ollama and the Z3 worker are real; there is no mock of transport, model or solver. The fixture uses `criarCofreTeste` and a signed challenge, like `integracoes-ollama.test.ts`; key, vault and tokens stay in memory. Only the disposable public key is written, in `dono-fixture-publico.json`, under the temporary output. `privado/ia-dono.json` and the operator's vault are not accessed.

No Groq option and no key reading; the service status must omit the cloud. Expected model qwen3:4b, digest 359d7dd4…; integrated GPU, not used by the model. Three fixed public arguments are sent to `/cosmos/__p0/ollama`, then `/ollama/conferir`; the independent leap triggers `/ollama/ponte`. No request with `nuvem:true`. The routes share the same origin, session and validations of the application. Model and Z3 take turns, without parallel measurement.

Every target second, `Get-NetTCPConnection -OwningProcess <PID>` records state and destination, without content, headers or tokens. Listen/Bound with remote port zero are recorded separately as having no destination, not as external connections. Every connection with a destination must be `127.0.0.1` or `::1`; another destination stops the process itself and is a serious finding. A query failure also stops it; a momentary absence of sockets is distinguished. The summary records the real intervals and the duration of the queries. TCP sampling can miss short connections and does not measure UDP or children; it does not constitute universal proof of absence of traffic.

Chrome (updates/components) and the Ollama process are explicitly out of scope. Chrome update traffic was identified earlier; it is not attributed to the Cosmos page. Its exclusion does not dispense with the Network capture of the page. No accounts or browser processes are started or monitored in this stage.

## 3. Page: Gustavo, manual, about five minutes of operation (plus waiting for the model)

1. Start the local instance yourself: `node scripts/integracoes-p0.mjs --ollama`, **without `--groq`**. Manually open `http://127.0.0.1:4175/cosmos/#/i-ai`. Use your local session normally, without giving a password/key to anyone. If the Node trial is still running, wait for the port to be released.
2. Open DevTools → Network, check **Preserve log**, clear the list and reload the page. Do not turn on the cloud. In the request for the `/cosmos/` document, check the Response Headers: `Content-Security-Policy: connect-src 'self'`.
3. Send, one at a time, waiting for each to finish:
   - Todo cliente tem suporte. A loja é cliente. Então a loja tem suporte.
   - Todo cliente tem suporte. A loja tem suporte. Então a loja é cliente.
   - Clientes do plano anual normalmente renovam. A padaria é cliente do plano anual. Então a padaria renova.
4. Confirm that the Conversation shows answers, the Z3 check and, on the independent leap, links. Record the start/end time and any error. This confirmation is of the real page, not just of the build.
5. In the Network filter, use exactly `-domain:127.0.0.1 -domain:localhost`. **Criterion: empty filtered list.** Network shows the page's requests, not those of Chrome's updater. Do not discard a destination of the page by claiming it belongs to Chrome. An external attempt blocked by the CSP is still information to report.
6. Record whether the list was empty. Clear the filter before exporting the **whole** HAR, to keep the local requests of the three questions. Save it outside Git. Do not send the raw HAR: even the browser's sanitized option may keep `X-Cosmos-Sessao`, bodies and responses. Do not paste headers or the session into a chat.
7. Run, yourself, on the local file:

```powershell
python -I -X utf8 -B scripts/m12-resumir-har.py "C:/local-path/cosmos-m12.har" "C:/local-path/m12-resumo.json"
```

The script reads the local HAR and creates a new file with only origins, counts and statuses; it does not copy full URLs, queries, headers, content or credentials. Share **only the summary** and the confirmation of three answers/times/empty filter. An empty or incomplete summary, or one with an invalid entry, does not pass the test. Keep the raw HAR locally if you need to audit it; do not add it to Git.

## Acceptance status

Automatic results are recorded separately in the run report. **Gustavo completed the manual check; see [record and limits](M12-CONFIRMACAO-MANUAL.en.md).** The script above remains reproducible. In the trial, the initial filter showed a chrome-extension: resource and a data: font; the list became empty on adding `-scheme:chrome-extension -scheme:data`. This separates local extension resources/embedded data, without ignoring external HTTP/HTTPS. The sanitized HAR is in [m12-har-resumo.json](m12-har-resumo.json). The caveats on sampling and the original ExitCode remain in M12-RESULTADOS.md; the original collector is not declared green. No historical result from another mission or visual fixture replaces the manual check.
