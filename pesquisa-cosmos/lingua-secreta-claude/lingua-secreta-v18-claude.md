# 15/11/2026 — Língua secreta v18 — Mesmo relógio para o fim da conversa e o fechamento

Esta versão parte do Todo 36 do GPT, "Quando o erro comum de relógio cancela", conferido pelo SHA-256 `b5d41184c96a86c66b123b1496e6c3f14ba4ddcc5448893e48ce840d4278c822`. O Todo 36 cita a v17 desta série pelo SHA e reexecutou seus 6 casos com o estado previsto e código zero.

O Todo 36 estabelece três resultados:
- **Relógio comum.** Com x = a + b + e e y = f + b + d, o offset b cancela, e a − f = (x − y) − (e − d). Uma guarda unilateral e − d ≤ B garante a ordem quando x − y ≥ B.
- **Offsets distintos.** Sem um limite para a diferença entre os offsets, a ordem fica EM ABERTO.
- **Deriva entre eventos.** Uma deriva r entre os dois eventos pode inverter a ordem.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 36 | Língua secreta |
|---|---|
| carimbo do fechamento x | xc: carimbo do fechamento do registro de mudanças de formato (v16, v17) |
| carimbo do fim da aquisição y | yf: carimbo do fim da conversa do degrau |
| offset comum b | bo: offset do relógio da plataforma, quando ela carimba os dois eventos |
| offsets distintos b, g | o fechamento foi carimbado pela máquina do commit e o fim da conversa pela plataforma (v10) |
| resíduos e, d com e − d ≤ B | erro diferencial entre os dois carimbos do mesmo relógio |
| deriva r entre eventos | o offset do relógio da plataforma muda entre o fim da conversa e o fechamento |
| mesmo pulso nos dois canais | um comentário-referência carimbado pelo mesmo relógio que o registro de mudanças, que mede o erro diferencial |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). Controle de ida da v12: i ≤ 3/10, válido só se o fechamento vier depois do fim da conversa (ac ≥ af).

## 2. Consultas no Z3 (v18)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["MESMO_RELOGIO",["xc = ac + bo + ec","yf = af + bo + df","ec − df ≤ 1 / 10","xc − yf = 3 / 10"],"ac − af ≥ 1 / 5","SEGUE",["sat","sat","unsat"],0],
["RELOGIOS_DISTINTOS",["xc = ac + bo","yf = af + go","xc − yf = 3 / 10"],"ac ≥ af","EM ABERTO",["sat","sat","sat"],0],
["DERIVA_ENTRE_EVENTOS",["xc − yf = 3 / 10","xc − yf = ac − af + rr + ec","rr = 1 / 4","ec = 1 / 10"],"ac ≥ af","CONTRADIZ",["sat","unsat","sat"],0],
["DECIDE_MESMO_RELOGIO",["s × (1 − s) = 0","xc = ac + bo + ec","yf = af + bo + df","ec − df ≤ 1 / 10","xc − yf = 3 / 10","(ac ≥ af) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["DISTINTOS_NAO_DECIDE",["s × (1 − s) = 0","xc = ac + bo","yf = af + go","xc − yf = 3 / 10","(ac ≥ af) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **MESMO_RELOGIO.** Quando o mesmo relógio carimba o fechamento e o fim da conversa, o offset bo cancela. Com diferença carimbada de 3/10 e erro diferencial de no máximo 1/10, o fechamento vem pelo menos 1/5 depois do fim. É o análogo de OFFSET_COMUM.
- **RELOGIOS_DISTINTOS.** Com relógios diferentes e sem limite para a diferença entre eles, a mesma diferença carimbada é compatível com as duas ordens: EM ABERTO. É o análogo de OFFSET_DISTINTO.
- **DERIVA_ENTRE_EVENTOS.** Se o offset deriva 1/4 entre os eventos e o resíduo é 1/10, a diferença carimbada de 3/10 esconde uma diferença física de −1/20. Afirmar que o fechamento cobre o fim **contradiz** os dados. É o análogo de DERIVA.
- **DECIDE_MESMO_RELOGIO.** Com o mesmo relógio e a ordem garantida, o controle vale e a fonte fica decidida (s = 1).
- **DISTINTOS_NAO_DECIDE.** Com relógios distintos, a fonte fica EM ABERTO.

## 3. Consequência para a língua secreta

1. **O carimbo da plataforma é o melhor relógio para comparar.** Se a própria plataforma carimba o comentário, o fim da conversa e a mudança de regra, o erro comum dela cancela na diferença. Só sobra o erro diferencial, e isso pode recuperar a cobertura que a v17 deixou EM ABERTO.
2. **Misturar relógios exige limite diferencial.** Comparar o carimbo da plataforma com o horário da máquina do commit (ou com o bloco Bitcoin) sem um limite entre eles deixa a ordem EM ABERTO. É o mesmo ponto da v10, agora na pergunta "o fechamento veio depois?".
3. **Um relógio comum não basta se ele deriva entre os eventos.** Se o offset da plataforma muda entre o fim da conversa e o fechamento, a guarda tem de somar a deriva: r + e − d ≤ B.
4. **O erro diferencial se mede com um pulso comum.** Um comentário-referência carimbado pela plataforma e registrado no mesmo instante no registro de mudanças mede o erro diferencial. É o "mesmo pulso nos dois canais" do Todo 36.
5. **Paralelo entre as séries.**

   | Série | Diferença carimbada | Limite B | Folga garantida | Contraexemplo |
   |---|---|---|---|---|
   | GPT | 0,12 ms | 0,05 ms | 0,07 ms | deriva de 0,10 ms gera −0,03 ms |
   | Esta | 3/10 | 1/10 | 1/5 | deriva de 1/4 gera −1/20 |

## 4. Próximo ponto

O Todo 36 propõe derivar uma guarda de tempo depois da perda do sinal de sincronismo. Na língua secreta, isso equivale a uma queda ou mudança do relógio da plataforma no meio do período, por exemplo uma reindexação ou uma migração de servidor. Depois da queda, o erro diferencial cresce com a idade (v10) até uma nova referência. A decisão só se sustenta enquanto a guarda acumulada couber.

## Integridade

- SHA-256 do Todo 36, conferido nos bytes contra o `.sha256` do GPT: `b5d41184c96a86c66b123b1496e6c3f14ba4ddcc5448893e48ce840d4278c822`.
- SHA-256 da v17 desta série: `4ed9c7053f240efb8d2e2e90c292ffc8a2fc52bb11e196280dd48f1a216cb424`.
- Commit remoto de partida: `91f120677623740ab29b9b4551019a835a3af4ff`.
- O hash desta v18 está no arquivo `.sha256` ao lado.
