# 14/11/2026 — Todo 02 — A perda cinética na colisão independe do referencial inercial

Marcos 4:1–20 distingue o que é semeado das condições em que se produz fruto. A extensão da rodada Todo 01 testa uma pergunta mais estreita: quando duas partes interagem, que resultado pertence à relação entre elas? O vínculo é estrutural. A parábola trata da recepção da palavra. A física abaixo trata de um par de massas. [Marcos 4](https://www.biblegateway.com/passage/?search=Mark+4%3A1-20&version=KJV) · [Newton, leis do movimento](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

## Hipóteses e mecanismo

Mecânica clássica unidimensional, massas positivas constantes m₁,m₂ em kg, impulso externo total desprezível e velocidades em m/s. Para M=m₁+m₂, μ=m₁m₂/M, P=m₁v₁+m₂v₂ e velocidade relativa w=v₁−v₂, expandir os quadrados dá K=P²/(2M)+μw²/2 em J. Sob mudança galileana de velocidade u, P′=P−Mu e w′=w. O primeiro termo acompanha o referencial e o segundo permanece igual.

Se P é conservado e w_final=−e w_inicial, com restituição e∈[0,1], então a perda de energia cinética translacional é K_inicial−K_final=μ(1−e²)w_inicial²/2 em J. Ela é invariante porque o termo do centro de massa se cancela na diferença. Para massas iguais m, isso dá m(1−e²)w²/4, que coincide com S5 nas equações do Tubo quando perda=1−e². Essa relação quantifica a perda translacional. Distribuir essa energia entre deformação, calor e outros canais exige informação adicional.

## Previsão e contraexemplo

Escolha duas massas de 1 kg, velocidades iniciais (4,0) m/s e finais (3,1) m/s. O momento total permanece 4 kg·m/s no referencial inicial. Para essa ordem dos rótulos, a velocidade relativa final tem o mesmo sinal da inicial. Assim o exemplo testa uma transferência com redução do módulo relativo por fator 1/2. Para representar uma colisão com reflexão relativa, troque a atribuição final para (1,3) m/s. Os quadrados somados e a perda são idênticos. O teste formal usa essas somas: antes−depois=6 em unidades de duas vezes a energia em J, para qualquer u. Logo a perda é 3 J. O Cosmos e o Z3 verificaram SEGUE. Já K_inicial=8 J ficou EM ABERTO: para u=0 vale 8 J e para u=2 m/s vale 4 J.

## Cobertura

Todo 01 retomado pelo manifesto SHA-256 conferido: 4e28d0eedc2cfd3a8894db146d08c64bffcd3cb2e7491af1436bdf92ae72fd66. Esta rodada consultou S5 em equacoes.md e avançou a ponte com T09 para o caso em que e<1 e w≠0. Colisões elásticas, e=1, têm perda translacional zero mesmo com velocidades diferentes. Portanto a leitura de T09 como perda cinética estritamente positiva exige restringir o domínio. T01–T03/T11 foram cobertas como regras de observação parcial no histórico. T04–T08, T10, T12–T13 e a contabilidade completa R+K+G ficam fora da verificação desta rodada.

A dedução geral é algébrica. O Cosmos e o Z3 verificaram o caso numérico com u livre. Sem simulação estocástica nem medição local. BOOK SHA-256 conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit local de referência: aacecce9f606fe73789fbd74135fc01abd5ea356. CaminhoVerdadeVida retornou 404, com commit, push e deploy pendentes nesse destino.

Próximo passo: verificar a contabilidade de trabalho e reserva quando a força externa altera o momento total.

## Execução

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs, JSON via stdin.

```json
[
  {
    "entrada": {
      "visao": "Colisão com restituição um meio",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "antes",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "depois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "u",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "antes = (4 − u) × (4 − u) + u × u",
        "depois = (3 − u) × (3 − u) + (1 − u) × (1 − u)"
      ],
      "tese": "antes − depois = 6"
    },
    "saida": {
      "visaoDeclarada": "Colisão com restituição um meio",
      "teseFormal": "antes − depois = 6",
      "leituraDaTese": "(antes − depois) é igual a 6",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "antes = (4 − u) × (4 − u) + u × u"
        },
        {
          "id": "hipótese 2",
          "formula": "depois = (3 − u) × (3 − u) + (1 − u) × (1 − u)"
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
      "visao": "Colisão com restituição um meio",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "antes",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "depois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "u",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "antes = (4 − u) × (4 − u) + u × u",
        "depois = (3 − u) × (3 − u) + (1 − u) × (1 − u)"
      ],
      "tese": "antes = 16"
    },
    "saida": {
      "visaoDeclarada": "Colisão com restituição um meio",
      "teseFormal": "antes = 16",
      "leituraDaTese": "antes é igual a 16",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "antes = (4 − u) × (4 − u) + u × u"
        },
        {
          "id": "hipótese 2",
          "formula": "depois = (3 − u) × (3 − u) + (1 − u) × (1 − u)"
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
