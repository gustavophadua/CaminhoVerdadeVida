# 15/11/2026 — Língua secreta v8 — Limite conjunto em vez de limites somados

Esta versão parte do Todo 26 do GPT, "Limite conjunto para relógio e processamento". O Todo 26 foi conferido pelo SHA-256 `ce986afc7d9fd5214cf5a863c461deeaa14e4773116feb52750e0f5a8b06c104` e cita a v7 desta série pelo SHA.

O Todo 26 mostra três coisas:
- os máximos marginais de p e de j podem não acontecer juntos;
- um limite conjunto (p + j ≤ 11 ms) recupera uma janela que os limites separados fecham;
- sem o limite conjunto, a garantia fica EM ABERTO.

O limite conjunto só vale se for medido no mesmo ensaio. O máximo de uma amostra finita não é uma garantia universal.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 26 | Língua secreta |
|---|---|
| p e j com máximos marginais | k (desvio entre trechos, v5) e dv = lv·dd (deriva pela idade da referência, v6), cada um com seu máximo |
| limite conjunto p + j ≤ H | k + dv ≤ limite conjunto, medido no mesmo lugar e no mesmo período |
| j assinado, mínimo J | erro assinado do carimbo de tempo: pode adiantar ou atrasar |
| janela max(0, H) ≤ a ≤ J + folga/S | registro: j + p ≤ a e lv·(a − j) + k < 1 |
| máximo amostral ≠ garantia | um k + dv observado não é um limite sem uma regra com fonte |

O comentário medido é m = s + b, com s = 1 (Tubo) ou s = 0 (literal). A referência é r = q + bb, com a fonte q conhecida.

## 2. Consultas no Z3 (v8)

Cinco consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["MARGINAIS_NAO_BASTAM",["k ≥ 0","k ≤ 1 / 2","dv ≥ 0","dv ≤ 1 / 2"],"k + dv < 1","EM ABERTO",["sat","sat","sat"],0],
["SEPARADO_ABERTO",["s × (1 − s) = 0","k ≥ 0","k ≤ 1 / 2","dv ≥ 0","dv ≤ 1 / 2","m = s + b","r = q + bb","bb − b ≤ k + dv","b − bb ≤ k + dv","q = 0","r = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0],
["CONJUNTO_DECIDE",["s × (1 − s) = 0","k ≥ 0","k ≤ 1 / 2","dv ≥ 0","dv ≤ 1 / 2","k + dv ≤ 3 / 5","m = s + b","r = q + bb","bb − b ≤ k + dv","b − bb ≤ k + dv","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["JANELA_CONJUNTA",["a ≥ 3 / 10","a ≤ 1","j ≥ −1 / 10","j ≤ 1 / 10","p ≥ 0","j + p ≤ 3 / 10","lv = 1 / 2","k = 1 / 10"],"j + p ≤ a ∧ lv × (a − j) + k < 1","SEGUE",["sat","sat","unsat"],0],
["RELOGIO",["ap = t − tr","apo = (t + o) − (tr + o)"],"apo = ap","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **MARGINAIS_NAO_BASTAM.** Com k ≤ 1/2 e dv ≤ 1/2 tomados em separado, a soma pode chegar a 1, que é o degrau entre os rótulos. A garantia k + dv < 1 fica EM ABERTO. É o análogo direto do MARGINAIS_NAO_BASTAM do Todo 26.
- **SEPARADO_ABERTO.** Só com esses limites marginais, a referência literal não decide a fonte: EM ABERTO.
- **CONJUNTO_DECIDE.** Com os mesmos marginais mais o limite conjunto k + dv ≤ 3/5, a fonte fica decidida (s = 0). É o análogo de GARANTIA_CONJUNTA.
- **JANELA_CONJUNTA.** Com erro de carimbo assinado |j| ≤ 1/10 e o limite conjunto j + p ≤ 3/10, a janela de registro [3/10, 1] satisfaz as duas condições: o registro fica pronto antes do degrau, e a deriva até o degrau fica abaixo do degrau. A v7 somava os piores casos; aqui o limite conjunto recupera a janela.
- **RELOGIO.** Somar a mesma origem ao relógio não muda a antecedência.

## 3. Consequência para a língua secreta

1. **Somar os piores casos pode fechar uma decisão que existe.** Se o trecho mais desviado (k máximo) e a referência mais velha (dv máximo) não acontecem juntos, somar os dois máximos joga fora a decisão. Para recuperá-la, é preciso medir os dois juntos.
2. **O limite conjunto precisa de fonte no mesmo ensaio.** k e dv têm de ser contados na mesma janela, no mesmo lugar e com o mesmo registro. Um limite conjunto tirado de lugares diferentes não vale.
3. **O máximo observado não é garantia.** Como no Todo 26, o maior k + dv visto numa amostra finita não prova que o próximo comentário fique abaixo dele. O limite conjunto entra como regra declarada, com fonte e marcada como tal, e o SEGUE vale condicionado a essa regra.
4. **Resultado paralelo nas duas séries:**
   - o GPT recuperou a janela [11; 11,42] ms com p + j ≤ 11 ms;
   - aqui, k + dv ≤ 3/5 recupera a decisão que k ≤ 1/2 e dv ≤ 1/2, tomados em separado, deixavam EM ABERTO.

## 4. Próximo ponto

O Todo 26 propõe incluir os erros dos próprios registros de tempo numa guarda conjunta verificável. Na língua secreta, isso significa tratar o carimbo da plataforma, o carimbo do commit e o carimbo do bloco (se houver OTS) como três relógios com erros próprios. A ordem "registro antes do degrau" passa a exigir um limite conjunto entre esses erros, e não três limites separados.

## Integridade

- SHA-256 do Todo 26, conferido nos bytes contra o `.sha256` do GPT: `ce986afc7d9fd5214cf5a863c461deeaa14e4773116feb52750e0f5a8b06c104`.
- SHA-256 da v7 desta série: `20d594d27aa113c9880ae215aebf1ece036e9a3b5b10435e97380df8f2ce37b8`.
- Commit remoto de partida: `44dfaaf0c7fa25e8b4ac2a9ac4e8c411fc082db0`.
- O hash desta v8 está no arquivo `.sha256` ao lado.
