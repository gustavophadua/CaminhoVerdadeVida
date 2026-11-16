# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m15: Atos 4:13 e 4:33, ousadia sem letras e testemunho com grande poder

Esta rodada segue o próximo ponto da m14: Atos 4:13 e 4:33, por ordem do usuário [S-U]. O pedido do usuário diz "Relações 4, 13 e 33". Nenhum livro tem esse nome. O único livro com os versículos 4:13 e 4:33 já presente nesta trilha é Atos (m04, m11), e esta rodada lê o pedido assim. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Ela não trata de Atos 4. Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m14):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas.
- Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| o que os opositores veem | a ousadia de Pedro e João | Atos 4:13 |
| o que os opositores sabem | que eram homens sem letras e sem instrução formal | Atos 4:13 |
| o que os opositores reconhecem | que eles tinham estado com Jesus | Atos 4:13 |
| a referência presente | o homem curado de pé com eles | Atos 4:14 |
| o pedido | concede aos teus servos anunciar a palavra com toda a ousadia | Atos 4:29 |
| o mecanismo | depois da oração, o lugar treme, todos ficam cheios do Espírito Santo e anunciam a palavra com ousadia | Atos 4:31 |
| a comunidade | os que creram eram um só coração e uma só alma; ninguém dizia que algo era só seu; tinham tudo em comum | Atos 4:32 |
| o testemunho | com grande poder os apóstolos davam testemunho da ressurreição do Senhor Jesus, e havia grande graça sobre todos | Atos 4:33 |
| a contagem registrada | não havia necessitado entre eles, porque os que tinham terras ou casas vendiam e o valor era distribuído a cada um conforme a necessidade | Atos 4:34–35 |
| um caso nomeado | José, chamado Barnabé, vendeu um campo e trouxe o valor | Atos 4:36–37 |
| a venda era livre | Pedro a Ananias: antes de vender, não era teu? Depois de vendido, o valor não estava em teu poder? | Atos 5:4 |
| reação do mundo nessa época | o sumo sacerdote e os saduceus, cheios de inveja, prendem os apóstolos | Atos 5:17–18 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| o rótulo visto | ou = 1: ousadia (4:13) |
| o que não explica | le = 0: sem letras e sem instrução formal (4:13) |
| a referência reconhecida pelos opositores | ej = 1: tinham estado com Jesus (4:13) |
| TROCA | cheios do Espírito (ch = 1) ⟹ falam com ousadia (4:31) |
| conteúdo do testemunho | a ressurreição (4:33): o que viram e ouviram (4:20, m04), sem conteúdo próprio (D2) |
| contagem registrada | nn = 0: nenhum necessitado (4:34), porque houve venda e distribuição |
| liberdade da venda | vo = 1: vender estava no poder do dono (5:4) |
| contagem de um lado (m01, m04) | o texto conta os necessitados da comunidade (zero), mas não conta os opositores |

## 3. Consultas no Z3 (m15)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["OUSADIA_SO_COM_LETRAS",["ou = 1","le = 0"],"ou ≤ le","CONTRADIZ",["sat","unsat","sat"],0],
["OUSADIA_DEPOIS_DO_ENCHIMENTO",["(ch = 1) ⟹ (ou = 1)","ch = 1"],"ou = 1","SEGUE",["sat","sat","unsat"],0],
["SEM_NECESSITADO_PORQUE_DISTRIBUIDO",["((vd = 1) ∧ (dn = 1)) ⟹ (nn = 0)","vd = 1","dn = 1"],"nn = 0","SEGUE",["sat","sat","unsat"],0],
["VENDA_OBRIGATORIA",["vo = 1","(vo = 1) ⟹ (ob = 0)"],"ob = 1","CONTRADIZ",["sat","unsat","sat"],0],
["QUAL_DAS_DUAS_EXPLICA",["ej = 1","ch = 1","(ej = 1) ⟹ (ou = 1)","(ch = 1) ⟹ (ou = 1)","(ca = 1) ∨ (ca = 2)"],"ca = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **OUSADIA_SO_COM_LETRAS.** Os opositores registram ousadia (ou = 1) em homens sem letras (le = 0). A lei "só há ousadia onde há letras" (ou ≤ le) **contradiz** o registro de 4:13.
- **OUSADIA_DEPOIS_DO_ENCHIMENTO.** Atos 4:31 liga o encher-se do Espírito ao falar com ousadia. Com ch = 1, a ousadia segue.
- **SEM_NECESSITADO_PORQUE_DISTRIBUIDO.** Atos 4:34 dá o "porque": venda e distribuição conforme a necessidade. Com as duas registradas, o número de necessitados é zero.
- **VENDA_OBRIGATORIA.** Atos 5:4 registra que vender estava no poder do dono. Afirmar que a venda era obrigatória **contradiz** o registro.
- **QUAL_DAS_DUAS_EXPLICA.** A ousadia tem dois registros de origem: estar com Jesus (4:13, dito pelos opositores) e encher-se do Espírito (4:31, dito pelo narrador). Cada um, sozinho, basta para a ousadia no modelo. Qual dos dois a causa em 4:13 fica EM ABERTO.

## 4. Resultado da m15

1. **A formação não explica a ousadia.** Os próprios opositores registram as duas coisas juntas: ousadia e falta de letras (4:13). A lei "ousadia vem da formação" cai no registro deles.
2. **Os opositores apontam a referência.** O que eles reconhecem é "tinham estado com Jesus" (4:13), com o curado presente (4:14). É a referência decidindo, como na m04 e na m11. O fato reconhecido de novo não muda a reação: logo depois vem a prisão (5:17–18).
3. **O mecanismo produz o mesmo rótulo.** Em 4:31, o narrador liga o encher-se do Espírito à ousadia. No modelo [S-U], o Filho (estar com ele) e o mecanismo (encher-se) dão o mesmo rótulo. Qual deles opera em 4:13 fica EM ABERTO, como na m05.
4. **O testemunho é da ressurreição, com grande poder.** O conteúdo é o recebido (4:33; 4:20), sem conteúdo próprio. É a linha D2 da m04.
5. **Uma contagem registrada de um lado.** Não havia necessitado (4:34). O texto dá a causa (venda e distribuição conforme a necessidade) e registra que a venda era livre (5:4). Não havia ordem de vender.
6. **Reação do mundo nessa época.** Inveja e prisão (5:17–18), depois da ordem de calar (4:18, m04). Os opositores não são contados.
7. **Fica EM ABERTO:**
   - qual das duas origens explica a ousadia de 4:13;
   - quantos venderam além de Barnabé;
   - por quanto tempo durou a situação sem necessitados.

## 5. Próximo ponto

A m16 vai a Filipenses 4:1–23, por ordem do usuário. Em 4:13, a capacidade é registrada como vinda "daquele que me fortalece". Em 4:11–12, o contentamento é registrado nos dois estados: fartura e fome. O teste é se a reação registrada fica igual quando o estado muda.

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m14 desta trilha: `0a53f363c7ceff59201a223fca8b9dcc7be06b9833ca53f3f424e0d3d4ebee79`.
- Commit remoto de partida: `19cceaa0715a16e6b07d1a82fd44267cc03d2bd1`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m15 está no arquivo `.sha256` ao lado.
