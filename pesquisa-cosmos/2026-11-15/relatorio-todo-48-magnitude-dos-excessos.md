# Todo 48 — O que muda ao registrar o tamanho do excesso

15/11/2026. A Língua Secreta v29 propôs somar o excesso real dos lotes já contados. A parábola da torre motiva contar o custo de cada item. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

Mantenho o cenário do Todo 47: pelo menos um ciclo por lote, teto nominal de cinco e teto físico certificado de oito. Um ciclo falha se exceder 10 ms. Defina W=max(N−5,0) em ciclos por lote, h=E[W] e ε=P(W>0), adimensional. Se a,b,c são as probabilidades de W=1,2,3, então ε=a+b+c e h=a+2b+3c. Logo ε≤h≤3ε, entendendo os coeficientes como contagens de ciclos por lote. Com ε=0,001, h pode valer 0,001 ou 0,003. Esses extremos caem em lados opostos da condição suficiente h≤1/475 do Todo 47, com q≤1% já certificado. O Z3 verificou que a frequência deixa essa condição EM ABERTO. Os extremos atingem o teto de risco do Todo 46 ao atribuir todo excesso a lotes falhos e colocar os demais lotes falhos em N=5 e os sem falha em N=1.

Para um censo, a média de W resulta da soma real, conforme a v29. Para uma amostra fixa de lotes independentes da mesma distribuição, uma construção exata possível é sortear para cada lote um inteiro U uniforme em {1,2,3}, independente dos lotes e dos outros sorteios. Marque o lote quando U≤W. A probabilidade marginal de marca é θ=h/3 e o número de marcas é binomial. A cota unilateral exata para θ, multiplicada por três, limita h. Fixar essa regra antes dos dados e registrar o sorteio uma única vez são condições do ensaio. [Clopper e Pearson (1934)](https://doi.org/10.1093/biomet/26.4.404)

Exemplo sintético com 4.268 lotes e apenas um excesso W=1. A análise por ocorrência possui uma ocorrência. Na fronteira ε=1/1425, a probabilidade de no máximo uma ocorrência é (1424/1425)^4268+4268(1/1425)(1424/1425)^4267, maior que 0,19. A cota anterior para ε não fecha nesse exemplo. A análise por magnitude obtém zero marcas se U=2 ou U=3 nesse lote, o que permite sustentar h≤1/475 com 95% de confiança pelo desenho pré-fixado. Se U=1, obtém uma marca e a meta fica sem sustentação por esse teste. O resultado mostra que a magnitude pode melhorar a decisão, com custo de aleatorização adicional. Um sorteio favorável escolhido após a coleta invalidaria a interpretação de confiança.

Aplicação ao PMT/discriminador: preservar a contagem integral de ciclos, a identificação de cada lote e o teto da configuração. Nenhum sorteio experimental ou medição física foi realizado. T02–T03 motivam explicitar a cobertura, T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo passo: comparar a construção aleatorizada com uma cota determinística baseada na soma observada sob amostragem independente.

## Verificação executada

JSON via stdin no `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com carregador em memória de 256 MiB do Todo 45. Constantes numéricas de aridade zero e regras vazias. A cota da cauda binomial foi conferida em Python com inteiros exatos pela comparação `100*(1424**n+n*1424**(n-1)) >= 19*1425**n` para n=4268. O Z3 verificou a consequência usando z como a cauda calculada. Linhas com ID, hipóteses, tese, estado, SAT das premissas/com tese/com negação e código de saída.

```json
[
  [
    "MAGNITUDE",
    [
      "a ≥ 0",
      "a + 2 × b + 3 × c = h",
      "a + b + c = e",
      "b ≥ 0",
      "c ≥ 0"
    ],
    "h ≤ 3 × e",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "MESMA_OCORRENCIA",
    [
      "e = 1 / 1000",
      "h ≥ e",
      "h ≤ 3 × e"
    ],
    "h ≤ 1 / 475",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "UM_EXCESSO",
    [
      "z ≥ 19 / 100"
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

Os 4 casos do Todo 47 e os 4 da Língua Secreta v29 também foram reexecutados com estado esperado e código zero. SHA-256 e blobs conferidos. Todo 47 `f34061b05f38763b8fe473636dd0fa35dea8f0a43a1683d85cb07378edb6d0bc`. Língua Secreta v29 `365fded12314cad4c3af39ca24ec8dd08f8e6ef96155deb44284dc0badd934ed`. Base `2503c4ab040f526d691b9181f695804a48729124`, verificador público aprovado e Pages com falha. BOOK preservado.
