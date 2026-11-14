# 13/11/2026 — PMT 16 — Migração nos dois limiares

O PMT 15 limitou o erro quando só a categoria alta sofre migração de fundo. Aqui também se admite migração pelo limiar inferior. A caracterização de cargas do DEAP fornece o contexto experimental para estimar a taxa de pulsos perto dos cortes. [Artigo do DEAP](https://arxiv.org/abs/1705.10183).

Seja s>0 a taxa total de sinal acima do limiar inferior, em s⁻¹, e p∈[0,1] sua fração acima do limiar alto. A subtração do branco antigo deixa desvios δH na taxa alta e δT na taxa total, ambos em s⁻¹. Para s+δT>0, a fração corrigida no limite populacional é (ps+δH)/(s+δT). Seu erro assinado e satisfaz (s+δT)e=δH−pδT. Supõe-se que a diferença entre fundos possa ser representada por esses desvios aditivos.

Se |δH|≤M_H e |δT|≤M_T<s, segue |e|≤(M_H+p M_T)/(s−M_T). O numerador vem da desigualdade triangular. O denominador usa a menor taxa total admissível. Se só se conhece p∈[0,1], pode-se trocar p por 1 na cota. O erro é adimensional. As cotas M podem vir da taxa integrada nas faixas de carga atravessadas por cada limiar. A expressão trata viés populacional e pressupõe um denominador estritamente positivo. A incerteza amostral exige análise própria.

Exemplo sintético em s⁻¹ com s=16, p=1/2, δH=1 e δT=−2. A fração corrigida é 9/14 e o erro é 1/7, cerca de 14,29 pontos percentuais. Aplicar a fórmula de denominador fixo daria apenas 1/16. O caso pode ser realizado com fundo de referência de 3 pulsos/s acima do limiar inferior, dois perto do corte inferior e um já acima do alto, mais um pulso/s abaixo do alto e acima do inferior, ajustando a resposta por categoria. Em termos de taxas, um branco com fundo alto 1 e intermediário 4 passa a alto 2 e intermediário 1. Uma deriva de ganho puramente escalar de sinal fixo não produz simultaneamente aumento da taxa alta e redução da taxa total com o mesmo espectro. O testemunho permite mudança de forma do fundo ou deslocamentos distintos nos discriminadores.

As regras do Tubo foram consultadas como contexto. O BOOK teve seu SHA integral conferido. O ajuste temporário de memória foi rejeitado pelo módulo WASM, que exige 32768 páginas. O ajuste foi removido. As tentativas finais usaram node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs. Os resultados efetivos constam abaixo. Nenhuma coleta local ou simulação foi realizada.

```json
[
  {
    "entrada": {
      "visao": "Cota com migracao nos dois limiares",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "s",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fra",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "capAlta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "capTotal",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "dh",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "dt",
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
        "s > 0 ∧ fra ≥ 0 ∧ fra ≤ 1 ∧ capAlta ≥ 0 ∧ capTotal ≥ 0 ∧ capTotal < s",
        "dh ≥ −capAlta ∧ dh ≤ capAlta ∧ dt ≥ −capTotal ∧ dt ≤ capTotal",
        "(s + dt) × erro = dh − fra × dt"
      ],
      "tese": "(s − capTotal) × erro ≤ capAlta + fra × capTotal ∧ (s − capTotal) × erro ≥ −capAlta − fra × capTotal"
    },
    "esperado": "SEGUE",
    "codigo": 0,
    "saida": {
      "visaoDeclarada": "Cota com migracao nos dois limiares",
      "teseFormal": "(s − capTotal) × erro ≤ capAlta + fra × capTotal ∧ (s − capTotal) × erro ≥ −capAlta − fra × capTotal",
      "leituraDaTese": "((s − capTotal) · erro) é menor ou igual a (capAlta + (fra · capTotal)) e ((s − capTotal) · erro) é maior ou igual a (−capAlta − (fra · capTotal))",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "s > 0 ∧ fra ≥ 0 ∧ fra ≤ 1 ∧ capAlta ≥ 0 ∧ capTotal ≥ 0 ∧ capTotal < s"
        },
        {
          "id": "hipótese 2",
          "formula": "dh ≥ −capAlta ∧ dh ≤ capAlta ∧ dt ≥ −capTotal ∧ dt ≤ capTotal"
        },
        {
          "id": "hipótese 3",
          "formula": "(s + dt) × erro = dh − fra × dt"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 2",
        "hipótese 3",
        "tese"
      ],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "unsat"
      }
    },
    "stderr": "received \"cleanupThread\" command from terminated worker: 1\n"
  },
  {
    "entrada": {
      "visao": "Cota com migracao nos dois limiares",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "s",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fra",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "capAlta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "capTotal",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "dh",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "dt",
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
        "s = 16 ∧ 2 × fra = 1 ∧ dh = 1 ∧ dt = −2",
        "(s + dt) × erro = dh − fra × dt"
      ],
      "tese": "8 × erro ≤ 1"
    },
    "esperado": "CONTRADIZ",
    "codigo": 0,
    "saida": {
      "visaoDeclarada": "Cota com migracao nos dois limiares",
      "teseFormal": "8 × erro ≤ 1",
      "leituraDaTese": "(8 · erro) é menor ou igual a 1",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "s = 16 ∧ 2 × fra = 1 ∧ dh = 1 ∧ dt = −2"
        },
        {
          "id": "hipótese 2",
          "formula": "(s + dt) × erro = dh − fra × dt"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 2",
        "tese"
      ],
      "verificacoes": {
        "premissas": "sat",
        "tese": "unsat",
        "negacao": "sat"
      }
    },
    "stderr": ""
  }
]
```

Próximo passo: obter uma cota mais estreita impondo a direção comum da migração quando a única mudança é um ganho escalar.
