# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m24: Isaías 32 completo, verso a verso (1–20)

Esta rodada abre o trabalho pedido pelo usuário [S-U]: completar os versículos da caça, verso a verso. A m14 usou só parte de Isaías 32. Aqui entram os 20 versos do capítulo, cada um com o que registra. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m23):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Verso | O que o texto registra | Referência |
|---|---|---|
| 1 | um rei reinará com justiça, e príncipes governarão com retidão | Isaías 32:1 |
| 2 | cada um será abrigo contra o vento, refúgio contra a tempestade, correntes de água em terra seca e sombra de grande rocha em terra cansada | Isaías 32:2 |
| 3 | os olhos dos que veem não se ofuscarão, e os ouvidos dos que ouvem estarão atentos | Isaías 32:3 |
| 4 | o coração dos precipitados entenderá, e a língua dos gagos falará pronta e claramente | Isaías 32:4 |
| 5 | o louco não será mais chamado nobre, nem o enganador chamado generoso | Isaías 32:5 |
| 6 | o louco fala loucura, trama o mal, fala erro contra o Senhor, deixa vazio o faminto e tira a bebida do sedento | Isaías 32:6 |
| 7 | o enganador trama arruinar os pobres com palavras falsas, mesmo quando o necessitado fala o que é reto | Isaías 32:7 |
| 8 | o nobre planeja coisas nobres e nelas permanece | Isaías 32:8 |
| 9 | mulheres despreocupadas, levantai-vos e ouvi; filhas confiadas, escutai | Isaías 32:9 |
| 10 | daqui a pouco mais de um ano tremereis; a vindima falhará e a colheita não virá | Isaías 32:10 |
| 11 | tremei, despi-vos, cingi os lombos | Isaías 32:11 |
| 12 | batei no peito pelos campos agradáveis e pela vinha frutífera | Isaías 32:12 |
| 13 | sobre a terra do meu povo crescerão espinhos e sarças, também sobre as casas de alegria | Isaías 32:13 |
| 14 | o palácio será abandonado, a cidade cheia ficará deserta; colina e torre de vigia viram covas para sempre, pasto de rebanhos | Isaías 32:14 |
| 15 | até que se derrame sobre nós o Espírito do alto; então o deserto vira pomar, e o pomar é tido por bosque | Isaías 32:15 |
| 16 | o direito habitará no deserto, e a justiça morará no pomar | Isaías 32:16 |
| 17 | o efeito da justiça será paz; o fruto da justiça, repouso e segurança para sempre | Isaías 32:17 |
| 18 | o meu povo habitará em morada de paz, em moradas seguras, em lugares tranquilos | Isaías 32:18 |
| 19 | mas a saraiva cairá sobre o bosque, e a cidade será abatida | Isaías 32:19 |
| 20 | felizes os que semeiam junto a todas as águas e deixam livres o boi e o jumento | Isaías 32:20 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| governo | rei e príncipes com justiça (v1); cada um vira abrigo, com 4 abrigos registrados (v2) |
| sensores | olhos, ouvidos, coração e língua corrigidos (v3–4) |
| rótulo | o rótulo volta a ser igual ao conteúdo: o louco não é mais chamado nobre (v5) |
| o fato não fixa a reação | o necessitado fala o que é reto, e o enganador trama assim mesmo (v7) |
| ordem do capítulo | desolação (v13–14) → Espírito do alto (v15) → direito, justiça, paz (v16–18) → queda do bosque e da cidade (v19) → semeadura (v20) |
| contagem de um lado (m01, m04) | o texto chama as despreocupadas (v9), mas não as conta; também não conta o povo em paz (v18) |

## 3. Consultas no Z3 (m24)

Foram 6 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["QUATRO_ABRIGOS",["ab = 4"],"ab < 4","CONTRADIZ",["sat","unsat","sat"],0],
["ROTULO_VOLTA_AO_CONTEUDO",["rl = ct","ct = 0"],"rl = 1","CONTRADIZ",["sat","unsat","sat"],0],
["TRAMA_CONTRA_QUEM_FALA_RETO",["fr = 1","tm = 1","pa ≥ 0","pa ≤ 1"],"pa = 1","EM ABERTO",["sat","sat","sat"],0],
["NOBRE_PERMANECE",["(nb = 1) ⟹ (pm = 1)","nb = 1"],"pm = 1","SEGUE",["sat","sat","unsat"],0],
["QUEDA_DEPOIS_DA_PAZ",["qd = 1"],"qd = 0","CONTRADIZ",["sat","unsat","sat"],0],
["SEMEAR_JUNTO_AS_AGUAS",["(sm = 1) ⟹ (fz = 1)","sm = 1"],"fz = 1","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **QUATRO_ABRIGOS.** O verso 2 registra vento, tempestade, água em terra seca e sombra. Afirmar menos de 4 abrigos **contradiz** a contagem.
- **ROTULO_VOLTA_AO_CONTEUDO.** O verso 5 diz que o louco não será mais chamado nobre: o rótulo passa a ser igual ao conteúdo. Com conteúdo zero, afirmar o rótulo de nobre **contradiz** o registro. É a TROCA de rótulo da m04 e da m05, desfeita.
- **TRAMA_CONTRA_QUEM_FALA_RETO.** O verso 7 registra a trama mesmo quando o necessitado fala o que é reto. O texto não diz se a trama tem efeito. Fica EM ABERTO.
- **NOBRE_PERMANECE.** O verso 8: o nobre planeja coisas nobres e nelas permanece. Dado o nobre, o permanecer segue.
- **QUEDA_DEPOIS_DA_PAZ.** O verso 19 registra a queda do bosque e da cidade depois dos versos da paz. Afirmar que o capítulo termina sem queda **contradiz** o registro.
- **SEMEAR_JUNTO_AS_AGUAS.** O verso 20 liga semear junto a todas as águas a ser feliz. Com a semeadura, segue.

## 4. Resultado da m24

1. **Isaías 32 completo tem 20 versos em quatro blocos.** Governo e sensores (v1–8), chamado às despreocupadas (v9–14), o Espírito e a paz (v15–18), queda e semeadura (v19–20).
2. **Os sensores são corrigidos antes do mecanismo.** Olhos, ouvidos, coração e língua (v3–4) estão nos versos do governo justo. O Espírito do alto vem no verso 15.
3. **O rótulo volta a ser igual ao conteúdo.** O verso 5 desfaz a troca de rótulo: louco não é nobre.
4. **O fato reto não fixa a reação.** O verso 7 tem a mesma forma da m11: o necessitado fala reto, e a trama segue.
5. **O capítulo não termina na paz.** O verso 19 registra queda depois dos versos da paz, e o verso 20 fecha com semeadura.
6. **Fica EM ABERTO:**
   - se a trama do verso 7 tem efeito;
   - quem é o rei do verso 1. O capítulo não diz o nome.

## 5. Próximo ponto

A m25 completa Isaías 33, verso a verso (1–24).

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m23 desta trilha: `4a2d68890ee4a2e53abd711c44e5dca80462510e1fcc20dc323908aea153fcae`.
- Commit remoto de partida: `626c8c04aed83d98daaa0ae26fdfc67aabd4ea34`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m24 está no arquivo `.sha256` ao lado.
