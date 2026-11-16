# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m20: ajuntamento de Isaías 32–35, Atos 4:13 e 4:33 e Filipenses 4

Esta rodada fecha a caça pedida pelo usuário [S-U]: ajuntar tudo o que foi achado sobre as três passagens (m14 a m19) numa só tabela. Cada peça aparece com o número de registros achados e o que ficou EM ABERTO. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m19):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, já conferidos nas rodadas m14 a m19.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Peça | Registros achados | Contagem | Rodadas |
|---|---|---|---|
| o Espírito derramado | Isaías 32:15; Isaías 44:3; Joel 2:28; Atos 2:17; Atos 2:33 | 5 | m14, m17 |
| ordem Pai → Filho → derramamento | Atos 2:33; Gálatas 4:4–6 | 2 | m12, m17 |
| a água é o Espírito | Isaías 35:6; João 7:37–39 | 2 | m17 |
| os 4 sinais do corpo | Isaías 35:5–6; Mateus 11:5; Lucas 7:22; Mateus 9:33; Atos 3:8 | 5 | m14, m17 |
| o caminho | Isaías 35:8; João 14:6; Atos 9:2 | 3 | m17 |
| juiz, legislador e rei | Isaías 33:22; Tiago 4:12 | 2 | m14, m17 |
| fala sem estudo | João 7:15; Atos 4:13 | 2 | m15, m18 |
| a fala dada de fora | João 7:16; Mateus 10:19–20; Lucas 21:15; Atos 6:10 | 4 | m18 |
| ter estado com ele | Marcos 3:14; Atos 1:21–22; Atos 4:13 | 3 | m15, m18 |
| poder do testemunho | Atos 1:8; Atos 2:32; Atos 4:33 | 3 | m15, m18 |
| nenhum necessitado | Deuteronômio 15:4; Atos 2:44–45; Atos 4:34 | 3 | m15, m18 |
| a força vinda de fora | Filipenses 4:13; 2 Coríntios 12:9; 2 Timóteo 4:17 | 3 | m16, m19 |
| contentamento em dois estados | Filipenses 4:11–12; 2 Coríntios 6:10; 1 Timóteo 6:8 | 3 | m16, m19 |
| a paz dada | Isaías 32:17; Filipenses 4:7; João 14:27; Gálatas 5:22 | 4 | m14, m16, m19 |
| o suprimento | Filipenses 4:15–19; 2 Coríntios 11:9; 2 Coríntios 9:8 | 3 | m16, m19 |
| reação do mundo | Isaías 33:7–8; Mateus 9:34; Atos 5:17–18; Atos 7:54–58; Atos 16:22–24; Atos 17:5 | 6 | m14 a m19 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| a mesma forma em três épocas | promessa (Isaías), Filho (Evangelhos), enviados (Atos e cartas) |
| conteúdo próprio | zero em todas as peças de fala e força (D2): ensino "não é meu", "não sois vós que falais", "naquele que me fortalece" |
| ordem | sempre Pai → Filho → mecanismo, onde o texto dá a ordem (Atos 2:33; Gálatas 4:4–6; Isaías 34:16) |
| reação do mundo | registrada nas três épocas; nenhuma das 6 vezes vem com contagem dos opositores |

## 3. Consultas no Z3 (m20)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["TODA_PECA_COM_DOIS_REGISTROS",["mn = 2","mx = 6","mn ≤ mx"],"mn < 2","CONTRADIZ",["sat","unsat","sat"],0],
["SOMA_DOS_REGISTROS",["sr = 5 + 2 + 2 + 5 + 3 + 2 + 2 + 4 + 3 + 3 + 3 + 3 + 3 + 4 + 3 + 6"],"sr = 53","SEGUE",["sat","sat","unsat"],0],
["TRES_EPOCAS_MESMA_FORMA",["pr = 1","fh = 1","ev = 1","((pr = 1) ∧ (fh = 1) ∧ (ev = 1)) ⟹ (tr = 1)"],"tr = 1","SEGUE",["sat","sat","unsat"],0],
["REACAO_SEM_CONTAGEM",["nr = 6","op ≥ 0"],"op ≥ 1","EM ABERTO",["sat","sat","sat"],0],
["ABERTOS_DA_CACA",["ab = 6"],"ab = 0","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **TODA_PECA_COM_DOIS_REGISTROS.** As 16 peças da tabela têm pelo menos 2 registros cada; a menor contagem é 2. Afirmar uma peça com um registro só **contradiz** a tabela.
- **SOMA_DOS_REGISTROS.** As contagens da tabela somam 53 (5+2+2+5+3+2+2+4+3+3+3+3+3+4+3+6). O Z3 confere a soma.
- **TRES_EPOCAS_MESMA_FORMA.** A forma "derramamento" tem registro na promessa, no Filho e nos enviados. Com as três presentes, a forma atravessa as três épocas.
- **REACAO_SEM_CONTAGEM.** As 6 reações do mundo não trazem contagem dos opositores. Afirmar a contagem deles fica EM ABERTO.
- **ABERTOS_DA_CACA.** Da m14 à m19 ficaram 6 pontos EM ABERTO sem decisão nesta caça (abaixo). Afirmar que a caça fechou todos **contradiz** a contagem.

## 4. Resultado da m20

1. **Nenhuma peça das três passagens está sozinha no registro.** As 16 peças têm de 2 a 6 registros, 53 no total.
2. **A forma se repete em três épocas.** O que Isaías registra como promessa (derramamento, sinais, caminho, paz) aparece no Filho e depois nos enviados.
3. **O conteúdo próprio é zero em todas as peças de fala e força.** Isso liga Atos 4:13 a Filipenses 4:13: os dois falam de capacidade que o texto diz vir de fora.
4. **A reação do mundo aparece em toda época e nunca é contada.**
5. **Fica EM ABERTO (6 pontos):**
   - se Isaías 32:15 é o mesmo derramamento de Atos 2 (Pedro nomeia Joel);
   - quem cumpre as 6 condições de Isaías 33:15;
   - qual das duas origens explica a ousadia de Atos 4:13;
   - se Atos 4:34 cumpre Deuteronômio 15:4;
   - se "aquele que me fortalece" (Filipenses 4:13) é o Filho ou o mecanismo;
   - se os da Macedônia de 2 Coríntios 11:9 são os filipenses de Filipenses 4:15.

## 5. Próximo ponto

Com a caça ajuntada, a trilha volta à rodada do GPT. A rodada 13 do GPT anuncia Romanos 8:26–27 (a intercessão do Espírito) e 8:34 (a intercessão do Cristo). O teste é se há dois intercessores sobre o mesmo pedido, como as duas testemunhas da m13, ou se são funções diferentes, como os dois envios da m12.

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m19 desta trilha: `30f3ab8ddbe311b3dbe75909d270a5108086040b507d4ac65b917594ddc13da8`.
- Commit remoto de partida: `8eb8a696165ebdcb50eabaae8e26074adee4d6e7`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m20 está no arquivo `.sha256` ao lado.
