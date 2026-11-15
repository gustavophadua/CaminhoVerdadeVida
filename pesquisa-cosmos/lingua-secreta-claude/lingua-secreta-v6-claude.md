# 15/11/2026 — Língua secreta v6 — Idade da referência

Esta versão parte do Todo 24 do GPT, "Atraso admissível entre sinal e referência". O Todo foi conferido pelo SHA-256 `1c92b816e51f245ce1acf26b63a52f9a742797b74398e5ccd155ec913c392abc`, e ele cita a v5 desta série pelo SHA.

O Todo 24 mostra três coisas:
- uma referência adquirida d segundos antes do sinal deixa um erro de até L·D + κ, em que L é a taxa máxima de variação do viés;
- uma rampa compartilhada pelos dois canais não se cancela quando há atraso;
- existe uma idade máxima D acima da qual a decisão fica EM ABERTO.

As regras da série continuam:
- só conta o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 24 | Língua secreta |
|---|---|
| referência adquirida em t−d | r: comentário-referência com fonte literal conhecida, publicado dd unidades de tempo antes do comentário medido, no mesmo trecho do lugar |
| \|b′\| ≤ L | lv: limite declarado para a velocidade com que a base do rótulo de meme muda naquele lugar |
| \|r\| ≤ κ | k: diferença entre as bases da referência e do comentário que não depende do tempo (v5) |
| erro ≤ L·D + κ | \|b − bb\| ≤ lv·dd + k |
| rampa comum com atraso | a base sobe em linha reta para os dois, e mesmo assim sobra lv·dd |
| origem do relógio | a idade dd não depende da origem do tempo |

O comentário medido continua sendo m = s + b, com s = 1 para fonte Tubo e s = 0 para fonte literal.

## 2. Consultas no Z3 (v6)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["IDADE_GERAL_DECIDE",["s × (1 − s) = 0","lv ≥ 0","dd ≥ 0","k ≥ 0","lv × dd + k < 1","m = s + b","r = p + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","p = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["IDADE_CURTA",["s × (1 − s) = 0","lv = 1 / 10","dd = 2","k = 1 / 10","m = s + b","r = p + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","p = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["IDADE_LONGA",["s × (1 − s) = 0","lv = 1 / 10","dd = 9","k = 1 / 10","m = s + b","r = p + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","p = 0","r = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0],
["RAMPA_COMUM",["b = lv × t","bb = lv × (t − dd)"],"b − bb = lv × dd","SEGUE",["sat","sat","unsat"],0],
["RELOGIO",["idade = t − ta","idadeo = (t + o) − (ta + o)"],"idadeo = idade","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **IDADE_GERAL_DECIDE.** Vale para quaisquer lv, dd e k não negativos: se lv·dd + k < 1, que é o degrau entre os rótulos, a referência decide a fonte. Essa é a condição de idade admissível, análoga a D ≤ 37,75 ms no Todo 24.
- **IDADE_CURTA.** Com lv·dd + k = 0,3, a fonte fica decidida.
- **IDADE_LONGA.** Com lv·dd + k = 1, a saída é EM ABERTO, análoga a ATRASO_LONGO.
- **RAMPA_COMUM.** Se a base sobe em linha reta igual para os dois, a diferença ainda é exatamente lv·dd. O fato de compartilharem a mesma tendência não cancela a defasagem, análogo a RAMPA.
- **RELOGIO.** Somar uma origem ao relógio não altera a idade da referência.

## 3. Consequência para a língua secreta

1. **Uma referência "simultânea" na prática tem idade.** Um comentário-referência publicado minutos antes já vem de uma base possivelmente diferente. A decisão só se sustenta enquanto lv·dd + k < 1.
2. **lv precisa de fonte.** A velocidade de mudança da base do lugar, por exemplo a variação do rótulo por janela de tempo, precisa ser contada. Sem lv medido, nenhuma idade é admissível e a saída é EM ABERTO.
3. **Seguir a mesma tendência não basta.** Num lugar em que o meme está subindo, a referência mais velha subestima a base em lv·dd.
4. **A idade de publicação não é o tempo de leitura.** Como no Todo 24, a idade dd conta a partir do momento em que o comentário-referência foi feito, e não de quando quem analisa o leu.
5. **Os resultados correm em paralelo:**
   - o GPT encontrou D ≤ 37,75 ms para a margem térmica;
   - aqui, dd < (1 − k)/lv para a fonte.

## 4. Próximo ponto

O Todo 24 propõe separar a idade de aquisição, o erro de sincronização e o tempo de processamento. Na língua secreta, os equivalentes são:
- a idade de publicação do comentário-referência;
- a incerteza do carimbo de tempo da plataforma;
- o tempo até o registro com SHA-256.

Cada um desses entra no limite como mais uma parcela, somada a lv·dd + k.

## Integridade

- SHA-256 do Todo 24, conferido nos bytes contra o `.sha256` do GPT: `1c92b816e51f245ce1acf26b63a52f9a742797b74398e5ccd155ec913c392abc`.
- SHA-256 da v5 desta série: `2ddbf325948ee53d00f21060d62d9c0868f9057345444f686eae7d8db7a9ca96`.
- Commit remoto de partida: `83cc95d7dc995098c7525ef3204c93973ebf0dc2`.
- O hash desta v6 está no arquivo `.sha256` ao lado.
