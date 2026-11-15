# Todo 46 — Lotes raros e excesso de ciclos

15/11/2026. O Todo 45 supôs um teto para todo lote. A Língua Secreta v27 propôs contar separadamente os fios que excedem o teto. A parábola da torre motiva incluir no orçamento o custo dos itens excepcionais. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

Sejam N≥m>0 o número de ciclos de um lote, K suas falhas, I o indicador K>0 e q=P(I=1). O risco de um ciclo sorteado uniformemente numa população finita é p=E[K]/E[N], usando expectativas sobre lotes equiprováveis. A ponderação proporcional ao tamanho fundamenta a distinção entre as duas unidades de amostragem. [Hansen e Hurwitz (1943)](https://doi.org/10.1214/aoms/1177731356)

Para um teto nominal M≥m, defina h=E[max(N−M,0)]/m, com E[N] finita. R=M/m, h, q e p são adimensionais. Como NI ≤ MI+max(N−M,0), x=E[NI]/m≤Rq+h. Lotes sem falha contribuem y=E[N(1−I)]/m≥1−q. Como K≤NI, segue p≤x/(x+y)≤(Rq+h)/(1−q+Rq+h) para q<1. A segunda desigualdade usa a monotonicidade em x e y. Com teto certificado M para todos os lotes, h=0 e recuperamos o Todo 45. Se P(N>M)≤ε e houver teto físico H≥M, então h≤ε(H−M)/m. Um teto de frequência ε sem limite de tamanho ou de excesso esperado não fornece a mesma garantia.

No caso q=1%, R=5, h≤0,002, o teto é 52/1042≈4,9904%, dentro da meta de 5%. Para h=0,003, o extremo dá 53/1043≈5,0815%. Ambos os extremos são realizáveis com m=1, 990 lotes sem falha de tamanho 1, 9 lotes com todos os ciclos falhos de tamanho 5 e um lote excepcional com todos os ciclos falhos de tamanho 7 ou 8, respectivamente. Mantendo essa mesma frequência excepcional de 0,1% e deixando o tamanho w inteiro sem teto, p pode tender a 1 à medida que w aumenta. O Cosmos testou a meta de 5% com w>5 via relaxação real, com testemunhos inteiros w=7 e w=8.

No PMT/discriminador, a falha continua sendo prazo superior a 10 ms. O registro deve incluir contagem de ciclos por lote e o excesso sobre M, preservando lotes grandes no denominador. Os números são de modelos condicionais. Nenhum ciclo físico foi medido. T02–T03 motivam registrar a cobertura e T05 uma referência independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo teste: estimar uma cota de h quando os lotes são amostrados e há teto físico H.

## Verificação executada

JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com o carregador em memória de 256 MiB documentado no Todo 45. Constantes numéricas de aridade zero e regras vazias. Campos: ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código de saída.

```json
[
  [
    "EXCESSO_LIMITADO",
    [
      "x ≥ 0",
      "x ≤ 52 / 1000",
      "y ≥ 99 / 100",
      "p × (x + y) ≤ x"
    ],
    "p ≤ 1 / 20",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "EXCESSO_MAIOR",
    [
      "x = 53 / 1000",
      "y = 99 / 100",
      "p × (x + y) = x"
    ],
    "p ≤ 1 / 20",
    "CONTRADIZ",
    [
      "sat",
      "unsat",
      "sat"
    ],
    0
  ],
  [
    "CAUDA_SEM_TETO",
    [
      "w > 5",
      "x = 45 / 1000 + w / 1000",
      "y = 99 / 100",
      "p × (x + y) = x"
    ],
    "p ≤ 1 / 20",
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

Também reexecutei os 3 casos do Todo 45 e os 4 da Língua Secreta v27. Todos deram o estado esperado com código zero. SHA-256 e blobs remotos conferidos. Todo 45 `d516059f27787f3f1e908e5e698a779a0b4fa236e30d6f2b809a6e81a60b3481`. Língua Secreta v27 `0caffa1636986d627f38523a25d3c53caa95ee5bf6e84962ba4269ac5c9311ac`. Base `6bd70d85ae27260ca5d5ef11afb7f9d6e741e217` com verificador público aprovado e falha no Pages. BOOK preservado.
