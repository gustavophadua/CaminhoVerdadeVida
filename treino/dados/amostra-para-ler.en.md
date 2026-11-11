# Training sample: 30 examples to read

**Português:** [amostra-para-ler.md](amostra-para-ler.md). This is a translation for readers of English; the training
data are in Portuguese, and the reading of step E4 is done on the Portuguese file. One thing the translation hides: the
Portuguese reading back uses the masculine form of the predicate ("Marta é apicultor" for "Marta is a beekeeper", where
the sentence says "apicultora"), because a predicate has a single reading.

For each example: the sentence as the model will receive it, what the right answer says (read back by Cosmos, without a
model) and the class that Z3 gave.
What to check: whether "the answer says" matches the sentence. Write down the number of any that seem wrong or odd.

## 1. T-02309 (affirming the consequent)

**Sentence:**
- If someone is a beekeeper, then they are optimistic.
- Marta is optimistic.
- Therefore: Marta is a beekeeper.

**The answer says:**
- every beekeeper is optimistic
- Marta is optimistic
- Therefore: Marta is a beekeeper

**Z3:** LEAP (does not follow)

## 2. T-00398 (negated chain)

**Sentence:**
- Every farmer is a settler.
- If someone is a settler, then they are an astronaut.
- Cecília is a farmer.
- Therefore: It is not true that Cecília is an astronaut.

**The answer says:**
- every farmer is a settler
- every settler is an astronaut
- Cecília is a farmer
- Therefore: Cecília is not an astronaut

**Z3:** CONTRADICTION (the premises prove the opposite)

## 3. T-02559 (modus ponens)

**Sentence:**
- All woodcutters are resourceful.
- Yara is a woodcutter.
- Therefore: Yara is resourceful.

**The answer says:**
- every woodcutter is resourceful
- Yara is a woodcutter
- Therefore: Yara is resourceful

**Z3:** PROVED (the conclusion follows)

## 4. T-00810 (exclusive or, negated)

**Sentence:**
- Either Igor is a potter or he is a robot, but not both.
- It is not true that Igor is a potter.
- Therefore: Igor is not a robot.

**The answer says:**
- (Igor is a potter or Igor is a robot) and (it is not true that (Igor is a potter and Igor is a robot))
- Igor is not a potter
- Therefore: Igor is not a robot

**Z3:** CONTRADICTION (the premises prove the opposite)

## 5. T-00283 (weak scope)

**Sentence:**
- Every robot praises some weaver.
- Therefore: There is a weaver whom every robot praises.

**The answer says:**
- for every robot x, there is a weaver y such that "praises" holds for x, y
- Therefore: there is a weaver y such that for every robot x, "praises" holds for x, y

**Z3:** LEAP (does not follow)

## 6. T-00851 (every… that)

**Sentence:**
- Each robot that is a blacksmith is reliable.
- Felipe is a robot.
- Felipe is a blacksmith.
- Therefore: Felipe is reliable.

**The answer says:**
- for every x, if (x is a robot and x is a blacksmith), then x is reliable
- Felipe is a robot
- Felipe is a blacksmith
- Therefore: Felipe is reliable

**Z3:** PROVED (the conclusion follows)

## 7. T-01774 (some–none)

**Sentence:**
- Some drovers are curious.
- Therefore: There is no drover who is curious.

**The answer says:**
- some drover is curious
- Therefore: no drover is curious

**Z3:** CONTRADICTION (the premises prove the opposite)

## 8. T-01877 (non-transitive relation)

**Sentence:**
- Eva accompanies Bianca.
- Bianca accompanies Sérgio.
- Therefore: Eva accompanies Sérgio.

**The answer says:**
- "accompanies" holds for Eva, Bianca
- "accompanies" holds for Bianca, Sérgio
- Therefore: "accompanies" holds for Eva, Sérgio

**Z3:** LEAP (does not follow)

## 9. T-00952 (every… that, negated)

**Sentence:**
- Each farmer who is a novice is an alien.
- Telma is a farmer.
- Telma is a novice.
- Therefore: It is not true that Telma is an alien.

**The answer says:**
- for every x, if (x is a farmer and x is a novice), then x is an alien
- Telma is a farmer
- Telma is a novice
- Therefore: Telma is not an alien

**Z3:** CONTRADICTION (the premises prove the opposite)

## 10. T-01240 (conversion of "no")

**Sentence:**
- There is no blacksmith who is a beekeeper.
- Therefore: There is no beekeeper who is a blacksmith.

**The answer says:**
- no blacksmith is a beekeeper
- Therefore: no beekeeper is a blacksmith

**Z3:** PROVED (the conclusion follows)

## 11. T-00412 (if, not reversed)

**Sentence:**
- In case Eva is an inventor, Zélia is a technician.
- Zélia is a technician.
- Therefore: Eva is an inventor.

**The answer says:**
- if Eva is an inventor, then Zélia is a technician
- Zélia is a technician
- Therefore: Eva is an inventor

**Z3:** LEAP (does not follow)

## 12. T-02013 (conversion of "no")

**Sentence:**
- There is no watchman who is a woodcutter.
- Therefore: There is no woodcutter who is a watchman.

**The answer says:**
- no watchman is a woodcutter
- Therefore: no woodcutter is a watchman

**Z3:** PROVED (the conclusion follows)

## 13. T-00126 (negated conditional)

**Sentence:**
- If Júlia is a navigator, Alice is ancient.
- Júlia is a navigator.
- Therefore: Alice is not ancient.

**The answer says:**
- if Júlia is a navigator, then Alice is ancient
- Júlia is a navigator
- Therefore: Alice is not ancient

**Z3:** CONTRADICTION (the premises prove the opposite)

## 14. T-00206 (some-not, not every)

**Sentence:**
- Some inventor is not a miller.
- Therefore: Not every inventor is a miller.

**The answer says:**
- there is an inventor x such that x is not a miller
- Therefore: it is not true that (every inventor is a miller)

**Z3:** PROVED (the conclusion follows)

## 15. T-02207 (none–some)

**Sentence:**
- No woodcutter is an explorer.
- Therefore: Some woodcutter is an explorer.

**The answer says:**
- no woodcutter is an explorer
- Therefore: some woodcutter is an explorer

**Z3:** CONTRADICTION (the premises prove the opposite)

## 16. W-306 (negated generic)

**Sentence:**
- Heralds are interdependent.
- Teodora is a herald.
- Therefore: Teodora is not interdependent.

**The answer says:**
- every herald is interdependent
- Teodora is a herald
- Therefore: Teodora is not interdependent

**Z3:** CONTRADICTION (the premises prove the opposite)

## 17. W-078 (no link, relation)

**Sentence:**
- All bell ringers own their own function.
- Each muleteer is necessary to the whole.
- Therefore: No bell ringer belittles a muleteer.

**The answer says:**
- every bell ringer owns their own function
- every muleteer is necessary to the whole
- Therefore: for every x, for every y, if (x is a bell ringer and y is a muleteer), then it is not true that "belittles" holds for x, y

**Z3:** LEAP (does not follow)

## 18. W-052 (link, relation)

**Sentence:**
- Every lighthouse keeper is a goldsmith.
- No one who is a goldsmith silences a bell ringer.
- Therefore: No lighthouse keeper silences a bell ringer.

**The answer says:**
- every lighthouse keeper is a goldsmith
- for every x, for every y, if (x is a goldsmith and y is a bell ringer), then it is not true that "silences" holds for x, y
- Therefore: for every x, for every y, if (x is a lighthouse keeper and y is a bell ringer), then it is not true that "silences" holds for x, y

**Z3:** PROVED (the conclusion follows)

## 19. W-755 (negated generic)

**Sentence:**
- Lighthouse keepers are healers.
- Jandira is a lighthouse keeper.
- Therefore: It is not true that Jandira is a healer.

**The answer says:**
- every lighthouse keeper is a healer
- Jandira is a lighthouse keeper
- Therefore: Jandira is not a healer

**Z3:** CONTRADICTION (the premises prove the opposite)

## 20. W-296 (group, reversed)

**Sentence:**
- All healers are among the heralds.
- Berenice is among the heralds.
- Therefore: Berenice is among the healers.

**The answer says:**
- every healer is a herald
- Berenice is a herald
- Therefore: Berenice is a healer

**Z3:** LEAP (does not follow)

## 21. W-228 (none–some)

**Sentence:**
- There is no acolyte who is part of the whole.
- Therefore: There is an acolyte who is part of the whole.

**The answer says:**
- no acolyte is part of the whole
- Therefore: some acolyte is part of the whole

**Z3:** CONTRADICTION (the premises prove the opposite)

## 22. W-028 (exclusive or, negated)

**Sentence:**
- Marieta is part of the whole or an alchemist, but not both.
- Marieta is not part of the whole.
- Therefore: It is not true that Marieta is an alchemist.

**The answer says:**
- (Marieta is part of the whole or Marieta is an alchemist) and (it is not true that (Marieta is part of the whole and Marieta is an alchemist))
- Marieta is not part of the whole
- Therefore: Marieta is not an alchemist

**Z3:** CONTRADICTION (the premises prove the opposite)

## 23. W-012 (only can, tollens)

**Sentence:**
- Only someone who is a healer can convene the council.
- It is not true that Saturnino is a healer.
- Therefore: It is not true that Saturnino can convene the council.

**The answer says:**
- everything that can convene the council is a healer
- Saturnino is not a healer
- Therefore: Saturnino is not something that can convene the council

**Z3:** PROVED (the conclusion follows)

## 24. W-875 (relation, instance)

**Sentence:**
- No page welcomes any acolyte.
- Rosalina is a page.
- Prudêncio is an acolyte.
- Therefore: Rosalina does not welcome Prudêncio.

**The answer says:**
- for every x, for every y, if (x is a page and y is an acolyte), then it is not true that "welcomes" holds for x, y
- Rosalina is a page
- Prudêncio is an acolyte
- Therefore: it is not true that "welcomes" holds for Rosalina, Prudêncio

**Z3:** PROVED (the conclusion follows)

## 25. W-115 (exclusive or, negated)

**Sentence:**
- Either Prudêncio is singular or he is perennial, but not both.
- Prudêncio is not singular.
- Therefore: Prudêncio is not perennial.

**The answer says:**
- (Prudêncio is singular or Prudêncio is perennial) and (it is not true that (Prudêncio is singular and Prudêncio is perennial))
- Prudêncio is not singular
- Therefore: Prudêncio is not perennial

**Z3:** CONTRADICTION (the premises prove the opposite)

## 26. W-427 (group, reversed)

**Sentence:**
- All boatmen are pages.
- Caetano is among the pages.
- Therefore: Caetano is one of the boatmen.

**The answer says:**
- every boatman is a page
- Caetano is a page
- Therefore: Caetano is a boatman

**Z3:** LEAP (does not follow)

## 27. W-528 (exclusive or, negated)

**Sentence:**
- Jandira is imperfect or irreplaceable, but not both.
- Jandira is not imperfect.
- Therefore: It is not true that Jandira is irreplaceable.

**The answer says:**
- (Jandira is imperfect or Jandira is irreplaceable) and (it is not true that (Jandira is imperfect and Jandira is irreplaceable))
- Jandira is not imperfect
- Therefore: Jandira is not irreplaceable

**Z3:** CONTRADICTION (the premises prove the opposite)

## 28. W-398 (contrapositive)

**Sentence:**
- If Anselmo is perennial, Nicanor owns his own function.
- Nicanor does not own his own function.
- Therefore: It is not true that Anselmo is perennial.

**The answer says:**
- if Anselmo is perennial, then Nicanor owns his own function
- Nicanor does not own his own function
- Therefore: Anselmo is not perennial

**Z3:** PROVED (the conclusion follows)

## 29. W-635 (no link, relation)

**Sentence:**
- Any page is a chronicler.
- Each lighthouse keeper is perennial.
- Therefore: No page recognizes a lighthouse keeper.

**The answer says:**
- every page is a chronicler
- every lighthouse keeper is perennial
- Therefore: for every x, for every y, if (x is a page and y is a lighthouse keeper), then it is not true that "recognizes" holds for x, y

**Z3:** LEAP (does not follow)

## 30. W-438 (no link, relation)

**Sentence:**
- All healers are singular.
- If someone is a muleteer, then they are an acolyte.
- Therefore: No healer annuls any muleteer.

**The answer says:**
- every healer is singular
- every muleteer is an acolyte
- Therefore: for every x, for every y, if (x is a healer and y is a muleteer), then it is not true that "annuls" holds for x, y

**Z3:** LEAP (does not follow)
