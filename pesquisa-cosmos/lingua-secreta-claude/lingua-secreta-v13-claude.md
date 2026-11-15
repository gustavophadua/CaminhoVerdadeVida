# 15/11/2026 — Língua secreta v13 — Controles levados para outro contexto

Esta versão parte do Todo 31 do GPT, "Quando a calibração vale em outra rota", conferido pelo SHA-256 `9ff068095014456b0f45bf4375eda70db0ea79ee5ee474b59e73a17be0a7851c`. O Todo 31 cita a v12 desta série pelo SHA.

O Todo 31 mostra três coisas:
- uma calibração feita numa rota só vale em outra rota se houver um limite g, externo e explícito, para o quanto cada atraso pode mudar;
- o intervalo de cada sentido se amplia em g, e a interseção continua sendo a regra de decisão;
- repetir o mesmo total de ida e volta não valida a calibração antiga, como mostra o contraexemplo ROTA_MUDOU.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 31 | Língua secreta |
|---|---|
| calibração de ida e volta numa rota | controles de ida e de volta (v12) medidos num formato de contexto seguro |
| nova rota ou carga | outro formato de contexto seguro, ou o mesmo formato com outro público ou volume |
| ampliação g em cada extremo | limite externo g para o quanto o efeito do contexto (i) e o da volta (v) podem mudar ao trocar de formato |
| interseção ampliada | a fonte precisa caber nos dois intervalos ampliados |
| mesmo total de ida e volta | a mesma troca observada (x = 1, y = 0) não prova que o efeito do contexto continuou o mesmo |

A troca observada na entrada é x = s + i, e na volta é y = v − s, com s = 1 para Tubo e s = 0 para literal.

## 2. Consultas no Z3 (v13)

Foram 5 consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["TRANSFERIDA_DECIDE",["s × (1 − s) = 0","g = 1 / 10","x = s + i","y = v − s","i ≥ 0","i ≤ 3 / 10 + g","v ≥ 7 / 10 − g","v ≤ 1 + g","x = 1","y = 0"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["TRANSFERIDA_LARGA",["s × (1 − s) = 0","g = 7 / 10","x = s + i","y = v − s","i ≥ 0","i ≤ 3 / 10 + g","v ≥ 7 / 10 − g","v ≤ 1 + g","x = 1","y = 0"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["LIMITE_DE_G",["g ≥ 0"],"((3 / 10 + g < 1) ∧ (7 / 10 − g > 0)) ⟺ (g < 7 / 10)","SEGUE",["sat","sat","unsat"],0],
["ROTA_MUDOU",["s × (1 − s) = 0","i = 1","x = s + i","x = 1"],"s = 1","CONTRADIZ",["sat","unsat","sat"],0],
["ORIGEM",["x = ta − tb","xo = (ta + o) − (tb + o)"],"xo = x","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **TRANSFERIDA_DECIDE.** Os controles da v12 (i ≤ 3/10 e v ≥ 7/10) são levados para o formato novo com g = 1/10. A interseção ampliada ainda contém um só valor binário, e a fonte fica decidida (s = 1). É o análogo de GUARDA_TRANSFERIDA.
- **TRANSFERIDA_LARGA.** Com g = 7/10, os intervalos ampliados admitem os dois valores, e o resultado é EM ABERTO.
- **LIMITE_DE_G.** Os controles transferidos decidem exatamente quando g < 7/10. Esse é o orçamento de mudança de contexto que a calibração aguenta.
- **ROTA_MUDOU.** No formato novo, o próprio contexto pode levar uma pessoa de fonte literal ao rótulo direto (i = 1). Ela produz a mesma troca x = 1. Nesse caso, afirmar s = 1 **contradiz** os fatos. Usar os controles antigos sem g daria a resposta errada. É o análogo de ROTA_MUDOU.
- **ORIGEM.** Uma origem comum não muda a troca observada.

## 3. Consequência para a língua secreta

1. **Um controle vale para um formato de contexto.** Os controles de ida e de volta da v12 foram medidos num formato de contexto seguro. Em outro formato, como outra plataforma, outra pergunta ou outro público, eles só valem com um g declarado com fonte.
2. **g não sai da repetição.** Ver a mesma troca (x = 1, y = 0) no formato novo não prova que o efeito do contexto continuou o mesmo. O ROTA_MUDOU mostra que um efeito de contexto novo, sozinho, reproduz a troca. O g precisa vir de medida externa, por exemplo um controle literal passando também pelo formato novo.
3. **O orçamento é finito.** Com os controles da v12, a decisão aguenta g < 7/10. Acima disso, o resultado é EM ABERTO, e é preciso recalibrar os controles no formato novo.
4. **Sem g, o resultado é EM ABERTO, e não "vale o antigo".** Essa é a regra do 0 confident wrong: um controle transferido sem limite pode produzir uma afirmação falsa com cara de prova (ROTA_MUDOU).
5. **Paralelo com o GPT:**
   - no Todo 31, com g = 0,04 ms a idade admissível cai para cerca de 3,17 s;
   - aqui, com g = 1/10 a decisão se mantém, e com g ≥ 7/10 ela se perde.

## 4. Próximo ponto

O Todo 31 propõe um critério de invalidação quando a rota muda sem aviso, e medir o tempo de recalibração. Na língua secreta, o equivalente é um critério para detectar que o formato do contexto mudou. Exemplos: mudança de regra da plataforma, novo público, novo formato de pergunta. Ao detectar a mudança, a decisão volta a EM ABERTO até que os controles sejam refeitos. O tempo de recalibração entra na validade das recontagens (v10).

## Integridade

- SHA-256 do Todo 31, conferido nos bytes contra o `.sha256` do GPT: `9ff068095014456b0f45bf4375eda70db0ea79ee5ee474b59e73a17be0a7851c`.
- SHA-256 da v12 desta série: `80abe30f46afe3e152948a9b5124993c8699ea75132be726ed86c742bb30c534`.
- Commit remoto de partida: `34eefde3158f537b20f6a2bae238164f22bc6048`. Na hora desta rodada, o Todo 31 estava na pasta local do GPT, conferido pelo SHA, mas ainda não tinha sido enviado ao remoto.
- O hash desta v13 está no arquivo `.sha256` ao lado.
