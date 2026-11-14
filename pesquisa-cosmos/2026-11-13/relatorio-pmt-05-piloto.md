# 13/11/2026 — PMT 05: quando o piloto piora a alocação de tempo

Continuação do PMT 04. A alocação adaptativa por ondas usa estimativas de variabilidade para distribuir recursos. A aplicação a exposições do PMT é uma derivação deste projeto. [Pesquisa metodológica sobre alocação adaptativa](https://arxiv.org/abs/2106.09494).

Para quatro contagens independentes, Nᵢ ~ Poisson(rᵢtᵢ), a variância do contraste de taxas é V = Σ rᵢ/tᵢ. rᵢ>0 em s⁻¹ e tᵢ>0 em s. Condicionalmente a um piloto independente, usar tᵢ = T√r̂ᵢ/Σ√r̂ⱼ com todas as estimativas positivas produz V = (Σ√r̂ᵢ)(Σ rᵢ/√r̂ᵢ)/T, em s⁻². Supõe-se que as taxas reais permaneçam constantes entre piloto e coleta e que os tempos fixados pelo piloto sejam executados integralmente.

Exemplo sintético com T=120 s e taxas reais (1,1,4,4) s⁻¹. Se o piloto indicar (4,4,1,1) s⁻¹, o plano (40,40,20,20) s tem V=9/20 s⁻². O plano uniforme tem V=1/3 s⁻² e o ótimo com taxas reais conhecidas tem V=3/10 s⁻². Nesse cenário o piloto aumenta a variância em 35% frente ao uniforme. É um contraexemplo algébrico, sem estimativa da frequência de ocorrer.

O analisador do Cosmos e o Z3 executaram as comparações pelo comando node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, com os casos via entrada padrão. Ambos retornaram código zero. As premissas aritméticas estão na saída abaixo. A fórmula da variância foi derivada analiticamente e as regras qualitativas do Tubo foram consultadas como contexto.

```json
[
  {
    "visaoDeclarada": "Comparar a precisão dos três planos no exemplo sintético.",
    "teseFormal": "vPiloto > vIgual",
    "leituraDaTese": "vPiloto é maior que vIgual",
    "status": "SEGUE",
    "explicacao": "A tese decorre das premissas indicadas.",
    "premissas": [
      {
        "id": "hipótese 1",
        "formula": "20 × vPiloto = 9 ∧ 3 × vIgual = 1 ∧ 10 × vOtimo = 3"
      }
    ],
    "envolvidos": [
      "hipótese 1",
      "tese"
    ],
    "verificacoes": {
      "premissas": "sat",
      "tese": "sat",
      "negacao": "unsat"
    }
  },
  {
    "visaoDeclarada": "Comparar a precisão dos três planos no exemplo sintético.",
    "teseFormal": "vPiloto ≤ vOtimo",
    "leituraDaTese": "vPiloto é menor ou igual a vOtimo",
    "status": "CONTRADIZ",
    "explicacao": "A tese entra em conflito com as premissas indicadas.",
    "premissas": [
      {
        "id": "hipótese 1",
        "formula": "20 × vPiloto = 9 ∧ 3 × vIgual = 1 ∧ 10 × vOtimo = 3"
      }
    ],
    "envolvidos": [
      "hipótese 1",
      "tese"
    ],
    "verificacoes": {
      "premissas": "sat",
      "tese": "unsat",
      "negacao": "sat"
    }
  }
]
```

Sem coleta local ou simulação. Próximo passo: comparar planos com um piso de tempo por condição sob contagens de piloto baixas, incluindo o custo temporal do próprio piloto.
