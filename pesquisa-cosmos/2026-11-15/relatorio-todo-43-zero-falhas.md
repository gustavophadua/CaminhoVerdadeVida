# Todo 43 — Quantas tentativas sem falha sustentam a meta de 5%?

15/11/2026. O Todo 42 derivou cobertura conjunta a partir dos riscos de cada borda. A Língua Secreta v24 separou a cobertura do lote da avaliação de um caso. A parábola da torre motiva fixar os recursos do ensaio antes de iniciá-lo. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

Defina falha como ultrapassar o prazo total de 10 ms em uma tentativa completa, medido por referência externa calibrada. Fixe de antemão n, a regra de classificação e o regime de carga. Se as tentativas são independentes e têm a mesma probabilidade p de falha, o total X tem distribuição binomial, e Pₚ(X=0)=(1−p)ⁿ. p e as probabilidades são adimensionais e n é contagem inteira positiva. Para zero falhas, a cota superior exata unilateral com confiança 1−α é U=1−α^(1/n), obtida invertendo a probabilidade de X=0. [Clopper e Pearson (1934)](https://doi.org/10.1093/biomet/26.4.404)

Para U≤0,05 com α=0,05, requer-se (19/20)ⁿ≤1/20. O n mínimo é 59: com 58, a probabilidade de zero falhas na fronteira p=0,05 é 0,05104686868. Com 59, é 0,04849452525. A cota após 59 tentativas sem falha é cerca de 4,951%. A confiança é propriedade do procedimento em repetições do ensaio. A conclusão para o próximo caso individual continua dependente de suas próprias medições. A contagem proposta testa o prazo completo e permite dependência entre as bordas da mesma tentativa. Para validar cada borda separadamente, o alvo e o orçamento de confiança das duas cotas teriam de ser definidos à parte.

Contraexemplo: se todo o lote compartilha uma condição ruim com probabilidade 0,10 e todas as tentativas falham nessa condição, cada tentativa tem p=0,10, mas P(X=0)=0,90 para qualquer n. Repetir dentro de um único lote dependente não sustenta a cota binomial. No PMT/discriminador, planejar ciclos completos com condições representativas e registrar fonte, carga e lote. Ensaios sem confirmação da referência exigem classificação prévia no protocolo. Próximo passo: estudar a unidade efetivamente independente quando as tentativas estão agrupadas por lote. Nenhuma coleta ou eficácia local foi medida. T02–T03 motivam explicitar cobertura e T05 a referência independente. T01, T04 e T06–T13 ficam fora das premissas.

## Verificação executada

Python com aritmética racional verificou `Fraction(509,10000) <= Fraction(19,20)**58` e `Fraction(19,20)**59 <= Fraction(485,10000)`. A monotonicidade em n estabelece a minimalidade. As comparações da fronteira foram executadas no Cosmos e no Z3 usando as cotas racionais e q=P(X=0). O Z3 não calculou as potências. Comando `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, via stdin, com constantes numéricas de aridade zero e regras vazias. Linhas com ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "N59",
    [
      "q ≥ 0",
      "q ≤ 485 / 10000"
    ],
    "q < 1 / 20",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "N58",
    [
      "q ≥ 509 / 10000"
    ],
    "q ≤ 1 / 20",
    "CONTRADIZ",
    [
      "sat",
      "unsat",
      "sat"
    ],
    0
  ],
  [
    "FALHA_COMUM",
    [
      "p = 1 / 10",
      "q = 1 − p"
    ],
    "q ≤ 1 / 20",
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

Reexecutei os 4 casos do Todo 42 e os 5 da Língua Secreta v24, com estado esperado e código zero em todos. SHA-256 e blobs conferidos. Todo 42 `60e48b192dbd2250c8b1ac3bf486419ae5b2db614feab0654db4033fb690140b`. Língua Secreta v24 `a21e506a8858ecdd036a2e1b14e1bbc8f6a173d3e3662499af506cc8dc19885a`. Base `be6d43d4f84aebdf906719a99ad384fb5185c0c9` com verificador público aprovado e Pages cancelado. BOOK preservado.
