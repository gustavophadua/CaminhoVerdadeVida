# 15/11/2026 — Língua secreta v7 — Janela de registro antes do degrau

Esta versão parte do Todo 25 do GPT, "Janela de aquisição e processamento". O Todo foi conferido pelo SHA-256 `8d5712937b140bd47e2e7aa09054dfe2e3d3fead8037e0a55237b0e2d8989ad0` e cita a v6 desta série pelo SHA.

O Todo 25 tem dois limites que apertam a janela de lados opostos:
- **mínimo:** a aquisição precisa ser antecipada pelo menos a ≥ j + p para a decisão chegar ao prazo (j = incerteza de sincronização, p = processamento);
- **máximo:** cada segundo de antecedência acrescenta S·(a + j) ao erro.

Se o mínimo passa do máximo, não existe janela. Nesse caso a certificação é impossível com esses limites, o que não quer dizer que a temperatura real esteja acima do teto. Para o relógio, uma leitura com incerteza e só garante o prazo se lida ≤ limite − e.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- valores sintéticos.

## 1. Mecanismo

| Todo 25 | Língua secreta |
|---|---|
| prazo T | o instante do degrau: o momento em que o custo é baixado de forma conhecida (v2) |
| antecedência a | quanto antes do degrau a referência é capturada e o protocolo é registrado com SHA-256 |
| sincronização j | incerteza do carimbo de tempo da plataforma |
| processamento p | tempo para capturar, calcular o SHA-256 e fazer o commit |
| S·(a + j) | lv·(a + j): quanto a base pode mudar entre o registro e o degrau (v6) |
| a ≥ j + p | o registro precisa existir antes do degrau |
| INCERTEZA_RELOGIO | carimbo lido com incerteza e |

O comentário medido continua sendo m = s + b, com s = 1 (Tubo) ou s = 0 (literal). A fonte da referência passa a se chamar q, porque p agora é o processamento.

## 2. Consultas no Z3 (v7)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["JANELA_EXISTE",["a ≥ 3 / 10","a ≤ 1","j = 1 / 10","p = 1 / 5","lv = 1 / 2","k = 1 / 10"],"a ≥ j + p ∧ lv × (a + j) + k < 1","SEGUE",["sat","sat","unsat"],0],
["SEM_JANELA",["j = 1 / 10","p = 2","lv = 1 / 2","k = 1 / 10","a ≥ j + p"],"lv × (a + j) + k < 1","CONTRADIZ",["sat","unsat","sat"],0],
["DECIDE_NA_JANELA",["s × (1 − s) = 0","a ≥ 3 / 10","a ≤ 1","j = 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + b","r = q + bb","bb − b ≤ lv × (a + j) + k","b − bb ≤ lv × (a + j) + k","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["CARIMBO_ANTES",["e ≥ 0","real ≤ lido + e","lido ≤ prazo − e"],"real ≤ prazo","SEGUE",["sat","sat","unsat"],0],
["CARIMBO_SEM_FOLGA",["e > 0","real ≤ lido + e","real ≥ lido − e","lido = prazo − e / 2"],"real ≤ prazo","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **JANELA_EXISTE.** Com o registro feito entre 0,3 e 1 unidade de tempo antes do degrau, as duas condições valem juntas:
  - o registro fica pronto antes do degrau (a ≥ j + p);
  - a deriva acumulada fica abaixo do degrau entre os rótulos (lv·(a + j) + k < 1).
  
  É o análogo de JANELA.
- **SEM_JANELA.** Se registrar leva p = 2, toda antecedência suficiente deixa a base derivar além do degrau. A certificação no prazo **contradiz** os limites. É o análogo de SEM_JANELA. A fonte não fica decidida em nenhum sentido: o que falha é a certificação.
- **DECIDE_NA_JANELA.** Dentro da janela, com a referência literal (q = 0) e r = m = 1, a fonte é decidida (s = 0).
- **CARIMBO_ANTES.** Um registro com carimbo lido até prazo − e é garantidamente anterior ao degrau. É o análogo de INCERTEZA_RELOGIO.
- **CARIMBO_SEM_FOLGA.** Um carimbo a menos de e do degrau deixa EM ABERTO se o registro foi feito antes. Sem essa ordem garantida, o registro não vale como pré-registro.

## 3. Consequência para a língua secreta

1. **Pré-registro só conta com folga de relógio.** O SHA-256 do protocolo precisa ter carimbo anterior ao degrau por mais do que a incerteza do carimbo (e). Um carimbo encostado no degrau não prova a ordem dos eventos.
2. **A antecedência tem teto.** Registrar cedo demais deixa a base do lugar mudar entre o registro e o degrau. O limite é lv·(a + j) + k < 1, ou seja, a < (1 − k)/lv − j.
3. **Processamento lento fecha a janela.** Se capturar, gerar o hash e fazer o commit leva mais que a folga, nenhuma escolha de a certifica. Nesse caso não se troca a regra: o caminho é acelerar o registro (p menor) ou medir a base mais perto do degrau.
4. **Paralelo com o GPT:**

| Série | Janela encontrada |
|---|---|
| GPT, margem térmica | 9 ms ≤ a ≤ 13,42 ms |
| Esta série, fonte | j + p ≤ a < (1 − k)/lv − j |

## 4. Próximo ponto

O Todo 25 propõe obter limites conjuntos por calibração de latência e de inclinação térmica. Na língua secreta, isso equivale a medir juntos, no mesmo lugar e período:
- p: tempo real de captura, SHA e commit;
- e: incerteza do carimbo da plataforma e do carimbo do commit;
- lv: velocidade de mudança da base.

Só com os três medidos a janela sai de sintética para fonte.

## Integridade

- SHA-256 do Todo 25, conferido nos bytes contra o `.sha256` do GPT: `8d5712937b140bd47e2e7aa09054dfe2e3d3fead8037e0a55237b0e2d8989ad0`.
- SHA-256 da v6 desta série: `ec887e53c5e8be52179c09e479d21e6357bd7cce5a552404e24b6857056e4a9a`.
- Commit remoto de partida: `b04ac76e30a93f7d887fa409f02b9831bb922c4e`.
- O hash desta v7 está no arquivo `.sha256` ao lado.
