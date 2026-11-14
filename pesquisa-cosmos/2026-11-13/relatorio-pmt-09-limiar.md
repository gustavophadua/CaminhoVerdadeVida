# 13/11/2026 — PMT 09 — Mudança de ganho perto do limiar

O relatório 08 supôs taxas estáveis durante o piloto e a aquisição. A caracterização experimental da colaboração DEAP mediu distribuições de carga de fotoelétron único nos PMTs R5912-HQE. Isso motiva medir a aceitação do discriminador no próprio aparelho. [Artigo primário](https://arxiv.org/abs/1705.10183).

Modelo para fótons individuais com conversão e coleção efetivas de probabilidade η∈[0,1]. Seja Q a carga em coulombs após conversão e coleção em um ganho de referência, com distribuição acumulada F. Para ganho relativo g>0 adimensional e limiar q>0 em coulombs, aceita-se gQ>q. A eficiência é κ(g)=η[1−F(q/g)]. Para discriminador por altura de pulso, substitua carga por amplitude em volts e use a distribuição de amplitude apropriada. A expressão assume mudança apenas de escala no ganho e ausência de saturação, tempo morto e pós-pulsos. Com η constante, elevar g reduz q/g e não reduz κ. O aumento é estrito somente se o intervalo atravessado contiver massa de probabilidade e η>0.

Com fluxo c em s⁻¹ e fundo b em s⁻¹, a taxa observada é λ=κc+b. Para um testemunho sintético, tome c=20 s⁻¹, b=5 s⁻¹, η=1, q=10 fC e g de 1 para 2. Distribua Q em 15 fC (50%), 7 fC (10%) e 3 fC (40%). A eficiência passa de 0,5 a 0,6 e λ de 15 a 17 s⁻¹. As cargas e probabilidades ilustram a aceitação e não são estimativas para um modelo comercial. Fixar b isola um mecanismo possível. Em bancada, a mesma mudança pode alterar a aceitação dos pulsos escuros.

O Cosmos e Z3 verificaram a consequência aritmética e o contraexemplo com fluxo fixo. O modelo do limiar foi derivado separadamente. As regras do Tubo foram consultadas como contexto. Ambos os processos terminaram com código zero usando node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs. SHA do BOOK conferido pelo prefixo 27d270c9.

```json
[
  {
    "entrada": {
      "visao": "Mudança de aceitação do limiar com fluxo fixo",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "taxaUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "taxaDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fluxoUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fluxoDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "efUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "efDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fundo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "fluxoUm = 20 ∧ fluxoDois = fluxoUm ∧ fundo = 5",
        "2 × efUm = 1 ∧ 5 × efDois = 3",
        "taxaUm = efUm × fluxoUm + fundo ∧ taxaDois = efDois × fluxoDois + fundo"
      ],
      "tese": "taxaDois > taxaUm"
    },
    "saida": {
      "visaoDeclarada": "Mudança de aceitação do limiar com fluxo fixo",
      "teseFormal": "taxaDois > taxaUm",
      "leituraDaTese": "taxaDois é maior que taxaUm",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "fluxoUm = 20 ∧ fluxoDois = fluxoUm ∧ fundo = 5"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × efUm = 1 ∧ 5 × efDois = 3"
        },
        {
          "id": "hipótese 3",
          "formula": "taxaUm = efUm × fluxoUm + fundo ∧ taxaDois = efDois × fluxoDois + fundo"
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
    }
  },
  {
    "entrada": {
      "visao": "Mudança de aceitação do limiar com fluxo fixo",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "taxaUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "taxaDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fluxoUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fluxoDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "efUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "efDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fundo",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "fluxoUm = 20 ∧ fluxoDois = fluxoUm ∧ fundo = 5",
        "2 × efUm = 1 ∧ 5 × efDois = 3",
        "taxaUm = efUm × fluxoUm + fundo ∧ taxaDois = efDois × fluxoDois + fundo"
      ],
      "tese": "fluxoDois > fluxoUm"
    },
    "saida": {
      "visaoDeclarada": "Mudança de aceitação do limiar com fluxo fixo",
      "teseFormal": "fluxoDois > fluxoUm",
      "leituraDaTese": "fluxoDois é maior que fluxoUm",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "fluxoUm = 20 ∧ fluxoDois = fluxoUm ∧ fundo = 5"
        },
        {
          "id": "hipótese 2",
          "formula": "2 × efUm = 1 ∧ 5 × efDois = 3"
        },
        {
          "id": "hipótese 3",
          "formula": "taxaUm = efUm × fluxoUm + fundo ∧ taxaDois = efDois × fluxoDois + fundo"
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

Sem simulação ou medição local. Próximo passo: usar monitor óptico e uma varredura de limiar para estimar separadamente mudança de ganho e mudança de fluxo.
