# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m27: Isaías 35 completo, verso a verso (1–10)

Esta rodada segue o próximo ponto da m26: completar Isaías 35, verso a verso, como pediu o usuário [S-U]. A m14 e a m17 usaram os versos 3, 5, 6, 8 e 10. Aqui entram os 10 versos, comparados com o que Isaías 33 e 34 registraram dos mesmos lugares. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m26):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Verso | O que o texto registra | Referência |
|---|---|---|
| 1 | o deserto e a terra seca se alegrarão; o ermo exultará e florescerá como a flor do campo | Isaías 35:1 |
| 2 | florescerá muito, com alegria e canto; a glória do Líbano lhe será dada, e o esplendor do Carmelo e de Sarom; verão a glória do Senhor | Isaías 35:2 |
| 3 | fortalecei as mãos fracas e firmai os joelhos que vacilam | Isaías 35:3 |
| 4 | dizei aos de coração aflito: sede fortes, não temais; eis o vosso Deus; ele vem com retribuição e vos salvará | Isaías 35:4 |
| 5 | então os olhos dos cegos se abrirão, e os ouvidos dos surdos se desimpedirão | Isaías 35:5 |
| 6 | o coxo saltará como cervo, e a língua do mudo cantará; águas brotarão no deserto e ribeiros no ermo | Isaías 35:6 |
| 7 | a areia quente vira lago, e a terra sedenta, fontes; onde viviam chacais, haverá erva, canas e juncos | Isaías 35:7 |
| 8 | haverá ali uma estrada, chamada Caminho Santo; o impuro não passará por ela; ela é para os que andam no caminho; os simples não se perderão nele | Isaías 35:8 |
| 9 | ali não haverá leão, nem fera subirá por ele; os resgatados andarão por ele | Isaías 35:9 |
| 10 | os resgatados do Senhor voltarão e virão a Sião com canto; alegria eterna sobre a cabeça; tristeza e gemido fugirão | Isaías 35:10 |
| antes, os mesmos lugares | o Líbano se envergonha e seca, Sarom vira deserto, Basã e Carmelo perdem as folhas | Isaías 33:9 |
| antes, os chacais | os palácios de Edom viram morada de chacais | Isaías 34:13 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| troca de estado | Líbano, Carmelo e Sarom: secos em 33:9, com a glória dada em 35:2 |
| troca de morada | lugar de chacais (34:13) → erva, canas e juncos (35:7) |
| corpo | os 4 sinais (v5–6), já achados todos na m17 |
| água | no deserto (v6–7); a água é o Espírito pelo texto de João 7:39 (m17) |
| caminho | um só, nomeado, onde os simples não se perdem e não há fera (v8–9) |
| quem vem | "ele vem e vos salvará" (v4) |
| contagem de um lado (m01, m04) | os resgatados voltam (v10), sem número; o impuro não passa (v8), sem número |

## 3. Consultas no Z3 (m27)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["TRES_LUGARES_QUE_VOLTAM",["la = 1","lb = 1","lc = 1","nl = la + lb + lc"],"nl < 3","CONTRADIZ",["sat","unsat","sat"],0],
["MORADA_DOS_CHACAIS_TROCADA",["ea = 0","eb = 1"],"ea = eb","CONTRADIZ",["sat","unsat","sat"],0],
["ELE_VEM_E_SALVA",["(vd = 1) ⟹ (sv = 1)","vd = 1"],"sv = 1","SEGUE",["sat","sat","unsat"],0],
["SIMPLES_NAO_SE_PERDEM",["sp = 1","(sp = 1) ⟹ (ex = 0)"],"ex = 1","CONTRADIZ",["sat","unsat","sat"],0],
["QUANDO_OS_RESGATADOS_VOLTAM",["vt = 1","tv ≥ 0"],"tv ≤ 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **TRES_LUGARES_QUE_VOLTAM.** Líbano, Carmelo e Sarom estão secos em 33:9 e recebem a glória em 35:2. Afirmar menos de três lugares em comum **contradiz** os dois versos.
- **MORADA_DOS_CHACAIS_TROCADA.** Em 34:13, morada de chacais; em 35:7, onde viviam chacais há erva. Afirmar o mesmo estado nos dois **contradiz** o registro.
- **ELE_VEM_E_SALVA.** O verso 4: ele vem e vos salvará. Com a vinda, a salvação segue.
- **SIMPLES_NAO_SE_PERDEM.** O verso 8: os simples não se perdem no caminho. Afirmar que se perdem **contradiz** o registro.
- **QUANDO_OS_RESGATADOS_VOLTAM.** O verso 10 registra a volta, mas não o tempo. Fica EM ABERTO.

## 4. Resultado da m27

1. **Isaías 35 completo tem 10 versos, e quase todos desfazem algo de Isaías 33 ou 34.** Os lugares secos recebem glória (33:9 → 35:2), a morada de chacais vira erva (34:13 → 35:7), e a estrada deserta onde ninguém passa (33:8; 34:10) vira caminho por onde os resgatados passam (35:8–10).
2. **O corpo é corrigido no mesmo capítulo da água.** Os 4 sinais (v5–6) vêm no mesmo verso das águas no deserto (v6).
3. **O caminho é para os simples.** Não se perdem nele (v8). A formação não é condição, como em Atos 4:13 (m15).
4. **Quem vem e salva.** "Ele vem" (v4).
5. **Fica EM ABERTO:** o tempo da volta (v10).

## 5. Próximo ponto

Com Isaías 32–35 completo (m24 a m27), a m28 completa Atos 4:13 e 4:33 com os versos em volta, verso a verso (4:13–22 e 4:23–37).

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m26 desta trilha: `bd3c3b3b7647d437e646f8459ee40dc72be5f85656e0526abf16abb2454102cb`.
- Commit remoto de partida: `e6631c2aa5fec59adcf64ea95088d09432c99563`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m27 está no arquivo `.sha256` ao lado.
