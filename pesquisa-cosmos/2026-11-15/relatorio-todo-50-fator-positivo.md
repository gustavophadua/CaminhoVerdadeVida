# Todo 50 — Um excesso máximo deixa evidência no teste

15/11/2026. O Todo 49 usou um fator que zera no excesso máximo. A Língua Secreta v31 calculou quanto da folga de um censo pode ser consumido por registros faltantes. A parábola da torre motiva fixar a margem antes da coleta. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do PMT/discriminador, a falha de um ciclo é ultrapassar 10 ms. O lote tem de 1 a 8 ciclos e W=max(N−5,0) excedentes, em ciclos por lote. A condição suficiente herdada é h=E[W]≤h₀=1/475 ciclos por lote, supondo a taxa de lotes falhos já limitada a 1%. Para n lotes independentes da mesma distribuição, escolha antes do ensaio λ=1/2 em V=∏ᵢ(1−λWᵢ/3)/(1−λh₀/3)ⁿ. λ e V são adimensionais. Sob h≥h₀, cada fator tem esperança no máximo 1 e é positivo. Por independência, E[V]≤1. Pelo limite de Markov, rejeitar h≥h₀ quando V≥20 controla o erro a 5% no tamanho de amostra fixado. [Waudby-Smith e Ramdas, médias limitadas](https://arxiv.org/html/2010.09686)

O numerador de cada fator fica entre 1/2 e 1. Um único lote com W=3, com os demais em zero, deixa numerador total de 1/2. A meta é sustentada por esse critério quando (2849/2850)ⁿ≤1/40, pela primeira vez em 10.512 lotes. Em 10.511 fica abaixo do limiar. O fator anterior, λ=1, zera nesse cenário para qualquer n. Escolher λ=1/2 preserva evidência diante do máximo e reduz o ganho de cada lote sem excesso. Essa escolha ilustra a troca e não resulta de otimização do tamanho amostral.

O mesmo cálculo cobre uma contagem faltante de um lote já incluído no plano mediante W=3 no pior caso, se o teto físico estiver certificado. Para ver o limite, no cenário de fronteira com denominador abstrato 1/40 e outro lote com W=1, o valor V vai de 50/3 a 100/3 conforme o lote ausente tenha W=3 ou W=0. O critério V≥20 fica EM ABERTO. Incluir um limite numérico para cada falta retoma a estrutura da v31, enquanto a conclusão aqui é sobre a média amostral sob hipóteses de inferência.

Nenhum dado físico ou eficácia local foi medido. T02–T03 motivam declarar cobertura, T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo passo: comparar uma mistura pré-fixada dos dois fatores com a escolha de um único λ.

## Verificação executada

Via JSON no stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, carregador de 256 MiB do Todo 45, constantes numéricas de aridade zero e regras vazias. Python verificou exatamente `40*2849**10511 > 2850**10511` e `40*2849**10512 <= 2850**10512`. No Z3, z representa o denominador. Campos: ID, hipóteses, tese, estado, SAT das premissas/com tese/com negação e saída.

```json
[
  [
    "FATOR_POSITIVO",
    [
      "w ≥ 0",
      "w ≤ 3",
      "f = 1 − w / 6"
    ],
    "f ≥ 1 / 2",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "N10512",
    [
      "z > 0",
      "z ≤ 1 / 40",
      "v × z = 1 / 2"
    ],
    "v ≥ 20",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "N10511",
    [
      "z > 1 / 40",
      "v × z = 1 / 2"
    ],
    "v ≥ 20",
    "CONTRADIZ",
    [
      "sat",
      "unsat",
      "sat"
    ],
    0
  ],
  [
    "ORCAMENTO_ABERTO",
    [
      "z = 1 / 40",
      "w ≥ 0",
      "w ≤ 3",
      "v × z = (1 − 1 / 6) × (1 − w / 6)"
    ],
    "v ≥ 20",
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

Reexecutei 4 casos do Todo 49 e 5 da Língua Secreta v31, todos com estado esperado e código zero. Todo 49 SHA-256 `e1a06245875c4fda1e9890ef1e8a7aa904bc6015a8be0b55c22004f4d6f6ece6`. Língua Secreta v31 SHA-256 `1849bfa9bc28c4eeb84fb26f8553fc0e39b4fe8e0acd0dfee541eb21e83c5831`. Bytes e blobs remotos conferidos. Verificador público aprovado e Pages com falha na base `8cce3e0c8004131664c69f8ca36900101ca33a85`. BOOK preservado.
