# 13/11/2026 — PMT 04: distribuir tempo entre os quatro controles

O PMT 03 propôs o contraste das taxas D = r11 − r01 − r10 + r00. Esta rodada calcula sua precisão para planejar a exposição. A separação entre contagens de sinal e controle tem precedente na construção de verossimilhanças de Cowan et al. [Artigo primário](https://arxiv.org/abs/1007.1727). A otimização abaixo foi derivada para este protocolo.

Hipóteses: quatro contagens independentes Ni ~ Poisson(ri ti), taxas constantes ri>0 em s⁻¹ e tempos observáveis fixos ti>0 em segundos, com soma T. As taxas de planejamento podem vir de piloto independente. O estimador troca cada ri por Ni/ti e tem variância V = Σ ri/ti em s⁻². Por Cauchy–Schwarz, (Σ√ri)² ≤ (Σ ri/ti)(Σ ti), com igualdade para ti = T√ri/Σ√rj. Isso minimiza a variância sob o modelo. Tempos mínimos, custos de troca, pós-pulsos, deriva ou correlações mudam o problema.

Exemplo sintético: taxas (1,1,4,4) s⁻¹. Com 120 s, a divisão uniforme (30,30,30,30) s dá V=40/120 s⁻². A divisão (20,20,40,40) s dá V=36/120 s⁻², redução de 10% na variância. Igualdade das quatro taxas é um caso em que a divisão uniforme é ótima.

O analisador e Z3 verificaram as consequências algébricas do exemplo via scripts/avaliar-ponto-observador.mjs com node --preserve-symlinks --preserve-symlinks-main. O argumento geral e a identidade probabilística foram derivados analiticamente. Resultados executados, ambos com saída zero:

```json
[
  {
    "visaoDeclarada": "A alocação proporcional à raiz da taxa reduz a variância neste exemplo.",
    "teseFormal": "otimo < igual",
    "leituraDaTese": "otimo é menor que igual",
    "status": "SEGUE",
    "explicacao": "A tese decorre das premissas indicadas.",
    "premissas": [
      {
        "id": "hipótese 1",
        "formula": "dur > 0"
      },
      {
        "id": "hipótese 2",
        "formula": "dur × igual = 40 ∧ dur × otimo = 36"
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
  {
    "visaoDeclarada": "A divisão uniforme sempre minimiza a variância.",
    "teseFormal": "igual ≤ otimo",
    "leituraDaTese": "igual é menor ou igual a otimo",
    "status": "CONTRADIZ",
    "explicacao": "A tese entra em conflito com as premissas indicadas.",
    "premissas": [
      {
        "id": "hipótese 1",
        "formula": "dur = 120"
      },
      {
        "id": "hipótese 2",
        "formula": "dur × igual = 40 ∧ dur × otimo = 36"
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
  }
]
```

Sem coleta ou simulação. A próxima rodada pode avaliar perda de precisão quando as taxas de planejamento vêm de um piloto curto e incluir tempo mínimo por condição.
