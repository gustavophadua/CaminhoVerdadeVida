# 15/11/2026 — Língua secreta v24 — Cobertura do lote não decide o caso

Esta versão parte do Todo 42 do GPT, "Cobertura conjunta das duas bordas", conferido pelo SHA-256 `60e48b192dbd2250c8b1ac3bf486419ae5b2db614feab0654db4033fb690140b`. O Todo 42 segue o próximo ponto da v23, cita a v23 pelo SHA e reexecutou os 5 casos dela com o estado esperado.

O Todo 42 mostra três coisas sobre as duas bordas:
- Com falha marginal de no máximo α₁ e α₂, a cobertura conjunta é de pelo menos 1 − α₁ − α₂, sem supor independência.
- Duas marginais de 95% garantem 90%, mas deixam 95% EM ABERTO. Falhas disjuntas contradizem os 95%.
- Duas marginais de 97,5% garantem 95%.

**Desvio declarado desta série.** O Todo 42 é probabilístico, e a regra desta série proíbe probabilidade como premissa. A tradução usa **contagens num lote finito e registrado**, ou seja, degraus já feitos, cada um com SHA-256. A mesma álgebra (massas não negativas que somam um total fixo) vale para contagens sem nenhuma hipótese de probabilidade. Esta rodada acrescenta uma consulta que o Todo 42 não tem: **a cobertura de um lote não decide um caso individual.**

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 42 | Língua secreta |
|---|---|
| massas a, b, c, d (nenhuma falha, só início, só fim, ambas) | contagens na, nb, nc, nd num lote de 20 degraus registrados |
| P(Fᵢ) ≤ αᵢ | no máximo 1 degrau do lote falhou na âncora de início, e no máximo 1 falhou na de fim (v22, v23) |
| cobertura conjunta ≥ 1 − α₁ − α₂ | pelo menos 20 − 1 − 1 = 18 degraus tiveram as duas âncoras dentro da guarda |
| falhas disjuntas | os dois degraus com falha são diferentes |
| percentil não garante o regime de uso | a contagem de um lote passado não se transfere sozinha para o próximo degrau (v13, v14) |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle (i ≤ 3/10) só vale se as guardas daquele degrau passaram (gu = 1).

## 2. Consultas no Z3 (v24)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["CONTAGEM_UNIAO",["na ≥ 0","nb ≥ 0","nc ≥ 0","nd ≥ 0","na + nb + nc + nd = 20","nb + nd ≤ 1","nc + nd ≤ 1"],"na ≥ 18","SEGUE",["sat","sat","unsat"],0],
["CONJUNTA_ABERTA",["na ≥ 0","nb ≥ 0","nc ≥ 0","nd ≥ 0","na + nb + nc + nd = 20","nb + nd = 1","nc + nd = 1"],"na ≥ 19","EM ABERTO",["sat","sat","sat"],0],
["FALHAS_DISJUNTAS",["na ≥ 0","nb ≥ 0","nc ≥ 0","nd ≥ 0","na + nb + nc + nd = 20","nb = 1","nc = 1","nd = 0"],"na ≥ 19","CONTRADIZ",["sat","unsat","sat"],0],
["CASO_INDIVIDUAL_ABERTO",["s × (1 − s) = 0","gu × (1 − gu) = 0","na ≥ 18","(gu = 1) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CASO_INDIVIDUAL_VERIFICADO",["s × (1 − s) = 0","gu = 1","(gu = 1) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **CONTAGEM_UNIAO.** Num lote de 20, com no máximo uma falha em cada borda, pelo menos 18 degraus tiveram as duas guardas dentro do limite, sem nenhuma hipótese sobre como as falhas se distribuem. É o análogo de MARGINAIS_95, em contagens.
- **CONJUNTA_ABERTA.** Com exatamente uma falha em cada borda, a afirmação de que 19 degraus passaram fica EM ABERTO, porque depende de as falhas terem caído no mesmo degrau. É o análogo de CONJUNTA_95_ABERTA.
- **FALHAS_DISJUNTAS.** Se as falhas caíram em degraus diferentes, só 18 passaram, e afirmar 19 **contradiz** a contagem. É o análogo de FALHAS_DISJUNTAS.
- **CASO_INDIVIDUAL_ABERTO.** Saber que pelo menos 18 de 20 degraus passaram não diz se *este* degrau passou. A fonte deste comentário fica EM ABERTO. A cobertura do lote não chega ao indivíduo.
- **CASO_INDIVIDUAL_VERIFICADO.** Com as guardas deste degrau verificadas (gu = 1), a fonte fica decidida (s = 1).

## 3. Consequência para a língua secreta

1. **Lote e caso são perguntas diferentes.** "Pelo menos 18 de 20 degraus tiveram as âncoras dentro da guarda" é uma afirmação sobre o lote e pode ser provada por contagem. Ela não autoriza dizer, para uma pessoa específica, que a fonte é Tubo ou literal. Isso exige as guardas daquele degrau verificadas. É o 0 confident wrong aplicado à cobertura.
2. **Não somar falhas como se fossem independentes.** Sem saber se as falhas das duas bordas caem nos mesmos degraus, vale a soma (o pior caso disjunto). Supor que as falhas coincidem seria otimismo sem fonte.
3. **Contagem de lote passado não é limite do próximo.** Como no Todo 42, um percentil ou uma contagem amostral precisa de garantia própria para valer no regime de uso. Na série, isso quer dizer: mesmo formato (v14), mesmo período (v10) e controles válidos (v12, v13).
4. **Sem probabilidade, sem perda.** Toda a álgebra do Todo 42 se transfere para contagens com fonte. O que não se transfere é a leitura "a chance de este caso estar certo é 90%". A série não faz essa leitura: o resultado de cada caso é SEGUE, CONTRADIZ ou EM ABERTO.
5. **Paralelo com o GPT:**
   - **Todo 42:** 95% + 95% garantem 90%; os 95% conjuntos ficam EM ABERTO; com 97,5% + 97,5% se chega a 95%.
   - **Esta série:** 1 + 1 falhas em 20 garantem 18; 19 fica EM ABERTO; o caso individual fica EM ABERTO sem a verificação dele mesmo.

## 4. Próximo ponto

O Todo 42 propõe calcular quantas tentativas de validação com zero falhas sustentam uma cota unilateral do risco. Na série, isso entra só como **cobertura declarada do lote**, nunca como prova de um caso. A pergunta equivalente sem probabilidade é: quantos degraus registrados, todos com as guardas verificadas, são necessários antes de transferir os controles para um novo formato com o g da v13? A resposta depende de uma regra declarada com fonte, não de uma taxa estimada.

## Integridade

- SHA-256 do Todo 42, conferido nos bytes contra o `.sha256` do GPT: `60e48b192dbd2250c8b1ac3bf486419ae5b2db614feab0654db4033fb690140b`.
- SHA-256 da v23 desta série: `82fc9c2c2f7b88d2246d366c410930b420c3069c0448b0bb194f3ef0ef80b9b5`.
- Commit remoto de partida: `4e979547eb9c555c9c43c2114c5b9244fa7c951f`.
- O hash desta v24 está no arquivo `.sha256` ao lado.
