# 13/11/2026 — PMT 01: pós-pulsos e limite do modelo Poisson

Haser et al. mediram probabilidade e distribuição temporal de pós-pulsos em 473 PMTs R7081 do Double Chooz: [artigo primário](https://arxiv.org/abs/1301.2508). Essa medição motiva o modelo abaixo; não transfere parâmetros ao Tubo.

Hipótese: K~Poisson(m), m=(κc+b₀)T, com c e b₀ em s⁻¹, κ adimensional e T em s. Cada evento primário registrado produz, independentemente, no máximo um pós-pulso com probabilidade p∈[0,1]. Ambos são atribuídos à janela do primário (ou desprezam-se efeitos de borda); sem tempo morto, cascata ou sobreposição. N=Σ(1+Bernoulli(p)). Pela esperança e variância totais, E[N]=m(1+p), Var(N)=m p(1−p)+m(1+p)²=m(1+3p). Contagens adimensionais. O fator de Fano é (1+3p)/(1+p). O excesso de taxa média é p(κc+b₀), dependente da iluminação; não se comporta como fundo aditivo fixo ao mudar c. Ajustar apenas a média não recupera a distribuição Poisson.

Com m=100 e p=0,1, média 110 e variância 130. É um exemplo exato do modelo, não medição. A derivação probabilística é analítica; o analisador do Cosmos e o Z3 verificaram estas consequências algébricas:

```json
[
  {
    "id": "POSPULSO_SOBREDISPERSAO",
    "premissas": {
      "A": "prim > 0 ∧ pp > 0 ∧ pp ≤ 1",
      "B": "mu = prim × (1 + pp) ∧ vv = prim × (1 + 3 × pp)"
    },
    "alvo": "vv > mu",
    "esperado": "SEGUE"
  },
  {
    "id": "POISSON_COM_MESMA_MEDIA",
    "premissas": {
      "A": "prim = 100 ∧ 10 × pp = 1",
      "B": "mu = prim × (1 + pp) ∧ vv = prim × (1 + 3 × pp)"
    },
    "alvo": "vv = mu",
    "esperado": "CONTRADIZ"
  }
]
```

Comando: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-13/rodada-pmt-pospulso-temporaria.mjs. Código de saída 0.

```text
POSPULSO_SOBREDISPERSAO: premissas=sat; consulta=sat; negacao=unsat
POSPULSO_SOBREDISPERSAO SEGUE [A, B, consulta]
POISSON_COM_MESMA_MEDIA: premissas=sat; consulta=unsat; negacao=sat
POISSON_COM_MESMA_MEDIA CONTRADIZ [A, B, consulta]
```

Próximo: usar atrasos entre disparo óptico e registro para separar coincidências acidentais e pós-pulsos, com janelas de controle e resolução temporal explícitas. Não foi feita coleta física local nem estimado α sob pós-pulsos. O BOOK não foi alterado.
