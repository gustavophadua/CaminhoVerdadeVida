# 14/11/2026 — PMT 22 — O que dois pontos de calibração garantem entre eles

O IceCube publicou medições in situ das distribuições de carga de fotoelétron único em seus PMTs. Essa caracterização motiva amostrar a resposta do detector em vez de presumir sua forma. As cotas e valores abaixo são uma extensão matemática do PMT 21. [Artigo primário](https://doi.org/10.1088/1748-0221/15/06/P06032).

## Modelo e garantia

Mantenha as hipóteses do PMT 21: fundo estacionário antes do discriminador, ganho escalar, cortes abruptos e efeitos de tempo morto, pós-pulsos e saturação desprezíveis. Sejam h e d as perdas de fundo nos cortes alto e baixo em s⁻¹, p∈[0,1] a fração alta do sinal e s>d≥0 a taxa de sinal no corte baixo em s⁻¹. O viés populacional ao subtrair o branco antigo é e=−m/(s−d), com margem m=h−pd em s⁻¹. A coordenada de queda adicional de ganho z é adimensional.

Em um intervalo [0,Δ], Δ>0, suponha m duas vezes continuamente diferenciável, |m″|≤K em s⁻¹ por unidade de ganho ao quadrado e margens de calibração A,B em s⁻¹ com erros absolutos até η≥0 nos extremos. A reta ℓ(z)=(1−z/Δ)A+(z/Δ)B satisfaz |m(z)−ℓ(z)|≤η+(K/2)z(Δ−z). O termo η vem da média ponderada dos erros nos extremos e o termo quadrático vem do resto de interpolação linear. Como z(Δ−z)≤Δ²/4, min(A,B)>η+KΔ²/8 garante e<0 no intervalo. Se η vier de intervalos de confiança, a interpretação estatística depende da cobertura simultânea dos extremos e da validade da cota K. Dois extremos isolados não identificam K. As regras T01–T13 foram consultadas via leis-da-fisica-no-tubo.md. A observação parcial aqui é a amostragem da curva em dois ganhos.

## Ensaio e contraexemplo

Em uma varredura sintética independente da rodada 21, use Δ=1/20, A=B=1/400 s⁻¹ e η=1/2000 s⁻¹. A condição uniforme é K<32/5 s⁻¹ na coordenada adimensional. Para K=4, o piso da margem é 3/4000 s⁻¹. O analisador e o Z3 verificaram margem estritamente positiva. Para K=12, obtiveram EM ABERTO. Testemunhos explícitos são a margem constante 1/400 s⁻¹ e a curva m(z)=1/400−6z(1/20−z), em s⁻¹, que tem os mesmos extremos e atinge −1/800 s⁻¹ no centro. A segunda curva satura a cota de curvatura. Os testes formais usam o envelope algébrico ponto a ponto. A derivação da interpolação é analítica.

Prova condicional e cálculo sintético, sem simulação estocástica ou coleta física local. SHA-256 do BOOK verificado antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.

Próximo passo: obter uma cota defensável de K a partir das densidades de carga perto dos limiares e verificar a robustez contra incerteza no próprio ganho.

Comando executado: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin.

```json
[
  {
    "K": 4,
    "entrada": {
      "visao": "Curvatura da margem",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "z",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "margem",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "z ≥ 0 ∧ 20 × z ≤ 1",
        "2000 × margem ≥ 4 − 200 × z × (1 − 20 × z)",
        "2000 × margem ≤ 6 + 200 × z × (1 − 20 × z)"
      ],
      "tese": "margem > 0"
    },
    "saida": {
      "visaoDeclarada": "Curvatura da margem",
      "teseFormal": "margem > 0",
      "leituraDaTese": "margem é maior que 0",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "z ≥ 0 ∧ 20 × z ≤ 1"
        },
        {
          "id": "hipótese 2",
          "formula": "2000 × margem ≥ 4 − 200 × z × (1 − 20 × z)"
        },
        {
          "id": "hipótese 3",
          "formula": "2000 × margem ≤ 6 + 200 × z × (1 − 20 × z)"
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
    "K": 12,
    "entrada": {
      "visao": "Curvatura da margem",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "z",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "margem",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "z ≥ 0 ∧ 20 × z ≤ 1",
        "2000 × margem ≥ 4 − 600 × z × (1 − 20 × z)",
        "2000 × margem ≤ 6 + 600 × z × (1 − 20 × z)"
      ],
      "tese": "margem > 0"
    },
    "saida": {
      "visaoDeclarada": "Curvatura da margem",
      "teseFormal": "margem > 0",
      "leituraDaTese": "margem é maior que 0",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "z ≥ 0 ∧ 20 × z ≤ 1"
        },
        {
          "id": "hipótese 2",
          "formula": "2000 × margem ≥ 4 − 600 × z × (1 − 20 × z)"
        },
        {
          "id": "hipótese 3",
          "formula": "2000 × margem ≤ 6 + 600 × z × (1 − 20 × z)"
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
