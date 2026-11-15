# 14/11/2026 — Todo 09 — A ordem muda a reserva mínima

A torre de Lucas 14:28–30 motiva verificar se os recursos estão disponíveis em cada etapa da obra. A conexão é uma leitura da parábola aplicada a um orçamento mecânico. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Newton, leis do movimento](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

Continuação de Todo 08. No modelo clássico de um par isolado com massa reduzida μ>0 em kg, cada ciclo parte de repouso relativo, aplica impulso Jᵢ em N·s e depois o oposto. Admita crescimento e queda monótonos da energia relativa durante cada ciclo, ausência de perdas na aceleração e recuperação ηᵢ∈[0,1] apenas na frenagem. Em joules, o pico cinético do ciclo é Eᵢ=Jᵢ²/(2μ) e a perda é Lᵢ=(1−ηᵢ)Eᵢ. A reserva inicial precisa cobrir Rmin=maxᵢ(Eᵢ+Σ_{k<i}Lₖ). A conta considera cada pico após as perdas anteriores. O custo final é ΣLᵢ. Ambos usam energia relativa, que é invariante sob adição de uma velocidade comum ao par. A fórmula exige um atuador capaz de executar cada etapa e uma reserva sem restrições adicionais de potência ou armazenamento.

Exemplo sintético: ciclo A tem E=1 J e η=1/2. Ciclo B tem E=2 J e η=1. A→B requer 2,5 J, com picos acumulados de 1 e 2,5 J. B→A requer 2 J. Ambos deixam custo final de 0,5 J. Com reserva de 2 J, o Cosmos e o Z3 confirmaram a suficiência dentro do balanço para B→A e rejeitaram A→B. O solver recebeu os picos e o custo final calculados da fórmula. A dedução física e a localização dos picos são analíticas. Sem coleta física ou simulação.

Cobertura: a rodada estende Todo 08 e S3/S4 a vários ciclos e usa T01–T03/T11 para contextualizar a limitação de observar só os extremos. T09 foi examinada em Todo 02. Próximo passo: obter uma regra de ordenação que minimize a reserva inicial.

SHA-256 de Todo 08 conferido 285ba42f69c569f2950a30573ce3dd486f88b9ce3c3a004f816e344e3549653d. SHA-256 do BOOK conferido antes e depois 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit remoto anterior e8468ab7d3a1ba0ce1432265093e007b0f20ed83.

Comando executado, JSON via stdin em SI

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

```json
[
  {
    "entrada": {
      "visao": "Ordem dos ciclos",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "um",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "dois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "final",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "dois × 2 = 5 ∧ final × 2 = 1",
        "um = 1"
      ],
      "tese": "dois > um ∧ 2 × final = 1"
    },
    "saida": {
      "visaoDeclarada": "Ordem dos ciclos",
      "teseFormal": "dois > um ∧ 2 × final = 1",
      "leituraDaTese": "dois é maior que um e (2 · final) é igual a 1",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "dois × 2 = 5 ∧ final × 2 = 1"
        },
        {
          "id": "hipótese 2",
          "formula": "um = 1"
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
      "visao": "Ordem dos ciclos",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "um",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "dois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "final",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "dois × 2 = 5 ∧ um = 1"
      ],
      "tese": "um ≤ 2 ∧ dois ≤ 2"
    },
    "saida": {
      "visaoDeclarada": "Ordem dos ciclos",
      "teseFormal": "um ≤ 2 ∧ dois ≤ 2",
      "leituraDaTese": "um é menor ou igual a 2 e dois é menor ou igual a 2",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "dois × 2 = 5 ∧ um = 1"
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
      "visao": "Ordem dos ciclos",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "um",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "dois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "final",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "um = 2 ∧ dois = 1 ∧ final × 2 = 1"
      ],
      "tese": "um ≤ 2 ∧ dois ≤ 2 ∧ 2 × final = 1"
    },
    "saida": {
      "visaoDeclarada": "Ordem dos ciclos",
      "teseFormal": "um ≤ 2 ∧ dois ≤ 2 ∧ 2 × final = 1",
      "leituraDaTese": "(um é menor ou igual a 2 e dois é menor ou igual a 2) e (2 · final) é igual a 1",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "um = 2 ∧ dois = 1 ∧ final × 2 = 1"
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
