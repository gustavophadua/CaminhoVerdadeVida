# Todo 57 — Menor produto com soma conhecida

15/11/2026, horário de São Paulo. O Todo 56 mostrou que a soma não identifica o produto adaptativo. A Língua Secreta v37 distingue soma de censo e regra sensível à ordem. A parábola da torre motiva calcular quanto ainda se pode garantir com o registro disponível. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

Um ciclo do PMT falha se exceder 10 ms. Cada lote contém de 1 a 8 ciclos. W=max(N−5,0), em ciclos por lote, pertence a {0,1,2,3}. Dado o estado anterior b, igual a 1 se houve excesso e a 0 caso contrário, λ vale 1/2 ou 3/4, respectivamente. A razão adimensional por lote é f(b,W)=(1−λW/3)/(1−λ/1425). Esta rodada calcula o produto, dada a regra já fixada.

Se restam n lotes e s ciclos excedentes no total, defina L(n,s,b) como o menor multiplicador possível. Para 0≤s≤3n, selecione w∈{0,1,2,3} tal que 0≤s−w≤3(n−1). A recorrência é L(n,s,b)=min_w f(b,w)·L(n−1,s−w,1 se w>0; 0 caso contrário), com L(0,0,b)=1. Os estados inviáveis ficam fora do mínimo. A prova por indução separa o primeiro lote de seu sufixo. O fator positivo preserva a ordem dos produtos para um primeiro lote fixado. [Bellman, programação dinâmica](https://doi.org/10.1287/opre.2.3.275)

Partindo de b=0, para dois lotes com soma 3, o mínimo é 451250/1803417≈25,02% e ocorre em (3,0). São quatro sequências possíveis. Todas retêm pelo menos 25%, mas 40% fica EM ABERTO, pois (1,2) supera 40%. Para oito lotes e soma 9, o mínimo é 331710215644531250000000/21151365365430057562733313≈1,5683%. Uma sequência que o atinge é (0,0,3,0,3,0,3,0). Python confirmou ambos os mínimos enumerando todas as 4 e 5.328 sequências admissíveis e comparando à recorrência com frações exatas.

O piso depende de n, s e do estado inicial. É um resultado condicional sobre os dados agregados, sem medição física. T02–T03 motivam documentar a cobertura e T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo passo: impor janelas verificadas à recorrência e medir quanto elas elevam o piso.

## Verificação executada

O Cosmos e o Z3 verificaram os casos de dois lotes abaixo com `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs` via stdin e carregador de 256 MiB do Todo 45. Usei constantes numéricas de aridade zero e regras vazias. O caso de oito lotes foi confirmado em Python, não no Z3. Campos: ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "PISO",
    [
      "(r = 475 × 2850 / (1899 × 2849)) ∨ (r = 950 × 2375 / (1899 × 2849)) ∨ (r = 1425 × 1900 / (1899 × 2849)) ∨ (r = 475 × 1900 / (1899 × 1899))"
    ],
    "r ≥ 1 / 4",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "ACIMA_40",
    [
      "(r = 475 × 2850 / (1899 × 2849)) ∨ (r = 1425 × 1900 / (1899 × 2849))"
    ],
    "r ≥ 2 / 5",
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

Todo 56 SHA-256 `883663040de7d103f897bd494cd56ad8ae9a793868cc156232be51b2afd0ad89`. Língua Secreta v37 SHA-256 `fca0043c2f6f56318f1528c632af59ee8ee8e8851a0d3bbe9a28b5b97b952c65`. Bytes e blobs remotos conferidos. Base `31d5fc1a6c1643407611788519a477ec5b249241` com verificador aprovado e falha no Pages.
Os dois casos do Todo 56 e os cinco da v37 foram reexecutados com os estados esperados e código zero.
