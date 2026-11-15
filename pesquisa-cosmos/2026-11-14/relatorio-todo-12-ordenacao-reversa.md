# 14/11/2026 — Todo 12 — Ordem ótima com dependências entre ciclos

O planejamento da torre em Lucas 14:28–30 motiva verificar se a reserva cobre as etapas na ordem em que podem ser executadas. A correspondência com a parábola é interpretativa. O método matemático é um caso do escalonamento com precedências de Lawler. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Lawler, 1973](https://doi.org/10.1287/mnsc.19.5.544).

Continuação de Todo 11. São ciclos sequenciais do mesmo par clássico isolado, com repouso relativo nos extremos, massa reduzida μ>0 em kg, impulso em N·s e pico Eᵢ=Jᵢ²/(2μ). A perda fixa Lᵢ satisfaz 0≤Lᵢ≤Eᵢ. O pico, a perda, a reserva e a energia devolvida rᵢ=Eᵢ−Lᵢ são em joules. O pico de saldo consumido no ciclo é a soma das perdas até sua conclusão mais rᵢ. O objetivo é minimizar o maior desses picos. As dependências formam um grafo acíclico. Pressupõem-se ciclos executáveis e ausência de restrições adicionais de potência ou armazenamento. Como a velocidade relativa é invariante sob mudança galileana, os termos deste orçamento também são.

Preencha a ordem do último ciclo ao primeiro. Entre os ciclos sem sucessor ainda por posicionar, escolha o de menor rᵢ. Para provar a regra, tome uma ordem ótima de um subproblema e mova o candidato para o fim do subconjunto restante. A precedência permite a mudança por ele não ter sucessor nesse subconjunto. Os ciclos que passam à frente dele têm seus picos reduzidos por Lᵢ≥0. O novo último pico é a perda total do subconjunto mais rᵢ, menor ou igual ao último pico antigo. Para um sufixo já fixado, seus picos dependem apenas da perda total do subconjunto. Repetir a escolha preserva a otimalidade. O Z3 verificou as desigualdades da troca, e o argumento de indução é analítico.

No exemplo de Todo 11, A precede C e (E,L) vale (1,1), (2,1), (4,0) para A,B,C em J. Entre B e C, escolha B para a última posição porque devolve 1 J e C devolve 4 J. Depois escolha C para a penúltima posição e A para a primeira. A ordem ACB exige 5 J. Escolher C por devolver mais na última posição exigiria 6 J. O Cosmos e o Z3 verificaram o pico final das duas escolhas com perda total de 2 J. A rodada é uma prova condicional com dados sintéticos, sem simulação nem coleta física.

Cobertura: estende S3/S4 e Todo 09–11 a precedências arbitrárias acíclicas no domínio acima. T01–T03/T11 contextualizam acesso parcial e T09 foi examinada em Todo 02. Próximo passo: testar o que muda quando a eficiência depende da temperatura deixada pelo ciclo anterior.

SHA-256 do Todo 11 conferido 3c035705a2d7546116a951c39620ceebb9acfc2e9cef99867a9c54f9ad19bbf7. SHA-256 do BOOK conferido antes e depois 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit remoto anterior 35dfcae4f66a005c65e0396f899e0a168763f6df.

Comando executado com JSON via stdin

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

```json
[
  {
    "entrada": {
      "visao": "Ordenacao reversa",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "total",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "menor",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "maior",
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
        "total ≥ 0 ∧ menor ≥ 0 ∧ maior ≥ menor",
        "perda ≥ 0"
      ],
      "tese": "total + menor ≤ total + maior ∧ pico − perda ≤ pico"
    },
    "saida": {
      "visaoDeclarada": "Ordenacao reversa",
      "teseFormal": "total + menor ≤ total + maior ∧ pico − perda ≤ pico",
      "leituraDaTese": "(total + menor) é menor ou igual a (total + maior) e (pico − perda) é menor ou igual a pico",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "total ≥ 0 ∧ menor ≥ 0 ∧ maior ≥ menor"
        },
        {
          "id": "hipótese 2",
          "formula": "perda ≥ 0"
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
      "visao": "Ordenacao reversa",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "total",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "menor",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "maior",
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
        "total = 2 ∧ maior = 4"
      ],
      "tese": "total + maior ≤ 5"
    },
    "saida": {
      "visaoDeclarada": "Ordenacao reversa",
      "teseFormal": "total + maior ≤ 5",
      "leituraDaTese": "(total + maior) é menor ou igual a 5",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "total = 2 ∧ maior = 4"
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
      "visao": "Ordenacao reversa",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "total",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "menor",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "maior",
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
        "total = 2 ∧ menor = 1"
      ],
      "tese": "total + menor ≤ 5"
    },
    "saida": {
      "visaoDeclarada": "Ordenacao reversa",
      "teseFormal": "total + menor ≤ 5",
      "leituraDaTese": "(total + menor) é menor ou igual a 5",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "total = 2 ∧ menor = 1"
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
