# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m28: Atos 4:13–37 completo, verso a verso, em volta de 4:13 e 4:33

Esta rodada segue o próximo ponto da m27: completar Atos 4:13 e 4:33 com os versos em volta, verso a verso, como pediu o usuário [S-U]. Entram 4:13–22 (o conselho) e 4:23–37 (a oração e a comunidade). A m04, a m11, a m15 e a m18 já usaram parte desses versos. Aqui eles estão todos, em ordem. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m27):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Verso | O que o texto registra | Referência |
|---|---|---|
| 13 | veem a ousadia de Pedro e João, sabem que são homens sem letras, admiram-se e reconhecem que estiveram com Jesus | Atos 4:13 |
| 14 | vendo o homem curado de pé com eles, nada têm a dizer contra | Atos 4:14 |
| 15 | mandam que saiam do conselho e discutem entre si | Atos 4:15 |
| 16 | que faremos? um sinal notório foi feito, todos em Jerusalém sabem, e não podemos negar | Atos 4:16 |
| 17 | para que não se espalhe mais, vamos ameaçá-los para que não falem mais nesse nome | Atos 4:17 |
| 18 | ordenam que de modo nenhum falem nem ensinem no nome de Jesus | Atos 4:18 |
| 19 | Pedro e João: julgai se é justo diante de Deus ouvir a vós antes que a Deus | Atos 4:19 |
| 20 | não podemos deixar de falar do que vimos e ouvimos | Atos 4:20 |
| 21 | ameaçam de novo e soltam, sem achar como castigar, por causa do povo, porque todos davam glória a Deus pelo que aconteceu | Atos 4:21 |
| 22 | o homem curado tinha mais de quarenta anos | Atos 4:22 |
| 23 | soltos, vão aos seus e contam o que os chefes dos sacerdotes e os anciãos disseram | Atos 4:23 |
| 24 | erguem juntos a voz a Deus: Soberano, que fizeste o céu, a terra, o mar e tudo o que neles há | Atos 4:24 |
| 25 | que disseste pelo Espírito Santo, pela boca de Davi: por que as nações se enfureceram e os povos planejaram coisas vãs? | Atos 4:25 |
| 26 | os reis da terra se levantaram, e os governantes se ajuntaram contra o Senhor e contra o seu Ungido | Atos 4:26 |
| 27 | de fato se ajuntaram nesta cidade contra o teu santo Servo Jesus, que ungiste: Herodes, Pôncio Pilatos, os gentios e os povos de Israel | Atos 4:27 |
| 28 | para fazer o que a tua mão e o teu propósito determinaram antes | Atos 4:28 |
| 29 | agora, Senhor, olha para as ameaças deles e concede aos teus servos falar a tua palavra com toda a ousadia | Atos 4:29 |
| 30 | enquanto estendes a mão para curar e para que se façam sinais e prodígios pelo nome do teu santo Servo Jesus | Atos 4:30 |
| 31 | depois da oração, o lugar treme; todos ficam cheios do Espírito Santo e anunciam a palavra com ousadia | Atos 4:31 |
| 32 | a multidão dos que creram era um só coração e uma só alma; ninguém dizia que algo era só seu; tudo era comum | Atos 4:32 |
| 33 | com grande poder os apóstolos davam testemunho da ressurreição do Senhor Jesus, e havia grande graça sobre todos | Atos 4:33 |
| 34 | não havia necessitado entre eles; os que tinham terras ou casas vendiam e traziam o valor | Atos 4:34 |
| 35 | punham aos pés dos apóstolos, e era repartido a cada um conforme a necessidade | Atos 4:35 |
| 36 | José, chamado Barnabé ("filho da consolação"), levita nascido em Chipre | Atos 4:36 |
| 37 | vendeu um campo, trouxe o dinheiro e pôs aos pés dos apóstolos | Atos 4:37 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| referência | o curado de pé (v14) e o sinal que não se pode negar (v16); o curado tem mais de 40 anos (v22) |
| reação dos opositores | ameaça e ordem de calar (v17–18, 21), sem negar o fato (v16) |
| reação do povo | todos davam glória a Deus (v21) |
| fala do salmo | o Espírito fala pela boca de Davi (v25): o mecanismo usa uma boca registrada |
| ajuntamento contra o Filho | 4 grupos: Herodes, Pilatos, gentios, povos de Israel (v27) |
| pedido | depois das ameaças, pedem ousadia, não proteção (v29) |
| TROCA | oração → lugar treme → cheios do Espírito → ousadia (v31) |
| contagem de um lado (m01, m04) | zero necessitados (v34); um caso nomeado (Barnabé, v36–37); os opositores não são contados |

## 3. Consultas no Z3 (m28)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["CURADO_COM_MAIS_DE_QUARENTA",["id > 40"],"id ≤ 40","CONTRADIZ",["sat","unsat","sat"],0],
["QUATRO_GRUPOS_CONTRA_O_SERVO",["ga = 1","gb = 1","gc = 1","gd = 1","ng = ga + gb + gc + gd"],"ng < 4","CONTRADIZ",["sat","unsat","sat"],0],
["AMEACA_E_PEDIDO_DE_OUSADIA",["am = 1","po = 1"],"po = 0","CONTRADIZ",["sat","unsat","sat"],0],
["PEDIDO_ANTES_DO_ENCHIMENTO",["tp = 0","tc = 1"],"tc < tp","CONTRADIZ",["sat","unsat","sat"],0],
["QUANTOS_DAVAM_GLORIA",["gl ≥ 1"],"gl ≥ 1000","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **CURADO_COM_MAIS_DE_QUARENTA.** O verso 22 dá a idade do curado: mais de quarenta anos. Afirmar quarenta ou menos **contradiz** o registro.
- **QUATRO_GRUPOS_CONTRA_O_SERVO.** O verso 27 nomeia quatro grupos ajuntados contra Jesus. Afirmar menos de quatro **contradiz** a contagem.
- **AMEACA_E_PEDIDO_DE_OUSADIA.** Diante das ameaças (v29), o pedido é ousadia. Afirmar que o pedido foi o silêncio **contradiz** o registro.
- **PEDIDO_ANTES_DO_ENCHIMENTO.** O pedido de ousadia (v29) vem antes do enchimento e da ousadia (v31). Afirmar o contrário **contradiz** a ordem do texto.
- **QUANTOS_DAVAM_GLORIA.** O verso 21 diz que "todos" davam glória, mas não dá número. Fica EM ABERTO.

## 4. Resultado da m28

1. **Atos 4:13–37 tem 25 versos em dois blocos.** O conselho (v13–22) e a oração com a comunidade (v23–37). Os versos 13 e 33 estão um em cada bloco.
2. **O verso 13 está no meio de um fato que não se nega.** O curado tem mais de quarenta anos (v22), está de pé (v14), e os opositores dizem que não podem negar (v16).
3. **A reação se divide em três.** Os opositores ameaçam (v17–18), o povo dá glória (v21) e os enviados pedem ousadia (v29).
4. **O verso 33 vem depois de uma cadeia registrada.** Pedido de ousadia (v29) → oração → lugar treme → cheios do Espírito → ousadia (v31) → um só coração (v32) → testemunho com grande poder (v33). O mecanismo está no meio da cadeia [S-U].
5. **O ajuntamento contra o Filho tem quatro grupos.** Os versos 26–27 aplicam o salmo e nomeiam os quatro.
6. **Fica EM ABERTO:** quantos davam glória no verso 21.

## 5. Próximo ponto

A m29 completa Filipenses 4, os 23 versos, verso a verso.

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m27 desta trilha: `b6d9d010b82c8b89e5375247e44e0a17116f9c977bf3893a9a78854f08f01ec2`.
- Commit remoto de partida: `a5c65d8d7b7451b49cb3837788638cb520ca56c8`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m28 está no arquivo `.sha256` ao lado.
