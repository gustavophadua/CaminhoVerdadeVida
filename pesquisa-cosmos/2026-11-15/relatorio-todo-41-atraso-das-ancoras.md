# Todo 41 — Quanto atraso nas âncoras cabe no prazo

15/11/2026. O Todo 40 pressupôs que as marcas cercavam a parada. A Língua Secreta v22 levantou a possibilidade de que o registro desloque cada marca para dentro do intervalo. A parábola da torre motiva reservar margem para esse custo antes de decidir. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

A especificação de medição de atraso IP separa o instante do evento na interface do instante observado pelo software e inclui ambos os erros de marcação no orçamento. É a base técnica para distinguir atraso de registro e erro de relógio neste modelo. [RFC 7679, §3.7.1–3.7.3](https://www.rfc-editor.org/rfc/rfc7679#section-3.7)

Sejam T₀ e T₁ os instantes da parada e da retomada, com g=T₁−T₀≥0. As marcas ocorrem em T₀+a e T₁+b. Valores positivos de a e b deslocam a respectiva marca para mais tarde. A diferença registrada d satisfaz g=d+r+a−b, onde r é a correção diferencial dos carimbos, já descontado qualquer deslocamento constante comum. Todas as grandezas estão em segundos. Separe r dos deslocamentos a e b na calibração para evitar dupla contagem. Se r≤B, a≤A e b≥−C, segue g≤d+B+A+C. Apenas a marca de início tardia e a marca de fim adiantada aumentam esse teto. Se houver atraso igual nas duas marcas, a=b e a contribuição cancela. Usar o mesmo registrador não estabelece por si só essa igualdade.

Escolhi d=5,5 ms e B=1 ms para testar a folga em relação a g≤7 ms, que resta do prazo de 10 ms após os 3 ms dos outros trechos. Logo A+C≤0,5 ms é suficiente. Com 0,25 ms por borda, o limite de 7 ms é atingível. Com 0,30 ms por borda, r=1 ms, a=0,30 ms e b=−0,30 ms dão g=7,1 ms, total de 10,1 ms. Com a=b=0 e o mesmo r, o total é 9,5 ms. O prazo fica EM ABERTO nesse segundo cenário. Com prova de a=b, o teto cai a 6,5 ms. São provas condicionais com valores sintéticos. Um percentil de atraso exige declarar a cobertura probabilística e não serve como limite determinístico sem hipótese adicional.

Aplicação ao PMT/discriminador: calibrar cada borda com pulsos conhecidos e registrar separadamente o deslocamento entre pulso físico e marca digital. Preservar a sequência e o sinal da correção. Teste físico futuro: variar a fila do software e comparar marcas com aquisição independente por hardware, incluindo situações de carga máxima. Nenhuma medição física foi feita. T02–T03 motivam explicitar cobertura e T05 a verificação independente. T01, T04 e T06–T13 não são premissas. Próximo teste: transformar limites probabilísticos por borda em cobertura conjunta sem presumir independência.

## Verificação executada

Via stdin com `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Constantes numéricas de aridade zero e regras vazias. Linhas com ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código de saída.

```json
[
  [
    "GUARDA_UNILATERAL",
    [
      "d = 11 / 2000",
      "r ≤ 1 / 1000",
      "g ≥ 0",
      "g = d + r + a − b",
      "a ≤ 1 / 4000",
      "b ≥ −1 / 4000"
    ],
    "g ≤ 7 / 1000",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "LIMITE_EXCEDIDO",
    [
      "d = 11 / 2000",
      "r ≤ 1 / 1000",
      "g ≥ 0",
      "g = d + r + a − b",
      "a ≤ 3 / 10000",
      "b ≥ −3 / 10000"
    ],
    "g ≤ 7 / 1000",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "ATRASO_COMUM",
    [
      "d = 11 / 2000",
      "r ≤ 1 / 1000",
      "g ≥ 0",
      "g = d + r + a − b",
      "a = b"
    ],
    "g ≤ 13 / 2000",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ]
]
```

Reexecutei os 3 casos do Todo 40 e os 5 da Língua Secreta v22. Todos deram o estado esperado e código zero. Bases conferidas pelos bytes locais e pelos blobs remotos. SHA-256 do Todo 40 `5ca845cd8caa30453a0b3861db53a42860e05d291cb225389bdfd144f59d1bc1`. SHA-256 da Língua Secreta v22 `f8dae5a6e7ccfa4e4d910eb1428286b227a68c814f3737b8dbd21ff0a0b79c31`. Base remota `fdc507f5997134196da7ffb7462f6882553fc39b` com verificador aprovado e falha no Pages. BOOK preservado.
