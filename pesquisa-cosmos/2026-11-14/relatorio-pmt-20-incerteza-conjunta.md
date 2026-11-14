# 14/11/2026 — PMT 20 — Incerteza conjunta nos limiares

O DEAP-3600 mediu a distribuição de carga de fotoelétron único e usou luz injetada para caracterizar e monitorar PMTs. Os valores deste relatório são sintéticos. [Artigo primário](https://arxiv.org/abs/1705.10183).

Continuação do PMT 19. Com fundo estacionário antes do discriminador, queda escalar do ganho, cortes abruptos e perdas eletrônicas adicionais desprezíveis, sejam h e d as perdas de fundo nos limiares alto e inferior em s⁻¹, com h≥0 e d>0. Seja s>d a taxa de sinal acima do limiar inferior em s⁻¹. Sejam p∈[0,1] a fração de sinal acima do corte alto e r=h/d. O viés adimensional ao usar o branco antigo é e=d(p−r)/(s−d).

Se p=p₀+a z+u e r=r₀+b z+v, com variáveis e coeficientes adimensionais e |z|≤Z, |u|≤U, |v|≤V, então a margem mínima r−p nessa caixa é r₀−p₀−|b−a|Z−U−V, quando toda a caixa respeita os domínios físicos. Isso segue minimizando cada termo afim em sua faixa. Uma margem estritamente positiva garante e<0. O termo comum cancela se a=b. A observação parcial do Tubo aparece na diferença entre conhecer marginais separadas e conhecer quais pares são compatíveis. T01–T13 foram consultadas via leis-da-fisica-no-tubo.md.

No caso sintético, d=1 s⁻¹, s=16 s⁻¹, p∈[0,44;0,56] e r∈[0,50;0,62]. Com r−p=3/50, o Z3 confirma e<0, e a fórmula dá e=−1/250 (−0,4 ponto percentual). Com apenas as marginais, e<0 fica em aberto. Os pares (p,r)=(0,56;0,50) e (0,50;0,56) dão +1/250 e −1/250. Trata-se de prova condicional no modelo populacional. Sem simulação estocástica ou medição local. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: estimar a diferença entre as sensibilidades a e b mediante varredura de limiar e referências de ganho.

Comando executado: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, entradas por stdin.

```json
[
  {
    "entrada": {
      "visao": "Calibracao PMT",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "razao",
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
          "simbolo": "erro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "25 × fracao ≥ 11 ∧ 25 × fracao ≤ 14",
        "2 × razao ≥ 1 ∧ 50 × razao ≤ 31",
        "15 × erro = fracao − razao",
        "50 × (razao − fracao) = 3"
      ],
      "tese": "erro < 0"
    },
    "saida": {
      "visaoDeclarada": "Calibracao PMT",
      "teseFormal": "erro < 0",
      "leituraDaTese": "erro é menor que 0",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "25 × fracao ≥ 11 ∧ 25 × fracao ≤ 14"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × razao ≥ 1 ∧ 50 × razao ≤ 31"
        },
        {
          "id": "hipótese 3",
          "formula": "15 × erro = fracao − razao"
        },
        {
          "id": "hipótese 4",
          "formula": "50 × (razao − fracao) = 3"
        }
      ],
      "envolvidos": [
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
      "visao": "Calibracao PMT",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "razao",
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
          "simbolo": "erro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "25 × fracao ≥ 11 ∧ 25 × fracao ≤ 14",
        "2 × razao ≥ 1 ∧ 50 × razao ≤ 31",
        "15 × erro = fracao − razao"
      ],
      "tese": "erro < 0"
    },
    "saida": {
      "visaoDeclarada": "Calibracao PMT",
      "teseFormal": "erro < 0",
      "leituraDaTese": "erro é menor que 0",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "25 × fracao ≥ 11 ∧ 25 × fracao ≤ 14"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × razao ≥ 1 ∧ 50 × razao ≤ 31"
        },
        {
          "id": "hipótese 3",
          "formula": "15 × erro = fracao − razao"
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
