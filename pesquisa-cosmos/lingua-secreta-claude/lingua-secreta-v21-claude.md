# 15/11/2026 — Língua secreta v21 — Migração da plataforma: ordem decidida, idade aberta

Esta versão parte do Todo 39 do GPT, "Um reinício separa ordem de duração", conferido pelo SHA-256 `241dba3e947b2859d2fdb61e7d871020791b615b5a957fdddf021f8595e7c1a2`. O Todo 39 continua a v20 desta série (numeração reiniciada após migração), cita a v20 pelo SHA e reexecutou os 6 casos dela, todos com o estado esperado.

O que o Todo 39 estabelece:
- Com épocas encadeadas (x ≤ a ≤ b ≤ y), a ordem fica decidida mesmo que o número posterior seja menor.
- A duração d = u + g + v inclui o intervalo cego g da reinicialização.
- Sem um limite para g, o prazo fica EM ABERTO.
- Com g limitado, o prazo é decidido; com g grande demais, a garantia é contraditada.
- Não se deve contar g como zero na ausência de uma ponte.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 39 | Língua secreta |
|---|---|
| época anterior e posterior | a plataforma antes e depois de uma migração que renumera comentários (v20) |
| x ≤ a ≤ b ≤ y | comentário-referência na época antiga (xa), fim certificado da época antiga (fa), início certificado da nova (ib), comentário medido na época nova (yb) |
| número posterior menor | o comentário novo tem número menor que o antigo, porque a numeração reiniciou |
| u, g, v | trecho medido antes da migração, intervalo cego da migração e trecho medido depois |
| prazo de 10 ms | idade admissível da referência pela v6: lv·dd + k < 1 |
| ponte que mede g | registro externo da duração da migração, como uma nota pública da plataforma com horários ou um relógio independente |

Comentário medido: m = s + b. Referência: r = q + bb, com |b − bb| ≤ lv·dd + k, como na v6. Aqui dd = u + g + v atravessa a migração.

## 2. Consultas no Z3 (v21)

Seis consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ORDEM_ENTRE_EPOCAS",["xa ≤ fa","fa ≤ ib","ib ≤ yb"],"xa ≤ yb","SEGUE",["sat","sat","unsat"],0],
["NUMERO_NAO_ORDENA",["nx > ny"],"xa ≤ yb","EM ABERTO",["sat","sat","sat"],0],
["IDADE_ABERTA",["g ≥ 0","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10"],"lv × dd + k < 1","EM ABERTO",["sat","sat","sat"],0],
["PONTE_LIMITA_IDADE",["g ≥ 0","g ≤ 3 / 2","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10"],"lv × dd + k < 1","SEGUE",["sat","sat","unsat"],0],
["PONTE_TARDE",["g = 8 / 5","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10"],"lv × dd + k < 1","CONTRADIZ",["sat","unsat","sat"],0],
["DECIDE_COM_PONTE",["s × (1 − s) = 0","g ≥ 0","g ≤ 3 / 2","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + b","r = q + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **ORDEM_ENTRE_EPOCAS.** Com o fim da época antiga e o início da nova certificados, a referência antiga vem antes do comentário novo. Análogo de ORDEM.
- **NUMERO_NAO_ORDENA.** Saber só que o número do comentário antigo é maior que o do novo não fixa a ordem dos eventos: EM ABERTO. Números de épocas diferentes não se comparam.
- **IDADE_ABERTA.** A referência foi feita antes da migração e o comentário depois. Sem limite para o intervalo cego g, a idade dd não tem teto, e a condição de idade da v6 fica EM ABERTO. Análogo de DURACAO_ABERTA.
- **PONTE_LIMITA_IDADE.** Com a migração limitada a g ≤ 3/2, a idade fica abaixo de 1,7 e lv·dd + k < 1. A referência vale. Análogo de PONTE_LIMITE.
- **PONTE_TARDE.** Com g = 8/5, lv·dd + k = 1, que é o degrau, e a condição **contradiz** os dados. Análogo de PONTE_TARDE. A garantia cai, mas isso não prova a outra fonte.
- **DECIDE_COM_PONTE.** Com a ponte, a referência literal decide a fonte (s = 0).

## 3. Consequência para a língua secreta

1. **Ordem e idade são perguntas diferentes.** Uma migração com fronteiras certificadas permite dizer que a referência veio antes do comentário. Não permite dizer quanto tempo passou. A idade é o que a v6 exige para a referência valer.
2. **Não contar a migração como zero.** O tempo em que a plataforma esteve fora do ar ou migrando entra na idade da referência. Sem uma ponte com fonte para esse tempo, uma referência anterior à migração não decide a fonte de um comentário posterior.
3. **A numeração nova não se compara com a antiga.** Depois de uma migração, um número menor não quer dizer "antes". A ordem entre épocas exige a cadeia certificada fim antigo → início novo.
4. **Melhor ter uma referência do mesmo lado da migração.** Uma referência na época nova, vizinha ao comentário (v5), dispensa a ponte. Ela vale mais que uma referência antiga com migração no meio.
5. **Paralelo com o GPT:**

   | | Sem limite para g | g permitido | g que derruba a garantia |
   |---|---|---|---|
   | Todo 39 | prazo EM ABERTO | ≤ 7 ms | 8 ms |
   | Esta série | idade EM ABERTO | ≤ 3/2 | 8/5 |

## 4. Próximo ponto

O Todo 39 propõe testar os limites da ponte com duas âncoras externas incertas, incluindo o caso em que ambas compartilham o mesmo deslocamento. Na língua secreta, as duas âncoras para medir a duração da migração podem ser a nota pública da plataforma e o carimbo do bloco Bitcoin de um commit feito durante a migração. O OTS só entra com sim explícito. Se as duas âncoras compartilham o mesmo deslocamento, o erro comum cancela na duração (v18). Se não compartilham, os erros se somam.

## Integridade

- SHA-256 do Todo 39, conferido nos bytes contra o `.sha256` do GPT: `241dba3e947b2859d2fdb61e7d871020791b615b5a957fdddf021f8595e7c1a2`.
- SHA-256 da v20 desta série: `64d1b7e7a71e9748dbe86fae2eddfd871a4ac0430b1b07f4ff95d29fc830bd6a`.
- Commit remoto de partida: `491ed4315b362dc75aeaf40789ca385e3d1b832f`.
- O hash desta v21 está no arquivo `.sha256` ao lado.
