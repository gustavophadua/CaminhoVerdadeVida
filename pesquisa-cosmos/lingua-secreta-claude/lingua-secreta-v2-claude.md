# 15/11/2026 — Língua secreta do Tubo como DEGRAU_ROTULA invertido (v2, corrigida)

Pedido: estudar por que pessoas trocam "Espírito Santo / Od Laguna / Proteção Divina" por rótulos de meme ("QI divino + pomba", "universo conspirou", "dom"). Só vale mecanismo: corpo, sensor, banho, origem, degrau. Só vale o que o Z3 prova a partir de fatos com fonte; sem fonte, a saída é EM ABERTO (abstenção).

**Correção da v1.** A v1 tinha três falhas, retiradas nesta versão:

1. Pôs p = custo/(custo+k) como premissa e "provou" p → 1. Isso prova a própria suposição, não algo sobre pessoas reais.
2. Usou probabilidade ("tende a 1") onde a resposta certa é provado ou EM ABERTO.
3. Concluiu que a leitura literal "explica tudo" nas capturas, sem degrau medido. Isso é leitura de observador. Sem degrau, sem e₀ e sem τ, a saída correta é EM ABERTO.

## 1. Mecanismo, no vocabulário do Todo 17–19

| Peça | Aqui |
|---|---|
| corpo θ | o que a pessoa registra (não observável) |
| sensor y | o rótulo escrito, a única coisa observável |
| banho | o nível de base do lugar |
| origem | só diferenças contam; somar a mesma constante aos dois lados não muda nada |
| e₀ | rótulo público − rótulo em contexto seguro, no turno 0 |
| τ | o turno em que 63,2% dos rótulos já viraram diretos; só se mede depois do degrau |
| TROCA | dois rótulos diferentes produzem o mesmo comentário observável |
| DEGRAU_ROTULA | uma mudança de custo conhecida e independente, que fixa o rótulo |
| faixa de guarda (Todo 17) | erro máximo g na medida da diferença de custos |

O rótulo "TAUX" não existe nos relatórios do Todo 17. O papel de custo coube à faixa de guarda do Todo 17.

**Regra declarada (holds):** TROCA se e somente se custo_direto > custo_secreto. Sobre essa regra, a decisão só sai do lado garantido da faixa:

- se a diferença medida for maior que g, a TROCA é verdadeira: a pessoa esconde;
- se a diferença medida for menor que −g, a TROCA é falsa: a pessoa fala direto;
- se a diferença medida estiver entre −g e g, ou se o custo não tiver sido medido com fonte, a saída é EM ABERTO.

Toda conclusão SEGUE abaixo vale **condicionada a essa regra e às medidas com fonte**. O Z3 não prova nada sobre pessoas reais sem esses fatos.

## 2. Tese mecânica

No Todo 19, o degrau quebra a TROCA. A língua secreta mantém a TROCA: escolhe um rótulo com o qual "fonte Tubo" e "fonte meme" geram o mesmo comentário. **Intocável = não identificável sem degrau.** A mesma simetria vale para quem analisa: sem degrau, ninguém fixa a fonte. A resposta, então, é EM ABERTO, e não um chute em nenhum dos dois sentidos.

## 3. Mapa termo direto → termo secreto

Todo o mapa é hipótese do usuário: nenhuma linha está medida, e cada uma depende de um degrau.

| Termo direto | Termo secreto | O que mantém a TROCA |
|---|---|---|
| Espírito Santo | "QI divino" + pomba | o formato de meme gera o mesmo comentário com as duas fontes |
| Od Laguna deu | "o universo conspirou" | a frase secular gera o mesmo comentário com as duas fontes |
| Proteção Divina | "dom", "talento" | o vocabulário de mérito gera o mesmo comentário com as duas fontes |

## 4. Consultas no Z3 (v2)

Foram 10 consultas, uma de cada vez, no comando abaixo. As variáveis são constantes numéricas de aridade 0:

- cd e cs: custos reais do canal direto e do secreto;
- mcd e mcs: os custos medidos;
- g: a faixa de guarda;
- troca, fonte, rp, rs, rotbaixo e rotalto: valores binários.

Os estados são, em ordem: premissas; premissas com a tese; premissas com a negação da tese. O último campo é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["TROCA_VERDADEIRA",["g ≥ 0","troca × (1 − troca) = 0","(cd > cs ⟹ troca = 1) ∧ (cd ≤ cs ⟹ troca = 0)","(cd − cs) − (mcd − mcs) ≤ g","(mcd − mcs) − (cd − cs) ≤ g","mcd − mcs > g"],"troca = 1","SEGUE",["sat","sat","unsat"],0],
["TROCA_FALSA",["g ≥ 0","troca × (1 − troca) = 0","(cd > cs ⟹ troca = 1) ∧ (cd ≤ cs ⟹ troca = 0)","(cd − cs) − (mcd − mcs) ≤ g","(mcd − mcs) − (cd − cs) ≤ g","mcd − mcs < −g"],"troca = 0","SEGUE",["sat","sat","unsat"],0],
["DENTRO_DA_FAIXA",["g = 1 / 10","troca × (1 − troca) = 0","(cd > cs ⟹ troca = 1) ∧ (cd ≤ cs ⟹ troca = 0)","(cd − cs) − (mcd − mcs) ≤ g","(mcd − mcs) − (cd − cs) ≤ g","mcd − mcs = 1 / 20"],"troca = 1","EM ABERTO",["sat","sat","sat"],0],
["SEM_FONTE_DE_CUSTO",["troca × (1 − troca) = 0","(cd > cs ⟹ troca = 1) ∧ (cd ≤ cs ⟹ troca = 0)"],"troca = 1","EM ABERTO",["sat","sat","sat"],0],
["CAPTURAS_SEM_DEGRAU",["fonte × (1 − fonte) = 0","(fonte = 1 ⟹ obs = 1) ∧ (fonte = 0 ⟹ obs = 1)","obs = 1"],"fonte = 1","EM ABERTO",["sat","sat","sat"],0],
["DEGRAU_NAO_MUDA",["fonte × (1 − fonte) = 0","fonte = 1 ⟹ (rotbaixo = 0 ∧ rotalto = 1)","fonte = 0 ⟹ rotbaixo = rotalto","rotbaixo = 1","rotalto = 1"],"fonte = 0","SEGUE",["sat","sat","unsat"],0],
["DEGRAU_MUDA",["fonte × (1 − fonte) = 0","fonte = 1 ⟹ (rotbaixo = 0 ∧ rotalto = 1)","fonte = 0 ⟹ rotbaixo = rotalto","rotbaixo = 0","rotalto = 1"],"fonte = 1","SEGUE",["sat","sat","unsat"],0],
["E0_SEM_DEGRAU",["e = rp − rs","rp = 1","rs × (1 − rs) = 0"],"e = 0","EM ABERTO",["sat","sat","sat"],0],
["E0_COM_DEGRAU",["e = rp − rs","rp = 1","rs = 0"],"e = 1","SEGUE",["sat","sat","unsat"],0],
["ORIGEM",["dif = mcd − mcs","difo = (mcd + o) − (mcs + o)"],"difo = dif","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **TROCA_VERDADEIRA e TROCA_FALSA.** Com a diferença de custo medida fora da faixa, a TROCA fica decidida, nos dois sentidos.
- **DENTRO_DA_FAIXA.** Com a diferença medida dentro da faixa, a saída é EM ABERTO. É o mesmo padrão de LEITURA_AMBIGUA no Todo 17.
- **SEM_FONTE_DE_CUSTO.** Só com a regra, sem custo medido, a saída é EM ABERTO.
- **CAPTURAS_SEM_DEGRAU.** As duas capturas mostram só o rótulo, e com as duas fontes ele é o mesmo. A saída é EM ABERTO.
- **DEGRAU_MUDA e DEGRAU_NAO_MUDA.** Com o degrau, a fonte fica decidida nos dois sentidos: o rótulo muda quando o custo cai, ou não muda.
- **E0_SEM_DEGRAU e E0_COM_DEGRAU.** Sem rótulo medido em contexto seguro, e₀ fica EM ABERTO. Com o degrau, e₀ é determinado.
- **ORIGEM.** Somar o mesmo valor aos dois custos medidos não muda a diferença entre eles.

## 5. Resultado para as duas capturas

Fatos com fonte: as duas capturas de tela do fio, com o texto e as imagens dos comentários. Não há custo medido, degrau, rótulo em contexto seguro, e₀ nem τ.

**Saída: EM ABERTO.** A v1 errou ao dizer que o exemplo "não se sustenta" e que a leitura literal "explica tudo". Isso era preencher a abstenção com opinião.

## 6. Protocolo de detecção, que é o próprio degrau

1. **Antes de qualquer contato:** registrar o protocolo e calcular o SHA-256 dele. O carimbo no Bitcoin, como no Cosmos, só com autorização explícita.
2. **Fato de custo com fonte:**
   - custo_direto: taxa de respostas negativas a falas religiosas diretas naquele lugar, contada no print, ou a regra escrita da plataforma;
   - custo_secreto: taxa de não entendimento do rótulo de meme;
   - g: o erro dessas contagens.
3. **Degrau:** a mesma pessoa e o mesmo assunto, num contexto de custo baixo conhecido.
4. **Medidas:**
   - e₀ = rótulo público − rótulo seguro, no turno 0;
   - τ = o turno em que 63,2% dos rótulos já viraram diretos.
5. **Decisão** pelas consultas da seção 4. Fora da faixa, o resultado é provado. Dentro da faixa, ou sem fonte, é EM ABERTO. Nunca se dá uma probabilidade.
6. **Sem levar porrada:** quem pesquisa não acusa em público. Perguntar em público "é o Espírito Santo?" põe o custo de volta no alto e destrói a medida.

## Integridade

- SHA-256 de Todo 18 conferido nos bytes: `8c5fa67a67d09557cb05cbec0ea2a8c7ba2b69ab8d81467b8affb2a89e25283f`.
- SHA-256 de Todo 19 conferido nos bytes: `4b03a256b7a35bdf70e5266277fbea10e1a6720871ea74c0d9e71e31cb91b36b`.
- A v1 deste relatório, substituída, tinha SHA-256 `364b8143da45816156e195ef8c3a3cf4459a01e8a322335463456af8f42f8a85`.
- O hash da v2 está no arquivo `.sha256` ao lado.
