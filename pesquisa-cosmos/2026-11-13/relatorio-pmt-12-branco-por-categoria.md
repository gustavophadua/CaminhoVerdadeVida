# 13/11/2026 — PMT 12 — O branco precisa distinguir categorias de carga

O PMT 11 derivou a distribuição binomial para contagens brutas aninhadas. Aqui o fundo pode ter um espectro de carga diferente do sinal. A análise usa medições auxiliares de fundo, como no tratamento de contagens de Cowan et al. [Artigo primário](https://arxiv.org/pdf/1007.1727).

Em cada categoria j (entre os limiares ou acima do limiar alto), sejam Nⱼ~Poisson(T(sⱼ+bⱼ)) e Mⱼ~Poisson(U bⱼ) as contagens principal e branco. T,U>0 em segundos. sⱼ,bⱼ≥0 em s⁻¹. Supõe-se independência entre aquisições e categorias disjuntas, fundo estável, mesmo ganho e limiares e ausência de sinal no branco. Os quatro valores esperados identificam bⱼ=E[Mⱼ]/U e sⱼ=E[Nⱼ]/T−bⱼ. A fração de sinal acima do limiar alto é s_alto/(s_alto+s_entre) se o denominador for positivo. Isso identifica a fração populacional sob o modelo. Em amostras finitas, ajustar a verossimilhança conjunta mantém a incerteza do branco. Subtrair contagens pode gerar valores negativos e perde a distribuição binomial condicional usada no PMT 11.

Exemplo sintético com taxas brutas total 20 e alta 9 s⁻¹, e branco total 4 s⁻¹. Branco alto de 1 s⁻¹ dá fração 8/16=1/2. Branco alto de 3 s⁻¹ dá 6/16=3/8. As duas decomposições têm taxas não negativas e preservam todas as leituras disponíveis quando o branco só fornece o total. O branco por categoria distingue os cenários.

O Cosmos e Z3 checaram as consequências algébricas via scripts/avaliar-ponto-observador.mjs com node --preserve-symlinks --preserve-symlinks-main e JSON via entrada padrão. Dois processos com código zero. Regras do Tubo consultadas como contexto. SHA integral do BOOK conferido.

```json
[
  {
    "entrada": {
      "visao": "Identificação da fração de sinal acima do limiar alto.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "alto",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "total",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "brancoAlto",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "brancoTotal",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sigAlto",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sigTotal",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "alto = 9 ∧ total = 20 ∧ brancoAlto = 1 ∧ brancoTotal = 4",
        "sigAlto = alto − brancoAlto ∧ sigTotal = total − brancoTotal"
      ],
      "tese": "2 × sigAlto = sigTotal"
    },
    "saida": {
      "visaoDeclarada": "Identificação da fração de sinal acima do limiar alto.",
      "teseFormal": "2 × sigAlto = sigTotal",
      "leituraDaTese": "(2 · sigAlto) é igual a sigTotal",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "alto = 9 ∧ total = 20 ∧ brancoAlto = 1 ∧ brancoTotal = 4"
        },
        {
          "id": "hipótese 2",
          "formula": "sigAlto = alto − brancoAlto ∧ sigTotal = total − brancoTotal"
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
      "visao": "Identificação da fração de sinal acima do limiar alto.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "alto",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "total",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "brancoAlto",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "brancoTotal",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sigAlto",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sigTotal",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "alto = 9 ∧ total = 20 ∧ brancoTotal = 4",
        "brancoAlto = 3 ∧ sigAlto = alto − brancoAlto ∧ sigTotal = total − brancoTotal"
      ],
      "tese": "2 × sigAlto = sigTotal"
    },
    "saida": {
      "visaoDeclarada": "Identificação da fração de sinal acima do limiar alto.",
      "teseFormal": "2 × sigAlto = sigTotal",
      "leituraDaTese": "(2 · sigAlto) é igual a sigTotal",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "alto = 9 ∧ total = 20 ∧ brancoTotal = 4"
        },
        {
          "id": "hipótese 2",
          "formula": "brancoAlto = 3 ∧ sigAlto = alto − brancoAlto ∧ sigTotal = total − brancoTotal"
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

Sem simulação ou medição local. Próximo: quantificar a perda de precisão por tempo de branco limitado e checar a dependência do resultado em relação à estabilidade de ganho.
