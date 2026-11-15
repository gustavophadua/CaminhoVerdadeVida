# 15/11/2026 — Todo 30 — Restringir os atrasos em cada sentido

A parábola da torre motiva dimensionar a folga com uma referência independente. A Língua Secreta v11 do Claude mostra que o próprio degrau pode induzir uma troca que se queria apenas registrar. A hipótese correspondente aqui é que referências unidirecionais recuperam folga se seus limites valerem para o mesmo tráfego e regime da troca. Uma sonda que muda a fila ou escolhe rota distinta pode invalidar essa hipótese. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [RFC 7679, atraso unidirecional e incerteza](https://www.rfc-editor.org/rfc/rfc7679.html).

Retomo x=T₂−T₁=θ+i e y=T₄−T₃=v−θ, com deslocamento θ constante durante a troca, ida i≥0 e volta v≥0. Se uma calibração externa limita i∈[i_min,i_max] e v∈[v_min,v_max], a faixa exata sob essas premissas é

    θ ∈ [x−i_max, x−i_min] ∩ [v_min−y, v_max−y].

Cada ponto da interseção gera i=x−θ e v=y+θ admissíveis. Interseção vazia sinaliza que os dados e as guardas são incompatíveis. Os limites podem vir de medições com uma base comum independente, incluindo incerteza de sincronização. Reutilizar os mesmos relógios ainda desconhecidos para declarar a ida ou a volta conhecidas tornaria a inferência circular.

No cenário sintético do Todo 29, x=0,62 ms e y=0,38 ms. Assuma i entre 0,54 e 0,60 ms e v entre 0,43 e 0,45 ms. Só a ida admite θ de 0,02 a 0,08 ms. A volta reduz a interseção para 0,05 a 0,07 ms. O ponto médio é 0,06 ms e o erro absoluto máximo em torno dele é 0,01 ms. A afirmação de que θ é exatamente 0,06 ms fica EM ABERTO. Em particular, θ=0,05 e θ=0,07 ms satisfazem os mesmos registros e as guardas de cada sentido.

Mantenho a folga de 0,42 ms, pisos de 0,08 e 0,10 ms e taxas de 0,04 e 0,02 ms/s do Todo 28. Substituo a parcela de assimetria de 0,12 ms do Todo 29 pela guarda residual de 0,01 ms, aplicada apenas a H. Pressuponho que os limites iniciais de ida e volta cubram a troca e que a guarda residual não esteja incluída nos outros pisos. A soma dos erros é 0,19+0,06t ms, com a idade t em segundos. A condição de folga dá t≤23/6 s, aproximadamente 3,833 s. Em t=3 s a janela de antecipação é [11,21;11,26] ms. O limite melhora os 2 s do Todo 29 sob as novas premissas. Não houve medição física.

Transladar ambos os relógios pela mesma constante conserva as diferenças. T02 e T03 contextualizam informação parcial e T09 o orçamento. Os demais T01–T13 ficam fora do modelo de sincronização, e nenhuma identidade pessoal é variável. Próximo teste: verificar se a guarda unidirecional se mantém sob mudança de carga e rota.

## Verificação

Executei Cosmos e Z3 com JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e constantes numéricas de aridade zero. As grandezas são expressas em segundos. Nas duas primeiras consultas t representa θ. Na última representa a idade. Os estados são das premissas, sua conjunção com tese e sua conjunção com a negação. O último campo é o código.

```json
[
["INTERSECAO",["x = 62 / 100000","y = 38 / 100000","x = t + i","y = v − t","i ≥ 54 / 100000","i ≤ 60 / 100000","v ≥ 43 / 100000","v ≤ 45 / 100000"],"t ≥ 5 / 100000 ∧ t ≤ 7 / 100000","SEGUE",["sat","sat","unsat"],0],
["PONTO_EXATO",["t ≥ 5 / 100000","t ≤ 7 / 100000"],"t = 6 / 100000","EM ABERTO",["sat","sat","sat"],0],
["IDADE",["t ≥ 0","e = 19 / 100000 + 3 × t / 50000"],"(e ≤ 21 / 50000) ⟺ (6 × t ≤ 23)","SEGUE",["sat","sat","unsat"],0]
]
```

Entradas conferidas nos bytes. Todo 29 SHA-256 `adaa7713fa980bdd887dae6310b842b768a467c9bf2f39f8cac2fa35eb85024d`. Língua Secreta v11 do Claude SHA-256 `a18550cd38712c17028d0300349e3df3636de669b9ea3e3e9221c03a56978510`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `355d169f208c00cd2c1becbb109d2c8a1020f5d1`, com verificador aprovado.
