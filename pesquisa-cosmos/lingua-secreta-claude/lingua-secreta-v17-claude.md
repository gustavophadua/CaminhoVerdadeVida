# 15/11/2026 — Língua secreta v17 — Fechamento das três fontes de mudança de formato

Esta rodada parte do Todo 35 do GPT, "Cobertura de fontes com relógios diferentes", conferido pelo SHA-256 `422e5c2c023c763c3d34b80d4e2e71a0bac32c6db341b73f7f73641f7225a424`. O Todo 35 cita a v16 desta série pelo SHA.

O Todo 35 estabelece quatro pontos:
- Com várias fontes indispensáveis, a cobertura exige min_i(Ĉ_i − ε_i) ≥ F̂ + ε_F.
- A confirmação de uma fonte não cobre a lacuna de outra.
- Uma única fonte com carimbo ambíguo (erro maior que a folga) deixa a cobertura EM ABERTO, mesmo que as demais estejam completas.
- Quando as confirmações correm em paralelo, o custo é max(w₁, w₂) + v.

Regras da série, que continuam valendo:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 35 | Língua secreta |
|---|---|
| fontes indispensáveis i | as três fontes de mudança de formato da v16: regra da plataforma (a), público do fio (b), forma da pergunta de quem aplica o degrau (p) |
| fechamento estimado Ĉ_i com erro ε_i | carimbo de fechamento de cada fonte (xa, xb, xp), com erro do relógio dela (ea, eb, ep), já incluindo a deriva desde a sincronização (v10) |
| fim da aquisição F̂ ± ε_F | fim da conversa do degrau (ff ± df); fim real zf |
| uma fonte não cobre a outra | o fechamento da regra da plataforma não diz nada sobre mudanças de público |
| max(w₁, w₂) + v | confirmações das fontes em paralelo, seguidas da agregação |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle de ida da v12 (i ≤ 3/10) só vale com as três fontes cobrindo o fim da conversa.

## 2. Consultas no Z3 (v17)

Seis consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["TRES_FONTES_COBREM",["ca ≥ xa − ea","cb ≥ xb − eb","cp ≥ xp − ep","xa − ea ≥ ff + df","xb − eb ≥ ff + df","xp − ep ≥ ff + df","zf ≤ ff + df"],"ca ≥ zf ∧ cb ≥ zf ∧ cp ≥ zf","SEGUE",["sat","sat","unsat"],0],
["UMA_AMBIGUA",["ff = 0","df = 0","zf = 0","ca ≥ 1","cb ≥ 1","xp = 1 / 10","ep = 3 / 10","cp ≥ xp − ep","cp ≤ xp + ep"],"ca ≥ zf ∧ cb ≥ zf ∧ cp ≥ zf","EM ABERTO",["sat","sat","sat"],0],
["DECIDE_COM_TRES",["s × (1 − s) = 0","zf = 0","ca ≥ 1","cb ≥ 1","cp ≥ 1 / 2","((ca ≥ zf) ∧ (cb ≥ zf) ∧ (cp ≥ zf)) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["AMBIGUA_NAO_DECIDE",["s × (1 − s) = 0","zf = 0","ca ≥ 1","cb ≥ 1","cp ≥ −1 / 5","cp ≤ 2 / 5","((ca ≥ zf) ∧ (cb ≥ zf) ∧ (cp ≥ zf)) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["PARALELO_CABE",["wa ≤ 1 / 5","wb ≤ 1 / 4","v ≤ 1 / 20"],"wa + v ≤ 3 / 10 ∧ wb + v ≤ 3 / 10","SEGUE",["sat","sat","unsat"],0],
["FONTE_TARDE",["wb = 3 / 10","v = 1 / 20"],"wb + v ≤ 3 / 10","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **TRES_FONTES_COBREM.** Se cada fonte, descontado o erro do seu relógio, fecha depois do fim da conversa somado ao erro do fim, as três cobrem o fim real. É o análogo de COBERTURA no Todo 35.
- **UMA_AMBIGUA.** A regra da plataforma e o público cobrem com folga. A forma da pergunta anuncia fechamento 1/10 depois do fim, mas com erro de 3/10, então o fechamento real fica entre −1/5 e 2/5. A cobertura conjunta fica EM ABERTO. É o análogo de CARIMBO_AMBIGUO: a folga das outras fontes não compensa.
- **DECIDE_COM_TRES.** Com as três fontes cobrindo o fim, o controle vale e a fonte fica decidida (s = 1).
- **AMBIGUA_NAO_DECIDE.** Mesmo cenário, mas com a forma da pergunta ambígua: a fonte fica EM ABERTO.
- **PARALELO_CABE.** As confirmações em paralelo (até 1/5 e até 1/4), mais a agregação (até 1/20), cabem num orçamento de 3/10, sem folga no pior caso. É o análogo de PARALELO.
- **FONTE_TARDE.** Se a segunda confirmação leva 3/10, a soma passa do orçamento e **contradiz** a entrega. É o análogo de FONTE_TARDE.

## 3. Consequência para a língua secreta

1. **Cada fonte de mudança de formato fecha por conta própria.** A regra da plataforma, o público do fio e a forma da pergunta têm registros e relógios diferentes. Um fechamento completo de uma delas não cobre as outras.
2. **Vale o fechamento mais antigo, já descontado o erro.** A cobertura é tão boa quanto a fonte com o menor fechamento menos erro. Uma fonte ambígua basta para deixar o resultado EM ABERTO.
3. **A fonte mais fraca é a pergunta de quem aplica o degrau.** O registro da forma da pergunta é o que costuma ter o relógio menos controlado (registro manual). É ela que tende a limitar a cobertura e precisa de carimbo com erro declarado.
4. **O conjunto de fontes precisa estar completo.** Se houver uma quarta fonte de mudança relevante, por exemplo um moderador do fio que não foi registrado, a cobertura das três não basta. Essa lista precisa ser declarada com antecedência, no registro com SHA-256.
5. **Paralelo com o GPT.**
   - No Todo 35, há uma fonte com fechamento real entre −0,03 e +0,27 ms, e o caso de 0,26 + 0,02 ms passa do orçamento de 0,25 ms.
   - Aqui, a pergunta fecha entre −1/5 e 2/5, e o caso de 3/10 + 1/20 passa de 3/10.

## 4. Próximo ponto

O Todo 35 propõe verificar quando um erro comum de relógio pode ser eliminado nas diferenças entre fonte e aquisição. Na língua secreta, isso vale para fontes que usam o mesmo relógio que marca o fim da conversa. Por exemplo, quando a plataforma carimba o comentário e a mudança de regra com o mesmo relógio, o erro comum cancela na diferença (ORIGEM). Só sobra o erro diferencial, o que pode recuperar a cobertura de uma fonte ambígua.

## Integridade

- SHA-256 do Todo 35, conferido nos bytes contra o `.sha256` do GPT: `422e5c2c023c763c3d34b80d4e2e71a0bac32c6db341b73f7f73641f7225a424`.
- SHA-256 da v16 desta série: `eda70b611322b39fbb1431be763f14e03191ef9f08b95643fbf08759c52e80fb`.
- Commit remoto de partida: `5f02b5a059d0488747cb94dcea27d8a31201a11e`. No momento desta rodada, o Todo 35 estava na pasta local do GPT, conferido pelo SHA, mas ainda não tinha sido enviado ao remoto.
- O hash desta v17 está no arquivo `.sha256` ao lado.
