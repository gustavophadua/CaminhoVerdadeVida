# 14/11/2026 — PMT 26 — Inclinação no centro de duas faixas sem pulsos

O IceCube publicou calibração de distribuições de carga dos PMTs. A inversão de Poisson segue Garwood. Os números desta rodada são sintéticos. [IceCube](https://arxiv.org/abs/2002.00997) · [Garwood](https://academic.oup.com/biomet/article-abstract/28/3-4/437/220104).

Continuação do PMT 25. Seja f≥0 uma densidade de fundo em s⁻¹ pC⁻¹ no intervalo [q₀−w,q₀+w], w>0 em pC, e |f′(q)−f′(r)|≤B|q−r|, com B em s⁻¹ pC⁻³. Denote por F a média de f no intervalo e por k=f′(q₀) a inclinação central em s⁻¹ pC⁻². O resto de Taylor tem módulo ≤Bt²/2 a uma distância |t| do centro. No extremo em direção oposta ao sinal de k, a não negatividade implica f(q₀)≥|k|w−Bw²/2. A integração simétrica elimina o termo linear e dá F≥f(q₀)−Bw²/6. Portanto |k|≤F/w+2Bw/3.

Com pulsos de Poisson estacionários, ganho fixo, marcas independentes, exposição viva T fixada e efeitos desprezíveis de tempo morto e pós-pulsos, a contagem total tem média μ=2TwF. Para zero contagens, o limite unilateral de 95% é μ≤ln(20). Pode-se usar limite infinito para resultados positivos e preservar cobertura mínima de 95%. Assim, no evento de cobertura, |k|≤ln(20)/(2Tw²)+2Bw/3. A cota é central e não deve ser tomada como uniforme. Para o corte j em pC com j/g=q₀, a curvatura na coordenada x=1/g é D″=j²k, em s⁻¹. A ligação com T01–T13, consultadas pelo relatório leis-da-fisica-no-tubo.md, é inferir a partir de um registro agregado sob restrições explícitas.

Para T=300 s, w=0,1 pC e B=2 s⁻¹ pC⁻³, a cota central conservadora é 19/30 s⁻¹ pC⁻², usando ln(20)<3. O Cosmos e o Z3 verificaram as desigualdades algébricas com essa aproximação e obtiveram SEGUE. Sem as restrições de Taylor, o resultado ficou EM ABERTO. Um contraexemplo físico ao remover B=2 é f(q)=0,04+0,02 sen(50(q−q₀)), em s⁻¹ pC⁻¹, com frequência em pC⁻¹. É não negativa, tem F=0,04, μ=2,4 e k=1. A integração e o contraexemplo físico foram deduzidos analiticamente.

Sem simulação ou medição local. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: deduzir cotas fora do centro para obter uma garantia uniforme sem recorrer à cota mais frouxa da rodada 25.

Comando executado: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin.

```json
[
  {
    "entrada": {
      "visao": "Inclinação no centro",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "media",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "centro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "inclinacao",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "media ≥ 0 ∧ 20 × media ≤ 1",
        "centro ≥ 0",
        "inclinacao = inclinacao",
        "300 × centro ≤ 300 × media + 1",
        "100 × centro + 1 ≥ 10 × inclinacao ∧ 100 × centro + 1 ≥ −10 × inclinacao"
      ],
      "tese": "30 × inclinacao ≥ −19 ∧ 30 × inclinacao ≤ 19"
    },
    "saida": {
      "visaoDeclarada": "Inclinação no centro",
      "teseFormal": "30 × inclinacao ≥ −19 ∧ 30 × inclinacao ≤ 19",
      "leituraDaTese": "(30 · inclinacao) é maior ou igual a −19 e (30 · inclinacao) é menor ou igual a 19",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "media ≥ 0 ∧ 20 × media ≤ 1"
        },
        {
          "id": "hipótese 2",
          "formula": "centro ≥ 0"
        },
        {
          "id": "hipótese 3",
          "formula": "inclinacao = inclinacao"
        },
        {
          "id": "hipótese 4",
          "formula": "300 × centro ≤ 300 × media + 1"
        },
        {
          "id": "hipótese 5",
          "formula": "100 × centro + 1 ≥ 10 × inclinacao ∧ 100 × centro + 1 ≥ −10 × inclinacao"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 4",
        "hipótese 5",
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
      "visao": "Inclinação no centro",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "media",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "centro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "inclinacao",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "media ≥ 0 ∧ 20 × media ≤ 1",
        "centro ≥ 0",
        "inclinacao = inclinacao"
      ],
      "tese": "30 × inclinacao ≥ −19 ∧ 30 × inclinacao ≤ 19"
    },
    "saida": {
      "visaoDeclarada": "Inclinação no centro",
      "teseFormal": "30 × inclinacao ≥ −19 ∧ 30 × inclinacao ≤ 19",
      "leituraDaTese": "(30 · inclinacao) é maior ou igual a −19 e (30 · inclinacao) é menor ou igual a 19",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "media ≥ 0 ∧ 20 × media ≤ 1"
        },
        {
          "id": "hipótese 2",
          "formula": "centro ≥ 0"
        },
        {
          "id": "hipótese 3",
          "formula": "inclinacao = inclinacao"
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
