# BOOK FINAL — saída integral da execução

Executado em 12/11/2026; pasta 13/11/2026 conforme solicitação. Código de saída: 0.

```text
DOIS: premissas=sat; consulta=sat; negacao=unsat
DOIS SEGUE [B, consulta]
UM: premissas=sat; consulta=unsat; negacao=sat
UM CONTRADIZ [A, B, consulta]
MASSA: premissas=sat; consulta=sat; negacao=unsat
MASSA SEGUE [A, B, consulta]
LIMIAR: premissas=sat; consulta=sat; negacao=unsat
LIMIAR SEGUE [A, B, consulta]
VIES: premissas=sat; consulta=sat; negacao=unsat
VIES SEGUE [A, B, consulta]
DOIS_R: premissas=sat; consulta=sat; negacao=unsat
DOIS_R SEGUE [B, consulta]
PICO: premissas=sat; consulta=sat; negacao=unsat
PICO SEGUE [A, B, consulta]
SEM_CANAL: premissas=sat; consulta=unsat; negacao=sat
SEM_CANAL CONTRADIZ [A, B, consulta]
TOF_MODO: premissas=sat; consulta=sat; negacao=unsat
TOF_MODO SEGUE [A, B, consulta]
TOF_MODO_NUMERICO: premissas=sat; consulta=sat; negacao=unsat
TOF_MODO_NUMERICO SEGUE [A, B, consulta]
DOIS_RW: premissas=sat; consulta=sat; negacao=unsat
DOIS_RW SEGUE [B, consulta]
PICO_RW: premissas=sat; consulta=sat; negacao=unsat
PICO_RW SEGUE [A, B, consulta]
DEGENERESCENCIA: premissas=sat; consulta=sat; negacao=unsat
DEGENERESCENCIA SEGUE [A, B, consulta]
DISTINCAO: premissas=sat; consulta=sat; negacao=unsat
DISTINCAO SEGUE [A, B, consulta]
RECUPERA_MOMENTO: premissas=sat; consulta=sat; negacao=unsat
RECUPERA_MOMENTO SEGUE [A, B, consulta]
EXCLUSIVIDADE_CONTRAEXEMPLO: premissas=sat; consulta=unsat; negacao=sat
EXCLUSIVIDADE_CONTRAEXEMPLO CONTRADIZ [A, B, consulta]
ESCALA_INVISIVEL: premissas=sat; consulta=sat; negacao=unsat
ESCALA_INVISIVEL SEGUE [A, B, consulta]
CALIBRACAO: premissas=sat; consulta=sat; negacao=unsat
CALIBRACAO SEGUE [A, B, consulta]
UNICIDADE: premissas=sat; consulta=sat; negacao=unsat
UNICIDADE SEGUE [A, B, consulta]
GANHO_INSTAVEL: premissas=sat; consulta=unsat; negacao=sat
GANHO_INSTAVEL CONTRADIZ [A, B, consulta]
FUNDO_KAPPA_SEGUE: premissas=sat; consulta=sat; negacao=unsat
FUNDO_KAPPA_SEGUE SEGUE [A, B, consulta]
FUNDO_CB_NAO_IDENTIFICAVEL_SEGUE: premissas=sat; consulta=sat; negacao=unsat
FUNDO_CB_NAO_IDENTIFICAVEL_SEGUE SEGUE [A, B, consulta]
FUNDO_UNICIDADE_KAPPA: premissas=sat; consulta=sat; negacao=unsat
FUNDO_UNICIDADE_KAPPA SEGUE [A, B, consulta]
BRANCO_FECHA: premissas=sat; consulta=sat; negacao=unsat
BRANCO_FECHA SEGUE [A, B, consulta]
REFERENCIA {"luz":299792458,"ee":1022,"hc":197.327,"R":1,"alpha":1}
MODO (1,0): epsilon=197.327 keV; soma=627.346 keV; Egamma=313.673 keV
MODO (0,1): epsilon=197.327 keV; soma=627.346 keV; Egamma=313.673 keV
MODO (1,1): epsilon=394.654 keV; soma=232.692 keV; Egamma=116.346 keV
TOF ilustrativo: v/c=0.7532304876035991; Delta_c/c=-0.24676951239640088
MAPEAMENTO interpretativo: Axioma4 -> kappa/R (parametros distintos); Axioma5 -> b; c -> concentracao LOCAL; T01-T03 -> observacao parcial; T09 -> custo temporal como investigacao; T10 -> emissao
DISTINCAO nao exclusiva: (1,1) coincide com (2,0) no ponto R²=alpha. Nenhuma assinatura experimental de corda demonstrada.
BOOK FINAL: 24/24 teoremas SEGUE/CONTRADIZ conforme esperado - código zero
SHA-256: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1
```

Stderr:
```text
(vazio)
```

SHA-256 conferido independentemente com hashlib: `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`.

O conjunto contém 21 consultas solicitadas e três verificações complementares: intervalo numérico de TOF, recuperação do caso de momento e contraexemplo à exclusividade de corda. DISTINCAO conserva o sentido restrito já provado (diferença em relação aos modos unitários); a afirmação contra toda torre pontual é refutada pelo contraexemplo.

Mapeamento interpretativo: Axioma 4 → κ ou R conforme o modelo (não κ/R como equação); Axioma 5 → b; c → concentração LOCAL; T01–T03 → observação parcial; T09 → investigação do custo temporal; T10 → emissão. Nenhuma dessas correspondências deriva a lei quantitativa dos axiomas.

Limpeza: nenhum temporário Python encontrado nas pastas 12/11 e 13/11. Foram localizados três arquivos anteriores desta sequência (corda, winding, calibração-b), todos preservados. Não foi recriado artificialmente um quarto arquivo ausente nem removidos ensaios A/B/CDEF ou relatórios de outras tarefas.
