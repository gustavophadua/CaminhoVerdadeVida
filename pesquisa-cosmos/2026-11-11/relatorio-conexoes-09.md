# 2026-11-11 — 09: Identificabilidade durante a adaptação

O relatório 08 modelou o retorno da atividade biológica ao basal por feedback integral. Aqui a questão é quais parâmetros cinéticos um observador consegue recuperar de um transiente. Yi et al. derivaram o papel do feedback integral na adaptação da quimiotaxia bacteriana ([PNAS, 2000](https://pmc.ncbi.nlm.nih.gov/articles/PMC18287/)). A conexão nova para o Tubo é explicitar quais medições distinguem mecanismos que produzem a mesma atividade.

## Modelo e dedução

Em tempo t ≥ 0, em segundos, sejam e(t) e m(t) desvios reais de atividade e de memória, ambos adimensionais em escalas fixas. Considere de/dt = −a e + b m + d e dm/dt = −k e, com a,b,k > 0 em s⁻¹ e d real em s⁻¹. O estímulo físico é representado pelo termo aditivo d, constante e não nulo após o degrau. O sistema começa em e(0)=m(0)=0, sem vazamento, saturação ou ruído. O equilíbrio tem e*=0 e m*=−d/b. Assim, qualquer amplitude tem a mesma saída final ideal.

A diferenciação para t>0 fornece e'' + a e' + bk e = 0. Os limites à direita no início são p=e'(0+)=d, q=e''(0+)=−ad e r=e'''(0+)=(a²−bk)d, em s⁻¹, s⁻² e s⁻³. Logo d=p, a=−q/p e bk=a²−r/p. Dois modelos com a mesma saída têm esses três invariantes. Reciprocamente, pelos mesmos dados iniciais e pela unicidade da solução da EDO, os três invariantes iguais dão a mesma trajetória. Com a e d fixos, (b,k)=(2,3) e (1,6), ambos em s⁻¹, são um contraexemplo à identificação separada só pela atividade. Se também se medir s=m''(0+)=−kd, em s⁻², na escala conhecida de m, então k=−s/p e b=(bk)/k. Para d=0 e o estado inicial adotado, ambos os sinais permanecem nulos e essas inversões não se aplicam.

## Verificação executada

O analisador do Cosmos aceitou todas as fórmulas abaixo. O adaptador Z3 conferiu a consistência das premissas, a consulta e sua negação com limite de 10 s por verificação. As constantes numéricas são reais. O caso BASE9 usa os fatos de base-tubo-v1.json sem as equações cinéticas. Os símbolos au, bu, ku, du representam o segundo modelo.

```text
{"id":"ID1","premissas":{"A":"dd ≠ 0","B":"p = dd ∧ q = −aa × dd ∧ r = (aa × aa − bb × kk) × dd","C":"p = du ∧ q = −au × du ∧ r = (au × au − bu × ku) × du"},"alvo":"dd = du ∧ aa = au ∧ bb × kk = bu × ku","esperado":"SEGUE"}
{"id":"ID2","premissas":{"A":"bb = 2 ∧ kk = 3 ∧ bu = 1 ∧ ku = 6"},"alvo":"bb × kk = bu × ku ∧ bb ≠ bu ∧ kk ≠ ku","esperado":"SEGUE"}
{"id":"ID3","premissas":{"A":"dd ≠ 0 ∧ bb × kk = bu × ku ∧ kk > 0","B":"s = −kk × dd ∧ s = −ku × dd"},"alvo":"kk = ku ∧ bb = bu","esperado":"SEGUE"}
{"id":"BASE9","premissas":null,"alvo":"bb × kk = bu × ku","esperado":"EM ABERTO"}
```

```text
ID1 SEGUE [A, B, C, consulta]
ID2 SEGUE [A, consulta]
ID3 SEGUE [A, B, consulta]
BASE9 EM ABERTO
```

Execução com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-11/rodada-09-temporaria.mjs. Z3 verificou as consequências algébricas e o par de taxas do contraexemplo. A equivalência de trajetórias decorre da unicidade da EDO. A lei cinética e a observação do estado de memória são hipóteses adicionais à base do Tubo.

A eficácia experimental desta estimativa ainda não foi medida. O próximo ensaio pode ajustar a solução da EDO diretamente às séries temporais para evitar estimar a terceira derivada a partir de dados ruidosos. Compare intervalos para b e k usando só atividade e usando também memória calibrada. Valide as previsões em degraus reservados e investigue o efeito de uma escala de memória desconhecida.

