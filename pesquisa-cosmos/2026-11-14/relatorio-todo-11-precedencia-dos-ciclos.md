# 14/11/2026 — Todo 11 — A precedência pode invalidar a escolha gulosa

Em Lucas 14:28–30, o construtor calcula os recursos necessários para terminar a torre. Aqui a ligação é que a disponibilidade de uma etapa pode depender da conclusão de outra. A previsão trata de um orçamento mecânico ideal. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Newton, leis do movimento](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

No modelo de Todo 09–10, cada ciclo clássico parte e retorna ao repouso relativo de um par isolado. Seu pico Eᵢ=Jᵢ²/(2μ) e sua perda Lᵢ∈[0,Eᵢ] estão em J, com impulso Jᵢ em N·s e massa reduzida μ>0 em kg. Para uma ordem admissível, a reserva mínima do balanço é maxᵢ(Eᵢ+Σ_{k<i}Lₖ). A eficiência é fixa por ciclo. Pressupõe-se capacidade do atuador e ausência de limites adicionais de armazenamento e potência. Os números de energia relativa são invariantes sob mudança galileana.

Imponha A antes de C. Os pares (E,L) são A=(1,1), B=(2,1) e C=(4,0), em J. Entre os ciclos disponíveis no começo, B devolve 1 J e A devolve zero. Escolher o disponível que devolve mais em cada passo produz BAC, com picos 2, 2 e 6 J. ABC também exige 6 J. A ordem ACB exige 5 J, com picos 1, 5 e 3 J. Todas dissipam 2 J. Qualquer ordem admissível exige pelo menos 5 J porque C sempre vem após a perda de 1 J de A. Portanto ACB atinge o ótimo enquanto a escolha gulosa falha.

O Python enumerou as três ordens admissíveis e calculou os picos. O Cosmos e o Z3 testaram a suficiência de 5 J com esses picos como premissas. A cota inferior geral deste exemplo foi deduzida a partir da precedência. Valores sintéticos, sem coleta física ou simulação de trajetória.

Cobertura: S3/S4 estendidas a ciclos com precedência, em continuidade a Todo 10. T01–T03/T11 contextualizam o registro parcial dos custos, e T09 foi examinada em Todo 02. Próximo passo: formular a escolha ótima para precedências arbitrárias como um problema de viabilidade sob um orçamento fixo.

SHA-256 de Todo 10 conferido 8fe3782779a43d73dcd3aa09f45c2dfe03ba6afab0f2b0aa7a431bcb4c729b0c. SHA-256 do BOOK conferido antes e depois 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit remoto de referência e2a022952ac1b71ef523a19b42804ff8bb837168.

Comando executado com JSON via stdin em unidades SI

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

```json
[
  {
    "ordem": "ABC",
    "picos": [
      1,
      3,
      6
    ],
    "entrada": {
      "visao": "ABC",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "primeiro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "segundo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "terceiro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "primeiro = 1",
        "segundo = 3",
        "terceiro = 6"
      ],
      "tese": "primeiro ≤ 5 ∧ segundo ≤ 5 ∧ terceiro ≤ 5"
    },
    "saida": {
      "visaoDeclarada": "ABC",
      "teseFormal": "primeiro ≤ 5 ∧ segundo ≤ 5 ∧ terceiro ≤ 5",
      "leituraDaTese": "(primeiro é menor ou igual a 5 e segundo é menor ou igual a 5) e terceiro é menor ou igual a 5",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "primeiro = 1"
        },
        {
          "id": "hipótese 2",
          "formula": "segundo = 3"
        },
        {
          "id": "hipótese 3",
          "formula": "terceiro = 6"
        }
      ],
      "envolvidos": [
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
  },
  {
    "ordem": "ACB",
    "picos": [
      1,
      5,
      3
    ],
    "entrada": {
      "visao": "ACB",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "primeiro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "segundo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "terceiro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "primeiro = 1",
        "segundo = 5",
        "terceiro = 3"
      ],
      "tese": "primeiro ≤ 5 ∧ segundo ≤ 5 ∧ terceiro ≤ 5"
    },
    "saida": {
      "visaoDeclarada": "ACB",
      "teseFormal": "primeiro ≤ 5 ∧ segundo ≤ 5 ∧ terceiro ≤ 5",
      "leituraDaTese": "(primeiro é menor ou igual a 5 e segundo é menor ou igual a 5) e terceiro é menor ou igual a 5",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "primeiro = 1"
        },
        {
          "id": "hipótese 2",
          "formula": "segundo = 5"
        },
        {
          "id": "hipótese 3",
          "formula": "terceiro = 3"
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
    "ordem": "BAC",
    "picos": [
      2,
      2,
      6
    ],
    "entrada": {
      "visao": "BAC",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "primeiro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "segundo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "terceiro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "primeiro = 2",
        "segundo = 2",
        "terceiro = 6"
      ],
      "tese": "primeiro ≤ 5 ∧ segundo ≤ 5 ∧ terceiro ≤ 5"
    },
    "saida": {
      "visaoDeclarada": "BAC",
      "teseFormal": "primeiro ≤ 5 ∧ segundo ≤ 5 ∧ terceiro ≤ 5",
      "leituraDaTese": "(primeiro é menor ou igual a 5 e segundo é menor ou igual a 5) e terceiro é menor ou igual a 5",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "primeiro = 2"
        },
        {
          "id": "hipótese 2",
          "formula": "segundo = 2"
        },
        {
          "id": "hipótese 3",
          "formula": "terceiro = 6"
        }
      ],
      "envolvidos": [
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
