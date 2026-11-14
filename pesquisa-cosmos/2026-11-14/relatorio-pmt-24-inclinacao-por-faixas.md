# 14/11/2026 — PMT 24 — Inclinação do espectro a partir de duas faixas

O IceCube extraiu distribuições de carga de fotoelétron único por deconvolução. Esta rodada deriva uma cota para uma densidade de taxa de fundo em um PMT idealizado, usando duas médias de faixa. Os números são sintéticos. [Artigo primário do IceCube](https://arxiv.org/abs/2002.00997).

## Modelo e prova

Continuação do PMT 23. Admita ganho escalar, fundo estacionário, corte abrupto por carga e efeitos desprezíveis de saturação, tempo morto e pós-pulsos. Seja f≥0 uma densidade de taxa em s⁻¹ pC⁻¹ nas faixas [q₀−w,q₀] e [q₀,q₀+w], onde q₀≥w>0 em pC. Denote suas médias populacionais por A₋ e A₊, nas unidades de f. Defina S=(A₊−A₋)/w em s⁻¹ pC⁻². Por mudança de variável e pelo teorema fundamental do cálculo,

S = (1/w²) ∫₀ʷ ∫₀ʷ f′(q₀−w+t+u) du dt.

Logo S é uma média ponderada da inclinação. Se f′ for Lipschitz com constante B≥0 em s⁻¹ pC⁻³ nas duas faixas, então |f′(q)−S|≤2Bw para todo q nelas, pois a distância entre quaisquer dois pontos é no máximo 2w. Se ambas as médias estimadas tiverem erro absoluto simultâneo ≤η em s⁻¹ pC⁻¹, substitua S pelo valor estimado e some 2η/w à cota. Na coordenada x=1/g, o resultado dá |D″(j,x)|≤j²(|S_est|+2Bw+2η/w) quando jx está nas faixas. A cota cobre a perda de um corte. A margem combinada ainda depende dos demais termos do PMT 23.

## Testes e contraexemplo

Para w=0,1 pC, B=2 s⁻¹ pC⁻³, η=0 e médias iguais, segue |f′|≤0,4 s⁻¹ pC⁻². Para j=2 pC, isso dá |D″|≤1,6 s⁻¹ em x. O Cosmos e o Z3 confirmaram a cota de inclinação com o erro limitado e a classificaram como EM ABERTO ao remover essa restrição. A passagem das médias à cota foi deduzida por integração e não codificada no Z3.

Contraexemplo físico no modelo: escolha q₀=3 pC, w=0,1 pC e compare f(q)=1 com f(q)=1+0,1 sen(2π(q−q₀)/w), em s⁻¹ pC⁻¹. Ambas são não negativas na faixa e cada integral de bin é 0,1 s⁻¹. No centro as inclinações são 0 e 2π s⁻¹ pC⁻². Portanto os mesmos dois registros agregados admitem curvaturas distintas. Isso concretiza a observação parcial nas regras T01–T13, consultadas via leis-da-fisica-no-tubo.md.

Prova condicional, sem simulação estocástica ou coleta física local. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: construir intervalos simultâneos para A₋ e A₊ a partir de contagens e tempo vivo e escolher w dado um limite independente para B.

Execução: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin.

```json
[
  {
    "entrada": {
      "visao": "Medias por faixa de carga",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "secante",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "inclinacao",
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
        "secante = 0",
        "inclinacao = secante + erro",
        "5 × erro ≥ −2 ∧ 5 × erro ≤ 2"
      ],
      "tese": "5 × inclinacao ≥ −2 ∧ 5 × inclinacao ≤ 2"
    },
    "saida": {
      "visaoDeclarada": "Medias por faixa de carga",
      "teseFormal": "5 × inclinacao ≥ −2 ∧ 5 × inclinacao ≤ 2",
      "leituraDaTese": "(5 · inclinacao) é maior ou igual a −2 e (5 · inclinacao) é menor ou igual a 2",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "secante = 0"
        },
        {
          "id": "hipótese 2",
          "formula": "inclinacao = secante + erro"
        },
        {
          "id": "hipótese 3",
          "formula": "5 × erro ≥ −2 ∧ 5 × erro ≤ 2"
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
    "codigo": 0
  },
  {
    "entrada": {
      "visao": "Medias por faixa de carga",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "secante",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "inclinacao",
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
        "secante = 0",
        "inclinacao = secante + erro"
      ],
      "tese": "5 × inclinacao ≥ −2 ∧ 5 × inclinacao ≤ 2"
    },
    "saida": {
      "visaoDeclarada": "Medias por faixa de carga",
      "teseFormal": "5 × inclinacao ≥ −2 ∧ 5 × inclinacao ≤ 2",
      "leituraDaTese": "(5 · inclinacao) é maior ou igual a −2 e (5 · inclinacao) é menor ou igual a 2",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "secante = 0"
        },
        {
          "id": "hipótese 2",
          "formula": "inclinacao = secante + erro"
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
