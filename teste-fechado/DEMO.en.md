# Public demo of Cosmos — 2026-10-31

**Português:** [DEMO.md](DEMO.md). This is a translation; if the two differ, the Portuguese text prevails. The inputs
and answers are kept exactly as they were produced, in Portuguese, each followed by an English rendering.

Three real runs of the local core, without a private account. Model qwen3:4b `359d7dd4bcdab3d86b87d73ac27966f4dbb9f5efdfcc75d34a8764a09474fae7`, Ollama 0.40.12, cego-v2, temperature 0, seed 0, context 4096, vocabulary proposed by the model. Integrated GPU, not used by the model.

First the three real translations were made. Then the model was unloaded, and `executar`, `lerProposta`, `conferirProposta` (Z3), `cenarioDoSalto` and `resumoEmTexto` processed exactly the recorded translations, without any other inference. This two-stage arrangement avoids the model and Z3 coexisting on this machine. It is not a screenshot of the authenticated Conversation, nor network test M12; the authentication bridge was not bypassed. No answer below was replaced by the test's expectation.

## D-001 — follows

Public input:

> Todo cliente tem suporte. A loja é cliente. Então a loja tem suporte.

(Every client has support. The store is a client. So the store has support.)

Real answer from resumoEmTexto:

```text
Provado: a conclusão decorre das premissas.

Premissas:
- Todo cliente tem suporte.
- A loja é cliente.
Conclusão: Então a loja tem suporte.

Fórmulas (m2):
- ∀x (Cliente(x) ⟹ TemSuporte(x))
- Cliente(loja)
- conclusão: TemSuporte(loja)
```

In English: "Proved: the conclusion follows from the premises", followed by the premises, the conclusion and the
formulas.

## D-002 — does not follow

Public input:

> Todo cliente tem suporte. A loja tem suporte. Então a loja é cliente.

(Every client has support. The store has support. So the store is a client.)

Real answer from resumoEmTexto:

```text
Salto: a conclusão não decorre das premissas.

Premissas:
- Todo cliente tem suporte.
- A loja tem suporte.
Conclusão: Então a loja é cliente.

Cenário em que as premissas valem e a conclusão não:
- Loja: tem suporte; não: é cliente

Fórmulas (m2):
- ∀x (Cliente(x) ⟹ TemSuporte(x))
- TemSuporte(loja)
- conclusão: Cliente(loja)
```

In English: "Leap: the conclusion does not follow from the premises", with the scenario in which the premises hold and
the conclusion does not ("Store: has support; not: is a client").

## D-003 — ambiguous

Public input:

> Clientes do plano anual normalmente renovam. A padaria é cliente do plano anual. Então a padaria renova.

(Clients on the annual plan normally renew. The bakery is a client on the annual plan. So the bakery renews.)

Real answer from resumoEmTexto:

```text
Salto como está escrito; provado só se valer para todos.

"Clientes do plano anual normalmente renovam." diz "normalmente", e a lógica não tem "a maioria": para conferir, li como "Clientes do plano anual renovam." (vale para todos).
Com "normalmente", a conclusão não decorre: "normalmente" admite exceções, e o caso da conclusão pode ser uma delas. Ela só está provada se a frase valer para todos, e aí essa premissa é uma generalização que precisa de fonte.

Premissas:
- Clientes do plano anual renovam.
- A padaria é cliente do plano anual.
Conclusão: Então a padaria renova.

Fórmulas (m2):
- ∀x (PlanoAnual(x) ⟹ Renovam(x))
- PlanoAnual(padaria)
- conclusão: Renovam(padaria)
```

In English: "Leap as written; proved only if it holds for all." The answer explains that "normally" admits exceptions
and logic has no "most": to check, it read the premise as "Clients on the annual plan renew" (holds for all). With
"normally", the conclusion does not follow; it is only proved if the sentence holds for all, and then that premise is a
generalization that needs a source.

## How to read the result

- D-001: follows from the formalized premises, without proving that these premises are facts of the world.
- D-002: the real scenario found has support and is not a client; having support is not enough to conclude that it is a client. The class comes from Z3; the scenario comes from the product's finite engine, as in M10.
- D-003: Z3 confirms the strong universal version, but the answer warns explicitly that "normally" allows exceptions. Do not present this case as an unconditional proof of the original sentence.

No ordinary chat was run for comparison. So there is no invented answer from another model and no claim of a comparative win. There is also no independent certificate per answer in this demonstration.

## Local evidence

Harness `testes/missao14-demo.test.ts`, opt-in phases `MISSAO14_FASE=traduzir` and `conferir`, refuses to repeat an existing folder or answers. Translation: Vitest 2 passed/1 skipped, 388.04 s, exit 0. Check: 2 passed/1 skipped, 6.41 s, exit 0. The skips are the phase not selected, not omitted examples.

Data outside Git in `tmp/missoes/m14-demo/`: metadata, translations and exact answers.

Answers SHA-256: `17ca82d33d8a39e1e4b580c9dd02ec1e9d45ac479a2a8023ddb723c47fc9abf4`. Translations SHA-256: `104a45c1f73c9ed82ac87575480c605a078e50e832072082f667a3e00ff0ce26`. Preserved translator: `e297fa24e6929f7a050f498e7238b16597a0ae0796ce8e1a033de65a04b866f8`.
