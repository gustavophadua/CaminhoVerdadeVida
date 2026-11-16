# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m17: caça a Isaías 32–35, onde o resto do registro repete as mesmas peças

Esta rodada abre a caça pedida pelo usuário [S-U]: juntar tudo o que o registro liga a Isaías 32–35 (m14). Ela usa só passagens em que as mesmas peças aparecem com as mesmas palavras ou a mesma lista: derramamento do Espírito, os sinais do corpo, o caminho, as testemunhas do fim. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Ela não trata de Isaías. Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m16):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Uma ligação só entra quando o outro texto repete a mesma peça; a ligação não diz que um texto cita o outro, a não ser quando o texto diz.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Peça de Isaías 32–35 | Onde o registro repete a peça | Referência |
|---|---|---|
| o Espírito derramado do alto muda o deserto | derramarei água sobre o sedento e o meu Espírito sobre a tua descendência | Isaías 32:15; Isaías 44:3 |
| o derramamento | derramarei o meu Espírito sobre toda carne; filhos e filhas profetizarão | Joel 2:28 |
| o derramamento dito cumprido | Pedro, no Pentecostes, diz que aquilo é o que foi dito pelo profeta Joel | Atos 2:16–17 |
| o derramamento visto | o Filho, exaltado, recebeu do Pai o Espírito prometido e derramou o que vedes e ouvis | Atos 2:33 |
| justiça, paz e repouso | o reino de Deus é justiça, paz e alegria no Espírito Santo | Isaías 32:17; Romanos 14:17 |
| fortalecei as mãos fracas e os joelhos vacilantes | levantai as mãos cansadas e os joelhos enfraquecidos | Isaías 35:3; Hebreus 12:12 |
| os sinais do corpo | cegos veem, coxos andam, surdos ouvem | Isaías 35:5–6; Mateus 11:5; Lucas 7:22 |
| o mudo canta | trouxeram-lhe um mudo; expulso o demônio, o mudo falou, e a multidão se admirava | Isaías 35:6; Mateus 9:32–33 |
| o coxo salta | o coxo de nascença, curado, entra no templo andando e saltando | Isaías 35:6; Atos 3:8 |
| águas no deserto | quem tem sede venha a mim e beba; do interior dele fluirão rios de água viva. Isso ele disse do Espírito | Isaías 35:6; João 7:37–39 |
| o caminho | eu sou o caminho, a verdade e a vida | Isaías 35:8; João 14:6 |
| o caminho como nome | os do Caminho, homens e mulheres | Isaías 35:8; Atos 9:2 |
| os céus enrolados como livro | o céu recolheu-se como um livro que se enrola | Isaías 34:4; Apocalipse 6:14 |
| a fumaça que sobe para sempre | a fumaça do tormento sobe pelos séculos dos séculos | Isaías 34:10; Apocalipse 14:11; Apocalipse 19:3 |
| juiz, legislador e rei | um só é legislador e juiz | Isaías 33:22; Tiago 4:12 |
| reação do mundo nessa época | ao ver os sinais, os fariseus dizem que é pelo príncipe dos demônios | Mateus 9:34 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| derramamento (dr) | registrado em 4 lugares: Isaías 32:15, Isaías 44:3, Joel 2:28 e Atos 2:17 |
| quem derrama no cumprimento dito | o Filho, depois de receber do Pai (Atos 2:33): Pai → Filho → derramamento, a ordem da m12 |
| água = Espírito | dito pelo próprio texto, João 7:39 ("isso ele disse do Espírito") |
| sinais | as 4 peças de Isaías 35:5–6 aparecem todas: 3 em Mateus 11:5, o mudo em Mateus 9:33 |
| caminho | nome do caminho (Isaías 35:8), nome dado a si pelo Filho (João 14:6) e nome do grupo (Atos 9:2) |
| contagem de um lado (m01, m04) | o texto registra a acusação dos fariseus, mas não conta quantos aceitaram |

## 3. Consultas no Z3 (m17)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["QUATRO_SINAIS_TODOS_ACHADOS",["ma = 3","mb = 1","ns = ma + mb"],"ns < 4","CONTRADIZ",["sat","unsat","sat"],0],
["DERRAMADOR_DEPOIS_DE_RECEBER",["tr = 0","td ≥ 1"],"td < tr","CONTRADIZ",["sat","unsat","sat"],0],
["AGUA_E_O_ESPIRITO",["ag = es","es = dr","dr = 1"],"ag = 1","SEGUE",["sat","sat","unsat"],0],
["CUMPRIMENTO_DITO_POR_PEDRO",["jl = 1","is ≥ 0","is ≤ 1"],"is = 1","EM ABERTO",["sat","sat","sat"],0],
["TRES_NOMES_DO_CAMINHO",["ca = 1","cb = 1","cc = 1","nk = ca + cb + cc"],"nk < 3","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **QUATRO_SINAIS_TODOS_ACHADOS.** Na m14, só 3 dos 4 sinais estavam em Mateus 11:5. Com Mateus 9:33 (o mudo fala), os 4 aparecem registrados. Afirmar que falta um sinal **contradiz** a soma.
- **DERRAMADOR_DEPOIS_DE_RECEBER.** Em Atos 2:33, o Filho derrama depois de receber do Pai. Afirmar que derramou antes de receber **contradiz** o registro.
- **AGUA_E_O_ESPIRITO.** João 7:39 diz que a água viva é dita do Espírito. Com isso, as águas no deserto de Isaías 35:6 e o derramamento de 32:15 caem na mesma peça no modelo. A consequência segue.
- **CUMPRIMENTO_DITO_POR_PEDRO.** Atos 2:16 diz que o Pentecostes é o que Joel disse. O texto não diz que é o que Isaías 32:15 disse. A ligação com Isaías fica EM ABERTO.
- **TRES_NOMES_DO_CAMINHO.** O nome "caminho" aparece em Isaías 35:8, João 14:6 e Atos 9:2. Afirmar menos de 3 registros **contradiz** a contagem.

## 4. Resultado da m17

1. **Os 4 sinais de Isaías 35:5–6 estão todos registrados no tempo do Filho.** Três em Mateus 11:5 e o mudo em Mateus 9:33. A lacuna da m14 fecha.
2. **O derramamento tem cadeia registrada.** Prometido (Isaías 32:15; 44:3; Joel 2:28), dito cumprido (Atos 2:16–17) e com a ordem Pai → Filho → derramamento (Atos 2:33). É a ordem da m12 de novo.
3. **Água é o mecanismo, pelo próprio texto.** João 7:39 diz isso; não é leitura desta trilha.
4. **O caminho é o mesmo nome em três épocas.** Profecia, fala do Filho e nome do grupo.
5. **Reação do mundo.** Os mesmos sinais recebem a acusação de serem do príncipe dos demônios (Mateus 9:34). O fato visto não fixa a reação, como na m11.
6. **Fica EM ABERTO:** se Isaías 32:15 é o mesmo derramamento de Atos 2. Pedro nomeia Joel, não Isaías.

## 5. Próximo ponto

A caça continua na m18: tudo o que o registro liga a Atos 4:13 e 4:33 (m15). Candidatos com a mesma peça: João 7:15 (sabe letras sem ter estudado), Mateus 10:19–20 (não sois vós que falais), Atos 2:44–45 e Deuteronômio 15:4 (nenhum necessitado).

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m16 desta trilha: `15c90e5191743e4d9295f8dbc80f686fcaad61b726da026006a16ec864787854`.
- Commit remoto de partida: `b57d4a0143670406e58df37749b5980a4af0f7a9`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m17 está no arquivo `.sha256` ao lado.
