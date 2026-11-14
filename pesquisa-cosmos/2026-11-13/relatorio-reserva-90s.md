# 13/11/2026 — Reserva energética, sobrevivência no modelo e ambiente compartilhado

Modelo sintético, sem previsão clínica. R₀=3000 J de reserva utilizável, demanda P=120 W e entradas de 400 J por evento. Um estoque externo de 36 kJ permite até 90 entradas por trajetória (o estoque é individual nesta simulação). Os eventos oferecidos seguem Poisson condicional à taxa λ+B, λ=0,2 s⁻¹, B∈{0; 0,1} s⁻¹ equiprováveis e fixo por trajetória. A cada segundo admite-se a entrada até o limite do estoque, debita-se 120 J e encerra-se a trajetória se a reserva for ≤0. O evento H_T é reserva positiva em todos os passos até T. A resolução de 1 s admite eventos na etapa antes do débito e não resolve a ordem intrassegundo.

A identidade bayesiana é P(H_T)=∫P(H_T|r,b) π(dr,db), e π(dr,db|H_T)∝P(H_T|r,b)π(dr,db). O prior π é escolhido ou estimado. Com entradas zero e reserva inicial r, o modelo permite H_T quando r>PT. Logo ausência de entrada durante a janela não implica falha imediata. A longo prazo, com reserva total finita e demanda positiva constante, a reserva se esgota. J/s quantifica potência. Contagem de mortes exigiria variável e mecanismo próprios.

Para contagens oferecidas N₀,N₁ condicionalmente independentes, E[Nᵢ|Bᵢ]=T(λ+Bᵢ). Se Var(Bᵢ)=v, então Var(N₁−N₀)=2T(λ+E[B])+2T²(v−Cov(B₀,B₁)). Aqui v=0,0025 s⁻² e E[B]=0,05 s⁻¹. Em 90 s, fundo comum dá 45 e fundos independentes dão 85,5, em contagens ao quadrado. O termo quadrático decorre de taxas latentes fixas durante a janela. Fundos diferentes numa realização não determinam a covariância. O ensaio usa exposições separadas para contagens oferecidas, sem disputa por um estoque comum. Competição por um mesmo estoque exigiria um mecanismo de partilha e poderia mudar a covariância.

Contabilização térmica idealizada: cada passo concluído dissipa 120 J em reservatório a 300 K. ΔS_banho=Q/300 K, em J/K. A curva mostra média acumulada por trajetória inicial, com dissipação interrompida na primeira falha de reserva. A entropia do sistema e dos demais fluxos não foi modelada. Para o balanço de sistema e meio, ver [Schmiedl e Seifert](https://arxiv.org/abs/cond-mat/0605080). O modelo não contém variáveis para benevolência, pecado ou morte de terceiros. Esses termos podem nomear uma interpretação, mas suas probabilidades não são identificadas pelas equações.

NumPy 2.2.6, 20.000 trajetórias, semente 1337. Resultados estão abaixo.

P(H₉₀) ≈ 0.56730. Variância amostral com fundo comum 44.909 e independente 85.356. Entropia média transferida ao banho até 90 s 30.323 J/K.
