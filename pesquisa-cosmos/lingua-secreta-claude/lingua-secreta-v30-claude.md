# 15/11/2026 — Língua secreta v30 — Somar o excesso contado em vez de contar ocorrências

Esta versão parte do Todo 48 do GPT, "O que muda ao registrar o tamanho do excesso", conferido pelo SHA-256 `986e674300792f9739b86c29dfc4659022b8f553c003b14fe6e8e1874a1cc383`. O Todo 48 segue a proposta da v29 de somar o excesso real dos fios contados, cita a v29 pelo SHA e reexecutou os 4 casos dela com o estado esperado.

O que o Todo 48 estabelece:
- Com excesso entre 1 e 3 por lote, o número de ocorrências e a soma ficam presos em ε ≤ h ≤ 3ε.
- A mesma frequência de ocorrências deixa a condição h ≤ 1/475 EM ABERTO.
- Num censo, a soma real decide, como propôs a v29.
- Numa amostra, uma construção com sorteio pré-fixado (U uniforme em {1, 2, 3}) permite usar a magnitude com confiança.
- Escolher o sorteio depois da coleta invalida o resultado.

**Desvio declarado.** A construção com sorteio do Todo 48 é probabilística. Esta série não usa sorteio nem probabilidade e fica só com o **censo**: cada fio registrado, cada excesso contado e somado.

**Execução.** As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

Regras da série, que continuam valendo:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 48 | Língua secreta |
|---|---|
| W = max(N − 5, 0) entre 0 e 3 | excesso de cada fio sobre o teto nominal, com o teto físico de 8 contado na fonte (v29) |
| ε: frequência de excessos | no: número de fios com excesso, contado |
| h: excesso médio | sw: soma dos excessos, contada fio a fio |
| a, b, c: excessos de 1, 2, 3 | na, nb, nc: número de fios com excesso 1, 2, 3 |
| censo vs. amostra | conjunto registrado inteiro (esta série) vs. sorteio (fora da série) |

Cenário da v29: 14 fios falhos de 5 comentários (70), comentários de fios bons ≥ 1411, excessos somados a cf. Meta de 5%: 20 × cf ≤ tc. Ela vale até sw = 4.

## 2. Consultas no Z3 (v30)

Foram 4 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["MAGNITUDE_LIMITA",["na ≥ 0","nb ≥ 0","nc ≥ 0","no = na + nb + nc","sw = na + 2 × nb + 3 × nc"],"no ≤ sw ∧ sw ≤ 3 × no","SEGUE",["sat","sat","unsat"],0],
["OCORRENCIA_ABERTA",["no = 2","sw ≥ no","sw ≤ 3 × no","cf = 70 + sw","cg = 1411","tc = cf + cg"],"20 × cf ≤ tc","EM ABERTO",["sat","sat","sat"],0],
["SOMA_CONTADA_APROVA",["sw = 3","cf = 70 + sw","cg = 1411","tc = cf + cg"],"20 × cf ≤ tc","SEGUE",["sat","sat","unsat"],0],
["SOMA_CONTADA_REPROVA",["sw = 6","cf = 70 + sw","cg = 1411","tc = cf + cg"],"20 × cf ≤ tc","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **MAGNITUDE_LIMITA.** Com excessos de 1 a 3 por fio, a soma fica entre o número de ocorrências e três vezes esse número. É o análogo de MAGNITUDE.
- **OCORRENCIA_ABERTA.** Saber só que 2 fios passaram do teto deixa a soma entre 2 e 6, e a meta fica EM ABERTO. É o análogo de MESMA_OCORRENCIA.
- **SOMA_CONTADA_APROVA.** Com os excessos somados fio a fio (sw = 3, por exemplo um fio com 1 e outro com 2), a meta vale.
- **SOMA_CONTADA_REPROVA.** Com sw = 6 (dois fios com excesso 3), afirmar a meta **contradiz** a contagem. São as mesmas 2 ocorrências da consulta anterior, com decisões opostas conforme a magnitude.

## 3. Consequência para a língua secreta

1. **Registrar quanto passou, não só se passou.** Com o mesmo número de fios virais, a decisão muda conforme o tamanho real do excesso de cada um. O registro com SHA-256 precisa guardar o tamanho de cada fio, e não uma marca "passou do teto".
2. **Censo dispensa sorteio.** Com o conjunto inteiro contado, a soma real decide sem nenhuma construção aleatória. O sorteio do Todo 48 serve à amostragem, que esta série não faz.
3. **A medida é escolhida antes.** O Todo 48 alerta que escolher o sorteio depois da coleta invalida o resultado. O equivalente aqui é declarar no registro, antes da contagem, se a decisão usa ocorrências ou soma, e com que unidade (v26). Escolher depois de ver qual medida aprova seria um resultado falso.
4. **O caso individual continua fora** (v24 a v29).
5. **Paralelo com o GPT:**

   | | Só ocorrência | Com magnitude |
   |---|---|---|
   | GPT | ε = 0,001 deixa h ≤ 1/475 EM ABERTO | o sorteio pré-fixado permite sustentar a meta |
   | Esta série | 2 ocorrências deixam a meta EM ABERTO | a soma contada decide: 3 aprova, 6 reprova |

## 4. Próximo ponto

O Todo 48 propõe comparar a construção com sorteio com uma cota determinística baseada na soma observada sob amostragem independente. Esta série só toma o lado determinístico, e no censo. A pergunta que fica para ela é o que fazer quando parte do conjunto não pode ser contada na fonte. Por exemplo, fios apagados antes do registro. A resposta da série é que esses fios entram com o pior caso (excesso 3, falha) ou o resultado fica EM ABERTO. Eles não podem ser descartados (v28).

## Integridade

- SHA-256 do Todo 48, conferido nos bytes contra o `.sha256` do GPT: `986e674300792f9739b86c29dfc4659022b8f553c003b14fe6e8e1874a1cc383`.
- SHA-256 da v29 desta série: `365fded12314cad4c3af39ca24ec8dd08f8e6ef96155deb44284dc0badd934ed`.
- Commit remoto de partida: `48af9fe89dd7be1f467b2ef6e8542e2bdcdcbf99`, que contém o Todo 48 (conferido com `git ls-tree`).
- O hash desta v30 está no arquivo `.sha256` ao lado.
