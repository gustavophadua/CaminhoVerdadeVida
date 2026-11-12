# 12/11/2026 — Relatório 12 — Medir fluxo de troca no equilíbrio

Continuação da identificabilidade de dois compartimentos do relatório 07. No rótulo ID1 desse relatório, a tentativa específica era contraditória. A família indistinguível foi exemplificada em ID2. A presente extensão trata a exceção do equilíbrio, onde medir o total M ainda deixa a escala temporal desconhecida.

A análise estrutural de parâmetros e estados em EDOs biológicas é desenvolvida por [Villaverde, Barreiro e Papachristodoulou, 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC5085250/). A conexão estudada aqui é entre conservação de quantidade, troca entre compartimentos biológicos e identificação matemática das taxas.

Considere x1′=−a x1+b x2, x2′=a x1−b x2, y=x1 e M=x1+x2 constante. Quantidades x1,x2,M em mol, taxas a,b positivas em s⁻¹ e tempo em segundos. Assume-se sistema fechado, taxas constantes e medições calibradas. Em transiente não constante, y identifica s=a+b e h=bM. Uma medida adicional de M>0 fornece b=h/M e a=s−b. Medir x2 em um instante, junto com x1, também fornece M.

No equilíbrio com x1,x2>0, medir M e y determina as duas quantidades, mas apenas a razão a/b=x2/x1. Uma medida extra do fluxo bruto unidirecional J=a x1=b x2, em mol/s, fornece a=J/x1 e b=J/x2. Fluxo líquido zero continua compatível com infinitas taxas. Para x1=x2=2 mol, tanto a=b=1 s⁻¹ como a=b=3 s⁻¹ dão fluxo líquido zero, mas fluxos brutos de 2 e 6 mol/s.

Como hipótese de protocolo biológico, pode-se rastrear uma fração marcada do material transferido, com cinética equivalente e sem alterar o equilíbrio, para inferir o fluxo bruto. A inferência exige um modelo do marcador e calibração. Temperatura ou perda isoladas só identificam taxas se uma relação constitutiva adicional conhecida ligar essas medidas aos parâmetros.

O analisador Cosmos aceitou todas as fórmulas abaixo. O adaptador Z3 verificou consistência, consulta e negação, com limite de 10 s por verificação. Todas as constantes são reais, xx=x1, yy=x2 e jj=J.

```text
{"id":"FLUXO","premissas":{"A":"xx > 0 ∧ yy > 0 ∧ jj = aa × xx ∧ jj = bb × yy","B":"jj = au × xx ∧ jj = bu × yy"},"alvo":"aa = au ∧ bb = bu","esperado":"SEGUE"}
{"id":"LIQUIDO","premissas":{"A":"xx = 2 ∧ yy = 2 ∧ aa = 1 ∧ bb = 1 ∧ au = 3 ∧ bu = 3"},"alvo":"aa × xx − bb × yy = 0 ∧ au × xx − bu × yy = 0 ∧ aa × xx ≠ au × xx","esperado":"SEGUE"}
```

Saída efetivamente executada, código zero:

```text
FLUXO SEGUE [A, B, consulta]
LIQUIDO SEGUE [A, consulta]
```

Comando: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-12-temporaria.mjs.

A prova condicional identifica quais grandezas adicionais resolvem a ambiguidade neste modelo. A conexão nova para o projeto é medir troca bruta quando a saída está em equilíbrio. A eficácia experimental do protocolo de marcador ainda não foi medida. Próximo ponto: escrever a EDO do marcador e verificar se sua curva temporal determina J sem perturbar as quantidades totais.

