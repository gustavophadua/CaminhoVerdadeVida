from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

n = 20_000
prior = np.array([.3, .4, .2, .1])
likelihood = np.array([.3, .7, .7, .3])
rng = np.random.default_rng(1337)
classes = rng.choice(4, n, p=prior)
cues = rng.random((n, 3)) < likelihood[classes, None]
retained = np.ones(n, dtype=bool)
analytic, simulated = [], []
for turn in range(4):
    if turn:
        retained &= cues[:, turn - 1]
    weights = prior * likelihood**turn
    posterior = weights / weights.sum()
    empirical = np.bincount(classes[retained], minlength=4) / retained.sum()
    analytic.append(posterior[1:3].sum())
    simulated.append(empirical[1:3].sum())
    print(turn, retained.sum(), posterior.round(6), empirical.round(6))
print("Variancias", [85.5 - 40.5*p for p in analytic])
fig, ax = plt.subplots(figsize=(8, 4.5), layout="constrained")
ax.plot(range(4), analytic, "o-", label="Modelo bayesiano", color="#245c9e")
ax.plot(range(4), simulated, "x", label="20 mil trajetorias sinteticas", color="#ad3543")
ax.axhline(.6, linestyle="--", color="#555555", label="Evidencia neutra")
ax.set(xticks=range(4), ylim=(0, 1.03), xlabel="Turno",
       ylabel="P(absurdismo ou valor familiar)", title="Atualizacao sob verossimilhancas escolhidas")
ax.legend(loc="lower right")
fig.savefig(Path(__file__).with_suffix(".png"), dpi=170)
