# O multiverso: a lógica, e se é possível

**English:** [multiverso.en.md](multiverso.en.md)

Conferido em 10 de novembro de 2026 com o Z3 (`multiverso-z3.py`) e com a máquina (`multiverso-confere.js`). Para repetir:

```
python -I -X utf8 -B multiverso-z3.py
node multiverso-confere.js maquina-do-tubo.html
```

"Multiverso" não é uma teoria: são pelo menos quatro ideias diferentes, com lógicas diferentes. E "possível" tem três sentidos que não podem ser misturados: (1) não se contradiz; (2) cabe nas leis conhecidas; (3) existe de fato. A tabela separa os três.

## 1. Os quatro multiversos

| Nível | O que afirma | De onde vem | A lógica | Evidência | Veredito |
|---|---|---|---|---|---|
| 1. Além do horizonte | O espaço continua além dos 46 bilhões de anos-luz que vemos; se for infinito e parecido em toda parte, toda configuração finita se repete em algum lugar | Cosmologia padrão + espaço infinito | Gaveta de pombos: mais regiões do que estados possíveis obriga repetição (provado, M4). Precisa de espaço infinito e de um número finito de estados por região (a física quântica dá o finito) | A curvatura medida é zero dentro do erro (Planck 2018: Ω_k = 0,001 ± 0,002), compatível com infinito e também com finito e enorme. Por construção, nada além do horizonte pode ser visto | Não se contradiz: sim. Cabe nas leis: sim. Existe: indecidível; "infinito" não se mede |
| 2. Bolhas da inflação eterna | A inflação nunca para em toda parte; cada bolha que para vira um universo, possivelmente com constantes diferentes (a "paisagem" das cordas, com cerca de 10⁵⁰⁰ vácuos) | Alguns modelos de inflação; teoria de cordas | Tem um buraco: o problema da medida. Com infinitas bolhas, "a fração de universos como o nosso" depende da ordem em que se conta (M5: a mesma lista dá 1/2 ou 2/3). Sem escolher a medida, o modelo não prevê nada; com ela, prevê coisas estranhas (cérebros de Boltzmann, paradoxo da juventude) | Procurou-se a marca de colisões entre bolhas na radiação de fundo (Feeney e outros, 2011): nada significativo. Os 10⁵⁰⁰ vácuos são uma contagem de soluções de equações, não de mundos | Não se contradiz: só depois de escolher uma medida. Cabe nas leis: em alguns modelos. Existe: nenhuma evidência |
| 3. Everett (muitos mundos) | A mecânica quântica sem o colapso: o estado do todo só evolui pela equação de Schrödinger; uma medição não escolhe um resultado, ramifica; cada ramo vê um ("estado relativo", Everett 1957) | As próprias equações da mecânica quântica, menos um postulado | Consistente: é a lei conhecida com uma regra a menos. Escapa de Bell negando que cada medição tenha um resultado só (M2: ramos com pesos, sem sinal entre os lados, dão S = 2√2). Em aberto: por que os pesos dos ramos funcionam como probabilidades (regra de Born; Deutsch 1999 e Wallace 2012 derivam por teoria da decisão, contestado) | Faz as mesmas previsões que a mecânica quântica comum em todo experimento feito até hoje, então nenhum deles a confirma nem a derruba. Em princípio, desfazer uma medição distinguiria (Deutsch, 1985); superposições cada vez maiores foram feitas (moléculas de 2.000 átomos, 2019), nenhuma decisiva | Não se contradiz: sim. Cabe nas leis: é a lei. Existe: indecidível hoje; é interpretação |
| 4. Universo matemático | Toda estrutura matemática consistente existe fisicamente (Tegmark, 2008); parente do realismo modal de Lewis (1986): todo mundo possível é real | Filosofia | Não tem conteúdo que possa dar errado; o problema da medida volta inteiro (que estrutura é "mais provável"?); para fugir de Gödel, Tegmark restringe às estruturas computáveis | Nenhuma, por construção | Não é afirmação física. É posição filosófica, consistente e vazia de previsão |

Uma ressalva que vale para os quatro: "o que acontece é possível" não implica "tudo o que é possível acontece". O multiverso afirma a segunda frase; nada na primeira a sustenta. E "possível" não é "provável" enquanto não houver uma medida (M5).

## 2. A lógica, conferida

| Nº | Conferido | Resultado | O que quer dizer |
|---|---|---|---|
| M1 | Um mundo só, com um resultado por medição fixado antes e local | sem solução para S = 2√2 | É Bell: um mundo de valores prévios e locais não reproduz o que se mede |
| M2 | Muitos ramos com pesos, sem sinal entre os lados | existe (S = 2√2) | A saída de Everett é logicamente aberta: tira "um resultado só", mantém que um lado não sinaliza ao outro e que o todo é determinista |
| M3 | A mesma lógica dos ramos, pedindo S = 4 | existe | A lógica dos ramos aceita a "caixa PR" (Popescu e Rohrlich, 1994), que a natureza não faz. O limite real, 2√2 (Tsirelson, 1980), vem da estrutura da mecânica quântica, não de "haver muitos mundos". Ramificar remove a contradição; não prevê o número |
| M4 | 4 regiões, 3 estados cada | provado que duas repetem | O nível 1 é forçado se o espaço for infinito com estados finitos por região |
| M5 | Fração de pares entre os inteiros, em duas ordens de contagem | 0,500 e 0,667 | Numa coleção infinita, probabilidade não existe antes de se escolher a medida. Atinge os níveis 1, 2 e 4, e a regra de Born do nível 3 |

## 3. O Tubo e o multiverso

**Como está, o Tubo é uma história só.** O motor não tem acaso nem ramo: zero chamadas a qualquer fonte de aleatoriedade; duas rodadas com o mesmo estado inicial dão exatamente o mesmo (1.292 colisões, 351,4125 s). É Laplace, e é a A.10 do autor: os valores descem pelos mecanismos.

**O "testar todas as possibilidades" da A.6 é um multiverso em série.** Todas as possibilidades se realizam, uma depois da outra, numa história só, até esgotar o estoque. Na física isso tem nome: hipótese ergódica (Boltzmann), o sistema visita todos os seus estados com o tempo. Medido na máquina, com o estoque S11 de 180 possibilidades, em 30 voltas do relógio:

| Cenário | Alcançado |
|---|---|
| todos em repouso, sem perda | 18 de 180 (10 %) |
| todos em repouso, perda 50 % | 18 de 180 (10 %), com só 36 encontros |
| todos com força, perda 50 % | 18 de 180 (10 %) |
| metade com força, perda 50 % | 180 de 180 (100 %) |

Uma história só esgota o estoque apenas com força e perda juntas: a força repõe energia e a perda muda as razões entre velocidades (E9 em `solucoes.md`). Sozinha, a perda encolhe o conjunto visitado (é o que a dissipação faz: contrai o espaço de estados). O multiverso em série não é automático; precisa de motor.

**A estrutura Alpha e Omega é a de Everett.** Lado a lado:

| Autor (A.1) | Everett (1957) |
|---|---|
| Alpha conhece todos os valores e mecanismos; para Alpha não existe "será" | O estado do todo evolui de forma determinista; nada é escolhido |
| O fragmento só possui o seu valor, limitado ao que vê | Cada observador tem um "estado relativo": vê um ramo, não o todo |
| "De dentro do tubo é impossível saber" (A.6) | Nenhum ramo observa os outros; por isso o multiverso não se mede de dentro |

O paralelo é estrutural, não é evidência: a frase "de dentro é impossível" é exatamente o motivo pelo qual o multiverso é indecidível, não um sinal de que exista.

**O que a versão ramificada custaria ao Tubo:**

- O estoque não se esgota; realiza-se todo de uma vez. O cone não pode fechar "quando acabarem as possibilidades". Precisa de outra regra de fechamento (por exemplo, o relógio do motor B, D32: todos os ramos terminam no ápice em T_f).
- Cada encontro vira uma bifurcação. Com 1.319 encontros, seriam 2¹³¹⁹ ramos, se nenhum se juntasse; com um estoque finito (180), ramos iguais se fundem e o número de histórias distintas fica limitado. Logicamente cabe; a máquina teria de passar de uma história para um conjunto de histórias.
- "Colisão" deixaria de ser troca de velocidade e viraria o ponto onde a história se divide: uma regra nova, que o autor teria de dar.

**Bell obriga a escolher.** História única com valores prévios só sobrevive como superdeterminismo (D29). Ramificação sobrevive como Everett (D33). As duas são consistentes; nenhuma se testa de dentro. O que não sobrevive é o meio-termo: uma história só, local, com valores prévios por fragmento (M1).

## 4. Veredito

- **É possível?** Nos sentidos 1 e 2 (não se contradiz; cabe nas leis), sim para os níveis 1 e 3; o nível 2 só depois de resolver a medida; o nível 4 não é física.
- **É real?** Nenhum foi mostrado real, e a maioria não pode ser observada por construção. Nenhum experimento atual decide. Quem afirma que o multiverso existe está afirmando mais do que sabe; quem afirma que é impossível também (exceto no nível 2 sem medida, que hoje não prevê nada).
- **Para o Tubo:** hoje é um modelo de história única e determinista. Uma versão multiverso é logicamente possível, mas troca a regra de fechamento e a regra de colisão. É a decisão D33, e é do autor.
