# 13/11/2026 — PMT 14 — Fundo total estável pode esconder migração de pulsos

O PMT 13 supôs estabilidade entre branco e aquisição. A colaboração DEAP caracterizou distribuições de carga de fotoelétron único e ruído dos PMTs R5912-HQE. O cenário abaixo usa uma distribuição sintética para isolar a migração no discriminador. [Artigo experimental](https://arxiv.org/abs/1705.10183).

Sejam sH e sL as taxas de sinal nas categorias alta e intermediária, em s⁻¹. O branco estima bH e bL. Se os fundos durante a aquisição forem bH+δH e bL+δL, a subtração em taxas populacionais deixa sH+δH e sL+δL. Para s=sH+sL>0 e s+δH+δL>0, a diferença entre a fração corrigida com o branco antigo e a fração verdadeira p=sH/s é [δH−p(δH+δL)]/[s+δH+δL]. A expressão é adimensional. É o viés do limite populacional, com taxas estáveis dentro de cada janela e com as estimativas convergindo às taxas. O viés amostral da razão pode ser diferente.

Exemplo: limiares qL=5 fC e qH=10 fC. No branco, o ganho relativo é 1. O fundo tem pulsos de carga de referência 12, 9 e 6 fC com taxas 1, 2 e 1 s⁻¹. Na aquisição, ganho relativo 1,2 multiplica todas as cargas, mantendo o processo de chegada e sem perdas. Os pulsos de 9 fC cruzam o limiar alto. O fundo total fica em 4 s⁻¹, mas a categoria alta passa de 1 para 3 s⁻¹. Se o sinal verdadeiro durante a aquisição tem 8 s⁻¹ em cada categoria, a fração real é 1/2. Subtrair o branco antigo dá 10/16=5/8, erro de 12,5 pontos percentuais. Alongar o branco antigo reduz incerteza de contagem e mantém esse viés populacional.

O analisador e o Z3 verificaram a fração e refutaram a igualdade com 1/2 via node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs. As premissas numéricas entram após a derivação da migração. Ambos os processos saíram com código zero. Regras do Tubo consultadas como contexto. SHA integral do BOOK conferido.

```json
[
  {
    "entrada": {
      "visao": "Migração de fundo entre categorias com taxa total fixa.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "sAlta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sBaixa",
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
          "simbolo": "frac",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "sAlta = 8 ∧ sBaixa = 8 ∧ mig = 2",
        "frac × (sAlta + sBaixa) = sAlta + mig"
      ],
      "tese": "8 × frac = 5"
    },
    "saida": {
      "visaoDeclarada": "Migração de fundo entre categorias com taxa total fixa.",
      "teseFormal": "8 × frac = 5",
      "leituraDaTese": "(8 · frac) é igual a 5",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "sAlta = 8 ∧ sBaixa = 8 ∧ mig = 2"
        },
        {
          "id": "hipótese 2",
          "formula": "frac × (sAlta + sBaixa) = sAlta + mig"
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
      "visao": "Migração de fundo entre categorias com taxa total fixa.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "sAlta",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "sBaixa",
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
          "simbolo": "frac",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "sAlta = 8 ∧ sBaixa = 8 ∧ mig = 2",
        "frac × (sAlta + sBaixa) = sAlta + mig"
      ],
      "tese": "2 × frac = 1"
    },
    "saida": {
      "visaoDeclarada": "Migração de fundo entre categorias com taxa total fixa.",
      "teseFormal": "2 × frac = 1",
      "leituraDaTese": "(2 · frac) é igual a 1",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "sAlta = 8 ∧ sBaixa = 8 ∧ mig = 2"
        },
        {
          "id": "hipótese 2",
          "formula": "frac × (sAlta + sBaixa) = sAlta + mig"
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

Sem simulação ou coleta local. Próximo passo: limitar a migração admissível a partir da estabilidade medida do ganho e da densidade de pulsos de fundo perto dos limiares.
