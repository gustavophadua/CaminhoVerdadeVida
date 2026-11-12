# Experimento B — movimento com força aplicada zero — 12/11/2026

Executado diretamente o motor original de maquina-do-tubo.html, extraído entre MOTOR-INICIO e MOTOR-FIM. SHA-256 72b96f544d7b4a494857c891c935af4d55d91b8671300f43a04b09a336458e5f, idêntico ao experimento A. Código e geometria preservados. Sem Cosmos ou Z3.

Reprodução: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/experimento-b-movimento.mjs

Massa 1 kg, posição desenrolada inicial c=2 m, velocidade inicial 5 m/s, força aplicada 0 N, perímetro 12 m. Um observador evita colisões. Reserva 800 J e energia cinética inicial 12,5 J. O teto de velocidade foi escolhido em 10 m/s para permitir a entrada no ramo de aplicação de força, habilitado com intensidade zero. Esse teto não é atingido.

Previsão de Newton em coordenada retilínea: F=ma=0 implica a=0, v(t)=5 m/s e y(t)=2+5t. Em 600 s, y=3002 m, deslocamento 3000 m e 250 voltas da representação de perímetro 12 m.

Conferidos 144001 estados, incluindo o inicial, com 144000 passos de 1/240 s. Dados amostrados a cada 10 s no JSON.
- Velocidade em todos os estados: 5 m/s. Erro máximo zero.
- Posição desenrolada final R phi: 3002.0000000063665 m.
- Erro máximo de posição contra o tempo nominal step*DT: 6.366462912410498e-9 m, tolerância do teste 1e-7 m.
- Erro máximo contra o relógio acumulado do motor: 4.925368557451293e-9 m.
- Distância acumulada pelo motor: 3000.0000000039463 m.
- Voltas acumuladas pelo motor: 250.00000000039026.
- Relógio final do motor: 600.000000000737 s, tempo nominal 600 s.
- Erro de fechamento angular: 3.3333647473502613e-9 rad. Distância entre pontos inicial e final no círculo: 6.366257720028731e-9 m.
- Raio constante, zero colisões, energia inicial e final 812,5 J.
Execução concluída com código zero. Os contadores de distância, voltas e posição usam acumulações diferentes, portanto seus últimos dígitos diferem.

O movimento uniforme passa na coordenada desenrolada. O ponto volta à posição inicial do círculo após 250 voltas, enquanto o deslocamento desenrolado permanece 3000 m.

Se o círculo for representação periódica da coordenada retilínea, o fechamento é uma propriedade do desenho. Se ele for uma órbita física, R=12/(2 pi) m e a aceleração centrípeta é v²/R=13.089969389957473 m/s². Para 1 kg isso exige força radial de aproximadamente 13,09 N. O parâmetro force do motor representa aceleração tangencial. Assim, interpretar a órbita como movimento físico com força resultante vetorial zero seria incompatível com Newton. O teste valida a velocidade constante e a coordenada desenrolada sob força tangencial zero, com essa condição de interpretação explicitada.
