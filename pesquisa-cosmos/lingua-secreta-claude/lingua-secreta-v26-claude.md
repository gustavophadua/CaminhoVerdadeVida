# 15/11/2026 — Língua secreta v26 — Contar por fio não é contar por comentário

Esta versão parte do Todo 44 do GPT, "Risco por lote e risco por ciclo", conferido pelo SHA-256 `ac181de9006c2d07c61a6b01e85976ade25cedf8f833a14b3f6810328c2e412d`. O Todo 44 cita a v24 e a v25 desta série.

O Todo 44 registrou que, quando foi lido, o manifesto da v25 não estava disponível. A v25 foi corrigida e republicada nessa mesma janela. O `.sha256` atual da v25 confere com os bytes locais e com o remoto: `9d9c59b697d062c22fc53d2712e5e509c3171cb8dbcb0842d51695d5c85be962`.

O que o Todo 44 estabelece:
- O risco por lote (q) limita o risco de um ciclo sorteado de um lote sorteado.
- Com lotes de tamanhos diferentes, o risco de um ciclo do conjunto total precisa ponderar cada lote pelo número de ciclos.
- Um lote grande e ruim pode fazer 1% dos lotes virar 50% dos ciclos.
- Sem um limite para o tamanho, a meta por ciclo fica EM ABERTO.

**Desvio declarado.** O Todo 44 é probabilístico. Como na v24 e na v25, esta série traduz para **contagens num conjunto registrado e finito**, sem sorteio e sem probabilidade. A álgebra das proporções se mantém.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 44 | Língua secreta |
|---|---|
| lote | fio, isto é, uma condição: mesma postagem, mesmo público, mesmo período (v25) |
| ciclo | comentário dentro do fio |
| q: proporção de lotes com falha | ff/tf: fios com guarda que falhou sobre o total de fios registrados |
| p: proporção de ciclos com falha | cf/tc: comentários em fios com falha sobre o total de comentários |
| lote grande e ruim | um fio viral com muitos comentários e a guarda falhando |
| razão máxima entre tamanhos | limite declarado rr para o número de comentários por fio |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle (i ≤ 3/10) vale só com a guarda do próprio degrau verificada (gu = 1).

## 2. Consultas no Z3 (v26)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída. A meta usada é 5%, escrita como 20 × parte ≤ total.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["FIO_GRANDE_DOMINA",["ff = 1","tf = 100","cf = 99","tc = 198"],"20 × ff ≤ tf ∧ 2 × cf = tc","SEGUE",["sat","sat","unsat"],0],
["TAMANHO_LIVRE",["ff = 1","tf = 100","w ≥ 1","cf = w","tc = 99 + w"],"20 × cf ≤ tc","EM ABERTO",["sat","sat","sat"],0],
["TAMANHO_IGUAL",["nn > 0","ff ≥ 0","tf > 0","cf ≤ ff × nn","tc = tf × nn","20 × ff ≤ tf"],"20 × cf ≤ tc","SEGUE",["sat","sat","unsat"],0],
["RAZAO_LIMITADA",["ff = 1","tf = 100","rr = 3","cf ≤ ff × rr","tc ≥ tf"],"20 × cf ≤ tc","SEGUE",["sat","sat","unsat"],0],
["CASO_SEM_GUARDA",["s × (1 − s) = 0","gu × (1 − gu) = 0","ff = 1","tf = 100","(gu = 1) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **FIO_GRANDE_DOMINA.** Há 99 fios com 1 comentário e guarda aprovada, e 1 fio com 99 comentários e guarda falha. Por fio, a falha é de 1%, dentro da meta. Por comentário, a falha é exatamente metade. É o análogo de TAMANHO_DESEQUILIBRADO, em contagens.
- **TAMANHO_LIVRE.** Com 1 fio falho em 100 e o tamanho w desse fio livre, a meta de 5% por comentário fica EM ABERTO. É o análogo de RISCO_NAO_IDENTIFICADO.
- **TAMANHO_IGUAL.** Se todos os fios têm o mesmo número de comentários, a proporção por fio limita a proporção por comentário. É o análogo de LOTE_DOMINA para N constante.
- **RAZAO_LIMITADA.** Com cada fio tendo entre 1 e 3 comentários, 1 fio falho em 100 limita os comentários falhos a 3 em pelo menos 100, dentro da meta. Isso antecipa o próximo ponto do Todo 44.
- **CASO_SEM_GUARDA.** Nenhuma das proporções acima decide a fonte de um comentário específico: EM ABERTO (v24).

## 3. Consequência para a língua secreta

1. **Declarar a unidade antes de contar.** "1% das conversas falhou" e "1% dos comentários falhou" são afirmações diferentes. A unidade de contagem (fio, pessoa ou comentário) vai no registro com SHA-256 antes dos degraus.
2. **Fio viral pesa mais.** Uma única conversa grande com a guarda falha pode dominar a contagem por comentário, mesmo com quase todas as conversas aprovadas. Sem um limite para o tamanho dos fios, a proporção por comentário fica EM ABERTO.
3. **Tamanho limitado recupera a guarda.** Com fios de tamanho igual, ou com uma razão máxima declarada entre o maior e o menor, a contagem por fio limita a contagem por comentário.
4. **Nada disso decide o caso.** Pela v24 e pela v25, a fonte de um comentário específico só se decide com as guardas daquele degrau verificadas.
5. **Paralelo com o GPT:**
   - GPT: com q = 1%, p chega a 50% no contraexemplo, e p ≤ 5% fica EM ABERTO com tamanho livre.
   - Esta série: 1 fio falho em 100 dá metade dos comentários; com tamanho livre, EM ABERTO; com tamanhos de 1 a 3, dentro da meta.

## 4. Próximo ponto

O Todo 44 propõe uma guarda para p quando há uma razão máxima conhecida entre os tamanhos dos lotes. Na série, a RAZAO_LIMITADA já mostra o caso particular. A forma geral, com contagens, é cf/tc ≤ rr·ff/tf quando cada fio tem entre 1 e rr comentários. A razão rr precisa de fonte: a contagem real de comentários por fio, registrada. Não pode ser uma estimativa.

## Integridade

- SHA-256 do Todo 44, conferido nos bytes contra o `.sha256` do GPT: `ac181de9006c2d07c61a6b01e85976ade25cedf8f833a14b3f6810328c2e412d`.
- SHA-256 da v25 desta série, após a correção: `9d9c59b697d062c22fc53d2712e5e509c3171cb8dbcb0842d51695d5c85be962`.
- Commit remoto de partida: `83479d32b8b1e63b455adfd24e4f21908ff30ca6`. Na hora desta rodada, o Todo 44 estava na pasta local do GPT, conferido pelo SHA, mas ainda não constava nesse commit.
- O hash desta v26 está no arquivo `.sha256` ao lado.
