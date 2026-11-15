# 15/11/2026 — Língua secreta v9 — Erro dentro do próprio limite registrado

Esta versão parte do Todo 27 do GPT, "Quanto erro cabe nos registros de tempo", conferido pelo SHA-256 `c6eb1f67f9db527f8c2e4eed4c40a5a975011109624d13514beb8ef889c6dd56`. O Todo 27 cita a v8 desta série pelo SHA.

O Todo 27 mostra três coisas:
- os limites registrados Ĥ e Ĵ também têm erro (e_H, e_J);
- a janela garantida passa a ser [Ĥ + e_H, teto − e_J] e só existe se e_H + e_J ≤ folga;
- quando um registro intermediário é reutilizado, ele se cancela na soma das diferenças. Por isso o erro dele não deve ser contado duas vezes.

Regras da série, que continuam valendo:
- só conta o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- valores sintéticos.

## 1. Mecanismo

| Todo 27 | Língua secreta |
|---|---|
| Ĥ registrado, erro e_H | h: antecedência mínima registrada para o pré-registro (v7), com erro eh |
| Ĵ registrado, erro e_J | g: antecedência máxima antes que a base derive além do degrau (v7), com erro ej |
| janela existe ⟺ e_H + e_J ≤ folga | a janela de registro existe ⟺ eh + ej ≤ g − h |
| limite conjunto registrado | c: limite conjunto k + dv registrado (v8), com erro de contagem ec; o limite real cr ≤ c + ec |
| (r − s) + (f − r) = f − s | carimbo da plataforma (pl) → carimbo do commit (cm) → carimbo do bloco (bl): o commit intermediário se cancela na diferença total |

Comentário medido: m = s + b, com s = 1 (Tubo) ou s = 0 (literal). Referência: r = q + bb.

## 2. Consultas no Z3 (v9)

Foram cinco consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["FOLGA_REGISTRO",["eh ≥ 0","ej ≥ 0","a ≥ h + eh","a ≤ g − ej"],"eh + ej ≤ g − h","SEGUE",["sat","sat","unsat"],0],
["ERRO_ALTO_REGISTRO",["a ≥ 3 / 10 + 3 / 20"],"a ≤ 1 / 2 − 3 / 20","CONTRADIZ",["sat","unsat","sat"],0],
["LIMITE_MEDIDO_DECIDE",["s × (1 − s) = 0","c = 3 / 5","ec = 1 / 5","cr ≥ 0","cr ≤ c + ec","m = s + b","r = q + bb","bb − b ≤ cr","b − bb ≤ cr","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["LIMITE_MEDIDO_ABERTO",["s × (1 − s) = 0","c = 3 / 5","ec = 2 / 5","cr ≥ 0","cr ≤ c + ec","m = s + b","r = q + bb","bb − b ≤ cr","b − bb ≤ cr","q = 0","r = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0],
["CADEIA_CARIMBOS",["x = cm − pl","y = bl − cm"],"x + y = bl − pl","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **FOLGA_REGISTRO.** Para quaisquer h, g e erros não negativos, só existe antecedência a válida se eh + ej ≤ g − h. A folga da janela é o orçamento total dos dois erros. É o análogo de FOLGA no Todo 27.
- **ERRO_ALTO_REGISTRO.** Com h = 3/10, g = 1/2 e erro de 3/20 em cada lado, o mínimo (0,45) passa do máximo (0,35). A certificação **contradiz** os limites. É o análogo de ERRO_ALTO. A fonte não fica decidida em nenhum sentido.
- **LIMITE_MEDIDO_DECIDE.** O limite conjunto registrado c = 3/5, com erro de contagem 1/5, dá um limite real de no máximo 4/5, ainda menor que o degrau. A fonte fica decidida (s = 0).
- **LIMITE_MEDIDO_ABERTO.** Com erro de contagem 2/5, o limite real pode chegar a 1, que é o degrau, e o resultado é EM ABERTO. O SEGUE da v8 vale só enquanto c + ec < 1.
- **CADEIA_CARIMBOS.** Na cadeia plataforma → commit → bloco, a soma das duas diferenças é a diferença total, qualquer que seja o carimbo do commit. É o análogo de CANCELAMENTO.

## 3. Consequência para a língua secreta

1. **O limite com fonte também tem erro.** Um limite contado (k + dv ≤ c) carrega o erro da contagem. A decisão exige c + ec < 1, e não só c < 1.
2. **A janela de pré-registro tem orçamento de erro.** O erro do mínimo e o do máximo saem da mesma folga g − h. Se o carimbo da plataforma e o do commit têm erros grandes, a janela fecha antes de a decisão ser possível.
3. **Não contar o carimbo intermediário duas vezes.** Para provar que o registro veio antes do degrau, o carimbo do commit cancela na cadeia plataforma → commit → bloco. O erro dele entra só uma vez, na guarda em que ele é usado diretamente. O que sobra são os erros diferenciais entre o primeiro e o último relógio.
4. **Resultado paralelo nas duas séries.**
   - GPT: a janela [11,15; 11,27] ms existe com 0,15 ms de erro em cada lado e some com 0,25 ms.
   - Esta série: a decisão existe com ec = 1/5 e fica EM ABERTO com ec = 2/5.

## 4. Próximo ponto

O Todo 27 propõe quantificar o erro diferencial entre relógios independentes com sincronização só periódica. Na língua secreta, os relógios independentes são três, cada um com a sua sincronização:
- o carimbo da plataforma do comentário;
- o relógio da máquina que faz o commit;
- o tempo do bloco Bitcoin, se houver carimbo OTS, que só existe com sim explícito.

A ordem "registro antes do degrau" depende do erro diferencial entre o primeiro e o último desses relógios.

## Integridade

- SHA-256 do Todo 27, conferido nos bytes contra o `.sha256` do GPT: `c6eb1f67f9db527f8c2e4eed4c40a5a975011109624d13514beb8ef889c6dd56`.
- SHA-256 da v8 desta série: `6e2d22dc2c0ae18e761ca64bd19c14fed93bcfd55328fdd7caf6a8ab9259eb4c`.
- Commit remoto de partida: `c019a04e4d9351e848bfc3e64bbfb7d9564213f7`.
- O hash desta v9 está no arquivo `.sha256` ao lado.
