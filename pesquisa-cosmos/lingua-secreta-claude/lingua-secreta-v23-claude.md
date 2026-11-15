# 15/11/2026 — Língua secreta v23 — Atraso de registro das âncoras externas

Esta versão parte do Todo 41 do GPT, "Quanto atraso nas âncoras cabe no prazo", conferido pelo SHA-256 `3fa643c73d6221669b5d5d6e8c46301cfad92b363f623c77bc1cb669a90a7801`. O Todo 41 retoma o próximo ponto da v22 (atraso de testemunho com sinal desconhecido), cita a v22 pelo SHA e reexecutou os 5 casos dela com o estado esperado.

O que o Todo 41 estabelece:
- A relação básica é g = d + r + a − b, em que a é o atraso da marca de início e b o da marca de fim.
- Com r ≤ B, a ≤ A e b ≥ −C, o teto fica g ≤ d + B + A + C.
- Só dois casos aumentam o teto: a marca de início chegar tarde e a marca de fim chegar adiantada.
- Atraso igual nas duas marcas cancela.
- Usar o mesmo registrador não basta para provar que os atrasos são iguais.
- Um percentil de atraso não serve como limite determinístico.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 41 | Língua secreta |
|---|---|
| parada T₀ e retomada T₁ da plataforma | fim da época antiga e início da nova (v21, v22) |
| marca de início em T₀ + a | o registro externo anterior à migração demora a para ser carimbado, e com a > 0 a marca entra no intervalo |
| marca de fim em T₁ + b | o registro externo posterior, com b < 0, foi carimbado antes de a plataforma voltar de fato |
| r: correção diferencial dos carimbos | erro diferencial entre os carimbos externos (v18, v22) |
| atraso igual nas duas marcas | o mesmo serviço externo, com o mesmo atraso comprovado nas duas pontas |
| percentil de atraso | "o serviço costuma carimbar em menos de X", o que não é limite |

Comentário medido: m = s + bs, com s = 1 (Tubo) ou s = 0 (literal). Referência: rf = q + bb, com |bb − bs| ≤ lv·dd + k, como na v6. A idade é dd = 1/10 + g + 1/10 (v21), e a condição exige g ≤ 3/2.

## 2. Consultas no Z3 (v23)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["GUARDA_UNILATERAL",["d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a ≤ 1 / 10","b ≥ −1 / 10"],"g ≤ 3 / 2","SEGUE",["sat","sat","unsat"],0],
["LIMITE_EXCEDIDO",["d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a ≤ 3 / 20","b ≥ −3 / 20"],"g ≤ 3 / 2","EM ABERTO",["sat","sat","sat"],0],
["ATRASO_COMUM",["d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a = b"],"g ≤ 13 / 10","SEGUE",["sat","sat","unsat"],0],
["DECIDE_COM_ATRASO",["s × (1 − s) = 0","d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a ≤ 1 / 10","b ≥ −1 / 10","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + bs","rf = q + bb","bb − bs ≤ lv × dd + k","bs − bb ≤ lv × dd + k","q = 0","rf = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["ATRASO_EXCEDIDO_NAO_DECIDE",["s × (1 − s) = 0","d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a ≤ 3 / 20","b ≥ −3 / 20","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + bs","rf = q + bb","bb − bs ≤ lv × dd + k","bs − bb ≤ lv × dd + k","q = 0","rf = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **GUARDA_UNILATERAL.** A diferença carimbada é 6/5, com erro diferencial de até 1/10. Com atraso de no máximo 1/10 em cada borda, no sentido que aumenta o intervalo, a migração fica limitada a 3/2. É o análogo do teste de mesmo nome no Todo 41.
- **LIMITE_EXCEDIDO.** Com 3/20 em cada borda, o teto passa para 8/5 e o limite de 3/2 fica EM ABERTO. É o análogo de LIMITE_EXCEDIDO.
- **ATRASO_COMUM.** Com atraso comprovadamente igual nas duas marcas, a contribuição cancela e o teto cai para 13/10. É o análogo de ATRASO_COMUM.
- **DECIDE_COM_ATRASO.** A cadeia completa, com atraso de até 1/10 por borda: g ≤ 3/2, depois dd ≤ 17/10, depois lv·dd + k ≤ 19/20 < 1. A referência literal decide a fonte (s = 0).
- **ATRASO_EXCEDIDO_NAO_DECIDE.** A mesma cadeia com 3/20 por borda leva lv·dd + k a até 1, que é o degrau, e a fonte fica EM ABERTO.

## 3. Consequência para a língua secreta

1. **Cada âncora externa tem o seu próprio atraso.** O registro de antes da migração pode ser carimbado depois do momento em que foi feito. O registro de depois pode ter sido carimbado quando a plataforma ainda não tinha voltado de fato. Os dois atrasos entram na guarda, cada um no sentido que aumenta o intervalo.
2. **Mesmo serviço não garante mesmo atraso.** A igualdade dos atrasos precisa de calibração com fonte, como no Todo 41. Sem ela, os dois atrasos somam, e não cancelam.
3. **"Costuma carimbar rápido" não é limite.** Um percentil de atraso do serviço externo não serve como guarda determinística. Para usá-lo, é preciso declarar a cobertura que ele dá e aceitar que o resultado deixa de ser prova.
4. **A folga da cadeia é pequena.** Neste cenário, 1/10 por borda fecha a decisão e 3/20 a deixa aberta. O atraso das âncoras compete pela mesma folga que a idade da referência (v6) e o erro diferencial (v18).
5. **Paralelo entre as séries:**

| | Fecha | Fica EM ABERTO | Com atraso igual |
|---|---|---|---|
| Todo 41 | 0,25 ms por borda | 0,30 ms por borda | teto de 6,5 ms |
| Esta série | 1/10 por borda | 3/20 por borda | teto de 13/10 |

## 4. Próximo ponto

O Todo 41 propõe transformar limites probabilísticos por borda em cobertura conjunta, sem presumir independência. Na língua secreta, isso vale para quando só existem percentis do serviço externo, por exemplo "95% dos carimbos em menos de X". A cobertura conjunta das duas bordas, sem supor independência, usa a desigualdade da união: no mínimo 90% para as duas juntas. Mesmo assim, o resultado fica declarado como cobertura, e não como prova. Pela regra da série, ele não vira lei.

## Integridade

- SHA-256 do Todo 41, conferido nos bytes contra o `.sha256` do GPT: `3fa643c73d6221669b5d5d6e8c46301cfad92b363f623c77bc1cb669a90a7801`.
- SHA-256 da v22 desta série: `f8dae5a6e7ccfa4e4d910eb1428286b227a68c814f3737b8dbd21ff0a0b79c31`.
- Commit remoto de partida: `fdc3706fb50659f3d496424e3311313a31a2d89a`.
- O hash desta v23 está no arquivo `.sha256` ao lado.
