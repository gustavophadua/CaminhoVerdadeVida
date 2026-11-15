# 15/11/2026 — Todo 25 — Janela de aquisição e processamento

A parábola da torre motiva calcular a folga necessária antes de começar a etapa seguinte. O Todo 24 limitou a idade da referência, e a Língua Secreta v6 do Claude aplicou essa distinção ao fundo de uma medida. Este teste acrescenta a incerteza de sincronização e o prazo de entrega. A ideia de completar o processamento antes de um prazo fixo é estudada por Liu e Layland. Aqui há apenas uma decisão e um limite assumido para o tempo de processamento, sem aplicar o teorema de escalonamento de múltiplas tarefas. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Liu e Layland, 1973](https://www.cis.upenn.edu/~lee/07cis505/Lec/liu73scheduling.pdf).

No modelo sintético do Todo 24, a reserva é 4 J, o prazo T=2,5 s e a condição térmica em T é θ(T)≤0,8 K. Planeje a última aquisição para T−a, com a em segundos. As duas amostras do sinal preservam a separação de 0,5 s. O instante físico final t pode diferir do programado em até j segundos, por um deslocamento comum das duas aquisições. Depois de t, o tempo restante para coletar os dados, calcular e disponibilizar a saída é limitado por p segundos. Para entrega garantida, T−a+j+p≤T, ou a≥j+p.

Considere estimativa corrigida de 0,796313 K e erro de base de até 2,35 mK. Essa guarda de base deve valer também na janela antecipada. A idade lida da referência é limitada por 10 ms e tem incerteza de 2 ms, logo a idade física é ≤12 ms. Use |b′|≤L=0,020 K/s e diferença entre canais κ≤0,2 mK. A parcela adicional do Todo 24 é 1,4(L·0,012+κ)=0,616 mK. Para transferir a guarda de t para T, suponha |θ′|≤S=0,05 K/s entre aquisição e prazo. Como p≥0 e a≥p+j, t≤T e T−t≤a+j. Logo o limite superior sintético em T é

    U = 0,799279 K + S(a+j).

S é uma hipótese local do cenário, não uma afirmação sobre a trajetória nominal de todos os Todos. O critério vale apenas se os limites de idade, processamento, deriva e taxa térmica forem sustentados pelo aparelho na janela de uso.

Com j=1 ms e p=8 ms, a entrega requer a≥9 ms. A condição térmica U≤0,8 K exige a≤13,42 ms. Em a=10 ms, a entrega ocorre até 2,499 s e U=0,799829 K. Com p=15 ms, é preciso a≥16 ms. Nesse caso U≥0,800129 K. A combinação de guardas não garante a aprovação no prazo. A falha é da certificação para estes limites e para a estimativa escolhida. A temperatura real pode ficar abaixo do teto.

Adicionar uma origem comum de tempo preserva os intervalos e a janela. Um deslocamento comum da origem térmica cancela no excesso. O modelo depende de grandezas físicas, não da identidade de quem mede. T02–T03 contextualizam informação parcial e T09 a reserva. A dinâmica térmica não usa axiomas do Tubo como premissas. Próximo teste: obter guardas conjuntas por calibração de latência e de inclinação térmica.

## Verificação

Executei o Cosmos e Z3 com JSON via stdin para `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e declare os identificadores constantes numéricas de aridade zero. Os estados são das premissas, conjunção com tese e conjunção com negação. O último valor é o código de saída.

```json
[
["JANELA",["a ≥ 9 / 1000","a ≤ 671 / 50000","j = 1 / 1000","p = 8 / 1000","u = 799279 / 1000000 + (a + j) / 20"],"a ≥ j + p ∧ u ≤ 4 / 5","SEGUE",["sat","sat","unsat"],0],
["SEM_JANELA",["a ≥ 16 / 1000","u = 799279 / 1000000 + (a + 1 / 1000) / 20"],"u ≤ 4 / 5","CONTRADIZ",["sat","unsat","sat"],0],
["INCERTEZA_RELOGIO",["e ≥ 0","real ≤ lida + e","lida ≤ limite − e"],"real ≤ limite","SEGUE",["sat","sat","unsat"],0]
]
```

Entradas conferidas pelo SHA-256. Todo 24 `1c92b816e51f245ce1acf26b63a52f9a742797b74398e5ccd155ec913c392abc`. Língua Secreta v6 do Claude `ec887e53c5e8be52179c09e479d21e6357bd7cce5a552404e24b6857056e4a9a`. BOOK `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `8c0ed4322006a8d13d191e7a8a51accd79f002a9`, com verificador aprovado.
