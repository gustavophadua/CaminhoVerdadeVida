# 14/11/2026 — Todo 05 — O limite de impulso imposto pela reserva

Lucas 14:28–30 apresenta um construtor que confronta o custo da torre com seus recursos. A correspondência proposta é comparar um orçamento finito com o custo de uma ação. A passagem trata do discipulado. A hipótese abaixo trata de mecânica. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Newton, leis do movimento](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

## Modelo e previsão

Continuação de Todo 04 e das regras S3/S4 do Tubo. Dois corpos de massas constantes m,M>0 em kg, inicialmente com a mesma velocidade, trocam impulsos opostos de módulo |J| em N·s. Admita isolamento do par e balanço entre reserva, energia cinética translacional e dissipação interna Q≥0, em joules. Com μ=mM/(m+M), a reserva disponível R≥0 deve satisfazer J²/(2μ)+Q≤R. Logo |J|≤sqrt(2μ(R−Q)) se Q≤R. A igualdade exige que a etapa seja realizável pela dinâmica do atuador. O orçamento é uma condição necessária. Velocidades inicialmente iguais preservam sua igualdade sob mudança galileana, e o termo cinético é invariante porque o momento total permanece constante.

## Testes e contraexemplo

Para m=1 kg, M=4 kg e R=2,5 J, a desigualdade em valores SI é 5J²+8Q≤20. Analiticamente |J|≤2 N·s, com Q=0 no limite. A consulta da cota exata |J|≤2 N·s deu SEGUE. A admissibilidade de J=9/4 N·s deu CONTRADIZ para Q≥0. Um impulso que distingue os dois orçamentos é J=11/5 N·s: o corpo requer 121/50 J e o par requer 121/40 J. A consulta adicional confirmou que J=2 força Q=0 no modelo. Os valores são sintéticos. O Z3 verificou as relações algébricas, sem simulação nem coleta física.

## Cobertura e rastreabilidade

T01–T03/T11 motivam o acesso parcial à conta e T09 foi examinada em Todo 02. Esta rodada cobre o orçamento de uma única etapa a partir das equações S3/S4. Permanecem em aberto a exequibilidade do impulso no atuador e o fechamento global. Próximo passo: testar a viabilidade com força e duração máximas e distinguir orçamento por etapa de orçamento acumulado.

SHA-256 Todo 04 conferido: b45deb3b2d16e23eb173c96384e65a6eb305148c3a3f1b7c03fe47e75986393b. SHA-256 BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit local de referência: aacecce9f606fe73789fbd74135fc01abd5ea356. O conector retornou 404 para CaminhoVerdadeVida. Commit, push e deploy pendentes nesse destino.

## Execução

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs. JSON via stdin.

```json
[
  {
    "entrada": {
      "visao": "Orcamento do par",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "impulso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "perda",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "perda ≥ 0",
        "5 × impulso × impulso + 8 × perda ≤ 20"
      ],
      "tese": "impulso × impulso ≤ 4"
    },
    "saida": {
      "visaoDeclarada": "Orcamento do par",
      "teseFormal": "impulso × impulso ≤ 4",
      "leituraDaTese": "(impulso · impulso) é menor ou igual a 4",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "perda ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "5 × impulso × impulso + 8 × perda ≤ 20"
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
      "visao": "Orcamento do par",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "impulso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "perda",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "perda ≥ 0",
        "4 × impulso = 9"
      ],
      "tese": "5 × impulso × impulso + 8 × perda ≤ 20"
    },
    "saida": {
      "visaoDeclarada": "Orcamento do par",
      "teseFormal": "5 × impulso × impulso + 8 × perda ≤ 20",
      "leituraDaTese": "(((5 · impulso) · impulso) + (8 · perda)) é menor ou igual a 20",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "perda ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "4 × impulso = 9"
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
    },
    "codigo": 0
  },
  {
    "entrada": {
      "visao": "Orcamento do par",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "impulso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "perda",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "perda ≥ 0",
        "impulso = 2",
        "5 × impulso × impulso + 8 × perda ≤ 20"
      ],
      "tese": "perda = 0"
    },
    "saida": {
      "visaoDeclarada": "Orcamento do par",
      "teseFormal": "perda = 0",
      "leituraDaTese": "perda é igual a 0",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "perda ≥ 0"
        },
        {
          "id": "hipótese 2",
          "formula": "impulso = 2"
        },
        {
          "id": "hipótese 3",
          "formula": "5 × impulso × impulso + 8 × perda ≤ 20"
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
