# 14/11/2026 — PMT 29 — Cota conjunta do centro e das bordas

O IceCube caracterizou espectros de carga de fotoelétron único. A presente extensão é matemática, com valores sintéticos e sem coleta local ou simulação estocástica. [IceCube](https://arxiv.org/abs/2002.00997) · [Garwood](https://academic.oup.com/biomet/article-abstract/28/3-4/437/220104).

Considere densidade de fundo f≥0 em s⁻¹ pC⁻¹ na faixa [q₀−w,q₀+w], w=0,1 pC, e f′ Lipschitz com B=2 s⁻¹ pC⁻³. Ganho fixo, pulsos Poisson estacionários com marcas independentes, exposição viva T=300 s fixada de antemão e perdas eletrônicas desprezíveis. Para zero pulsos, a taxa integrada satisfaz M≤ln(20)/T<0,01 s⁻¹ no evento de cobertura unilateral de 95%. Pode-se devolver limite infinito para contagens positivas para preservar cobertura. A regularidade B precisa ser dada independentemente.

No mesmo evento, PMT 26 dá |f′(q₀)|≤19/30 e PMT 28 dá |f′(q₀±w)|≤23/30 em s⁻¹ pC⁻². Para distância t=|q−q₀| em pC, ambas as cotas propagam-se por Lipschitz. Em unidades numéricas, |f′(q)|≤min(19/30+2t,29/30−2t). O máximo do mínimo é 4/5 em t=1/12 pC. Juntar as cotas não requer dividir o nível de confiança porque ambas usam o mesmo evento sobre M. Este é o vínculo com a observação parcial das regras T01–T13, consultadas via leis-da-fisica-no-tubo.md. Para um corte abrupto j em pC, a cota correspondente de |D″| em x=1/g é j² vezes a cota de inclinação, em s⁻¹, quando jx está na faixa.

O Cosmos e o Z3 verificaram 4/5, abaixo do 5/6 uniforme do PMT 27. Estender 23/30 das bordas a toda a faixa ficou EM ABERTO sob as desigualdades combinadas. O par t=1/12, |f′|=4/5 é um contraexemplo algébrico a essa extensão. O teste não estabelece que o par seja realizável por um espectro não negativo com a taxa integrada indicada.

Prova condicional. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: usar a integral e não negatividade diretamente em pontos intermediários para testar se o envelope combinado pode ser apertado.

Comando executado: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin.

```json
[
  {
    "entrada": {
      "visao": "Cotas combinadas",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "distancia",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "inclina",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "distancia ≥ 0 ∧ 10 × distancia ≤ 1 ∧ inclina ≥ 0",
        "30 × inclina ≤ 19 + 60 × distancia",
        "30 × inclina ≤ 29 − 60 × distancia"
      ],
      "tese": "5 × inclina ≤ 4"
    },
    "saida": {
      "visaoDeclarada": "Cotas combinadas",
      "teseFormal": "5 × inclina ≤ 4",
      "leituraDaTese": "(5 · inclina) é menor ou igual a 4",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "distancia ≥ 0 ∧ 10 × distancia ≤ 1 ∧ inclina ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "30 × inclina ≤ 19 + 60 × distancia"
        },
        {
          "id": "hipótese 3",
          "formula": "30 × inclina ≤ 29 − 60 × distancia"
        }
      ],
      "envolvidos": [
        "hipótese 2",
        "hipótese 3",
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
      "visao": "Cotas combinadas",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "distancia",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "inclina",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "distancia ≥ 0 ∧ 10 × distancia ≤ 1 ∧ inclina ≥ 0",
        "30 × inclina ≤ 19 + 60 × distancia",
        "30 × inclina ≤ 29 − 60 × distancia"
      ],
      "tese": "30 × inclina ≤ 23"
    },
    "saida": {
      "visaoDeclarada": "Cotas combinadas",
      "teseFormal": "30 × inclina ≤ 23",
      "leituraDaTese": "(30 · inclina) é menor ou igual a 23",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "distancia ≥ 0 ∧ 10 × distancia ≤ 1 ∧ inclina ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "30 × inclina ≤ 19 + 60 × distancia"
        },
        {
          "id": "hipótese 3",
          "formula": "30 × inclina ≤ 29 − 60 × distancia"
        }
      ],
      "envolvidos": [],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "sat"
      }
    },
    "codigo": 0
  }
]
```
