# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m25: Isaías 33 completo, verso a verso (1–24)

Esta rodada segue o próximo ponto da m24: completar Isaías 33, verso a verso, como pediu o usuário [S-U]. A m14 usou só parte do capítulo. Aqui entram os 24 versos. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m24):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

| Verso | O que o texto registra | Referência |
|---|---|---|
| 1 | ai do destruidor que não foi destruído e do traidor que não foi traído: acabando de destruir, será destruído; acabando de trair, será traído | Isaías 33:1 |
| 2 | Senhor, tem misericórdia; esperamos em ti; sê o nosso braço cada manhã e a salvação no tempo da angústia | Isaías 33:2 |
| 3 | ao barulho do tumulto os povos fogem; quando te levantas, as nações se dispersam | Isaías 33:3 |
| 4 | o despojo é ajuntado como ajunta a lagarta; como gafanhotos saltam, assim se lançam sobre ele | Isaías 33:4 |
| 5 | o Senhor é exaltado, habita no alto e enche Sião de direito e justiça | Isaías 33:5 |
| 6 | haverá estabilidade nos teus tempos, riqueza de salvação, sabedoria e conhecimento; o temor do Senhor é o tesouro | Isaías 33:6 |
| 7 | os valentes clamam nas ruas; os mensageiros de paz choram amargamente | Isaías 33:7 |
| 8 | as estradas estão desertas, não passa viajante; a aliança foi rompida, as cidades desprezadas, ninguém é levado em conta | Isaías 33:8 |
| 9 | a terra geme e definha; o Líbano se envergonha e seca; Sarom vira deserto; Basã e Carmelo perdem as folhas | Isaías 33:9 |
| 10 | agora me levantarei, diz o Senhor; agora serei exaltado | Isaías 33:10 |
| 11 | concebestes palha, dareis à luz restolho; o vosso próprio fôlego é fogo que vos consome | Isaías 33:11 |
| 12 | os povos serão como cal queimada, como espinhos cortados que ardem no fogo | Isaías 33:12 |
| 13 | ouvi, vós que estais longe, o que eu fiz; e vós que estais perto, reconhecei o meu poder | Isaías 33:13 |
| 14 | os pecadores em Sião se assombram; o tremor toma os ímpios: quem de nós habitará com o fogo devorador? | Isaías 33:14 |
| 15 | quem anda em justiça e fala o que é reto, rejeita o ganho da opressão, não aceita suborno, tapa os ouvidos para não ouvir de sangue e fecha os olhos para não ver o mal | Isaías 33:15 |
| 16 | esse habitará no alto; rochas serão o seu refúgio; o pão lhe será dado, e a água não faltará | Isaías 33:16 |
| 17 | os teus olhos verão o rei na sua beleza e a terra que se estende ao longe | Isaías 33:17 |
| 18 | o coração lembrará o terror: onde está o escrivão? onde o que pesava o tributo? onde o que contava as torres? | Isaías 33:18 |
| 19 | não verás mais o povo arrogante, de fala obscura, de língua que não se entende | Isaías 33:19 |
| 20 | olha Sião, cidade das festas; os teus olhos verão Jerusalém, morada tranquila, tenda que não será removida; nenhuma estaca arrancada, nenhuma corda rompida | Isaías 33:20 |
| 21 | ali o Senhor será para nós lugar de rios largos; não passará barco a remo nem navio grande | Isaías 33:21 |
| 22 | o Senhor é o nosso juiz, o nosso legislador, o nosso rei; ele nos salvará | Isaías 33:22 |
| 23 | as tuas cordas se afrouxaram, não firmam o mastro nem estendem a vela; então se reparte muito despojo; até os coxos tomam a presa | Isaías 33:23 |
| 24 | nenhum morador dirá "estou doente"; ao povo que ali habita será perdoada a iniquidade | Isaías 33:24 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| reciprocidade | destruir ⟹ ser destruído; trair ⟹ ser traído (v1): duas leis do mesmo verso |
| o próprio fôlego | o fôlego deles é o fogo que os consome (v11): a reação volta sobre quem reage |
| contadores | escrivão, pesador do tributo e contador de torres somem (v18) |
| fala | o povo de língua que não se entende não é mais visto (v19) |
| cordas | as da tenda não se rompem (v20); as "tuas" se afrouxaram (v23) |
| fraqueza | até os coxos tomam a presa (v23) |
| corpo | nenhum morador doente (v24) |
| contagem de um lado (m01, m04) | ninguém doente é contagem registrada (zero); os pecadores em Sião não são contados (v14) |

## 3. Consultas no Z3 (m25)

Foram 6 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["TRAIDOR_TRAIDO",["(at = 1) ⟹ (st = 1)","at = 1"],"st = 0","CONTRADIZ",["sat","unsat","sat"],0],
["QUEM_CONTAVA_AS_TORRES",["fc = 0"],"fc = 1","CONTRADIZ",["sat","unsat","sat"],0],
["NENHUM_MORADOR_DOENTE",["nd = 0"],"nd ≥ 1","CONTRADIZ",["sat","unsat","sat"],0],
["CORDAS_EM_DOIS_ESTADOS",["ca = 0","cb = 1"],"ca = cb","CONTRADIZ",["sat","unsat","sat"],0],
["COXO_TOMA_A_PRESA",["cx = 1","tp = 1"],"tp + cx ≤ 1","CONTRADIZ",["sat","unsat","sat"],0],
["QUEM_E_O_REI_DO_VERSO_DEZESSETE",["vr = 1","ri ≥ 0","ri ≤ 1"],"ri = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **TRAIDOR_TRAIDO.** A segunda metade do verso 1: quem acaba de trair será traído. Afirmar que fica sem ser traído **contradiz** o registro.
- **QUEM_CONTAVA_AS_TORRES.** O verso 18 pergunta onde estão o escrivão, o pesador e o contador de torres: as três funções de contar já não estão. Afirmar que ainda estão **contradiz** o verso.
- **NENHUM_MORADOR_DOENTE.** O verso 24: nenhum morador diz "estou doente". Afirmar um ou mais doentes **contradiz** a contagem registrada.
- **CORDAS_EM_DOIS_ESTADOS.** O verso 20 registra corda não rompida; o verso 23, cordas afrouxadas. Afirmar o mesmo estado nos dois **contradiz** o registro. São dois estados, de dois sujeitos.
- **COXO_TOMA_A_PRESA.** O verso 23: até os coxos tomam a presa. A lei "quem é coxo não toma" **contradiz** o registro.
- **QUEM_E_O_REI_DO_VERSO_DEZESSETE.** O verso 17 diz que os olhos verão o rei na sua beleza. O verso 22 diz que o Senhor é o rei. O capítulo não diz se o rei do 17 é o mesmo do 22. Fica EM ABERTO.

## 4. Resultado da m25

1. **Isaías 33 completo tem 24 versos.** São três partes: ai e pedido (v1–6), terra em luto e o levantar do Senhor (v7–13), quem habita e como é a morada (v14–24).
2. **A reação volta sobre quem reage.** Destruidor destruído, traidor traído (v1), e o próprio fôlego que consome (v11).
3. **As funções de contar somem.** Escrivão, pesador e contador de torres (v18). O texto registra as perguntas e não as responde.
4. **Força na fraqueza de novo.** Os coxos tomam a presa (v23), como em Isaías 35:6 e 2 Coríntios 12:9 (m19).
5. **O corpo sem doença e a culpa perdoada.** Os dois estão no mesmo verso (v24).
6. **Fica EM ABERTO:** se o rei do verso 17 é o mesmo do verso 22.

## 5. Próximo ponto

A m26 completa Isaías 34, verso a verso (1–17).

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m24 desta trilha: `ffd7acef61d7952f60cf5d6d2ddd546aad8eeb642894c0688d6760beb67038c4`.
- Commit remoto de partida: `2f38bc75d697a9c6a1a2f9f2e20fa196304ce3ee`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m25 está no arquivo `.sha256` ao lado.
