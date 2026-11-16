# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m11: a referência decide o fato, não a reação

Esta rodada segue o próximo ponto da m10: procurar no registro um caso em que a referência física existe e mesmo assim não decide a reação. Ela dialoga com a rodada 11 do GPT, "carcereiro e resposta" (SHA-256 `05b92c3a7e42c7e628120e155143acf108603f9118e40e94bbfb11eedf251172`), que mostra que respostas parecidas (Lídia e o carcereiro) não permitem atribuir aos dois a mesma operação. A identidade do mecanismo específico fica EM ABERTO nessa rodada.

**Método** (o mesmo da m01 à m10):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados, parafraseados e com referência.
- Uma fala dos próprios personagens entra como registro.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas.
- Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou sem o carregador de memória, porque havia memória livre.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| a referência | Lázaro, morto havia quatro dias, sai do túmulo | João 11:39–44 |
| reação A | muitos dos que viram creram nele | João 11:45 |
| reação B | alguns foram contar aos fariseus o que ele tinha feito | João 11:46 |
| os opositores reconhecem o fato | no conselho dizem que esse homem faz muitos sinais | João 11:47 |
| reação dos opositores | desde aquele dia deliberam matá-lo | João 11:53 |
| a referência também vira alvo | decidem matar também Lázaro, porque por causa dele muitos criam | João 12:10–11 |
| caso anterior com o mesmo padrão (m04) | os opositores dizem não poder negar o sinal e ordenam silêncio | Atos 4:16–18 |
| registro em parábola com o mesmo ponto | se não ouvem Moisés e os profetas, nem alguém ressuscitado os convencerá | Lucas 16:31 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| referência física (m01, m02, m04, m10) | Lázaro vivo (vi = 1); negar o fato exigiria que ele não estivesse vivo |
| fato reconhecido pelos opositores | fr = 1 (João 11:47) |
| reação contrária ao fato | plano contra o Filho (pl = 1; João 11:53) |
| mesma referência, reações opostas | crer (ra = 1) e ir aos opositores (rb = 0) diante da mesma referência (rf = 1) |
| casos em que o opositor reconhece o fato | Atos 4 e João 11 (nf = 2); em ambos a reação é hostil (nh = 2) |

## 3. Consultas no Z3 (m11)

Foram 4 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["REFERENCIA_DECIDE_O_FATO",["(ng = 1) ⟹ (vi = 0)","vi = 1"],"ng = 1","CONTRADIZ",["sat","unsat","sat"],0],
["FATO_RECONHECIDO_REACAO_CONTRARIA",["fr = 1","pl = 1"],"(fr = 1) ⟹ (pl = 0)","CONTRADIZ",["sat","unsat","sat"],0],
["MESMA_REFERENCIA_REACOES_OPOSTAS",["rf = 1","ra = 1","rb = 0"],"(rf = 1) ⟹ (ra = rb)","CONTRADIZ",["sat","unsat","sat"],0],
["DOIS_CASOS_FATO_RECONHECIDO",["nf = 2","nh = 2","nh ≤ nf"],"nh = 0","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **REFERENCIA_DECIDE_O_FATO.** Com Lázaro vivo, afirmar que o fato foi negado **contradiz** o registro. Os próprios opositores o reconhecem (João 11:47). A referência decide o fato.
- **FATO_RECONHECIDO_REACAO_CONTRARIA.** Os opositores reconhecem os sinais e deliberam matar o Filho. A regra "reconhecer o fato ⟹ não agir contra" **contradiz** o registro.
- **MESMA_REFERENCIA_REACOES_OPOSTAS.** Diante da mesma referência, uns creem e outros vão aos opositores (João 11:45–46). A regra "mesma referência ⟹ mesma reação" **contradiz** o registro.
- **DOIS_CASOS_FATO_RECONHECIDO.** Nos dois registros em que o opositor reconhece o fato (Atos 4:16; João 11:47), a reação é hostil (ordem de calar; plano de matar). Afirmar que nenhum desses casos foi hostil **contradiz** a contagem.

## 4. Resultado da m11

1. **A referência física decide o fato, mas não a reação.** Hora do dia (m01), moeda (m02), homem curado (m04), presença dos presos (m10), Lázaro vivo (m11): em todos, o fato observável fecha a TROCA sobre *o que aconteceu*. No caso de Lázaro, o mesmo fato fechado produz crença e plano de morte. Na linguagem do Todo, a referência zera a incerteza da leitura e não determina a resposta.
2. **Reconhecer o fato não impede a reação contrária.** Isso aparece duas vezes: em Atos 4 os opositores não podem negar e ordenam silêncio, e em João 11 reconhecem os sinais e planejam a morte. A própria referência vira alvo (João 12:10–11).
3. **O texto registra esse ponto também como enunciado.** Na parábola de Lucas 16:31, nem alguém ressuscitado convence quem não ouve. A trilha registra isso como texto, sem estender a pessoas de hoje.
4. **Concordância com a rodada 11 do GPT.** Ações semelhantes não identificam a mesma operação, e a mesma referência não produz a mesma reação. A ligação entre causa e reação fica EM ABERTO nos dois casos.

## 5. Próximo ponto

A rodada 11 do GPT anuncia Gálatas 4:4–7, onde o Filho é enviado e depois o "Espírito de seu Filho" é enviado. A m01 já usou Gálatas 4:4 para o primeiro envio. A próxima rodada desta trilha vai formalizar os dois envios no mesmo trecho: quem envia, o que é enviado, para onde, e em que ordem. O ponto é ver se o texto liga o segundo envio ao primeiro como continuação, o que daria a "estrutura de envio repetida" da m08, ou como fechamento.

## Integridade

- SHA-256 da rodada 11 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `05b92c3a7e42c7e628120e155143acf108603f9118e40e94bbfb11eedf251172`.
- SHA-256 da m10 desta trilha: `f1aceeff6203d8393c566475125fdcbbc5ae2976864f7ecb9e5e090189341f1d`.
- Commit remoto de partida: `ff69bf8806366a942372daa5881ea9e4dc4c97e1`.
- O hash desta m11 está no arquivo `.sha256` ao lado.
