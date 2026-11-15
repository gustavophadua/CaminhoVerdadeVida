# Todo 53 — Limite de perda por lote no teste adaptativo

15/11/2026. O Todo 52 escolheu o peso a partir do histórico. A Língua Secreta v34 distingue ajuste e veto total. A parábola da torre motiva calcular a perda que o ensaio pode absorver. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do PMT, um ciclo falha se exceder 10 ms. Com 1 a 8 ciclos por lote, W=max(N−5,0) conta ciclos excedentes. A meta suficiente é h₀=1/475 ciclos excedentes por lote, sob a cota separada de 1% de lotes falhos. Use o fator adimensional f=(1−λW/3)/(1−λ/1425). Escolha λ antes de observar W. Uma regra possível começa em 1/2 e usa 3/4 após lote sem excesso ou 1/2 após lote com excesso. Sob a hipótese nula de média condicional E[W|histórico]≥h₀, a esperança condicional do fator é no máximo 1. O produto mantém o controle de 5% para atingir 20 pela desigualdade de Ville. [Waudby-Smith e Ramdas](https://arxiv.org/html/2010.09686)

Para λ entre 0 e 3/4 e W entre 0 e 3, o menor fator é 475/1899≈0,25013. O fator diminui com W para λ fixo e, em W=3, diminui com λ. O mínimo é atingido em W=3 e λ=3/4. Com λ=1 e W=3, o produto zera. Se λ puder variar entre 1/2 e 3/4, reter metade após W=3 fica EM ABERTO. Em 1/2, o fator é 1425/2849, acima da metade. Em 3/4, fica abaixo.

Na pior queda, 2.633 lotes consecutivos sem excesso recuperam o valor anterior se todos os lotes de recuperação usarem λ=3/4. A condição é (475/1899)(1900/1899)^n≥1. O mínimo é para esse cenário fixo. A regra adaptativa acima começa a recuperação em 1/2 e tem fronteira própria. Próxima rodada pode calcular essa fronteira e comparar sequências com excessos intercalados.

No Tubo, registrar λ antes da aquisição e preservar a contagem completa de W. T02–T03 motivam documentar a cobertura e T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Os resultados são condicionais, sem coleta física.

## Verificação

Via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com o carregador em memória de 256 MiB do Todo 45. Constantes numéricas de aridade zero e regras vazias. Python confirmou `475*1900**2632<1899**2633` e `475*1900**2633>=1899**2634` com inteiros. As consultas listam ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "PISO",
    [
      "l ≥ 0",
      "l ≤ 3 / 4",
      "w ≥ 0",
      "w ≤ 3",
      "f × (1 − l / 1425) = 1 − l × w / 3"
    ],
    "1899 × f ≥ 475",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "QUEDA",
    [
      "w = 3",
      "l ≥ 1 / 2",
      "l ≤ 3 / 4",
      "f × (1 − l / 1425) = 1 − l × w / 3"
    ],
    "f ≥ 1 / 2",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "SEM_TETO",
    [
      "l = 1",
      "w = 3",
      "f × (1 − l / 1425) = 1 − l × w / 3"
    ],
    "f > 0",
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

Todo 52 SHA-256 `87fa903ac6c415bf967edc48368050b4ccce39adbeff2ad01ac5ce69fe5d9698`. Língua Secreta v34 SHA-256 `09e75a5374ceb35f41f8d61fef0490754839d3c8b7835f9c312ed07288d3d98a`. Base remota `6307ddbae0dc56c6348d6124d8f326aaf6d69961` com verificador público aprovado e Pages com falha. Na primeira rodada, a falta de memória interrompeu a reexecução da v34 e a gravação do relatório.
 Na retomada, os três casos novos e os oito casos anteriores deram os estados esperados e código zero.
