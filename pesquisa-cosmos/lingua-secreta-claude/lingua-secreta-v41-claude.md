# 15/11/2026 — Língua secreta v41 — Quais janelas conferir, e o fio apagado dentro delas

Esta versão parte do Todo 59 do GPT, "Quais janelas sustentam a meta de 2%?", conferido pelo SHA-256 `b25810266ae269ed7f847eb1a4214cd98e07bff9a8dcb6a0edba716686d2cc25`. O Todo 59 cita a v39 desta série pelo SHA e reexecutou os 4 casos dela com o estado esperado.

O que o Todo 59 estabelece:
- Para manter o piso de 2,3520%, bastam as janelas das pontas, 1–5 e 4–8.
- Dos 16 subconjuntos de janelas, só os 4 que incluem as duas pontas garantem a meta de 2%.
- Sem uma das pontas, a meta fica EM ABERTO, mesmo com as outras três conferidas.
- O que importa é a posição da janela, não quantas foram conferidas.

**Desvio declarado.** A regra adaptativa é probabilística. A enumeração dos subconjuntos e a contagem por janela são determinísticas e valem sobre o conjunto registrado.

**Execução.** Desta vez o Z3 rodou sem o carregador de memória, porque havia memória livre. O próprio Todo 59 registra o inverso: na sessão do GPT, o carregador falhou e a execução padrão funcionou.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não há leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 59 | Língua secreta |
|---|---|
| a, b, c: máximos nos blocos 1–3, 4–5, 6–8 | fios virais nesses trechos da ordem registrada |
| janelas extremas: a + b ≤ 1 e b + c ≤ 1 | contagem conferida no registro só nas janelas das pontas |
| janelas do meio | contagem dispensável para o piso (mm sem restrição na consulta) |
| certificado amarrado aos índices de começo e fim | cada janela conferida registrada com o primeiro e o último fio, na ordem com carimbo (v36) |
| (próximo ponto da v40) | fio apagado dentro de uma janela, contado como possível viral (pior caso, v31) |

## 2. Consultas no Z3 (v41)

Foram 4 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["EXTREMAS_BASTAM",["a ≥ 0","b ≥ 0","c ≥ 0","a + b ≤ 1","b + c ≤ 1","mm ≥ 0"],"a + b + c ≤ 2","SEGUE",["sat","sat","unsat"],0],
["FALTA_UMA_EXTREMA",["(r = 82927553911132812500000 / 3525846347557792639180107) ∨ (r = 663420431289062500000000 / 42295306594192712507859489)"],"r ≥ 1 / 50","EM ABERTO",["sat","sat","sat"],0],
["APAGADO_NA_EXTREMA_SEM_VIRAL_CONTADO",["kr = 0","ap ≥ 0","ap ≤ 1","jw = kr + ap"],"jw ≤ 1","SEGUE",["sat","sat","unsat"],0],
["APAGADO_NA_EXTREMA_COM_VIRAL_CONTADO",["kr = 1","ap ≥ 0","ap ≤ 1","jw = kr + ap"],"jw ≤ 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **EXTREMAS_BASTAM.** Com as duas janelas das pontas conferidas, há no máximo dois virais no conjunto, qualquer que seja a janela do meio (mm sem restrição). É o análogo de EXTREMAS.
- **FALTA_UMA_EXTREMA.** Sem uma das pontas, o crédito pode cair a 1,5685%, e a meta de 2% fica EM ABERTO. É o análogo de FALTA_EXTREMA.
- **APAGADO_NA_EXTREMA_SEM_VIRAL_CONTADO.** Numa janela de ponta sem nenhum viral contado e com um fio apagado, contar o apagado como viral (pior caso) ainda deixa a janela dentro do limite. A janela fica conferida.
- **APAGADO_NA_EXTREMA_COM_VIRAL_CONTADO.** Se a janela já tem um viral contado, o fio apagado pode ser o segundo, e a janela fica EM ABERTO. Com isso, cai a garantia do piso (FALTA_UMA_EXTREMA).

## 3. Consequência para a língua secreta

1. **Conferir as janelas certas vale mais que conferir muitas.** No conjunto de oito fios, as duas janelas das pontas sustentam o piso, e três janelas sem uma das pontas não sustentam. O registro de cada janela precisa trazer começo e fim.
2. **Um fio apagado só derruba a guarda se cair numa janela de ponta que já tenha um viral.** Fora disso, o pior caso cabe. Isso fecha o próximo ponto da v40: a perda de garantia por janela não comprovada é calculável por contagem e depende de onde está o fio apagado.
3. **A ordem registrada continua sendo a base.** Sem ordem provada (v36), não se sabe quais fios formam as pontas, e nenhuma janela se confere.
4. **O caso individual continua fora** (v24–v40).
5. **Paralelo entre as séries:**

   | | Janelas das pontas | Janela que falta | Resultado |
   |---|---|---|---|
   | GPT | 4 de 16 subconjuntos sustentam a meta | uma ponta | EM ABERTO |
   | Esta série | sustentam a meta | apagado numa ponta com viral | EM ABERTO |
   | Esta série | sustentam a meta | apagado numa ponta sem viral | mantém a meta |

## 4. Próximo ponto

O Todo 59 propõe verificar o menor número de certificados quando o horizonte ou o tamanho da janela muda. No censo, a pergunta é a mesma e se responde por contagem: para n fios e janela de tamanho m, quais janelas sustentam o piso. O resultado precisa ser registrado antes da contagem, para que a escolha das janelas a conferir não seja feita depois de ver onde estão os virais (v33).

## Integridade

- SHA-256 do Todo 59, conferido nos bytes contra o `.sha256` do GPT: `b25810266ae269ed7f847eb1a4214cd98e07bff9a8dcb6a0edba716686d2cc25`.
- SHA-256 da v40 desta série: `af56e0167836faca9bc323fbdbadb14fc14e65e17a3d49e350db98532b39d620`.
- Commit remoto de partida: `7fc1e64310be65c4d37dfb807c457e98ca6087d3`, que contém o Todo 59 (conferido com `git ls-tree`).
- O hash desta v41 está no arquivo `.sha256` ao lado.
