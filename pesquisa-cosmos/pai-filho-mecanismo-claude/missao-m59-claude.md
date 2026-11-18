# 16/11/2026 — Pai envia, Filho reage, mecanismo fecha — m59: arrepender-se como sair do MRU (T14)

Esta rodada põe no Tubo a premissa do autor de que arrepender-se é largar o MRU, e confere com a física e o texto. A rodada do GPT mais recente é a 13, "clamor e testemunho" (SHA-256 `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`). Aqui ela é só o ponto de partida conferido da trilha.

**Método** (o mesmo da m01 à m58):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Entram só fatos registrados no texto. A busca foi mecânica: "arrepend" no Novo Testamento e no Apocalipse; leis de Newton, na Bíblia Livre (edição de 2018, CC BY 4.0).
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas. Sem fonte, a saída é EM ABERTO.

**Execução.** O Z3 rodou uma consulta por vez, pelo script mecânico de publicação.

## 1. Fatos registrados (fonte, sem interpretação)

O autor deu a variável que faltava na m58.

**Premissa do autor [S-U]:** "Arrepender-te é largar o MRU, ou seja, evoluir só aos seus olhos observadores para reagir aos mecanismos do mundo em prol do Filho." E: "'ao que vencer' é mais pra frente."

Nesta rodada a premissa entra no Tubo como **T14 [S-U]: Arrepende(x) ⟺ ¬MRU(x)**: quem se arrepende sai do movimento retilíneo uniforme. "Ao que vencer" fica para depois, como o autor pediu.

### O MRU na física (fonte: 1ª e 2ª leis de Newton; relatividade de Galileu)

| Lei | O que diz |
|---|---|
| 1ª lei (inércia) | sem força resultante, o corpo continua em MRU |
| 2ª lei | força resultante ≠ 0 ⟹ aceleração ≠ 0 ⟹ sai do MRU |
| referenciais inerciais | a aceleração é a mesma medida em todos eles; sair do MRU não é efeito de um só observador inercial |

### O arrependimento no texto

| Verso | O que diz | Ligação com T14 |
|---|---|---|
| Ap 3:19 | "Eu repreendo e castigo a todos quantos eu amo; portanto sê zeloso, e te arrepende" | a repreensão vem antes ("portanto") |
| Rm 2:4 | "a bondade de Deus [...] te conduz ao arrependimento" | algo de fora conduz |
| 2 Co 7:10 | "a tristeza segundo Deus opera arrependimento" | algo opera |
| Ap 2:5 | "lembra-te de onde tu caíste, e arrepende-te, e faze as primeiras obras" | ponto de referência ("de onde caíste") e obras |
| At 3:19; 26:20 | "arrependei-vos e convertei-vos"; "fazendo obras dignas de arrependimento" | mudança de direção e obras |
| Mt 3:8 | "Dai, pois, frutos condizentes com o arrependimento" | fruto visível |
| Lc 15:7 | "haverá mais alegria no céu por um pecador que se arrepende" | outros veem a mudança |
| Ap 2:21 | "dei a ela tempo para que se arrependesse; mas ela não se arrependeu" | tempo dado, sem saída do MRU |
| Ap 9:20; 16:9 | depois das pragas e do "grande calor", "não se arrependeram"; "blasfemaram" | força aplicada, sem arrependimento |

## 2. Mecanismo

| Ponto | Resultado |
|---|---|
| T14 com T06 (o fragmento não domina a própria curva) | **compatível:** se a curva muda, a força vem de fora. O texto põe algo de fora antes do arrependimento (Ap 3:19; Rm 2:4; 2 Co 7:10). |
| T14 com Ap 2:5 ("lembra-te de onde caíste") | **compatível:** sair do MRU se mede contra um ponto de referência. |
| "só aos seus olhos" | **contradiz** a física e o texto. Pela física, a aceleração é a mesma para todo observador inercial. Pelo texto, o arrependimento traz obras, frutos e "alegria no céu" (At 26:20; Mt 3:8; Lc 15:7): outros veem. |
| força ⟹ sempre sai do MRU (2ª lei) | **contradiz** Ap 9:20 e 16:9: houve força e não houve arrependimento. |
| força externa anulada pela resistência da pessoa (resultante zero) | **EM ABERTO:** explicaria Ap 9:20 e 16:9 pela 1ª lei e por T06 ("a rota muda pela resistência"). Mas o texto registra a blasfêmia, não uma medida de força. |

Na física, a força sempre acelera. No texto, a força às vezes não leva ao arrependimento. Para T14 fechar com Newton, falta um termo de resistência da pessoa que possa anular a força. O papel do Espírito como mecanismo é do modelo do usuário [S-U].

## 3. Consultas no Z3 (m59)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ARREPENDER_E_SAIR_DO_MRU",["ar = 1","mr = 1 − ar"],"mr = 0","SEGUE",["sat","sat","unsat"],0],
["FORCA_VEM_DE_FORA",["ac = 1","cs = 0","fx = ac − cs"],"fx = 1","SEGUE",["sat","sat","unsat"],0],
["SO_AOS_SEUS_OLHOS",["ap = 1","ob = ap","ou = ob"],"ou = 0","CONTRADIZ",["sat","unsat","sat"],0],
["FORCA_SEMPRE_ARREPENDE",["pr = 2","na = 2","sim = pr − na"],"sim = pr","CONTRADIZ",["sat","unsat","sat"],0],
["RESISTENCIA_ANULA_FORCA",["fx = 1","rs ≥ 0","k × (1 − k) = 0"],"k = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **ARREPENDER_E_SAIR_DO_MRU.** Com T14, quem se arrepende não está em MRU.
- **FORCA_VEM_DE_FORA.** Com T06 (a curva não é dominada por si), a força que tira do MRU vem de fora. Fecha com Ap 3:19 e Rm 2:4.
- **SO_AOS_SEUS_OLHOS.** Dizer que sair do MRU fica só no olhar de quem muda **contradiz** a aceleração igual em todo referencial inercial e "fazendo obras dignas de arrependimento" (At 26:20).
- **FORCA_SEMPRE_ARREPENDE.** Dizer que a força aplicada sempre leva ao arrependimento **contradiz** Ap 9:20 e 16:9.
- **RESISTENCIA_ANULA_FORCA.** Uma resistência igual e oposta daria resultante zero e manteria o MRU. O texto não mede isso. Fica EM ABERTO.

## 4. Resultado da m59

1. **T14 [S-U] entra no Tubo sem quebrar T01–T13.** Arrepender-se = sair do MRU, por força de fora (T06; Ap 3:19; Rm 2:4), medida contra um ponto de referência (Ap 2:5).
2. **"Só aos seus olhos" não fecha.** Sair do MRU é visto por qualquer observador inercial. O texto pede obras e frutos e registra alegria no céu.
3. **A 2ª lei sozinha não fecha com o Apocalipse.** Houve pragas e calor, e não houve arrependimento (9:20; 16:9).
4. **Fica EM ABERTO:** um termo de resistência da pessoa que anule a força. Com ele, T14 fecha com a física e com o texto, mas o autor precisa dar esse termo com fonte.
5. **"Ao que vencer" fica para depois**, como o autor pediu.

## 5. Próximo ponto

Para fechar T14, falta o termo de resistência [S-U]. Depois vem "ao que vencer".

## Integridade

- SHA-256 da rodada 13 do GPT (pai-filho-espirito/2026-11-16), conferido nos bytes contra o `.sha256` dele: `2e76390d1b4d3800d049ff2744b1ee37e961f7eeb633ee47b17cc8cac892dd71`.
- SHA-256 da m58 desta trilha: `26e60a5fe724c109c101d2cc728240adebd13a0ea97a6ab18a908a5851a6b5f8`.
- Commit remoto de partida: `53051921799f0635f0cc4e22deb640de9eee2bdf`, que ainda não contém a fonte (conferido com `git ls-tree`); ela foi lida e conferida na pasta local.
- O hash desta m59 está no arquivo `.sha256` ao lado.
