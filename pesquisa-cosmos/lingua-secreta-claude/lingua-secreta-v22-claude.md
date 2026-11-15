# 15/11/2026 — Língua secreta v22 — Duas âncoras externas em volta da migração

Esta versão parte do Todo 40 do GPT, "Duas âncoras externas podem limitar o intervalo cego", conferido pelo SHA-256 `5ca845cd8caa30453a0b3861db53a42860e05d291cb225389bdfd144f59d1bc1`. O Todo 40 segue a proposta das duas âncoras feita na v21 desta série, cita a v21 pelo SHA e reexecutou os 6 casos dela com o estado esperado.

O que o Todo 40 estabelece:
- Com p ≤ a ≤ b ≤ q e carimbos de deslocamento comum, o intervalo cego tem o limite g ≤ (y − x) + (e − f), mesmo com o deslocamento desconhecido.
- Marcas dentro da parada dão só limite inferior, e g fica EM ABERTO.
- Offsets distintos sem guarda diferencial também deixam EM ABERTO.
- A direção do vínculo causal conta: uma publicação tardia sobre o início não prova que foi carimbada antes da parada.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 40 | Língua secreta |
|---|---|
| a, b: parada e retorno | fa: fim certificado da época antiga da plataforma; ib: início certificado da nova (v21) |
| p, q: eventos testemunhados por fora | pa: registro externo feito antes da parada; qa: registro externo feito depois do retorno |
| deslocamento comum k | os dois registros externos são carimbados pelo mesmo relógio fora da plataforma (o mesmo serviço) |
| resíduos e, f | erro diferencial entre os dois carimbos externos |
| marcas internas | registros feitos durante a migração, que só mostram que ela durou pelo menos aquilo |
| publicação tardia | um aviso publicado depois da parada falando do início dela |

Comentário medido: m = s + b. Referência: r = q + bb. Como na v6/v21, |b − bb| ≤ lv·dd + k, com dd = 1/10 + g + 1/10.

## 2. Consultas no Z3 (v22)

Cinco consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ANCORAS_EXTERNAS",["pa ≤ fa","fa ≤ ib","ib ≤ qa","xa = pa + kk + ea","ya = qa + kk + fe","ya − xa = 6 / 5","ea − fe ≤ 1 / 10"],"ib − fa ≤ 13 / 10","SEGUE",["sat","sat","unsat"],0],
["ANCORAS_INTERNAS",["fa ≤ pa","pa ≤ qa","qa ≤ ib","qa − pa = 6 / 5"],"ib − fa ≤ 3 / 2","EM ABERTO",["sat","sat","sat"],0],
["RELOGIOS_DISTINTOS",["pa ≤ fa","fa ≤ ib","ib ≤ qa","xa = pa + kk","ya = qa + ll","ya − xa = 6 / 5"],"ib − fa ≤ 3 / 2","EM ABERTO",["sat","sat","sat"],0],
["PUBLICACAO_TARDIA",["fa < pa","fa ≤ ib","ib ≤ qa","qa − pa = 6 / 5"],"ib − fa ≤ 3 / 2","EM ABERTO",["sat","sat","sat"],0],
["DECIDE_COM_ANCORAS",["s × (1 − s) = 0","pa ≤ fa","fa ≤ ib","ib ≤ qa","xa = pa + kk + ea","ya = qa + kk + fe","ya − xa = 6 / 5","ea − fe ≤ 1 / 10","g = ib − fa","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + b","r = q + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **ANCORAS_EXTERNAS.** Um registro externo antes da parada e outro depois do retorno, os dois do mesmo relógio, ficam 6/5 apartados nos carimbos, com erro diferencial de até 1/10. Isso limita a migração a g ≤ 13/10, abaixo do 3/2 exigido pela v21, mesmo sem conhecer o deslocamento kk. É o análogo de LIMITE_EXTERNO.
- **ANCORAS_INTERNAS.** Se os registros foram feitos durante a migração, 6/5 é só um mínimo, e o limite de 3/2 fica EM ABERTO. É o análogo de MARCAS_INTERNAS.
- **RELOGIOS_DISTINTOS.** Registros externos em relógios diferentes, sem guarda entre eles, deixam o resultado EM ABERTO. É o análogo de OFFSET_DESCONHECIDO.
- **PUBLICACAO_TARDIA.** O primeiro registro foi publicado depois da parada, mesmo falando do início dela. Ele não delimita a borda, e o resultado fica EM ABERTO.
- **DECIDE_COM_ANCORAS.** A cadeia completa vale assim: âncoras externas → g ≤ 13/10 → idade dd ≤ 3/2 → lv·dd + k ≤ 17/20 < 1 → a referência literal decide a fonte (s = 0).

## 3. Consequência para a língua secreta

1. **A migração se mede de fora, cercando-a.** São precisos dois registros fora da plataforma, um antes de ela parar e outro depois de voltar, carimbados pelo mesmo relógio externo. O deslocamento desse relógio cancela na diferença (v18), e sobra só o erro diferencial.
2. **"Antes" e "depois" precisam ser causais, não só declarados.** O registro de antes precisa ter sido carimbado antes da parada. Um aviso publicado depois falando do início não serve. O registro de depois precisa vir de quando a plataforma já tinha voltado.
3. **Registros durante a migração não fecham o intervalo.** Eles só mostram que ela durou pelo menos aquilo, e o máximo continua EM ABERTO.
4. **A cadeia inteira fecha.** Âncoras externas limitam a migração (v22), a migração limita a idade da referência (v21), a idade limita a deriva da base (v6) e a referência decide a fonte (v3). Cada elo tem fonte própria. Se um faltar, o resultado é EM ABERTO.
5. **Paralelo com o GPT:**
   - Todo 40: carimbos com 6 ms de diferença e guarda de 1 ms dão g ≤ 7 ms.
   - Esta série: diferença de 6/5 e guarda de 1/10 dão g ≤ 13/10.

## 4. Próximo ponto

O Todo 40 propõe deduzir quanto atraso de testemunho, com sinal desconhecido, se tolera sem perder o prazo. Na língua secreta, isso é o atraso entre o evento real (a parada ou o retorno da plataforma) e o registro externo que o testemunha. Se esse atraso tem sinal desconhecido, o registro pode estar do lado errado da borda. A guarda precisa absorver esse atraso nos dois sentidos.

## Integridade

- SHA-256 do Todo 40, conferido nos bytes contra o `.sha256` do GPT: `5ca845cd8caa30453a0b3861db53a42860e05d291cb225389bdfd144f59d1bc1`.
- SHA-256 da v21 desta série: `dd20a4c2029b42b42e5d372722af78707a08352d60ba3bc91ac8a4dd7ee199af`.
- Commit remoto de partida: `e217f26419ff261717a34045cb9c180b3e5e7e1b`.
- O hash desta v22 está no arquivo `.sha256` ao lado.
