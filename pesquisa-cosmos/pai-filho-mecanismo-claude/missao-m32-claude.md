# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m32: o Espírito derramado de Isaías 32:15, caçado no livro inteiro

Esta rodada continua o pedido do usuário [S-U] de completar tudo sobre Isaías. Ela pega o ponto que a m30 deixou EM ABERTO sobre Isaías 32:15 e Atos 2, e procura no livro inteiro (66 capítulos) o que o texto registra sobre o Espírito. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m31):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados no texto. A busca foi mecânica: a palavra "Espírito" e o verbo "derramar" em todos os versos de Isaías, na Bíblia Livre (edição de 2018, CC BY 4.0).
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

A palavra "Espírito" aparece em 14 versos de Isaías. Três dizem que ele está sobre **um**:

| Verso | O que o texto registra | Referência |
|---|---|---|
| 11:2 | sobre a vara de Jessé "repousará o Espírito do SENHOR" | Isaías 11:1–2 |
| 42:1 | "meu servo, a quem sustento... Sobre ele eu pus o meu Espírito" | Isaías 42:1 |
| 61:1 | "O Espírito do Senhor DEUS está sobre mim; pois o SENHOR me ungiu... ele me enviou" | Isaías 61:1 |

Três dizem que ele vem sobre **muitos**:

| Verso | O que o texto registra | Referência |
|---|---|---|
| 32:15 | "Até que seja derramado sobre nós o Espírito do alto"; depois, o deserto vira lugar fértil | Isaías 32:15 |
| 44:3 | "derramarei água sobre o sedento... derramarei meu Espírito sobre tua semente" | Isaías 44:3 |
| 59:21 | "meu Espírito que está sobre ti" não se afastará da boca dos descendentes, nem dos descendentes deles | Isaías 59:21 |

Os outros 8 versos: 30:1; 34:16; 40:7; 40:13; 48:16; 63:10; 63:11; 63:14.

O verbo "derramar" está em 9 versos de Isaías. Só em 2 deles o que se derrama é o Espírito: 32:15 e 44:3.

Fora de Isaías, o registro liga o livro a dois pontos:

| Verso | O que o texto registra | Referência |
|---|---|---|
| Lucas 4:18–21 | o Filho lê "O Espírito do Senhor está sobre mim" e diz: "Hoje esta escritura se cumpriu em vossos ouvidos" | Lucas 4:18, 4:21 |
| Atos 2:16–17 | Pedro explica o derramamento: "isto é o que foi dito por meio do profeta Joel" | Atos 2:16–17 |
| Atos 2:33 | o Filho, exaltado, recebeu do Pai a promessa do Espírito e "derramou isto" | Atos 2:33 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| ordem (m12, m20) | primeiro sobre um (11:2; 42:1; 61:1), depois sobre muitos (32:15; 44:3; 59:21); Atos 2:33 repete: um recebe e derrama [S-U] |
| ordem dentro de um verso | 59:21: sobre ti, depois teus descendentes, depois os descendentes deles |
| referência | Lucas 4:21 liga Isaías 61:1 ao Filho com a palavra "hoje"; Atos 2:16 nomeia Joel |
| o que falta | um verso que ligue pelo nome Isaías 32:15 ao derramamento de Atos 2 |

## 3. Consultas no Z3 (m32)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ESPIRITO_EM_CATORZE_VERSOS",["ev = 14","eu = 3","em = 3","ev = eu + em + eo"],"eo = 8","SEGUE",["sat","sat","unsat"],0],
["DERRAMAR_EM_NOVE_VERSOS",["dt = 9","de = 2","dt = de + dx"],"dx = 7","SEGUE",["sat","sat","unsat"],0],
["TRES_GERACOES_EM_ORDEM",["ta < tb","tb < tc"],"ta < tc","SEGUE",["sat","sat","unsat"],0],
["HOJE_EM_LUCAS",["hj = 1"],"hj = 0","CONTRADIZ",["sat","unsat","sat"],0],
["ATOS_NOMEIA_JOEL",["jl = 1","k × (1 − k) = 0"],"k = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **ESPIRITO_EM_CATORZE_VERSOS.** Dos 14 versos, 3 põem o Espírito sobre um e 3 sobre muitos. Sobram 8. O Z3 confere a conta.
- **DERRAMAR_EM_NOVE_VERSOS.** O verbo está em 9 versos; em 2 o que se derrama é o Espírito. Sobram 7 com outro objeto.
- **TRES_GERACOES_EM_ORDEM.** Em 59:21 a ordem é: tu, teus descendentes, os descendentes deles. O primeiro vem antes do terceiro. O Z3 confere a ordem.
- **HOJE_EM_LUCAS.** Lucas 4:21 registra que a escritura de Isaías 61:1 se realizou naquele dia. Negar esse registro **contradiz** o texto.
- **ATOS_NOMEIA_JOEL.** Atos 2:16 dá Joel como a fonte do que aconteceu. Nenhum verso diz que o derramamento de Atos 2 é o de Isaías 32:15. Só com o texto, fica EM ABERTO.

## 4. Resultado da m32

1. **Isaías registra o Espírito sobre um e sobre muitos, três versos de cada lado.** O verso 59:21 dá a ordem dentro dele mesmo: primeiro um, depois os descendentes.
2. **O Espírito só é "derramado" duas vezes no livro:** em 32:15 e em 44:3. Em 44:3 o texto põe a água e o Espírito lado a lado.
3. **Um dos três versos "sobre um" tem ligação fechada pelo registro:** Lucas 4:21 liga Isaías 61:1 ao Filho.
4. **O ponto da m30 fica mais estreito, mas não fecha.** Atos 2 nomeia Joel, não Isaías. A forma é a mesma (um recebe, muitos recebem depois), mas a ligação pelo nome entre Isaías 32:15 e Atos 2 não está escrita.
5. **Fica EM ABERTO:**
   - se o derramamento de Atos 2 é o de Isaías 32:15;
   - se os três versos "sobre um" (11:2; 42:1; 61:1) falam do mesmo sujeito: Lucas 4:21 fecha só o terceiro.

## 5. Próximo ponto

Quem anda nas seis condições de Isaías 33:15, caçado no livro inteiro (1:16–17; 26:2; 53:9–11; 56:1–2; 58:6–7; 59:16; 64:6), e as outras nações de Isaías 34:2 (as revelações dos capítulos 13 a 23).

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m31 desta trilha: `902af99d86ebf9ed11e26fb47d791bebde20233dd65887fe3b0a3e69e37659d1`.
- Commit remoto de partida: `fcecfb96a5fd6f06b8b77fd8da2ac76b854980d0`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m32 está no arquivo `.sha256` ao lado.
