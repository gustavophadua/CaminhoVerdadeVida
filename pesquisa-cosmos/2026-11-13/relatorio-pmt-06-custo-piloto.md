# 13/11/2026 — PMT 06: quando o tempo do piloto consome o ganho

Os relatórios PMT 04–05 compararam alocações com o mesmo tempo de coleta principal. Aqui o orçamento inclui o piloto. Yang et al. estudam alocação adaptativa em ondas. A comparação temporal abaixo é uma derivação para o contraste do Tubo. [Artigo metodológico](https://arxiv.org/abs/2106.09494).

Hipóteses: taxas reais constantes (1,1,4,4) s⁻¹, quatro contagens Poisson independentes, tempos fixos e positivos na coleta principal, sem custo adicional de troca. O orçamento total T e o piloto P estão em segundos, com 0≤P<T. As contagens do piloto não entram no estimador. A alocação após o piloto recebe o melhor cenário possível: escolhe as proporções ótimas como se as taxas fossem conhecidas.

A divisão uniforme de todo o orçamento dá V_U=40/T. A alocação ótima após o piloto dá V_A=36/(T−P). Ambas em s⁻², pois os numeradores representam coeficientes em s⁻¹. Por multiplicação por denominadores positivos, V_A<V_U se e somente se P<T/10. Em T=120 s, 12 s de piloto empatam. Com P=15 s, V_A=12/35 s⁻² contra V_U=1/3 s⁻², cerca de 2,86% maior. Se o piloto errar as proporções, a variância da coleta principal pode subir ainda mais. O limite vale para estas taxas e esta regra de uso dos dados.

As regras do Tubo foram consultadas como contexto. O analisador e o Z3 checaram as expressões abaixo em scripts/avaliar-ponto-observador.mjs, executado com node --preserve-symlinks --preserve-symlinks-main e JSON via entrada padrão. Ambos os casos terminaram com código zero.

```json
[
  {
    "visaoDeclarada": "Comparar alocação ótima após o piloto com coleta uniforme.",
    "teseFormal": "(vAd < vUni ⟹ 10 × piloto < total) ∧ (10 × piloto < total ⟹ vAd < vUni)",
    "leituraDaTese": "(se vAd é menor que vUni, então (10 · piloto) é menor que total) e (se (10 · piloto) é menor que total, então vAd é menor que vUni)",
    "status": "SEGUE",
    "explicacao": "A tese decorre das premissas indicadas.",
    "premissas": [
      {
        "id": "hipótese 1",
        "formula": "total > 0 ∧ piloto ≥ 0 ∧ piloto < total"
      },
      {
        "id": "hipótese 2",
        "formula": "vAd × (total − piloto) = 36 ∧ vUni × total = 40"
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
    "visaoDeclarada": "Comparar alocação ótima após o piloto com coleta uniforme.",
    "teseFormal": "vAd ≤ vUni",
    "leituraDaTese": "vAd é menor ou igual a vUni",
    "status": "CONTRADIZ",
    "explicacao": "A tese entra em conflito com as premissas indicadas.",
    "premissas": [
      {
        "id": "hipótese 1",
        "formula": "total = 120 ∧ piloto = 15"
      },
      {
        "id": "hipótese 2",
        "formula": "vAd × (total − piloto) = 36 ∧ vUni × total = 40"
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

Exemplo sintético algébrico. Sem coleta física local ou simulação. Próximo passo: quantificar o risco de estimativas nulas em um piloto curto e comparar uma alocação com tempo mínimo por condição.
