# 13/11/2026 — PMT 08 — Variância média com custo de piloto

Continuação do PMT 07. A referência metodológica discute alocação adaptativa em etapas. A aplicação abaixo é uma simulação específica do contraste PMT. [Yang et al.](https://arxiv.org/abs/2106.09494).

Orçamento total de 120 s sem custo de troca. Taxas reais estáveis r=(1,1,4,4) s⁻¹. O piloto independente usa u segundos por condição e Kᵢ~Poisson(rᵢu). A coleta principal usa tᵢ=(120−4u)[(1−a)/4+a√Kᵢ/Σ√Kⱼ] segundos, com pesos uniformes se todos forem zero. As quatro contagens principais são independentes e Poisson condicionalmente ao piloto. As contagens do piloto não entram no estimador. Sua média condicional é o contraste verdadeiro. Pela variância total, a variância incondicional é E[Σrᵢ/tᵢ], em s⁻². A referência sem piloto é 1/3 s⁻².

Foram sorteados 200 mil pilotos por duração em NumPy 2.2.6. A coleta principal foi integrada pela fórmula de variância. O erro padrão Monte Carlo (SE) descreve a precisão numérica da média. A grade não estabelece ótimo global.

```python
import numpy as np
rng=np.random.default_rng(202611131029)
rates=np.array([1.,1.,4.,4.])
for u in [1,2,3]:
    counts=rng.poisson(u*rates,size=(200000,4))
    roots=np.sqrt(counts)
    denom=roots.sum(axis=1,keepdims=True)
    weights=np.divide(roots,denom,out=np.full_like(roots,.25),where=denom>0)
    for a in [.25,.5,.75]:
        t=(120-4*u)*((1-a)/4+a*weights)
        v=(rates/t).sum(axis=1)
        print(f'u={u} a={a:.2f} media={v.mean():.8f} SE={v.std(ddof=1)/len(v)**.5:.8f}')
```
```text
u=1 a=0.25 media=0.32943099 SE=0.00002382
u=1 a=0.50 media=0.33211451 SE=0.00005556
u=1 a=0.75 media=0.38044438 SE=0.00018947
u=2 a=0.25 media=0.34109073 SE=0.00001359
u=2 a=0.50 media=0.33466346 SE=0.00001709
u=2 a=0.75 media=0.34672486 SE=0.00006877
u=3 a=0.25 media=0.35401686 SE=0.00001068
u=3 a=0.50 media=0.34503441 SE=0.00001296
u=3 a=0.75 media=0.34696086 SE=0.00004304
```

O Cosmos e o Z3 verificaram as comparações numéricas via scripts/avaliar-ponto-observador.mjs. A primeira usa 36/116 s⁻², alocação ideal após piloto de 4 s. A segunda usa 11/29 s⁻² como comparação aritmética independente. A derivação de variância e os resultados Monte Carlo foram calculados separadamente.

```json
[
  {
    "visaoDeclarada": "Comparar variâncias no orçamento fixo.",
    "teseFormal": "vAd < vUni",
    "leituraDaTese": "vAd é menor que vUni",
    "status": "SEGUE",
    "explicacao": "A tese decorre das premissas indicadas.",
    "premissas": [
      {
        "id": "hipótese 1",
        "formula": "116 × vAd = 36 ∧ 3 × vUni = 1"
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
  {
    "visaoDeclarada": "Comparar variâncias no orçamento fixo.",
    "teseFormal": "vAd ≤ vUni",
    "leituraDaTese": "vAd é menor ou igual a vUni",
    "status": "CONTRADIZ",
    "explicacao": "A tese entra em conflito com as premissas indicadas.",
    "premissas": [
      {
        "id": "hipótese 1",
        "formula": "29 × vAd = 11 ∧ 3 × vUni = 1"
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
  }
]
```

Sem coleta física. Próximo passo: repetir a comparação para diferentes razões entre taxas, incluindo custo de alternar controles e tempo mínimo de estabilização.
