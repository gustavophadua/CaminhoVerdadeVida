# 14/11/2026 — Todo 08 — Reserva necessária antes de recuperar energia

Em Lucas 14:28–30, o construtor considera se dispõe de recursos antes de iniciar. A ponte proposta distingue o custo ao fim de um percurso dos recursos necessários enquanto ele ocorre. A aplicação física é um ensaio condicional. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Newton, leis do movimento](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

No par clássico isolado da rodada anterior, a massa reduzida é μ=mM/(m+M)>0 em kg. Partindo de repouso relativo, o impulso acumulado j(t) em N·s produz Krel=j(t)²/(2μ) em J. Considere uma etapa monótona de 0 a J e outra monótona de J de volta a 0. A aceleração usa somente a reserva, sem perdas. Na frenagem, a fração η∈[0,1] da energia liberada volta à reserva e o restante é dissipado. A energia armazenada mínima ao longo da trajetória é R₀−J²/(2μ). O custo líquido final é (1−η)J²/(2μ). Ambos são independentes de um deslocamento comum das velocidades por um referencial galileano. A localização final e a capacidade real do atuador exigem dados adicionais.

Para m=1 kg, M=4 kg e J=1 N·s, o pico é 5/8 J. Com η=1, o custo final é zero, mas 1/4 J de reserva inicial é insuficiente. Com η=1/2, o custo final é 5/16 J e o pico continua em 5/8 J. O Cosmos e o Z3 verificaram essas consequências em unidades SI. A integral do movimento e a localização do pico foram deduzidas analiticamente. Valores sintéticos, sem simulação ou coleta física.

Cobertura: composição de etapas S3/S4 estendida de Todo 07. T01–T03/T11 motivam o registro parcial representado pelos estados inicial e final. T09 foi examinada em Todo 02. Próximo passo: calcular o pico com mais de duas inversões e eficiência de recuperação variável.

SHA-256 de Todo 07 conferido 5b97e1ba9cfae88e5899cb79bf078f8150ae32bcbe256e9152eae56eef69b070. SHA-256 do BOOK conferido nos bytes locais 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit remoto de referência 72f6b30466e6a4bd694e2f5242c6ecc2a419ff8c.

Comando executado com entradas via stdin

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

```json
[
  {
    "entrada": {
      "visao": "Reserva entre etapas",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "pico",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "eta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "liquido",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "8 × pico = 5",
        "eta ≥ 0 ∧ eta ≤ 1",
        "liquido = pico × (1 − eta)",
        "eta = 1"
      ],
      "tese": "liquido = 0 ∧ 8 × pico = 5"
    },
    "saida": {
      "visaoDeclarada": "Reserva entre etapas",
      "teseFormal": "liquido = 0 ∧ 8 × pico = 5",
      "leituraDaTese": "liquido é igual a 0 e (8 · pico) é igual a 5",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "8 × pico = 5"
        },
        {
          "id": "hipótese 2",
          "formula": "eta ≥ 0 ∧ eta ≤ 1"
        },
        {
          "id": "hipótese 3",
          "formula": "liquido = pico × (1 − eta)"
        },
        {
          "id": "hipótese 4",
          "formula": "eta = 1"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 2",
        "hipótese 3",
        "hipótese 4",
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
      "visao": "Reserva entre etapas",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "pico",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "eta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "liquido",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "8 × pico = 5",
        "eta ≥ 0 ∧ eta ≤ 1",
        "liquido = pico × (1 − eta)"
      ],
      "tese": "4 × pico ≤ 1"
    },
    "saida": {
      "visaoDeclarada": "Reserva entre etapas",
      "teseFormal": "4 × pico ≤ 1",
      "leituraDaTese": "(4 · pico) é menor ou igual a 1",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "8 × pico = 5"
        },
        {
          "id": "hipótese 2",
          "formula": "eta ≥ 0 ∧ eta ≤ 1"
        },
        {
          "id": "hipótese 3",
          "formula": "liquido = pico × (1 − eta)"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "tese"
      ],
      "verificacoes": {
        "premissas": "sat",
        "tese": "unsat",
        "negacao": "sat"
      }
    },
    "codigo": 0
  },
  {
    "entrada": {
      "visao": "Reserva entre etapas",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "pico",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "eta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "liquido",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "8 × pico = 5",
        "eta ≥ 0 ∧ eta ≤ 1",
        "liquido = pico × (1 − eta)",
        "2 × eta = 1"
      ],
      "tese": "16 × liquido = 5"
    },
    "saida": {
      "visaoDeclarada": "Reserva entre etapas",
      "teseFormal": "16 × liquido = 5",
      "leituraDaTese": "(16 · liquido) é igual a 5",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "8 × pico = 5"
        },
        {
          "id": "hipótese 2",
          "formula": "eta ≥ 0 ∧ eta ≤ 1"
        },
        {
          "id": "hipótese 3",
          "formula": "liquido = pico × (1 − eta)"
        },
        {
          "id": "hipótese 4",
          "formula": "2 × eta = 1"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 3",
        "hipótese 4",
        "tese"
      ],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "unsat"
      }
    },
    "codigo": 0
  }
]
```
