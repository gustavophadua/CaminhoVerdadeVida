# 15/11/2026 — Língua secreta v16 — Registro de mudanças de formato sem lacunas

Esta versão parte do Todo 34 do GPT, "Confirmar cobertura sem lacunas". O Todo foi conferido pelo SHA-256 `f76d0e744a52a68ad9f41a1ef0eebfd9fab453f2ae5edd5adc931e3c85393277` e cita a v15 desta série pelo SHA.

O Todo 34 mostra cinco pontos:
- Um marcador (k, C) declara: "todos os eventos com tempo até C já foram numerados até k".
- A cobertura até o fim f é certificável quando C ≥ f e W ≥ k, em que W é o prefixo contínuo recebido.
- Receber o número k não basta. O 120 pode chegar com o 119 faltando.
- Um registro faltante pode esconder uma mudança temporária.
- Uma captura que falha antes de numerar invalida a premissa.

As regras da série continuam:
- Só vale o que o Z3 prova a partir das premissas.
- Sem fonte, degrau ou referência, a saída é EM ABERTO.
- Não há leitura de observador.
- Os valores são sintéticos.

## 1. Mecanismo

| Todo 34 | Língua secreta |
|---|---|
| eventos numerados consecutivamente | cada mudança de formato (regra, público, forma da pergunta) recebe um número consecutivo no registro com SHA-256 |
| marcador (k, C) | quem registra declara: "todas as mudanças com tempo até cf estão numeradas até k" |
| W, prefixo contínuo recebido | wp: maior número até o qual quem analisa tem todas as mudanças, sem buraco |
| m, maior número recebido | o último registro visto, que pode ter buracos antes |
| C ≥ f | o fechamento cobre até o fim da conversa do degrau (ff) |
| captura que falha antes de numerar | mudança que nunca entrou no registro, que nenhum prefixo detecta |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle de ida da v12 (i ≤ 3/10) só vale com cobertura certificada.

## 2. Consultas no Z3 (v16)

Foram 6 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ULTIMO_NAO_BASTA",["m = 9","k = 9","wp = 7"],"wp ≥ k","CONTRADIZ",["sat","unsat","sat"],0],
["PREFIXO_FECHA",["wp ≥ k","cf ≥ ff","n ≤ k","wp ≥ n ⟹ got = 1"],"got = 1","SEGUE",["sat","sat","unsat"],0],
["LACUNA_ABERTA",["s × (1 − s) = 0","((wp ≥ k) ∧ (cf ≥ ff)) ⟹ (i ≤ 3 / 10)","wp = 7","k = 9","cf = ff","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["COBERTO_DECIDE",["s × (1 − s) = 0","((wp ≥ k) ∧ (cf ≥ ff)) ⟹ (i ≤ 3 / 10)","wp = 9","k = 9","cf ≥ ff","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["FECHAMENTO_CEDO",["s × (1 − s) = 0","((wp ≥ k) ∧ (cf ≥ ff)) ⟹ (i ≤ 3 / 10)","wp = 9","k = 9","cf < ff","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CONFIRMA_TARDE",["a = 1","j = 1 / 5","p = 1 / 2","w = 2 / 5"],"j + p + w ≤ a","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **ULTIMO_NAO_BASTA.** O último registro visto é o 9, mas o prefixo contínuo só vai até 7. Afirmar cobertura **contradiz** os dados. É o análogo de MAXIMO_NAO_BASTA.
- **PREFIXO_FECHA.** Com prefixo contínuo até k e fechamento cobrindo o fim, todo evento n ≤ k foi recebido. É o análogo de MARCADOR_COMPLETO.
- **LACUNA_ABERTA.** Com buraco no prefixo (7 < 9), o controle não pode ser usado e a troca observada não decide a fonte: EM ABERTO. A mudança de formato que falta pode estar justamente no buraco.
- **COBERTO_DECIDE.** Com prefixo completo e fechamento até o fim da conversa, o controle vale e a fonte fica decidida (s = 1).
- **FECHAMENTO_CEDO.** Prefixo completo, mas o fechamento é anterior ao fim da conversa (cf < ff). Mudanças depois de cf não estão cobertas, e o resultado é EM ABERTO.
- **CONFIRMA_TARDE.** Se confirmar a cobertura e recuperar as lacunas custa 2/5, a soma passa do prazo e a garantia **contradiz** o orçamento. É o análogo de TARDE.

## 3. Consequência para a língua secreta

1. **O registro de mudanças de formato é numerado e fechado.** Cada mudança de regra, público ou forma da pergunta recebe número consecutivo. Quem registra emite um fechamento com tempo e número, e esse fechamento também é registrado com SHA-256.
2. **Ver o último número não é ver tudo.** Quem analisa precisa do prefixo contínuo até o número do fechamento. Um buraco basta para deixar a decisão EM ABERTO, porque a mudança que falta pode ser exatamente a que invalida o controle.
3. **O fechamento precisa cobrir o fim da conversa do degrau.** Um fechamento emitido antes do fim deixa o final sem cobertura.
4. **O que a captura nunca viu nenhum prefixo detecta.** Se a mudança de formato não entrou no registro na origem, por exemplo uma regra da plataforma alterada sem aviso, todo o raciocínio cai. Essa premissa precisa de fonte própria, como a regra pública versionada da plataforma. Sem essa fonte, o resultado é EM ABERTO.
5. **Paralelo com o GPT.**
   - **Todo 34:** o 120 chega com o 119 faltando, W = 118; com w = 0,32 ms, faltam 0,07 ms.
   - **Esta versão:** o 9 chega com o 8 faltando, wp = 7; com w = 2/5, passa do prazo.

## 4. Próximo ponto

O Todo 34 propõe compor fechamentos de várias fontes, com relógios diferentes e uma confirmação atrasada. Na língua secreta, as fontes de mudança de formato são várias: a regra da plataforma, o público do fio e a forma da pergunta de quem aplica o degrau. Cada uma tem seu próprio registro e seu próprio relógio (v9, v10). A cobertura só se certifica quando todas fecham até o fim da conversa.

## Integridade

- SHA-256 do Todo 34, conferido nos bytes contra o `.sha256` do GPT: `f76d0e744a52a68ad9f41a1ef0eebfd9fab453f2ae5edd5adc931e3c85393277`.
- SHA-256 da v15 desta série: `e6f5caefb11843ffe0e7ced86f83fa1997db86e039b7ac4c6d0fccf63019d7ab`.
- Commit remoto de partida: `9c2c71227bb9176c873e7b7a1a49c7246b821858`.
- O hash desta v16 está no arquivo `.sha256` ao lado.
