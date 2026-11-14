# 14/11/2026 — PMT 23 — Curvatura em função do ganho inverso

O IceCube extraiu distribuições de carga de fotoelétron único em seus PMTs. O resultado experimental fundamenta caracterizar o espectro. A cota abaixo é uma dedução do modelo do Tubo para um espectro de fundo, com parâmetros ilustrativos independentes dos dados do IceCube. [Artigo primário](https://arxiv.org/abs/2002.00997).

## Modelo

Continuação do PMT 22. Suponha espectro estacionário de fundo, ganho escalar g∈(0,1], discriminador por carga com corte abrupto j>0 em pC e perdas eletrônicas adicionais desprezíveis. Use a coordenada adimensional x=1/g. A perda de fundo em s⁻¹ é D(j,x)=∫[j,jx) f(q)dq, com f≥0 em s⁻¹ pC⁻¹. Se f for continuamente diferenciável na faixa de carga varrida, D′=j f(jx) e D″=j² f′(jx), ambas em s⁻¹ na coordenada adimensional. Assim, uma cota Mⱼ de |f′| em s⁻¹ pC⁻² fornece |D″|≤j² Mⱼ. A garantia de interpolação do PMT 22 pode ser aplicada em x usando o espaçamento e as cotas nessa mesma coordenada.

Para a margem m=h−pd, h=D(H,x), d=D(L,x), 0≤p≤1 e L<H, segue m″=h″−p″d−2p′d′−pd″. Se d≤Dmax, |p′|≤P₁, |p″|≤P₂ e f(Lx)≤F_L na faixa, então |m″|≤H²M_H+P₂Dmax+2P₁ L F_L+L²M_L. A cota de um corte isolado cobre apenas uma parcela da margem. A observação parcial das regras T01–T13, consultadas via leis-da-fisica-no-tubo.md, aparece na diferença entre observar a densidade pontual e controlar sua variação em uma faixa.

## Prova condicional e contraexemplo

No ensaio sintético, j=2 pC. Fixe q₀=3 pC e f(q)=1+B(q−q₀) na faixa [2,9;3,1] pC, com a constante em s⁻¹ pC⁻¹ e B em s⁻¹ pC⁻². O espectro local é não negativo para |B|≤10, e pode ser estendido de forma não negativa e integrável fora da faixa. Para x∈[1,45;1,55], D″=4B em unidades numéricas. O Cosmos e o Z3 confirmaram |D″|≤8 s⁻¹ se |B|≤2. Com |B|≤10, a mesma afirmação ficou em aberto. B=0 e B=3 têm f(q₀)=1 e D′ no centro igual a 2 s⁻¹, mas curvaturas 0 e 12 s⁻¹. Assim, uma leitura pontual da densidade ou da primeira derivada da perda é insuficiente para certificar essa cota.

A diferenciação e a cota da margem foram deduzidas analiticamente. Os ensaios formais verificaram as consequências algébricas no exemplo. Sem simulação estocástica ou coleta local. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: construir uma cota simultânea para a inclinação do espectro, explicitando a regularidade adicional que permite passar das médias dos bins para uma cota entre eles.

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON por stdin.

```json
[
  {
    "entrada": {
      "visao": "Curvatura no ganho inverso",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "inclinacao",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "curvatura",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "inclinacao ≥ −2 ∧ inclinacao ≤ 2",
        "curvatura = 4 × inclinacao"
      ],
      "tese": "curvatura ≥ −8 ∧ curvatura ≤ 8"
    },
    "saida": {
      "visaoDeclarada": "Curvatura no ganho inverso",
      "teseFormal": "curvatura ≥ −8 ∧ curvatura ≤ 8",
      "leituraDaTese": "curvatura é maior ou igual a −8 e curvatura é menor ou igual a 8",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "inclinacao ≥ −2 ∧ inclinacao ≤ 2"
        },
        {
          "id": "hipótese 2",
          "formula": "curvatura = 4 × inclinacao"
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
    },
    "codigo": 0
  },
  {
    "entrada": {
      "visao": "Curvatura no ganho inverso",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "inclinacao",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "curvatura",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "inclinacao ≥ −10 ∧ inclinacao ≤ 10",
        "curvatura = 4 × inclinacao"
      ],
      "tese": "curvatura ≥ −8 ∧ curvatura ≤ 8"
    },
    "saida": {
      "visaoDeclarada": "Curvatura no ganho inverso",
      "teseFormal": "curvatura ≥ −8 ∧ curvatura ≤ 8",
      "leituraDaTese": "curvatura é maior ou igual a −8 e curvatura é menor ou igual a 8",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "inclinacao ≥ −10 ∧ inclinacao ≤ 10"
        },
        {
          "id": "hipótese 2",
          "formula": "curvatura = 4 × inclinacao"
        }
      ],
      "envolvidos": [],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "sat"
      }
    },
    "codigo": 0
  }
]
```
