# 13/11/2026 — PMT 17 — Cota direcional para ganho crescente

O PMT 16 tratou migrações com sinais arbitrários. Para ganho escalar crescente e espectro de fundo constante, os dois limiares passam a aceitar conjuntos maiores de pulsos. Isso impõe δH≥0 e δT≥0 aos incrementos de taxa acima do limiar alto e do inferior, respectivamente. O DEAP mediu distribuições de carga que motivam calibrar esses incrementos no aparelho. [Artigo experimental](https://arxiv.org/abs/1705.10183).

Mantêm-se os limiares, a taxa de chegada e a forma da distribuição de carga de referência. A carga medida é gQ, com g adimensional, e a única mudança entre branco e aquisição é um aumento de g na resposta ao fundo. O modelo despreza perdas, saturação e pós-pulsos. Denote por s>0 a taxa total de sinal na aquisição, p∈[0,1] a sua fração na categoria alta e e o viés assinado da fração calculada com o branco antigo. Taxas e cotas M_H e M_T têm unidades s⁻¹. Temos e=(δH−pδT)/(s+δT). Se δH≤M_H e δT≤M_T, então

−p M_T/(s+M_T) ≤ e ≤ M_H/s.

O limite superior usa numerador ≤M_H e denominador ≥s para e≥0. O inferior usa δH≥0 e a monotonicidade de δT/(s+δT). A cota vale mesmo se os incrementos forem correlacionados. Para s=16, p=1/2, M_H=1 e M_T=2, obtém-se [−1/18, 1/16], em fração, contra a cota simétrica ±1/7 do PMT 16 com os mesmos módulos. O sinal do viés continua indeterminado. Por exemplo, δH=0 e δT=2 geram e=−1/18, realizável se apenas pulsos próximos do corte inferior atravessarem um limiar. δH=1 e δT=0 geram e=1/16 se a migração ocorrer apenas entre as categorias já aceitas.

Cosmos e Z3 verificaram a cota no exemplo e encontraram modelos para os dois lados da tese de viés não negativo. A derivação geral é analítica. Comando node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, entradas JSON via stdin, código zero. Base do Tubo consultada como contexto. SHA integral do BOOK conferido. Sem medição local ou simulação.

```json
[
  {
    "entrada": {
      "visao": "Cota para ganho crescente e erros de mesmo sinal",
      "regras": [],
      "simbolos": [
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
        "dh ≥ 0 ∧ dh ≤ 1 ∧ dt ≥ 0 ∧ dt ≤ 2",
        "2 × (16 + dt) × erro = 2 × dh − dt"
      ],
      "tese": "16 × erro ≤ 1 ∧ 18 × erro ≥ −1"
    },
    "saida": {
      "visaoDeclarada": "Cota para ganho crescente e erros de mesmo sinal",
      "teseFormal": "16 × erro ≤ 1 ∧ 18 × erro ≥ −1",
      "leituraDaTese": "(16 · erro) é menor ou igual a 1 e (18 · erro) é maior ou igual a −1",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "dh ≥ 0 ∧ dh ≤ 1 ∧ dt ≥ 0 ∧ dt ≤ 2"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × (16 + dt) × erro = 2 × dh − dt"
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
      "visao": "Cota para ganho crescente e erros de mesmo sinal",
      "regras": [],
      "simbolos": [
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
        "dh ≥ 0 ∧ dh ≤ 1 ∧ dt ≥ 0 ∧ dt ≤ 2",
        "2 × (16 + dt) × erro = 2 × dh − dt"
      ],
      "tese": "erro ≥ 0"
    },
    "saida": {
      "visaoDeclarada": "Cota para ganho crescente e erros de mesmo sinal",
      "teseFormal": "erro ≥ 0",
      "leituraDaTese": "erro é maior ou igual a 0",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "dh ≥ 0 ∧ dh ≤ 1 ∧ dt ≥ 0 ∧ dt ≤ 2"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × (16 + dt) × erro = 2 × dh − dt"
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

Próximo passo: obter a cota correspondente para ganho decrescente e verificar como a proximidade de s−M_T de zero afeta a interpretação da fração.
