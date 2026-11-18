# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m57: as sete igrejas e as sete cartas

Esta rodada põe as sete cartas de Apocalipse 2 e 3 lado a lado, só com o que cada uma registra. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m56):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados no texto. A busca foi mecânica: Apocalipse 1:4, 1:11-20, capítulos 2 e 3, 4:5, 5:6, na Bíblia Livre (edição de 2018, CC BY 4.0).
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

Esta rodada põe as sete cartas de Apocalipse 2–3 lado a lado, só com o que cada uma registra.

As sete igrejas são Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia (Ap 1:11). Segundo Ap 1:20, "os sete castiçais [...] são as sete igrejas" e "as sete estrelas são os anjos das sete igrejas".

| Igreja | Quem fala (título) | Elogio | "Tenho contra ti" | Chamado | Promessa ao que vencer |
|---|---|---|---|---|---|
| Éfeso 2:1–7 | tem as sete estrelas, anda entre os castiçais | obras, paciência, provou os falsos apóstolos | "deixaste o teu primeiro amor" | "arrepende-te [...] senão [...] tirarei teu castiçal" | comer da árvore da vida |
| Esmirna 2:8–11 | o primeiro e o último, que foi morto e vive | aflição e pobreza, "mas tu és rico" | nenhum | "Sê fiel até a morte" | não sofrerá a segunda morte |
| Pérgamo 2:12–17 | tem a espada de dois fios | reténs meu nome, não negaste | doutrina de Balaão e dos nicolaítas | "Arrepende-te; senão [...] batalharei" | maná escondido, pedrinha branca, nome novo |
| Tiatira 2:18–29 | o Filho de Deus, olhos como chama | amor, serviço, fé; "as últimas [obras] são mais que as primeiras" | "deixas a mulher Jezabel" | "dei a ela tempo para que se arrependesse; mas ela não se arrependeu" | autoridade sobre as nações; a estrela da manhã |
| Sardes 3:1–6 | tem os sete espíritos de Deus e as sete estrelas | só "alguns poucos nomes" (3:4) | "tens nome de que vives, e estás morto" | "lembra-te [...] e arrepende-te" | roupas brancas; nome não riscado do livro da vida |
| Filadélfia 3:7–13 | o Santo, o Verdadeiro, tem a chave de Davi | "guardaste minha palavra"; "porta aberta" | nenhum | "guarda o que tu tens" | coluna no templo; nome de Deus |
| Laodiceia 3:14–22 | o Amém, a testemunha fiel | nenhum | "nem frio, nem quente [...] morno" | "sê zeloso, e te arrepende"; "estou à porta, e bato" | sentar-se com ele no trono |

### O que se repete nas sete cartas

| Fórmula | Quantas cartas | Versos |
|---|---|---|
| "Eu conheço as tuas obras" | 7 | 2:2, 2:9, 2:13, 2:19, 3:1, 3:8, 3:15 |
| "Quem tem ouvidos, ouça o que o Espírito diz às igrejas" | 7 | 2:7, 2:11, 2:17, 2:29, 3:6, 3:13, 3:22 |
| promessa "ao que vencer" | 7 | 2:7, 2:11, 2:17, 2:26, 3:5, 3:12, 3:21 |
| repreensão | 5 | todas menos Esmirna e Filadélfia |
| "arrepende-te" ou arrependimento | 5 | 2:5, 2:16, 2:21–22, 3:3, 3:19 |

### O Filho fala, e é o que o Espírito diz

Cada carta abre com um título do Filho, tirado de Ap 1: "Isto diz aquele que...". E cada carta fecha com "o que o Espírito diz às igrejas". As mesmas palavras são as do Filho e as do Espírito. Isso fecha com João 16:13–14 ("tomará do que é meu", m53).

### Os sete Espíritos

| Verso | O que diz |
|---|---|
| Ap 1:4 | "dos sete Espíritos que estão diante do trono" |
| Ap 3:1 | o que fala a Sardes "tem os sete espíritos de Deus" |
| Ap 4:5 | "sete lâmpadas de fogo [...] são os sete espíritos de Deus" |
| Ap 5:6 | "sete olhos, que são os sete espíritos de Deus enviados para toda a terra" |

## 2. Mecanismo

| Passo que se repete | Onde |
|---|---|
| 1. ele conhece as obras | 7 de 7 |
| 2. elogia o que há | 6 de 7 (Laodiceia não tem) |
| 3. diz o que tem contra | 5 de 7 |
| 4. chama ao arrependimento, com prazo ou consequência | 5 de 7, as mesmas da repreensão |
| 5. o Espírito diz às igrejas, no plural | 7 de 7 |
| 6. promete ao que vencer | 7 de 7 |

Onde há repreensão, há chamado ao arrependimento. Onde não há repreensão (Esmirna, Filadélfia), não há "arrepende-te". A carta é dirigida a uma igreja, mas o fecho diz "às igrejas": as sete ouvem as sete. Tiatira registra o tempo dado e a recusa (2:21). O papel do Espírito como mecanismo é do modelo do usuário [S-U].

## 3. Consultas no Z3 (m57)

Foram 6 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ESPIRITO_FALA_AS_SETE",["ef = 1","es = 1","pe = 1","ti = 1","sa = 1","fi = 1","la = 1","tt = ef + es + pe + ti + sa + fi + la"],"tt = 7","SEGUE",["sat","sat","unsat"],0],
["REPREENSAO_TRAZ_ARREPENDIMENTO",["rp = 5","ar = rp"],"ar = 5","SEGUE",["sat","sat","unsat"],0],
["ESMIRNA_E_FILADELFIA_REPREENDIDAS",["es = 0","fi = 0","tt = es + fi"],"tt ≥ 1","CONTRADIZ",["sat","unsat","sat"],0],
["TODAS_TEM_ELOGIO",["el = 6"],"el = 7","CONTRADIZ",["sat","unsat","sat"],0],
["FILHO_E_ESPIRITO_MESMA_PALAVRA",["ab = 7","fe = ab"],"fe = 7","SEGUE",["sat","sat","unsat"],0],
["SETE_ESPIRITOS_E_UM_ESPIRITO",["se = 7","um = 1","k × (1 − k) = 0"],"k = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **ESPIRITO_FALA_AS_SETE.** "O que o Espírito diz às igrejas" aparece nas sete cartas.
- **REPREENSAO_TRAZ_ARREPENDIMENTO.** As cinco cartas com repreensão são as cinco com chamado ao arrependimento.
- **ESMIRNA_E_FILADELFIA_REPREENDIDAS.** Dizer que Esmirna ou Filadélfia recebem "tenho contra ti" **contradiz** o texto.
- **TODAS_TEM_ELOGIO.** Dizer que as sete têm elogio **contradiz** Laodiceia (3:15–17).
- **FILHO_E_ESPIRITO_MESMA_PALAVRA.** A carta abre com o Filho e fecha com o Espírito, nas sete.
- **SETE_ESPIRITOS_E_UM_ESPIRITO.** O texto chama de "sete espíritos" (1:4; 4:5; 5:6) e, nas cartas, de "o Espírito", no singular. Não diz como os dois se ligam. Fica EM ABERTO (é a mesma questão da m45).

## 4. Resultado da m57

1. **As sete cartas seguem a mesma ordem:** conhece as obras; elogia; repreende; chama ao arrependimento; o Espírito diz às igrejas; promete ao vencedor.
2. **As palavras do Filho são as palavras do Espírito**, nas sete cartas.
3. **O arrependimento aparece onde há repreensão (5) e só ali.**
4. **Duas igrejas não têm repreensão:** Esmirna, que é pobre e "rica", e Filadélfia, que tem "pouca força".
5. **Uma igreja não tem elogio:** Laodiceia, que se diz rica e "não sabe" que é pobre, cega e nua.
6. **Fica EM ABERTO:** a ligação entre "sete espíritos" e "o Espírito".

## 5. Próximo ponto

A m58 liga as sete cartas aos fatos T01–T13 do Tubo.

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m56 desta trilha: `f7a1bfca77d3d410777a7f11fde9ec859c135a44ac2dce07be8f4c8f96ba9292`.
- Commit remoto de partida: `a57a6420aad3f1fc047c17cc2f4fbbd1e86b66dc`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m57 está no arquivo `.sha256` ao lado.
