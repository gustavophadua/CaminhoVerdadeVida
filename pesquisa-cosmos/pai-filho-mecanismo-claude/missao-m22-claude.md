# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m22: Romanos 8:28–30, cinco verbos em cadeia e a imagem do Filho

Esta rodada segue o próximo ponto da m21: a cadeia de verbos de Romanos 8:28–30 (conheceu, predestinou, chamou, justificou, glorificou) como degraus em ordem. A rodada do GPT mais recente continua sendo a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). A rodada 14 ainda não saiu, e esta trilha segue o próprio capítulo.

**Método** (o mesmo da m01 à m21):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| para quem | todas as coisas cooperam para o bem dos que amam a Deus, dos chamados segundo o seu propósito | Romanos 8:28 |
| o alvo | os que de antemão conheceu, também predestinou para serem conformes à imagem do seu Filho | Romanos 8:29 |
| o Filho na série | para que ele seja o primogênito entre muitos irmãos | Romanos 8:29 |
| a cadeia | os que predestinou, chamou; os que chamou, justificou; os que justificou, glorificou | Romanos 8:30 |
| antes, em outro registro | escolheu antes da fundação do mundo; predestinou para a adoção de filhos por Jesus Cristo | Efésios 1:4–5 |
| quem faz a imagem | somos transformados na mesma imagem, de glória em glória, como pelo Senhor, o Espírito | 2 Coríntios 3:18 |
| reação do mundo nessa época | o dia todo estendi as mãos a um povo desobediente e que contradiz | Romanos 10:21 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| degraus | c1 conheceu → c2 predestinou → c3 chamou → c4 justificou → c5 glorificou (8:29–30) |
| direção registrada | só para a frente: "os que X, a esses Y" |
| alvo dos degraus | a imagem do Filho (8:29): o valor é o molde [S-U] |
| quem opera a imagem | o Espírito (2 Coríntios 3:18): o mecanismo transforma na imagem [S-U] |
| alcance de 8:28 | o bem é dito para os que amam a Deus; para os outros o texto não diz |
| contagem de um lado (m01, m04) | "muitos irmãos", sem número; o povo que contradiz, sem número |

## 3. Consultas no Z3 (m22)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["CINCO_VERBOS_PARA_A_FRENTE",["(ca = 1) ⟹ (cb = 1)","(cb = 1) ⟹ (cc = 1)","(cc = 1) ⟹ (cd = 1)","(cd = 1) ⟹ (ce = 1)","ca = 1"],"ce = 1","SEGUE",["sat","sat","unsat"],0],
["CINCO_VERBOS_PARA_TRAS",["(ca = 1) ⟹ (cb = 1)","(cb = 1) ⟹ (cc = 1)","(cc = 1) ⟹ (cd = 1)","(cd = 1) ⟹ (ce = 1)","ce = 1"],"ca = 1","EM ABERTO",["sat","sat","sat"],0],
["IMAGEM_SEM_O_ESPIRITO",["(im = 1) ⟹ (es = 1)","es = 0"],"im = 1","CONTRADIZ",["sat","unsat","sat"],0],
["PRIMOGENITO_ENTRE_MUITOS",["pg = 1","ir > pg"],"ir ≤ 1","CONTRADIZ",["sat","unsat","sat"],0],
["BEM_PARA_QUEM_NAO_AMA",["(am = 1) ⟹ (bm = 1)","am = 0"],"bm = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **CINCO_VERBOS_PARA_A_FRENTE.** Com os quatro elos de 8:29–30 e o primeiro degrau dado, o último (glorificou) segue.
- **CINCO_VERBOS_PARA_TRAS.** O texto dá os elos só para a frente. Do último degrau não se volta ao primeiro pelas mesmas premissas. Fica EM ABERTO.
- **IMAGEM_SEM_O_ESPIRITO.** Em 2 Coríntios 3:18, a transformação na imagem é "pelo Senhor, o Espírito". Afirmar a imagem sem o Espírito **contradiz** o registro.
- **PRIMOGENITO_ENTRE_MUITOS.** "Primogênito entre muitos irmãos" (8:29). Afirmar um só **contradiz** o registro.
- **BEM_PARA_QUEM_NAO_AMA.** Romanos 8:28 diz o bem para os que amam a Deus. Para os outros, o texto não diz. Fica EM ABERTO.

## 4. Resultado da m22

1. **Cinco degraus em uma direção.** Romanos 8:30 registra uma cadeia que só anda para a frente. É a forma de degrau da língua secreta, agora com cinco elos num só versículo.
2. **O alvo é o Filho, e quem opera é o mecanismo.** A imagem é a do Filho (8:29), e a transformação nela é pelo Espírito (2 Coríntios 3:18). É a ordem da m12: o mecanismo opera sobre o que o Filho deu.
3. **O Filho é o primeiro de uma série.** "Primogênito entre muitos irmãos": ele é o primeiro de vários, não o único.
4. **Reação do mundo.** Um povo que contradiz, o dia todo (Romanos 10:21). Sem contagem.
5. **Fica EM ABERTO:**
   - voltar do último degrau ao primeiro;
   - o que 8:28 diz para quem não ama a Deus. O texto não diz.

## 5. Próximo ponto

Esperar a rodada 14 do GPT. Enquanto ela não sai, a próxima rodada desta trilha é Romanos 8:31–39: a lista do que não separa (morte, vida, anjos, presente, porvir, altura, profundidade). O teste é contar os itens e conferir o que o texto diz que não separa.

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m21 desta trilha: `59fa098d8c57b0a6ce526c1bb5690be72c97aca76fdc9ab4ff93ab2cb3070c19`.
- Commit remoto de partida: `ea90d9bfb42886769f67c557237a0714d2e7db9c`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m22 está no arquivo `.sha256` ao lado.
