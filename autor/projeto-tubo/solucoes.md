# As soluções que a matemática e a física dão

Para cada equação sem solução de `equacoes.md`, a própria fórmula diz onde está o nó. Aqui vai o que a matemática e a física estabelecidas fazem nesse nó, conferido no Z3 (`solucoes-z3.py`) e, quando é lei que a máquina pode obedecer, medido na máquina (`fisica-confere.js`). Montado em 10 de novembro de 2026.

Nada daqui é regra do modelo até o autor decidir. A síntese das decisões está no fim (motor B, D32).

## E1. O relógio: 180° e 90° são as duas coisas certas, em papéis diferentes

- **A fórmula dizia:** cos θ + cos(θ + φ) = 0 em todo instante só tem solução com φ = 180°.
- **A solução:** a 180° é interferência destrutiva: as duas ondas se anulam (provado, E1a). A 90° a soma não anula: vira uma onda só, de amplitude √2, girada 45° (provado, E1b). Mas cos θ e sen θ são as duas coordenadas de um mesmo ponto dando a volta no círculo: e^{iθ} = cos θ + i sen θ (Euler, 1748). O instinto de "eixo vertical e horizontal" era isto: os dois eixos de uma rotação só, que é o relógio em si, a "sensação de espaço".
- **No modelo:** 180° é o DNA (a anulação, a linha de Alpha). 90° é o mostrador do relógio (os dois eixos do mesmo giro). As duas leituras ficam, cada uma no seu lugar. Não custa nada.

## E2. Fibonacci: existe, mas só para Alpha e só num Tubo que fecha por fator fixo

- **A fórmula dizia:** a espiral vista de dentro (perspectiva, r = Rm ÷ (1 + τ/τ₀)) nunca cresce pelo mesmo fator a cada volta.
- **A solução:** uma hélice enrolada num tubo cujo raio cai por fator fixo a cada volta (R = R₀ · e^{−z/λ}), vista de longe ao longo do eixo (sem perspectiva, a vista de Alpha), projeta exatamente uma espiral logarítmica r = R₀ · e^{−bθ} (Descartes, 1638; Bernoulli). A áurea é o caso em que o raio cai por φ⁴ ≈ 6,85 a cada volta (conferido: EXISTE). Quem está dentro nunca a vê, como o autor disse em A.5 e A.11.
- **O custo:** raio que cai por fator fixo nunca chega a zero: o Tubo fecharia só no limite, sem instante final. E briga com o cone reto da imagem 3 (E12). O autor já fechou D9 sem Fibonacci; isto é só a conta do preço, caso reabra.

## E3. A sobra de matéria: a perda não é simétrica

- **A fórmula dizia:** níveis iguais no início e aniquilação aos pares deixam M − A = 0 para sempre.
- **A solução:** Sakharov (1967) listou as três condições para sobrar matéria: violação do número bariônico, violação de C e CP, e saída do equilíbrio térmico. A violação de CP foi medida (Cronin e Fitch, 1964). A sobra observada é de cerca de 6 partes em 10¹⁰ (razão bárions ÷ fótons). Na fórmula: x_A − x_M = ε (conferido: EXISTE).
- **No modelo:** as duas fitas do DNA não se anulam exatamente: a linha de Alpha tem uma inclinação de 1 parte em cerca de 10⁹. O "nenhuma fica completa" do autor vira literal.
- **Aviso:** a física não fechou esta conta. A violação de CP do Modelo Padrão é pequena demais para a sobra medida; é problema em aberto. Aqui o modelo encontra uma pergunta da física, não uma resposta.

## E4. O valor total é da soma, nunca de um fragmento

- **A fórmula dizia:** valor(f) ≤ visto(f) < Todo não deixa nenhum fragmento ter valor igual ao Todo.
- **A solução:** Σ valor(fᵢ) = Todo tem solução com cada um vendo só a sua parte (conferido: EXISTE). Na física é lei: no emaranhamento, o todo pode ter estado completo enquanto cada parte, sozinha, tem informação a menos (entropia de von Neumann da parte maior que a do todo); na relatividade, cada um só sabe o que está no seu cone de luz passado.
- **No modelo:** é a A.6 do autor: o Todo se completa quando todos os fragmentos testam todas as possibilidades. O "fragmento de valor total" de A.9 passa a ser o que mais se alinha com o Todo, não o que o contém.

## E5 e E6. A velocidade no anel que encolhe: Newton ou "não nota", nunca os dois

- **A fórmula dizia:** com v fixo, n = v · T ÷ P sobe quando P encolhe (E5); com momento angular, v fixo é impossível (E6).
- **A solução de Newton:** m · v · R se conserva, logo v₁ = v₀ · R₀ ÷ R₁: o fragmento acelera quando o Tubo aperta (provado, E6a), e as voltas por volta do relógio sobem com (R₀ ÷ R₁)² (provado, E6b). É a compressão adiabática: apertar um gás o esquenta. Na cosmologia, as velocidades próprias escalam com 1 ÷ a e a temperatura da radiação de fundo também: um universo que contrai esquenta. O fragmento nota, mas pelo calor (página 3 do caderno: "esquenta, mais choques"), não por enxergar o Todo (a imagem 4 continua valendo).
- **A solução de "não nota":** v ∝ R (conferido: EXISTE). É invariância de escala: só vale para o que não tem escala própria, isto é, sem massa (é o que Penrose usa na cosmologia cíclica conforme: partículas sem massa não sentem o tamanho do universo). Os fragmentos da máquina têm massa (m = 1 kg, S5); as colisões dependem dela.
- **As duas juntas:** sem solução (provado, D31). O autor escolhe: fragmentos com massa, que notam pelo calor, ou sem massa, que não notam e não colidem como hoje.
- **O custo de Newton:** a energia de movimento cresce com 1 ÷ R² quando o Tubo aperta; esse trabalho vem do próprio aperto. A equação (1) de `equacoes.md` ganha um termo: o Tubo trabalha sobre os fragmentos.

## E7 e E8. A perda é o calor; sem ela nada termina

- **A fórmula dizia:** sem força o Tubo não fecha (E7); sem perda não fecha (E8).
- **A solução:** a regra S5 é, termo a termo, a colisão inelástica da física: calor Q = ½ · μ · (1 − e²) · (Δv)², com μ a massa reduzida; para massas iguais, μ = m ÷ 2 e Q = (m ÷ 4)(1 − e²)(Δv)² (provado, E8a). A "perda" é 1 − e², com e o coeficiente de restituição. Sem dissipação, um sistema conservativo e limitado nunca termina: volta tão perto do começo quanto se queira, infinitas vezes (recorrência de Poincaré). Com perda > 0 o gasto chega a 99 % e o Tubo fecha (conferido, E8b). Repouso sem força é equilíbrio: sem energia livre, nada acontece.
- **No modelo:** D15 ganha resposta da física: a perda tem de ser maior que zero; o valor continua sendo do autor. Q é o que "vira luz" (D18) poderia ser.

## E9. Os pontos de encontro: o denominador decide

- **A fórmula dizia:** velocidades iguais testam no máximo 18 das 180 possibilidades.
- **A solução:** o ponto de encontro de um par em sentidos opostos anda P · a ÷ (a + b) a cada encontro (provado, E9c). Se a ÷ (a + b) = p ÷ q em termos mínimos, há exatamente q pontos, para sempre (E9a e E9b: o par 2 e 0,1 só volta ao mesmo ponto no 21º encontro). Se a razão for irracional, os pontos são densos: toda hora do relógio acaba visitada (Weyl, 1916; Kronecker). Medido na máquina: 2, 3, 5 e 19 pontos exatos para as razões 1/2, 2/3, 4/5 e 13/19; para 20/21 a máquina contou 24, porque a detecção do cruzamento oscila dentro do passo e parte 3 pontos em dois; para 2 e √2, 600 de 600 faixas preenchidas.
- **No modelo:** "diferença" não basta: o que abre horas novas é a razão entre as velocidades ter denominador grande, ou ser irracional. Na máquina real as colisões com perda mudam as razões o tempo todo, e foi assim que "metade com força" chegou a 100 %. É a regra de projeto para D20 e D22.

## E10. Bell: o valor é do par, não do fragmento

- **A fórmula dizia:** quatro valores fixos em {−1, +1}, cada lado vendo só o seu, dão S = ±2; a média fica entre −2 e 2.
- **A solução:** na mecânica quântica as quatro correlações são −cos(ângulo) de um único estado do par, não produtos de quatro números fixos; isso chega a 2√2 ≈ 2,83 (limite de Tsirelson, 1980; conferido: EXISTE). Os experimentos medem acima de 2 (Aspect, 1982: cerca de 2,70; Hensen, 2015, sem brechas: cerca de 2,42).
- **No modelo:** "Alpha conhece o valor" sobrevive se o valor for do par (do Todo), não de cada fragmento: é a mesma coisa que E4 disse. O "valor próprio" do fragmento então ou não existe antes do encontro (Copenhague), ou existe mas é não local (Bohm), ou tudo já estava fixado, inclusive a escolha do que medir (superdeterminismo, a leitura de A.10). A A.1 ("cada fragmento só possui valor") precisa virar "o valor é do Todo; o fragmento tem a sua parte".

## E11. Mais colisões não é mais energia: é um gás granular esfriando

- **A fórmula dizia:** não existe energia por colisão: 456 e 1.292 colisões gastaram os mesmos 792 J.
- **A solução:** a energia gasta é Σ (m ÷ 4) · perda · (Δv)², e a lei coletiva de um gás de colisões inelásticas é a de Haff (1983): K(t) = K₀ ÷ (1 + t ÷ τ)², solução de dK/dt = −γ · K^{3/2} (provado, E11). Medido na máquina, todos em repouso com perda e raio fixo: K ∝ t^{−2,00} entre 50 e 400 s, para 6 e 12 fragmentos, exato. Com 24 a máquina desvia (t^{−1,33}) porque para de colidir quando |Δv| < 0,02 m/s (um corte da S5), não por falha da lei. Com os fanáticos injetando energia, é um gás granular forçado, que vai para um regime estacionário; também é sistema estudado.
- **No modelo:** o "colidindo e colidindo até perder energia" da página 4 é, literalmente, um gás granular esfriando. O que se mede é a temperatura (K), não a contagem. O item 17 do caderno vira: "quanto mais colisões, menos energia em cada uma; o total gasto é limitado pelo estoque".

## E12. O cone reto é um cone de luz: o raio é relógio, não medidor de energia

- **A fórmula dizia:** os raios medidos não ficam numa reta; com S6 o Tubo é uma cúpula.
- **A solução:** um cone reto em (espaço, tempo) é a marca de uma velocidade constante: r = c · (T_f − t) é o cone de luz passado do evento final (Minkowski, 1908): tudo o que pode chegar ao ápice (conferido, E12). Lido assim, a imagem 3 diz que o raio segue o relógio, com T_f fixado desde o início, e não a energia gasta. Alpha conhece T_f (A.10); os fragmentos não (A.6: "só o Todo saberá").
- **No modelo:** a causa inverte. Hoje as colisões fecham o Tubo. No cone de luz, o Tubo fecha pelo relógio e o fechamento força as colisões: apertar acelera (E6), as colisões ficam mais frequentes e mais fortes, a fatia esquenta (página 3), e "o tubo vai engolindo" o fragmento (A.8). "Todas as possibilidades testadas antes do fim" deixa de ser regra e vira previsão que a máquina pode confirmar ou derrubar.

## O motor B: as soluções juntas (D32)

Se o autor aceitar as respostas da física, elas se encaixam numa máquina só:

1. **Raio pelo relógio:** ρ(t) = ρ₀ · (1 − t ÷ T_f). Cone reto. T_f é dado de Alpha. (E12)
2. **Velocidade pelo aperto:** vᵢ ∝ 1 ÷ ρ entre colisões (momento angular). O fragmento nota pelo calor. (E5, E6)
3. **Colisões como hoje (S5), com perda > 0:** calor Q = (m ÷ 4) · perda · (Δv)². (E7, E8)
4. **Contagem de possibilidades (S11, ou a regra que o autor der) como medida, não como causa.** A pergunta "todos os fragmentos testam todas as possibilidades antes de T_f?" vira teste. (E9, E11)
5. **O valor é do Todo; cada fragmento tem a sua parte.** (E4, E10)
6. **As fitas quase se anulam:** sobra de 1 em 10⁹, se o modelo quiser bater com o universo. (E3)

O que muda nos testes da seção 9 do `PROMPT.md`: o teste 6 (ordem dos fechamentos) deixa de existir, porque todos fecham em T_f; entram no lugar "a cobertura das possibilidades em T_f" e "a temperatura sobe com 1 ÷ ρ²". A máquina atual fica como está; o motor B entraria como cópia separada.

## O que a física não resolve

- O tamanho da sobra de matéria (E3) é problema em aberto.
- Qual saída de Bell é a certa (E10) é interpretação, não medida.
- Nada na física diz o que é "uma possibilidade" (D20); isso é do autor.

## Como repetir

```
python -I -X utf8 -B solucoes-z3.py
node fisica-confere.js maquina-do-tubo.html
```
