# 13/11/2026 — PMT 03: controle óptico com disparo elétrico mantido

O PMT 02 mostrou que a deriva de fundo pode produzir excesso espúrio. O Double Chooz identificou emissão luminosa instrumental nas bases de seus PMTs associada a temperatura e alta tensão. [Artigo experimental](https://arxiv.org/abs/1604.06895).

Protocolo proposto: cruzar disparo do LED ligado/desligado com caminho óptico aberto/bloqueado. Manter ganho e limiar, usar relógio de referência também quando o disparo está desligado e normalizar contagens pela exposição observável das mesmas janelas temporais. Repetir as quatro condições em blocos sorteados para investigar deriva.

Modelo aditivo: aa=B (desligado/bloqueado), ab=B+O (desligado/aberto), ba=B+E (ligado/bloqueado), bb=B+O+E+S (ligado/aberto). B,O,E,S são taxas médias em s⁻¹ de fundo basal, caminho aberto, disparo elétrico e resposta ao pulso óptico. Supõe-se estabilidade dos termos e aditividade. O contraste bb−ab−ba+aa recupera S. Na presença de interação instrumental I, recupera S+I. O testemunho B=5, O=1, E=2, S=0 e I=1 s⁻¹ produz taxas 5,6,7,9 s⁻¹ e excesso aparente de 1 s⁻¹. A atribuição requer controle adicional, por exemplo atenuação óptica variável com eletrônica fixa e luz verificada por monitor independente.

## Cosmos e Z3

Comando executado: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-13/pmt03-temporario.mjs. Código 0 após corrigir a sintaxe do temporário. Fórmulas exatas:

```json
[{"id": "FATORIAL_CANCELA", "premissas": {"A": "aa = baseR ∧ ab = baseR + opt ∧ ba = baseR + ele", "B": "est = bb − ab − ba + aa ∧ bb = baseR + opt + ele + sig"}, "alvo": "est = sig", "esperado": "SEGUE"}, {"id": "INTERACAO_ESPURIA", "premissas": {"A": "aa = baseR ∧ ab = baseR + opt ∧ ba = baseR + ele ∧ baseR = 5 ∧ opt = 1 ∧ ele = 2", "B": "est = bb − ab − ba + aa ∧ sig = 0 ∧ inter = 1 ∧ bb = baseR + opt + ele + sig + inter"}, "alvo": "est = 0", "esperado": "CONTRADIZ"}]
```

```text
FATORIAL_CANCELA: premissas=sat; consulta=sat; negacao=unsat
FATORIAL_CANCELA SEGUE [A, B, consulta]
INTERACAO_ESPURIA: premissas=sat; consulta=unsat; negacao=sat
INTERACAO_ESPURIA CONTRADIZ [A, B, consulta]
```

Provas condicionais de álgebra. Sem simulação ou coleta local. A medição citada pertence ao Double Chooz. Base do Tubo consultada e SHA do BOOK conferido. Próximo teste: derivar a variância do contraste e o efeito da alocação de tempo vivo entre condições. Temporário próprio removido.
