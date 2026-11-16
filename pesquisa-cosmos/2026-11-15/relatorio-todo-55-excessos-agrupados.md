# Todo 55 — Recuperação com excessos agrupados

15/11/2026 no horário local. O Todo 54 calculou a recuperação de um excesso máximo. A Língua Secreta v34 tratou do ajuste baseado no histórico. A parábola da torre motiva calcular o custo de cada sequência antes de depender da recuperação. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No modelo do PMT, um ciclo falha se durar mais de 10 ms. Um lote tem de 1 a 8 ciclos. Nesta rodada, o excesso W=max(N−5,0), em ciclos por lote, vale 0 ou 3. A regra do Todo 54 escolhe λ=3/4 após W=0 e λ=1/2 após W=3, antes de observar o lote seguinte. Com a meta de 1/475 ciclos excedentes por lote, o fator adimensional é (1−λW/3)/(1−λ/1425). O controle de falso positivo de 5% no limiar 20 continua condicionado à hipótese nula de média do próximo lote, dado o histórico, de pelo menos 1/475. Esta rodada calcula trajetórias do produto. [Waudby-Smith e Ramdas](https://arxiv.org/html/2010.09686)

Começando depois de um lote limpo, o primeiro excesso máximo multiplica o produto por A=475/1899. Cada excesso máximo consecutivo adicional multiplica por B=1425/2849. O primeiro lote limpo após o bloco multiplica por G=2850/2849. Os limpos seguintes multiplicam por D=1900/1899. Um bloco de k≥1 excessos máximos seguido de n≥1 lotes limpos tem razão adimensional A·B^(k−1)·G·D^(n−1) em relação ao valor inicial.

Com dois excessos máximos seguidos, o primeiro n que recupera o valor inicial é 3.949 lotes limpos. Em 3.948 a razão ainda fica abaixo de 1. Se cada excesso máximo for isolado e se exigir recuperação individual antes do seguinte, cada um pede 2.633 lotes limpos, num total de 5.266. Em qualquer sequência só com W=0 ou W=3, limitar os máximos a um por janela móvel de 2.634 lotes garante pelo menos 2.633 limpos entre máximos e assim recupera o valor de antes de cada queda até o próximo máximo, desde que o primeiro máximo tenha sido precedido por um lote limpo. A janela não garante recuperação após o último máximo sem que a aquisição continue pelo número necessário de lotes.

Como contraexemplo à ideia de que a contagem total fixa o produto, compare 3,3,0,0 com 3,0,3,0, ambas precedidas por zero. A primeira sequência dá A·B·G·D e a segunda A²·G². O Z3 confirmou que a primeira preserva mais do valor inicial. O tamanho menor de λ após um excesso reduz a perda se outro excesso vier logo depois. A conta não implica que provocar falhas agrupadas melhore o equipamento.

Para reproduzir o teste no Tubo, registrar a sequência completa de W, inclusive zeros, e as escolhas de λ. A prova é condicional e os exemplos são sintéticos, sem medição física. T02–T03 motivam documentar cobertura e T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo passo: permitir W intermediário e testar quais sequências consomem mais evidência para uma soma fixa de excessos.

## Verificação executada

Usei `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs` via JSON no stdin com carregador de 256 MiB do Todo 45, constantes numéricas de aridade zero e regras vazias. Python percorreu n a partir de 1 enquanto A·B·G·D^(n−1)<1 com frações exatas e retornou 3949. Linhas abaixo incluem ID, hipóteses, tese, estado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "BLOCO_DUPLO",
    [
      "a = 475 / 1899",
      "b = 1425 / 2849",
      "g = 2850 / 2849",
      "r = a × b × g"
    ],
    "r < 1",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "MESMA_CONTAGEM",
    [
      "a = 475 / 1899",
      "b = 1425 / 2849",
      "g = 2850 / 2849",
      "d = 1900 / 1899",
      "x = a × b × g × d",
      "y = a × a × g × g"
    ],
    "x > y",
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

Todo 54 SHA-256 `c89ed70415b37f75ffc44fc8441de78867ea2cee1cebab07cd2561ccd9edadba`. Língua Secreta v34 SHA-256 `09e75a5374ceb35f41f8d61fef0490754839d3c8b7835f9c312ed07288d3d98a`. Bytes e blobs remotos conferidos. Base `92a973e8062a43d3cd60a1b94b704060fb97107d` com verificador público aprovado e Pages com falha.
Reexecutei os dois casos do Todo 54 e os cinco da v34 com estados esperados e código zero.
