# 14/11/2026 — Todo 04 — Custo de reserva no par corpo–atuador

O construtor de Lucas 14:28–30 calcula o custo da obra antes de começar. A ponte desta rodada é incluir cada componente que recebe energia no orçamento. O texto trata do discipulado. A previsão é mecânica. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Newton, leis do movimento](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

## Modelo e dedução

Em mecânica clássica unidimensional, um corpo de massa m>0 e um atuador de massa M>0, ambas em kg, trocam impulsos +J e −J em N·s. As velocidades iniciais v,V e a velocidade u do segundo referencial estão em m/s. As variações cinéticas em joules são ΔK_c=vJ+J²/(2m) e ΔK_a=−VJ+J²/(2M). Logo ΔK_total=(v−V)J+J²(1/m+1/M)/2. Ela permanece igual sob (v,V)→(v−u,V−u). Com o par isolado e energia armazenada como único outro termo que muda, o custo de reserva −ΔR é ΔK_total. Essa hipótese exclui dissipação adicional. Com dissipação interna Q≥0 em joules, o balanço passa a −ΔR=ΔK_total+Q. O modelo ideal não estima Q.

## Caso numérico e contraexemplo

m=1 kg, M=4 kg, J=2 N·s e ambos inicialmente em repouso no primeiro referencial. As velocidades finais são 2 e −0,5 m/s. Nesse referencial corpo e atuador ganham 2 e 0,5 J. Em u=2 m/s, o corpo perde 2 J e o atuador ganha 4,5 J. O custo ideal é 2,5 J nos dois casos. A igualdade custo=variação cinética do corpo vale somente em u=−0,25 m/s no exemplo. O Cosmos e o Z3 verificaram o total fixo e devolveram EM ABERTO para a igualdade parcial com u livre. A dedução geral foi analítica. O teste usou valores sintéticos, sem medição física ou simulação.

## Cobertura

As equações S3/S4 do Tubo foram consultadas. Esta rodada estende Todo 03 com um atuador de massa finita e usa T01–T03/T11 como contexto de registro parcial. T09 foi delimitada em Todo 02. T04–T08, T10, T12–T13 e fechamento global ficam fora deste ensaio. Próxima lacuna: testar quando a reserva disponível limita o impulso com o atuador incluído.

SHA-256 do Todo 03 conferido: 957f3d7a53750800168bd37bc48e4d7e328eb3b322e8f5277e7ba4e0cf370b9b. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit local de referência: aacecce9f606fe73789fbd74135fc01abd5ea356. CaminhoVerdadeVida retornou 404. Commit, push e deploy nesse destino estão pendentes.

## Execução

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin.

```json
[
  {
    "entrada": {
      "visao": "Par corpo atuador",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "u",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "corpo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "atuador",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "custo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "corpo = 2 − 2 × u",
        "2 × atuador = 1 + 4 × u",
        "custo = corpo + atuador"
      ],
      "tese": "2 × custo = 5"
    },
    "resultado": {
      "visaoDeclarada": "Par corpo atuador",
      "teseFormal": "2 × custo = 5",
      "leituraDaTese": "(2 · custo) é igual a 5",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "corpo = 2 − 2 × u"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × atuador = 1 + 4 × u"
        },
        {
          "id": "hipótese 3",
          "formula": "custo = corpo + atuador"
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
      "visao": "Par corpo atuador",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "u",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "corpo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "atuador",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "custo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "corpo = 2 − 2 × u",
        "2 × atuador = 1 + 4 × u",
        "custo = corpo + atuador"
      ],
      "tese": "custo = corpo"
    },
    "resultado": {
      "visaoDeclarada": "Par corpo atuador",
      "teseFormal": "custo = corpo",
      "leituraDaTese": "custo é igual a corpo",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "corpo = 2 − 2 × u"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × atuador = 1 + 4 × u"
        },
        {
          "id": "hipótese 3",
          "formula": "custo = corpo + atuador"
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
