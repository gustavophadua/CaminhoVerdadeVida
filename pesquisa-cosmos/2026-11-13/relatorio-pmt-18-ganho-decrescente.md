# 13/11/2026 — PMT 18 — Efeito da queda de ganho no denominador

Continuação do PMT 17. A distribuição de carga medida no DEAP motiva calibrar perdas de pulsos nos cortes. [Artigo primário](https://arxiv.org/abs/1705.10183).

Suponha fundo estacionário antes do discriminador e ganho apenas escalar decrescente entre branco e aquisição, sem saturação, pós-pulsos ou perdas adicionais. Sejam h∈[0,MH] e d∈[0,MT] as perdas de fundo acima dos limiares alto e inferior, em s⁻¹. Seja s>MT a taxa total de sinal na aquisição, em s⁻¹, e p∈[0,1] sua fração alta. O branco antigo produz erro assinado e=(pd−h)/(s−d), adimensional, no limite populacional.

Para d fixo o erro decresce com h. O máximo na caixa é p MT/(s−MT), pois d/(s−d) é crescente. O mínimo é min{−MH/s,(p MT−MH)/(s−MT)}. Com h=MH, a derivada em d é (ps−MH)/(s−d)², de sinal constante. Se o espectro vincular h e d, os extremos da caixa podem não ser simultaneamente realizáveis. Se MT alcançar s, perde-se a garantia de denominador positivo e não se deve interpretar a razão corrigida sem controle adicional. A razão corrigida pode inclusive cair fora de [0,1].

Exemplo sintético s=16, p=1/2, MH=1, MT=2. A cota exata da caixa é [−1/16, 1/14]. O Z3 verificou a cota simétrica mais simples ±1/14 e confirmou que ambos os sinais são possíveis. Testemunhos: (h,d)=(1,0) e (0,2). A cota geral assimétrica decorre da derivação analítica acima. Não houve simulação nem coleta local.

Comando executado: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin, código zero nos dois casos. SHA integral do BOOK conferido. Regras do Tubo consultadas como contexto.

```json
[
  {
    "entrada": {
      "visao": "Deriva de ganho decrescente",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "perdaAlta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "perdaTotal",
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
        "perdaAlta ≥ 0 ∧ perdaAlta ≤ 1 ∧ perdaTotal ≥ 0 ∧ perdaTotal ≤ 2",
        "2 × (16 − perdaTotal) × erro = perdaTotal − 2 × perdaAlta"
      ],
      "tese": "14 × erro ≥ −1 ∧ 14 × erro ≤ 1"
    },
    "saida": {
      "visaoDeclarada": "Deriva de ganho decrescente",
      "teseFormal": "14 × erro ≥ −1 ∧ 14 × erro ≤ 1",
      "leituraDaTese": "(14 · erro) é maior ou igual a −1 e (14 · erro) é menor ou igual a 1",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "perdaAlta ≥ 0 ∧ perdaAlta ≤ 1 ∧ perdaTotal ≥ 0 ∧ perdaTotal ≤ 2"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × (16 − perdaTotal) × erro = perdaTotal − 2 × perdaAlta"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 2",
        "tese"
      ],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "unsat"
      }
    }
  },
  {
    "entrada": {
      "visao": "Deriva de ganho decrescente",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "perdaAlta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "perdaTotal",
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
        "perdaAlta ≥ 0 ∧ perdaAlta ≤ 1 ∧ perdaTotal ≥ 0 ∧ perdaTotal ≤ 2",
        "2 × (16 − perdaTotal) × erro = perdaTotal − 2 × perdaAlta"
      ],
      "tese": "erro ≥ 0"
    },
    "saida": {
      "visaoDeclarada": "Deriva de ganho decrescente",
      "teseFormal": "erro ≥ 0",
      "leituraDaTese": "erro é maior ou igual a 0",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "perdaAlta ≥ 0 ∧ perdaAlta ≤ 1 ∧ perdaTotal ≥ 0 ∧ perdaTotal ≤ 2"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × (16 − perdaTotal) × erro = perdaTotal − 2 × perdaAlta"
        }
      ],
      "envolvidos": [],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "sat"
      }
    }
  }
]
```

Próximo passo: limitar conjuntamente as perdas usando intervalos de carga sobrepostos e massa de fundo medida por categoria.
