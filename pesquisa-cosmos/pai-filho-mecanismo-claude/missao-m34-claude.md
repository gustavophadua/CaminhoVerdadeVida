# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m34: o tempo da volta de Isaías 35:10 e a trama de 32:7, caçados no livro inteiro

Esta rodada continua o pedido do usuário [S-U] de completar tudo sobre Isaías. Ela pega os dois últimos pontos de Isaías que a m30 deixou EM ABERTO: o tempo da volta de 35:10 e a trama de 32:7. A busca cobre o livro inteiro (66 capítulos). A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m33):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados no texto. A busca foi mecânica: as palavras "voltarão", "anos", "naquele dia" e "Ciro" em todos os versos de Isaías, e as passagens em que alguém age contra o pobre com palavras, na Bíblia Livre (edição de 2018, CC BY 4.0).
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

**A volta:**

| Verso | O que o texto registra | Referência |
|---|---|---|
| 35:10 | "os resgatados do SENHOR voltarão, e virão a Sião com júbilo"; tristeza e gemido fugirão | Isaías 35:10 |
| 51:11 | a mesma frase, quase palavra por palavra: "voltarão os resgatados do SENHOR, e virão a Sião cantando" | Isaías 51:11 |
| 11:11 | "o Senhor voltará a pôr sua mão para adquirir **de novo**" os restantes, de 8 lugares: Assíria, Egito, Patros, Cuxe, Elão, Sinear, Hamate e as ilhas do mar | Isaías 11:11 |
| 11:16 | haverá um caminho para os restantes da Assíria, "assim como aconteceu a Israel, no dia em que subiu da terra do Egito" | Isaías 11:16 |
| 27:13 | "uma grande trombeta será tocada"; voltarão os perdidos na Assíria e os lançados ao Egito | Isaías 27:13 |
| 43:5–6 | a semente vem de 4 direções: oriente, ocidente, norte e sul | Isaías 43:5–6 |
| 48:20 | "Saí da Babilônia, fugi dos caldeus" | Isaías 48:20 |
| 44:28; 45:1; 45:13 | Ciro tem nome no texto: dirá a Jerusalém "Serás edificada" e "soltará meus cativos; não por preço" | Isaías 44:28; 45:1; 45:13 |

**O tempo:**

| Verso | O que o texto registra | Referência |
|---|---|---|
| 11:11; 27:13 | a volta é "naquele dia", sem data | Isaías 11:11; 27:13 |
| 8 versos | a palavra "anos" está em 8 versos de Isaías (7:8; 16:14; 23:15; 23:17; 38:5; 38:10; 38:15; 65:20). Nenhum deles conta anos para a volta | Isaías 7:8; 16:14; 23:15 |
| Esdras 1:1–3 | no primeiro ano de Ciro saiu a ordem de subir a Jerusalém, "para que se cumprisse a palavra do SENHOR pela boca de Jeremias" | Esdras 1:1–3 |

**A trama de 32:7:**

| Verso | O que o texto registra | Referência |
|---|---|---|
| 32:7 | o avarento "trama planos malignos para destruir aos aflitos com palavras falsas, mesmo quando o pobre fala com justiça" | Isaías 32:7 |
| 10:1–2 | decretos injustos e escritos opressivos, "para afastarem aos pobres de seu direito" | Isaías 10:1–2 |
| 29:21 | acusam "por meio de palavras" e armam ciladas contra quem repreende na porta | Isaías 29:21 |
| 59:4 | "falam mentiras"; ninguém defende causa pela verdade | Isaías 59:4 |
| 29:20; 32:8 | o fim: "todos os que gostam de maldade serão extintos"; "o nobre... em coisas nobres ele permanece" | Isaías 29:20; 32:8 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| referência com nome | Ciro (44:28; 45:1): a volta da Babilônia tem um agente nomeado no próprio livro |
| contagem | "de novo" em 11:11, com o Egito como a primeira vez em 11:16: são pelo menos duas voltas |
| mesma frase duas vezes | 35:10 e 51:11: o livro repete o registro em dois lugares |
| instrumento da trama | a palavra: falsa (32:7), escrita (10:1), de acusação (29:21), mentirosa (59:4) |
| o que falta | um número de anos para a volta de 35:10; e o conteúdo do plano de 32:7 |

## 3. Consultas no Z3 (m34)

Foram 7 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["MESMA_FRASE_EM_DOIS_LUGARES",["fa = 1","fb = 1","ft = fa + fb"],"ft = 2","SEGUE",["sat","sat","unsat"],0],
["PELO_MENOS_DUAS_VOLTAS",["ve = 1","vn ≥ 1","vt = ve + vn"],"vt ≥ 2","SEGUE",["sat","sat","unsat"],0],
["OITO_LUGARES_E_QUATRO_DIRECOES",["lu = 8","di = 4","og = lu + di"],"og = 12","SEGUE",["sat","sat","unsat"],0],
["ANOS_SEM_A_VOLTA",["an = 8","av = 0","an = av + ao"],"ao = 8","SEGUE",["sat","sat","unsat"],0],
["ESDRAS_NOMEIA_JEREMIAS",["jr = 1","k × (1 − k) = 0"],"k = 1","EM ABERTO",["sat","sat","sat"],0],
["PALAVRA_COMO_INSTRUMENTO",["pt = 4","pp = 4","pt = pp + px"],"px = 0","SEGUE",["sat","sat","unsat"],0],
["NEGAR_O_FIM_DA_TRAMA",["fm = 1"],"fm = 0","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **MESMA_FRASE_EM_DOIS_LUGARES.** A frase da volta está em 35:10 e em 51:11. São 2 registros.
- **PELO_MENOS_DUAS_VOLTAS.** 11:16 registra a subida do Egito; 11:11 diz "de novo". Uma vez mais outra são pelo menos 2.
- **OITO_LUGARES_E_QUATRO_DIRECOES.** 11:11 nomeia 8 lugares e 43:5–6 nomeia 4 direções. O Z3 confere que são 12 origens escritas.
- **ANOS_SEM_A_VOLTA.** Dos 8 versos com a palavra "anos", nenhum conta anos para a volta. Os 8 ficam todos do outro lado.
- **ESDRAS_NOMEIA_JEREMIAS.** Esdras 1:1 dá Jeremias como a palavra que se realizou no primeiro ano de Ciro. Nenhum verso diz que essa subida é a volta de Isaías 35:10. Só com o texto, fica EM ABERTO.
- **PALAVRA_COMO_INSTRUMENTO.** Nas 4 passagens da trama (32:7; 10:1–2; 29:21; 59:4), o instrumento é a palavra. O Z3 confere que são 4 de 4.
- **NEGAR_O_FIM_DA_TRAMA.** 29:20 registra que os que gostam de maldade serão extintos. Dizer que a trama dura para sempre **contradiz** o verso.

## 4. Resultado da m34

1. **A volta de 35:10 está escrita duas vezes** (35:10 e 51:11) e o livro registra pelo menos duas voltas: a do Egito e a "de novo".
2. **As origens têm nome:** 8 lugares em 11:11 e 4 direções em 43:5–6. A Babilônia aparece em 48:20, com Ciro nomeado como agente.
3. **O livro não dá número de anos para a volta.** A palavra "anos" está em 8 versos, e nenhum é sobre ela. O tempo é "naquele dia".
4. **Fora de Isaías, a subida do tempo de Ciro está registrada em Esdras 1, que nomeia Jeremias.** É a mesma forma da m32, onde Atos 2 nomeia Joel: o registro de fora aponta para outro profeta.
5. **A trama de 32:7 tem instrumento e fim registrados.** O instrumento é a palavra, em 4 passagens. O fim está em 29:20.
6. **Fica EM ABERTO:**
   - quando é a volta de 35:10, e se a subida de Esdras 1 é ela;
   - qual é o plano concreto do avarento em 32:7.

## 5. Próximo ponto

Os registros físicos de Isaías (os céus estendidos, as estrelas numeradas, a chuva que desce, a sombra que volta, os céus que se desfazem), postos ao lado das leis de conservação e de desgaste do modelo do usuário [S-U].

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m33 desta trilha: `ee8808034c2d925e3603032a7a260fc2f696b1aa295d4620c6b7543e78b9b385`.
- Commit remoto de partida: `f643ae487b08071f34b4dd681d28bb1087dc5652`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m34 está no arquivo `.sha256` ao lado.
