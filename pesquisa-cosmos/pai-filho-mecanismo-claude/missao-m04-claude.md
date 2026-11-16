# 15/11/2026 — Pai envia, Filho reage, mecanismo fecha — m04: ordem para calar, e a fala continua direta

Esta rodada segue o próximo ponto da m03, que é a primeira reação do mundo depois do fechamento além do Pentecostes: Atos 4:1–21. Ela dialoga com a rodada 04 do GPT, "promessa e Pentecostes" (SHA-256 `3b8594c652444b610cb87ea8729dca384a6d5e64fc334a290d77f0416d5a02e2`). Essa rodada mostra que a operação do mecanismo não produz resposta pública uniforme: à mesma fala seguem pergunta e zombaria.

**Método** (o mesmo da m01–m03):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Só entram fatos registrados, parafraseados e com referência.
- Não há leitura de intenção, probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas declaradas.
- Sem fonte, a saída é EM ABERTO.

**Execução.** Rodei com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| prisão | sacerdotes, o capitão do templo e saduceus prendem os que anunciavam a ressurreição e os põem em custódia até o dia seguinte | Atos 4:1–3 |
| contagem registrada | muitos que ouviram creram, e o número chegou a cerca de cinco mil homens | Atos 4:4 |
| a pergunta | com que poder ou em nome de quem fizeram isso (a cura de Atos 3) | Atos 4:7 |
| quem responde | Pedro, cheio do Espírito Santo, responde | Atos 4:8 |
| resposta direta | a cura foi feita no nome de Jesus | Atos 4:10, 12 |
| referência física | vendo o homem curado de pé com eles, nada tinham a dizer em contrário | Atos 4:14 |
| o próprio registro dos opositores | um sinal notório foi feito, e não podem negar | Atos 4:16 |
| ordem para calar | ordenam que de modo nenhum falem nem ensinem no nome de Jesus | Atos 4:18 |
| resposta à ordem | julgai se é justo obedecer a vós antes que a Deus; não podem deixar de falar do que viram e ouviram | Atos 4:19–20 |
| desfecho | ameaçam e soltam, não achando como castigar, por causa do povo | Atos 4:21 |

## 2. Mecanismo no vocabulário do Todo e da língua secreta

| Peça | Aqui |
|---|---|
| referência que decide (v3, m02) | o homem curado, presente e de pé (cu = 1): negar exigiria que ele não estivesse ali |
| contagem de um lado (v24–v26, m01) | cerca de 5000 que creram; opositores sem contagem |
| conteúdo = recebido (D2 da m02, m03) | a fala é "o que viram e ouviram" (fa = vo), sem conteúdo próprio acrescentado |
| regra R da v1/v2 (modelo do usuário) | se o custo de falar direto passa o custo do rótulo secreto, há troca de rótulo: cd > cs ⟹ tr = 1 |
| registro de custo alto | ordem para calar e ameaça (Atos 4:18, 21) |
| fala direta registrada | sem troca de rótulo: falam "no nome de Jesus" (tr = 0) (Atos 4:10, 12, 20) |

## 3. Consultas no Z3 (m04)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["REFERENCIA_DO_CURADO",["(ne = 1) ⟹ (cu = 0)","cu = 1"],"ne = 1","CONTRADIZ",["sat","unsat","sat"],0],
["CONTAGEM_DE_UM_LADO",["cr = 5000","op ≥ 1"],"op ≤ 250","EM ABERTO",["sat","sat","sat"],0],
["CONTEUDO_E_O_RECEBIDO",["fa = vo","vm = fa − vo"],"vm = 0","SEGUE",["sat","sat","unsat"],0],
["REGRA_TROCA_UNIVERSAL_COM_CUSTO",["cd > cs","(cd > cs) ⟹ (tr = 1)","tr = 0"],"tr = 0","PREMISSAS INCOMPATÍVEIS",["unsat",null,null],0],
["REGRA_TROCA_EXIGE_CUSTO_SECRETO",["tr = 0","(cd > cs) ⟹ (tr = 1)"],"cs ≥ cd","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **REFERENCIA_DO_CURADO.** Com o homem curado presente, afirmar que os opositores negaram o sinal **contradiz** o registro. Eles mesmos registram que não podem negar (Atos 4:14, 16). É a referência física decidindo, como a moeda da m02.
- **CONTAGEM_DE_UM_LADO.** O texto conta cerca de 5000 que creram, mas não conta os opositores. A proporção fica EM ABERTO.
- **CONTEUDO_E_O_RECEBIDO.** Se a fala é o que foi visto e ouvido, o conteúdo próprio acrescentado é zero. É coerente com D2 (m02) e com o fechamento-registro (m03).
- **REGRA_TROCA_UNIVERSAL_COM_CUSTO.** A regra R tomada como universal, junto com custo direto maior que o secreto e a fala direta registrada, dá premissas **incompatíveis**. O registro de Atos 4 é um contraexemplo à regra R como lei universal, *se* o custo direto for de fato maior que o secreto.
- **REGRA_TROCA_EXIGE_CUSTO_SECRETO.** Se a regra R vale e a fala foi direta, então segue que, para eles, o canal secreto custava pelo menos tanto quanto o direto. O texto não registra o custo do canal secreto, então essa saída depende de uma premissa sem fonte.

## 4. Resultado da m04

1. **A reação do mundo depois do fechamento repete a estrutura das épocas anteriores.** Há recepção contada (cerca de 5000), oposição sem contagem e um desfecho em que a referência física, o homem curado, impede a negação. Isso fecha com a m01 (Pentecostes) e a m02 (a moeda).
2. **A fala continua sendo o recebido.** "O que vimos e ouvimos" (Atos 4:20) mantém o conteúdo próprio em zero. A linha D2 → fechamento-registro se sustenta.
3. **O próprio texto põe a regra R da língua secreta à prova.** Sob ordem de calar e ameaça, a fala registrada é direta, sem troca de rótulo. Há duas saídas lógicas:
   - **ou a regra R não é universal**: há casos registrados de custo direto alto sem tradução secreta;
   - **ou, para quem fala, o canal secreto custava ainda mais.**
   
   O texto não registra o custo do canal secreto, e por isso escolher entre as duas fica EM ABERTO. A série não preenche essa lacuna. Fica registrado que a regra do usuário (v1, v2) tem aqui um caso-teste textual.
4. **Concordância com a rodada 04 do GPT.** A resposta ao mecanismo não é uniforme em nenhuma das épocas registradas.

## 5. Próximo ponto

Procurar no registro um caso em que o custo do canal secreto aparece explicitamente, para decidir entre as duas saídas do item 3. Um candidato é o de quem crê, mas fala em segredo por medo de ser expulso da sinagoga (João 12:42; 19:38, o discípulo oculto). Ali o texto registra tanto o custo direto quanto a escolha pelo silêncio. Se o caso se confirmar no texto, ele é o exemplo positivo da regra R, e Atos 4 é o caso em que a regra não se aplica.

## Integridade

- SHA-256 da rodada 04 do GPT (pai-filho-espirito), conferido nos bytes contra o `.sha256` dele: `3b8594c652444b610cb87ea8729dca384a6d5e64fc334a290d77f0416d5a02e2`.
- SHA-256 da m03 desta trilha: `c6a01d038e4ea7afa444cec384a1ed6d6dec7fc94c4943afc29fdfd395900ee3`.
- Commit remoto de partida: `0b7114cc0b7aeb399f4f284ed5192ff9a6a19155`.
- O hash desta m04 está no arquivo `.sha256` ao lado.
