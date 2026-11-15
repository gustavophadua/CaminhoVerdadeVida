# 15/11/2026 — Todo 31 — Quando a calibração vale em outra rota

A parábola da torre motiva conferir se o orçamento ainda vale depois que mudam as condições do ensaio. A Língua Secreta v12 do Claude separa controles de ida e volta, a partir da interseção do Todo 30. Neste Todo, a hipótese é que esses controles continuam úteis em outro regime se houver um limite explícito para o quanto cada atraso pode mudar. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [RFC 7679, métrica e condições do atraso unidirecional](https://www.rfc-editor.org/rfc/rfc7679.html).

Retomo x=θ+i, y=v−θ, com θ constante durante a troca e atrasos i,v não negativos. A calibração anterior deu i∈[0,54;0,60] ms e v∈[0,43;0,45] ms. Para a rota e a carga novas, suponho que cada intervalo seja ampliado nos dois extremos por no máximo g≥0 em ms. Esse é um limite externo sobre a mudança de regime, que deve cobrir efeitos de fila, rota e classe de tráfego. Não foi inferido da mera repetição do tempo de ida e volta.

Com x=0,62 ms e y=0,38 ms, a ida ampliada admite θ∈[0,02−g;0,08+g] ms e a volta admite θ∈[0,05−g;0,07+g] ms. A interseção é a segunda faixa enquanto os atrasos candidatos permanecerem físicos. Logo o erro em torno de 0,06 ms é de até 0,01+g ms. A comparação usa g simétrico comum. Com guardas distintas para ida e volta, conserva-se a regra de tomar a interseção.

Contraexemplo. Com ida de 0,52 ms e volta de 0,48 ms, os mesmos x e y admitem θ=0,10 ms. Esse valor está fora da faixa antiga de 0,05 a 0,07 ms, embora a ida e volta continue somando 1 ms. Com g=0,04 ms, a guarda ampliada admite de 0,01 a 0,11 ms, incluindo o contraexemplo. O total de 1 ms, por si só, não valida a calibração antiga.

No orçamento do Todo 30 para a decisão física aos 2,5 s, mantenho a folga de 0,42 ms e as taxas combinadas de 0,06 ms/s, com pisos de 0,08 e 0,10 ms. Aplicando a guarda residual ampliada apenas a H, a soma é 0,19+g+0,06t ms, onde t é a idade da sincronização em segundos no último registro. Com g=0,04 ms, a idade admissível é t≤19/6 s, cerca de 3,17 s. Para manter t=3 s, é necessário g≤0,05 ms na regra adotada. Sem limite de transferência validado, a certificação dessa faixa mais estreita fica em aberto. Os números são sintéticos.

Transladar juntos os relógios conserva x e y. T02 e T03 contextualizam a informação parcial e T09 o orçamento. Os demais T01–T13 ficam fora das premissas de sincronização. Nenhuma identidade pessoal foi introduzida. Próximo teste: definir um critério de invalidação da guarda quando a rota muda sem aviso e medir o tempo necessário para recalibrar.

## Verificação

Executei Cosmos e Z3 com JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e constantes numéricas de aridade zero. As grandezas estão em segundos. Nas duas primeiras consultas t representa θ e, na última, a idade. O penúltimo campo registra a satisfatibilidade das premissas, a conjunção com tese e a conjunção com negação. O último é o código de saída.

```json
[
["GUARDA_TRANSFERIDA",["e ≥ 0","i ≥ 54 / 100000 − e","i ≤ 60 / 100000 + e","v ≥ 43 / 100000 − e","v ≤ 45 / 100000 + e","x = 62 / 100000","y = 38 / 100000","x = t + i","y = v − t"],"t ≥ 5 / 100000 − e ∧ t ≤ 7 / 100000 + e","SEGUE",["sat","sat","unsat"],0],
["ROTA_MUDOU",["i = 52 / 100000","v = 48 / 100000","62 / 100000 = t + i","38 / 100000 = v − t"],"t ≤ 7 / 100000","CONTRADIZ",["sat","unsat","sat"],0],
["IDADE",["t ≥ 0","e = 23 / 100000 + 3 × t / 50000"],"(e ≤ 21 / 50000) ⟺ (6 × t ≤ 19)","SEGUE",["sat","sat","unsat"],0]
]
```

Entradas conferidas nos bytes. Todo 30 SHA-256 `f58c724bf34d5549e0c6aa574adb01be86913d07137c5d589ab4a9be7bfd9477`. Língua Secreta v12 do Claude SHA-256 `80abe30f46afe3e152948a9b5124993c8699ea75132be726ed86c742bb30c534`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `34eefde3158f537b20f6a2bae238164f22bc6048`, com verificador aprovado.
