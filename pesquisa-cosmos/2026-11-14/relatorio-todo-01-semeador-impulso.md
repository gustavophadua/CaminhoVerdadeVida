# 14/11/2026 — Todo 01 — Semeador, resposta e impulso

Em Marcos 4:1–20, o semeador lança a palavra. As condições em que ela é recebida fazem parte da explicação dos resultados. A conexão proposta é testar uma estrutura análoga em que se controla uma entrada comum e se mede a resposta condicionada. A parábola trata de escuta e fruto. O experimento matemático trata de movimento. [Marcos 4](https://www.biblegateway.com/passage/?search=Mark+4%3A1-20&version=KJV) · [Newton, Principia, leis I e II](https://en.wikisource.org/wiki/Page:Newton%27s_Principia_%281846%29.djvu/89).

## Hipóteses e previsão

Em mecânica clássica unidimensional, use corpos de massa inercial constante m>0 em kg, referenciais inerciais com diferença de velocidade u em m/s e impulso resultante J=∫F dt em N·s, aplicado no mesmo intervalo físico. A segunda lei dá m(vf−vi)=J. Sob mudança galileana v′=v−u, a diferença vf′−vi′ é igual a vf−vi. Logo J é invariante. Para o mesmo J=2 N·s, massas de 1 e 2 kg produzem incrementos de velocidade de 2 e 1 m/s. A resposta depende do corpo e obedece à mesma lei. Este é o vínculo com o semeador.

## Contraexemplo

O sinal da variação da energia cinética pode mudar com o referencial. Para m=1 kg, vi=0 e vf=2 m/s, ΔK=+2 J para u=0 e −2 J para u=2 m/s. Em geral ΔK′=ΔK−uJ, por expansão dos quadrados. Logo o impulso comum não garante ganho cinético positivo em todos os referenciais. Para usar o balanço R+K+G da máquina, é preciso identificar o referencial e definir como os demais termos são contabilizados. O contraexemplo trata da energia cinética do corpo, sem inferir falha de conservação em um sistema fechado.

## Cobertura e rastreabilidade

- Consultados: base local T01–T13 via relatório leis-da-fisica-no-tubo.md, equações S3/S4 sobre força e reserva e checklist C–F com os resultados anteriores do motor. T01–T03/T11 dão o contexto de observação parcial. As conclusões mecânicas usam as premissas físicas explicitadas.
- Verificado nesta rodada pelo Cosmos e Z3: invariância do impulso, resposta distinta em duas massas e dependência do sinal de ΔK. Prova condicional com números sintéticos. Sem medição, integração numérica de trajetória ou simulação estocástica.
- Em aberto: transformação da contabilidade completa da máquina, demais regras do Tubo e cobertura sistemática das parábolas. Próxima lacuna: separar energia cinética do centro de massa e energia relativa em colisões do Tubo.
- SHA de commit local de referência: aacecce9f606fe73789fbd74135fc01abd5ea356. SHA-256 do BOOK conferido antes e depois: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.
- A consulta ao GitHub para CaminhoVerdadeVida retornou 404 nesta rodada. O relatório ficou local. Commit, push e deploy para esse destino estão pendentes.

## Verificações executadas

Comando: node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs. JSON via stdin, grandezas em unidades SI.

```json
[
  {
    "entrada": {
      "visao": "impulso invariante",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "massa",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "inicio",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fim",
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
          "simbolo": "inicioOutro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fimOutro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "referencial",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "deltaUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "deltaDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "massa > 0",
        "massa × (fim − inicio) = impulso",
        "inicioOutro = inicio − referencial ∧ fimOutro = fim − referencial"
      ],
      "tese": "massa × (fimOutro − inicioOutro) = impulso"
    },
    "resultado": {
      "visaoDeclarada": "impulso invariante",
      "teseFormal": "massa × (fimOutro − inicioOutro) = impulso",
      "leituraDaTese": "(massa · (fimOutro − inicioOutro)) é igual a impulso",
      "status": "SEGUE",
      "explicacao": "A tese decorre das premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "massa > 0"
        },
        {
          "id": "hipótese 2",
          "formula": "massa × (fim − inicio) = impulso"
        },
        {
          "id": "hipótese 3",
          "formula": "inicioOutro = inicio − referencial ∧ fimOutro = fim − referencial"
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
      "visao": "resposta de massas distintas",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "massa",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "inicio",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fim",
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
          "simbolo": "inicioOutro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fimOutro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "referencial",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "deltaUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "deltaDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "impulso = 2",
        "deltaUm = impulso ∧ 2 × deltaDois = impulso"
      ],
      "tese": "deltaUm = deltaDois"
    },
    "resultado": {
      "visaoDeclarada": "resposta de massas distintas",
      "teseFormal": "deltaUm = deltaDois",
      "leituraDaTese": "deltaUm é igual a deltaDois",
      "status": "CONTRADIZ",
      "explicacao": "A tese entra em conflito com as premissas indicadas.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "impulso = 2"
        },
        {
          "id": "hipótese 2",
          "formula": "deltaUm = impulso ∧ 2 × deltaDois = impulso"
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
    },
    "codigo": 0
  },
  {
    "entrada": {
      "visao": "sinal da energia",
      "regras": [],
      "simbolos": [
        {
          "simbolo": "massa",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "inicio",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fim",
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
          "simbolo": "inicioOutro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "fimOutro",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "referencial",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "deltaUm",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        },
        {
          "simbolo": "deltaDois",
          "tipo": "constante",
          "aridade": 0,
          "numerico": true
        }
      ],
      "hipoteses": [
        "massa > 0",
        "massa × (fim − inicio) = impulso",
        "inicioOutro = inicio − referencial ∧ fimOutro = fim − referencial",
        "massa = 1 ∧ inicio = 0 ∧ fim = 2"
      ],
      "tese": "fimOutro × fimOutro > inicioOutro × inicioOutro"
    },
    "resultado": {
      "visaoDeclarada": "sinal da energia",
      "teseFormal": "fimOutro × fimOutro > inicioOutro × inicioOutro",
      "leituraDaTese": "(fimOutro · fimOutro) é maior que (inicioOutro · inicioOutro)",
      "status": "EM ABERTO",
      "explicacao": "As premissas admitem cenários com a tese verdadeira e cenários com a tese falsa. Falta informação para decidir.",
      "premissas": [
        {
          "id": "hipótese 1",
          "formula": "massa > 0"
        },
        {
          "id": "hipótese 2",
          "formula": "massa × (fim − inicio) = impulso"
        },
        {
          "id": "hipótese 3",
          "formula": "inicioOutro = inicio − referencial ∧ fimOutro = fim − referencial"
        },
        {
          "id": "hipótese 4",
          "formula": "massa = 1 ∧ inicio = 0 ∧ fim = 2"
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
