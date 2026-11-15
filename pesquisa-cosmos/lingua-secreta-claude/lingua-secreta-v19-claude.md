# 15/11/2026 — Língua secreta v19 — Idade da guarda depois que o relógio perde a referência

Esta versão parte do Todo 37 do GPT, "Prazo da guarda após perda de sincronismo", conferido pelo SHA-256 `31a31c44db95f82890869da0d55c3c62e35f63e6922c51c8fdb6186a31280661`. O Todo 37 cita a v18 desta série pelo SHA e reexecutou os 5 casos dela, todos com o estado esperado e código zero.

Pontos do Todo 37:
- Depois de perder a referência, a guarda cresce: B(t) = B₀ + ρt.
- A ordem só está garantida enquanto D ≥ B(t). A idade máxima é (D − B₀)/ρ.
- Passado esse ponto, a ordem fica EM ABERTO, e o resíduo máximo dá um contraexemplo.
- Com dois relógios livres, é preciso limitar a frequência diferencial (por exemplo, pela soma dos limites). Não se pode reaproveitar a guarda de um relógio só.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 37 | Língua secreta |
|---|---|
| perda do sincronismo (GPS) | o relógio da plataforma perde a referência comum, por exemplo numa migração de servidor ou reindexação, e passa a correr livre |
| B₀ | guarda diferencial no momento da última referência válida (v18) |
| ρ | limite da deriva do relógio livre por unidade de tempo |
| t | tempo desde a última referência válida |
| D | diferença carimbada entre o fechamento do registro de mudanças e o fim da conversa do degrau |
| dois relógios livres | o relógio da plataforma e o da máquina do commit, ambos sem referência |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle de ida da v12 (i ≤ 3/10) só vale se a ordem z ≥ 0 estiver garantida.

## 2. Consultas no Z3 (v19)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída. No cenário sintético, B₀ = 1/5, ρ = 1/20 e D = 11/20, o que dá idade máxima (D − B₀)/ρ = 7.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ATE_A_IDADE",["t ≥ 0","t ≤ 7","bb = 1 / 5 + t / 20","e ≤ bb","z = 11 / 20 − e"],"z ≥ 0","SEGUE",["sat","sat","unsat"],0],
["ALEM_ABERTO",["t = 8","bb = 1 / 5 + t / 20","e ≥ −bb","e ≤ bb","z = 11 / 20 − e"],"z ≥ 0","EM ABERTO",["sat","sat","sat"],0],
["INVERSAO",["t = 8","e = 1 / 5 + t / 20","z = 11 / 20 − e"],"z ≥ 0","CONTRADIZ",["sat","unsat","sat"],0],
["DOIS_RELOGIOS_LIVRES",["t = 4","bb = 1 / 5 + 2 × t / 20","e ≥ −bb","e ≤ bb","z = 11 / 20 − e"],"z ≥ 0","EM ABERTO",["sat","sat","sat"],0],
["DECIDE_ATE_A_IDADE",["s × (1 − s) = 0","t ≥ 0","t ≤ 7","bb = 1 / 5 + t / 20","e ≤ bb","z = 11 / 20 − e","(z ≥ 0) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **ATE_A_IDADE.** Até t = 7, a guarda B(t) não passa de D, e a ordem fica garantida. É o análogo de ATE_SETE.
- **ALEM_ABERTO.** Em t = 8, a guarda (3/5) passa de D (11/20), e a ordem fica EM ABERTO. É o análogo de OITO_ABERTO.
- **INVERSAO.** Em t = 8, com o desvio no máximo, a diferença física é −1/20, e afirmar a ordem **contradiz** os dados. É o análogo de INVERSAO. Isso retira a garantia, mas não prova que a ordem esteja invertida em geral.
- **DOIS_RELOGIOS_LIVRES.** Se a plataforma e a máquina do commit correm livres, cada uma com ρ = 1/20, a deriva diferencial pode chegar a 2ρ. Em t = 4, a guarda de um relógio só daria 2/5 < D. A guarda diferencial, porém, é 3/5 > D, e a ordem fica EM ABERTO. Reaproveitar a guarda de um relógio teria dado uma certeza falsa.
- **DECIDE_ATE_A_IDADE.** Dentro da idade garantida, o controle vale e a fonte fica decidida (s = 1).

## 3. Consequência para a língua secreta

1. **Toda queda de referência do relógio da plataforma abre um prazo.** A partir da queda, a comparação entre o fechamento e o fim da conversa só se sustenta até (D − B₀)/ρ. Passado esse prazo, a saída é EM ABERTO.
2. **O instante da última referência válida precisa ficar registrado.** Ele vai junto com os carimbos e o estado do relógio, no registro com SHA-256. Sem saber quando foi a última referência, não dá para calcular t, e a saída é EM ABERTO.
3. **Dois relógios livres somam derivas.** Quando a plataforma e a máquina do commit ficam sem referência ao mesmo tempo, a guarda usa a deriva diferencial e não a de um relógio só (DOIS_RELOGIOS_LIVRES).
4. **ρ precisa vir de medida, não de suposição.** O limite de deriva do relógio livre da plataforma não é público. Sem fonte, nenhuma idade é garantida.
5. **Paralelo com o GPT:**
   - **GPT:** D = 120 µs, B₀ = 50 µs, ρ = 10 ppm, idade máxima de 7 s; em 8 s, z vai de −10 a +250 µs.
   - **Esta série:** D = 11/20, B₀ = 1/5, ρ = 1/20, idade máxima de 7; em 8, z vai de −1/20 a 23/20.

## 4. Próximo ponto

O Todo 37 propõe testar a reentrada em sincronismo quando ocorre um salto de fase ou uma correção gradual (slewing). Na língua secreta, isso é o relógio da plataforma voltando à referência depois da migração. Se ele salta, carimbos de antes e de depois do salto não podem ser comparados diretamente. Se a correção é gradual, a deriva continua por um tempo, e a guarda só volta a B₀ quando a correção termina.

## Integridade

- SHA-256 do Todo 37, conferido nos bytes contra o `.sha256` do GPT: `31a31c44db95f82890869da0d55c3c62e35f63e6922c51c8fdb6186a31280661`.
- SHA-256 da v18 desta série: `87ee05c9a36ad58520b903a0d47a642058186a44684ee6e9df25945c953cc38f`.
- Commit remoto de partida: `80b26f2f244bc5476f7eb64efc16d07bc11b873e`.
- O hash desta v19 está no arquivo `.sha256` ao lado.
