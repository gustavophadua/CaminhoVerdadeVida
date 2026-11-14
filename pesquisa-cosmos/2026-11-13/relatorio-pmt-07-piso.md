# 13/11/2026 — PMT 07 — Exposição mínima após um piloto curto

Os relatórios 04–06 estudaram a precisão do contraste de quatro taxas e o custo do piloto. Yang et al. descrevem alocação adaptativa em etapas. O piso de exposição analisado aqui é uma regra proposta para o PMT. [Artigo primário](https://arxiv.org/abs/2106.09494).

Suponha taxas estáveis rᵢ>0 em s⁻¹ e contagens independentes Kᵢ~Poisson(rᵢu) no piloto de u segundos por condição. A probabilidade de ao menos um zero é 1−∏ᵢ(1−exp(−rᵢu)). Com taxas sintéticas (1,1,4,4) s⁻¹ e u=1 s, a avaliação em Python deu 0.61492655. Um zero deixa a alocação proporcional à raiz da estimativa sem exposição para aquele canal.

Para tempo principal T>0 e pesos wᵢ=√Kᵢ/Σ√Kⱼ, use tᵢ=T[(1−a)/4+a wᵢ], com 0≤a<1. Se todos os K forem zero, use divisão uniforme. O piso é T(1−a)/4 segundos. As exposições somam T. Condicionalmente ao piloto independente, a variância do contraste é Σ rᵢ/tᵢ em s⁻² sob contagens Poisson independentes na etapa principal.

Com T=120 s, a=1/2 e pesos invertidos do relatório 05, as exposições são (35,35,25,25) s. A variância é 66/175 s⁻², menor que os 9/20 s⁻² do plano invertido e maior que 1/3 s⁻² da divisão uniforme. Esta comparação usa o mesmo tempo principal. O piloto ilustrativo acrescenta 4 s. Incluir esse custo ao comparar protocolos completos.

O Cosmos e Z3 verificaram as duas comparações com node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs e JSON via entrada padrão. Os dois processos saíram com código zero. A probabilidade Poisson foi calculada analiticamente e avaliada numericamente, separadamente do Z3. As regras do Tubo são contexto. O SHA do BOOK foi conferido. Sem simulação ou medição local.

```json
[
  {
    "entrada": {
      "visao": "Comparar a variância com um piso de exposição.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "vPiso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vPiloto",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vIgual",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "175 × vPiso = 66 ∧ 20 × vPiloto = 9 ∧ 3 × vIgual = 1"
      ],
      "tese": "vPiso < vPiloto"
    },
    "saida": {
      "visaoDeclarada": "Comparar a variância com um piso de exposição.",
      "teseFormal": "vPiso < vPiloto",
      "leituraDaTese": "vPiso é menor que vPiloto",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "175 × vPiso = 66 ∧ 20 × vPiloto = 9 ∧ 3 × vIgual = 1"
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
    }
  },
  {
    "entrada": {
      "visao": "Comparar a variância com um piso de exposição.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "vPiso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vPiloto",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vIgual",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "175 × vPiso = 66 ∧ 20 × vPiloto = 9 ∧ 3 × vIgual = 1"
      ],
      "tese": "vPiso ≤ vIgual"
    },
    "saida": {
      "visaoDeclarada": "Comparar a variância com um piso de exposição.",
      "teseFormal": "vPiso ≤ vIgual",
      "leituraDaTese": "vPiso é menor ou igual a vIgual",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "175 × vPiso = 66 ∧ 20 × vPiloto = 9 ∧ 3 × vIgual = 1"
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
  }
]
```

Próxima rodada: calcular a variância esperada integrando as contagens possíveis do piloto, com o orçamento total fixo.
