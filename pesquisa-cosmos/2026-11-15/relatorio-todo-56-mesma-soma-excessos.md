# Todo 56 — A soma dos excessos não determina o produto

15/11/2026, horário de São Paulo. O Todo 55 comparou blocos de excessos máximos. A Língua Secreta v36 observou que uma regra sobre janelas exige ordem registrada. Esta rodada separa magnitude e ordem em dois lotes. A parábola da torre motiva contabilizar cada parcela do custo. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do PMT/discriminador, um ciclo falha se exceder 10 ms. Cada lote tem de 1 a 8 ciclos. O excesso W=max(N−5,0) pertence a {0,1,2,3}, em ciclos por lote. A regra usa λ=3/4 após um lote sem excesso e λ=1/2 após qualquer excesso. Para a meta de 1/475 ciclos excedentes por lote e sob a cota separada de 1% para lotes falhos, o fator adimensional é f=(1−λW/3)/(1−λ/1425). O controle de 5% ao atingir 20 exige que o peso seja escolhido antes do lote e que a média condicional de W sob a hipótese nula seja pelo menos 1/475 em cada passo. [Waudby-Smith e Ramdas](https://arxiv.org/html/2010.09686)

Parta de um lote limpo, com valor acumulado positivo. Para dois lotes seguintes e soma de três ciclos excedentes, (3,0) retém 475/1899 × 2850/2849 ≈ 25,02% do valor inicial. (2,1) retém 950/1899 × 2375/2849 ≈ 41,70%. (1,2) retém 1425/1899 × 1900/2849 ≈ 50,04%. Os dois casos com excessos positivos têm as mesmas magnitudes, em ordem inversa, e dão valores distintos porque o primeiro lote recebe peso maior. Uma meta ilustrativa de retenção de 40% fica EM ABERTO com a soma sozinha. O exemplo usa (3,0) para refutar a meta e (1,2) para satisfazê-la.

Para a aquisição, guardar W por lote e a sequência permite reproduzir o valor. A soma continua adequada para calcular a média observada de W. Ela não identifica o produto adaptativo. Os valores do teste são consequências condicionais e não houve coleta física. T02–T03 motivam explicitar cobertura e T05 a verificação independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo teste: determinar o pior produto, para um comprimento e uma soma fixos, por recorrência que preserve o estado do lote anterior.

## Verificação

Usei `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs` via JSON no stdin, com carregador de 256 MiB do Todo 45, constantes numéricas de aridade zero e regras vazias. Campos: ID, hipóteses, tese, estado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "MESMA_SOMA",
    [
      "a = 475 / 1899 × 2850 / 2849",
      "b = 1425 / 1899 × 1900 / 2849",
      "c = 950 / 1899 × 2375 / 2849"
    ],
    "a < c ∧ c < b",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "META_ABERTA",
    [
      "a = 475 / 1899 × 2850 / 2849",
      "b = 1425 / 1899 × 1900 / 2849",
      "(r = a) ∨ (r = b)"
    ],
    "r ≥ 2 / 5",
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

Todo 55 SHA-256 `4ae48f1324d946861a3dfb8e4611f230be0c32376ba16d643bd5384eae3febc8`. Língua Secreta v36 SHA-256 `22ebdc845fcf4d8d80bc8441904685c446a3e8864cae954f8d4bd908d27dca48`. Bytes e blobs conferidos. O verificador público passou na base `17614ef67f3e8a861053d417dfe736b3cffc56e7`.
Os dois casos do Todo 55 e os três da v36 foram reexecutados com estados esperados e código zero.
