# Todo 39 — Um reinício separa ordem de duração

15/11/2026. Continuação do Todo 38 (salto de fase) e da Língua Secreta v20 (numeração reiniciada após migração). A [parábola da torre (Lucas 14:28–30)](https://www.bible.com/pt/bible/211/LUK.14.28-32) motiva tratar separadamente os custos conhecidos e o trecho ainda sem orçamento. É analogia, sem papel na prova.

A [documentação primária de timekeeping do kernel Linux](https://docs.kernel.org/timers/timekeeping.html) distingue o contador físico e a linha temporal mantida pelo sistema: o software pode compensar o retorno periódico do contador, e a fonte de sched_clock pode parar ou zerar durante suspensão. A [documentação dos acessores](https://docs.kernel.org/6.2/core-api/timekeeping.html) distingue relógios que incluem ou excluem suspensão. Não é caracterização do contador do Tubo.

Considere um único instrumento com duas épocas reconhecidas de uma mesma cadeia de reinicialização. x = instante físico do evento na época anterior, a = fim certificado da aquisição anterior, b = início certificado da posterior e y = instante do evento posterior, todos em s na mesma escala física conceitual. Sob x ≤ a ≤ b ≤ y, segue x ≤ y, mesmo que o número posterior seja menor. Um ID único identifica a época; a ordem entre IDs exige a cadeia autenticada ou outra evidência. Ordenar IDs arbitrários, ou comparar zeros de relógios de inicializações distintas, não fornece essa cadeia.

Defina u = a−x, g = b−a e v = y−b, em s. A duração física é d = y−x = u+g+v. Nos ensaios, u = 1 ms e v = 2 ms são valores locais exatos assumidos após conversão dos ticks; g ≥ 0 é o intervalo que o instrumento não mede durante a reinicialização. Para um prazo inclusivo de 10 ms, sem guarda superior em g, o caso g = 0 satisfaz o prazo e g = 8 ms o excede (d = 11 ms). Com 0 ≤ g ≤ 7 ms, d ≤ 10 ms segue para todos os valores admissíveis. Com incertezas, uma condição suficiente seria U+G+V ≤ prazo, com U,G,V limites superiores conservadores dos três termos, em s. Não contar g como zero na ausência de ponte.

Aplicação ao registro do PMT/discriminador: guardar ID da época, contador monotônico local, registro durável que ligue as épocas e, para medir o intervalo cego, uma referência independente que cubra a parada e o retorno com incerteza declarada. Se o encerramento for abrupto, uma última marca persistida só fornece uma fronteira útil se sua relação com os eventos for certificada; não implica prefixo completo. Sem medida da ponte, registrar que a ordem pode estar decidida enquanto o prazo está EM ABERTO. Ensaio futuro: gerar pulsos antes e depois do reinício e medir a ponte com contador independente. Nenhuma coleta física nem eficácia experimental local.

Cobertura: T02–T03 motivam declarar o que o registro não cobre; T05 é analogia para verificar a ponte de forma independente. T01, T04 e T06–T13 não são premissas (T09 trata de energia, não de duração). Próximo passo: testar os limites da ponte com duas âncoras externas incertas, incluindo o caso em que ambas compartilham o mesmo deslocamento.

## Verificação executada

JSON via stdin: `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, constantes numéricas de aridade zero, `regras=[]`. Campos: ID, premissas, tese, estado, SAT das premissas/com tese/com negação, código de saída.

```json
[
  [
    "ORDEM",
    [
      "x ≤ a",
      "a ≤ b",
      "b ≤ y"
    ],
    "x ≤ y",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "DURACAO_ABERTA",
    [
      "g ≥ 0",
      "d = 1 / 1000 + g + 1 / 500"
    ],
    "d ≤ 1 / 100",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "PONTE_LIMITE",
    [
      "g ≥ 0",
      "g ≤ 7 / 1000",
      "d = 1 / 1000 + g + 1 / 500"
    ],
    "d ≤ 1 / 100",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "PONTE_TARDE",
    [
      "g = 8 / 1000",
      "d = 1 / 1000 + g + 1 / 500"
    ],
    "d ≤ 1 / 100",
    "CONTRADIZ",
    [
      "sat",
      "unsat",
      "sat"
    ],
    0
  ]
]
```

Reexecutei 4 casos do Todo 38 e 6 da Língua Secreta v20, todos com estado esperado e código zero. Entradas conferidas nos bytes e na árvore remota: Todo 38 SHA-256 `dc56362fd08409e6c94a494c18589d4a13542c54c84141aa01d64c46b33f225a`; Língua Secreta v20 SHA-256 `64d1b7e7a71e9748dbe86fae2eddfd871a4ac0430b1b07f4ff95d29fc830bd6a`. Base remota `7d9a40ce7cb540c9a71acf4412e912e541a24f79`, verificador público aprovado; Pages falhou nessa base. BOOK preservado.
