# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m26: Isaías 34 completo, verso a verso (1–17)

Esta rodada segue o próximo ponto da m25: completar Isaías 34, verso a verso, como pediu o usuário [S-U]. A m14 e a m17 usaram só os versos 2, 4, 8, 10 e 16. Aqui entram os 17 versos. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m25):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Verso | O que o texto registra | Referência |
|---|---|---|
| 1 | chegai-vos, nações, para ouvir; povos, escutai; ouça a terra e o que a enche, o mundo e tudo o que dele sai | Isaías 34:1 |
| 2 | o Senhor está indignado contra todas as nações e contra todo o exército delas; destinou-as à destruição | Isaías 34:2 |
| 3 | os mortos são lançados fora, o mau cheiro sobe dos cadáveres, os montes se desfazem com o sangue | Isaías 34:3 |
| 4 | todo o exército dos céus se desfaz; os céus se enrolam como um livro; o exército cai como folha da videira e fruto da figueira | Isaías 34:4 |
| 5 | a espada se embriagou no céu e desce sobre Edom, o povo destinado à destruição | Isaías 34:5 |
| 6 | a espada está cheia de sangue e gordura de cordeiros e bodes; sacrifício em Bozra, grande matança em Edom | Isaías 34:6 |
| 7 | os bois selvagens caem com eles; a terra fica embebida de sangue | Isaías 34:7 |
| 8 | é o dia da vingança do Senhor, o ano de retribuição pela causa de Sião | Isaías 34:8 |
| 9 | os ribeiros viram piche, o pó vira enxofre, a terra vira piche ardente | Isaías 34:9 |
| 10 | não se apaga nem de noite nem de dia; a fumaça sobe para sempre; ficará deserta de geração em geração; ninguém passará por ela | Isaías 34:10 |
| 11 | o pelicano e o ouriço a possuirão, a coruja e o corvo habitarão nela; estende-se sobre ela o cordel da confusão e o prumo do vazio | Isaías 34:11 |
| 12 | os nobres não terão ali reino para proclamar; todos os príncipes serão nada | Isaías 34:12 |
| 13 | espinhos nos palácios, urtigas e cardos nas fortalezas; morada de chacais e pátio de avestruzes | Isaías 34:13 |
| 14 | feras do deserto se encontram com hienas, o bode selvagem chama o companheiro, e ali repousa a criatura da noite | Isaías 34:14 |
| 15 | a coruja faz o ninho, põe, choca e ajunta os filhotes à sua sombra; ali se ajuntam os abutres, cada um com a sua companheira | Isaías 34:15 |
| 16 | buscai no livro do Senhor e lede: nenhuma delas faltará, nenhuma ficará sem companheira; a boca dele ordenou, e o Espírito dele as ajuntou | Isaías 34:16 |
| 17 | ele lançou as sortes por elas, e a mão dele repartiu a terra com o cordel; elas a possuirão para sempre, de geração em geração | Isaías 34:17 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| chamado | nações, povos, terra e mundo chamados a ouvir (v1) |
| alcance anunciado | todas as nações (v2); lugar descrito: Edom e Bozra (v5–6) |
| céu | o exército dos céus cai, e os céus se enrolam como livro (v4) |
| sem apagar | nem noite nem dia (v10) |
| cordel | aparece duas vezes: o cordel da confusão (v11) e o cordel da partilha (v17) |
| governo | os nobres sem reino para proclamar, os príncipes em nada (v12) |
| referência | o livro: "buscai e lede", nenhuma faltará (v16) |
| ajuntamento | a boca ordena, o Espírito ajunta (v16), e a mão reparte (v17) |
| contagem de um lado (m01, m04) | o texto conta que nenhuma ave falta e nenhuma fica sem companheira, mas não conta os mortos (v3) |

## 3. Consultas no Z3 (m26)

Foram 6 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["CORDEL_DUAS_VEZES",["ka = 1","kb = 1","nk = ka + kb"],"nk < 2","CONTRADIZ",["sat","unsat","sat"],0],
["NENHUMA_SEM_COMPANHEIRA",["sc = 0"],"sc ≥ 1","CONTRADIZ",["sat","unsat","sat"],0],
["NEM_NOITE_NEM_DIA",["an = 0","ad = 0"],"an + ad ≥ 1","CONTRADIZ",["sat","unsat","sat"],0],
["LIDO_NO_LIVRO_CONFERIDO",["(ld = 1) ⟹ (cf = 1)","ld = 1"],"cf = 1","SEGUE",["sat","sat","unsat"],0],
["NINGUEM_PASSA",["np = 0"],"np ≥ 1","CONTRADIZ",["sat","unsat","sat"],0],
["TODAS_AS_NACOES_E_SO_EDOM",["ed = 1","tn ≥ 0","tn ≤ 1"],"tn = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **CORDEL_DUAS_VEZES.** O cordel aparece no verso 11 (confusão) e no verso 17 (partilha). Afirmar menos de dois registros **contradiz** a contagem.
- **NENHUMA_SEM_COMPANHEIRA.** O verso 16: nenhuma falta, nenhuma fica sem companheira. Afirmar uma ou mais sem companheira **contradiz** a contagem registrada.
- **NEM_NOITE_NEM_DIA.** O verso 10: não se apaga nem de noite nem de dia. Afirmar que se apaga em algum dos dois **contradiz** o registro.
- **LIDO_NO_LIVRO_CONFERIDO.** O verso 16 manda buscar no livro e ler, e diz que nenhuma faltará. Com a leitura feita, a conferência segue. É a referência escrita, como a moeda da m02.
- **NINGUEM_PASSA.** O verso 10: ninguém passará por ela. Afirmar um ou mais passantes **contradiz** o registro.
- **TODAS_AS_NACOES_E_SO_EDOM.** O verso 2 anuncia contra todas as nações, mas os versos 5–6 descrevem só Edom e Bozra. O capítulo não descreve as outras. Fica EM ABERTO.

## 4. Resultado da m26

1. **Isaías 34 completo tem 17 versos em três partes.** Chamado e juízo do céu e das nações (v1–4), Edom (v5–15) e o livro com a partilha (v16–17).
2. **O mesmo instrumento mede as duas coisas.** O cordel mede a confusão (v11) e mede a partilha (v17).
3. **Os nobres ficam sem reino.** Não têm reino para proclamar (v12). É o contrário de Isaías 32:1, onde príncipes governam com retidão.
4. **A conferência é pelo livro.** "Buscai e lede" (v16). A contagem registrada é a das aves: nenhuma falta.
5. **Ordem, ajuntamento e partilha.** A boca ordena, o Espírito ajunta, a mão reparte (v16–17). São três funções em sequência, como na m14.
6. **Fica EM ABERTO:** as outras nações do verso 2. O capítulo só descreve Edom.

## 5. Próximo ponto

A m27 completa Isaías 35, verso a verso (1–10).

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m25 desta trilha: `05d263443fb783bd74d1596562769b91787173f0e26a5df0cf8f16ea41a38c0e`.
- Commit remoto de partida: `f92e151e6e23d7cd2b782c3b2857efce5e444456`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m26 está no arquivo `.sha256` ao lado.
