# Todo 42 — Cobertura conjunta das duas bordas

15/11/2026. O Todo 41 obteve g≤d+B+A+C quando passam as guardas das duas bordas. A Língua Secreta v23 propôs combinar percentis sem presumir independência. A parábola da torre motiva repartir a margem antes de começar, aqui como analogia para repartir o risco admissível. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

A especificação primária de medição de atraso IP usa um limite de calibração que cobre ao menos 95% das ocorrências e discrimina erros de relógio e de marcação. A combinação abaixo deriva das premissas do Tubo. [RFC 7679, §3.7.3](https://www.rfc-editor.org/rfc/rfc7679#section-3.7.3)

Para o mesmo ensaio ou população operacional, sejam F₁={erro de início>A} e F₂={erro de fim<−C}. Erros e guardas estão em segundos. Sejam a,b,c,d as massas adimensionais de nenhuma falha, só F₁, só F₂, ambas, respectivamente. Usando as massas não negativas e sua soma unitária, a=1−P(F₁)−P(F₂)+P(F₁∩F₂)≥1−α₁−α₂ quando P(Fᵢ)≤αᵢ. A distribuição conjunta fica livre. Se a guarda do relógio é determinística e o orçamento total, incluindo os demais trechos, fecha quando ambas as guardas passam, então P(prazo satisfeito)≥a. Se a guarda do relógio também pode falhar, sua probabilidade de falha entra no orçamento.

Com duas coberturas marginais de pelo menos 95%, a garantia conjunta é de pelo menos 90%. O limite é atingível com falhas disjuntas de 5% em cada borda. Com as mesmas marginais exatas e falhas coincidentes, a cobertura conjunta é 95%. Portanto garantir 95% fica EM ABERTO com apenas essas marginais. Mesmo a independência, se estabelecida com marginais exatas de 95%, daria 90,25%. Duas guardas de pelo menos 97,5% garantem 95% em conjunto. Qualquer divisão com α₁+α₂≤0,05 serve. A guarda numérica também precisa caber na folga de tempo. Para tornar o contraexemplo um caso de prazo físico, use os 0,25 ms por borda do Todo 41 e erro de relógio r=1 ms. Fixe ambas as contribuições adversas em 0,25 ms no estado sem falha. Nos estados de falha exclusiva, aumente a contribuição da borda que falha para 0,30 ms e mantenha a outra. O total passa de 10,00 para 10,05 ms nesses estados.

Para o PMT/discriminador, definir a carga operacional e calibrar por pares, preservando os erros das duas bordas na mesma tentativa. Uma medição direta da cauda da soma pode aproveitar a dependência se houver dados e validação. Percentis estimados de uma amostra precisam de garantia própria de estimação e aplicabilidade ao regime de uso. Aqui o Z3 verificou consequências algébricas. Nenhuma cobertura física foi medida. T02–T03 motivam declarar a informação que falta, T05 a referência independente, e T01, T04 e T06–T13 ficam fora das premissas. Próximo teste: calcular quantas tentativas de validação com zero falhas sustentam uma cota unilateral do risco.

## Verificação executada

JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Constantes numéricas de aridade zero, regras vazias. Linhas com ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código de saída.

```json
[
  [
    "MARGINAIS_95",
    [
      "a ≥ 0",
      "b ≥ 0",
      "c ≥ 0",
      "d ≥ 0",
      "a + b + c + d = 1",
      "b + d ≤ 1 / 20",
      "c + d ≤ 1 / 20"
    ],
    "a ≥ 9 / 10",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "CONJUNTA_95_ABERTA",
    [
      "a ≥ 0",
      "b ≥ 0",
      "c ≥ 0",
      "d ≥ 0",
      "a + b + c + d = 1",
      "b + d = 1 / 20",
      "c + d = 1 / 20"
    ],
    "a ≥ 19 / 20",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "FALHAS_DISJUNTAS",
    [
      "a ≥ 0",
      "b ≥ 0",
      "c ≥ 0",
      "d ≥ 0",
      "a + b + c + d = 1",
      "b = 1 / 20",
      "c = 1 / 20",
      "d = 0"
    ],
    "a ≥ 19 / 20",
    "CONTRADIZ",
    [
      "sat",
      "unsat",
      "sat"
    ],
    0
  ],
  [
    "MARGINAIS_975",
    [
      "a ≥ 0",
      "b ≥ 0",
      "c ≥ 0",
      "d ≥ 0",
      "a + b + c + d = 1",
      "b + d ≤ 1 / 40",
      "c + d ≤ 1 / 40"
    ],
    "a ≥ 19 / 20",
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

Reexecutei os 3 casos do Todo 41 e os 5 da Língua Secreta v23, todos com estado esperado e código zero. SHA-256 e blobs conferidos. Todo 41 `3fa643c73d6221669b5d5d6e8c46301cfad92b363f623c77bc1cb669a90a7801`. Língua Secreta v23 `82fc9c2c2f7b88d2246d366c410930b420c3069c0448b0bb194f3ef0ef80b9b5`. Base `d3e8ec2468460483cd9a228f44f82f96a5a0d91a` com verificador público aprovado e falha no Pages. BOOK preservado.
