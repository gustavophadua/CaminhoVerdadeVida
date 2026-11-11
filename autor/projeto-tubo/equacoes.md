# As equações do Tubo

**English:** [equacoes.en.md](equacoes.en.md)

Montado em 10 de novembro de 2026 a partir da Máquina do Tubo (`maquina-do-tubo.html`) e conferido no Z3 (`equacoes-sem-solucao.py`, que chama `medidas.js` para tirar os números da própria máquina). Para repetir:

```
python -I -X utf8 -B equacoes-sem-solucao.py
```

Três coisas separadas, como sempre: o que é do autor, o que é suposição minha (S1 a S16, no `PROMPT.md`) e o que é física estabelecida.

## 1. A equação montada

É a máquina como está hoje, com as minhas suposições no lugar das regras que o autor ainda não deu.

**Grandezas.** Para cada fragmento i: a posição no perímetro φᵢ, a velocidade vᵢ (com sinal), o sentido dᵢ ∈ {+1, −1} e o modo (força ou repouso). Do Todo: a reserva R, o movimento K = Σ ½ m vᵢ², o gasto G e o total E = E₀ + K(0).

| Nº | Equação | De onde vem | Z3 |
|---|---|---|---|
| (1) | R + K + G = E, sempre | conservação | provado (itens 7 a 9) |
| (2) | Quem tem força acelera a = F ÷ m até v_F, e a reserva paga: ΔR = −½ m (v′² − v²) | S3, S4 | provado (7, 8) |
| (3) | No encontro (φᵢ = φⱼ): vᵢ′ = ((1+e)vᵢ + (1−e)vⱼ) ÷ 2, vⱼ′ = ((1−e)vᵢ + (1+e)vⱼ) ÷ 2, com e = √(1 − perda); o gasto cresce ΔG = (m ÷ 4) · perda · (vᵢ − vⱼ)² | S5 | provado (1 a 5) |
| (4) | Raio: ρ = ρ₀ · √((R + K) ÷ E) = ρ₀ · √(1 − G ÷ E) | S6 | provado (20, 21) |
| (5) | Andar: dφᵢ/dt = vᵢ ÷ ρ; relógio: θ = 2π t ÷ T | S1 | |
| (6) | Matéria = ρ cos θ, antimatéria = ρ cos(θ + 180°); a soma é zero: a linha de Alpha | S1, S2; D1 | provado (11, 13) |
| (7) | Voltas no perímetro por volta do relógio: n = v · T ÷ P | S9 | provado (15) |
| (8) | Fim: (R + K) ÷ E ≤ 1 ÷ 100 | S8 | |

**Numa linha só:**

> ρ(t) = ρ₀ · √(1 − G(t) ÷ E), com G(t) = Σ sobre os encontros de (m ÷ 4) · perda · (Δv)², e o Tubo fecha quando G = 0,99 · E.

Com a decisão D16 (estoque de probabilidades, ainda sem regra numérica), a mesma linha fica ρ = ρ₀ · √(1 − testadas ÷ N), e G deixa de ser energia.

**No formato que uma teoria exige** (`PROMPT.md`, seção 8): a grandeza que tem valor em cada ponto é ρ (o raio da fatia, ou o gasto G); a equação que diz como ela muda é a (3) somada à (4); as previsões que podem dar errado são a (7), com 10 voltas a 2 m/s e 0,5 a 0,10 m/s, e a ordem dos fechamentos (todos com força antes de metade). As duas já foram testadas na máquina e bateram; falta testar fora dela.

## 2. As equações sem solução

Cada uma foi escrita e entregue ao Z3, que procurou um número que a resolvesse. "Sem solução" quer dizer: nenhum número real (ou inteiro) satisfaz a equação dentro das hipóteses. Os números medidos vêm da máquina.

| Nº | A equação | Por que não tem solução | O que atinge |
|---|---|---|---|
| E1 | cos θ + cos(θ + φ) = 0 para todo θ, com φ ≠ 180° | em θ = 0 e θ = 90° a soma só zera se φ = 180° | a leitura "eixo vertical e horizontal" da página 1; D1 fechada em 180° |
| E2 | r(0) = k · r(T) e r(T) = k · r(2T), com r(τ) = Rm ÷ (1 + τ/τ₀) | a espiral em perspectiva não cresce pelo mesmo fator; exigir isso força T = 0 | Fibonacci na página 2; D9 fechada |
| E3 | M(t) − A(t) = ε > 0, com M(0) = A(0) e aniquilação aos pares | tirar o mesmo dos dois lados mantém a diferença em zero | "níveis iguais" (página 1) contra a sobra de matéria do universo (~1 em 10⁹); `PROMPT.md` §5 |
| E4 | valor(f) = Todo, com valor(f) ≤ visto(f) e visto(f) < Todo | o valor não passa do que o fragmento vê, e ele não vê o Todo | "valor total" (A.9) contra A.1 e a imagem 4; D28 |
| E5 | n(t) = n(0), com n = v · T ÷ P e P(t) < P(0) | com v fixo, encolher P sobe n | "não nota" (D17) contra S9 e S6; a máquina mede n indo de 8,5 a 27,2 |
| E6 | m · v₁ · R₁ = m · v₀ · R₀ e v₁ = v₀, com R₁ < R₀ | momento angular conservado num anel menor exige v maior | a velocidade fixa da máquina (S16) contra Newton; D31 |
| E7 | (R + K) ÷ (E₀ + K₀) ≤ 1/100, com R = E₀ = 800 J e K₀ = 0,03 J | sem força a reserva não desce, e o movimento inicial é 0,004 % do total | "todos em repouso": o Tubo nunca fecha, não só demora |
| E8 | (R + K) ÷ E ≤ 1/100, com G = Σ (m/4)(1 − e²)(Δv)² e e² = 1 | sem perda nada se gasta; R + K fica igual a E | perda 0 %: 1.797 colisões e 0 J; D15 (a perda nunca pode ser zero) |
| E9 | Σ possibilidades testadas = 180, com cada par oposto ≤ 2 horas e cada par no mesmo sentido = 0 | o máximo com velocidades iguais é 9 × 2 = 18 (10 %), para sempre | fanáticos iguais nunca fecham o cone (S11); D20, D22 |
| E10 | S = a·b + a·b′ + a′·b − a′·b′ = 2√2, com a, a′, b, b′ ∈ {−1, +1} | com valores que já existem e cada lado vendo só o seu, S vale exatamente ±2; a média de muitos pares fica entre −2 e 2 | "Alpha conhece o valor" (A.1, A.10) como teoria local; os experimentos dão S ≈ 2,7 (Aspect, 1982); a saída do modelo é o superdeterminismo; D29 |
| E10b | o mesmo S > 2 | idem | idem |
| E11 | c × 456 = 792,6 J e c × 1.292 = 792,2 J | não existe energia por colisão c: as duas histórias gastam o mesmo com números de colisões muito diferentes | "quanto mais colisões, mais energia gasta" (página 4, item 17); D16 |
| E12 | r(t) = r₀ (1 − t ÷ T_f) passando por (0; 1,000), (28; 0,899), (55; 0,764), (83; 0,560), (110; 0,096) | os pontos medidos não ficam numa reta: o raio cai devagar e despenca no fim | o cone reto da imagem 3 contra S6 (raio pela raiz da energia); D6 |

## 3. O que isso diz do modelo

- **Duas já estão resolvidas pelo autor** (E1, E2): ele fechou D1 em 180° e tirou Fibonacci. O Z3 confirma que não havia outra saída.
- **Três são o modelo contra ele mesmo** (E4, E5, E11): afirmações do caderno ou das respostas que não cabem juntas. Cada uma vira uma decisão (D28, D17, D16).
- **Três são o modelo contra a física** (E3, E6, E10). A E10 é a mais pesada: valores prévios e locais não reproduzem o que se mede. O modelo só sobrevive a ela abrindo mão da localidade ou adotando o superdeterminismo, que é a leitura de A.10.
- **Quatro são limites da máquina atual** (E7, E8, E9, E12): sem força não fecha, sem perda não fecha, iguais não testam tudo, e o cone não é reto.

Um achado novo saiu de E5 com E6: para o fragmento não notar o Tubo encolher (D17), a velocidade dele tem de cair com o raio (v ∝ R). Para Newton, ela tem de subir (v ∝ 1 ÷ R). A máquina hoje a mantém fixa, no meio, e não satisfaz nenhuma das duas. É a decisão D31.

## 4. O que não é isto

O Sistema não acha problemas em aberto da matemática. Ele responde se uma equação tem solução dentro das regras que recebeu. Quando o Z3 diz "sem solução", a certeza vale para aquelas hipóteses; mudando uma suposição (S1 a S16), a equação pode passar a ter solução. Por isso cada linha acima diz de onde vem.
