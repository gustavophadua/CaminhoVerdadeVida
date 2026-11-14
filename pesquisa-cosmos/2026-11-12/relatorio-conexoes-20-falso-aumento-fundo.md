# 12/11/2026 — Relatório 20: falso aumento causado por fundo variável

Continua relatórios 18–19: desta vez executou-se o teste, não somente a variância. Base Tubo relida; observação parcial (T01–T03) não garante que variação registrada seja variação de concentração. BOOK final preservado.

## Física, matemática, biologia e fonte

Captura molecular com taxa de sinal s=κc=10 s⁻¹ constante; c é concentração local em m⁻³ e κ em m³/s. Fundo B em {3,7} s⁻¹ equiprovável é um ambiente latente, constante por janela. Há duas hipóteses: B compartilhado entre as janelas ou duas realizações independentes. Em ambos os casos, E[B0]=E[B1]=5 s⁻¹ e a concentração não aumenta. Durações iguais T em s. Contagens condicionalmente independentes: Ni|Bi ~ Poisson((s+Bi)T).

A distinção entre ruído intrínseco e extrínseco em biologia tem pesquisa primária em Swain, Elowitz e Siggia, PNAS (2002), DOI 10.1073/pnas.162041399: https://pmc.ncbi.nlm.nih.gov/articles/PMC130539/ . O modelo de fundo de dois níveis é hipótese ilustrativa nossa, não ajuste experimental do artigo. A cópia PDF do laboratório não respondeu nesta rodada; não foi usada para alegar novos resultados do artigo.

Condicionalmente a B0,B1 e total S, N1 é Binomial(S,p), p=(s+B1)/(2s+B0+B1). Se B0=B1, p=1/2 independentemente de B; teste unilateral do relatório 18 mantém tamanho ≤5%. Se B1>B0, p>1/2 sem qualquer mudança de c. Médias iguais de fundo não impõem p=1/2 em cada par. A taxa de rejeição abaixo é falso aumento de SINAL/CONCENTRAÇÃO; com fundos diferentes, a hipótese de igualdade das taxas totais efetivamente não vale naquele par. Portanto não é falha de um teorema do teste exato, mas falha de sua interpretação e de suas hipóteses no protocolo.

## Provas condicionais Cosmos/Z3

```json
[
  {
    "id": "COMUM_BINOMIAL",
    "premissas": {
      "A": "sinal > 0 ∧ fundo ≥ 0 ∧ fundoDois = fundo",
      "B": "prob × (2 × sinal + fundo + fundoDois) = sinal + fundoDois"
    },
    "alvo": "2 × prob = 1",
    "esperado": "SEGUE"
  },
  {
    "id": "FUNDO_SIMULA_AUMENTO",
    "premissas": {
      "A": "sinal > 0 ∧ fundo ≥ 0 ∧ fundoDois > fundo",
      "B": "prob × (2 × sinal + fundo + fundoDois) = sinal + fundoDois"
    },
    "alvo": "2 × prob > 1",
    "esperado": "SEGUE"
  },
  {
    "id": "MEDIA_NAO_BASTA",
    "premissas": {
      "A": "sinal = 10 ∧ fundo = 3 ∧ fundoDois = 7",
      "B": "prob × (2 × sinal + fundo + fundoDois) = sinal + fundoDois"
    },
    "alvo": "2 × prob = 1",
    "esperado": "CONTRADIZ"
  }
]
```
Comando: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-20-temporaria.mjs`. Código 0:
```text
COMUM_BINOMIAL: premissas=sat; consulta=sat; negacao=unsat
COMUM_BINOMIAL SEGUE [A, B, consulta]
FUNDO_SIMULA_AUMENTO: premissas=sat; consulta=sat; negacao=unsat
FUNDO_SIMULA_AUMENTO SEGUE [A, B, consulta]
MEDIA_NAO_BASTA: premissas=sat; consulta=unsat; negacao=sat
MEDIA_NAO_BASTA CONTRADIZ [A, B, consulta]

```

## Simulação executada

200.000 pares por cenário, PCG64 semente 2026111223, NumPy 2.2.6. Regra: rejeitar se cauda Binomial(total,1/2) ≤0,05. Sem aproximação normal; probabilidades calculadas em ponto flutuante via lgamma e normalização. Código Python executado com código zero:
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
rng=np.random.Generator(np.random.PCG64(2026111223))
for t in [25,90]:
 for comum in [True,False]:
  b0=rng.choice([3.,7.],200000)
  b1=b0 if comum else rng.choice([3.,7.],200000)
  a=rng.poisson((10+b0)*t);b=rng.poisson((10+b1)*t)
  uniq,inv=np.unique(a+b,return_inverse=True)
  k=np.array([limiar(int(n)) for n in uniq])[inv]
  rej=float(np.mean(b>=k));se=math.sqrt(rej*(1-rej)/len(a))
  print(f'T={t}s; comum={comum}; rejeicao={rej:.6f}; SE_MC={se:.6f}')

```
```text
T=25s; comum=True; rejeicao=0.045900; SE_MC=0.000468
T=25s; comum=False; rejeicao=0.265265; SE_MC=0.000987
T=90s; comum=True; rejeicao=0.047775; SE_MC=0.000477
T=90s; comum=False; rejeicao=0.276145; SE_MC=0.001000

```

SE_MC mede erro Monte Carlo; não valida um sensor biológico. Esta execução quantifica a fragilidade que o relatório 19 apenas antecipava. Resultados conhecidos: ruído ambiental e condicionamento Poisson-binomial. Nova conexão no projeto: a concentração constante pode aparentar aumento quando o registro confunde sinal com fundo entre janelas. Hipótese: fundo de dois níveis e correlação especificada. Prova condicional: três consultas; a distribuição binomial foi deduzida fora do solver. Eficácia experimental medida: nenhuma.

Próximo: controle negativo simultâneo que compartilhe fundo, com eficiência relativa conhecida, e testar se subtração corrige média sem impor indevidamente estatística Poisson à diferença. Código e resultados preservados neste relatório; somente os dois temporários próprios foram removidos.
