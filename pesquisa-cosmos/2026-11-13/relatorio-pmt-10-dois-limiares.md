# 13/11/2026 — PMT 10 — Quando dois limiares separam ganho e fluxo

O PMT 09 mostrou como ganho variável pode imitar aumento de fluxo. O DEAP mediu distribuições de carga de fotoelétron único. Isso motiva calibrar a forma da distribuição antes de inferir ganho a partir de limiares. [Caracterização experimental do DEAP](https://arxiv.org/abs/1705.10183).

Considere taxas líquidas populacionais Rᵢ=A S(qᵢ/g), com 0<q₁<q₂ em coulombs, g>0 adimensional, S a sobrevivência da carga de referência, e A=ηc>0 em s⁻¹. Cada fundo deve ser estimado no limiar correspondente. Assume-se ganho por escala, distribuição estável, fluxo comum às duas leituras e perdas desprezíveis. A razão R₂/R₁ cancela A se R₁>0. Ela identifica g quando S(q₂/g)/S(q₁/g) é injetiva na faixa calibrada.

Exemplo ilustrativo com S(q)=exp(−q/Q₀), Q₀ conhecido em coulombs. Para 0<R₂/R₁<1, g=(q₂−q₁)/(Q₀ ln(R₁/R₂)). Depois A=R₁/S(q₁/g). O fluxo c só se obtém com η conhecido. Esta expressão vem da álgebra e da monotonicidade do logaritmo. A distribuição exponencial é uma hipótese de exemplo.

Contraexemplo com sobrevivência S(q)=Q₀/q para q≥Q₀ e S(q)=1 abaixo. Para q₁=4Q₀, q₂=8Q₀ e ganhos 1 e 2, as duas leituras dependem do produto Ag. Os pares (A,g)=(40 s⁻¹,1) e (20 s⁻¹,2) produzem as mesmas taxas (10,5) s⁻¹. Para o solver, aUm e aDois são os ganhos. sUm e sDois representam os fatores de taxa ou de limiar conforme o caso. rUm e rDois no segundo caso são o produto comum antes de dividir por 4 ou 8. A primeira consulta verifica a identidade cruzada que implica invariância da razão para fatores positivos.

O Cosmos e Z3 executaram as consequências algébricas com node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via entrada padrão e código zero. Regras do Tubo consultadas como contexto. SHA integral do BOOK conferido.

```json
[
  {
    "entrada": {
      "visao": "Separação entre amplitude de sinal e ganho por dois limiares.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "aUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "aDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "rUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "rDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "rTres",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "rQuatro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "aUm > 0 ∧ aDois > 0",
        "rUm = aUm × sUm ∧ rDois = aDois × sUm",
        "rTres = aUm × sDois ∧ rQuatro = aDois × sDois"
      ],
      "tese": "rUm × rQuatro = rDois × rTres"
    },
    "saida": {
      "visaoDeclarada": "Separação entre amplitude de sinal e ganho por dois limiares.",
      "teseFormal": "rUm × rQuatro = rDois × rTres",
      "leituraDaTese": "(rUm · rQuatro) é igual a (rDois · rTres)",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "aUm > 0 ∧ aDois > 0"
        },
        {
          "id": "hipótese 2",
          "formula": "rUm = aUm × sUm ∧ rDois = aDois × sUm"
        },
        {
          "id": "hipótese 3",
          "formula": "rTres = aUm × sDois ∧ rQuatro = aDois × sDois"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 2",
        "hipótese 3",
        "tese"
      ],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "unsat"
      }
    }
  },
  {
    "entrada": {
      "visao": "Separação entre amplitude de sinal e ganho por dois limiares.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "aUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "aDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "rUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "rDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "rTres",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "rQuatro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "aUm = 1 ∧ aDois = 2 ∧ sUm = 40 ∧ sDois = 20",
        "rUm = aUm × sUm ∧ rDois = aDois × sDois"
      ],
      "tese": "rUm > rDois ∨ rUm < rDois"
    },
    "saida": {
      "visaoDeclarada": "Separação entre amplitude de sinal e ganho por dois limiares.",
      "teseFormal": "rUm > rDois ∨ rUm < rDois",
      "leituraDaTese": "rUm é maior que rDois ou rUm é menor que rDois",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "aUm = 1 ∧ aDois = 2 ∧ sUm = 40 ∧ sDois = 20"
        },
        {
          "id": "hipótese 2",
          "formula": "rUm = aUm × sUm ∧ rDois = aDois × sDois"
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
    }
  }
]
```

Exemplos sintéticos analíticos. Sem simulação ou coleta local. Próximo passo: propagar incerteza das contagens e considerar dependência entre contagens de dois limiares no mesmo conjunto de pulsos.
