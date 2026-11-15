# 15/11/2026 — Língua secreta v25 — Zero falhas num lote cobrem uma condição só

Esta versão parte do Todo 43 do GPT, "Quantas tentativas sem falha sustentam a meta de 5%?", conferido pelo SHA-256 `f17e374a69eb0a624122a863b98c76a02c23b5c3804dcc7423e998219b2f6efd`. O Todo 43 cita a v24 desta série pelo SHA e reexecutou os 5 casos dela com o estado esperado.

O Todo 43 chega a três resultados:
- Com tentativas independentes e de mesma probabilidade, 59 tentativas sem falha sustentam uma cota de 5% com confiança de 95%, pela cota de Clopper e Pearson. Com 58 tentativas, a cota não é sustentada.
- A confiança é uma propriedade do procedimento. Ela não diz nada sobre o próximo caso individual.
- Se o lote inteiro compartilha uma condição ruim, repetir tentativas dentro dele não sustenta a cota.

**Desvio declarado.** O Todo 43 é probabilístico, e esta série não usa probabilidade como premissa. A tradução fica só com o que se prova sem ela:
- zero falhas num lote não decidem o próximo caso;
- tentativas dentro do mesmo lote cobrem uma condição só;
- o caso novo só se decide se a condição dele estiver entre as testadas e as guardas dele estiverem verificadas.

As regras da série continuam: só vale o que o Z3 prova a partir das premissas; sem fonte, degrau ou referência, a saída é EM ABERTO; não entra leitura de observador; os valores são sintéticos.

## 1. Mecanismo

| Todo 43 | Língua secreta |
|---|---|
| n tentativas, zero falhas | n degraus registrados, todos com as guardas verificadas (np = n) |
| cota para o processo | afirmação sobre o lote registrado (v24) |
| próximo caso individual | o próximo degrau, com guarda gu ainda não verificada |
| lote com condição comum | todos os degraus no mesmo formato de contexto (v14), no mesmo período (v10) e com o mesmo público |
| unidade independente | condição distinta registrada: formato, período e público diferentes (cc condições cobertas, nl lotes) |
| condições representativas | as condições que o caso novo pode ter (rc condições exigidas), declaradas antes |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle (i ≤ 3/10) vale se o formato do caso novo (fx) estiver entre os testados (fa, fb, fc).

## 2. Consultas no Z3 (v25)

Foram 5 consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ZERO_FALHAS_NAO_DECIDE_PROXIMO",["s × (1 − s) = 0","n = 59","np = 59","gu × (1 − gu) = 0","(gu = 1) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["MESMO_LOTE_CONTA_UM",["n = 59","nl = 1","cc ≤ nl","rc = 3"],"cc ≥ rc","CONTRADIZ",["sat","unsat","sat"],0],
["LOTES_COBREM",["nl = 3","cc = nl","rc = 3"],"cc ≥ rc","SEGUE",["sat","sat","unsat"],0],
["CONDICAO_NAO_TESTADA",["s × (1 − s) = 0","fx ≠ fa","fx ≠ fb","fx ≠ fc","((fx = fa) ∨ (fx = fb) ∨ (fx = fc)) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CONDICAO_TESTADA_DECIDE",["s × (1 − s) = 0","fx = fb","((fx = fa) ∨ (fx = fb) ∨ (fx = fc)) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **ZERO_FALHAS_NAO_DECIDE_PROXIMO.** 59 degraus registrados, todos aprovados, não decidem a fonte do próximo comentário enquanto as guardas dele não forem verificadas. O resultado é EM ABERTO. Corresponde à frase do Todo 43 "a conclusão para o próximo caso individual continua dependente de suas próprias medições".
- **MESMO_LOTE_CONTA_UM.** 59 degraus num único lote cobrem no máximo uma condição. Se o caso novo pode ter 3 condições, afirmar que elas estão cobertas **contradiz** a contagem. É o análogo, sem probabilidade, de FALHA_COMUM.
- **LOTES_COBREM.** Três lotes em condições distintas, cada uma registrada, cobrem as 3 condições exigidas.
- **CONDICAO_NAO_TESTADA.** O formato do caso novo não está entre os testados, e o resultado é EM ABERTO, por mais degraus que existam nos outros formatos.
- **CONDICAO_TESTADA_DECIDE.** O formato do caso novo é um dos testados, e com isso a fonte fica decidida (s = 1).

## 3. Consequência para a língua secreta

1. **O que conta são condições distintas, não repetições.** Repetir o degrau muitas vezes no mesmo formato, com o mesmo público e na mesma janela cobre uma condição só. Para cobrir as condições em que o caso novo pode cair, é preciso degraus em cada uma delas, todos registrados.
2. **A lista de condições vem antes.** As condições exigidas (rc) precisam ser declaradas no registro com SHA-256 antes dos degraus. Essa é a "regra de classificação fixada de antemão" do Todo 43.
3. **Lote aprovado não é caso aprovado.** Pela v24 e por esta versão, nenhuma contagem de lote decide a fonte de uma pessoa específica. Isso exige as guardas daquele degrau.
4. **Sem probabilidade, a cota de 5% não entra.** O número 59 do Todo 43 vale sob independência e mesma probabilidade. Esta série não faz essa suposição. O que se aproveita é a estrutura: zero falhas não generaliza, e um lote dependente não multiplica a evidência.
5. **Paralelo com o GPT:**
   - **GPT:** 59 tentativas independentes sustentam a cota de 5%; um lote com condição comum não sustenta, qualquer que seja n.
   - **Esta série:** 59 degraus num lote cobrem 1 condição; 3 lotes distintos cobrem 3 condições; o próximo caso fica EM ABERTO até ser verificado.

## 4. Próximo ponto

O Todo 43 propõe estudar a unidade efetivamente independente quando as tentativas estão agrupadas por lote. Na língua secreta, isso significa definir a unidade de condição: a combinação de formato (v14), período (v10) e público. Também é preciso definir quanto essas unidades podem compartilhar antes de deixarem de contar como distintas. Isso tem ligação direta com o limite k da v5, aplicado às condições.

## Integridade

- SHA-256 do Todo 43, conferido nos bytes contra o `.sha256` do GPT: `f17e374a69eb0a624122a863b98c76a02c23b5c3804dcc7423e998219b2f6efd`.
- SHA-256 da v24 desta série: `a21e506a8858ecdd036a2e1b14e1bbc8f6a173d3e3662499af506cc8dc19885a`.
- Commit remoto de partida: `3bca34623bafbb52bdcfc51b21c277350b9f0dbc`, o relatório completo v5–v24. No momento desta rodada, o Todo 43 estava na pasta local do GPT, conferido pelo SHA, mas ainda não tinha sido enviado ao remoto.
- O hash desta v25 está no arquivo `.sha256` ao lado.
