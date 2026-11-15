# Todo 47 — Quantos lotes sustentam a cota de excesso?

15/11/2026. O Todo 46 vinculou o risco por ciclo ao excesso médio de tamanho. A Língua Secreta v28 destacou que um teto de exibição só serve se limitar a quantidade realmente avaliada. A parábola da torre motiva calcular o custo da amostragem antes de iniciá-la. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No exemplo do PMT, um ciclo falha se exceder 10 ms. Suponha um mínimo m=1 ciclo por lote, um teto nominal M=5 e um teto físico certificado H=8. Com N ciclos por lote e ε=P(N>5), o excesso normalizado h=E[max(N−5,0)]/m obedece h≤3ε. Assuma que q≤0,01, onde q é a probabilidade de um lote ter qualquer ciclo falho. Pelo Todo 46, o risco p de um ciclo sorteado uniformemente na população tem teto (5q+h)/(1−q+5q+h). A expressão cresce com q e h. No pior caso q=0,01, a meta p≤0,05 pede h≤1/475, de modo que basta ε≤1/1425. Probabilidades e razões são adimensionais. N, m, M e H contam ciclos por lote.

Para n lotes independentes e representativos da mesma distribuição, com tamanho registrado integralmente, a probabilidade de nenhum exceder cinco ciclos é (1−ε)ⁿ. Após observar zero excessos, a cota unilateral exata de 95% é 1−0,05^(1/n). Na fronteira ε=1/1425, as probabilidades são 0,05001475993 em 4.267 lotes e 0,04997966186 em 4.268. A monotonicidade em n torna 4.268 o mínimo desse desenho. A confiança se aplica à inferência de ε com q e H já certificados. Se q também for estimado, distribuir o risco estatístico entre as duas cotas antes de amostrar. [Clopper e Pearson (1934)](https://doi.org/10.1093/biomet/26.4.404)

Contraexemplo: com a mesma ε=1/1425, suponha que os lotes excepcionais aumentem de 6 para 9 ciclos, todos falhos, e que os demais lotes falhos tenham cinco ciclos. Lotes sem falha têm um ciclo. q e a probabilidade de zero excessos na amostra continuam iguais, mas a meta passa de satisfeita a violada. Sem a premissa sobre H, ε deixa a conclusão EM ABERTO. Os testemunhos usam tamanhos inteiros, enquanto o Z3 verificou uma relaxação real para o excesso por lote.

A implementação no Tubo exige obter H da configuração e contar ciclos na fonte, inclusive quando o registro de saída trunca o lote. Esta rodada fornece provas condicionais e contagens planejadas. Nenhum lote foi medido. T02–T03 motivam declarar a cobertura do registro e T05 a verificação independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo teste: comparar a cota por ocorrência de excesso com uma cota baseada na magnitude registrada dos excessos.

## Verificação executada

Usei JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com o carregador em memória de 256 MiB documentado no Todo 45. Constantes numéricas de aridade zero e regras vazias. Verifiquei externamente as potências exatas por multiplicação inteira em Python: `100000*1424**4267 >= 5001*1425**4267` e `100000*1424**4268 <= 4999*1425**4268`. O Cosmos e o Z3 verificaram as consequências usando essas cotas racionais. Nas linhas abaixo e representa ε e z é a probabilidade de zero excessos. Campos: ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código de saída.

```json
[
  [
    "ALVO",
    [
      "e ≥ 0",
      "1425 × e ≤ 1",
      "h ≤ 3 × e",
      "x ≤ 1 / 20 + h",
      "x ≥ 0",
      "y ≥ 99 / 100",
      "p × (x + y) ≤ x"
    ],
    "p ≤ 1 / 20",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "SEM_TETO",
    [
      "e = 1 / 1425",
      "w ≥ 1",
      "h = w × e",
      "x = 1 / 20 + h",
      "y = 99 / 100",
      "p × (x + y) = x"
    ],
    "p ≤ 1 / 20",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "N4268",
    [
      "z ≤ 4999 / 100000"
    ],
    "z < 1 / 20",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "N4267",
    [
      "z ≥ 5001 / 100000"
    ],
    "z ≤ 1 / 20",
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

Reexecutei também os 3 casos do Todo 46 e os 5 da Língua Secreta v28, todos com estado esperado e código zero. SHA-256 e blobs remotos conferidos. Todo 46 `59d0a09c91210a8f4879ddd2f7b80626d300ffe705058e5a424f016d08bdb8c4`. Língua Secreta v28 `b9f2561714daf9fb318c0052145f3ab7888a9021551343ee69775e92ea084eb1`. Base `adac87a784571d6ac02916375cee7392e5a72c94` com verificador público aprovado e falha no Pages. BOOK preservado.
