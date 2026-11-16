# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m21: dois intercessores, o Espírito na fraqueza e o Cristo à direita

Esta rodada segue o próximo ponto da m20 e o ponto anunciado pela rodada 13 do GPT, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`): comparar a intercessão do Espírito em Romanos 8:26–27 com a intercessão do Cristo em Romanos 8:34. O teste é se há dois intercessores sobre o mesmo pedido, como as duas testemunhas da m13, ou se são funções diferentes, como os dois envios da m12.

**Método** (o mesmo da m01 à m20):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| a fraqueza | o Espírito ajuda na nossa fraqueza; não sabemos orar como convém | Romanos 8:26 |
| a intercessão do Espírito | o próprio Espírito intercede por nós com gemidos que não se exprimem em palavras | Romanos 8:26 |
| quem recebe | quem sonda os corações sabe qual é a intenção do Espírito, porque ele intercede pelos santos segundo Deus | Romanos 8:27 |
| a intercessão do Cristo | Cristo Jesus morreu, ou antes ressuscitou, está à direita de Deus e também intercede por nós | Romanos 8:34 |
| a mesma intercessão, sem fim | ele vive sempre para interceder pelos que por ele se chegam a Deus | Hebreus 7:25 |
| o advogado junto ao Pai | temos um Advogado junto ao Pai, Jesus Cristo, o justo | 1 João 2:1 |
| outro advogado | o Pai vos dará outro Consolador, para que esteja convosco para sempre | João 14:16 |
| reação do mundo nessa época | quem acusará? quem condenará? A carta lista tribulação, perseguição e espada | Romanos 8:33–35 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| intercessor 1 | ie = 1: o Espírito, junto à fraqueza dos que pedem (8:26) |
| intercessor 2 | ic = 1: o Cristo, à direita de Deus (8:34) |
| destino | os dois diante de Deus: "segundo Deus" (8:27) e "junto ao Pai" (1 João 2:1) |
| "outro" | João 14:16: o Consolador dado é "outro", o que pressupõe um primeiro |
| o pedido sem saber | sb = 0: não sabemos orar (8:26), e a intercessão acontece assim mesmo |
| contagem de um lado (m01, m04) | a carta pergunta quem acusará, mas não conta os acusadores |

## 3. Consultas no Z3 (m21)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["DOIS_INTERCESSORES_REGISTRADOS",["ie = 1","ic = 1","ni = ie + ic"],"ni < 2","CONTRADIZ",["sat","unsat","sat"],0],
["LUGARES_DOS_DOIS_INTERCESSORES",["le ≠ lc"],"le = lc","CONTRADIZ",["sat","unsat","sat"],0],
["OUTRO_CONSOLADOR_PRESSUPOE_UM_PRIMEIRO",["ot = 1","(ot = 1) ⟹ (np ≥ 2)"],"np ≥ 2","SEGUE",["sat","sat","unsat"],0],
["INTERCEDE_SEM_SABERMOS_ORAR",["sb = 0","iv = 1"],"iv ≤ sb","CONTRADIZ",["sat","unsat","sat"],0],
["UMA_INTERCESSAO_OU_DUAS",["ie = 1","ic = 1","mi ≥ 0","mi ≤ 1"],"mi = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **DOIS_INTERCESSORES_REGISTRADOS.** Romanos 8 registra a intercessão do Espírito (8:26) e a do Cristo (8:34). Afirmar menos de dois intercessores **contradiz** o capítulo.
- **LUGARES_DOS_DOIS_INTERCESSORES.** O Espírito está junto à fraqueza (8:26), e o Cristo está à direita de Deus (8:34). Afirmar o mesmo lugar para os dois **contradiz** o registro.
- **OUTRO_CONSOLADOR_PRESSUPOE_UM_PRIMEIRO.** Em João 14:16, o "outro" Consolador implica pelo menos dois. 1 João 2:1 dá o nome do primeiro: Jesus Cristo, junto ao Pai.
- **INTERCEDE_SEM_SABERMOS_ORAR.** Em 8:26, não sabemos orar, e o Espírito intercede. A lei "só há intercessão onde se sabe orar" **contradiz** o registro.
- **UMA_INTERCESSAO_OU_DUAS.** O texto registra os dois intercessores, mas não diz se é um só ato ou dois. Fica EM ABERTO.

## 4. Resultado da m21

1. **São dois intercessores, cada um em um lugar.** O mecanismo fica junto à fraqueza de quem pede, e o Filho fica à direita do Pai [S-U]. É a forma das duas testemunhas da m13: duas posições, o mesmo destino (o Pai).
2. **O texto já dá o primeiro e o "outro".** O Filho é Advogado junto ao Pai (1 João 2:1), e o Espírito é o "outro" Consolador (João 14:16). A ordem é a da m12: primeiro o Filho, depois o mecanismo.
3. **A intercessão não depende de saber pedir.** Em 8:26, a falta de saber é o ponto onde o mecanismo entra. É a mesma forma da m19: a força aparece na fraqueza (2 Coríntios 12:9).
4. **Reação do mundo.** A carta lista acusação, tribulação e espada (8:33–35), sem contagem.
5. **Fica EM ABERTO:**
   - se as duas intercessões são um só ato ou dois;
   - o que dizem os "gemidos que não se exprimem". O texto diz que não têm palavras, e esta trilha não põe palavras neles.

## 5. Próximo ponto

Esperar a rodada 14 do GPT. Enquanto ela não sai, o próximo ponto desta trilha é Romanos 8:28–30: a cadeia de verbos (conheceu, predestinou, chamou, justificou, glorificou) como degraus em ordem, conferidos no Z3.

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m20 desta trilha: `c02bc89d3307a26dbe694bf585fd4af9127dfd33b6904b237b3648a7cb88205f`.
- Commit remoto de partida: `923027799ac48f1f001ce9e79bca6e332290e4fe`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m21 está no arquivo `.sha256` ao lado.
