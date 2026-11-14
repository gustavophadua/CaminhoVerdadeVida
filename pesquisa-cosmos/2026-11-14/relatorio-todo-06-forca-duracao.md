# 14/11/2026 — Todo 06 — O prazo reduz o impulso disponível

Na parábola do construtor, Lucas 14:28–30 examina se há recursos para terminar. A ponte com Todo 05 é considerar também o prazo e a capacidade da ferramenta antes de considerar viável uma ação. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Newton, leis do movimento](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

Para o par clássico isolado, com massas constantes inicialmente à mesma velocidade, a massa reduzida μ em kg e a reserva R em J dão a condição J²/(2μ)≤R no caso ideal sem dissipação. Se |F(t)|≤Fmax em N durante uma janela fixa T>0 em s, a integral J=∫F(t)dt também satisfaz |J|≤Fmax T em N·s. Logo |J|≤min(sqrt(2μR),Fmax T). Nesse modelo, qualquer impulso dentro da cota é realizável se o atuador puder aplicar força constante J/T durante a janela inteira, sem limite extra de curso ou potência e com consumo ideal. Por estar inicialmente sem movimento relativo e sob força constante, o custo acumulado cresce quadraticamente no tempo e alcança seu máximo no fim. A troca de referencial galileano preserva as diferenças de velocidade, a força, o tempo e o custo do par.

No exemplo, m=1 kg, M=4 kg, R=2,5 J, Fmax=3 N e T=0,5 s. A capacidade do atuador limita |J| a 1,5 N·s, com custo ideal de 45/32 J. J=2 N·s cabe na reserva, mas pediria força média de 4 N, acima do teto. O Cosmos e o Z3 verificaram a cota algébrica com o teto já expresso em impulso, a contradição do alvo de 2 N·s e o testemunho de força constante de 3 N. A passagem da força instantânea à integral e a suficiência da força constante foram deduzidas analiticamente. Valores sintéticos, sem medição física ou simulação.

Cobertura acumulada: T01–T03/T11 foram usados como contexto de acesso parcial e T09 foi examinada em Todo 02. Todo 06 estende S3/S4 e Todo 05 da reserva ao prazo de uma etapa. T04–T08, T10, T12–T13 e o fechamento global seguem em aberto neste eixo. Próximo passo: analisar etapas sucessivas com velocidade relativa inicial diferente de zero.

SHA-256 do Todo 05 conferido 02682eca9ea29a9e0f356e79e12ef01030387ceab8670e17e169027ee8ea420b. SHA-256 do BOOK conferido antes e depois 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. O commit remoto de referência anterior a esta rodada é 3094829d2d7c3403b01b1947c8cc43d5309b76e1.

Comando executado

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Entradas JSON via stdin e grandezas numéricas em SI.

```json
[
  {
    "entrada": {
      "visao": "Forca e duracao",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "impulso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "forca",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "5 × impulso × impulso ≤ 20",
        "impulso ≥ 0 ∧ 2 × impulso ≤ 3"
      ],
      "tese": "2 × impulso ≤ 3"
    },
    "saida": {
      "visaoDeclarada": "Forca e duracao",
      "teseFormal": "2 × impulso ≤ 3",
      "leituraDaTese": "(2 · impulso) é menor ou igual a 3",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "5 × impulso × impulso ≤ 20"
        },
        {
          "id": "hipótese 2",
          "formula": "impulso ≥ 0 ∧ 2 × impulso ≤ 3"
        }
      ],
      "envolvidos": [
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
      "visao": "Forca e duracao",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "impulso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "forca",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "impulso = 2",
        "5 × impulso × impulso ≤ 20"
      ],
      "tese": "2 × impulso ≤ 3"
    },
    "saida": {
      "visaoDeclarada": "Forca e duracao",
      "teseFormal": "2 × impulso ≤ 3",
      "leituraDaTese": "(2 · impulso) é menor ou igual a 3",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "impulso = 2"
        },
        {
          "id": "hipótese 2",
          "formula": "5 × impulso × impulso ≤ 20"
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
      "visao": "Forca e duracao",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "impulso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "forca",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "2 × impulso = 3",
        "2 × impulso = forca",
        "forca ≥ 0 ∧ forca ≤ 3"
      ],
      "tese": "forca = 3"
    },
    "saida": {
      "visaoDeclarada": "Forca e duracao",
      "teseFormal": "forca = 3",
      "leituraDaTese": "forca é igual a 3",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "2 × impulso = 3"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × impulso = forca"
        },
        {
          "id": "hipótese 3",
          "formula": "forca ≥ 0 ∧ forca ≤ 3"
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
  }
]
```
