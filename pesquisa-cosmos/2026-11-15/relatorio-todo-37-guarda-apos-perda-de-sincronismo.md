# Todo 37 — Prazo da guarda após perda de sincronismo

15/11/2026. Partida: Todo 36 e Língua Secreta v18. A conexão é a mesma nos dois trabalhos: depois que a origem comum deixa de ser comprovada, importa a idade da última referência que limita a diferença. A [parábola da torre em Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32) motiva calcular essa margem antes de depender dela; não fornece premissas físicas.

O [NIST TN 2189, figura 9](https://tf.nist.gov/general/pdf/3140.pdf) documenta o erro temporal de um relógio de rubídio disciplinado após a perda de GPS. O erro passou a se acumular em regime de funcionamento livre. Isso motiva medir uma guarda para o instrumento real; os números abaixo são ilustrativos e não foram retirados do experimento.

Seja t ≥ 0 a idade, em s, de um carimbo local após a última calibração. Compare esse carimbo a um corte ancorado em uma referência cuja incerteza já foi incluída em B₀. O desvio diferencial e(t), em s, inclui o resíduo inicial e a integral do desvio fracionário de frequência. Se |e(0)| ≤ B₀ e |de/dt| ≤ ρ durante a falta de referência, sem saltos e com resíduos adicionais já incluídos na guarda inicial, então |e(t)| ≤ B(t) = B₀ + ρt. B₀ e B estão em s; ρ é adimensional (s/s). Para uma diferença registrada D, em s, a diferença física é z = D − e. Se há dois relógios livres, é preciso limitar a frequência diferencial, por exemplo pela soma dos limites individuais, e incluir a incerteza dos canais; não se pode reutilizar sem validação a guarda de um só relógio.

Para decidir z ≥ 0, basta D ≥ B(t). Se ρ > 0 e D ≥ B₀, a maior idade garantida para esse D é (D − B₀)/ρ. Com D = 120 µs, B₀ = 50 µs e ρ = 10 ppm, a idade máxima é 7 s; no limite pode haver igualdade. Aos 8 s, B = 130 µs e z pode ir de −10 a +250 µs. O resíduo positivo máximo fornece um contraexemplo à ordem aparente. Ultrapassar 7 s retira a garantia para esta margem, sem provar inversão em geral. Para ρ = 0, a idade não amplia a guarda neste modelo.

Aplicação: no registro do PMT/discriminador, manter a hora do último sincronismo válido junto aos carimbos e ao estado do relógio. Suspender a decisão temporal quando a margem não cobre a guarda. Continuidade do prefixo das fontes continua sendo requisito separado. Teste físico proposto: cortar a referência, aplicar pulsos com referência independente, registrar fase, temperatura e saltos e validar um envelope em intervalos reservados. Nenhuma coleta física local ou eficácia experimental foi medida.

T02–T03 motivam declarar o que os registros cobrem. T05 é uma analogia ao requisito separado de múltiplas fontes. T09 trata de consumo de energia na base e não é premissa para este prazo. T01, T04, T06–T13 não são verificadas pelas consultas. Próximo passo: testar a reentrada em sincronismo quando ocorre salto de fase ou slewing.

## Verificação executada

Via JSON no stdin de `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, constantes numéricas de aridade 0, sem regras adicionais. Campos: ID, premissas, tese, estado, SAT das premissas / com tese / com negação, código de saída. Em segundos, b é B(t), e é o desvio e z a diferença real.

```json
[
  [
    "ATE_SETE",
    [
      "t ≥ 0",
      "t ≤ 7",
      "b = 1 / 20000 + t / 100000",
      "e ≤ b",
      "z = 3 / 25000 − e"
    ],
    "z ≥ 0",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "OITO_ABERTO",
    [
      "t = 8",
      "b = 1 / 20000 + t / 100000",
      "e ≥ −b",
      "e ≤ b",
      "z = 3 / 25000 − e"
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
    "INVERSAO",
    [
      "t = 8",
      "e = 1 / 20000 + t / 100000",
      "z = 3 / 25000 − e"
    ],
    "z ≥ 0",
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

Também reexecutei os 3 casos do Todo 36 e os 5 da Língua Secreta v18: todos deram o estado esperado e código zero. Entradas conferidas nos bytes locais e pelos blobs da árvore remota: Todo 36 SHA-256 `b5d41184c96a86c66b123b1496e6c3f14ba4ddcc5448893e48ce840d4278c822`; Língua Secreta v18 SHA-256 `87ee05c9a36ad58520b903a0d47a642058186a44684ee6e9df25945c953cc38f`. Base remota `197d2176c2abad672bfa2139810f535730e95d0a`, verificador público aprovado, Pages falhou nessa base. O BOOK não foi alterado.
