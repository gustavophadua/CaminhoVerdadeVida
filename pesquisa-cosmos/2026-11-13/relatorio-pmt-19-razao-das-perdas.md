# 13/11/2026 — PMT 19 — Quando a razão das perdas identifica o sinal do viés

O DEAP-3600 mediu distribuições de carga de fotoelétron único e caracterizou ruído correlacionado e escuro. Isso motiva medir o espectro de fundo perto dos dois limiares. [Artigo primário](https://arxiv.org/abs/1705.10183).

Continuação do PMT 18. Com carga de fundo de referência q em pC e limiares fixos 0 < L < H em pC, uma queda escalar do ganho por fator g em (0,1) desloca o corte efetivo a j/g. Para densidade de taxa f(q) ≥ 0 em s⁻¹ pC⁻¹, a perda de fundo acima de j é D(j) = ∫[j,j/g) f(q)dq em s⁻¹. Hipóteses: fundo estacionário antes do discriminador, eficiência por corte abrupto e ausência de saturação, pós-pulsos e tempo morto relevante. Vale para médias populacionais. D(H) e D(L) integram bandas em geral diferentes.

Sejam h=D(H), d=D(L), s>d a taxa total de sinal na aquisição em s⁻¹ e p sua fração acima do limiar alto. O erro da fração corrigida com branco antigo é e=(pd−h)/(s−d). Para d>0, r=h/d é adimensional, e=d(p−r)/(s−d). Logo r>p implica viés negativo, r<p implica viés positivo e r=p implica viés zero. Se d=0, e=−h/s e r fica indefinido. Este é um critério condicional que liga os dois cortes ao mesmo espectro, interpretados como observação parcial no Tubo (ver leis-da-fisica-no-tubo.md).

Ensaio sintético s=16 s⁻¹ e p=1/2. Com 0<d≤2 s⁻¹ e r≥3/5, o viés negativo segue. Quando 2/5≤r≤3/5, o sinal fica em aberto: d=1 s⁻¹ e h=2/5 ou 3/5 s⁻¹ dão respectivamente e=+1/150 e −1/150. Os testemunhos são realizáveis, por exemplo, com g=4/5, L=1 pC, H=2 pC e densidade constante por partes em bandas disjuntas, com as integrais escolhidas. O Z3 verificou o exemplo e o caso ambíguo. A fórmula geral foi deduzida algebricamente.

Sem simulação estocástica ou medição local. O BOOK foi conferido antes e depois por SHA-256: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: propagar a incerteza da calibração conjunta de p e r antes de classificar o sinal do viés.

## Execução

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs. Entradas por stdin.

```json
[
  {
    "entrada": {
      "visao": "Perdas conjuntas por limiar",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "alta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "total",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "erro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "total > 0 ∧ total ≤ 2 ∧ alta ≥ 0",
        "5 × alta ≥ 3 × total",
        "2 × (16 − total) × erro = total − 2 × alta"
      ],
      "tese": "erro < 0"
    },
    "codigo": 0,
    "saida": {
      "visaoDeclarada": "Perdas conjuntas por limiar",
      "teseFormal": "erro < 0",
      "leituraDaTese": "erro é menor que 0",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "total > 0 ∧ total ≤ 2 ∧ alta ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "5 × alta ≥ 3 × total"
        },
        {
          "id": "hipótese 3",
          "formula": "2 × (16 − total) × erro = total − 2 × alta"
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
      "visao": "Perdas conjuntas por limiar",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "alta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "total",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "erro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "total > 0 ∧ total ≤ 2 ∧ alta ≥ 0",
        "5 × alta ≥ 2 × total ∧ 5 × alta ≤ 3 × total",
        "2 × (16 − total) × erro = total − 2 × alta"
      ],
      "tese": "erro < 0"
    },
    "codigo": 0,
    "saida": {
      "visaoDeclarada": "Perdas conjuntas por limiar",
      "teseFormal": "erro < 0",
      "leituraDaTese": "erro é menor que 0",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "total > 0 ∧ total ≤ 2 ∧ alta ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "5 × alta ≥ 2 × total ∧ 5 × alta ≤ 3 × total"
        },
        {
          "id": "hipótese 3",
          "formula": "2 × (16 − total) × erro = total − 2 × alta"
        }
      ],
      "envolvidos": [],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "sat"
      }
    }
  }
]
```
