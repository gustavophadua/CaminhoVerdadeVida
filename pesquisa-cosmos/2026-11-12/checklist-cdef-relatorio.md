# Checklist C, D, E e F — 12/11/2026

Motor original extraído de maquina-do-tubo.html, SHA-256 72b96f544d7b4a494857c891c935af4d55d91b8671300f43a04b09a336458e5f. Nenhuma alteração no motor. Script checklist-cdef.mjs, dados checklist-cdef-resultados.json.

Reprodução: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/checklist-cdef.mjs

O script terminou com código zero porque registra resultados inclusive reprovados. Esse código não representa aprovação dos critérios.

Condições escolhidas para os casos não especificados: y inicial zero, v inicial 5 m/s em todos os testes, massa fixa 1 kg, um observador, reserva 100 milhões de joules para evitar esgotamento, teto de velocidade 1 milhão de m/s para não interferir. DT=1/240 s. Perímetro inicial 12 m, R=12/(2 pi). C,D,E duram 60 s e F dura 600 s. Amostras gravadas a cada 10 s, máximos medidos em todos os passos.

O motor oferece força escalar por passo. Para E e F, o ensaio atualiza esse parâmetro antes de cada passo, usando sin(2 pi t/60) e −y, respectivamente. A posição y é o deslocamento assinado acumulado somando v_novo DT, exatamente o incremento de arco usado pelo motor. Sob raio variável, isso difere de R_atual phi. O círculo não foi apagado ou fixado artificialmente.

| Caso | Grandeza | Erro máximo | Critério | Resultado |
|---|---|---|---|---|
| C | velocidade | 2.3931079340400174e-11 m/s | <1e-9 | passa |
| C | deslocamento | 0.12500000036243364 m | <1e-8 | falha |
| D | módulo da velocidade a partir de 25 s | 7.000000000001062 m/s | zero | falha |
| E | velocidade | 0.00208348483762677 m/s | <1e-7 | falha |
| E | deslocamento | 9.090257776733779e-6 m | <1e-7 | falha |
| F | erro relativo de energia | 0.0020876826721871566 | <1e-9 | falha |

C termina em v=65.00000000002302 m/s e s=2100.1250000003624 m. A previsão é v=65 e s=2100. O motor usa Euler semi-implícito, primeiro v_novo=v+a DT e depois s_novo=s+v_novo DT. Com aceleração constante, o excesso de posição é a T DT/2=0,125 m. A velocidade pode ser muito precisa enquanto a posição falha.

D foi executado com força constante −0,2 N. Termina em v=−7.000000000001062 m/s e deslocamento −60.02500000002785 m. O motor não tem uma regra de atrito que se oponha à velocidade e encerre a frenagem em zero. Para reproduzir o atrito solicitado, essa regra e o instante de parada dentro do passo precisam ser implementados. A formulação mu=0,2 e normal=mg daria força 0,2mg; para m=1 kg e g=9,81 m/s², seu módulo é 1,962 N. Os 25 s e 62,5 m correspondem à força de módulo 0,2 N usada no ensaio.

E usa omega=2 pi/60 s⁻¹, v=5+(1−cos(omega t))/omega e s=5t+t/omega−sin(omega t)/omega² como referências. Voltar à velocidade inicial ao fim do período não elimina o erro intermediário medido.

F usa k=1 N/m, y(0)=0 m e v(0)=5 m/s, E0=12,5 J. Referências y=5 sin(t) m e v=5 cos(t) m/s. O erro relativo máximo foi aproximadamente 0,209%. Euler semi-implícito não preserva exatamente a energia física do oscilador. Além disso, a contabilidade do motor registra reduções cinéticas como energia gasta e retira aumentos da reserva, sem um estado de energia potencial da mola.

O raio permaneceu constante em C. Variações máximas em D,E,F foram respectivamente 1.193661964826731e-7, 2.6534749533180246e-6 e 2.279911149627445e-5 m. Portanto esses três ensaios não satisfazem literalmente a hipótese de um loop físico de raio fixo. A grande reserva apenas reduziu a variação. Para uma versão física do círculo também é necessária a força radial m v²/R.

Os resultados identificam limitações do motor atual. Próximas correções possíveis são integração de posição consistente com a força, lei de atrito com parada, suporte explícito a forças dependentes de tempo/posição e energia potencial conservativa. Passar casos isolados não estabelece precisão universal de um integrador.
