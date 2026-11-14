# 14/11/2026 — PMT 21 — Margem de sinal em uma varredura de ganho

O IceCube publicou uma calibração in situ das distribuições de carga de fotoelétron único. Isso oferece um exemplo de como caracterizar a resposta dos PMTs antes de usar cortes de detecção. As equações e valores abaixo são do ensaio do Tubo. [Artigo primário do IceCube](https://dspace.mit.edu/entities/publication/76ab7b8e-4f5c-49d7-9e3d-054b9a291f1f).

## Modelo

A continuação do PMT 20 usa a margem em taxa m=h−pd. Para perda h no corte alto, perda d no corte baixo, taxa de sinal s>d e fração alta p∈[0,1], o viés populacional com branco antigo é e=−m/(s−d). As taxas e m são em s⁻¹ e o viés é adimensional. Admite fundo estacionário antes do discriminador, ganho escalar, cortes abruptos e perdas eletrônicas adicionais desprezíveis.

Com corte de carga j em pC, ganho relativo g∈(0,1) e densidade de fundo contínua f em s⁻¹ pC⁻¹, D(j,g)=∫[j,j/g) f(q)dq. Logo ∂D/∂g=−j f(j/g)/g² em s⁻¹ por unidade de ganho. Uma varredura dos dois cortes em ganho conhecido estima as sensibilidades de h e d. A fração p exige uma calibração do sinal na mesma condição. A margem tem derivada h′−p′d−pd′, com derivadas na mesma coordenada de ganho. Isso aplica a observação parcial das regras T01–T13, consultadas no relatório leis-da-fisica-no-tubo.md.

## Consequência e contraexemplo

Em torno de um ganho já abaixo do branco, seja z≥0 uma redução adicional adimensional. Adote o modelo afim ilustrativo p=1/2+z, h=(14/25+2z/5) s⁻¹, d=(1+z) s⁻¹ e s=16 s⁻¹. O modelo vale como hipótese no intervalo [0;0,10]. As taxas de perda crescem com z e p permanece em [0,1]. A margem exata no modelo é m=(3/50−11z/10−z²) s⁻¹. Ela é decrescente para z≥0. Em z=1/20, m=1/400 s⁻¹. Em z=1/10, m=−3/50 s⁻¹. Assim, o primeiro intervalo inteiro mantém viés negativo. No segundo, os pontos z=0 e z=1/10 dão sinais opostos. O analisador e o Z3 verificaram m>0 nas duas faixas, com SEGUE na primeira e EM ABERTO na segunda.

Prova condicional e cálculo sintético. Sem simulação estocástica ou medição física local. SHA-256 do BOOK verificado antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: limitar a curvatura e o erro de ajuste das curvas de varredura para levar a garantia além do modelo afim idealizado.

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin.

```json
[
  {
    "entrada": {
      "visao": "Varredura local de ganho",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "z",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fracao",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "alta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "perda",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "margem",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "z ≥ 0 ∧ 20 × z ≤ 1",
        "2 × fracao = 1 + 2 × z",
        "50 × alta = 28 + 20 × z",
        "perda = 1 + z",
        "margem = alta − fracao × perda"
      ],
      "tese": "margem > 0"
    },
    "saida": {
      "visaoDeclarada": "Varredura local de ganho",
      "teseFormal": "margem > 0",
      "leituraDaTese": "margem é maior que 0",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "z ≥ 0 ∧ 20 × z ≤ 1"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × fracao = 1 + 2 × z"
        },
        {
          "id": "hipótese 3",
          "formula": "50 × alta = 28 + 20 × z"
        },
        {
          "id": "hipótese 4",
          "formula": "perda = 1 + z"
        },
        {
          "id": "hipótese 5",
          "formula": "margem = alta − fracao × perda"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 2",
        "hipótese 3",
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
      "visao": "Varredura local de ganho",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "z",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fracao",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "alta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "perda",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "margem",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "z ≥ 0 ∧ 10 × z ≤ 1",
        "2 × fracao = 1 + 2 × z",
        "50 × alta = 28 + 20 × z",
        "perda = 1 + z",
        "margem = alta − fracao × perda"
      ],
      "tese": "margem > 0"
    },
    "saida": {
      "visaoDeclarada": "Varredura local de ganho",
      "teseFormal": "margem > 0",
      "leituraDaTese": "margem é maior que 0",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "z ≥ 0 ∧ 10 × z ≤ 1"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × fracao = 1 + 2 × z"
        },
        {
          "id": "hipótese 3",
          "formula": "50 × alta = 28 + 20 × z"
        },
        {
          "id": "hipótese 4",
          "formula": "perda = 1 + z"
        },
        {
          "id": "hipótese 5",
          "formula": "margem = alta − fracao × perda"
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
