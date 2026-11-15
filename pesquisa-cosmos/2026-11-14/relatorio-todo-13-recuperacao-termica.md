# 14/11/2026 — Todo 13 — O calor pode inverter a ordem ótima dos ciclos

A torre em Lucas 14:28–30 motiva calcular o custo de uma sequência levando em conta o estado deixado pelas etapas anteriores. A conexão é interpretativa. A hipótese física abaixo estende Todo 12 e testa o limite da ordenação com perdas fixas. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-34&version=KJV%3BNIV) · [Lawler, escalonamento com precedências](https://doi.org/10.1287/mnsc.19.5.544).

Considere ciclos clássicos sequenciais do mesmo par que volta ao repouso relativo após cada ciclo. O pico Eᵢ=Jᵢ²/(2μ) está em J, com massa reduzida μ>0 em kg e impulso Jᵢ em N·s. Modele a reserva em J e o excesso térmico uniforme θ≥0 em K com capacidade térmica Cth=0,5 J/K, inicialmente θ=0. Admita aceleração sem perdas, frenagem com recuperação parcial, ausência de troca térmica com o exterior e ausência de resfriamento entre ciclos. Se a perda Lᵢ em J vira calor, θ seguinte = θ+Lᵢ/Cth. O pico de reserva consumida no ciclo é Eᵢ mais todas as perdas anteriores. Energia relativa e excesso térmico interno são independentes de um deslocamento galileano comum neste modelo. A lei de recuperação em degrau é uma hipótese sintética do atuador.

A tem E=3 J e perde zero se começa com θ<1 K, ou 3 J se começa com θ≥1 K. B tem E=4 J e perde sempre 0,5 J. C tem E=3 J, recuperação integral e vem depois de A e B. Em condições frias B devolve 3,5 J e A devolve 3 J, de modo que a priorização por devolução fria escolheria B antes de A. Em BAC, B eleva θ a 1 K e A dissipa 3 J. Os picos acumulados são 4, 3,5 e 6,5 J. Em ABC, são 3, 4 e 3,5 J. Logo as duas ordens admissíveis exigem respectivamente 6,5 e 4 J. Uma reserva inicial de 4 J basta no balanço de ABC e falha no de BAC. Pressupõem-se capacidade do atuador e ausência de limites adicionais de potência e curso.

O Cosmos e o Z3 verificaram a consequência para o pico de C em ambos os casos, a partir do estado térmico na entrada de A. Os dois picos anteriores e a evolução térmica foram calculados analiticamente. Valores sintéticos, sem simulação de trajetória nem medição. Cobertura: extensão de S3/S4 e Todo 12 a perdas dependentes do estado. T01–T03/T11 contextualizam o papel da informação sobre o estado térmico. Próximo passo: incluir resfriamento entre ciclos e calcular o tempo de espera necessário para preservar a recuperação.

SHA-256 de Todo 12 conferido d22322b6759b647e215ea2aff3ff6c47e28932e211a995881b2b53aeb00daa5d. SHA-256 do BOOK conferido antes e depois 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit remoto anterior ef5036110e0951fb5ea1b906eb57bcb1e7d59594.

Comando executado com JSON via stdin

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

```json
[
  {
    "entrada": {
      "visao": "ABC",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "theta",
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
          "simbolo": "pico",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "theta = 0",
        "(theta < 1 ∧ perda = 0) ∨ (theta ≥ 1 ∧ perda = 3)",
        "2 × pico = 7 + 2 × perda"
      ],
      "tese": "pico ≤ 4"
    },
    "saida": {
      "visaoDeclarada": "ABC",
      "teseFormal": "pico ≤ 4",
      "leituraDaTese": "pico é menor ou igual a 4",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "theta = 0"
        },
        {
          "id": "hipótese 2",
          "formula": "(theta < 1 ∧ perda = 0) ∨ (theta ≥ 1 ∧ perda = 3)"
        },
        {
          "id": "hipótese 3",
          "formula": "2 × pico = 7 + 2 × perda"
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
    },
    "codigo": 0
  },
  {
    "entrada": {
      "visao": "BAC",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "theta",
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
          "simbolo": "pico",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "theta = 1",
        "(theta < 1 ∧ perda = 0) ∨ (theta ≥ 1 ∧ perda = 3)",
        "2 × pico = 7 + 2 × perda"
      ],
      "tese": "pico ≤ 4"
    },
    "saida": {
      "visaoDeclarada": "BAC",
      "teseFormal": "pico ≤ 4",
      "leituraDaTese": "pico é menor ou igual a 4",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "theta = 1"
        },
        {
          "id": "hipótese 2",
          "formula": "(theta < 1 ∧ perda = 0) ∨ (theta ≥ 1 ∧ perda = 3)"
        },
        {
          "id": "hipótese 3",
          "formula": "2 × pico = 7 + 2 × perda"
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
        "tese": "unsat",
        "negacao": "sat"
      }
    },
    "codigo": 0
  }
]
```
