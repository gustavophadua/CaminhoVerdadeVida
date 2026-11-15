# 15/11/2026 — Língua secreta v15 — Formato que muda no meio do degrau

Parte do Todo 33 do GPT ("Mudança de rota dentro da aquisição"), conferido pelo SHA-256 `4bbf3aa565eabe6a88c362437a78031ace857791a9d38a9baa82b0aade967bd6`. O Todo 33 cita a v14 desta série pelo SHA.

O Todo 33 mostra que ler o mesmo regime no início e no fim da troca não exclui A→B→A no meio, então a guarda fica EM ABERTO. Um contador de geração não decrescente, com G(s) = G(f), fecha o caso, desde que cumpra três condições:

- não pode reiniciar nem transbordar;
- precisa estar associado à troca exata;
- precisa registrar todas as mudanças relevantes.

Um contador de rota sozinho não cobre fila nem classe. A confirmação da cobertura também tem custo (w) e precisa caber no prazo (j + p + w ≤ a).

Regras da série, que continuam valendo:

- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não há leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 33 | Língua secreta |
|---|---|
| regime lido em s e em f | formato do contexto lido no início (fa) e no fim (fb) da conversa do degrau |
| A→B→A escondido | a regra ou o público muda no meio da conversa e volta antes do fim |
| contador de geração G | gerações registradas do formato: ga no início, gm no meio, gb no fim, gc na calibração dos controles. Exemplo: a versão da regra da plataforma, se houver registro com fonte |
| contador que não cobre fila/classe | um contador de regra que não registra mudança de público (pm ≠ pc) |
| j + p + w ≤ a | carimbo (j), registro (p) e confirmação de cobertura (w) cabem antes da decisão |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). Controle de ida da v12: i ≤ 3/10, válido só no formato da calibração.

## 2. Consultas no Z3 (v15)

Foram 7 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["EXTREMOS_IGUAIS",["fa = fb"],"fa = fm","EM ABERTO",["sat","sat","sat"],0],
["CONTADOR_FECHA",["ga ≤ gm","gm ≤ gb","ga = gb"],"ga = gm","SEGUE",["sat","sat","unsat"],0],
["CONTADOR_DECIDE",["s × (1 − s) = 0","ga ≤ gm","gm ≤ gb","ga = gb","gc = ga","(gm = gc) ⟹ (i ≤ 3 / 10)","i ≥ 0","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["SEM_CONTADOR",["s × (1 − s) = 0","fa = fb","fc = fa","(fm = fc) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CONTADOR_INCOMPLETO",["s × (1 − s) = 0","gm = gc","((gm = gc) ∧ (pm = pc)) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CONSOLIDA_A_TEMPO",["a = 1","j ≤ 1 / 5","p ≤ 1 / 2","w ≤ 3 / 10"],"j + p + w ≤ a","SEGUE",["sat","sat","unsat"],0],
["CONSOLIDA_TARDE",["a = 1","j = 1 / 5","p = 1 / 2","w = 1 / 2"],"j + p + w ≤ a","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **EXTREMOS_IGUAIS.** Mesmo formato no início e no fim não fixa o formato no meio: EM ABERTO. É o análogo de ROTA_IGUAL.
- **CONTADOR_FECHA.** Com o contador não decrescente e igual nos extremos, o valor do meio é o mesmo. É o análogo de CONTADOR.
- **CONTADOR_DECIDE.** Se a geração da calibração for igual à do início, o controle de ida vale durante toda a conversa, e a troca observada decide a fonte (s = 1).
- **SEM_CONTADOR.** As mesmas premissas só com os extremos iguais, sem contador: o controle pode não valer no meio, e o resultado é EM ABERTO.
- **CONTADOR_INCOMPLETO.** O contador cobre a regra (gm = gc), mas não o público (pm). A guarda exige os dois, e o resultado é EM ABERTO. É o análogo de "um contador de rota não cobre fila nem classe".
- **CONSOLIDA_A_TEMPO / CONSOLIDA_TARDE.** A confirmação da cobertura cabe no prazo com w ≤ 3/10. Com w = 1/2 e os demais no pior caso, **contradiz** a entrega. É o análogo de ENTREGA / SEM_FOLGA: o contador pode estar correto e mesmo assim chegar tarde.

## 3. Consequência para a língua secreta

1. **Os extremos não bastam.** Ver o mesmo formato antes e depois do degrau não prova que ele ficou igual durante a conversa. Uma mudança de regra ou de público que volta antes do fim passa despercebida.
2. **É preciso um contador de gerações do formato.** Ele precisa de três propriedades:
   - não decrescente e sem reinício;
   - ligado à conversa exata;
   - cobrindo tudo o que o controle exige, ou seja, regra, público e forma da pergunta.
   
   Se o contador cobre só a regra, a decisão fica EM ABERTO.
3. **A confirmação da cobertura entra no orçamento.** Confirmar que os registros cobrem toda a conversa custa tempo (w). Se não couber antes do momento da decisão, o resultado é EM ABERTO e qualquer ação que dependa dele fica suspensa.
4. **Sem contador com fonte, nada muda em relação à v14.** A guarda fica suspensa e o resultado é EM ABERTO, que é a resposta declarada no registro.
5. **Paralelo com o GPT:**
   - GPT: w ≤ 0,25 ms cabe; w = 0,50 ms perde o prazo por 0,25 ms.
   - Aqui: w ≤ 3/10 cabe; w = 1/2 passa do prazo.

## 4. Próximo ponto

O Todo 33 propõe tratar perdas no registro e uma confirmação que declare quais eventos já estão cobertos. Na língua secreta, isso equivale a um contador de formato com lacunas: um evento de mudança de regra ou de público que não chegou ao registro. A confirmação precisa listar o que cobre. O que ela não declarar coberto fica EM ABERTO.

## Integridade

- SHA-256 do Todo 33, conferido nos bytes contra o `.sha256` do GPT: `4bbf3aa565eabe6a88c362437a78031ace857791a9d38a9baa82b0aade967bd6`.
- SHA-256 da v14 desta série: `e45f7e64788d74c221e15314866711f4ddace93d238ebc9568c12d1f5ee0812a`.
- Commit remoto de partida: `12232dc0236bf5a3e3f5aca5a6913c6eee84d857`.
- O hash desta v15 está no arquivo `.sha256` ao lado.
