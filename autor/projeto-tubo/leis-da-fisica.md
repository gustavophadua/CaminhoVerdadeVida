# As leis da física dentro da lógica do Cosmos

**English:** [leis-da-fisica.en.md](leis-da-fisica.en.md)

Pesquisa pedida pelo autor em 11 de novembro de 2026 (A.4, item 7), junto com a conferência da A.14 (o sono, a energia
e o ponto Omega). Tudo foi conferido no mesmo dia com o motor do Cosmos (leitura m2, tradução t1 e Z3 em WebAssembly),
em dois arquivos de teste que ficam no Cosmos, em `autor/projeto-tubo/cosmos/`:

- `tubo-6-leis-da-fisica.test.ts`: 29 casos de física (Newton, gravitação, relatividade, termodinâmica, mecânica
  quântica e os limites da própria lógica);
- `tubo-5-sono-energia-omega.test.ts`: 16 casos da A.14, contra a base do Tubo e contra os axiomas do Principia.

Os 45 casos passam com o resultado registrado. Em três deles (F2, F4 e P3) eu esperava uma decisão, e o Z3 não decidiu
no prazo. O teste registra o que aconteceu, não o que eu esperava; a seção 5 (achado 4) explica o motivo. Para repetir,
ver a seção 9.

## 1. Em uma frase

No Cosmos, uma lei da física entra como premissa, com a sua origem, e o Z3 confere o que segue dela, o que a contradiz e
o que ela deixa em aberto. Ele nunca prova a lei: se a lei vale, quem diz é a medida.

O que funciona: tudo o que se escreve como igualdade ou desigualdade entre números, com soma, produto e divisão. Isso
inclui conservação, colisões, Kepler, Lorentz, Carnot, Heisenberg e Bell, e se decide em menos de meio segundo. O que
não funciona sozinho: derivadas (a lei entra pela solução), funções como a exponencial (entram por axiomas, e com ∀ o Z3
trava), perguntas sobre inteiros (podem não ter procedimento nenhum) e unidades (a lógica não as vê).

## 2. Como uma lei entra no Cosmos

Para o motor, uma lei é uma fórmula da lógica do Cosmos (m2). Pode ser universal, como `∀x (Aniquilacao(x) ⟹ ViraLuz(x))`,
ou uma relação entre números, como `m1·u1 + m2·u2 = m1·v1 + m2·v2`. A pergunta é outra fórmula, a conclusão. A resposta
segue a mesma regra da Conversa (função `classificar`, em `src/motor/avaliacaoZ3.ts`), com três chamadas ao Z3:

| Chamada | Se o Z3 diz | Resultado |
|---|---|---|
| 1. só as premissas | não cabem juntas | **inconsistente** (as leis dadas se contradizem) |
| 2. premissas e o contrário da conclusão | não cabem | **segue** |
| 3. premissas e a conclusão | não cabem | **contradiz** |
| 2 e 3 | as duas cabem | **independente** (as leis dadas não decidem) |
| qualquer uma | sem resposta no prazo | **não decidiu** (nunca vira verdade nem falsidade) |

**Lei necessária e caso contingente.** A lógica do Cosmos tem □ (necessário) e ◇ (possível), com as regras de S5. Uma lei
pode entrar como necessária, `□(∀x (Aniq(x) ⟹ Luz(x)))`. O caso concreto entra sem □, porque podia ter sido outro: é a
condição inicial, o "valor" da A.10. F5 e F6 mostram a diferença: a lei necessária aplicada ao caso dá o resultado no
mundo real (segue), mas o resultado não vira necessário (independente). Na física é igual: as leis são as mesmas em todo
lugar, e o que acontece depende também de como as coisas começaram.

**Achado: a Conversa ainda não aceita números.** O motor do Cosmos aceita constantes e funções numéricas (reais e
inteiros) quando recebe a lista dos símbolos que são números (`checarZ3`, em `src/motor/z3.ts`). Mas a rota da Conversa
monta o vocabulário com `fichasDe` (`src/motor/avaliacao.ts`), que guarda só símbolo, tipo e aridade e perde a marca de
número. A primeira tentativa deste estudo pela função da Conversa parou logo em `m1 > 0`, com a mensagem
"'m1' é objeto, mas aqui precisa ser número". Os testes de física passam pelo motor, com a mesma regra de três chamadas.
Hoje toda a física com números deste documento está fora do alcance de quem pergunta pela Conversa (seção 8, item 1). A
A.14 (seção 6) não usa números e passa pela própria função da Conversa.

## 3. Os 29 casos de física

O Z3 é o real, com prazo de 20 s por chamada (F9: 10 s). O tempo é o das três chamadas juntas, num notebook comum.

| Caso | Lei (premissas) | Pergunta (conclusão) | Resultado | ms |
|---|---|---|---|---|
| **A** | **Conservação e colisões (Newton)** | | | |
| A1 | colisão elástica: momento e energia conservados | v1 = ((m1 − m2)·u1 + 2·m2·u2) ÷ (m1 + m2) | segue | 489 |
| A2 | fusão ("matéria engole matéria"): momento conservado, os dois viram um | o calor da fusão nunca é negativo | segue | 185 |
| A3 | a mesma fusão | o calor é ½·μ·(u1 − u2)², com μ = m1·m2 ÷ (m1 + m2) | segue | 222 |
| A4 | a mesma fusão | "a fusão cria energia" (calor < 0) | contradiz | 284 |
| A5 | segunda e terceira leis de Newton | o momento total se conserva | segue | 188 |
| **B** | **Gravitação** | | | |
| B1 | órbita circular e gravitação de Newton | terceira lei de Kepler: T²·G·M = 4π²·r³ | segue | 237 |
| B2 | gravitação, com g = 9,81 m/s² na superfície | a Lua, a 60 raios da Terra, cai com 0,0027 < a < 0,0028 m/s² | segue | 200 |
| **C** | **Relatividade restrita** | | | |
| C1 | fator de Lorentz | γ ≥ 1 | segue | 123 |
| C2 | soma relativística de velocidades | duas velocidades abaixo de c somam abaixo de c | segue | 263 |
| C3 | soma de Galileu como lei absoluta | 0,6·c + 0,6·c < c | contradiz | 122 |
| C4 | ponte: soma relativística até c ÷ 1000 | a soma de Galileu erra no máximo 1 parte em 1 milhão | segue | 343 |
| C5 | aniquilação em repouso: energia e momento conservados | cada fóton sai com m·c² | segue | 156 |
| **D** | **Termodinâmica** | | | |
| D1 | segunda lei (a entropia dos reservatórios não diminui) | limite de Carnot: W ≤ Qq·(1 − Tf ÷ Tq) | segue | 125 |
| D2 | a mesma segunda lei | um motor que transforma todo o calor em trabalho (Qf = 0) | contradiz | 124 |
| D3 | total conservado e energia para gastar que só desce | o calor acumulado cresce | segue | 48 |
| D4 | só o total conservado | a energia para gastar desce | independente | 46 |
| **E** | **Mecânica quântica** | | | |
| E1 | incerteza de Heisenberg: Δx·Δp ≥ ħ ÷ 2 | posição exata (Δx = 0) | contradiz | 79 |
| E2 | valores prévios e locais (Bell): cada resultado é +1 ou −1 | a soma CHSH fica entre −2 e 2 | segue | 125 |
| E3 | os mesmos valores prévios e locais | o valor medido, S² = 8 (S = 2√2) | contradiz | 143 |
| **F** | **Os limites da lógica** | | | |
| F1 | queda livre pela solução, pos(t) = g·t² ÷ 2 para todo t | pos(2) = 19,62 | segue | 109 |
| F2 | exponencial por axiomas: E(s + t) = E(s)·E(t) para todos os reais | E(2) = E(1)² | não decidiu | 22.334 |
| F3 | só a instância E(1 + 1) = E(1)·E(1) | E(2) = E(1)² | segue | 54 |
| F4 | exponencial por axiomas | E(1) entre 2,7 e 2,8 (o número e) | não decidiu | 44.504 |
| F5 | □(toda aniquilação vira luz) e o evento é uma aniquilação | o evento vira luz | segue | 111 |
| F6 | o mesmo | o evento vira luz necessariamente (□) | independente | 93 |
| F7 | E = m·c, com m = 2 e c = 3 (unidades erradas) | E = 6 | segue | 44 |
| F8 | a testemunha de Booker (2019): x = 8866128975287528, y = −8778405442862239, z = −2736111468807040 | x³ + y³ + z³ = 33 | segue | 60 |
| F9 | nenhuma | existem inteiros com x³ + y³ + z³ = 33 | não decidiu | 20.072 |

Os grupos A a E são física conhecida, e cada resultado é o que a física diz. O grupo F testa a própria lógica: o que ela
lê, o que ela não lê e onde ela trava.

Duas respostas certas que o Z3 não deu. Em F2, a conclusão segue: basta pôr s = t = 1 na lei (é o F3). Em F4, a resposta
certa é "independente", porque qualquer base b > 0 satisfaz os axiomas (E(t) = bᵗ), e os axiomas não dizem qual é. Para
dizer "independente", o Z3 teria de construir uma função exponencial inteira, e não constrói.

## 4. As leis pela forma lógica

O que decide a sorte de uma lei no Cosmos não é a área (mecânica, quântica, cosmologia). É a forma em que ela se escreve.

| Forma | Exemplos | No Cosmos | Por quê |
|---|---|---|---|
| Igualdades e desigualdades entre reais, com +, −, × e ÷ | colisões, Kepler, Lorentz, Carnot, Heisenberg, Bell | decide sempre; o tempo pode crescer muito, mas aqui ficou abaixo de 0,5 s | a aritmética dos reais com soma e produto é decidível (Tarski, 1951); o Z3 usa o procedimento nlsat (Jovanović e de Moura, 2012) |
| Com exponencial | decaimento, resfriamento, crescimento | entra como função sem definição, com axiomas; com ∀ trava (F2, F4) | com a exponencial, a decidibilidade dos reais só está provada supondo a conjectura de Schanuel (Macintyre e Wilkie, 1996), e nem o Cosmos nem o Z3 têm esse procedimento |
| Com seno e cosseno | ondas, o relógio do Tubo | entra como função sem definição, com axiomas | com o seno, a aritmética dos reais fica indecidível (Richardson, 1968): sen(π·x) = 0 define os inteiros |
| Inteiros com multiplicação | contagem, quantização, x³ + y³ + z³ = 33 | sem testemunha pode não decidir nunca (F9); com testemunha, confere na hora (F8) | não existe procedimento geral: é o décimo problema de Hilbert (Matiyasevich, 1970) |
| Com derivada (equações diferenciais) | F = m·a como equação de movimento, Schrödinger, Maxwell | não entra como derivada; entra pela solução em forma fechada (F1) ou como relação entre o antes e o depois (A1 a A5, D1 a D4) | a lógica de primeira ordem do Cosmos não tem cálculo |
| Leis necessárias (□) | "toda aniquilação vira luz" em todo mundo possível | decide (F5, F6) | o Cosmos traduz □ e ◇ (S5) para a lógica de primeira ordem |
| Conjuntos | os axiomas do Principia, a extensionalidade | decide quando a instância está dada; com ∀ sobre conjuntos pode travar (tubo-5, P3) | o mesmo caso da exponencial |

## 5. Cinco achados

1. **A conservação é a ponte mais forte entre a física e a lógica.** As leis que o Cosmos decide sem esforço são as de
   conservação (momento, energia, massa e energia) e as desigualdades que saem delas (Carnot, calor da fusão, Bell).
   Isso tem uma razão. Pelo teorema de Noether (1918), cada conservação é uma simetria: a energia vem de as leis não
   mudarem com o tempo, e o momento, de não mudarem com o lugar. E uma lei de conservação é uma igualdade entre o antes e
   o depois, sem derivada, que é exatamente o formato que a lógica de primeira ordem com números lê. É também a lei que
   a A.14 aponta.

2. **Teorias que se contradizem como absolutas cabem no mesmo Todo se cada uma tiver o seu domínio.** A soma de Galileu
   como lei absoluta contradiz o limite da luz (C3). Restrita a velocidades até c ÷ 1000, ela é consequência da
   relatividade, com erro de no máximo 1 parte em 1 milhão (C4). É a D34 e o item 3 do plano do verificador (§8.1 do
   PROMPT): cada fato precisa carregar o domínio onde vale. Sem domínio, uma base com Newton e Einstein juntos é
   inconsistente, e de uma base inconsistente tudo segue (a explosão, mostrada em `comprovador.py`).

3. **A lógica não confere unidades.** E = m·c (F7) passa sem queixa: para o Z3, massa e velocidade são só números. A
   análise dimensional (Buckingham, 1914) pegaria o erro na hora, porque de um lado há joules e do outro, kg·m/s. Hoje,
   uma lei com a unidade errada entra na base e produz conclusões "provadas" erradas. Para a física, é uma falha real do
   verificador.

4. **O que não se decide nunca vira verdade, e uma testemunha resolve.** Os casos sem decisão (F2, F4, F9 e, na A.14,
   P3) são os que pedem achar um objeto que a lógica não constrói sozinha: uma função exponencial inteira, três inteiros
   de 16 dígitos ou a instância certa de um axioma sobre todos os conjuntos. Dada a instância (F3, P4) ou a testemunha
   (F8), a resposta sai em menos de 0,11 s. É a A.13 (Gödel dentro do Tubo) em pequeno: há verdades que o sistema não
   alcança sozinho e que ele confere na hora quando alguém de fora traz a resposta. Conferir é barato; achar pode ser
   impossível.

5. **O Z3 prova consequências, nunca a lei.** Em todos os casos a lei entrou como premissa. "Segue" quer dizer: se a lei
   vale, isto vale. Se a lei vale é pergunta para a medida. A soma de Galileu valeu por quase três séculos dentro do
   domínio em que se media; a relatividade não a apagou, deu o limite dela (C4). No Cosmos, "provado" é sempre relativo
   às premissas.

## 6. A A.14 conferida

A atualização do autor (A.14, 11/11/2026), frase por frase, com o que a física e a neurociência dizem e o que o Cosmos
conferiu. As frases entraram como fatos novos (N1 a N5), junto da base (realidade-v1 e `base-tubo-v1.json`, fatos T01 a
T13). As fórmulas são a minha leitura das frases; o autor pode ler de outro jeito.

| Fato | Fórmula | Frase da A.14 |
|---|---|---|
| N1 | ∀x (Fragmento(x) ∧ ¬Dorme(x) ⟹ PontoAberto(x)) | o fragmento sustenta o ponto observador |
| N2 | ∀x (Dorme(x) ⟹ ¬PontoAberto(x)) | durante o sono ele fecha o ponto observador |
| N3 | ∀x (Dorme(x) ⟹ RevisitaOPassado(x)) | retornando ao que já colidiu no passado |
| N4 | ∀x (RevisitaOPassado(x) ∧ ¬PontoAberto(x) ⟹ Embacado(x)) | sem presença de observação, por isso é tudo embaçado |
| N5 | ∃x (ConcentraOTodo(x)) | até o ponto do Omega, onde está totalmente concentrado o Todo |
| S20 (suposição minha) | ∀x (ConcentraOTodo(x) ⟹ ValorTotal(x)) | concentrar o Todo é ter o valor total |

Os fatos da base que entram nas contas: T01 (todo fragmento está dentro do Tubo), T02 (quem está dentro do Tubo não vê o
Todo), T03 (quem tem o valor total vê o Todo), T04 (quem está dentro do Tubo não descansa) e T11 (todo humano é um
fragmento).

### 6.1 O sono

**O que fecha.** No sono profundo (NREM), um estímulo magnético no córtex, que acordado se espalha por várias áreas, fica
local e se apaga rápido (Massimini e outros, 2005). O córtex continua ativo, mas as partes deixam de se integrar. Na
neurociência, é o mais perto de "fechar o ponto observador".

**O que se revisita.** No sono, as células do hipocampo que dispararam juntas enquanto um rato explorava voltam a
disparar juntas (Wilson e McNaughton, 1994), na mesma ordem e várias vezes mais rápido (Nádasdy e outros, 1999). É o
"voltar ao que já colidiu", e comprimido no tempo.

**O embaçado.** Os sonhos trazem pedaços da vida acordada, quase nunca um episódio inteiro: um estudo achou a repetição
fiel de um episódio em menos de 2% dos relatos (Fosse, Fosse, Hobson e Stickgold, 2003; conferi esse número só em
fontes secundárias). No sono REM, o córtex pré-frontal dorsolateral, que confere e julga, fica entre as áreas menos
ativas do cérebro (Maquet e outros, 1996). No sonho lúcido, em que a pessoa sabe que está sonhando, a atividade frontal
volta (Voss e outros, 2009). Então o ponto não é tudo ou nada: no sono profundo ele fecha quase todo; no REM fica
entreaberto (há experiência, falta a conferência); no sonho lúcido, abre um pouco.

**O gasto.** O cérebro dormindo não desliga. No sono profundo, as medidas com PET dão de 12% a 44% menos glicose que
acordado, conforme o estudo (Heiss e outros, 1985; Maquet, 1995); as revisões falam em cerca de 40%. No REM, o cérebro
usa quase o mesmo que acordado (Maquet e outros, 1990: diferença de 4,3%, não significativa). No sono, o espaço entre as
células do cérebro aumenta cerca de 60% e a limpeza de resíduos acelera (Xie e outros, 2013, em camundongos). Dormir é
outra operação, não ausência de operação.

No Cosmos, com a base e N1 a N5 (pela função `classificar`, a mesma da Conversa):

| Caso | Pergunta | Resultado | De onde sai | ms |
|---|---|---|---|---|
| S0 | a base com a A.14 é consistente? | consistente | | 798 |
| S1 | todo humano que dorme vê embaçado | segue | N2, N3, N4 | 343 |
| S2 | algum humano dorme e vê nítido | contradiz | N2, N3, N4 | 346 |
| S3 | o humano acordado sustenta o ponto aberto | segue | T11, N1 | 325 |
| S4 | algum humano dorme e descansa | contradiz | T11, T01, T04 | 277 |
| S5 | algum humano dorme | independente | nada obriga nem proíbe | 313 |

A coluna "de onde sai" é a cadeia que eu achei à mão; o Z3 confere o resultado, não a cadeia. O caso que importa é o S4.
O "dormir" da A.14 não pode ser "descansar" no sentido da T04 ("só descansa após a finalização do Todo", A.6). O sono é
fechar o ponto observador sem sair do Tubo e sem parar de gastar. A neurociência concorda no gasto. É a D36.

**O embaçado tem versão exata.** É a desigualdade do processamento de dados (Cover e Thomas). Se o que se tira depois (Z)
depende do que aconteceu (X) só através da lembrança (Y), então Z não tem mais informação sobre X do que Y tem. Repassar
sem observação nova mantém ou perde distinção, nunca ganha. Em lógica, com duas colisões diferentes que o sono juntou
numa lembrança só:

| Caso | Pergunta | Resultado | ms |
|---|---|---|---|
| E1 | lembra(c1) = lembra(c2), com c1 ≠ c2: o que se tira depois só da lembrança é igual para as duas | segue | 46 |
| E2 | o mesmo, com uma observação nova diferente para cada uma | independente | 61 |

E1 diz que uma função não separa o que recebeu junto. E2 mostra a saída: só uma observação nova pode separar. Acordado,
com o ponto aberto, o embaçado pode ser corrigido; dormindo, não. Para pôr isso na máquina, o fragmento precisaria
guardar as colisões que teve (D38).

### 6.2 A energia que se preserva e a energia para gastar

A A.14 diz duas coisas: a energia do Todo se preserva, e isso "não anula que o Todo tem energia pra gastar, só
acrescenta". Na física são duas leis. A primeira (conservação) diz que o total não muda. A segunda (Clausius, 1865) diz
que a parte que pode ser usada, a energia livre, só desce, porque vira calor e não volta. Total constante e parte útil
descendo cabem juntos: a diferença vira gasto.

| Caso | Premissas | Pergunta | Resultado | ms |
|---|---|---|---|---|
| D3 | total conservado e energia para gastar que só desce | o calor acumulado cresce | segue | 48 |
| D4 | só o total conservado | a energia para gastar desce | independente | 46 |

D4 é o "só acrescenta" da A.14 em forma de prova: a conservação sozinha não decide o gasto, e o gasto é uma lei a mais,
que se soma à primeira sem contradizê-la (D3 é consistente). A máquina já obedece às duas: reserva + movimento + gasta =
total (teste 1 da seção 9 do PROMPT; `confere-z3.py`, itens 7 a 9), e o gasto só cresce. O Principia já fala de energia
livre sem esse nome: "Cada estrela que se forma é ordem gravitacional sendo gasta" (página 5).

Uma ressalva de escala. Na relatividade geral, num universo que se expande, a energia total não tem uma conservação
global bem definida: a luz que atravessa o espaço em expansão perde energia (desvio para o vermelho), e essa energia não
vai para um lugar onde se possa somá-la (Carroll, 2010). Localmente, a conservação vale sempre. "A energia do Todo se
preserva" vale sem ressalva para o Tubo como sistema fechado, e para o universo inteiro só no sentido local.

### 6.3 Matéria engole matéria, até o ponto Omega

**Na escala local, é física.** A gravidade junta matéria. Numa fusão, massa e momento se conservam, e o calor da fusão é
½·μ·(Δv)², que nunca é negativo (A2 a A4). Mesmo assim, nem a fusão de galáxias vizinhas é certa: a de Via Láctea com
Andrômeda, que se dava como certa, tem cerca de 50% de chance nos próximos 10 bilhões de anos (Sawala e outros, 2025).

**Na escala do universo, depende da energia escura.**

| Cenário | O que diz | Como está em 2025 | O fim |
|---|---|---|---|
| Energia escura constante (o modelo padrão, ΛCDM) | a expansão acelera para sempre | é o padrão e ajusta bem os dados | frio, diluído e uniforme; os buracos negros evaporam (Hawking) em 10⁶⁷ anos ou mais |
| Energia escura que muda com o tempo (DESI, 2025) | a aceleração enfraquece | preferida a 2,8σ a 4,2σ, conforme as supernovas usadas; abaixo dos 5σ que a física pede para uma descoberta | em aberto |
| Recolapso (Luu, Qiu e Tye, 2025) | um modelo com constante cosmológica negativa e um campo extra; no melhor ajuste aos dados, o universo dura 33,3 bilhões de anos e faltam cerca de 20 | um modelo, não confirmado | concentrado (Big Crunch), o mais perto do ponto Omega da A.14 |

**O nome "ponto Omega" já existe.** Teilhard de Chardin (1955) chamou assim o ponto final de máxima complexidade e
consciência da evolução: é filosofia e teologia, não física. Tipler (1994) deu uma versão física: o fim de um universo
fechado que volta a se contrair, com tudo concentrado e o processamento de informação sem limite. A versão de Tipler
precisa de recolapso, e a aceleração da expansão, medida desde 1998, tira esse cenário do modelo padrão. O ponto Omega
da A.14, com o Todo concentrado no fim, tem a geometria do de Tipler.

**Choca com o Principia.** O Principia (página 5) diz: "o fim é a igualdade de tudo pelo esgotamento dessa ordem.
Começo e fim têm a mesma temperatura uniforme". A A.14 diz que o fim é o Todo totalmente concentrado. As duas só cabem
juntas se a gravidade vencer no fim. A mesma página do Principia dá a chave: "O estado de entropia máxima de uma massa
numa região é um buraco negro". Com a energia escura constante, a gravidade não vence, e o fim é o do Principia. Com
recolapso, é o da A.14. É a D39.

No Cosmos, com a base, N1 a N5 e S20:

| Caso | Pergunta | Resultado | De onde sai | ms |
|---|---|---|---|---|
| O0 | a base com a A.14 e S20 é consistente? | consistente | | 296 |
| O1 | o ponto Omega é um fragmento | contradiz | S20, T03, T01, T02 | 327 |
| O2 | o ponto Omega está fora do Tubo | segue | S20, T03, T02 | 360 |
| O3 | sem S20: o ponto Omega é um fragmento | independente | | 377 |

E contra os axiomas do Principia (Ax1: todo fragmento está dentro do Todo; Ax2: nenhum fragmento é o Todo; Ax3: existem
ao menos dois fragmentos distintos; Ax5: os fragmentos cobrem o Todo):

| Caso | Premissas | Pergunta | Resultado | ms |
|---|---|---|---|---|
| P1 | Ax1, Ax2, Ax3, Ax5 | sobra um único fragmento | contradiz (Ax3) | 200 |
| P2 | Ax1, Ax2, Ax5, sem Ax3 e sem extensionalidade | sobra um único fragmento | independente | 109 |
| P3 | Ax1, Ax2, Ax5 e a extensionalidade para todos os conjuntos | sobra um único fragmento | não decidiu | 20.169 |
| P4 | Ax1, Ax2, Ax5 e só a instância da extensionalidade (o fragmento que sobrou e o Todo) | sobra um único fragmento | contradiz | 108 |

A leitura de P4: o fragmento que sobra está dentro do Todo (Ax1) e, sozinho, cobre o Todo (Ax5); então tem os mesmos
elementos do Todo e, pela extensionalidade, é o Todo, o que Ax2 proíbe. O Principia já precisou dessa extensionalidade
para provar o T1 (nota "Extensionalidade", hoje desativada em `principia.json`). P2 mostra que sem ela não se decide: um
conjunto poderia ter os mesmos elementos do Todo e ser outro.

Conclusão: no Tubo e no Principia, no ponto Omega não há fragmento. O que sobra com tudo concentrado é o próprio Todo.
Isso bate com a A.14 ("totalmente concentrado o Todo") e com a T01 em palavras ("enquanto ele não fecha"): os axiomas de
fragmento valem enquanto o Tubo está aberto. É a D40.

### 6.4 A A.14 em resumo

| Frase da A.14 | O que a ciência diz | No Cosmos | Decisão |
|---|---|---|---|
| o fragmento sustenta o ponto observador | acordado, o córtex integra; essa integração cai no sono profundo (Massimini, 2005) | N1; S3 segue | D37 |
| no sono, fecha o ponto | no sono profundo fecha quase todo; no REM fica entreaberto | N2; a base continua consistente (S0) | D36, D37 |
| volta ao que já colidiu | o hipocampo repete o vivido, comprimido no tempo | N3 | D38 |
| sem observação, tudo embaçado | os sonhos são pedaços; desigualdade do processamento de dados | N4; S1 segue, S2 contradiz; E1, E2 | D38 |
| a energia não some, se preserva | primeira lei; a máquina já obedece; no universo em expansão, só localmente | D3 segue | |
| matéria engole matéria | a gravidade junta; na fusão, massa e momento se conservam e o calor nunca é negativo | A2 a A4 | D41 |
| até o ponto Omega, o Todo concentrado | só com recolapso; o modelo padrão não recolapsa; os dados de 2025 deixam aberto | O0 a O3; P1 a P4 | D39, D40 |
| não anula a energia para gastar, só acrescenta | a segunda lei se soma à primeira | D4 independente | |

## 7. Limites

- Os testes conferem lógica, não medida. Nenhum dado de laboratório entra, só as constantes dadas (g = 9,81 m/s²; π
  entre 3,14 e 3,15).
- O prazo de 20 s é uma escolha. Um "não decidiu" pode virar decisão com mais tempo (F2, em princípio) ou não virar
  nunca (F9, no caso geral). Os tempos são de um notebook comum; em outra máquina mudam, e os resultados não, menos os
  "não decidiu", que dependem do prazo.
- O Z3 em WebAssembly ocupa cerca de 2 GB por instância; por isso cada arquivo de teste roda num processo próprio.
- O ponto observador e o sono são correspondência estrutural, não medida da máquina. A máquina não tem sono nem
  memória.
- Parte das fontes de neurociência foi conferida só em revisões: os menos de 2% de Fosse (2003) e a faixa de 12% a 44%
  de queda da glicose no sono profundo.
- Os números de cosmologia de 2025 são preliminares (de 2,8σ a 4,2σ, abaixo dos 5σ de uma descoberta), e o recolapso de
  Luu, Qiu e Tye é o melhor ajuste de um modelo, não uma medida.
- As fórmulas N1 a N5 são a minha leitura da A.14, e S20 é suposição minha. Outra leitura pode dar outros resultados.

## 8. O que isso pede ao Cosmos

1. **Números na Conversa.** Passar `numerico` e `argumentos` em `fichasDe` (`src/motor/avaliacao.ts`), para que uma
   pergunta com números chegue ao motor como chega nos testes.
2. **Unidades como tipo.** Cada símbolo numérico com a sua dimensão (massa, comprimento, tempo), e a leitura recusando
   somar ou igualar dimensões diferentes. Pegaria o F7.
3. **Domínio em cada fato** (D34; §8.1 do PROMPT, item 3): "vale para v ≤ c ÷ 1000". C3 e C4 mostram o que muda.
4. **Conservação como módulo.** Um bloco pronto com as leis de conservação (momento, energia, carga), para colisões e
   reações. É a ponte mais forte (achado 1).
5. **Pedir a testemunha.** Quando o Z3 não decide, o Cosmos pode pedir a quem afirma (pessoa ou IA) a testemunha ou a
   instância, e conferir. É o que fecha F2 e F3, F8 e F9, P3 e P4. "Não decidiu" deveria vir com "traga um exemplo ou a
   instância".

## 9. Como repetir

Na raiz do repositório do Cosmos, um arquivo por vez (cada um abre o seu Z3):

```
npx vitest run --config autor/projeto-tubo/cosmos/vitest.config.ts autor/projeto-tubo/cosmos/tubo-6-leis-da-fisica.test.ts --reporter verbose
npx vitest run --config autor/projeto-tubo/cosmos/vitest.config.ts autor/projeto-tubo/cosmos/tubo-5-sono-energia-omega.test.ts --reporter verbose
```

Cada caso imprime uma linha `caso {...}` com o resultado e o tempo. O de física levou 93 s (os três "não decidiu"
esperam o prazo); o da A.14, 26 s.

## Fontes

Neurociência do sono:

- Massimini M. e outros (2005). Breakdown of cortical effective connectivity during sleep. *Science* 309: 2228–2232.
  <https://pubmed.ncbi.nlm.nih.gov/16195466/>
- Wilson M. A., McNaughton B. L. (1994). Reactivation of hippocampal ensemble memories during sleep. *Science* 265:
  676–679. <https://doi.org/10.1126/science.8036517>
- Nádasdy Z. e outros (1999). Replay and time compression of recurring spike sequences in the hippocampus. *Journal of
  Neuroscience* 19: 9497–9507. <https://doi.org/10.1523/JNEUROSCI.19-21-09497.1999>
- Fosse M. J., Fosse R., Hobson J. A., Stickgold R. J. (2003). Dreaming and episodic memory: a functional dissociation?
  *Journal of Cognitive Neuroscience* 15: 1–9. <https://www.scilit.net/publications/22c6d22a09f608636a76a4afd58ed8b2>
- Maquet P. e outros (1996). Functional neuroanatomy of human rapid-eye-movement sleep and dreaming. *Nature* 383:
  163–166. <https://doi.org/10.1038/383163a0>
- Maquet P. e outros (1990). Cerebral glucose utilization during sleep-wake cycle in man determined by positron emission
  tomography and [18F]2-fluoro-2-deoxy-D-glucose method. *Brain Research* 513: 136–143.
  <https://doi.org/10.1016/0006-8993(90)91099-3>
- Heiss W.-D. e outros (1985). Regional cerebral glucose metabolism in man during wakefulness, sleep, and dreaming.
  *Brain Research* 327: 362–366.
- Maquet P. (1995). Sleep function(s) and cerebral metabolism. *Behavioural Brain Research* 69: 75–83.
- Maquet P. Positron emission tomography studies of sleep and sleep disorders (revisão).
  <https://doi.org/10.1007/BF03160568>
- Voss U. e outros (2009). Lucid dreaming: a state of consciousness with features of both waking and non-lucid
  dreaming. *Sleep* 32: 1191–1200. <https://pmc.ncbi.nlm.nih.gov/articles/PMC2737577>
- Xie L. e outros (2013). Sleep drives metabolite clearance from the adult brain. *Science* 342: 373–377. Nota do NIH:
  <https://www.nih.gov/news-events/news-releases/brain-may-flush-out-toxins-during-sleep>

Física e cosmologia:

- Noether E. (1918). Invariante Variationsprobleme. *Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen*.
- Clausius R. (1865). Über verschiedene für die Anwendung bequeme Formen der Hauptgleichungen der mechanischen
  Wärmetheorie. *Annalen der Physik*.
- Carroll S. (2010). Energy is not conserved.
  <https://www.preposterousuniverse.com/blog/2010/02/22/energy-is-not-conserved/>
- DESI Collaboration (2025). DESI DR2 Results II: Measurements of baryon acoustic oscillations and cosmological
  constraints. <https://arxiv.org/abs/2503.14738>
- Luu H. N., Qiu Y.-C., Tye S.-H. H. (2025). The lifespan of our universe. <https://arxiv.org/abs/2506.24011>
- Sawala T. e outros (2025). *Nature Astronomy*. <https://doi.org/10.1038/s41550-025-02563-1>
- Teilhard de Chardin P. (1955). *Le phénomène humain*.
- Tipler F. J. (1994). *The Physics of Immortality*.
- Buckingham E. (1914). On physically similar systems; illustrations of the use of dimensional equations. *Physical
  Review* 4: 345–376.

Lógica e decidibilidade:

- Tarski A. (1951). *A Decision Method for Elementary Algebra and Geometry*.
- Richardson D. (1968). Some undecidable problems involving elementary functions of a real variable. *Journal of
  Symbolic Logic* 33: 514–520.
- Macintyre A., Wilkie A. (1996). On the decidability of the real exponential field. Em *Kreiseliana*.
- Matiyasevich Y. (1970). Enumerable sets are Diophantine. *Soviet Mathematics Doklady* 11: 354–358.
- Jovanović D., de Moura L. (2012). Solving non-linear arithmetic. *IJCAR 2012*.
- Booker A. R. (2019). Cracking the problem with 33. *Research in Number Theory* 5: 26. <https://arxiv.org/abs/1903.04284>
- Cover T. M., Thomas J. A. (2006). *Elements of Information Theory*, 2ª edição, seção 2.8 (desigualdade do
  processamento de dados).
