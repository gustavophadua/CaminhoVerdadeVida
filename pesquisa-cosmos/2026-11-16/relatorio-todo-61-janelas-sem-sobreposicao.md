# Todo 61 — Dois certificados sem sobreposição

16/11/2026, horário de São Paulo. O Todo 60 testou nove lotes. A Língua Secreta v41 propôs verificar quais janelas sustentam o piso e declarar a estratégia de conferência antes dos dados. A parábola da torre motiva calcular o custo das verificações. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do PMT, um ciclo falha se exceder 10 ms. W=max(N−5,0) conta ciclos excedentes em cada lote e varia de 0 a 3. O fator adimensional é (1−λW/3)/(1−λ/1425), com λ=3/4 após zero e λ=1/2 após excesso. Fixei dez lotes, nove ciclos excedentes no total e um lote anterior sem excesso. Uma janela é certificada quando há no máximo um W=3 nos cinco lotes que contém.

As janelas 1–5 e 6–10 cobrem os dez lotes sem sobreposição. Se a e b contam seus máximos, então a≤1 e b≤1 implicam a+b≤2. A enumeração exata confirmou que certificar essas duas janelas preserva o mesmo piso que certificar as seis. O menor produto é 299368469619189453125000000000/12714910624409259373203941043507, cerca de 2,3545% do valor inicial. Uma sequência que atinge o piso com todas as janelas certificadas é (0,0,3,0,1,0,2,0,3,0). O estado do lote anterior explica por que a ordem ainda entra no cálculo. [Bellman, programação dinâmica](https://pubsonline.informs.org/doi/10.1287/opre.2.3.275)

Das 64 combinações de certificados, apenas as 16 que incluem ambas as extremas garantem pelo menos 2%. Sem 6–10, mas com as outras cinco, (0,0,3,0,0,0,0,3,0,3) retém 1,5702%. Sem 1–5, mas com as outras cinco, (3,0,0,3,0,0,0,0,3,0) retém 1,5699%. A sequência que satisfaz todas as janelas mostra o outro lado da decisão. A meta de 2% fica EM ABERTO em ambos os casos de falta.

As conclusões são condicionais, sem coleta física. T02–T03 motivam declarar cobertura e T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo passo: testar onze lotes, onde dois certificados de cinco posições não cobrem o horizonte.

## Verificação

O código abaixo enumerou 29.050 sequências e calculou os mínimos por máscara com frações exatas.

```python
import itertools
from fractions import Fraction as F
fac={(b,w):(1-l*w/3)/(1-l/1425) for b,l in enumerate([F(3,4),F(1,2)]) for w in range(4)}
best={}
count=0
for s in itertools.product(range(4),repeat=10):
 if sum(s)!=9: continue
 count+=1
 r=F(1)
 b=0
 for w in s:
  r*=fac[b,w]
  b=int(w>0)
 g=sum(1<<i for i in range(6) if s[i:i+5].count(3)<=1)
 m=g
 while True:
  best[m]=min(best.get(m,(r,s)),(r,s))
  if not m: break
  m=(m-1)&g
print(count)
for m in [0,31,32,33,62,63]: print(m,best[m],float(best[m][0]))
print(sorted(m for m,(r,s) in best.items() if r>=F(1,50)))
```

Cosmos e Z3 via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, constantes reais de aridade zero, regras vazias. Linhas com ID, premissas, tese, resultado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "SEM_SOBREPOSICAO",
    [
      "a ≥ 0",
      "b ≥ 0",
      "a ≤ 1",
      "b ≤ 1"
    ],
    "a + b ≤ 2",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "META",
    [
      "r ≥ 299368469619189453125000000000 / 12714910624409259373203941043507"
    ],
    "r ≥ 1 / 50",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "FALTA",
    [
      "(r = 299368469619189453125000000000 / 12714910624409259373203941043507) ∨ (r = 2394947756953515625000000000000 / 152525376935284354038555397091289)"
    ],
    "r ≥ 1 / 50",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ]
]
```

Todo 60 SHA-256 `8110dabc5898eaf8ddbeceb8b82e8eecee2ea9d20a9b6695c45087742d6c1be7`. Língua Secreta v41 SHA-256 `963c3be18d5d85c1db9186bf48ae85d94d76f7b1a209b3068b3706cdda8c297a`. Bytes e blobs remotos conferidos. Base `9c225c9287af0764c1f6b7d640925e79b754eeb1` com verificador público aprovado e Pages com falha.
Os três casos do Todo 60 e os quatro da v41 deram os estados esperados e código zero na reexecução.
