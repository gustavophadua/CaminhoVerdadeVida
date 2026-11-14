# 14/11/2026 — Todo 07 — O custo da segunda etapa depende da primeira

A torre de Lucas 14:28–30 motiva calcular o orçamento de uma sequência inteira. A passagem trata do discipulado. A previsão desta rodada trata de um par mecânico ideal. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Newton, leis do movimento](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

Para duas massas clássicas constantes m e M em kg, positivas, sejam μ=mM/(m+M) e w a velocidade relativa em m/s. O par é isolado, sem dissipação, e cada etapa troca impulsos opostos. Um impulso assinado J em N·s muda w para w+J/μ. A variação cinética total em J é wJ+J²/(2μ). O custo ideal da reserva coincide com essa variação quando a energia armazenada é o único outro termo que varia. Como w é invariante sob mudança galileana, o custo também é.

Partindo de w=0, dois impulsos sucessivos J₁ e J₂, sem reiniciar o estado, têm custo total (J₁+J₂)²/(2μ). Somar os custos calculados como se ambos partissem do repouso relativo omite J₁J₂/μ. Para m=1 kg, M=4 kg e J₁=J₂=1 N·s, a primeira etapa custa 5/8 J e a segunda 15/8 J. A conta com reinício daria 5/4 J. A conta que acompanha o estado dá 5/2 J. Com orçamento de 15/8 J, a conta com reinício aprovaria o par de etapas e o Cosmos e o Z3 contradisseram essa aprovação com o estado preservado. O solver também verificou a expressão em termos da soma dos impulsos para os valores testados. A dedução geral foi algébrica.

Com impulsos de sinais opostos, o termo omitido é negativo. A variação cinética final pode ser zero mesmo após gasto intermediário. Recuperação de energia e limite de reserva durante a trajetória exigem hipóteses próprias. A rodada usa valores sintéticos, sem coleta física nem simulação. Cobre a composição de etapas em S3/S4 e estende Todo 06. T01–T03/T11 dão o contexto de observação parcial e T09 foi examinada em Todo 02. Próximo passo é testar o pico de gasto para impulsos opostos com recuperação ideal ou dissipada.

SHA-256 de Todo 06 conferido 843d093eea775dd4d3f422e32fa7a33b8907d2b60f25c509c8d6e4a3d8936b1a. SHA-256 do BOOK conferido antes e depois 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit remoto anterior a0f1aed0fde68791f9e265bf5543cb4ce051bc4c.

Comando executado

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Entradas via stdin em unidades SI.

```json
[
  {
    "entrada": {
      "visao": "Impulsos sucessivos",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "primeiro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "segundo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "custo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "primeiro = 1 ∧ segundo = 1",
        "8 × custo = 5 × primeiro × primeiro + 10 × primeiro × segundo + 5 × segundo × segundo"
      ],
      "tese": "8 × custo = 5 × (primeiro + segundo) × (primeiro + segundo)"
    },
    "saida": {
      "visaoDeclarada": "Impulsos sucessivos",
      "teseFormal": "8 × custo = 5 × (primeiro + segundo) × (primeiro + segundo)",
      "leituraDaTese": "(8 · custo) é igual a ((5 · (primeiro + segundo)) · (primeiro + segundo))",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "primeiro = 1 ∧ segundo = 1"
        },
        {
          "id": "hipótese 2",
          "formula": "8 × custo = 5 × primeiro × primeiro + 10 × primeiro × segundo + 5 × segundo × segundo"
        }
      ],
      "envolvidos": [
        "hipótese 2",
        "tese"
      ],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "unsat"
      }
    },
    "codigo": 0
  },
  {
    "entrada": {
      "visao": "Impulsos sucessivos",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "primeiro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "segundo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "custo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "primeiro = 1 ∧ segundo = 1",
        "8 × custo = 5 × primeiro × primeiro + 10 × primeiro × segundo + 5 × segundo × segundo"
      ],
      "tese": "8 × custo ≤ 15"
    },
    "saida": {
      "visaoDeclarada": "Impulsos sucessivos",
      "teseFormal": "8 × custo ≤ 15",
      "leituraDaTese": "(8 · custo) é menor ou igual a 15",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "primeiro = 1 ∧ segundo = 1"
        },
        {
          "id": "hipótese 2",
          "formula": "8 × custo = 5 × primeiro × primeiro + 10 × primeiro × segundo + 5 × segundo × segundo"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 2",
        "tese"
      ],
      "verificacoes": {
        "premissas": "sat",
        "tese": "unsat",
        "negacao": "sat"
      }
    },
    "codigo": 0
  }
]
```
