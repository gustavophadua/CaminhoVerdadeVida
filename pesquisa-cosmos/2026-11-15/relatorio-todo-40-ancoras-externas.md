# Todo 40 — Duas âncoras externas podem limitar o intervalo cego

15/11/2026. O Todo 39 deixou em aberto a duração de um reinício sem medição da ponte. A Língua Secreta v21 propôs duas âncoras. A parábola da torre ([Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)) motiva verificar se o intervalo cego cabe no orçamento antes de concluir; não entra nas premissas.

O [guia JCGM 100:2008, §5.2](https://www.bipm.org/documents/20126/2071204/JCGM_100_2008_E.pdf) trata da correlação quando medições usam referências comuns. A conta aqui usa limites determinísticos, que não se deduzem de uma covariância ou de um desvio padrão. O trabalho experimental [A common-view disciplined oscillator (NIST)](https://www.nist.gov/publications/common-view-disciplined-oscillator) exemplifica a comparação por referência comum. Nenhum número desses trabalhos foi usado como calibração.

Sejam a e b as fronteiras físicas de parada e retorno; p e q os eventos testemunhados externamente. Todos os tempos e erros são expressos em s. Se p ≤ a ≤ b ≤ q, então g=b−a satisfaz 0 ≤ g ≤ q−p. Carimbos x=p+k+e e y=q+k+f compartilham deslocamento constante k, com resíduos e e f. Portanto q−p=(y−x)+e−f. Se y−x=6 ms e e−f≤1 ms, segue g≤7 ms, mesmo com k desconhecido. Isso basta para o prazo de 10 ms do Todo 39 quando os outros trechos totalizam no máximo 3 ms. A guarda de 1 ms é uma hipótese ilustrativa, não uma incerteza medida.

Se as marcas estiverem ambas dentro da parada, a≤p≤q≤b, 6 ms é limite inferior: por exemplo p=0, q=6 ms, a=0 e b=6 ou 8 ms preservam os dados e dão decisões opostas para g≤7 ms. Se forem externas mas tiverem offsets distintos sem guarda diferencial, a diferença de carimbos de 6 ms também não decide. A hipótese decisiva inclui a direção do vínculo causal: uma publicação tardia sobre o início não prova que seu carimbo tenha ocorrido antes da parada. Uma evidência isolada de existência dentro do intervalo também não delimita suas duas bordas.

Aplicação ao PMT/discriminador: adquirir a ordem de parada e o sinal de retorno no mesmo registrador independente, com escala e atraso diferencial calibrados. Atestar que o comando precedeu a parada e que o sinal de retorno só ocorreu após a retomada efetiva; senão, usar guardas adicionais ou manter EM ABERTO. Teste físico futuro: comparar a guarda com pulsos físicos independentes marcando as bordas durante um reinício. Não houve coleta, simulação estocástica nem medida de eficácia local.

T02–T03 motivam explicitar cobertura e T05 a verificação por registro independente; T01, T04 e T06–T13 não são premissas. Próximo teste: deduzir quanto de atraso de testemunho com sinal desconhecido pode ser tolerado sem perder o prazo.

## Verificação executada

Via stdin: `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Constantes numéricas de aridade zero, sem regras adicionais. Campos: ID, premissas, tese, estado, SAT das premissas/com tese/com negação, código de saída. Em OFFSET_DESCONHECIDO, k e l são offsets distintos.

```json
[
  [
    "LIMITE_EXTERNO",
    [
      "p ≤ a",
      "a ≤ b",
      "b ≤ q",
      "x = p + k + e",
      "y = q + k + f",
      "y − x = 3 / 500",
      "e − f ≤ 1 / 1000"
    ],
    "b − a ≤ 7 / 1000",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "MARCAS_INTERNAS",
    [
      "a ≤ p",
      "p ≤ q",
      "q ≤ b",
      "q − p = 3 / 500"
    ],
    "b − a ≤ 7 / 1000",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "OFFSET_DESCONHECIDO",
    [
      "p ≤ a",
      "a ≤ b",
      "b ≤ q",
      "x = p + k",
      "y = q + l",
      "y − x = 3 / 500"
    ],
    "b − a ≤ 7 / 1000",
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

Reexecutei os 4 casos do Todo 39 e os 6 da Língua Secreta v21, todos com estado esperado e código zero. SHA-256 e blobs remotos conferidos: Todo 39 `241dba3e947b2859d2fdb61e7d871020791b615b5a957fdddf021f8595e7c1a2`; Língua Secreta v21 `dd20a4c2029b42b42e5d372722af78707a08352d60ba3bc91ac8a4dd7ee199af`. Base `e34c46683a803d1a132eab0a1d785213d31795d9`, verificador público aprovado; Pages falhou nessa base. BOOK preservado.
