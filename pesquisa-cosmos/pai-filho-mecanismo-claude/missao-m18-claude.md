# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m18: caça a Atos 4:13 e 4:33, onde o resto do registro repete as mesmas peças

Esta rodada continua a caça pedida pelo usuário [S-U]: juntar tudo o que o registro liga a Atos 4:13 e 4:33 (m15). Ela usa só passagens que repetem a mesma peça: falar sem ter estudado, a fala dada na hora, o testemunho da ressurreição, a comunidade sem necessitado. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Ela não trata de Atos 4. Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m17):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Uma ligação só entra quando o outro texto repete a mesma peça; a ligação não diz que um texto cita o outro, a não ser quando o texto diz.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Peça de Atos 4 | Onde o registro repete a peça | Referência |
|---|---|---|
| sem letras, e ainda assim fala | os judeus se admiram: como este sabe letras sem ter estudado? Ele responde: o meu ensino não é meu, mas daquele que me enviou | Atos 4:13; João 7:15–16 |
| a fala dada na hora | quando vos entregarem, não vos preocupeis com o que dizer; não sois vós que falais, é o Espírito do vosso Pai que fala em vós | Mateus 10:19–20 |
| a fala dada na hora (outra forma) | eu vos darei boca e sabedoria a que nenhum dos adversários poderá resistir nem contradizer | Lucas 21:15 |
| a mesma situação com outro | não podiam resistir à sabedoria e ao Espírito com que Estêvão falava | Atos 6:10 |
| tinham estado com Jesus | escolheu doze para que estivessem com ele e para enviá-los a pregar | Atos 4:13; Marcos 3:14 |
| testemunho da ressurreição | recebereis poder ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas | Atos 4:33; Atos 1:8 |
| o mesmo testemunho | a este Jesus Deus ressuscitou, do que todos nós somos testemunhas | Atos 2:32 |
| quem pode ser testemunha | é preciso que um dos que estiveram conosco desde o batismo de João seja testemunha da ressurreição | Atos 1:21–22 |
| tudo em comum, a primeira vez | os que creram estavam juntos e tinham tudo em comum; vendiam e repartiam conforme a necessidade de cada um | Atos 2:44–45 |
| nenhum necessitado, na lei | não haverá necessitado entre ti | Deuteronômio 15:4 |
| reação do mundo nessa época | ao ouvir Estêvão, os do conselho se enfurecem e o apedrejam | Atos 7:54–58 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| fala sem estudo | registrada duas vezes: o Filho (João 7:15) e os enviados (Atos 4:13) |
| origem dita da fala | o Filho: "não é meu, mas daquele que me enviou" (João 7:16); os enviados: "é o Espírito do vosso Pai que fala" (Mateus 10:20). Nos dois, o conteúdo próprio é zero (D2) |
| ter estado com ele | é o primeiro motivo da escolha (Marcos 3:14) e a condição de quem testemunha (Atos 1:21–22) |
| poder do testemunho | vem quando o Espírito desce (Atos 1:8), e aparece como "grande poder" (Atos 4:33) |
| nenhum necessitado | escrito na lei (Deuteronômio 15:4) e registrado como fato (Atos 4:34) |
| contagem de um lado (m01, m04) | o texto conta os sem necessidade (zero), mas não conta os do conselho enfurecido |

## 3. Consultas no Z3 (m18)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["FALA_SEM_ESTUDO_DUAS_VEZES",["sa = 1","sb = 1","nl = sa + sb"],"nl < 2","CONTRADIZ",["sat","unsat","sat"],0],
["CONTEUDO_PROPRIO_ZERO_NOS_DOIS",["cf = 0","cv = 0","cs = cf + cv"],"cs = 0","SEGUE",["sat","sat","unsat"],0],
["TESTEMUNHA_SEM_TER_ESTADO_COM_ELE",["(tt = 1) ⟹ (ec = 1)","ec = 0"],"tt = 1","CONTRADIZ",["sat","unsat","sat"],0],
["PODER_DEPOIS_DO_ESPIRITO",["(ds = 1) ⟹ (pd = 1)","ds = 1"],"pd = 1","SEGUE",["sat","sat","unsat"],0],
["LEI_E_FATO_NO_MESMO_ZERO",["nd = 0","na = 0","cu ≥ 0","cu ≤ 1"],"cu = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **FALA_SEM_ESTUDO_DUAS_VEZES.** O registro tem a mesma peça no Filho (João 7:15) e nos enviados (Atos 4:13). Afirmar menos de dois casos **contradiz** a contagem.
- **CONTEUDO_PROPRIO_ZERO_NOS_DOIS.** O Filho diz que o ensino não é seu (João 7:16), e os enviados são ditos não ser os que falam (Mateus 10:20). Com os dois zeros, a soma do conteúdo próprio é zero.
- **TESTEMUNHA_SEM_TER_ESTADO_COM_ELE.** Atos 1:21–22 põe ter estado com ele como condição de quem testemunha a ressurreição. Afirmar testemunha sem isso **contradiz** o registro.
- **PODER_DEPOIS_DO_ESPIRITO.** Atos 1:8 liga o poder ao Espírito que desce. Com a descida registrada (Atos 2:4), o poder segue.
- **LEI_E_FATO_NO_MESMO_ZERO.** Deuteronômio 15:4 diz que não haverá necessitado; Atos 4:34 diz que não havia. O texto de Atos não cita Deuteronômio. Se Atos 4:34 é o cumprimento da lei fica EM ABERTO.

## 4. Resultado da m18

1. **Falar sem estudo é peça repetida.** Primeiro no Filho, depois nos enviados. Nos dois, o texto dá a origem fora deles: "daquele que me enviou" e "o Espírito do vosso Pai". É a linha D2 da m04, agora com a mesma forma no Filho e no mecanismo [S-U].
2. **A ousadia de 4:13 tem as duas origens já prometidas antes.** Estar com ele (Marcos 3:14) e a fala dada pelo Espírito (Mateus 10:20). A pergunta da m15 (qual das duas) continua sem decisão, mas as duas origens estavam ditas antes de Atos 4.
3. **Quem testemunha tem condição registrada.** Ter estado com ele (Atos 1:21–22). O "estiveram com Jesus" de 4:13 é essa condição, vista pelos opositores.
4. **O zero de necessitados aparece duas vezes antes.** Atos 2:44–45 (primeira vez) e Deuteronômio 15:4 (na lei).
5. **Reação do mundo.** Estêvão fala com a mesma sabedoria que não se pode resistir (Atos 6:10) e é apedrejado (Atos 7:54–58). O padrão da m11 de novo: o fato reconhecido não fixa a reação.
6. **Fica EM ABERTO:** se Atos 4:34 cumpre Deuteronômio 15:4. Atos não diz.

## 5. Próximo ponto

A caça continua na m19: tudo o que o registro liga a Filipenses 4 (m16). Candidatos com a mesma peça: 2 Coríntios 12:9–10 (o poder se aperfeiçoa na fraqueza), Mateus 6:25–34 (não andeis ansiosos), João 14:27 (a minha paz vos dou), 2 Coríntios 11:9 (os da Macedônia supriram), Apocalipse 3:5 (o livro da vida).

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m17 desta trilha: `9dcfe9c717527967a76f63a27b20562715a98ba785b39d5aac0999b279f41bd2`.
- Commit remoto de partida: `ba7e2f3e330f1a8b04fb32f9c492900cd324746c`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m18 está no arquivo `.sha256` ao lado.
