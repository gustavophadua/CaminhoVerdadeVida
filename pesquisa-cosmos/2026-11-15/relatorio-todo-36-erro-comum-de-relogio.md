# Todo 36 — Quando o erro comum de relógio cancela

15/11/2026. Continuação do Todo 35 e da Língua Secreta v17. O fechamento ainda exige prefixo sem lacunas em cada fonte relevante. Esta rodada resolve a comparação entre o carimbo de fechamento e o carimbo do fim da aquisição.

[Mateus 7:24–27](https://www.bibliaonline.com.br/naa/mt/7/24-27) motiva a distinção entre ter uma base verificável e presumir que ela existe. A parábola é uma analogia. O trabalho primário [White Rabbit — Sensor/Actuator Protocol for the CERN LHC Particle Accelerator (2009)](https://warwick.ac.uk/fac/sci/eng/research/grouplist/sensorsanddevices/mbl/database/ieeesensors09/PDFs/Papers/179_5543.pdf) apresenta um caso de engenharia que separa precisão relativa e alinhamento à escala de tempo. Seus números não calibram o Tubo.

Sejam a e f os tempos físicos de fechamento e fim; x e y seus carimbos; b um offset comum constante; e e d os resíduos de cada carimbo. Tudo em segundos. Hipóteses: x = a+b+e, y = f+b+d. Logo a−f = (x−y)−(e−d). Sob e−d ≤ B, a condição x−y ≥ B garante a ≥ f. Basta uma guarda unilateral porque a pergunta é se o fechamento ocorreu antes do corte. Com x−y = 0,12 ms e B = 0,05 ms, a−f ≥ 0,07 ms. A garantia permanece ao mudar a origem comum por uma constante. Se os offsets são distintos e sem limite diferencial, os mesmos carimbos são compatíveis com ambas as ordens.

Se o erro da base varia entre eventos, introduza r = b(a)−b(f), em segundos, e use a guarda de r+e−d. Com r = 0,10 ms e e−d = 0,05 ms, a diferença física é −0,03 ms. Uma guarda operacional pode somar limites superiores de r e e−d. Um relógio afim estritamente crescente, sem resíduos, preserva a ordem: o contraexemplo inclui perturbações diferenciais. Não supus independência probabilística nem estimei frequência de erro.

Aplicação: carimbar o fim da aquisição e o fechamento do registro do PMT/discriminador com referência compartilhada; injetar o mesmo pulso nos dois canais para medir o erro diferencial. Quedas de sincronismo, saltos e atrasos de canal devem estar cobertos na guarda. Confirmar também a sequência de registros. Nenhum pulso físico foi coletado. T02–T03 contextualizam a informação registrada e T09 o prazo herdado; T01, T04–T08 e T10–T13 ficam fora da prova. Próximo passo: derivar uma guarda de tempo após a perda do sinal de sincronismo.

## Verificação executada

JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Identificadores: constantes numéricas de aridade 0; `regras=[]`. Linhas: ID, hipóteses, tese, estado, satisfatibilidade das premissas/com tese/com negação, código de saída.

```json
[
  [
    "OFFSET_COMUM",
    [
      "x = a + b + e",
      "y = f + b + d",
      "e − d ≤ 1 / 20000",
      "x − y = 3 / 25000"
    ],
    "a − f ≥ 7 / 100000",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "OFFSET_DISTINTO",
    [
      "x = a + b",
      "y = f + g",
      "x − y = 3 / 25000"
    ],
    "a ≥ f",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "DERIVA",
    [
      "x − y = 3 / 25000",
      "x − y = a − f + r + e",
      "r = 1 / 10000",
      "e = 1 / 20000"
    ],
    "a ≥ f",
    "CONTRADIZ",
    [
      "sat",
      "unsat",
      "sat"
    ],
    0
  ]
]
```

Reexecutei 4 casos do Todo 35 e 6 da Língua Secreta v17, todos com o estado previsto e código zero. Entradas conferidas por SHA-256: Todo 35 `422e5c2c023c763c3d34b80d4e2e71a0bac32c6db341b73f7f73641f7225a424`, v17 `4ed9c7053f240efb8d2e2e90c292ffc8a2fc52bb11e196280dd48f1a216cb424`. BOOK preservado, `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `af3547351bb95bd005ba9caa6e8fc0734503a8b5`: verificador público aprovado; Pages falhou nessa base.
