# Experimento A — objeto parado — 12/11/2026

Executado diretamente o motor extraído de maquina-do-tubo.html, sem Cosmos ou Z3, pelo script experimento-a-parado.mjs. Dados em experimento-a-parado.json, incluindo hash do motor e amostras a cada 10 segundos. Comando de reprodução:

node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/experimento-a-parado.mjs

Massa fixa do motor 1 kg, c=2 m, v(0)=0 m/s, força aplicada 0 N, um observador, perímetro 12 m e reserva 800 J. O controle de força ficou habilitado com intensidade zero, exercitando o ramo correspondente. Com um observador não há colisões. y=R phi é a coordenada de comprimento de arco desenrolada do motor. O raio ficou constante, de modo que a posição cartesiana no desenho também ficou constante.

Foram conferidos todos os 144001 estados, em 144000 passos de 1/240 s, por 600 s nominais. Velocidade permaneceu exatamente zero. A posição permaneceu 1.9999999999999998 m, desde o estado inicial. Deslocamento total zero. Erro máximo em relação a c de 2.220446049250313e-16 m. Energia inicial e final 800 J, zero colisões.

A primeira tentativa de comparação por igualdade exata com 2 falhou pelo arredondamento já presente na conversão inicial c/R e retorno R phi. A verificação foi corrigida para tolerância absoluta de 1e-12 m. O motor não foi alterado. A execução final terminou com código zero.

Pela regra do motor, a atualização de velocidade com força zero acrescenta zero e a atualização angular acrescenta v dt/R=0. Por indução, com raio constante e as condições deste ensaio, todos os passos preservam posição e velocidade. Isso coincide com F=ma para massa positiva, a=0 e velocidade inicial zero. O ensaio é numérico, e a inferência para todos os passos usa a regra de atualização explicitada.

O pedido foi executado na ordem indicada, começando pelo A parado. O teste com velocidade inicial 5 e o diagnóstico da medida adicional de ID1 são os próximos experimentos separados. A representação circular exige discutir força centrípeta se for interpretada como trajetória física no teste em movimento.
