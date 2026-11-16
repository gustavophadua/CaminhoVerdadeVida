# 15/11/2026 — Pai envia, Filho reage, mecanismo fecha — m07: o rótulo divino aplicado à fonte errada, e o dom sem preço

Esta rodada segue o próximo ponto da m06 (Atos 8:18–24, a tentativa de comprar o poder de conceder o Espírito) e dialoga com a rodada 07 do GPT, "dom e controle" (SHA-256 `e73478db7f2ccbf2cfb7018d0d3efbde17ed16015071f10265f2efc1c704be22`). O GPT trata o trecho como controle: o gesto que acompanha o dom não dá domínio sobre ele. Aqui o mesmo trecho é lido pela língua secreta e testado contra a definição D2 (m02, m03).

**Método.** É o mesmo da m01 à m06:
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Só entram fatos registrados, parafraseados e com referência.
- Não há leitura de intenção, nem probabilidade, nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas.
- Sem fonte, o resultado é EM ABERTO.

**Execução.** As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| fonte registrada | um homem praticava magia na cidade e assombrava o povo de Samaria | Atos 8:9 |
| rótulo dado pelo povo | todos o ouviam e diziam que ele era o grande poder de Deus | Atos 8:10 |
| outra fonte, mesmo tipo de sinal | as multidões atendem ao que Filipe diz, vendo os sinais; espíritos saem, paralíticos e coxos são curados | Atos 8:6–7 |
| reação do próprio mágico | ele creu, foi batizado e, vendo sinais e grandes milagres, admirava-se | Atos 8:13 |
| oferta | vendo que o Espírito era dado pela imposição de mãos, ofereceu dinheiro pelo poder de concedê-lo | Atos 8:18–19 |
| resposta registrada | o dom de Deus não se adquire com dinheiro; ele não tem parte nisso | Atos 8:20–21 |
| desfecho | ele pede que orem por ele | Atos 8:24 |

## 2. Mecanismo no vocabulário do Todo e da língua secreta

| Peça | Aqui |
|---|---|
| TROCA ao contrário (v2) | na língua secreta, a fonte Tubo usa rótulo de meme. Aqui uma fonte registrada como magia recebe o rótulo divino ("grande poder de Deus") |
| rótulo vs. fonte | rl = 1 (rótulo divino), fd = 0 (fonte registrada não divina) |
| mesmo rótulo, fontes diferentes | os sinais do mágico e os de Filipe recebem o mesmo tipo de rótulo do povo (rs = rf = 1), com fontes registradas diferentes (fs = 0, ff = 1) |
| registro que separa (v3) | o narrador registra as duas fontes de modo diferente (Atos 8:6–7, 9); o mágico se admira diante dos sinais da outra (Atos 8:13), como reação registrada, sem atribuição de estado interior |
| D2 (m02, m03) | mecanismo sem conteúdo próprio (vm = 0) |
| sem preço | o dom não se adquire com dinheiro (co = 0) |

## 3. Consultas no Z3 (m07)

Foram 4 consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ROTULO_DIVINO_NAO_CERTIFICA_FONTE",["rl = 1","fd = 0"],"(rl = 1) ⟹ (fd = 1)","CONTRADIZ",["sat","unsat","sat"],0],
["MESMO_ROTULO_FONTES_DIFERENTES",["rs = 1","rf = 1","fs = 0","ff = 1"],"fs = ff","CONTRADIZ",["sat","unsat","sat"],0],
["DOM_SEM_PRECO",["pg = 1","co = 0","(ad = 1) ⟹ (co = 1)"],"ad = 1","CONTRADIZ",["sat","unsat","sat"],0],
["SEM_CONTEUDO_NAO_IMPLICA_SEM_PRECO",["vm = 0"],"co = 0","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **ROTULO_DIVINO_NAO_CERTIFICA_FONTE.** O povo chama o mágico de "grande poder de Deus" (Atos 8:10), mas a fonte registrada é magia (Atos 8:9). A regra "rótulo divino ⟹ fonte divina" **contradiz** o registro. O rótulo, direto ou secreto, não certifica a fonte (v2).
- **MESMO_ROTULO_FONTES_DIFERENTES.** Os sinais das duas fontes recebem o mesmo tipo de rótulo do povo. Afirmar que as fontes são iguais **contradiz** o registro. É a TROCA da v2: o rótulo não separa as fontes.
- **DOM_SEM_PRECO.** Com a oferta feita e o registro de que o dom não se adquire com dinheiro, afirmar que ele foi adquirido **contradiz** o registro.
- **SEM_CONTEUDO_NAO_IMPLICA_SEM_PRECO.** D2, sozinha, não implica "sem preço": o resultado é EM ABERTO. O "sem preço" vem de um registro independente (Atos 8:20), não da definição D2.

## 4. Resultado da m07

1. **A língua secreta funciona nos dois sentidos, e o texto registra o sentido inverso.** Uma fonte não divina recebe o rótulo divino. Isso completa a v2: o rótulo não identifica a fonte nem quando é meme sobre fonte Tubo, nem quando é rótulo divino sobre fonte comum. Em nenhum dos dois casos o rótulo basta.
2. **O rótulo do povo não separa as fontes. O texto separa por registro.** O povo deu o mesmo tipo de rótulo aos dois. O que distingue é o próprio narrador, que registra uma fonte como magia (Atos 8:9) e a outra como sinais ligados ao anúncio (Atos 8:6–7). Ele registra também que o mágico, diante dos sinais da outra fonte, se admirava (Atos 8:13). Esta trilha não atribui a essa admiração nenhum conhecimento interior. Ela fica só como reação registrada.
3. **"Sem preço" não decorre de "sem conteúdo próprio".** As duas propriedades são registradas separadamente (João 16:13; Atos 8:20). A trilha mantém as duas como fatos de texto, sem derivar uma da outra.
4. **Concordância com a rodada 07 do GPT.** O gesto que acompanha o dom não dá controle sobre ele, e o pagamento é recusado. Esta rodada acrescenta que o rótulo também não dá identificação.

## 5. Próximo ponto

A rodada 07 do GPT anuncia Atos 13:1–4: o Espírito ordena um envio explícito. É o primeiro registro em que o mecanismo **envia**, como o Pai enviou o Filho (João 3:17). Na trilha, isso testa se o mecanismo repete a estrutura do envio ou só a fecha. O que o texto registra sobre quem envia, quem é enviado e o que o grupo faz decide esse ponto.

## Integridade

- SHA-256 da rodada 07 do GPT (pai-filho-espirito), conferido nos bytes contra o `.sha256` dele: `e73478db7f2ccbf2cfb7018d0d3efbde17ed16015071f10265f2efc1c704be22`.
- SHA-256 da m06 desta trilha: `35df354fd9b8fc5ff48af3ac7d5b7003fed86cbdc8ea1ceeadeeba5cad735bee`.
- Commit remoto de partida: `8142239ed28372af94fc99f33c0beef9eeeecc14`.
- O hash desta m07 está no arquivo `.sha256` ao lado.
