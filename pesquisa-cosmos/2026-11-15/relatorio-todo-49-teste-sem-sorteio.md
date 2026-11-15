# Todo 49 — Teste da magnitude sem sorteio adicional

15/11/2026. O Todo 48 usou sorteio auxiliar para inferir a média do excesso. A Língua Secreta v30 somou excessos no censo e levantou o caso dos lotes sem registro. A parábola da torre motiva definir previamente o orçamento e o critério de decisão. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do PMT, cada ciclo falha se exceder 10 ms. N conta ciclos por lote e tem teto físico certificado de oito. W=max(N−5,0) conta o excesso em ciclos por lote. h=E[W] é a média em ciclos por lote e a meta suficiente herdada é h≤h₀=1/475, sob q≤1% de lotes com falha já certificado. Tome n lotes independentes da mesma distribuição e declare a regra antes da coleta.

Sob h≥h₀, o produto V=∏ᵢ(1−Wᵢ/3)/(1−h₀/3)ⁿ é não negativo, adimensional e tem esperança no máximo 1, por independência. A desigualdade de Markov dá P(V≥20)≤0,05 sob essa hipótese. Rejeitá-la nesse limiar sustenta a meta com controle de erro de 5%, condicionado às premissas. Este é um caso de fator linear para médias limitadas. [Waudby-Smith e Ramdas](https://arxiv.org/abs/2010.09686)

Para decidir apenas com a soma S=ΣᵢWᵢ, em ciclos, use V≥max(0,1−S/3)/(1424/1425)ⁿ. A desigualdade segue por iteração de (1−a)(1−b)≥1−a−b para a,b em [0,1]. Rejeitar quando esse limite inferior chega a 20 mantém o controle do erro. Com um único ciclo excedente no total, S=1, o produto do numerador é exatamente 2/3. A exigência (1424/1425)ⁿ≤1/30 passa em 4.846 lotes e falha em 4.845. É o mínimo para este critério com S=1. Em 4.268 lotes, o desenho aleatorizado do Todo 48 ainda pode aprovar, a depender de seu sorteio único. Os dois critérios diferem na regra de decisão e o número calculado não estabelece uma comparação geral de poder.

Um lote conhecido sem contagem pode ocupar qualquer valor W em [0,3]. No exemplo de fronteira com os outros excessos iguais a zero e denominador 1/30, W=1 aprova e W=3 zera V. A decisão fica EM ABERTO sem a contagem. Usar W=3 para o lote faltante é conservador porque só reduz V. Isso pressupõe que o lote integra a amostra planejada e que seu teto físico vale. Descartar lotes ausentes mudaria a amostra.

Aplicação ao Tubo: registrar lotes completos antes da filtragem do contador. Os números são provas condicionais e exemplos sintéticos. Nenhuma medição física foi realizada. T02–T03 motivam explicitar a cobertura e T05 a referência independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo passo: comparar o fator linear fixo com um fator que continue informativo quando há um lote no excesso máximo.

## Verificação executada

JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com o carregador em memória do Todo 45. Constantes numéricas de aridade zero e regras vazias. Python verificou `30*1424**4845 > 1425**4845` e `30*1424**4846 <= 1425**4846` em inteiros exatos. O Z3 recebeu essas comparações como guardas sobre z, o denominador do produto. O caso do lote faltante usa a fronteira abstrata z=1/30. Linhas com ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "SOMA_LIMITE",
    [
      "a ≥ 0",
      "a ≤ 1",
      "b ≥ 0",
      "b ≤ 1",
      "r = (1 − a) × (1 − b)"
    ],
    "r ≥ 1 − a − b",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "N4846",
    [
      "z ≤ 1 / 30",
      "z > 0",
      "v × z = 2 / 3"
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
    "N4845",
    [
      "z > 1 / 30",
      "v × z = 2 / 3"
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
    "LOTE_FALTANTE",
    [
      "w ≥ 0",
      "w ≤ 3",
      "z = 1 / 30",
      "v × z = 1 − w / 3"
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

Os 3 casos do Todo 48 e os 4 da Língua Secreta v30 também deram os estados esperados e código zero. SHA-256 e blobs conferidos. Todo 48 `986e674300792f9739b86c29dfc4659022b8f553c003b14fe6e8e1874a1cc383`. Língua Secreta v30 `a4023177a46bd1042074c49b01338a89059d9547289fadc8ff94850f2b224689`. Base `88e282fe71d7737c63aec2a45c09d9d1eb1f6b1f` com verificador público aprovado e Pages com falha. BOOK preservado.
