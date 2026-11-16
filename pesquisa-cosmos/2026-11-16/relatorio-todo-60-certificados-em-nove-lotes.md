# Todo 60 — Dois certificados ainda bastam em nove lotes

16/11/2026, horário de São Paulo. O Todo 59 identificou as janelas decisivas em oito lotes. A Língua Secreta v40 trata do pior caso quando falta uma janela. A parábola da torre motiva verificar o custo de cada certificado antes de decidir. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do PMT, um ciclo falha se exceder 10 ms. W=max(N−5,0) conta ciclos excedentes por lote e assume valores de 0 a 3. O produto adimensional usa o fator (1−λW/3)/(1−λ/1425), com λ=3/4 após zero e λ=1/2 após excesso. Considerei um lote anterior com zero, nove lotes novos e nove ciclos excedentes no total. Uma janela certificada tem comprimento cinco e no máximo um W=3.

As janelas 1–5 e 5–9 garantem o mesmo piso das cinco janelas juntas, **2,3532%** do valor inicial. São os únicos dois certificados indispensáveis para a meta de 2% neste cenário. A interseção agora tem um lote. Se a,b,c contam os máximos nos lotes 1–4, no lote 5 e nos lotes 6–9, as extremas impõem a+b≤1 e b+c≤1. O Z3 provou que a+b+c≤2. Essa contagem explica a exclusão dos cenários com três máximos. O cálculo do menor produto ainda exige considerar as magnitudes e a ordem. A recorrência do Todo 57 e a enumeração tratam essas transições com o estado anterior. [Bellman, programação dinâmica](https://pubsonline.informs.org/doi/10.1287/opre.2.3.275)

Enumerei as 13.051 sequências de soma nove e os 32 subconjuntos de certificados. Os oito subconjuntos que incluem as duas extremas são exatamente os que garantem 2%. Sem 5–9, mas com as outras quatro, (0,3,0,0,0,0,3,0,3) retém 1,5694%. Sem 1–5, mas com as outras quatro, (3,0,3,0,0,0,0,3,0) retém 1,5691%. Em ambos os cenários, também há casos acima da meta, como (0,3,0,1,0,2,0,3,0), e a decisão fica EM ABERTO. A suficiência de dois certificados foi testada para este comprimento, soma e meta.

A análise é condicional, sem coleta física. T02–T03 motivam explicitar a cobertura e T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo passo: testar dez lotes, onde duas janelas de cinco conseguem cobrir o horizonte sem sobreposição.

## Verificação

Enumeração exata em Python.

```python
import itertools
from fractions import Fraction as F
fac={(b,w):(1-l*w/3)/(1-l/1425) for b,l in enumerate([F(3,4),F(1,2)]) for w in range(4)}
best={}
count=0
for s in itertools.product(range(4),repeat=9):
 if sum(s)!=9: continue
 count+=1
 r=F(1)
 b=0
 for w in s:
  r*=fac[b,w]
  b=int(w>0)
 g=sum(1<<i for i in range(5) if s[i:i+5].count(3)<=1)
 m=g
 while True:
  best[m]=min(best.get(m,(r,s)),(r,s))
  if not m: break
  m=(m-1)&g
print(count)
for m in [0,15,16,17,30,31]: print(m,best[m],float(best[m][0]))
print(sorted(m for m,(r,s) in best.items() if r>=F(1,50)))
```

Cosmos e Z3 via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com constantes numéricas reais de aridade zero e regras vazias. A enumeração forneceu o piso e os testemunhos usados nas comparações. Campos: ID, premissas, tese, resultado, SAT das premissas/com tese/com negação, código.

```json
[
  [
    "EXTREMAS_NOVE",
    [
      "a ≥ 0",
      "b ≥ 0",
      "c ≥ 0",
      "a + b ≤ 1",
      "b + c ≤ 1"
    ],
    "a + b + c ≤ 2",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "META_2",
    [
      "r ≥ 157562352431152343750000000 / 6695582214012248221803023193"
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
    "SEM_EXTREMA",
    [
      "(r = 157562352431152343750000000 / 6695582214012248221803023193) ∨ (r = 1260498819449218750000000000 / 80318787222371961052425169611)"
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

Todo 59 SHA-256 `b25810266ae269ed7f847eb1a4214cd98e07bff9a8dcb6a0edba716686d2cc25`. Língua Secreta v40 SHA-256 `af56e0167836faca9bc323fbdbadb14fc14e65e17a3d49e350db98532b39d620`. Bytes e blobs remotos conferidos. Base `3645e87a1a46bf1aa404338f56949b2b7eea3065` com verificador público aprovado e falha no Pages.
Os dois casos do Todo 59 e os quatro da v40 foram reexecutados com os estados esperados e código zero.
