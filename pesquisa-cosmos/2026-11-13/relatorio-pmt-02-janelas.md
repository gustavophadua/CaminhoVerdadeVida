# 13/11/2026 — PMT 02: separar pós-pulsos e coincidências acidentais

Continuação do PMT 01. [Haser et al., JINST 8 P04029](https://arxiv.org/abs/1301.2508) mediram atrasos de pós-pulsos em PMTs do Double Chooz. Não se assume que seu histograma ou parâmetros valham para o Tubo.

Protocolo proposto: marcar M pulsos primários com referência óptica independente e selecionar os primários registrados; medir atrasos a partir do registro primário. Fixar janelas não sobrepostas de sinal e controle com larguras wOn,wOff>0 em segundos. Escolher controle sem contribuição de pós-pulsos e evitar sobreposição entre disparos. Excluir regiões cegas por regra previamente fixada e usar larguras efetivamente observáveis. Exigir resolução temporal validada para as janelas escolhidas. Nenhum parâmetro foi medido localmente.

Para fundo estacionário de intensidade bg≥0 em s⁻¹, independente do disparo, sejam on e off as médias de contagens por primário, sig≥0 o excesso médio na janela de sinal, todos adimensionais. on=sig+bg*wOn, off=bg*wOff. Então est=on−(wOn/wOff)*off=sig. Na prática, substituir on e off por contagens totais divididas por M. A estimativa refere-se apenas à janela observável; só pode ser interpretada como probabilidade se houver no máximo um pós-pulso nela. Se a taxa de acidentais na janela de sinal excede a do controle em drift s⁻¹, o viés é drift*wOn. Uma perturbação sincronizada com o LED também pode gerar excesso: a subtração sozinha não estabelece o mecanismo físico.

Cosmos/Z3: verificadas premissas, consulta e negação; consequência condicional e contraexemplo à ausência de excesso com deriva. Comando: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-13/pmt02-temporario.mjs, código 0.

```json
[
  {
    "id": "CANCELA",
    "premissas": {
      "A": "bg ≥ 0 ∧ wOn > 0 ∧ wOff > 0",
      "B": "on = sig + bg × wOn ∧ off = bg × wOff ∧ wOff × est = wOff × on − wOn × off"
    },
    "alvo": "est = sig",
    "esperado": "SEGUE"
  },
  {
    "id": "DERIVA",
    "premissas": {
      "A": "bg ≥ 0 ∧ drift > 0 ∧ wOn > 0 ∧ wOff > 0",
      "B": "sig = 0 ∧ on = (bg + drift) × wOn ∧ off = bg × wOff ∧ wOff × est = wOff × on − wOn × off"
    },
    "alvo": "est = 0",
    "esperado": "CONTRADIZ"
  }
]
```

```text
CANCELA: premissas=sat; consulta=sat; negacao=unsat
CANCELA SEGUE [A, B, consulta]
DERIVA: premissas=sat; consulta=unsat; negacao=sat
DERIVA CONTRADIZ [A, B, consulta]
```

Sem simulação ou medição local. Próximo: comparar incerteza de contagem por disparo e deriva residual; verificar um controle com LED disparado e caminho óptico bloqueado para procurar interferência sincronizada. BOOK preservado e temporário próprio removido.
