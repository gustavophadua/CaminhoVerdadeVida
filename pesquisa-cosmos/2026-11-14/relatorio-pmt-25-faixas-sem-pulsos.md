# 14/11/2026 — PMT 25 — O que duas faixas sem pulsos limitam

Continuação do PMT 24. A calibração do IceCube demonstrou como recuperar distribuições de carga de fotoelétron único. A inversão unilateral da cauda de Poisson segue Garwood. Esta rodada aplica essa inversão à soma de dois bins de fundo e propaga o limite à inclinação do espectro. [IceCube](https://arxiv.org/abs/2002.00997) · [Garwood, 1936](https://doi.org/10.1093/biomet/28.3-4.437).

## Modelo e cobertura

Considere duas faixas adjacentes disjuntas, cada uma com largura w>0 em pC, durante a mesma exposição viva T>0 em s, fixada previamente. Sob Poisson de pulsos com marcas de carga independentes, fundo estacionário e efeitos desprezíveis de pós-pulsos e tempo morto, a soma tem média μ=Tw(A₊+A₋), onde A±≥0 são densidades médias em s⁻¹ pC⁻¹. Ao observar zero pulsos no total, o limite unilateral de 95% para μ é ln(20), pois P(N=0|μ)=exp(−μ). A cobertura vale como procedimento frequentista com a inversão da cauda também para contagens positivas, ou com limite infinito nesses casos. Não é probabilidade posterior para μ.

Pela não negatividade, |A₊−A₋|≤A₊+A₋. A secante S=(A₊−A₋)/w satisfaz |S|≤ln(20)/(Tw²) no evento de cobertura. Se f′ for Lipschitz com cota independente B em s⁻¹ pC⁻³, a rodada anterior dá |f′|≤ln(20)/(Tw²)+2Bw em toda a faixa, em s⁻¹ pC⁻². Em x=1/g, com corte j em pC e jx na faixa, multiplica-se por j² para limitar |D″| em s⁻¹. A cobertura depende do modelo de contagem e da validade da cota B. A observação parcial do Tubo está em usar a soma para limitar a diferença pela não negatividade. T01–T13 foram consultadas via leis-da-fisica-no-tubo.md.

## Testes

Para w=0,1 pC e B=2 s⁻¹ pC⁻³, a cota calculada em T=600 e 300 s é, respectivamente, [0.899289, 1.398577] s⁻¹ pC⁻². O Cosmos e o Z3 testaram a implicação algébrica conservadora com ln(20)<3. A cota de 0,9 seguiu para 600 s e ficou em aberto para 300 s. O caso em aberto é uma consequência do relaxamento algébrico, e não certifica realização física da violação com essa cota B. No relaxamento, A₊=0,095, A₋=0 e inclinação=0,95 são um contraexemplo, com μ=2,85.

Prova condicional e cálculo sintético, sem coleta ou simulação estocástica. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: usar não negatividade ponto a ponto junto à regularidade B para apertar o limite em exposições curtas.

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON por stdin.

```json
[
  {
    "entrada": {
      "visao": "Zero contagens em duas faixas",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "mais",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "menos",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "secante",
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
        "mais ≥ 0 ∧ menos ≥ 0",
        "60 × (mais + menos) ≤ 3",
        "secante = 10 × (mais − menos)",
        "5 × (inclinacao − secante) ≥ −2 ∧ 5 × (inclinacao − secante) ≤ 2"
      ],
      "tese": "10 × inclinacao ≥ −9 ∧ 10 × inclinacao ≤ 9"
    },
    "saida": {
      "visaoDeclarada": "Zero contagens em duas faixas",
      "teseFormal": "10 × inclinacao ≥ −9 ∧ 10 × inclinacao ≤ 9",
      "leituraDaTese": "(10 · inclinacao) é maior ou igual a −9 e (10 · inclinacao) é menor ou igual a 9",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "mais ≥ 0 ∧ menos ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "60 × (mais + menos) ≤ 3"
        },
        {
          "id": "hipótese 3",
          "formula": "secante = 10 × (mais − menos)"
        },
        {
          "id": "hipótese 4",
          "formula": "5 × (inclinacao − secante) ≥ −2 ∧ 5 × (inclinacao − secante) ≤ 2"
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
      "visao": "Zero contagens em duas faixas",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "mais",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "menos",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "secante",
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
        "mais ≥ 0 ∧ menos ≥ 0",
        "30 × (mais + menos) ≤ 3",
        "secante = 10 × (mais − menos)",
        "5 × (inclinacao − secante) ≥ −2 ∧ 5 × (inclinacao − secante) ≤ 2"
      ],
      "tese": "10 × inclinacao ≥ −9 ∧ 10 × inclinacao ≤ 9"
    },
    "saida": {
      "visaoDeclarada": "Zero contagens em duas faixas",
      "teseFormal": "10 × inclinacao ≥ −9 ∧ 10 × inclinacao ≤ 9",
      "leituraDaTese": "(10 · inclinacao) é maior ou igual a −9 e (10 · inclinacao) é menor ou igual a 9",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "mais ≥ 0 ∧ menos ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "30 × (mais + menos) ≤ 3"
        },
        {
          "id": "hipótese 3",
          "formula": "secante = 10 × (mais − menos)"
        },
        {
          "id": "hipótese 4",
          "formula": "5 × (inclinacao − secante) ≥ −2 ∧ 5 × (inclinacao − secante) ≤ 2"
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
