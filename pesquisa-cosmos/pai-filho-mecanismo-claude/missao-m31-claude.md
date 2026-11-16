# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m31: o rei de Isaías 32:1 e 33:17, caçado no livro inteiro

Esta rodada começa o pedido do usuário [S-U] de completar tudo sobre Isaías. Ela pega dois pontos que a m30 deixou EM ABERTO, o rei de 32:1 e o rei de 33:17, e procura no livro inteiro (66 capítulos) o que o texto registra sobre quem reina. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m30):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados no texto. A busca foi mecânica: a palavra "rei" em todos os versos de Isaías, na Bíblia Livre (edição de 2018, CC BY 4.0).
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

A palavra "rei" aparece em 52 versos de Isaías. Cinco deles dizem quem é o Rei:

| Verso | O que o texto registra | Referência |
|---|---|---|
| 6:5 | "meus olhos viram ao Rei, o SENHOR dos exércitos" | Isaías 6:5 |
| 33:22 | o SENHOR é juiz, legislador e Rei; "ele nos salvará" | Isaías 33:22 |
| 41:21 | quem fala é o SENHOR, "o Rei de Jacó" | Isaías 41:21 |
| 43:15 | "Eu sou o SENHOR, vosso Santo; o Criador de Israel, o vosso Rei" | Isaías 43:15 |
| 44:6 | "o SENHOR, Rei de Israel, e seu Redentor" | Isaías 44:6 |

Dois deixam o rei sem nome. São os dois pontos EM ABERTO da m30:

| Verso | O que o texto registra | Referência |
|---|---|---|
| 32:1 | "um rei reinará com justiça, e príncipes governarão conforme o juízo" | Isaías 32:1 |
| 33:17 | "Teus olhos verão o rei em sua formosura" | Isaías 33:17 |

Os outros 45 versos com a palavra não foram classificados nesta rodada. Entre eles estão os reis com nome próprio (Uzias em 6:1; Ezequias e o rei da Assíria em 36–39).

Fora da palavra "rei", o livro registra o reinado em duas linhas:

| Linha | O que o texto registra | Referência |
|---|---|---|
| o SENHOR reina | "quando o SENHOR dos exércitos reinar no monte de Sião" | Isaías 24:23 |
| o SENHOR reina | "Teu Deus reina!" | Isaías 52:7 |
| trono de Davi | um menino nasce; o governo está sobre seus ombros; o trono de Davi é firmado "com juízo e justiça", sem fim | Isaías 9:6–7 |
| trono de Davi | uma vara brota do tronco de Jessé; o Espírito do SENHOR repousa sobre ele; ele "julgará com justiça" | Isaías 11:1–4 |
| trono de Davi | "no tabernáculo de Davi" se sentará um que julgue e "se apresse para a justiça" | Isaías 16:5 |
| trono de Davi | as bondades prometidas a Davi; "príncipe e governante dos povos" | Isaías 55:3–4 |

Um nome aparece nas duas linhas:

| Verso | O que o texto registra | Referência |
|---|---|---|
| 9:6 | um dos nomes do menino do trono de Davi é "Deus Forte" | Isaías 9:6 |
| 10:21 | os restantes de Jacó se converterão "ao Deus Forte" | Isaías 10:21 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| referência | a palavra escrita: 5 versos nomeiam o Rei e todos os 5 dizem "o SENHOR" |
| marca comum | a justiça: está no rei de 32:1, no trono de Davi (9:7; 11:4; 16:5) e no SENHOR juiz (33:22) |
| ordem (m12, m20) | em 11:1–2 a vara brota e depois o Espírito repousa sobre ela: o mecanismo vem depois do enviado [S-U] |
| o que falta | um verso que diga "o rei de 32:1 é este" ou "o rei de 33:17 é este" |

## 3. Consultas no Z3 (m31)

Foram 6 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["REI_EM_CINQUENTA_E_DOIS_VERSOS",["rv = 52","rs = 5","ra = 2","rv = rs + ra + ro"],"ro = 45","SEGUE",["sat","sat","unsat"],0],
["TRES_OFICIOS_NUM_SUJEITO",["jz = 1","lg = 1","rk = 1","of = jz + lg + rk"],"of = 3","SEGUE",["sat","sat","unsat"],0],
["REI_VISTO_SEM_NOME",["k × (1 − k) = 0","q = 1"],"k = 1","EM ABERTO",["sat","sat","sat"],0],
["DUAS_LINHAS_DE_REINADO",["ls = 7","ld = 4","lt = ls + ld"],"lt = 11","SEGUE",["sat","sat","unsat"],0],
["MESMO_NOME_NAS_DUAS_LINHAS",["nm = 1","k × (1 − k) = 0","(nm = 1) ⟹ (k = 1)"],"k = 1","SEGUE",["sat","sat","unsat"],0],
["NEGAR_QUE_O_REI_TEM_NOME",["rs = 5"],"rs = 0","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **REI_EM_CINQUENTA_E_DOIS_VERSOS.** Dos 52 versos com a palavra, 5 nomeiam o Rei como o SENHOR e 2 deixam o rei sem nome. Sobram 45, que esta rodada não classificou. O Z3 confere a conta.
- **TRES_OFICIOS_NUM_SUJEITO.** Em 33:22 os três ofícios (juiz, legislador, rei) têm o mesmo sujeito. O Z3 confere que são 3.
- **REI_VISTO_SEM_NOME.** 33:22 diz que o SENHOR é o Rei. Nenhum verso diz que o rei visto em 33:17 é o mesmo. Só com o texto, fica EM ABERTO.
- **DUAS_LINHAS_DE_REINADO.** A caça achou 7 versos em que o SENHOR reina (6:5; 24:23; 33:22; 41:21; 43:15; 44:6; 52:7) e 4 passagens do trono de Davi (9:6–7; 11:1–4; 16:5; 55:3–4). São 11 registros.
- **MESMO_NOME_NAS_DUAS_LINHAS.** O nome "Deus Forte" está no menino de 9:6 e no destino dos restantes em 10:21. **Se** o mesmo nome identifica o mesmo sujeito, as duas linhas são uma só. A condição é uma hipótese: o texto não a escreve. O resultado SEGUE vale só debaixo dela.
- **NEGAR_QUE_O_REI_TEM_NOME.** Dizer que Isaías nunca nomeia o Rei **contradiz** os 5 versos em que o Rei é o SENHOR.

## 4. Resultado da m31

1. **O livro nomeia o Rei cinco vezes, e as cinco dizem "o SENHOR".** Nenhum verso de Isaías dá outro nome ao Rei.
2. **O reinado aparece em duas linhas:** o SENHOR que reina (7 versos) e o trono de Davi (4 passagens). A justiça é a marca das duas.
3. **Um nome liga as duas linhas no próprio texto:** "Deus Forte" (9:6 e 10:21). A identificação das duas linhas depende de uma hipótese que o texto não escreve.
4. **Os dois pontos da m30 ficam mais estreitos, mas não fecham.** O rei de 32:1 e o de 33:17 têm agora dois candidatos registrados, e só dois. O verso que escolheria entre eles, ou que diria que são o mesmo, não existe em Isaías.
5. **Fica EM ABERTO:**
   - quem é o rei de 32:1 e o de 33:17, entre as duas linhas;
   - a classificação dos outros 45 versos com a palavra "rei".

## 5. Próximo ponto

O Espírito derramado de Isaías 32:15, caçado no livro inteiro (11:2; 42:1; 44:3; 48:16; 59:21; 61:1; 63:10–14), e a ligação registrada com Atos 2:17 e 2:33.

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m30 desta trilha: `c85db6aba2dba961676eb7359e7e2e10f47f64517d63f664d192fb824072425d`.
- Commit remoto de partida: `cc5a313b64c5bbaee73548baf465cceba28e0e90`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m31 está no arquivo `.sha256` ao lado.
