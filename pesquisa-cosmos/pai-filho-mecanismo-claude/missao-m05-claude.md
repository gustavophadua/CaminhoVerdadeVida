# 15/11/2026 — Pai envia, Filho reage, mecanismo fecha — m05: do canal secreto ao direto, na mesma pessoa

Esta rodada segue o próximo ponto da m04: procurar no registro o caso positivo da regra R da língua secreta, pela qual custo direto alto leva ao canal secreto. Ela também dialoga com a rodada 05 do GPT, "testemunho e respostas" (SHA-256 `75c9d759c9123632153c3b6937bf7eb9f4028d65288abf6ab726835e356a44e4`). Com Atos 10:44–48, o GPT mostra que a ordem "batismo, depois dom" registrada em Atos 2 não é regra universal.

**Método**, igual ao das rodadas m01–m04:
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Só entram fatos registrados, parafraseados e com referência.
- Motivos interiores só entram quando o próprio narrador os registra, e então como registro do texto.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas declaradas.
- Sem fonte, o resultado é EM ABERTO.

**Execução.** Rodei com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| custo direto como regra explícita | havia acordo para expulsar da sinagoga quem confessasse que ele era o Cristo | João 9:22 |
| fala evasiva sob esse custo | os pais do cego respondem que perguntem ao filho, que tem idade; o narrador liga isso ao temor | João 9:21–23 |
| crer sem confessar | muitos das autoridades creram, mas não confessavam, para não serem expulsos da sinagoga | João 12:42 |
| canal noturno | um dos fariseus vem ao Filho de noite | João 3:1–2 |
| discípulo oculto | José de Arimateia era discípulo, mas em oculto, por medo | João 19:38 |
| passagem ao direto antes do Pentecostes | o mesmo José pede o corpo; o que viera de noite traz mirra e aloés | João 19:38–39 |
| ainda sem o mecanismo nesse momento | o Espírito ainda não fora dado (João 7:39) e só vem no Pentecostes (Atos 2:1–4) | João 7:39; Atos 2:1–4 |
| mesma pessoa, primeiro estado | Pedro nega três vezes ser do grupo | João 18:17, 25–27 |
| mesma pessoa, segundo estado | Pedro, cheio do Espírito, fala direto sob ordem de calar (m04) | Atos 4:8–20 |
| outra diferença registrada entre os estados | eles falam do que viram e ouviram depois da ressurreição | Atos 4:20; Atos 1:3 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| regra R (v1, v2, m04) | cd > cs ⟹ tr = 1, isto é, troca para o rótulo secreto |
| caso positivo registrado | custo direto explícito (João 9:22; 12:42) e silêncio ou evasiva (tr = 1) |
| degrau na mesma pessoa (v2) | Pedro: rótulo negado antes (ta = 1) e fala direta depois (td = 0) |
| duas mudanças entre os estados (v11) | o mecanismo presente depois (mb = 0, ma = 1; Atos 4:8) e o ter visto o ressuscitado (rb = 0, ra = 1; Atos 1:3; 4:20) |
| passagem sem o mecanismo | José e o visitante noturno passam ao ato direto (tj = 0) antes do Pentecostes (me = 0) |

## 3. Consultas no Z3 (m05)

Foram quatro consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["COMPORTAMENTO_NAO_REVELA_CUSTO",["(cd > cs) ⟹ (tr = 1)","tr = 1","cd = 1"],"cd > cs","EM ABERTO",["sat","sat","sat"],0],
["MESMA_PESSOA_TROCA_DE_ROTULO",["ta = 1","td = 0"],"ta = td","CONTRADIZ",["sat","unsat","sat"],0],
["CAUSA_DA_TROCA_ABERTA",["ta = 1","td = 0","mb = 0","ma = 1","rb = 0","ra = 1","k × (1 − k) = 0","(k = 0) ⟹ ((td = 1 − ma) ∧ (ta = 1 − mb))","(k = 1) ⟹ ((td = 1 − ra) ∧ (ta = 1 − rb))"],"k = 0","EM ABERTO",["sat","sat","sat"],0],
["DIRETO_SEM_O_MECANISMO",["me = 0","tj = 0"],"(me = 0) ⟹ (tj = 1)","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **COMPORTAMENTO_NAO_REVELA_CUSTO.** O caso de João 12:42 é compatível com a regra R: o custo direto está registrado e há silêncio. Mas o silêncio não prova que o custo direto superava o secreto, porque a regra R só vai do custo ao comportamento, não do comportamento ao custo. O resultado é EM ABERTO.
- **MESMA_PESSOA_TROCA_DE_ROTULO.** Pedro tem dois rótulos registrados, a negação (João 18) e a fala direta (Atos 4). Afirmar que são iguais **contradiz** o registro. É um degrau de verdade na mesma pessoa, como na v2.
- **CAUSA_DA_TROCA_ABERTA.** Entre os dois estados mudaram duas coisas registradas: o mecanismo presente (Atos 4:8) e o ter visto o ressuscitado (Atos 1:3; 4:20). As duas explicam a troca igualmente bem, e qual delas causa fica EM ABERTO. É a mesma falta de controle da v11: sem um caso que separe as duas mudanças, não se atribui.
- **DIRETO_SEM_O_MECANISMO.** José de Arimateia e o visitante noturno passam do oculto ao ato direto (João 19:38–39) antes da vinda do mecanismo (João 7:39). A regra "sem o mecanismo, só o canal secreto" **contradiz** o registro.

## 4. Resultado da m05

1. **A regra R tem casos positivos registrados.** Em João 9:22 e 12:42, o custo direto é explícito (expulsão) e a resposta é silêncio ou evasiva. Junto com Atos 4 (m04), o texto registra os dois lados: sob custo direto registrado, há silêncio (João 12:42) e há fala direta (Atos 4). A regra R não é lei universal sem o custo do canal secreto, que o texto não registra.
2. **A mesma pessoa troca de rótulo, mas a causa não é única.** Pedro passa da negação à fala direta, e entre os dois estados há duas mudanças registradas. A troca não pode ser atribuída só ao mecanismo sem um caso que separe as duas.
3. **Esse caso existe, e ele não atribui a troca ao mecanismo.** Em João 19:38–39, a passagem do oculto ao direto acontece antes do mecanismo, depois da morte do Filho. "Só com o mecanismo se fala direto" é contradito. O que o registro sustenta é mais estreito: o fim da obra (João 19:30) já precede uma troca de rótulo, antes do fechamento.
4. **Concordância com a rodada 05 do GPT.** Ordens registradas num trecho (Atos 2) não viram regra universal quando outro trecho (Atos 10) tem outra ordem. Vale também para a regra R.

## 5. Próximo ponto

Separar as duas mudanças do caso de Pedro, procurando no registro alguém que viu o ressuscitado e ainda fala em segredo, ou que fala direto antes de vê-lo. Um candidato é a reunião a portas fechadas por medo, depois da ressurreição e antes do Pentecostes (João 20:19). Ali houve o ver, a fala pública ainda não, e o mecanismo ainda não tinha vindo (Atos 2). Se esse registro se confirmar, ver o ressuscitado sozinho não bastou para a fala pública.

## Integridade

- SHA-256 da rodada 05 do GPT (pai-filho-espirito), conferido nos bytes contra o `.sha256` dele: `75c9d759c9123632153c3b6937bf7eb9f4028d65288abf6ab726835e356a44e4`.
- SHA-256 da m04 desta trilha: `4b1454694207e0990faced7aa5601df96a21ece2a02ea47eb21f243d169adc28`.
- Commit remoto de partida: `2668ffbf697b5a9222313e25a7d5e74e435a4dce`.
- O hash desta m05 está no arquivo `.sha256` ao lado.
