# Todo 44 — Risco por lote e risco por ciclo

15/11/2026. O Todo 43 mostrou por que uma condição compartilhada pode invalidar a contagem binomial de ciclos. A Língua Secreta v24 separou cobertura de lote e avaliação do caso. A v25, lida localmente, distingue repetições sob a mesma condição de condições distintas. A parábola da torre motiva contar as unidades necessárias antes de testar. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No PMT/discriminador, defina falha como superar 10 ms no ciclo completo medido por referência independente. Para um lote com N≥1 ciclos e K falhas, ambos contagens inteiras, a fração K/N não excede o indicador I de que houve pelo menos uma falha. Assim, E[K/N]≤P(I=1)=q para a população de lotes. Isso limita o risco de sortear um lote e então sortear um de seus ciclos uniformemente. Se todo lote tem o mesmo N, esse risco coincide com o de um ciclo sorteado do conjunto total. Com 59 lotes independentes e da mesma distribuição, todos sem falhas, a cota unilateral de 95% para q é cerca de 4,95%. Pode haver dependência arbitrária dentro do lote. O resultado usa a inversão binomial do Todo 43. [Clopper e Pearson](https://doi.org/10.1093/biomet/26.4.404)

Para o risco de um ciclo sorteado do conjunto total com tamanhos variados, a distribuição deve ponderar cada lote pelo número de ciclos. Em uma população de lotes com E[N] finita, o risco ponderado é p=E[K]/E[N]. Na população finita, sorteie lotes com probabilidade proporcional a N e, dentro de cada lote selecionado, sorteie um ciclo uniformemente. A probabilidade de selecionar qualquer ciclo específico é então a mesma. [Hansen e Hurwitz, amostragem de populações finitas](https://doi.org/10.1214/aoms/1177731356)

Contraexemplo: 99% dos lotes contêm 1 ciclo sem falha e 1% contém 99 ciclos, todos com falha. O risco q por lote vale 1%, mas p vale (0,01×99)/(0,99×1+0,01×99)=50%. Deixar o tamanho w do lote ruim livre, com w≥1, mantém q=1% e permite p=1% quando w=1 ou p=50% quando w=99. A meta p≤5% fica EM ABERTO com esses dados. Todas as probabilidades são adimensionais.

Para ensaiar o Tubo, definir antes o que constitui um lote, por exemplo uma sessão que compartilha alimentação, estado do contador e temperatura. Registrar N, K e o processo de sorteio. A independência entre sessões é hipótese do cálculo e precisa ser defendida pelo desenho. A rodada é condicional e usou exemplos sintéticos. Nenhum ciclo físico foi coletado. T02–T03 motivam declarar a cobertura, T05 a verificação externa. T01, T04 e T06–T13 ficam fora das premissas. Próximo teste: obter uma guarda para p quando há uma razão máxima conhecida entre tamanhos de lotes.

## Verificação executada

Via stdin com `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Constantes numéricas de aridade zero e regras vazias. Campos: ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código de saída. Em TAMANHO_DESEQUILIBRADO, a e b são proporções dos dois tipos de lote. Em LOTE_DOMINA, p é o risco da seleção em duas etapas com lotes equiprováveis na população, ou do conjunto total quando N é constante.

```json
[
  [
    "LOTE_DOMINA",
    [
      "p ≥ 0",
      "p ≤ q",
      "q ≤ 1 / 20"
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
    "TAMANHO_DESEQUILIBRADO",
    [
      "a = 99 / 100",
      "b = 1 / 100",
      "q = b",
      "p × (a + 99 × b) = 99 × b"
    ],
    "q ≤ 1 / 20 ∧ p = 1 / 2",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "RISCO_NAO_IDENTIFICADO",
    [
      "q = 1 / 100",
      "w ≥ 1",
      "p × (99 + w) = w"
    ],
    "p ≤ 1 / 20",
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

Os 3 casos do Todo 43 e os 5 da Língua Secreta v24 foram reexecutados com os estados esperados e código zero. SHA-256 e blobs remotos conferidos para Todo 43 `f17e374a69eb0a624122a863b98c76a02c23b5c3804dcc7423e998219b2f6efd` e Língua Secreta v24 `a21e506a8858ecdd036a2e1b14e1bbc8f6a173d3e3662499af506cc8dc19885a`. A v25 foi referência exploratória, com SHA-256 local calculado `9d9c59b697d062c22fc53d2712e5e509c3171cb8dbcb0842d51695d5c85be962`. Seu manifesto não estava disponível e ela não entrou na reexecução conjunta. A base `3bca34623bafbb52bdcfc51b21c277350b9f0dbc` tinha o verificador público aprovado. BOOK preservado.
