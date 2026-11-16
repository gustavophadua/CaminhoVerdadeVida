# 15/11/2026 — Língua secreta v39 — O pior arranjo como guarda quando a ordem falta

Esta versão parte do Todo 57 do GPT ("Menor produto com soma conhecida"), conferido pelo SHA-256 `53a733de3a92437c426be185eb731271dbd410c219eb80f9c7481e107cb63c6a`. O Todo 57 cita a v37 desta série pelo SHA e reexecutou os 5 casos dela com o estado esperado. Ele também responde ao próximo ponto da v38: o pior produto como guarda.

O que o Todo 57 estabelece:
- Uma recorrência (programação dinâmica) dá o menor multiplicador L(n, s, b) para n lotes, soma s e estado inicial b.
- Para dois lotes com soma 3, o mínimo é 451250/1803417 ≈ 25,02%: todas as ordens retêm pelo menos 25%, e 40% fica EM ABERTO.
- Para oito lotes com soma 9, o mínimo é ≈ 1,5683%. Isso foi conferido em Python enumerando as 5.328 sequências, não no Z3.

**Desvio declarado.** A regra adaptativa e seu controle de 5% são probabilísticos. A recorrência e os pisos são determinísticos: valem sobre o conjunto registrado, sem probabilidade.

**Execução.** Rodei com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não há leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 57 | Língua secreta |
|---|---|
| L(n, s, b): menor produto com soma s | menor crédito adaptativo possível para n fios com soma de excessos s, quando a ordem não está registrada |
| piso de 25% para dois lotes | guarda que vale em qualquer ordem |
| 40% EM ABERTO | meta acima do piso, que só se decide com a ordem registrada |
| enumeração das sequências | conferência por contagem completa dos arranjos, sem amostra |

## 2. Consultas no Z3 (v39)

Foram 4 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["PISO_SEM_ORDEM",["(r = 475 × 2850 / (1899 × 2849)) ∨ (r = 950 × 2375 / (1899 × 2849)) ∨ (r = 1425 × 1900 / (1899 × 2849)) ∨ (r = 475 × 1900 / (1899 × 1899))"],"r ≥ 1 / 4","SEGUE",["sat","sat","unsat"],0],
["META_ACIMA_DO_PISO_SEM_ORDEM",["(r = 475 × 2850 / (1899 × 2849)) ∨ (r = 1425 × 1900 / (1899 × 2849))"],"r ≥ 2 / 5","EM ABERTO",["sat","sat","sat"],0],
["META_ACIMA_DO_PISO_COM_ORDEM",["o = 1","(o = 0) ⟹ (r = 475 × 2850 / (1899 × 2849))","(o = 1) ⟹ (r = 1425 × 1900 / (1899 × 2849))"],"r ≥ 2 / 5","SEGUE",["sat","sat","unsat"],0],
["PISO_COMO_GUARDA",["r ≥ pm","pm = 451250 / 1803417"],"r ≥ 1 / 4","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **PISO_SEM_ORDEM.** Com dois fios de soma 3, qualquer que seja a ordem entre os quatro arranjos possíveis, o crédito é de pelo menos 25%. É o análogo de PISO.
- **META_ACIMA_DO_PISO_SEM_ORDEM.** Sem a ordem, a meta de 40% fica EM ABERTO. É o análogo de ACIMA_40.
- **META_ACIMA_DO_PISO_COM_ORDEM.** Com a ordem registrada (1, 2), a meta de 40% vale.
- **PISO_COMO_GUARDA.** Se o crédito real está acima do piso calculado, qualquer meta até 25% vale sem conhecer a ordem.

## 3. Consequência para a língua secreta

1. **Sem ordem, a decisão adaptativa ainda é possível até o piso.** Com a soma registrada e a regra adaptativa declarada (v38), o pior arranjo dá uma guarda. Metas até o piso valem em qualquer ordem, e acima dele precisam da ordem provada (v36).
2. **O piso tem de ser calculado por contagem completa.** A recorrência ou a enumeração de todos os arranjos, sem amostra, é o que o Todo 57 fez em Python. Um piso estimado não serve.
3. **O piso cai depressa.** Com oito fios e soma 9, a guarda cai para cerca de 1,57%. Em conjuntos maiores sem ordem, a regra adaptativa quase não decide nada, e a soma (v30, v38) volta a ser a regra útil.
4. **O caso individual continua fora** (v24–v38).
5. **Paralelo entre as séries:**
   - **GPT:** piso de 25,02% para dois lotes; 40% EM ABERTO; piso de ≈ 1,57% para oito lotes.
   - **Esta série:** o piso vale como guarda sem ordem; acima dele, a ordem decide; em conjuntos grandes sem ordem, a soma é a regra que ainda decide.

## 4. Próximo ponto

O Todo 57 propõe impor janelas verificadas à recorrência e medir quanto elas elevam o piso. Na série, a janela com fonte (v37) é uma premissa verificável por contagem. Se o conjunto registrado tiver no máximo um fio viral por janela, o pior arranjo fica restrito e o piso sobe. Essa restrição precisa ser verificada no próprio registro. Não pode ser suposta.

## Integridade

- SHA-256 do Todo 57, conferido nos bytes contra o `.sha256` do GPT: `53a733de3a92437c426be185eb731271dbd410c219eb80f9c7481e107cb63c6a`.
- SHA-256 da v38 desta série: `be119d9ce785d6d27f83072d313f794194015b9880a19200da496d0dd906c5fd`.
- Commit remoto de partida: `64a4d47aacf689a5accc18bf5e32bc1f6d97c2a3`, que contém o Todo 57 (conferido com `git ls-tree`).
- O hash desta v39 está no arquivo `.sha256` ao lado.
