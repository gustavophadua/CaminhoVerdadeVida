# 15/11/2026 — Todo 29 — Assimetria de ida e volta na sincronização

A parábola da torre motiva incluir o erro inicial da sincronização no orçamento de tempo. A Língua Secreta v10 do Claude estudou o intervalo entre recontagens a partir do Todo 28. Aqui a hipótese é que atrasos de ida e volta desiguais podem encurtar o intervalo mesmo sem alterar o tempo total de ida e volta. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

Sejam T₁,T₂,T₃,T₄ os quatro registros, em segundos, de envio na origem, recepção no destino, resposta no destino e recepção na origem. Sob deslocamento θ constante dos relógios durante a troca, x=T₂−T₁=θ+d_ida e y=T₄−T₃=d_volta−θ, com atrasos não negativos. A estimativa θ̂=(x−y)/2 tem erro (d_ida−d_volta)/2, enquanto a ida e volta líquida é x+y. O processamento no destino é excluído por usar T₂ e T₃. Essa é a estrutura da estimativa de quatro registros da RFC 5905. [RFC 5905, §8](https://www.rfc-editor.org/rfc/rfc5905.html#section-8).

Com x=0,62 ms e y=0,38 ms, a estimativa é 0,12 ms em todos os casos. O mundo com atrasos iguais de 0,50 ms tem θ=0,12 ms. O mundo com atrasos de 0,62 e 0,38 ms tem θ=0. O mundo com atrasos de 0,38 e 0,62 ms tem θ=0,24 ms. A ida e volta líquida é 1 ms nos três casos. O teste de igualdade do deslocamento real com a estimativa fica EM ABERTO. Mesmo muitas trocas idênticas não distinguem esses casos sem uma premissa adicional sobre os atrasos.

Retomo a folga de 0,42 ms, as taxas de 0,04 e 0,02 ms por segundo e os pisos de 0,08 e 0,10 ms do Todo 28. Nesta variante, a assimetria é limitada por 0,24 ms e afeta adicionalmente apenas o limite H, por uma conversão entre relógios. O limite J usa a base local, sem essa mesma troca assimétrica. Admito que os pisos anteriores descrevem outras fontes de erro. A nova guarda de H é 0,20+0,04t ms, e a de J é 0,10+0,02t ms, onde t≥0 é a idade em segundos no último registro. A soma é 0,30+0,06t ms e cabe na folga quando t≤2 s. Em 1 s a antecedência pode estar entre 11,24 e 11,30 ms. Em 2 s resta 11,28 ms. Em 3 s o mínimo de 11,32 ms supera o máximo de 11,26 ms. Se a assimetria também afetar J, será necessário refazer a guarda de J. São previsões condicionais de um cenário sintético, sem medição física.

Uma mudança comum de origem dos relógios preserva x e y. O modelo usa registros e atrasos, sem identidade pessoal. T02 e T03 contextualizam informação parcial e T09 o orçamento. T01, T04–T08 e T10–T13 ficam fora do modelo. Próximo teste: comparar a troca de duas vias com uma referência independente capaz de limitar separadamente o atraso de cada sentido.

## Verificação

Executei Cosmos e Z3 com JSON via stdin para `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e constantes numéricas de aridade zero. Nas fórmulas as grandezas temporais estão em segundos. Em VIES_ASSIMETRICO e MESMO_REGISTRO, t representa θ, i a ida e v a volta. Em JANELA, t representa a idade da calibração. O último campo é o código de saída e o anterior registra as premissas, sua conjunção com a tese e sua conjunção com a negação.

```json
[
["VIES_ASSIMETRICO",["x = t + i","y = v − t","2 × e = x − y"],"2 × (e − t) = i − v","SEGUE",["sat","sat","unsat"],0],
["MESMO_REGISTRO",["x = 62 / 100000","y = 38 / 100000","x = t + i","y = v − t","i ≥ 0","v ≥ 0","i − v ≤ 24 / 100000","v − i ≤ 24 / 100000"],"t = 12 / 100000","EM ABERTO",["sat","sat","sat"],0],
["JANELA",["t ≥ 0","e = 2 / 10000 + t / 25000","f = 1 / 10000 + t / 50000"],"(e + f ≤ 21 / 50000) ⟺ (t ≤ 2)","SEGUE",["sat","sat","unsat"],0]
]
```

Entradas conferidas nos bytes. Todo 28 SHA-256 `cb3be8c15a5c445e443063789b6e4a381cc8c3b8fcbc4de569cbd6101e5a3130`. Língua Secreta v10 do Claude SHA-256 `00db2a623d7b65adf5524a92dda833095892d7c03623f517d934d04035d1c973`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `27bc0692d4e698d27d79d960e4c043432ce62524`, com verificador aprovado.
