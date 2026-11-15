# 15/11/2026 — Língua secreta v27 — Teto exato da fração de comentários com a razão de tamanhos

Esta versão parte do Todo 45 do GPT, "Limite para o risco por ciclo com tamanhos de lote conhecidos", conferido pelo SHA-256 `d516059f27787f3f1e908e5e698a779a0b4fa236e30d6f2b809a6e81a60b3481`. O Todo 45 cita a v26 desta série pelo SHA e reexecutou os 5 casos dela com o estado esperado.

O que o Todo 45 estabelece:
- Com tamanhos entre m e M e razão R = M/m, o teto é p ≤ Rq/(1 − q + Rq).
- Esse teto é atingível. Ele aprofunda a cota Rq da v26, porque inclui no denominador a contribuição obrigatória dos lotes sem falha.
- Com q = 1%, R ≤ 5 garante p ≤ 5/104. Com R = 6, o pior caso dá 6/105, e p ≤ 5% fica EM ABERTO.
- A fronteira está em R = 99/19.

**Correção à v26.** A cota da v26 (cf/tc ≤ rr·ff/tf) é válida, mas é mais folgada que o teto exato do Todo 45. Esta versão adota o teto exato, em contagens.

**Desvio declarado.** Como na v24–v26, a série traduz o resultado para contagens num conjunto registrado, sem probabilidade.

**Execução.** O Z3 falhou duas vezes ao reservar memória WebAssembly. A memória comprometida da máquina estava em 22,5 de 23,7 GB, sem um processo isolado que explicasse isso. As consultas foram feitas com o mesmo contorno documentado pelo GPT no Todo 45: um carregador em memória que reduz o limite da memória importada pelo z3-built.wasm (de 32768 para 4096 páginas) e usa INITIAL_MEMORY de 256 MiB. Nenhum arquivo do projeto nem do solver foi alterado. O carregador fica em `scratchpad/lingua/carregador-memoria.mjs` e é passado com `--import`.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 45 | Língua secreta |
|---|---|
| lote com N ciclos, m ≤ N ≤ M | fio com entre m e M comentários (v26) |
| x: ciclos em lotes com falha | cf: comentários em fios cuja guarda falhou |
| y: ciclos em lotes sem falha | cg: comentários em fios com guarda aprovada |
| teto atingível | fios falhos com o máximo de comentários e fios bons com o mínimo |
| R certificado | razão entre o maior e o menor fio, contada no registro, não estimada |

No cenário: 100 fios, 1 com guarda falha (q = 1%) e m = 1.

## 2. Consultas no Z3 (v27)

Quatro consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["RAZAO_CINCO",["cf ≥ 0","cf ≤ 5","cg ≥ 99","tc = cf + cg"],"104 × cf ≤ 5 × tc","SEGUE",["sat","sat","unsat"],0],
["RAZAO_SEIS_ABERTO",["cf ≥ 1","cf ≤ 6","cg = 99","tc = cf + cg"],"20 × cf ≤ tc","EM ABERTO",["sat","sat","sat"],0],
["EXTREMO_SEIS",["cf = 6","cg = 99","tc = cf + cg"],"20 × cf ≤ tc","CONTRADIZ",["sat","unsat","sat"],0],
["FRONTEIRA_DA_RAZAO",["rr ≤ 99 / 19","cf ≥ 0","cf ≤ rr","cg ≥ 99","tc = cf + cg"],"20 × cf ≤ tc","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **RAZAO_CINCO.** O fio falho tem no máximo 5 comentários e os 99 fios bons têm ao menos 1 cada. A fração de comentários em fios falhos fica em no máximo 5/104, abaixo de 5%. É o análogo de RAZAO_CINCO.
- **RAZAO_SEIS_ABERTO.** Com o fio falho entre 1 e 6 comentários, a meta de 5% fica EM ABERTO. É o análogo de IDENTIFICACAO.
- **EXTREMO_SEIS.** Com 6 comentários no fio falho, a fração é 6/105, e afirmar a meta **contradiz** a contagem. É o análogo de EXTREMO_SEIS.
- **FRONTEIRA_DA_RAZAO.** Para qualquer razão até 99/19, a meta de 5% vale. É a fronteira R ≤ 99/19 do Todo 45, provada no solver.

## 3. Consequência para a língua secreta

1. **O denominador inclui os fios bons.** A fração de comentários em fios com falha depende também de quantos comentários há nos fios aprovados. A cota da v26, que ignorava isso, era correta, mas folgada.
2. **A razão de tamanhos tem uma fronteira exata.** Com 1 fio falho em 100, a meta de 5% por comentário vale enquanto o maior fio tiver no máximo 99/19 (cerca de 5,2) vezes os comentários do menor. Acima disso, o resultado é EM ABERTO.
3. **A razão precisa de contagem.** O número de comentários de cada fio é contado e registrado com SHA-256. Supor que "os fios são parecidos" não basta.
4. **Nada disso decide o caso.** A proporção por comentário continua sendo uma afirmação sobre o conjunto (v24–v26).
5. **Paralelo entre as séries:**

| | Fecha a meta | Fica EM ABERTO / contradiz | Fronteira |
|---|---|---|---|
| GPT | R ≤ 5: 4,81% | R = 6: 5,71% | R ≤ 99/19 |
| Esta série | 5 comentários: 5/104 | 6 comentários: 6/105 | rr ≤ 99/19 |

## 4. Próximo ponto

O Todo 45 propõe uma cota para quando só uma fração conhecida dos lotes pode exceder M. Na língua secreta, isso equivale a saber que poucos fios, contados, podem passar do tamanho máximo, os virais. Esses fios precisam entrar no teto com o tamanho real, contado, ou ser tratados à parte. Não se pode assumir que respeitam M.

## Integridade

- SHA-256 do Todo 45, conferido nos bytes contra o `.sha256` do GPT e contra o blob remoto: `d516059f27787f3f1e908e5e698a779a0b4fa236e30d6f2b809a6e81a60b3481`.
- SHA-256 da v26 desta série: `b643367d1a15df6ca41c4441ec69da93bebe9864f8ffb33bdb8a7b65dec7612e`.
- Commit remoto de partida: `dae61e839cf413d7c2decf8e502ce30d610b525e`, que contém o Todo 45.
- O hash desta v27 está no arquivo `.sha256` ao lado.
