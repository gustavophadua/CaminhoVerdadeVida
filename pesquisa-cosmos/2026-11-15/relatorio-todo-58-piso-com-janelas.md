# Todo 58 — Piso com restrição de janela

15/11/2026, horário de São Paulo. A v38 da Língua Secreta propõe usar o pior arranjo como guarda quando a ordem não está registrada. Aqui testo quanto uma restrição verificada de janela acrescenta à guarda do Todo 57. A parábola da torre motiva contabilizar a margem antes da decisão. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do PMT, um ciclo falha se exceder 10 ms. W=max(N−5,0), em ciclos excedentes por lote, varia de 0 a 3. O multiplicador adimensional é f=(1−λW/3)/(1−λ/1425). λ vale 3/4 após zero e 1/2 após excesso. Considerei oito lotes precedidos por zero e com soma de nove ciclos excedentes.

Acrescentei a restrição de no máximo um W=3 em cada janela completa de cinco lotes consecutivos. Ela precisa vir de um registro independente ou de um limite operacional verificado. Para incorporar a regra à recorrência do Todo 57, carregue também até quatro indicadores dos máximos anteriores dentro do horizonte. Ao inserir um novo indicador, descarte a transição se ela fechar uma janela de cinco com mais de um máximo. Uma janela que atravesse o início exigiria indicadores anteriores adicionais. Usei enumeração exata para o caso finito desta rodada. [Bellman, programação dinâmica](https://doi.org/10.1287/opre.2.3.275)

Das 5.328 sequências com soma nove, 4.172 satisfazem as quatro janelas. O mínimo passa de 1,5683% para 2,3520% do valor inicial. O novo mínimo é 82927553911132812500000/3525846347557792639180107, atingido em (3,0,1,0,2,0,3,0). A meta de reter 2% passa com a restrição e fica EM ABERTO com a soma sozinha. O contraexemplo (0,0,3,0,3,0,3,0) tem a mesma soma e retém só 1,5683%, mas viola a restrição de janela.

T02–T03 motivam indicar a cobertura e T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Estes resultados são condicionais, sem coleta física. Próximo passo: quantificar a perda de garantia se uma janela não puder ser comprovada.

## Verificação executada

Enumeração em Python com frações exatas.

```python
import itertools
from fractions import Fraction as F
def factors(seq):
 r=F(1)
 prev=0
 for w in seq:
  l=F(1,2) if prev else F(3,4)
  r*=(1-l*w/3)/(1-l/1425)
  prev=w
 return r
rows=[(factors(s),s) for s in itertools.product(range(4),repeat=8) if sum(s)==9]
kept=[(v,s) for v,s in rows if all(s[i:i+5].count(3)<=1 for i in range(4))]
assert len(rows)==5328
print(len(kept), min(kept),float(min(kept)[0]),float(min(rows)[0]),flush=True)
```

O Cosmos/Z3 recebeu os limites e testemunhos da enumeração em JSON pelo stdin de `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com carregador de 256 MiB do Todo 45, constantes numéricas de aridade zero e regras vazias. Campos: ID, premissas, tese, resultado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "COM_JANELA",
    [
      "r ≥ 82927553911132812500000 / 3525846347557792639180107"
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
    "SEM_JANELA",
    [
      "(r = 82927553911132812500000 / 3525846347557792639180107) ∨ (r = 331710215644531250000000 / 21151365365430057562733313)"
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

Todo 57 SHA-256 `53a733de3a92437c426be185eb731271dbd410c219eb80f9c7481e107cb63c6a`. Língua Secreta v38 SHA-256 `be119d9ce785d6d27f83072d313f794194015b9880a19200da496d0dd906c5fd`. Bytes e blobs conferidos. Verificador aprovado na base `69f22ac68f88613fd5617eb2bd205651f0569e6a` e Pages com falha.
Os dois casos do Todo 57 e os cinco da v38 foram reexecutados com estados esperados e código zero.
