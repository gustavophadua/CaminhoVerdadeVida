# Todo 54 — Recuperação do teste com peso adaptativo

15/11/2026 no horário local. O Todo 53 calculou a recuperação com peso constante. A Língua Secreta v34 propôs que o histórico mude o peso sem transformar um único excesso em veto total. A parábola da torre motiva calcular quantos lotes são necessários para recuperar a perda. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

No ensaio do PMT, um ciclo falha se exceder 10 ms. Cada lote tem até oito ciclos e W=max(N−5,0) ciclos excedentes. Dada a cota de 1% de lotes falhos, a meta suficiente para a média do excesso é 1/475 ciclos por lote. O teste usa o fator adimensional f=(1−λW/3)/(1−λ/1425). A regra anunciada no Todo 53 escolhe λ=3/4 após W=0 e λ=1/2 após W>0. Mantendo a escolha antes da aquisição e a hipótese nula condicional do Todo 52, o produto conserva o controle de falso positivo de 5% no limiar 20. [Waudby-Smith e Ramdas](https://arxiv.org/html/2010.09686)

Partindo de um lote sem excesso, o lote seguinte com W=3 multiplica o produto por 475/1899. O primeiro lote limpo da recuperação usa λ=1/2, com ganho 2850/2849. Os demais limpos usam λ=3/4, com ganho 1900/1899. Após n≥1 lotes limpos, a razão em relação ao valor antes da queda é (475/1899)(2850/2849)(1900/1899)^(n−1). Ela fica abaixo de 1 em 2.632 e atinge 1 ou mais em 2.633. A troca de peso no primeiro lote de recuperação muda o valor exato da razão, mas preserva o menor número inteiro neste exemplo.

Na sequência alternada 3,0,3,0,… precedida por zero, cada par multiplica o valor por (475/1899)(2850/2849), cerca de 0,25022. O produto decai de par em par, apesar do fator sempre positivo. A consulta ORDEM_IMPORTA compara a mesma alternância sob uma regra invertida e também previsível, que usa 1/2 após zero e 3/4 após excesso. O ganho por par da regra invertida, (1425/2849)(1900/1899), é maior no cenário alternado e permanece abaixo de 1. O exemplo compara trajetórias escolhidas e não estima poder geral.

No Tubo, registrar W completo e λ antes da aquisição permite reproduzir o produto. T02–T03 motivam indicar a cobertura do registro e T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Não houve coleta física. Próximo passo: testar recuperação sob um limite explícito para o número de excessos em janelas consecutivas.

## Verificação executada

Usei `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs` via JSON no stdin, com carregador de 256 MiB do Todo 45, constantes numéricas de aridade zero e regras vazias. Python confirmou por inteiros `475*2850*1900**(n-2)<2849*1899**(n-1)` em n=2633 e `475*2850*1900**(n-1)>=2849*1899**n` no mesmo n. O Cosmos e o Z3 testaram os pares abaixo. Campos: ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código.

```json
[
  [
    "PAR_ALTERNADO",
    [
      "f = 475 / 1899",
      "g = 2850 / 2849",
      "r = f × g"
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
    "ORDEM_IMPORTA",
    [
      "a = 475 / 1899",
      "b = 1425 / 2849",
      "u = a × 2850 / 2849",
      "v = b × 1900 / 1899"
    ],
    "u < v",
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

Todo 53 SHA-256 `6c287d94279b81cfef7cb904093d2caeee43195cfdd0a77363689ca27e233b45`. Língua Secreta v34 SHA-256 `09e75a5374ceb35f41f8d61fef0490754839d3c8b7835f9c312ed07288d3d98a`, última versão disponível no início. Bytes e blobs remotos conferidos. Base `620ead6149d617e045e93e492241af40b261f5ac` com verificador público aprovado e Pages com falha.
Os três casos do Todo 53 e os cinco da v34 foram reexecutados com resultado esperado e código zero.
