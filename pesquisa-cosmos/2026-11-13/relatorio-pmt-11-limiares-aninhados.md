# 13/11/2026 — PMT 11 — Incerteza quando dois limiares usam os mesmos pulsos

Continuação do PMT 10. O DEAP mediu distribuições de carga de fotoelétron único. A classificação de pulsos em dois limiares abaixo é um modelo para o protocolo do Tubo. [Artigo experimental](https://arxiv.org/abs/1705.10183).

Sejam q₁<q₂ em coulombs e T>0 em segundos. Para chegadas Poisson estacionárias com marcas de carga independentes e sem perdas relevantes, N₁ conta todos os pulsos que excedem q₁ e N₂ conta o subconjunto que excede q₂. As taxas r₁>r₂>0 estão em s⁻¹. N₂ e N₁−N₂ são Poisson independentes por partição das marcas. Logo Cov(N₁,N₂)=r₂T. Condicionado a N₁=n>0, N₂ é binomial(n,p), p=r₂/r₁. A fração N₂/n tem variância exata p(1−p)/n. Esta análise vale para contagens brutas aninhadas. Fundo aditivo com espectro diferente altera p. Subtração de branco não preserva essa distribuição.

Se alguém tratar N₁ e N₂ como independentes com as mesmas médias marginais, o método delta para N₂/N₁ daria p(1+p)/m, onde m=r₁T. Com a covariância correta, a aproximação é p(1−p)/m. Assim, no exemplo sintético p=1/2 e m=100, a aproximação incorreta é 0,0075 e a correta é 0,0025, ambas adimensionais. A última coincide numericamente com a variância condicional para n=100. Comparar dois experimentos com exposições realmente independentes exige usar o modelo de aquisição correspondente.

O Cosmos e o Z3 verificaram a desigualdade entre as duas expressões e refutaram sua igualdade para 0<p<1. tot é a média m da comparação por método delta. O argumento probabilístico foi derivado analiticamente. Comando node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via entrada padrão, código zero nos dois casos. Regras do Tubo consultadas como contexto. SHA integral do BOOK conferido.

```json
[
  {
    "entrada": {
      "visao": "Comparação das variâncias sob dois limiares aninhados",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "prob",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "tot",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vInd",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vPar",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "prob > 0 ∧ prob < 1 ∧ tot > 0",
        "tot × vPar = prob × (1 − prob) ∧ tot × vInd = prob × (1 + prob)"
      ],
      "tese": "vInd > vPar"
    },
    "saida": {
      "visaoDeclarada": "Comparação das variâncias sob dois limiares aninhados",
      "teseFormal": "vInd > vPar",
      "leituraDaTese": "vInd é maior que vPar",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "prob > 0 ∧ prob < 1 ∧ tot > 0"
        },
        {
          "id": "hipótese 2",
          "formula": "tot × vPar = prob × (1 − prob) ∧ tot × vInd = prob × (1 + prob)"
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
      "visao": "Comparação das variâncias sob dois limiares aninhados",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "prob",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "tot",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vInd",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vPar",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "prob > 0 ∧ prob < 1 ∧ tot > 0",
        "tot × vPar = prob × (1 − prob) ∧ tot × vInd = prob × (1 + prob)"
      ],
      "tese": "vInd = vPar"
    },
    "saida": {
      "visaoDeclarada": "Comparação das variâncias sob dois limiares aninhados",
      "teseFormal": "vInd = vPar",
      "leituraDaTese": "vInd é igual a vPar",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "prob > 0 ∧ prob < 1 ∧ tot > 0"
        },
        {
          "id": "hipótese 2",
          "formula": "tot × vPar = prob × (1 − prob) ∧ tot × vInd = prob × (1 + prob)"
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
    }
  }
]
```

Sem coleta ou simulação local. Próxima rodada: incluir fundo com contagens de branco por categoria de carga e avaliar quais parâmetros ainda são identificáveis.
