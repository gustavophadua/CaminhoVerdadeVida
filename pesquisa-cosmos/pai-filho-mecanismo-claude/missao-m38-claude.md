# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m38: os 45 versos de Isaías com a palavra rei, classificados

Esta rodada continua o pedido do usuário [S-U] de completar tudo sobre Isaías e fecha a tarefa que a m31 deixou: classificar os 45 versos com a palavra "rei" que ela não classificou. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m37):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados no texto. A busca foi mecânica: a palavra "rei" nos 52 versos de Isaías, tirados os 7 da m31, e cada verso separado pelo nome do rei no próprio verso, na Bíblia Livre (edição de 2018, CC BY 4.0).
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

A m31 achou 52 versos de Isaías com a palavra "rei". Cinco nomeiam o Rei como o SENHOR e dois deixam o rei sem nome (32:1 e 33:17). Esta rodada classifica os outros 45.

**Critério mecânico.** Um verso conta como "nomeado" quando diz, no próprio verso, o nome do rei ou "rei de" um lugar. Um verso pode entrar em mais de um grupo.

| Grupo | Versos | Exemplos |
|---|---|---|
| rei da Assíria (Sargom, Senaqueribe, "o grande rei") | 24 | 7:20; 8:7; 10:12; 20:1; 36:1; 37:37; 38:6 |
| reis de Judá (Uzias, Acaz, Ezequias, "rei de Judá") | 17 | 6:1; 7:1; 14:28; 36:1; 37:1; 38:9; 39:3 |
| rei da Babilônia | 3 | 14:4; 39:1; 39:7 |
| outros reis (Síria, Israel, Faraó do Egito, Cuxe, Hamate, Arpade, Sefarvaim, o filho de Tabeal) | 5 | 7:1; 7:6; 36:6; 37:9; 37:13 |

**Versos sem nome no próprio verso (7):**

| Verso | O que diz | Nome no vizinho? |
|---|---|---|
| 36:21 | "tinham ordem do rei" | sim: Ezequias (36:22) |
| 37:5 | "os servos do rei vieram até Isaías" | sim: Ezequias (37:1) |
| 8:21 | "amaldiçoarão ao seu rei e ao seu Deus" | não |
| 19:4 | "um rei rigoroso dominará sobre eles" (os egípcios) | não |
| 23:15 | "setenta anos, como dias de um rei" (comparação) | não |
| 30:33 | Tofete "já está pronta para o rei" | não; 30:31 fala da Assíria, sem dizer "rei" |
| 57:9 | "foste ao rei com óleo" | não |

Contagem: 38 nomeados no verso, 2 pelo verso vizinho, 5 sem nome.

**As duas marcas do rei de 32:1:**
- A palavra "justiça" não aparece em nenhum dos 45 versos.
- O SENHOR aparece em 10 dos 45 versos e em nenhum deles é chamado de rei.

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| o que o livro chama de rei | na maior parte, reis humanos com nome: os de Judá e os das nações (Assíria, Babilônia, Egito, Síria) |
| o Rei com maiúscula | só nos 5 versos da m31, e todos dizem "o SENHOR" |
| a marca do rei de 32:1 | a justiça; ela não aparece em nenhum dos 45 |
| o rei estrangeiro | aparece como instrumento ou como ameaça: "navalha alugada… por meio do rei da Assíria" (7:20); "rei rigoroso" (19:4) |

## 3. Consultas no Z3 (m38)

Foram 7 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["QUARENTA_E_CINCO_SEPARADOS",["rt = 45","rn = 38","rc = 2","rt = rn + rc + rs"],"rs = 5","SEGUE",["sat","sat","unsat"],0],
["NENHUM_DOS_45_COM_JUSTICA",["jt = 45","jj = 0","jt = jj + jo"],"jo = 45","SEGUE",["sat","sat","unsat"],0],
["ASSIRIA_MAIS_QUE_JUDA",["ra = 24","rj = 17"],"ra > rj","SEGUE",["sat","sat","unsat"],0],
["NEGAR_REI_RIGOROSO",["rr = 1"],"rr = 0","CONTRADIZ",["sat","unsat","sat"],0],
["NENHUM_DOS_45_NOMEIA_O_SENHOR_REI",["sr = 0"],"sr ≥ 1","CONTRADIZ",["sat","unsat","sat"],0],
["CONTINUAM_DOIS_CANDIDATOS",["cv = 2","cn = 0","ct = cv + cn"],"ct = 2","SEGUE",["sat","sat","unsat"],0],
["REI_DE_TOFETE_SEM_NOME",["tf = 1","k × (1 − k) = 0"],"k = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **QUARENTA_E_CINCO_SEPARADOS.** Os 45 versos se dividem em 38 nomeados no verso, 2 nomeados no vizinho e 5 sem nome. O Z3 confere a conta.
- **NENHUM_DOS_45_COM_JUSTICA.** Nenhum dos 45 tem a palavra "justiça".
- **ASSIRIA_MAIS_QUE_JUDA.** O rei mais citado entre os 45 é o da Assíria (24 versos), à frente dos reis de Judá (17).
- **NEGAR_REI_RIGOROSO.** Dizer que todo rei do livro reina com justiça **contradiz** 19:4.
- **NENHUM_DOS_45_NOMEIA_O_SENHOR_REI.** Dizer que algum dos 45 chama o SENHOR de rei **contradiz** a contagem.
- **CONTINUAM_DOIS_CANDIDATOS.** Os 45 não acrescentam candidato: para 32:1 e 33:17 continuam as duas linhas da m31 (o SENHOR que reina e o trono de Davi).
- **REI_DE_TOFETE_SEM_NOME.** O rei de 30:33 fica sem nome no texto. Fica EM ABERTO.

## 4. Resultado da m38

1. **Os 45 versos estão classificados.** São 38 com nome no verso, 2 com nome no vizinho e 5 sem nome.
2. **Nenhum deles é o rei de 32:1.** Nenhum tem a marca da justiça, e nenhum chama o SENHOR de rei.
3. **O ponto da m31 fica mais estreito.** Os candidatos para 32:1 e 33:17 continuam sendo só os dois já registrados. A busca no livro inteiro não achou um terceiro.
4. **O rei da Assíria é o rei humano mais citado em Isaías** (24 dos 45). No livro ele aparece como instrumento, "a navalha alugada" (7:20).
5. **Fica EM ABERTO:**
   - quem é o rei de 30:33, de 8:21, de 19:4 e de 57:9 (23:15 é comparação);
   - quem é o rei de 32:1 e 33:17 entre as duas linhas (ponto da m31, agora sem candidato novo).

## 5. Próximo ponto

Os 6 pontos da m30 fora de Isaías: a ousadia de Atos 4:13, Atos 4:34 e Deuteronômio 15:4, "aquele que me fortalece", a Macedônia de 2 Coríntios 11:9, os que davam glória em Atos 4:21 e os da casa de César em Filipenses 4:22.

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m37 desta trilha: `1d0f71e392ee345af9d92652c3c3648082739fd337da473a21bc4646f64b14e6`.
- Commit remoto de partida: `93f804d30cb8eabd9ad2983a27ab35c5170a094a`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m38 está no arquivo `.sha256` ao lado.
