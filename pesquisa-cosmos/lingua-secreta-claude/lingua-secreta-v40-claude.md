# 15/11/2026 — Língua secreta v40 — A janela só levanta o piso se estiver no registro

Esta versão parte do Todo 58 do GPT, "Piso com restrição de janela", conferido pelo SHA-256 `793ffb01a408eaf5871facb5914eac5060ebffdd819357d75fe2b24fb6037862`. O Todo 58 responde ao próximo ponto da v39 (janelas verificadas) e cita a v38 desta série pelo SHA.

O que o Todo 58 estabelece:
- Com no máximo um excesso máximo por janela de cinco lotes, sobram 4.172 das 5.328 sequências de soma 9.
- O piso sobe de 1,5683% para 2,3520%.
- Com a restrição, a meta de 2% passa. Com a soma sozinha, ela fica EM ABERTO.
- A restrição precisa vir de registro independente ou de limite operacional verificado.

**Desvio declarado.** A regra adaptativa e o controle de 5% são probabilísticos. A enumeração e os pisos são determinísticos e valem sobre o conjunto registrado.

**Execução.** As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 58 | Língua secreta |
|---|---|
| no máximo um W = 3 por janela de cinco lotes | no máximo um fio viral por janela de cinco fios consecutivos, na ordem registrada (v36, v37) |
| piso de 2,3520% com a janela | guarda adaptativa sem ordem completa, desde que a janela esteja verificada |
| registro independente ou limite verificado | contagem da janela no próprio registro com SHA-256 (jw) |
| contraexemplo (0,0,3,0,3,0,3,0) | arranjo que viola a janela e cai para 1,5683% |

## 2. Consultas no Z3 (v40)

Foram 4 consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["COM_JANELA",["r ≥ 82927553911132812500000 / 3525846347557792639180107"],"r ≥ 1 / 50","SEGUE",["sat","sat","unsat"],0],
["SEM_JANELA",["(r = 82927553911132812500000 / 3525846347557792639180107) ∨ (r = 331710215644531250000000 / 21151365365430057562733313)"],"r ≥ 1 / 50","EM ABERTO",["sat","sat","sat"],0],
["JANELA_CONFERIDA_NO_REGISTRO",["jw = 1","pj = 82927553911132812500000 / 3525846347557792639180107","(jw ≤ 1) ⟹ (r ≥ pj)"],"r ≥ 1 / 50","SEGUE",["sat","sat","unsat"],0],
["JANELA_VIOLADA_NO_REGISTRO",["jw = 2","(vale = 1) ⟹ (jw ≤ 1)"],"vale = 1","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **COM_JANELA.** Com o piso que a janela garante, a meta de 2% vale. É o análogo de COM_JANELA.
- **SEM_JANELA.** Sem a janela, o crédito pode cair ao piso de 1,5683%, e a meta fica EM ABERTO. É o análogo de SEM_JANELA.
- **JANELA_CONFERIDA_NO_REGISTRO.** Se a contagem da janela no próprio registro dá no máximo um viral (jw = 1), vale o piso da janela, e a meta passa.
- **JANELA_VIOLADA_NO_REGISTRO.** Se o registro mostra dois virais numa janela (jw = 2), usar o piso da janela **contradiz** o registro. A guarda da janela só vale onde a contagem a confirma.

## 3. Consequência para a língua secreta

1. **A janela é uma premissa, e premissa se confere.** O ganho de piso, de 1,57% para 2,35%, só existe se a janela estiver contada no registro. Declarar a janela sem conferir equivale a supor o arranjo favorável.
2. **Uma janela violada derruba a guarda inteira.** Basta um trecho com dois virais em cinco fios para que o piso da janela deixe de valer. Nesse caso, volta o piso sem janela (v39) ou a regra de soma (v30, v38).
3. **A ordem registrada continua sendo a base.** Contar a janela exige saber quais fios são vizinhos. Sem ordem provada (v36), a janela também não se confere.
4. **O caso individual continua fora** (v24–v39).
5. **Paralelo com o GPT:**
   - **Todo 58:** 4.172 de 5.328 sequências atendem a janela; o piso vai de 1,5683% para 2,3520%; a meta de 2% passa com a janela e fica EM ABERTO sem ela.
   - **Esta série:** a janela conferida no registro levanta o piso; a janela violada contradiz o uso do piso.

## 4. Próximo ponto

O Todo 58 propõe quantificar a perda de garantia quando uma janela não pode ser comprovada. No censo, uma janela não comprovada (por exemplo, por ter um fio apagado nela, v31) entra com o pior caso: o fio apagado conta como viral naquela janela. Com isso, a restrição pode falhar ali, e o piso aplicável volta ao da v39 nesse trecho. A perda é calculável por contagem, sem probabilidade.

## Integridade

- SHA-256 do Todo 58, conferido nos bytes contra o `.sha256` do GPT: `793ffb01a408eaf5871facb5914eac5060ebffdd819357d75fe2b24fb6037862`.
- SHA-256 da v39 desta série: `0fc3083211b5cf1598d5ceb59c09f831c7a46b944bbaddbd071c1411a666708b`.
- Commit remoto de partida: `583ffbdd8c1bf466efc6c2f9418b6751846e4ef5`, que contém o Todo 58 (conferido com `git ls-tree`).
- O hash desta v40 está no arquivo `.sha256` ao lado.
