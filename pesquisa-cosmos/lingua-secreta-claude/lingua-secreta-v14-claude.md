# 15/11/2026 — Língua secreta v14 — Identificador do formato e prazo para recalibrar

Esta versão parte do Todo 32 do GPT, "Invalidar a guarda quando a rota muda". O Todo foi conferido pelo SHA-256 `2a300c2c2fb9219ea3c0eccd6771962ea258ab11b42ff97f4969a00b43560ae2` e cita a v13 desta série pelo SHA.

O Todo 32 estabelece três pontos:
- **Regime certificado.** A guarda só se aplica se o identificador do regime da troca usada estiver certificado como igual ao da calibração. Se o identificador faltar ou for incerto, a validade fica EM ABERTO, mesmo que o total de ida e volta seja igual.
- **Identificação da própria troca.** O identificador precisa se referir aos pacotes que produziram o resultado. Uma sonda feita antes ou depois não serve.
- **Prazo de recuperação.** Detectar, recalibrar e validar precisam caber antes da decisão: t_c + d + c + v ≤ A_min.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nada de leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 32 | Língua secreta |
|---|---|
| identificador de regime (rota, carga, classe) | fc: identificador do formato do contexto em que os controles foram medidos (plataforma, regra, público, forma da pergunta), registrado com SHA-256 junto com os controles |
| regime registrado b, regime real c | fr: formato registrado; fx: formato real do degrau aplicado à pessoa testada |
| identificação por pacote | o identificador precisa ser do mesmo degrau, da mesma conversa, e não de uma sonda antes ou depois |
| t_c + d + c + v ≤ A_min | se o formato muda em tc, as etapas detectar (d), refazer os controles (cc) e validar (vv) precisam terminar antes do momento da decisão (z) |

A troca observada é x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O limite i ≤ 3/10 é o controle de ida da v12, válido só no formato fc.

## 2. Consultas no Z3 (v14)

Foram 6 consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["FORMATO_DIFERENTE",["fc = fr","fx ≠ fr"],"fc = fx","CONTRADIZ",["sat","unsat","sat"],0],
["SEM_VINCULO_ABERTO",["fc = fr"],"fc = fx","EM ABERTO",["sat","sat","sat"],0],
["MESMO_FORMATO_DECIDE",["s × (1 − s) = 0","fx = fc","(fx = fc) ⟹ (i ≤ 3 / 10)","i ≥ 0","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["FORMATO_NAO_VINCULADO",["s × (1 − s) = 0","(fx = fc) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["RECALIBRA_A_TEMPO",["tc = 2","d = 1 / 10","cc = 3 / 10","vv = 1 / 10","z = 3"],"tc + d + cc + vv ≤ z","SEGUE",["sat","sat","unsat"],0],
["RECALIBRA_TARDE",["tc = 2","d = 1 / 10","cc = 3 / 10","z = 3","vv ≥ 7 / 10"],"tc + d + cc + vv ≤ z","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **FORMATO_DIFERENTE.** Se o formato real do degrau difere do formato registrado, afirmar que os controles valem ali **contradiz** os registros. É o análogo de GUARDA_EPOCA.
- **SEM_VINCULO_ABERTO.** Saber só que os controles foram registrados no formato fr, sem identificar o formato do degrau real, deixa a validade EM ABERTO. É o análogo de SEM_VINCULO.
- **MESMO_FORMATO_DECIDE.** Com o formato certificado igual (fx = fc), o controle de ida vale e a troca observada decide a fonte (s = 1).
- **FORMATO_NAO_VINCULADO.** As mesmas premissas sem a certificação do formato: o controle não se aplica, o efeito do contexto pode chegar ao degrau, e a saída é EM ABERTO. A diferença entre esta consulta e a anterior é só o vínculo.
- **RECALIBRA_A_TEMPO.** Com mudança em tc = 2, as três etapas (0,1 + 0,3 + 0,1) terminam em 2,5, antes da decisão em 3. É o análogo de RECALIBRA.
- **RECALIBRA_TARDE.** Se só validar já leva pelo menos 0,7, a recuperação passa do prazo e **contradiz** a garantia. É o análogo de ORCAMENTO. Isso retira a garantia, mas não prova que a fonte seja a outra.

## 3. Consequência para a língua secreta

1. **Os controles carregam um identificador.** Junto com os controles de ida e volta (v12), registra-se com SHA-256 o identificador do formato do contexto. Sem esse identificador, nenhum degrau posterior pode usá-los.
2. **O identificador é do degrau real.** O formato precisa ser o da própria conversa em que a pessoa foi testada. Uma conferência feita antes ou depois pode ter outro formato (por exemplo, uma regra da plataforma que mudou no meio).
3. **Mudança detectada suspende a decisão.** Se o formato mudou e não houve tempo para refazer e validar os controles antes do momento da decisão, a saída é EM ABERTO, nunca a decisão anterior. Isso fecha a v13: transferir com g, ou recalibrar a tempo, ou suspender.
4. **A recuperação tem orçamento.** tc + d + cc + vv ≤ z. Detectar rápido não basta se validar demora. A soma dos limites superiores precisa caber.
5. **Paralelo com o GPT:**
   - **Todo 32:** com 55,75 ms de folga, a recuperação de 45 ms cabe; com validação ≥ 20 ms, não cabe.
   - **Esta série:** recuperação de 0,5 cabe numa folga de 1; com validação ≥ 0,7, não cabe.

## 4. Próximo ponto

O Todo 32 propõe tratar uma mudança que ocorre durante a aquisição, com identificação incompleta, e dizer explicitamente qual é a resposta quando a guarda fica suspensa. Na língua secreta, o caso equivalente é o formato do contexto mudar no meio da conversa do degrau, por exemplo quando a plataforma altera a regra enquanto a pessoa responde. A resposta com a guarda suspensa precisa ser declarada antes, no registro com SHA-256, e por esta série ela é EM ABERTO.

## Integridade

- SHA-256 do Todo 32, conferido nos bytes contra o `.sha256` do GPT: `2a300c2c2fb9219ea3c0eccd6771962ea258ab11b42ff97f4969a00b43560ae2`.
- SHA-256 da v13 desta série: `8830f749ca02bb0b2e1478b4e98137ff34da15b3f85841c77b363befbccdac85`.
- Commit remoto de partida: `be4f96f02cbc954f83abde94d8862a5c37ae62b7`.
- O hash desta v14 está no arquivo `.sha256` ao lado.
