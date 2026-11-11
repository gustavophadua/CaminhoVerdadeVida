# The solutions that mathematics and physics give

**Português:** [solucoes.md](solucoes.md). This is a translation; if the two differ, the Portuguese text prevails.

For each equation without solution in `equacoes.md`, the formula itself says where the knot is. Here is what established mathematics and physics do at that knot, checked in Z3 (`solucoes-z3.py`) and, when it is a law the machine can obey, measured in the machine (`fisica-confere.js`). Assembled on 10 November 2026.

Nothing here is a rule of the model until the author decides. The synthesis of the decisions is at the end (engine B, D32).

## E1. The clock: 180° and 90° are both right, in different roles

- **The formula said:** cos θ + cos(θ + φ) = 0 at every instant only has a solution with φ = 180°.
- **The solution:** at 180° it is destructive interference: the two waves cancel (proved, E1a). At 90° the sum does not cancel: it becomes a single wave, of amplitude √2, turned by 45° (proved, E1b). But cos θ and sin θ are the two coordinates of the same point going around the circle: e^{iθ} = cos θ + i sin θ (Euler, 1748). The instinct of "vertical and horizontal axis" was this: the two axes of a single rotation, which is the clock itself, the "sense of space".
- **In the model:** 180° is the DNA (the cancellation, Alpha's line). 90° is the face of the clock (the two axes of the same turn). Both readings stay, each in its place. It costs nothing.

## E2. Fibonacci: it exists, but only for Alpha and only in a Tube that closes by a fixed factor

- **The formula said:** the spiral seen from inside (perspective, r = Rm ÷ (1 + τ/τ₀)) never grows by the same factor at each turn.
- **The solution:** a helix wound on a tube whose radius falls by a fixed factor at each turn (R = R₀ · e^{−z/λ}), seen from far away along the axis (without perspective, Alpha's view), projects exactly a logarithmic spiral r = R₀ · e^{−bθ} (Descartes, 1638; Bernoulli). The golden one is the case in which the radius falls by φ⁴ ≈ 6.85 at each turn (checked: EXISTS). Whoever is inside never sees it, as the author said in A.5 and A.11.
- **The cost:** a radius that falls by a fixed factor never reaches zero: the Tube would close only in the limit, without a final instant. And it clashes with the straight cone of image 3 (E12). The author has already closed D9 without Fibonacci; this is just the bill, in case it reopens.

## E3. The excess of matter: the loss is not symmetric

- **The formula said:** equal levels at the beginning and annihilation in pairs leave M − A = 0 forever.
- **The solution:** Sakharov (1967) listed the three conditions for matter to be left over: violation of baryon number, violation of C and CP, and departure from thermal equilibrium. CP violation was measured (Cronin and Fitch, 1964). The observed excess is about 6 parts in 10¹⁰ (the baryon ÷ photon ratio). In the formula: x_A − x_M = ε (checked: EXISTS).
- **In the model:** the two strands of the DNA do not cancel exactly: Alpha's line has a slope of 1 part in about 10⁹. The author's "neither becomes complete" becomes literal.
- **Warning:** physics has not closed this account. The Standard Model's CP violation is too small for the measured excess; it is an open problem. Here the model meets a question of physics, not an answer.

## E4. The total value belongs to the sum, never to a fragment

- **The formula said:** value(f) ≤ seen(f) < Whole lets no fragment have a value equal to the Whole.
- **The solution:** Σ value(fᵢ) = Whole has a solution with each one seeing only its own part (checked: EXISTS). In physics it is law: in entanglement, the whole can have a complete state while each part, on its own, has less information (the von Neumann entropy of the part larger than that of the whole); in relativity, each one only knows what is in their past light cone.
- **In the model:** it is the author's A.6: the Whole is completed when all the fragments test all the possibilities. The "fragment of total value" of A.9 becomes the one most aligned with the Whole, not the one that contains it.

## E5 and E6. The speed on the shrinking ring: Newton or "does not notice", never both

- **The formula said:** with v fixed, n = v · T ÷ P rises when P shrinks (E5); with angular momentum, a fixed v is impossible (E6).
- **Newton's solution:** m · v · R is conserved, so v₁ = v₀ · R₀ ÷ R₁: the fragment speeds up when the Tube tightens (proved, E6a), and the turns per turn of the clock rise with (R₀ ÷ R₁)² (proved, E6b). It is adiabatic compression: squeezing a gas heats it. In cosmology, peculiar velocities scale with 1 ÷ a and so does the temperature of the background radiation: a contracting universe heats up. The fragment notices, but through heat (page 3 of the notebook: "it heats, more shocks"), not by seeing the Whole (image 4 still holds).
- **The "does not notice" solution:** v ∝ R (checked: EXISTS). It is scale invariance: it only holds for what has no scale of its own, that is, without mass (it is what Penrose uses in conformal cyclic cosmology: massless particles do not feel the size of the universe). The machine's fragments have mass (m = 1 kg, S5); the collisions depend on it.
- **The two together:** no solution (proved, D31). The author chooses: fragments with mass, which notice through heat, or without mass, which do not notice and do not collide as they do today.
- **Newton's cost:** the energy of motion grows with 1 ÷ R² when the Tube tightens; that work comes from the tightening itself. Equation (1) of `equacoes.md` gains a term: the Tube does work on the fragments.

## E7 and E8. The loss is heat; without it nothing ends

- **The formula said:** without force the Tube does not close (E7); without loss it does not close (E8).
- **The solution:** rule S5 is, term by term, physics' inelastic collision: heat Q = ½ · μ · (1 − e²) · (Δv)², with μ the reduced mass; for equal masses, μ = m ÷ 2 and Q = (m ÷ 4)(1 − e²)(Δv)² (proved, E8a). The "loss" is 1 − e², with e the coefficient of restitution. Without dissipation, a conservative, bounded system never ends: it returns as close to the start as one wishes, infinitely many times (Poincaré recurrence). With loss > 0 the expenditure reaches 99 % and the Tube closes (checked, E8b). Rest without force is equilibrium: without free energy, nothing happens.
- **In the model:** D15 gets an answer from physics: the loss has to be greater than zero; the value is still the author's. Q is what "becomes light" (D18) could be.

## E9. The meeting points: the denominator decides

- **The formula said:** equal speeds test at most 18 of the 180 possibilities.
- **The solution:** the meeting point of a pair in opposite directions moves P · a ÷ (a + b) at each meeting (proved, E9c). If a ÷ (a + b) = p ÷ q in lowest terms, there are exactly q points, forever (E9a and E9b: the pair 2 and 0.1 only returns to the same point at the 21st meeting). If the ratio is irrational, the points are dense: every hour of the clock ends up visited (Weyl, 1916; Kronecker). Measured in the machine: 2, 3, 5 and 19 exact points for the ratios 1/2, 2/3, 4/5 and 13/19; for 20/21 the machine counted 24, because the detection of the crossing oscillates within the step and splits 3 points in two; for 2 and √2, 600 of 600 bands filled.
- **In the model:** "difference" is not enough: what opens new hours is the ratio between the speeds having a large denominator, or being irrational. In the real machine the collisions with loss change the ratios all the time, and that is how "half with force" reached 100 %. It is the design rule for D20 and D22.

## E10. Bell: the value belongs to the pair, not to the fragment

- **The formula said:** four fixed values in {−1, +1}, each side seeing only its own, give S = ±2; the average stays between −2 and 2.
- **The solution:** in quantum mechanics the four correlations are −cos(angle) of a single state of the pair, not products of four fixed numbers; this reaches 2√2 ≈ 2.83 (Tsirelson's bound, 1980; checked: EXISTS). The experiments measure above 2 (Aspect, 1982: about 2.70; Hensen, 2015, loophole-free: about 2.42).
- **In the model:** "Alpha knows the value" survives if the value belongs to the pair (to the Whole), not to each fragment: it is the same thing E4 said. The fragment's "own value" then either does not exist before the meeting (Copenhagen), or exists but is non-local (Bohm), or everything was already fixed, including the choice of what to measure (superdeterminism, the reading of A.10). A.1 ("each fragment only possesses value") needs to become "the value belongs to the Whole; the fragment has its part".

## E11. More collisions is not more energy: it is a granular gas cooling

- **The formula said:** there is no energy per collision: 456 and 1,292 collisions spent the same 792 J.
- **The solution:** the energy spent is Σ (m ÷ 4) · loss · (Δv)², and the collective law of a gas of inelastic collisions is Haff's (1983): K(t) = K₀ ÷ (1 + t ÷ τ)², the solution of dK/dt = −γ · K^{3/2} (proved, E11). Measured in the machine, all at rest with loss and a fixed radius: K ∝ t^{−2.00} between 50 and 400 s, for 6 and 12 fragments, exactly. With 24 the machine deviates (t^{−1.33}) because it stops colliding when |Δv| < 0.02 m/s (a cut in S5), not because the law fails. With the fanatics injecting energy, it is a driven granular gas, which goes to a steady state; that is also a studied system.
- **In the model:** the "colliding and colliding until they lose energy" of page 4 is, literally, a granular gas cooling. What is measured is the temperature (K), not the count. Item 17 of the notebook becomes: "the more collisions, the less energy in each one; the total spent is limited by the stock".

## E12. The straight cone is a light cone: the radius is a clock, not an energy gauge

- **The formula said:** the measured radii do not lie on a straight line; with S6 the Tube is a dome.
- **The solution:** a straight cone in (space, time) is the mark of a constant speed: r = c · (T_f − t) is the past light cone of the final event (Minkowski, 1908): everything that can reach the apex (checked, E12). Read this way, image 3 says that the radius follows the clock, with T_f fixed from the beginning, and not the energy spent. Alpha knows T_f (A.10); the fragments do not (A.6: "only the Whole will know").
- **In the model:** the cause is inverted. Today the collisions close the Tube. In the light cone, the Tube closes by the clock and the closing forces the collisions: tightening speeds things up (E6), collisions become more frequent and stronger, the slice heats up (page 3), and "the tube keeps swallowing" the fragment (A.8). "All possibilities tested before the end" stops being a rule and becomes a prediction the machine can confirm or overturn.

## Engine B: the solutions together (D32)

If the author accepts physics' answers, they fit into a single machine:

1. **Radius by the clock:** ρ(t) = ρ₀ · (1 − t ÷ T_f). A straight cone. T_f is a datum of Alpha's. (E12)
2. **Speed by the tightening:** vᵢ ∝ 1 ÷ ρ between collisions (angular momentum). The fragment notices through heat. (E5, E6)
3. **Collisions as today (S5), with loss > 0:** heat Q = (m ÷ 4) · loss · (Δv)². (E7, E8)
4. **Counting possibilities (S11, or the rule the author gives) as a measure, not as a cause.** The question "do all the fragments test all the possibilities before T_f?" becomes a test. (E9, E11)
5. **The value belongs to the Whole; each fragment has its part.** (E4, E10)
6. **The strands almost cancel:** an excess of 1 in 10⁹, if the model wants to match the universe. (E3)

What changes in the tests of section 9 of `PROMPT.md`: test 6 (order of the closings) ceases to exist, because all close at T_f; in its place come "the coverage of the possibilities at T_f" and "the temperature rises with 1 ÷ ρ²". The current machine stays as it is; engine B would go in as a separate copy.

## What physics does not solve

- The size of the excess of matter (E3) is an open problem.
- Which way out of Bell is the right one (E10) is interpretation, not measurement.
- Nothing in physics says what "a possibility" is (D20); that is the author's.

## How to repeat

```
python -I -X utf8 -B solucoes-z3.py
node fisica-confere.js maquina-do-tubo.html
```
