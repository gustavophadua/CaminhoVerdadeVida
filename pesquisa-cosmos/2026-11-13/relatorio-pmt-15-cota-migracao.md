# 13/11/2026 — PMT 15 — Cota de migração por deriva de ganho

O PMT 14 mostrou que o fundo total estável pode esconder migração. A medição externa de distribuições de carga em PMTs motiva calibrar a taxa de pulsos perto do limiar. [Estudo experimental do DEAP](https://arxiv.org/abs/1705.10183).

Com ganho relativo g em [1−ε,1+ε], 0≤ε<1, e limiar q em fC, um pulso de carga de referência Q só pode mudar de categoria se Q estiver em [q/(1+ε),q/(1−ε)]. Assume-se fundo estável antes do discriminador e que o ganho apenas escala a carga. A taxa integrada nessa faixa limita a migração, inclusive para cargas discretas. Se a distribuição for contínua e a densidade de taxa for limitada por D em s⁻¹/fC, para ganho fixo a migração em módulo é no máximo Dqε/(1−ε), em s⁻¹.

Sem migração pelo limiar inferior, o erro absoluto da fração corrigida é m/s, com m a migração em módulo e s>0 a taxa total de sinal, ambos em s⁻¹. Para q=10 fC, ε=0,02, D=1 s⁻¹/fC e s=16 s⁻¹, a cota analítica é 1,28 ponto percentual. No exemplo do PMT 14, m=2 s⁻¹ implica 12,5 pontos percentuais. Valores sintéticos, sem simulação ou coleta local.

A consulta ficou sem verificação. Uma execução anterior do Node falhou por falta de memória e a última tentativa não confirmou o resultado esperado.

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs. Entrada e resultado abaixo. SHA integral do BOOK conferido. Próximo passo: incluir migração no limiar inferior.

```json
{
  "entrada": {
    "visao": "Cota de migracao",
    "regras": [],
    "simbolos": [
      {
        "simbolo": "sinal",
        "tipo": "constante",
        "aridade": 0,
        "numerico": true
      },
      {
        "simbolo": "mig",
        "tipo": "constante",
        "aridade": 0,
        "numerico": true
      },
      {
        "simbolo": "erro",
        "tipo": "constante",
        "aridade": 0,
        "numerico": true
      }
    ],
    "hipoteses": [
      "sinal = 16 ∧ mig = 2",
      "sinal × erro = mig"
    ],
    "tese": "10 × erro ≤ 1"
  },
  "codigo": 1,
  "stdout": "",
  "stderr": "C:\\Users\\gusta\\Desktop\\AI quantica\\node_modules\\z3-solver\\build\\z3-built.js:617\r\n    wasmMemory = new WebAssembly.Memory({\r\n                 ^\r\n\r\nRangeError: WebAssembly.Memory(): could not allocate memory\r\n    at C:\\Users\\gusta\\Desktop\\AI quantica\\node_modules\\z3-solver\\build\\z3-built.js:617:18\r\n    at init (C:\\Users\\gusta\\Desktop\\AI quantica\\node_modules\\z3-solver\\build\\low-level\\wrapper.__GENERATED__.js:7:21)\r\n    at init (C:\\Users\\gusta\\Desktop\\AI quantica\\node_modules\\z3-solver\\build\\node.js:59:49)\r\n    at file:///C:/Users/gusta/Desktop/AI%20quantica/scripts/avaliar-ponto-observador.mjs:30:19\r\n\r\nNode.js v22.14.0\r\n"
}
```
