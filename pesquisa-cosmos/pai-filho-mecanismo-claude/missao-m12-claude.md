# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m12: dois envios no mesmo trecho; o segundo pressupõe o primeiro

Esta rodada segue o próximo ponto da m11: formalizar os dois envios de Gálatas 4:4–7 (quem envia, o que é enviado, para onde e em que ordem). Ela dialoga com a rodada 12 do GPT, "dois envios em Gálatas" (SHA-256 `244785fd79785c87c634c9bc56798c257c3494a7afb6c5fe08a6cb07bc6b085b`). Essa rodada mostra que o texto dá funções distintas aos dois envios (resgate com vista à adoção; clamor ao Pai) e que a passagem não marca o tempo das etapas para cada destinatário.

**Método** (o mesmo da m01 à m11):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas.
- Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou sem o carregador de memória, porque havia memória livre.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| primeiro envio | na plenitude do tempo, Deus envia o Filho, nascido de mulher e sob a lei | Gálatas 4:4 |
| função do primeiro | resgatar os que estavam sob a lei, para que recebessem a adoção | Gálatas 4:5 |
| razão do segundo | porque são filhos | Gálatas 4:6 |
| segundo envio | Deus envia aos corações o Espírito de seu Filho, que clama ao Pai | Gálatas 4:6 |
| resultado | já não é escravo, mas filho; e, se filho, herdeiro | Gálatas 4:7 |
| outro registro de quem envia | o Pai enviará o Espírito em nome do Filho; o Filho o enviará da parte do Pai | João 14:26; 15:26 |
| reação do mundo nessa época | os destinatários da carta se voltam para outro anúncio e para os rudimentos, guardando dias, meses, tempos e anos | Gálatas 1:6–7; 4:9–10 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| primeiro envio | ef = 1: o Filho é enviado, e a função é o resgate (fa) |
| filiação | fi = 1: a adoção que decorre do primeiro envio |
| segundo envio | es = 1: o Espírito do Filho é enviado porque já há filhos, e a função é o clamor ao Pai (fb) |
| quem envia o segundo no trecho | eb = p (Deus, Gálatas 4:6), distinto do Filho (p ≠ f) |
| fechamento (F2, m03) | o segundo envio opera sobre o que o primeiro entregou: a filiação |
| tempo por destinatário | ta, tb: não registrado (EM ABERTO) |
| contagem de um lado (m01, m04) | a carta registra o retrocesso dos destinatários; não registra quantos ficaram, e nenhum lado é contado |

## 3. Consultas no Z3 (m12)

Foram 4 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["SEGUNDO_ENVIO_PRESSUPOE_O_PRIMEIRO",["(es = 1) ⟹ (fi = 1)","(fi = 1) ⟹ (ef = 1)","es = 1"],"ef = 1","SEGUE",["sat","sat","unsat"],0],
["ENVIADOR_DO_SEGUNDO_NO_TRECHO",["eb = p","p ≠ f"],"eb = f","CONTRADIZ",["sat","unsat","sat"],0],
["FUNCOES_DISTINTAS",["fa = 1","fb = 2"],"fa = fb","CONTRADIZ",["sat","unsat","sat"],0],
["TEMPO_POR_DESTINATARIO",["ta ≥ 0","tb ≥ 0"],"ta < tb","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **SEGUNDO_ENVIO_PRESSUPOE_O_PRIMEIRO.** O segundo envio vem "porque são filhos" (4:6), e a filiação vem do resgate do primeiro (4:5). Pela cadeia, haver o segundo envio implica ter havido o primeiro. É a forma "depois do Filho, o mecanismo" do modelo [S-U], agora registrada como dependência dentro de um único trecho.
- **ENVIADOR_DO_SEGUNDO_NO_TRECHO.** Em Gálatas 4:6, quem envia o Espírito é Deus. Afirmar que, nesse trecho, quem envia é o Filho **contradiz** o registro. João 15:26 registra o Filho enviando da parte do Pai. São dois registros diferentes, e esta rodada não os funde.
- **FUNCOES_DISTINTAS.** O texto associa ao primeiro envio o resgate e ao segundo o clamor ao Pai. Afirmar que as duas funções são a mesma **contradiz** o registro. É o resultado da rodada 12 do GPT, reproduzido no Z3.
- **TEMPO_POR_DESTINATARIO.** A passagem não diz quanto tempo separa as etapas para cada destinatário. A ordem no tempo fica EM ABERTO. A ordem lógica (a consulta 1) fica decidida.

## 4. Resultado da m12

1. **O mecanismo vem depois do Filho e depende dele.** No mesmo trecho, o segundo envio tem como razão a filiação produzida pelo primeiro. Na linguagem do Todo, é um degrau: o segundo só abre sobre o que o primeiro deixou. Isso dá forma textual a "o mecanismo vem para fechar o Filho" no sentido F2 (m03): operar sobre o que foi entregue.
2. **O que o mecanismo leva é do Filho e aponta para o Pai.** O enviado é o "Espírito de seu Filho", e o clamor é ao Pai. Isso é coerente com a cadeia da m08: o conteúdo não muda ao longo dos envios (D2, vm = 0). O texto não registra conteúdo próprio do segundo envio além do clamor.
3. **Os dois envios não são o mesmo, nem têm a mesma função.** Envio do Filho = resgate; envio do Espírito = clamor. A repetição é de forma (envia, alguém vai), como na m08, não de função.
4. **Reação do mundo nessa época.** A mesma carta registra os destinatários voltando aos rudimentos e a outro anúncio (Gálatas 1:6–7; 4:9–10). Mesmo com os dois envios registrados, o texto registra um retorno ao estado anterior. É o mesmo padrão da m11: o fato registrado não fixa a reação. Fica sem contagem.
5. **Fica EM ABERTO:**
   - o tempo entre as etapas para cada destinatário;
   - a reação interna do Filho ao segundo envio, que a rodada 12 do GPT também deixa EM ABERTO;
   - como juntar Gálatas 4:6 (Deus envia) e João 15:26 (o Filho envia da parte do Pai) numa regra única.

## 5. Próximo ponto

A rodada 12 do GPT anuncia Romanos 8:14–17, que compara o sujeito do clamor em Gálatas 4:6 com o clamor e o testemunho em Romanos 8. Nesta trilha, a pergunta é a da língua secreta: em Romanos 8:16, o Espírito testemunha *com* o espírito dos filhos. Se houver dois testemunhos sobre o mesmo fato, isso funciona como uma referência dupla, como as duas pontas da v41–v43? Ou é um só? O teste usa só o que o texto registra sobre quem testemunha e o quê.

## Integridade

- SHA-256 da rodada 12 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `244785fd79785c87c634c9bc56798c257c3494a7afb6c5fe08a6cb07bc6b085b`.
- SHA-256 da m11 desta trilha: `30d8d250162ea85367306e9b6288aab1d2a5a5696c7eed5d6e5b77fa8b26d66d`.
- Commit remoto de partida: `d242ac81a0f0b25a0ad4d8f0c3365fbfb8309178`. A rodada 12 do GPT ainda **não** está nesse commit, o que foi conferido com `git ls-tree`. Ela foi lida e conferida na pasta local.
- O hash desta m12 está no arquivo `.sha256` ao lado.
