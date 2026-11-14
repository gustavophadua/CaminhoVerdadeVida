# 13/11/2026 — Orçamento de trabalho e observação de longo prazo

[Krauss e Starkman](https://arxiv.org/abs/astro-ph/9902189) concluem que o tempo consciente integrado é finito sob as hipóteses físicas do artigo. [Dyson](https://doi.org/10.1103/RevModPhys.51.447) encontrou uma possibilidade condicional de atividade ilimitada com energia finita em outro modelo cosmológico e sob leis de escala postuladas. Os cálculos abaixo isolam o papel do custo de apagamento. Não reproduzem a dinâmica cosmológica completa dos artigos.

Para n apagamentos de bits equiprováveis em banhos à temperatura Tₙ>0, o orçamento de trabalho W deve satisfazer W≥k_B ln(2) ΣTₙ no modelo ideal. Se Tₙ≥Tmin>0 e W é finito, n≤W/[k_B Tmin ln(2)]. Isso limita apagamentos. Limitar tempo consciente integrado exige ainda um vínculo entre atividade consciente e apagamentos ou outro custo irreversível. Limitar o tempo integrado não implica que exista um último instante em que qualquer atividade possa ocorrer.

Para uma aproximação contínua, ponha x=t/t₀≥1, T(t)=T₀x⁻ᵃ e r(t)=r₀x⁻ᵇ. t₀ está em segundos, T₀ em kelvins e r₀ em apagamentos/s. Então N(x)=r₀t₀∫₁ˣu⁻ᵇdu e Wmin(x)=k_B ln(2) T₀r₀t₀∫₁ˣu⁻⁽ᵃ⁺ᵇ⁾du. Contagem ilimitada pede b≤1 e custo mínimo finito pede a+b>1. Trata-se de condição sobre esse custo, sem garantir máquina, memória, suprimento ou resfriamento fisicamente realizáveis. Para custo mínimo finito e orçamento W abaixo desse custo, o plano continua inviável.

Tabela calculada em Python. N/(r₀t₀) = x−1 nos três cenários (b=0). As colunas mostram Wmin/(k_B ln(2) T₀ r₀ t₀), adimensional.

x | a=0, piso constante | a=1, divergência logarítmica | a=2, convergência
---|---:|---:|---:
10 | 9.00000000 | 2.30258509 | 0.90000000
100 | 99.00000000 | 4.60517019 | 0.99000000
10000 | 9999.00000000 | 9.21034037 | 0.99990000

Em de Sitter exato, com H constante e positivo, a temperatura do horizonte é ħH/(2πk_B). Para H=10⁻¹⁸ s⁻¹ (exemplo), Python deu T=1.21566e-30 K, custo ideal 1.16338e-53 J por bit e teto 8.59564e+52 apagamentos por joule. A aplicação ao orçamento pressupõe que esse valor seja um piso operacional efetivo para o ciclo e que o trabalho útil acessível seja finito. [Gibbons e Hawking](https://doi.org/10.1103/PhysRevD.15.2738).

Para distinguir tempo integrado e tempo de calendário, janelas [2ⁿ,2ⁿ+2⁻ⁿ] s, n≥1, somam 1 s de atividade, embora ocorram arbitrariamente tarde. É contraexemplo matemático à inferência entre as duas afirmações. A realização física dessas janelas exigiria recursos e resolução temporal compatíveis.
