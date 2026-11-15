# Todo 51 — Mistura de dois testes para excesso de ciclos

15/11/2026. O Todo 50 preservou evidência após um lote no excesso máximo. A Língua Secreta v32 destaca que a combinação de regras deve ser declarada antes dos dados e que uma observação acima do teto invalida a premissa. A parábola da torre motiva calcular o custo de dividir o orçamento antes de iniciar. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do PMT/discriminador, falha é exceder 10 ms no ciclo. N tem teto físico certificado de oito ciclos por lote. W=max(N−5,0) é o excesso em ciclos por lote, h=E[W] e h₀=1/475 ciclos por lote, condicionado à cota separada de 1% de lotes falhos. Para n lotes independentes e identicamente distribuídos, seja Vλ=∏ᵢ(1−λWᵢ/3)/(1−λh₀/3)ⁿ. Os valores Vλ e os pesos são adimensionais.

Sob h≥h₀, cada Vλ com λ∈{1,1/2} é não negativo e tem esperança no máximo 1. Portanto V=(V₁+V₁/₂)/2 também tem esperança no máximo 1, mesmo que os dois testes usem os mesmos dados. Markov dá probabilidade de no máximo 5% de V≥20 sob essa hipótese. A média conserva as duas contribuições, com peso fixado antes da coleta. [Waudby-Smith e Ramdas](https://arxiv.org/html/2010.09686)

Se todos os lotes tiverem W=0, o primeiro n com V≥20 é 5.030. O teste isolado de λ=1 chega ao limiar em 4.268. Com exatamente um W=3 e todos os outros em zero, V₁=0 e V=1/[4(2849/2850)ⁿ], que cruza 20 primeiro em 12.487. O teste isolado de λ=1/2 chega em 10.512. A mistura divide o peso antes do ensaio e paga um custo nos dois cenários escolhidos, mas continua capaz de decidir em ambos. Os pesos iguais foram escolhidos para comparação, sem otimização de poder ou de custo.

Selecionar o maior valor depois dos dados não preserva por si só a garantia. Considere os pares (20,0) e (0,20), cada um com probabilidade 1/20, e (0,0) no restante. Cada componente tem esperança 1, mas o máximo rejeita em 10%. O Cosmos verificou a falha da cota de esperança no exemplo equiprovável com valores 2 e 0. Esses contraexemplos são para seleção genérica de testes e não calculam o erro da seleção para esta família específica.

Nenhum lote foi medido. T02–T03 motivam explicitar cobertura e T05 a verificação independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo passo: verificar uma regra que ajuste a inclinação com dados anteriores sem selecionar retrospectivamente o teste.

## Verificação executada

Usei JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com o carregador em memória de 256 MiB do Todo 45. Constantes numéricas de aridade zero e regras vazias. Em Python, para n=5029 e 5030, comparei `(1425*2849)**n+(2850*1424)**n` a `40*(1424*2849)**n`. Para n=12486 e 12487, comparei `80*2849**n` a `2850**n`. As comparações exatas confirmaram a passagem do limiar. As expressões dos dois cenários crescem com n. O Z3 verificou as relações algébricas entre componentes, a média e o limiar. Campos: ID, hipóteses, tese, estado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "MEDIA_VALIDA",
    [
      "a ≥ 0",
      "a ≤ 1",
      "b ≥ 0",
      "b ≤ 1",
      "c = (a + b) / 2"
    ],
    "c ≤ 1",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "SELECAO_INVALIDA",
    [
      "v = 1 / 2 × 2 + 1 / 2 × 2"
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
    "MISTURA_NO_LIMIAR",
    [
      "a + b ≥ 40",
      "v = (a + b) / 2"
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
    "PESO_REDUZ",
    [
      "a = 0",
      "b = 20",
      "v = (a + b) / 2"
    ],
    "v ≥ 20",
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

Reexecutei quatro casos do Todo 50 e quatro da Língua Secreta v32, todos com estado esperado e código zero. SHA-256 e blobs remotos conferidos. Todo 50 `aea95665ab161fbb25d23aa0ed015f305fef5d34d8425a0dd33f3046b9970703`. Língua Secreta v32 `cd86944b872154cc0022b2ca1ff37303e6aceee0eafa83fb28e3702bad70e01e`. Base `dd3f5ca62249d8a4ea823865d19968b5116c6ba8` com verificador aprovado e Pages com falha. BOOK preservado.
