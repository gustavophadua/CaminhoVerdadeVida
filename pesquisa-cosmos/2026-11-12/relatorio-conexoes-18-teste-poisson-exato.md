# 12/11/2026 — Relatório 18: teste de aumento com falso positivo controlado

Continuação do relatório 17, preservando o BOOK final e seu hash. Regras T01–T13 relidas: observação parcial motiva explicitar detector e hipótese; T09 não fornece uma fórmula de custo temporal. Nenhuma regra do Tubo substitui o modelo estatístico abaixo.

## Conexão física, matemática e biologia

Na captura molecular ideal, N0 e N+ são Poisson independentes, com médias λ0 T e λ+ T. As taxas são em s⁻¹, T>0 em s por janela; λ0=κc+b e λ+=κ(c+Δ)+b com κ>0 m³/s, c≥0 e Δ>0 m⁻³, b≥0 s⁻¹. Adição conhecida, banho estacionário, ausência de saturação, ganho e fundo estáveis. Difusão e captura celular motivam contar moléculas; religação e adaptação podem invalidar Poisson.

Conhecido: testes de homogeneidade de séries Poisson foram estudados por Przyborowski e Wilenski (1940), inclusive em amostras de sementes: https://doi.org/10.1093/biomet/31.3-4.313 . Nesta rodada foi verificado o registro primário do artigo, não seu texto integral. Contexto biofísico primário consultado na rodada anterior: Berg e Purcell (1977), https://doi.org/10.1016/S0006-3495(77)85544-6 . A dedução explícita a seguir não depende de atribuir ao artigo conteúdo não acessado.

## Derivação e regra de decisão

Condicionando S=N0+N+, a divisão das massas Poisson fornece N+|S=s ~ Binomial(s,p), p=λ+/(λ0+λ+). Sob H0: λ+=λ0, p=1/2. Para testar aumento unilateral, rejeitar quando sum_{j=N+}^{s} binom(s,j)2^-s ≤0,05. Para s=0 não rejeitar. Para cada s, a probabilidade de rejeição sob H0 é ≤0,05, logo a mistura sobre S também é ≤0,05. O mesmo controle vale para λ+≤λ0 por monotonicidade da cauda binomial. Esse é um teste exato no modelo estatístico; os cálculos de caudas abaixo usam ponto flutuante.

A antiga condição N+>N0 não controlava falso positivo em 5%. Esta rodada distingue significância (erro sob H0) de potência (rejeição sob alternativa). Para janelas diferentes, p0=T+/(T0+T+), e usar 1/2 é incorreto. A identidade condicional e o controle de tamanho são deduções matemáticas; Z3 verifica somente as consequências algébricas de p, não a distribuição nem a soma de probabilidades.

## Cosmos/Z3 executado

```json
[
  {
    "id": "NULO_IGUAL",
    "premissas": {
      "A": "lam > 0 ∧ lamMais = lam",
      "B": "prob × (lam + lamMais) = lamMais"
    },
    "alvo": "2 × prob = 1",
    "esperado": "SEGUE"
  },
  {
    "id": "ALTERNATIVA",
    "premissas": {
      "A": "lam > 0 ∧ lamMais > lam",
      "B": "prob × (lam + lamMais) = lamMais"
    },
    "alvo": "2 × prob > 1 ∧ prob < 1",
    "esperado": "SEGUE"
  },
  {
    "id": "EXPOSICAO_DESIGUAL",
    "premissas": {
      "A": "lam > 0 ∧ lamMais = lam ∧ tempo > 0 ∧ tempoMais = 2 × tempo",
      "B": "prob × (lam × tempo + lamMais × tempoMais) = lamMais × tempoMais"
    },
    "alvo": "2 × prob = 1",
    "esperado": "CONTRADIZ"
  }
]
```
Comando: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-18-exato-temporaria.mjs`. Código 0, analisador aceitou todas as fórmulas; premissas, consulta e negação:
```text
NULO_IGUAL: premissas=sat; consulta=sat; negacao=unsat
NULO_IGUAL SEGUE [A, B, consulta]
ALTERNATIVA: premissas=sat; consulta=sat; negacao=unsat
ALTERNATIVA SEGUE [A, B, consulta]
EXPOSICAO_DESIGUAL: premissas=sat; consulta=unsat; negacao=sat
EXPOSICAO_DESIGUAL CONTRADIZ [A, B, consulta]

```

## Simulação reproduzível

Python/NumPy 2.2.6, PCG64 semente 2026111221, 200.000 pares por cenário, λ0=15 s⁻¹, λ+=15 s⁻¹ sob H0 ou 17 s⁻¹ sob alternativa. Numeração de tempos é grade pré-fixada; não se alega mínimo global. Limiares são obtidos por caudas binomiais, sem aproximação normal, usando lgamma e normalização em dupla precisão. Verificados casos pequenos e condição de fronteira para cada limiar calculado. SciPy não estava instalado; nenhuma instalação foi necessária.
```python
import math
import numpy as np
from functools import lru_cache
@lru_cache(None)
def limiar(n):
    # Distribuicao binomial(n, 1/2), normalizada em ponto flutuante.
    logs=np.array([math.lgamma(n+1)-math.lgamma(k+1)-math.lgamma(n-k+1)-n*math.log(2) for k in range(n+1)])
    mass=np.exp(logs); mass/=mass.sum()
    tail=np.cumsum(mass[::-1])[::-1]
    indices=np.flatnonzero(tail<=.05)
    k=int(indices[0]) if len(indices) else n+1
    assert (tail[k] if k<=n else 0)<=.05
    assert k==0 or tail[k-1]>.05
    return k
assert limiar(0)==1 and limiar(5)==5 and limiar(10)==9
rng=np.random.Generator(np.random.PCG64(2026111221))
for t in [25,80,90,100]:
    for lp in [15,17]:
        a=rng.poisson(15*t,200000);b=rng.poisson(lp*t,200000)
        total=a+b
        uniq,inv=np.unique(total,return_inverse=True)
        thresholds=np.array([limiar(int(n)) for n in uniq])[inv]
        rate=float(np.mean(b>=thresholds))
        se=math.sqrt(rate*(1-rate)/len(a))
        print(f'T={t}s; total={2*t}s; lambda+={lp}/s; rejeicao={rate:.6f}; SE_MC={se:.6f}')

```
Comando Python sobre temporário da rodada, código 0:
```text
T=25s; total=50s; lambda+=15/s; rejeicao=0.046960; SE_MC=0.000473
T=25s; total=50s; lambda+=17/s; rejeicao=0.534365; SE_MC=0.001115
T=80s; total=160s; lambda+=15/s; rejeicao=0.047665; SE_MC=0.000476
T=80s; total=160s; lambda+=17/s; rejeicao=0.933395; SE_MC=0.000558
T=90s; total=180s; lambda+=15/s; rejeicao=0.048665; SE_MC=0.000481
T=90s; total=180s; lambda+=17/s; rejeicao=0.955415; SE_MC=0.000462
T=100s; total=200s; lambda+=15/s; rejeicao=0.048135; SE_MC=0.000479
T=100s; total=200s; lambda+=17/s; rejeicao=0.969340; SE_MC=0.000385

```

Tempo total é 2T, sem preparação/mistura. SE_MC é desvio padrão de Monte Carlo, não incerteza de uma experiência celular. As taxas usadas são ilustrativas; a estimativa de potência não prova eficácia em organismos. O custo energético e de material não foi inferido a partir de segundos.

## Classificação e próximos passos

Resultado conhecido: condicionamento de duas Poisson produz binomial e permite controlar erro do teste. Conexão nova para o projeto: orçamento temporal de calibração agora tem critério de falso positivo explícito, ao contrário da comparação de sinais do relatório 17. Hipóteses: independência, estabilidade e janela controlada. Provas condicionais: três verificações Z3 e derivação estatística descrita separadamente. Eficácia experimental medida: nenhuma. Próximo: verificar robustez à flutuação do fundo e inserir janela de branco; refinar a grade temporal com cálculo de potência incondicional se for necessário um tempo mínimo. Temporários próprios removidos após incorporar código e resultados; BOOK final não foi alterado.
