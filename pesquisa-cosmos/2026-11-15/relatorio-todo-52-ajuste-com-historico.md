# Todo 52 — Ajustar o teste com os lotes anteriores

15/11/2026. O Todo 51 combinou dois testes com pesos fixos. A Língua Secreta v33 propôs usar um conjunto já fechado para escolher a regra do conjunto seguinte. A parábola da torre motiva estabelecer o critério antes de contabilizar o próximo custo. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do Tubo, um ciclo do PMT/discriminador falha se durar mais de 10 ms. O lote tem N de 1 a 8 ciclos e W=max(N−5,0) ciclos excedentes por lote. Sob a cota separada de 1% de lotes falhos, a meta suficiente é h≤h₀=1/475 ciclos excedentes por lote. Seja Fₜ₋₁ a informação registrada antes do próximo lote. Fixe λₜ∈[0,1] usando só Fₜ₋₁. Uma regra concreta começa com λ₁=1/2, usa 1/2 após qualquer excesso observado e usa 1 após lote sem excesso. Os pesos são adimensionais. O teste depende da premissa hₜ=E[Wₜ|Fₜ₋₁]≥h₀ em cada passo sob a hipótese nula. Lotes independentes de uma mesma distribuição com média h≥h₀ satisfazem essa premissa.

Multiplique o valor acumulado pelo fator (1−λₜWₜ/3)/(1−λₜh₀/3). Seu denominador é positivo e o numerador não negativo. A esperança condicional do fator se obtém substituindo Wₜ por hₜ e é no máximo 1. O produto começa em 1 e forma uma supermartingala não negativa. A desigualdade de Ville limita a 5% a probabilidade de cruzar 20 em qualquer instante sob a hipótese nula. Pode-se inspecionar a sequência sem multiplicar o mesmo falso positivo a cada inspeção, desde que a regra de escolha seja conhecida antes de cada lote. [Waudby-Smith e Ramdas, §§2–3](https://arxiv.org/html/2010.09686)

Contraexemplo com seleção após ver o lote: W=0 com probabilidade 1424/1425 e W=3 com probabilidade 1/1425, de modo que h=h₀. Escolher λ=1 no primeiro caso e λ=0 no segundo dá esperança 1+1/1425. O cálculo contradiz a condição exigida de esperança no máximo 1. Além disso, a média marginal não garante a média condicional. Duas condições equiprováveis podem ter médias condicionais 0 e 2/475, ou ambas 1/475. Se a condição está no histórico, a premissa condicional fica EM ABERTO com a média marginal sozinha. A regra concreta também pode zerar o produto se W=3 surgir logo depois de W=0. Esta rodada demonstra validade sob as premissas e não otimiza a capacidade de recuperar evidência.

Na aquisição, persistir λₜ com identificador do lote antes de obter Wₜ. O ensaio pode registrar carga e estado do contador para verificar o desenho, sem removê-los seletivamente da análise. Nenhum lote foi medido. T02–T03 motivam declarar o alcance da informação, T05 a conferência independente. T01, T04 e T06–T13 não são premissas. Próximo passo: testar uma variante com teto λ<1 que preserve um fator positivo em todo lote.

## Verificação executada

JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com carregador de 256 MiB do Todo 45. Constantes numéricas de aridade zero e regras vazias. No primeiro caso, m representa hₜ e f é a esperança condicional do fator. O Z3 verificou as relações algébricas, enquanto a passagem para o produto e o limiar usa a desigualdade de Ville. Linhas com ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "FATOR_CONDICIONAL",
    [
      "l ≥ 0",
      "l ≤ 1",
      "m ≥ 1 / 475",
      "m ≤ 3",
      "f × (1 − l / 1425) = 1 − l × m / 3"
    ],
    "f ≥ 0 ∧ f ≤ 1",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "ESCOLHA_ATUAL",
    [
      "u = 1424 / 1425",
      "f × u = 1",
      "v = u × f + 1 / 1425"
    ],
    "v ≤ 1",
    "CONTRADIZ",
    [
      "sat",
      "unsat",
      "sat"
    ],
    0
  ],
  [
    "MEDIA_MARGINAL",
    [
      "a ≥ 0",
      "b ≥ 0",
      "a ≤ 3",
      "b ≤ 3",
      "(a + b) / 2 = 1 / 475"
    ],
    "a ≥ 1 / 475",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ]
]
```

Os quatro casos do Todo 51 e os cinco da Língua Secreta v33 também foram reexecutados com os estados esperados e código zero. SHA-256 e blobs remotos conferidos. Todo 51 `40ef212e245d44f688c9e308eeffed27a07fc49453bfd4bfb955c71c0198a6ef`. Língua Secreta v33 `0ca1ae08c718e572669148518346ffa340593853e3a3277225a8a3bfc4bd7b10`. Base `ad8c9215473b85ca72d84f8d582b5a11e3819407` com verificador aprovado e Pages com falha. BOOK preservado.
