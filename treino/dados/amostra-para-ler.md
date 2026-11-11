# Amostra do treino: 30 exemplos para ler

**English:** [amostra-para-ler.en.md](amostra-para-ler.en.md)

Para cada exemplo: a frase como o modelo vai receber, o que a resposta certa diz (lida de volta pelo Cosmos, sem modelo) e a classe que o Z3 deu.
O que conferir: se o "a resposta diz" bate com a frase. Anote o número de qualquer um que pareça errado ou esquisito.

## 1. T-02309 (afirmar-consequente)

**Frase:**
- Se alguém é apicultor, então é otimista.
- Marta é otimista.
- Logo: Marta é apicultora.

**A resposta diz:**
- todo apicultor é otimista
- Marta é otimista
- Logo: Marta é apicultor

**Z3:** SALTO (não decorre)

## 2. T-00398 (cadeia-negada)

**Frase:**
- Todo fazendeiro é colono.
- Se alguém é colono, então é astronauta.
- Cecília é fazendeira.
- Logo: Não é verdade que Cecília é astronauta.

**A resposta diz:**
- todo fazendeiro é colono
- todo colono é astronauta
- Cecília é fazendeiro
- Logo: Cecília não é astronauta

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 3. T-02559 (modus-ponens)

**Frase:**
- Todos os lenhadores são engenhosos.
- Yara é lenhadora.
- Logo: Yara é engenhosa.

**A resposta diz:**
- todo lenhador é engenhoso
- Yara é lenhador
- Logo: Yara é engenhoso

**Z3:** PROVADO (a conclusão decorre)

## 4. T-00810 (ou-so-um-negado)

**Frase:**
- Ou Igor é oleiro ou é robô, mas não as duas coisas.
- Não é verdade que Igor é oleiro.
- Logo: Igor não é robô.

**A resposta diz:**
- (Igor é oleiro ou Igor é robô) e (não é verdade que (Igor é oleiro e Igor é robô))
- Igor não é oleiro
- Logo: Igor não é robô

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 5. T-00283 (escopo-fraco)

**Frase:**
- Todo robô elogia algum tecelão.
- Logo: Existe um tecelão que todo robô elogia.

**A resposta diz:**
- para todo robô x, existe um tecelão y tal que “elogia” vale para x, y
- Logo: existe um tecelão y tal que para todo robô x, “elogia” vale para x, y

**Z3:** SALTO (não decorre)

## 6. T-00851 (todo-que)

**Frase:**
- Cada robô que é ferreiro é confiável.
- Felipe é robô.
- Felipe é ferreiro.
- Logo: Felipe é confiável.

**A resposta diz:**
- para todo x, se (x é robô e x é ferreiro), então x é confiável
- Felipe é robô
- Felipe é ferreiro
- Logo: Felipe é confiável

**Z3:** PROVADO (a conclusão decorre)

## 7. T-01774 (algum-nenhum)

**Frase:**
- Alguns tropeiros são curiosos.
- Logo: Não existe tropeiro que seja curioso.

**A resposta diz:**
- algum tropeiro é curioso
- Logo: nenhum tropeiro é curioso

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 8. T-01877 (relacao-nao-transitiva)

**Frase:**
- Eva acompanha Bianca.
- Bianca acompanha Sérgio.
- Logo: Eva acompanha Sérgio.

**A resposta diz:**
- “acompanha” vale para Eva, Bianca
- “acompanha” vale para Bianca, Sérgio
- Logo: “acompanha” vale para Eva, Sérgio

**Z3:** SALTO (não decorre)

## 9. T-00952 (todo-que-negado)

**Frase:**
- Cada fazendeiro que é novato é alienígena.
- Telma é fazendeira.
- Telma é novata.
- Logo: Não é verdade que Telma é alienígena.

**A resposta diz:**
- para todo x, se (x é fazendeiro e x é novato), então x é alienígena
- Telma é fazendeiro
- Telma é novato
- Logo: Telma não é alienígena

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 10. T-01240 (conversao-nenhum)

**Frase:**
- Não existe ferreiro que seja apicultor.
- Logo: Não há apicultor que seja ferreiro.

**A resposta diz:**
- nenhum ferreiro é apicultor
- Logo: nenhum apicultor é ferreiro

**Z3:** PROVADO (a conclusão decorre)

## 11. T-00412 (se-nao-volta)

**Frase:**
- Caso Eva seja inventora, Zélia é técnica.
- Zélia é técnica.
- Logo: Eva é inventora.

**A resposta diz:**
- se Eva é inventor, então Zélia é técnico
- Zélia é técnico
- Logo: Eva é inventor

**Z3:** SALTO (não decorre)

## 12. T-02013 (conversao-nenhum)

**Frase:**
- Não há vigia que seja lenhador.
- Logo: Não existe lenhador que seja vigia.

**A resposta diz:**
- nenhum vigia é lenhador
- Logo: nenhum lenhador é vigia

**Z3:** PROVADO (a conclusão decorre)

## 13. T-00126 (condicional-negado)

**Frase:**
- Se Júlia é navegadora, Alice é antiga.
- Júlia é navegadora.
- Logo: Alice não é antiga.

**A resposta diz:**
- se Júlia é navegador, então Alice é antigo
- Júlia é navegador
- Logo: Alice não é antigo

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 14. T-00206 (algum-nao-nem-todo)

**Frase:**
- Algum inventor não é moleiro.
- Logo: Nem todo inventor é moleiro.

**A resposta diz:**
- existe um inventor x tal que x não é moleiro
- Logo: não é verdade que (todo inventor é moleiro)

**Z3:** PROVADO (a conclusão decorre)

## 15. T-02207 (nenhum-algum)

**Frase:**
- Nenhum lenhador é explorador.
- Logo: Algum lenhador é explorador.

**A resposta diz:**
- nenhum lenhador é explorador
- Logo: algum lenhador é explorador

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 16. W-306 (generico-negado)

**Frase:**
- Os arautos são interdependentes.
- Teodora é arauta.
- Logo: Teodora não é interdependente.

**A resposta diz:**
- todo arauto é interdependente
- Teodora é arauto
- Logo: Teodora não é interdependente

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 17. W-078 (sem-ponte-rel)

**Frase:**
- Todos os sineiros são donos da própria função.
- Cada almocreve é necessário ao todo.
- Logo: Nenhum sineiro desmerece um almocreve.

**A resposta diz:**
- todo sineiro é dono da própria função
- todo almocreve é necessário ao todo
- Logo: para todo x, para todo y, se (x é sineiro e y é almocreve), então não é verdade que “desmerece” vale para x, y

**Z3:** SALTO (não decorre)

## 18. W-052 (ponte-rel)

**Frase:**
- Todo faroleiro é ourives.
- Ninguém que seja ourives silencia um sineiro.
- Logo: Nenhum faroleiro silencia um sineiro.

**A resposta diz:**
- todo faroleiro é ourives
- para todo x, para todo y, se (x é ourives e y é sineiro), então não é verdade que “silencia” vale para x, y
- Logo: para todo x, para todo y, se (x é faroleiro e y é sineiro), então não é verdade que “silencia” vale para x, y

**Z3:** PROVADO (a conclusão decorre)

## 19. W-755 (generico-negado)

**Frase:**
- Os faroleiros são curandeiros.
- Jandira é faroleira.
- Logo: Não é verdade que Jandira é curandeira.

**A resposta diz:**
- todo faroleiro é curandeiro
- Jandira é faroleiro
- Logo: Jandira não é curandeiro

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 20. W-296 (grupo-volta)

**Frase:**
- Todos os curandeiros estão entre os arautos.
- Berenice está entre os arautos.
- Logo: Berenice está entre os curandeiros.

**A resposta diz:**
- todo curandeiro é arauto
- Berenice é arauto
- Logo: Berenice é curandeiro

**Z3:** SALTO (não decorre)

## 21. W-228 (nenhum-algum)

**Frase:**
- Não há acólito que seja parte do todo.
- Logo: Existe um acólito que é parte do todo.

**A resposta diz:**
- nenhum acólito é parte do todo
- Logo: algum acólito é parte do todo

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 22. W-028 (ou-so-um-negado)

**Frase:**
- Marieta é parte do todo ou alquimista, mas não os dois.
- Marieta não é parte do todo.
- Logo: Não é verdade que Marieta é alquimista.

**A resposta diz:**
- (Marieta é parte do todo ou Marieta é alquimista) e (não é verdade que (Marieta é parte do todo e Marieta é alquimista))
- Marieta não é parte do todo
- Logo: Marieta não é alquimista

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 23. W-012 (so-pode-tollens)

**Frase:**
- Só pode convocar o conselho quem é curandeiro.
- Não é verdade que Saturnino é curandeiro.
- Logo: Não é verdade que Saturnino pode convocar o conselho.

**A resposta diz:**
- todo algo que pode convocar o conselho é curandeiro
- Saturnino não é curandeiro
- Logo: Saturnino não é algo que pode convocar o conselho

**Z3:** PROVADO (a conclusão decorre)

## 24. W-875 (rel-instancia)

**Frase:**
- Nenhum pajem acolhe algum acólito.
- Rosalina é pajem.
- Prudêncio é acólito.
- Logo: Rosalina não acolhe Prudêncio.

**A resposta diz:**
- para todo x, para todo y, se (x é pajem e y é acólito), então não é verdade que “acolhe” vale para x, y
- Rosalina é pajem
- Prudêncio é acólito
- Logo: não é verdade que “acolhe” vale para Rosalina, Prudêncio

**Z3:** PROVADO (a conclusão decorre)

## 25. W-115 (ou-so-um-negado)

**Frase:**
- Ou Prudêncio é singular ou é perene, mas não as duas coisas.
- Prudêncio não é singular.
- Logo: Prudêncio não é perene.

**A resposta diz:**
- (Prudêncio é singular ou Prudêncio é perene) e (não é verdade que (Prudêncio é singular e Prudêncio é perene))
- Prudêncio não é singular
- Logo: Prudêncio não é perene

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 26. W-427 (grupo-volta)

**Frase:**
- Todos os barqueiros são pajens.
- Caetano está entre os pajens.
- Logo: Caetano faz parte dos barqueiros.

**A resposta diz:**
- todo barqueiro é pajem
- Caetano é pajem
- Logo: Caetano é barqueiro

**Z3:** SALTO (não decorre)

## 27. W-528 (ou-so-um-negado)

**Frase:**
- Jandira é imperfeita ou insubstituível, mas não os dois.
- Jandira não é imperfeita.
- Logo: Não é verdade que Jandira é insubstituível.

**A resposta diz:**
- (Jandira é imperfeito ou Jandira é insubstituível) e (não é verdade que (Jandira é imperfeito e Jandira é insubstituível))
- Jandira não é imperfeito
- Logo: Jandira não é insubstituível

**Z3:** CONTRADIÇÃO (as premissas provam o contrário)

## 28. W-398 (contrapositiva)

**Frase:**
- Se Anselmo é perene, Nicanor é dono da própria função.
- Nicanor não é dono da própria função.
- Logo: Não é verdade que Anselmo é perene.

**A resposta diz:**
- se Anselmo é perene, então Nicanor é dono da própria função
- Nicanor não é dono da própria função
- Logo: Anselmo não é perene

**Z3:** PROVADO (a conclusão decorre)

## 29. W-635 (sem-ponte-rel)

**Frase:**
- Qualquer pajem é cronista.
- Cada faroleiro é perene.
- Logo: Nenhum pajem reconhece um faroleiro.

**A resposta diz:**
- todo pajem é cronista
- todo faroleiro é perene
- Logo: para todo x, para todo y, se (x é pajem e y é faroleiro), então não é verdade que “reconhece” vale para x, y

**Z3:** SALTO (não decorre)

## 30. W-438 (sem-ponte-rel)

**Frase:**
- Todos os curandeiros são singulares.
- Se alguém é almocreve, então é acólito.
- Logo: Nenhum curandeiro anula algum almocreve.

**A resposta diz:**
- todo curandeiro é singular
- todo almocreve é acólito
- Logo: para todo x, para todo y, se (x é curandeiro e y é almocreve), então não é verdade que “anula” vale para x, y

**Z3:** SALTO (não decorre)
