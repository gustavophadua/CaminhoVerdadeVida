# Todo 38 — Ordem dos carimbos na reentrada em sincronismo

15/11/2026. O Todo 37 limitou a idade útil da referência perdida. A Língua Secreta v19 perguntou como tratar registros em lados diferentes de uma correção de fase. A [parábola da torre (Lucas 14:28–30)](https://www.bible.com/pt/bible/211/LUK.14.28-32) motiva calcular o que falta antes de declarar o fechamento. A analogia não é premissa do teste.

A especificação primária [RFC 5905, §13 e apêndice A.5.5.6](https://www.rfc-editor.org/rfc/rfc5905) distingue ajuste gradual de salto e prevê reiniciar associações após um salto. Isso fundamenta a distinção operacional; não usei limiares do NTP como especificação de precisão do PMT.

Se z é o tempo físico do fechamento menos o do corte, j o salto assinado de fase entre os segmentos, e o resíduo diferencial restante e d a diferença de carimbos, todos em segundos, então d = z + j + e. Com z = 80 µs, j = −120 µs e e = 0, observa-se d = −40 µs: ordenar os carimbos brutos inverteria a ordem. O caso pressupõe um corte num segmento e o fechamento em outro; não há registro independente que já decida a ordem. Se d = −40 µs, j ∈ [−140, −100] µs e e ≤ 10 µs, segue z ≥ 50 µs. Sem magnitude do salto e com e = 0, por exemplo j = −20 ou −120 µs dá z = −20 ou +80 µs, respectivamente: saber apenas que o salto foi para trás deixa a ordem EM ABERTO.

Para correção gradual sem salto, considere a leitura ideal w(t) = t + b(t). Se sua inclinação for limitada inferiormente por m > 0 (adimensional), então em um intervalo com z > 0, d = A z > 0, com A ≥ m a taxa média. A consulta testa m = 0,9 sem quantização nem resíduo diferencial; não estima erro absoluto. Com quantização ou atrasos entre canais, mesmo uma rampa monótona exige guarda residual para decidir diferenças pequenas. Voltar a sincronizar não torna confiáveis automaticamente as comparações que atravessam a transição.

Aplicação ao Tubo: gravar contador monotônico, ID do segmento, carimbo civil e correção assinada com sua incerteza. Usar o contador monotônico para ordenar eventos do mesmo instrumento se a atribuição dos números refletir a aquisição; usar ponte certificada para relacionar carimbos de segmentos e instrumentos diferentes. Prefixo sem lacunas e prazo de entrega continuam sendo testes separados. Ensaio físico proposto: provocar um salto e uma rampa controlados e comparar a ordem de pulsos com um contador independente. Os resultados abaixo são condicionais; não houve coleta física ou eficácia medida.

T02–T03 contextualizam a cobertura limitada dos registros; T05 só motiva a exigência separada de cobertura de fontes. T09, sobre gasto de energia, não é premissa. T01, T04 e T06–T13 ficam fora da prova. Próximo teste: separar a ordem por contador monotônico da duração física quando há reinício e reinicialização do contador.

## Verificação executada

Via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Constantes numéricas de aridade zero, sem regras adicionais. Cada linha contém ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código de saída. Na RAMPA, a representa A.

```json
[
  [
    "SALTO_INVERTE",
    [
      "z = 1 / 12500",
      "j = −3 / 25000",
      "d = z + j"
    ],
    "d ≥ 0",
    "CONTRADIZ",
    [
      "sat",
      "unsat",
      "sat"
    ],
    0
  ],
  [
    "PONTE",
    [
      "d = −1 / 25000",
      "j ≥ −7 / 50000",
      "j ≤ −1 / 10000",
      "e ≤ 1 / 100000",
      "d = z + j + e"
    ],
    "z ≥ 1 / 20000",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "SEM_PONTE",
    [
      "d = −1 / 25000",
      "d = z + j",
      "j ≤ 0"
    ],
    "z ≥ 0",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "RAMPA",
    [
      "a ≥ 9 / 10",
      "d = a × z",
      "z > 0"
    ],
    "d > 0",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ]
]
```

Reexecutei 3 casos do Todo 37 e 5 da Língua Secreta v19, todos com estado esperado e código zero. Entradas conferidas em SHA-256 e nos blobs remotos: Todo 37 `31a31c44db95f82890869da0d55c3c62e35f63e6922c51c8fdb6186a31280661`; Língua Secreta v19 `fba37a341c9444e484626e020a28dbe4b43f613137a829ae4a5e66a627523742`. Base `43ac4eb6ef065500a29a1270ecff2ced599b5919`: verificador público aprovado; Pages falhou na base. BOOK preservado.
