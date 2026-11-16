# Todo 59 — Quais janelas sustentam a meta de 2%?

15/11/2026, horário de São Paulo. O Todo 58 verificou as quatro janelas de cinco lotes. A Língua Secreta v39 pede fonte para cada restrição. A parábola da torre motiva identificar quais verificações sustentam a decisão. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

O cenário tem oito lotes do PMT, precedidos por um lote sem excesso e com nove ciclos excedentes ao todo. Um ciclo falha se exceder 10 ms. Cada lote tem N entre 1 e 8 ciclos e W=max(N−5,0) ciclos excedentes. O fator adimensional é (1−λW/3)/(1−λ/1425), com λ=3/4 após W=0 e λ=1/2 após W>0. Cada janela certificada contém no máximo um W=3.

Basta certificar as janelas 1–5 e 4–8 para manter o piso de 2,3520% do Todo 58. Com quatro janelas possíveis, somente quatro subconjuntos garantem a meta de 2%, precisamente os que incluem as duas extremas. Para ver parte da razão, sejam a,b,c as contagens de W=3 nos blocos 1–3, 4–5 e 6–8. As janelas extremas dão a+b≤1 e b+c≤1, logo há no máximo dois máximos. A igualdade do piso foi verificada pela enumeração dos arranjos. A programação dinâmica do Todo 57 também permite levar a máscara das janelas certificadas para as transições. [Bellman, programação dinâmica](https://pubsonline.informs.org/doi/10.1287/opre.2.3.275)

Se faltar a janela 4–8 e as demais forem confirmadas, (3,0,0,0,0,3,0,3) tem a mesma soma nove e retém 1,5685%. Se faltar a primeira, (3,0,3,0,0,0,0,3) dá o mesmo valor e passa nas outras três. Em ambos os casos a meta fica EM ABERTO, pois a sequência (3,0,1,0,2,0,3,0) passa em todas as janelas e retém 2,3520%. A ausência de certificação deixa ambas as possibilidades em jogo. A regra depende da posição da janela, não apenas de quantas foram verificadas.

No Tubo, associar cada certificado aos índices de começo e fim. A análise é condicional e não houve coleta física. T02–T03 motivam a declaração de cobertura e T05 a verificação independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo passo: verificar a menor quantidade de certificados quando o horizonte ou o tamanho da janela muda.

## Verificação

Enumerei os 16 subconjuntos em Python com frações exatas. Cada bit seleciona uma das janelas pela posição inicial.

```python
import itertools
from fractions import Fraction as F
def factor(s):
 r=F(1)
 l=F(3,4)
 for w in s:
  r*=(1-l*w/3)/(1-l/1425)
  l=F(1,2) if w else F(3,4)
 return r
rows=[]
for s in itertools.product(range(4),repeat=8):
 if sum(s)==9:
  mask=sum(1<<i for i in range(4) if s[i:i+5].count(3)<=1)
  rows.append((factor(s),s,mask))
def floor(m):
 return min((r,s) for r,s,g in rows if g&m==m)
for m in range(16):
 r,s=floor(m)
 print(m,str(r),float(r),s)
```

Cosmos e Z3 via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Constantes numéricas de aridade zero e regras vazias. O carregador alternativo do Todo 45 falhou nesta sessão e a execução padrão funcionou. Nas linhas constam ID, premissas, tese, resultado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "EXTREMAS",
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
    "FALTA_EXTREMA",
    [
      "(r = 82927553911132812500000 / 3525846347557792639180107) ∨ (r = 663420431289062500000000 / 42295306594192712507859489)"
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

Todo 58 SHA-256 `793ffb01a408eaf5871facb5914eac5060ebffdd819357d75fe2b24fb6037862`. Língua Secreta v39 SHA-256 `0fc3083211b5cf1598d5ceb59c09f831c7a46b944bbaddbd071c1411a666708b`. Bytes e blobs remotos conferidos. Base `1985a6e052616947e0c283532653bbea8bfccb02` com verificador público aprovado e Pages com falha.
Os dois casos do Todo 58 e os quatro da v39 foram reexecutados com estados esperados e código zero.
