# The equations of the Tube

**Português:** [equacoes.md](equacoes.md). This is a translation; if the two differ, the Portuguese text prevails.

Assembled on 10 November 2026 from the Machine of the Tube (`maquina-do-tubo.html`) and checked in Z3 (`equacoes-sem-solucao.py`, which calls `medidas.js` to take the numbers from the machine itself). To repeat:

```
python -I -X utf8 -B equacoes-sem-solucao.py
```

Three things kept separate, as always: what is the author's, what is my supposition (S1 to S16, in `PROMPT.md`) and what is established physics.

## 1. The assembled equation

It is the machine as it is today, with my suppositions in place of the rules the author has not yet given.

**Quantities.** For each fragment i: the position on the perimeter φᵢ, the velocity vᵢ (with sign), the direction dᵢ ∈ {+1, −1} and the mode (force or rest). Of the Whole: the reserve R, the motion K = Σ ½ m vᵢ², the expenditure G and the total E = E₀ + K(0).

| No. | Equation | Where it comes from | Z3 |
|---|---|---|---|
| (1) | R + K + G = E, always | conservation | proved (items 7 to 9) |
| (2) | Whoever has force accelerates a = F ÷ m up to v_F, and the reserve pays: ΔR = −½ m (v′² − v²) | S3, S4 | proved (7, 8) |
| (3) | At a meeting (φᵢ = φⱼ): vᵢ′ = ((1+e)vᵢ + (1−e)vⱼ) ÷ 2, vⱼ′ = ((1−e)vᵢ + (1+e)vⱼ) ÷ 2, with e = √(1 − loss); the expenditure grows ΔG = (m ÷ 4) · loss · (vᵢ − vⱼ)² | S5 | proved (1 to 5) |
| (4) | Radius: ρ = ρ₀ · √((R + K) ÷ E) = ρ₀ · √(1 − G ÷ E) | S6 | proved (20, 21) |
| (5) | Moving: dφᵢ/dt = vᵢ ÷ ρ; clock: θ = 2π t ÷ T | S1 | |
| (6) | Matter = ρ cos θ, antimatter = ρ cos(θ + 180°); the sum is zero: Alpha's line | S1, S2; D1 | proved (11, 13) |
| (7) | Turns of the perimeter per turn of the clock: n = v · T ÷ P | S9 | proved (15) |
| (8) | End: (R + K) ÷ E ≤ 1 ÷ 100 | S8 | |

**In a single line:**

> ρ(t) = ρ₀ · √(1 − G(t) ÷ E), with G(t) = Σ over the meetings of (m ÷ 4) · loss · (Δv)², and the Tube closes when G = 0.99 · E.

With decision D16 (stock of probabilities, still without a numerical rule), the same line becomes ρ = ρ₀ · √(1 − tested ÷ N), and G stops being energy.

**In the format a theory requires** (`PROMPT.md`, section 8): the quantity that has a value at each point is ρ (the radius of the slice, or the expenditure G); the equation that says how it changes is (3) added to (4); the predictions that can turn out wrong are (7), with 10 turns at 2 m/s and 0.5 at 0.10 m/s, and the order of the closings (all with force before half). Both have already been tested in the machine and matched; testing outside it is still missing.

## 2. The equations without solution

Each one was written and handed to Z3, which looked for a number that would solve it. "Without solution" means: no real (or integer) number satisfies the equation within the hypotheses. The measured numbers come from the machine.

| No. | The equation | Why it has no solution | What it hits |
|---|---|---|---|
| E1 | cos θ + cos(θ + φ) = 0 for every θ, with φ ≠ 180° | at θ = 0 and θ = 90° the sum is only zero if φ = 180° | the reading "vertical and horizontal axis" of page 1; D1 closed at 180° |
| E2 | r(0) = k · r(T) and r(T) = k · r(2T), with r(τ) = Rm ÷ (1 + τ/τ₀) | the spiral in perspective does not grow by the same factor; requiring it forces T = 0 | Fibonacci on page 2; D9 closed |
| E3 | M(t) − A(t) = ε > 0, with M(0) = A(0) and annihilation in pairs | removing the same from both sides keeps the difference at zero | "equal levels" (page 1) against the universe's excess of matter (~1 in 10⁹); `PROMPT.md` §5 |
| E4 | value(f) = Whole, with value(f) ≤ seen(f) and seen(f) < Whole | the value does not go beyond what the fragment sees, and it does not see the Whole | "total value" (A.9) against A.1 and image 4; D28 |
| E5 | n(t) = n(0), with n = v · T ÷ P and P(t) < P(0) | with v fixed, shrinking P raises n | "does not notice" (D17) against S9 and S6; the machine measures n going from 8.5 to 27.2 |
| E6 | m · v₁ · R₁ = m · v₀ · R₀ and v₁ = v₀, with R₁ < R₀ | angular momentum conserved on a smaller ring requires a larger v | the machine's fixed speed (S16) against Newton; D31 |
| E7 | (R + K) ÷ (E₀ + K₀) ≤ 1/100, with R = E₀ = 800 J and K₀ = 0.03 J | without force the reserve does not go down, and the initial motion is 0.004 % of the total | "all at rest": the Tube never closes, it does not just take longer |
| E8 | (R + K) ÷ E ≤ 1/100, with G = Σ (m/4)(1 − e²)(Δv)² and e² = 1 | without loss nothing is spent; R + K stays equal to E | 0 % loss: 1,797 collisions and 0 J; D15 (the loss can never be zero) |
| E9 | Σ possibilities tested = 180, with each opposite pair ≤ 2 hours and each pair in the same direction = 0 | the maximum with equal speeds is 9 × 2 = 18 (10 %), forever | equal fanatics never close the cone (S11); D20, D22 |
| E10 | S = a·b + a·b′ + a′·b − a′·b′ = 2√2, with a, a′, b, b′ ∈ {−1, +1} | with values that already exist and each side seeing only its own, S is exactly ±2; the average of many pairs stays between −2 and 2 | "Alpha knows the value" (A.1, A.10) as a local theory; the experiments give S ≈ 2.7 (Aspect, 1982); the model's way out is superdeterminism; D29 |
| E10b | the same S > 2 | same | same |
| E11 | c × 456 = 792.6 J and c × 1,292 = 792.2 J | there is no energy per collision c: the two histories spend the same with very different numbers of collisions | "the more collisions, the more energy spent" (page 4, item 17); D16 |
| E12 | r(t) = r₀ (1 − t ÷ T_f) passing through (0; 1.000), (28; 0.899), (55; 0.764), (83; 0.560), (110; 0.096) | the measured points do not lie on a straight line: the radius falls slowly and plunges at the end | the straight cone of image 3 against S6 (radius by the square root of the energy); D6 |

## 3. What this says about the model

- **Two are already resolved by the author** (E1, E2): the author closed D1 at 180° and dropped Fibonacci. Z3 confirms there was no other way out.
- **Three are the model against itself** (E4, E5, E11): statements from the notebook or from the answers that do not fit together. Each one becomes a decision (D28, D17, D16).
- **Three are the model against physics** (E3, E6, E10). E10 is the heaviest: prior, local values do not reproduce what is measured. The model only survives it by giving up locality or adopting superdeterminism, which is the reading of A.10.
- **Four are limits of the current machine** (E7, E8, E9, E12): without force it does not close, without loss it does not close, equal ones do not test everything, and the cone is not straight.

A new finding came out of E5 with E6: for the fragment not to notice the Tube shrinking (D17), its speed has to fall with the radius (v ∝ R). For Newton, it has to rise (v ∝ 1 ÷ R). The machine today keeps it fixed, in the middle, and satisfies neither. That is decision D31.

## 4. What this is not

The System does not find open problems of mathematics. It answers whether an equation has a solution within the rules it received. When Z3 says "without solution", the certainty holds for those hypotheses; changing a supposition (S1 to S16), the equation may come to have a solution. That is why each line above says where it comes from.
