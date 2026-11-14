# 14/11/2026 — PMT 27 — Da inclinação central à cota uniforme

A calibração do IceCube extraiu espectros de carga de fotoelétron único. Esta rodada usa um modelo sintético de fundo para ligar uma contagem agregada à inclinação em toda a faixa. [IceCube](https://arxiv.org/abs/2002.00997) · [Garwood, limites Poisson](https://academic.oup.com/biomet/article-abstract/28/3-4/437/220104).

## Modelo

Continuação do PMT 26. Seja f≥0 em s⁻¹ pC⁻¹ no intervalo [q₀−w,q₀+w], com q₀≥w>0 em pC. Suponha f diferenciável e f′ Lipschitz com constante B em s⁻¹ pC⁻³. Com fundo Poisson estacionário, marcas independentes, exposição viva T fixada e perdas eletrônicas desprezíveis, zero pulsos dá limite unilateral de 95% de ln(20) para a média μ=2TwF, onde F é a densidade média. O procedimento preserva a cobertura se usar inversão da cauda para contagens positivas ou devolver limite infinito nesses casos.

A cota central do PMT 26 é |f′(q₀)|≤ln(20)/(2Tw²)+2Bw/3. Somando a variação máxima B|q−q₀|, segue a cota uniforme |f′(q)|≤ln(20)/(2Tw²)+5Bw/3, em s⁻¹ pC⁻², no evento de cobertura. A cobertura é simultânea na faixa porque toda a extensão usa o mesmo evento sobre μ. A cota de regularidade precisa ser válida independentemente da observação de zero pulsos. Para ganho escalar g e corte abrupto j em pC, a curvatura da perda em x=1/g é j² f′(jx), em s⁻¹, quando jx pertence à faixa. T01–T13 foram consultadas via leis-da-fisica-no-tubo.md. Aqui o registro parcial é a soma de contagens, complementada por uma hipótese explícita sobre o espectro.

## Teste e contraexemplo

Com T=300 s, w=0,1 pC, B=2 s⁻¹ pC⁻³ e ln(20)<3, o Cosmos e o Z3 verificaram a cota uniforme conservadora 5/6 s⁻¹ pC⁻². É inferior à cota uniforme de aproximadamente 1,3986 da rodada 25 sob as mesmas premissas. A cota central de 19/30 não se estende à faixa inteira. Tome y=q−q₀+w em pC e f=0,35y+y² nas unidades numéricas indicadas, com coeficientes em s⁻¹ pC⁻² e s⁻¹ pC⁻³. Em y∈[0;0,2] o espectro é não negativo, B=2 e F=29/600 s⁻¹ pC⁻¹, logo μ=2,9<ln(20). A inclinação central é 11/20 e a do extremo superior é 3/4 s⁻¹ pC⁻². O Z3 confirmou que o par de inclinações contradiz a extensão da cota central. A realização pelo espectro e a cobertura foram deduzidas analiticamente.

Prova condicional e valores sintéticos, sem coleta física local ou simulação estocástica. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: verificar quanto a cota pode ser apertada perto dos extremos usando a integral do espectro diretamente.

Comando executado: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin.

```json
[
  {
    "entrada": {
      "visao": "Inclinação fora do centro",
      "regras": [],
      "simbolos": [
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
        "30 × centro ≥ −19 ∧ 30 × centro ≤ 19",
        "5 × (inclinacao − centro) ≥ −1 ∧ 5 × (inclinacao − centro) ≤ 1"
      ],
      "tese": "6 × inclinacao ≥ −5 ∧ 6 × inclinacao ≤ 5"
    },
    "saida": {
      "visaoDeclarada": "Inclinação fora do centro",
      "teseFormal": "6 × inclinacao ≥ −5 ∧ 6 × inclinacao ≤ 5",
      "leituraDaTese": "(6 · inclinacao) é maior ou igual a −5 e (6 · inclinacao) é menor ou igual a 5",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "30 × centro ≥ −19 ∧ 30 × centro ≤ 19"
        },
        {
          "id": "hipótese 2",
          "formula": "5 × (inclinacao − centro) ≥ −1 ∧ 5 × (inclinacao − centro) ≤ 1"
        }
      ],
      "envolvidos": [
        "hipótese 1",
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
      "visao": "Inclinação fora do centro",
      "regras": [],
      "simbolos": [
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
        "20 × centro = 11",
        "4 × inclinacao = 3"
      ],
      "tese": "30 × inclinacao ≤ 19"
    },
    "saida": {
      "visaoDeclarada": "Inclinação fora do centro",
      "teseFormal": "30 × inclinacao ≤ 19",
      "leituraDaTese": "(30 · inclinacao) é menor ou igual a 19",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "20 × centro = 11"
        },
        {
          "id": "hipótese 2",
          "formula": "4 × inclinacao = 3"
        }
      ],
      "envolvidos": [
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
