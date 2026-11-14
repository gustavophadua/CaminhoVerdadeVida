# 14/11/2026 — PMT 28 — Inclinação na borda a partir da taxa integrada

Continuação do PMT 27. O IceCube mediu distribuições de carga dos PMTs. O limite de contagem usa a inversão unilateral de Poisson de Garwood. O modelo de fundo e os números do ensaio são sintéticos. [IceCube](https://arxiv.org/abs/2002.00997) · [Garwood](https://academic.oup.com/biomet/article-abstract/28/3-4/437/220104).

## Dedução

Seja f≥0 em s⁻¹ pC⁻¹ em [0,L], em coordenada de carga deslocada, com L>0 em pC. Suponha f diferenciável e f′ Lipschitz com constante B em s⁻¹ pC⁻³. Escreva M=∫₀ᴸ f(y)dy em s⁻¹ e k=f′(L) em s⁻¹ pC⁻². Se k≥0, f′(u)≥k−B(L−u) e f(0)≥0 dão f(y)≥ky−B(Ly−y²/2). Logo M≥kL²/2−BL³/3. Se k<0, a expansão a partir de L dá f(y)≥|k|(L−y)−B(L−y)²/2, logo M≥|k|L²/2−BL³/6. Usando a maior penalidade dos dois casos, segue |k|≤2M/L²+2BL/3. Por reflexão vale para a outra borda. A taxa integrada é uma observação parcial no sentido do Tubo. T01–T13 foram consultadas via leis-da-fisica-no-tubo.md.

Para contagem de fundo Poisson estacionária, marcas independentes, ganho fixo, exposição viva T pré-fixada e tempo morto e pós-pulsos desprezíveis, zero pulsos dá M≤ln(20)/T com procedimento unilateral de cobertura mínima 95%. Para contagens positivas, pode-se devolver limite infinito. A cota usa o mesmo evento de cobertura nas duas bordas e pressupõe B certificado independentemente. Para corte abrupto j em pC e ganho escalar g, na coordenada x=1/g a curvatura de perda é D″=j²f′ no ponto de carga jx.

## Verificação

Com L=0,2 pC, T=300 s e B=2 s⁻¹ pC⁻³, use M≤0,01 s⁻¹ pela aproximação conservadora ln(20)<3. O Cosmos e o Z3 verificaram a cota de borda 23/30 s⁻¹ pC⁻², abaixo de 5/6 da cota uniforme do PMT 27. Sem a desigualdade deduzida da regularidade e não negatividade, a conclusão ficou EM ABERTO. Há testemunho físico ao retirar B=2: em unidades numéricas, f(y)=0,04+0,01 sen(30πy) em s⁻¹ pC⁻¹, com frequência angular em pC⁻¹. A taxa é 0,008 s⁻¹ e a inclinação de borda passa a 3π/10>23/30. O testemunho foi calculado analiticamente. O Z3 verificou a implicação algébrica e a possibilidade de violação sem a desigualdade.

Sem medição física local ou simulação estocástica. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: combinar cotas centrais e de borda para restringir a curvatura em ganhos intermediários.

Comando executado: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin.

```json
[
  {
    "entrada": {
      "visao": "Inclinação na borda",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "taxa",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "modulo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "taxa ≥ 0 ∧ 100 × taxa ≤ 1",
        "modulo ≥ 0",
        "1500 × taxa ≥ 30 × modulo − 8"
      ],
      "tese": "30 × modulo ≤ 23"
    },
    "saida": {
      "visaoDeclarada": "Inclinação na borda",
      "teseFormal": "30 × modulo ≤ 23",
      "leituraDaTese": "(30 · modulo) é menor ou igual a 23",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "taxa ≥ 0 ∧ 100 × taxa ≤ 1"
        },
        {
          "id": "hipótese 2",
          "formula": "modulo ≥ 0"
        },
        {
          "id": "hipótese 3",
          "formula": "1500 × taxa ≥ 30 × modulo − 8"
        }
      ],
      "envolvidos": [
        "hipótese 1",
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
      "visao": "Inclinação na borda",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "taxa",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "modulo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "taxa ≥ 0 ∧ 100 × taxa ≤ 1",
        "modulo ≥ 0"
      ],
      "tese": "30 × modulo ≤ 23"
    },
    "saida": {
      "visaoDeclarada": "Inclinação na borda",
      "teseFormal": "30 × modulo ≤ 23",
      "leituraDaTese": "(30 · modulo) é menor ou igual a 23",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "taxa ≥ 0 ∧ 100 × taxa ≤ 1"
        },
        {
          "id": "hipótese 2",
          "formula": "modulo ≥ 0"
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
