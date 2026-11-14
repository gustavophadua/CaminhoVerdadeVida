# 14/11/2026 — Todo 03 — Trabalho e reserva sob mudança de referencial

Em Lucas 14:28–30, o construtor calcula o custo antes de começar. A ponte proposta é declarar o que entra na conta antes de afirmar que um orçamento fecha. A parábola trata do custo do discipulado. O modelo abaixo trata de balanço mecânico. [Lucas 14](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Newton, leis I e II](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

## Modelo e previsão

Mecânica clássica unidimensional, massa constante m>0 em kg, referenciais inerciais com diferença u em m/s, força resultante F em N. J=∫F dt em N·s e W=∫Fv dt em J, no mesmo intervalo. Sob v′=v−u e F′=F, W′=W−uJ. Expandir K=mv²/2 dá ΔK′=ΔK−uJ. Portanto W′−ΔK′=W−ΔK. A igualdade trabalho–energia é preservada.

A Máquina do Tubo usa ΔR=−ΔK na etapa de força S4, na contabilidade do seu referencial. Se ΔR for mantida como variação de uma reserva interna escalar calculada no referencial inicial, ΔR+ΔK′=−uJ. Para fechar a conta em qualquer referencial é preciso modelar as demais transferências do sistema. Por exemplo, para um atuador material incluído no sistema que recebe −J, a mudança de sua própria energia cinética se transforma com termo +uJ. Os termos se cancelam ao somar as duas partes. Isso preserva a transformação do balanço, sob conservação do momento total e massas constantes. A divisão física entre energia interna, movimento do atuador e dissipação exige um modelo do atuador.

## Teste e contraexemplo

Com m=1 kg e v inicial e final de 0 e 2 m/s, J=2 N·s, W=2 J e ΔR=−2 J. Em u=0, ΔR+W′=0. Em u=2 m/s, W′=−2 J e ΔR+W′=−4 J. O Cosmos e o Z3 verificaram a transformação do saldo e o fechamento com o termo compensatório. A tese de que a mesma reserva e o trabalho transformado já fecham a conta ficou EM ABERTO com u livre. O termo compensatório no solver é uma identidade algébrica. A interpretação como efeito do atuador é condicional às hipóteses indicadas.

## Cobertura e rastreabilidade

A rodada estende Todo 01–02 e a contabilidade S3/S4 das equações do Tubo. T01–T03/T11 dão o contexto de observação parcial e T09 foi delimitada na rodada anterior. Este ensaio não verifica T04–T08, T10 ou T12–T13, nem a dinâmica global de fechamento. Próximo passo: explicitar um par corpo–atuador e testar separadamente energia interna e energia relativa em uma troca de impulso.

Valores sintéticos e prova condicional, sem medição local ou simulação. SHA-256 de Todo 02 conferido: 18d6bddc0788807c29ba3172cf3a8963bf16f12da68db636e6c0fe0e1456bad2. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit local de referência: aacecce9f606fe73789fbd74135fc01abd5ea356. CaminhoVerdadeVida retornou 404. Commit, push e deploy para esse destino seguem pendentes.

## Execução

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs. JSON por stdin, grandezas em SI. O símbolo reserva nos testes significa ΔR.

```json
[
  {
    "entrada": {
      "visao": "Trabalho e referencial da reserva",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "trabalho",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "trabalhoOutro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "reserva",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "impulso",
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
        "trabalho = 2",
        "impulso = 2",
        "reserva = −2",
        "trabalhoOutro = trabalho − u × impulso"
      ],
      "tese": "reserva + trabalhoOutro = −u × impulso"
    },
    "saida": {
      "visaoDeclarada": "Trabalho e referencial da reserva",
      "teseFormal": "reserva + trabalhoOutro = −u × impulso",
      "leituraDaTese": "(reserva + trabalhoOutro) é igual a (−u · impulso)",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "trabalho = 2"
        },
        {
          "id": "hipótese 2",
          "formula": "impulso = 2"
        },
        {
          "id": "hipótese 3",
          "formula": "reserva = −2"
        },
        {
          "id": "hipótese 4",
          "formula": "trabalhoOutro = trabalho − u × impulso"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 3",
        "hipótese 4",
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
      "visao": "Trabalho e referencial da reserva",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "trabalho",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "trabalhoOutro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "reserva",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "impulso",
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
        "trabalho = 2",
        "impulso = 2",
        "reserva = −2",
        "trabalhoOutro = trabalho − u × impulso"
      ],
      "tese": "reserva + trabalhoOutro = 0"
    },
    "saida": {
      "visaoDeclarada": "Trabalho e referencial da reserva",
      "teseFormal": "reserva + trabalhoOutro = 0",
      "leituraDaTese": "(reserva + trabalhoOutro) é igual a 0",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "trabalho = 2"
        },
        {
          "id": "hipótese 2",
          "formula": "impulso = 2"
        },
        {
          "id": "hipótese 3",
          "formula": "reserva = −2"
        },
        {
          "id": "hipótese 4",
          "formula": "trabalhoOutro = trabalho − u × impulso"
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
  },
  {
    "entrada": {
      "visao": "Trabalho e referencial da reserva",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "trabalho",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "trabalhoOutro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "reserva",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "impulso",
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
        "trabalho = 2",
        "impulso = 2",
        "reserva = −2",
        "trabalhoOutro = trabalho − u × impulso"
      ],
      "tese": "reserva + trabalhoOutro + u × impulso = 0"
    },
    "saida": {
      "visaoDeclarada": "Trabalho e referencial da reserva",
      "teseFormal": "reserva + trabalhoOutro + u × impulso = 0",
      "leituraDaTese": "((reserva + trabalhoOutro) + (u · impulso)) é igual a 0",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "trabalho = 2"
        },
        {
          "id": "hipótese 2",
          "formula": "impulso = 2"
        },
        {
          "id": "hipótese 3",
          "formula": "reserva = −2"
        },
        {
          "id": "hipótese 4",
          "formula": "trabalhoOutro = trabalho − u × impulso"
        }
      ],
      "envolvidos": [
        "hipótese 1",
        "hipótese 3",
        "hipótese 4",
        "tese"
      ],
      "verificacoes": {
        "premissas": "sat",
        "tese": "sat",
        "negacao": "unsat"
      }
    },
    "codigo": 0
  }
]
```
