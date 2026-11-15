# 14/11/2026 — Todo 10 — Ordem ótima dos ciclos de recuperação

A torre de Lucas 14:28–30 motiva verificar como a sequência das etapas muda a reserva necessária. A dedução usa o modelo mecânico de Todo 09. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Newton, leis do movimento](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

Para ciclos clássicos independentes e reordenáveis, cada um parte e termina em repouso relativo. A aceleração usa somente a reserva e a frenagem devolve uma fração ηᵢ∈[0,1]. Com massa reduzida μ>0 em kg e impulso Jᵢ em N·s, pico Eᵢ=Jᵢ²/(2μ) e perda Lᵢ=(1−ηᵢ)Eᵢ são medidos em J. O orçamento mínimo de uma ordem é maxᵢ(Eᵢ+Σ_{k<i}Lₖ). A hipótese exclui precedências, limites de capacidade de armazenamento e dependência da eficiência em relação à ordem. Os parâmetros dependem de energia relativa e são invariantes sob mudança galileana.

Ordenar por Eᵢ−Lᵢ=ηᵢEᵢ em ordem decrescente minimiza a reserva inicial. Para vizinhos A,B com E_A−L_A≥E_B−L_B, ambos os picos de AB, E_A e L_A+E_B, são menores ou iguais a L_B+E_A, um pico da ordem BA. O prefixo de perdas anterior é comum e o saldo depois do par coincide. Assim, trocar uma inversão nunca aumenta o pico global. Repetir as trocas chega à ordem indicada. O Z3 verificou as desigualdades gerais da troca. A extensão por trocas repetidas é uma dedução analítica.

Contraexemplo à ordem por pico decrescente: A tem E=3 J e L=3 J, B tem E=2 J e L=0. AB pede 5 J e BA pede 3 J. Os dois testes numéricos no Cosmos e no Z3 verificaram que 3 J são insuficientes para AB e suficientes no balanço de BA. Prova condicional com valores sintéticos, sem medição nem simulação.

Cobertura: estende S3/S4 e Todo 09 a uma regra ótima sob hipóteses declaradas. T01–T03/T11 dão o contexto de informação parcial e T09 foi examinada em Todo 02. Próximo passo: testar a regra com restrições de precedência.

SHA-256 de Todo 09 conferido 2bcda7aeaf65c0677c9d29207dfd4c40a935ac9440d75753153a34685b51af3b. SHA-256 do BOOK conferido antes e depois 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit remoto anterior 30485431c5bf2833bc163209a9522394f8146b08.

Comando executado com JSON via stdin em SI

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

```json
[
  {
    "entrada": {
      "visao": "Troca de ciclos adjacentes",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "pa",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "pb",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "la",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "lb",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "pa ≥ la ∧ la ≥ 0 ∧ pb ≥ lb ∧ lb ≥ 0",
        "pa − la ≥ pb − lb"
      ],
      "tese": "pa ≤ lb + pa ∧ la + pb ≤ lb + pa"
    },
    "saida": {
      "visaoDeclarada": "Troca de ciclos adjacentes",
      "teseFormal": "pa ≤ lb + pa ∧ la + pb ≤ lb + pa",
      "leituraDaTese": "pa é menor ou igual a (lb + pa) e (la + pb) é menor ou igual a (lb + pa)",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "pa ≥ la ∧ la ≥ 0 ∧ pb ≥ lb ∧ lb ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "pa − la ≥ pb − lb"
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
      "visao": "Troca de ciclos adjacentes",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "pa",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "pb",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "la",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "lb",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "pa = 3 ∧ la = 3 ∧ pb = 2 ∧ lb = 0"
      ],
      "tese": "la + pb ≤ 3"
    },
    "saida": {
      "visaoDeclarada": "Troca de ciclos adjacentes",
      "teseFormal": "la + pb ≤ 3",
      "leituraDaTese": "(la + pb) é menor ou igual a 3",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "pa = 3 ∧ la = 3 ∧ pb = 2 ∧ lb = 0"
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
      "visao": "Troca de ciclos adjacentes",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "pa",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "pb",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "la",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "lb",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "pa = 3 ∧ la = 3 ∧ pb = 2 ∧ lb = 0"
      ],
      "tese": "pb ≤ 3 ∧ lb + pa ≤ 3"
    },
    "saida": {
      "visaoDeclarada": "Troca de ciclos adjacentes",
      "teseFormal": "pb ≤ 3 ∧ lb + pa ≤ 3",
      "leituraDaTese": "pb é menor ou igual a 3 e (lb + pa) é menor ou igual a 3",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "pa = 3 ∧ la = 3 ∧ pb = 2 ∧ lb = 0"
        }
      ],
      "envolvidos": [
        "hipótese 1",
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
