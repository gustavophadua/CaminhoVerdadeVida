# Plan reviewer v1: fact and view

**Português:** [revisor-v1.md](revisor-v1.md). This is a translation; if the two differ, the Portuguese text prevails.

Status on 2026-10-29: code and tests ready (`src/motor/revisor.ts`, `testes/revisor.test.ts`, a route in the local
service, the screen Labs → Revisar plano, Review plan). **Not yet measured with the real model**: the number for how often
the extractor gets it right only comes from the test on real plans checked by hand (§5). Until then, no accuracy rate of
the reviewer can be claimed.

## 1. What it is

The reviewer receives the text of a plan, project or proposal and says, for each conclusion that the text presents as a
consequence of other statements, whether it **follows from what the plan itself states**. What is classified is the
argument, never the person.

| Verdict | Means |
|---|---|
| proved | the conclusion follows from the statements the plan rests it on (Z3 proves it) |
| leap | it does not follow: the plan presents it as a consequence, but it is a view; it comes with a scenario in which all the supports hold and it fails |
| contradiction | the supports themselves prove the opposite of the conclusion |
| incompatible statements | the supports cannot hold together |
| no translation | the model did not produce formulas that parse |

The statements that serve as support and are not the conclusion of anything are listed as **base statements**: the plan
does not prove them, and they need a source (data, contract, research). Whether they are true in the world, the reviewer
does not say.

## 2. How it works

1. **Extractor** (`EXTRATOR = 'extrator-v1'`): the text is split into stretches of up to 1,500 characters (without
   breaking a paragraph). For each stretch, the model returns, bound to a JSON schema, the list of statements (one idea
   per sentence, pronouns replaced by the name) and the arguments (a conclusion and from 1 to 4 supports). Temperature
   0, context 8,192. The answer is checked (`lerExtracao`): repeated ids and nonexistent supports are removed.
2. **Translation**: each argument goes through assisted formalization (the same prompt and the same repair as the local
   service, `formalizacao-v1.md`), without a given vocabulary.
3. **Judge**: the model leaves memory and Z3 classifies each argument. For a leap, the Caderno's finite engine (without
   Z3) looks for the smallest scenario with the supports true and the conclusion false, and it comes out in Portuguese
   through the readings of the vocabulary.

Everything runs in the local service (`node scripts/integracoes-p0.mjs --ollama`), routes `ollama/revisar` (POST, up to
20,000 characters) and `ollama/revisar/estado` (GET). One review at a time, in the background; while it runs, the other
routes that use the model answer "busy". The text does not leave the computer. The report can be downloaded in Markdown
or JSON.

## 3. Known limits

- **The translator bends premises so that the conclusion follows** (`formalizacao-v1.md` §8, G- sentences): exactly the
  error that turns a leap into "proved". Until it is fixed (prompt v4, blind translation, training), the reviewer may
  say "proved" where there is a leap. This is the most serious defect for this product.
- The extractor is the same 4B model, without measurement: it may join or split ideas, link the conclusion to the wrong
  supports or not find implicit conclusions (those the text does not mark with "therefore", "so"…).
- m2 does no arithmetic: "the margin is 30%, therefore the profit covers the cost" cannot be decided.
- Each argument is translated on its own, with its own vocabulary: contradictions between distant parts of the plan do
  not show up.
- On the Vega 8, about one minute per stretch and another per conclusion.

## 4. Installation

`Instalar-Cosmos.cmd` (at the root) runs `scripts/instalar-windows.ps1`, without administrator rights: it checks for
Node.js 22 and Ollama and, if missing, installs them through winget (which asks for confirmation); runs `npm ci`; opens
Ollama and downloads qwen3:4b; puts the "Cosmos" shortcut on the Desktop, which opens `Abrir-Cosmos-IA.cmd`.
`-Conferir` only checks, without installing anything; `-Remover` removes the shortcut. The integrated graphics variable
(`OLLAMA_IGPU_ENABLE`) is not turned on by itself.

## 5. Before claiming any number

The test on 5 to 10 real plans, each checked by hand: how many of the existing conclusions the extractor found, how many
it linked to the right supports, and how many the reviewer classified right. The plans stay outside Git.

## 6. Server version

The local service was designed to have no login: it accepts only the origin `127.0.0.1` and trusts whoever is at the
computer. The server is another piece (`src/integracoes/revisor-servidor-node.ts`, `scripts/servidor-revisor.mjs`, tests
in `testes/revisor-servidor.test.ts`), with the same core (`revisarPlano`):

- **An account per client:** `node scripts/servidor-revisor.mjs --nova-conta "Empresa X" --limite 20` creates the
  account and shows the key once; the accounts file (`privado/revisor/contas.json`, outside Git, or
  `COSMOS_REVISOR_CONTAS`) stores only its SHA-256. `--contas` lists and `--remover-conta ID` removes, without
  restarting.
- **API:** `POST /api/revisoes` with `Authorization: Bearer <key>` and `{"texto": "..."}` (up to 20,000 characters)
  answers 202 with the id; `GET /api/revisoes/<id>` gives the position in the queue, the progress and the report;
  `DELETE` deletes it before the deadline; `GET /api/saude` asks for no key. Another account's review answers 404.
- **Queue and limits:** one review at a time (the model does not run two); up to 2 in progress per account, each
  account's daily limit, up to 20 in the queue; 20 wrong keys per minute from the same address block the rest of the
  minute.
- **Data:** the text of the plan leaves memory when the review ends; the report stays for 24 hours and disappears;
  nothing goes to disk; the logs have account, id, size, time and number of conclusions, never the content.
- **Network:** listens on `127.0.0.1:4180` by default (`COSMOS_REVISOR_HOST`, `COSMOS_REVISOR_PORTA`); HTTPS is handled
  by a reverse proxy in front (Caddy or nginx, with a certificate). Ollama runs on the same computer.

Still missing, and it is up to the owner: the machine (with a graphics card; the provider and the cost), the domain and
the certificate, the terms of use and of data processing (LGPD, Brazil's data protection law; GDPR for clients in
Europe) and the decision to open it to clients, after the test in §5.
