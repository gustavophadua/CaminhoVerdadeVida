# 13/11/2026 — PMT 13 — Tempo de branco e precisão da fração de sinal

O PMT 12 separou fundo e sinal por categoria. O modelo de contagens com aquisição auxiliar segue a estrutura de verossimilhança descrita por Cowan et al. [Artigo primário](https://arxiv.org/pdf/1007.1727).

Para categorias disjuntas alta H e intermediária L, suponha contagens independentes Nⱼ~Poisson(T(sⱼ+bⱼ)) e Mⱼ~Poisson(U bⱼ). T e U são exposições em segundos e sⱼ,bⱼ são taxas em s⁻¹. Fundo, ganho e limiares permanecem estáveis entre aquisições. O estimador líquido Nⱼ/T−Mⱼ/U tem variância exata (sⱼ+bⱼ)/T+bⱼ/U. A contribuição do branco é bⱼ/U em s⁻².

Para p=sH/(sH+sL), s=sH+sL>0, o método delta dá Var(p̂)≈A/T+B/U. Os coeficientes são A=[(1−p)²(sH+bH)+p²(sL+bL)]/s² e B=[(1−p)²bH+p²bL]/s², em segundos. A variância da fração é adimensional. A aproximação requer contagens suficientes e denominador estimado longe de zero. Para A,B>0 e T+U=W, Cauchy–Schwarz dá o mínimo (√A+√B)²/W, alcançado com U/T=√(B/A). Essa alocação ignora custos de troca e depende de taxas de planejamento.

Exemplo sintético com sH=sL=8, bH=1 e bL=3 s⁻¹. A=5/256 s e B=1/256 s. Em W=120 s, o ótimo contínuo destina cerca de 37,1 s ao branco e 82,9 s à aquisição principal. Manter T fixo e tratar o branco finito como se o fundo fosse conhecido omite B/U. O Cosmos e Z3 verificaram que esse termo aumenta estritamente a variância aproximada sob as premissas positivas e refutaram a igualdade. A identidade probabilística, o método delta e a otimização foram derivados separadamente.

Execução com node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via entrada padrão e código zero. Regras do Tubo consultadas como contexto. SHA integral do BOOK conferido.

```json
[
  {
    "entrada": {
      "visao": "Custo de estimar o fundo com exposição finita.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "vBranco",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vIdeal",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "tempo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fundo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "peso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "tempo > 0 ∧ fundo > 0 ∧ peso > 0",
        "tempo × (vBranco − vIdeal) = peso × fundo"
      ],
      "tese": "vBranco > vIdeal"
    },
    "saida": {
      "visaoDeclarada": "Custo de estimar o fundo com exposição finita.",
      "teseFormal": "vBranco > vIdeal",
      "leituraDaTese": "vBranco é maior que vIdeal",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "tempo > 0 ∧ fundo > 0 ∧ peso > 0"
        },
        {
          "id": "hipótese 2",
          "formula": "tempo × (vBranco − vIdeal) = peso × fundo"
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
      "visao": "Custo de estimar o fundo com exposição finita.",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "vBranco",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "vIdeal",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "tempo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fundo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "peso",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "tempo > 0 ∧ fundo > 0 ∧ peso > 0",
        "tempo × (vBranco − vIdeal) = peso × fundo"
      ],
      "tese": "vBranco = vIdeal"
    },
    "saida": {
      "visaoDeclarada": "Custo de estimar o fundo com exposição finita.",
      "teseFormal": "vBranco = vIdeal",
      "leituraDaTese": "vBranco é igual a vIdeal",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "tempo > 0 ∧ fundo > 0 ∧ peso > 0"
        },
        {
          "id": "hipótese 2",
          "formula": "tempo × (vBranco − vIdeal) = peso × fundo"
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

Exemplo analítico, sem simulação ou coleta local. Próxima rodada: avaliar o viés quando a mudança de ganho altera o fundo por categoria entre branco e aquisição.
