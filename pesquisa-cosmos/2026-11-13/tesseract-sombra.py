from itertools import product
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

N = 20_000
L = 1.0  # m
rng = np.random.default_rng(1337)
theta, phi = rng.uniform(0, 2*np.pi, size=(2, N))
vertices = L * np.array(list(product([-.5, .5], repeat=4)))

def projetar(angulo):
    x, y, z, w = vertices.T
    return np.column_stack((x*np.cos(angulo)-w*np.sin(angulo), y, z))

def volume(angulo):
    return L**3 * (np.abs(np.cos(angulo)) + np.abs(np.sin(angulo)))

v0, v1 = volume(theta), volume(phi)
print(f"Var(V) = {np.var(v0, ddof=1):.8f} m^6")
print(f"Var(diferenca, independente) = {np.var(v1-v0, ddof=1):.8f} m^6")
print(f"Var(diferenca, compartilhada) = {np.var(volume(theta)-v0, ddof=1):.8f} m^6")
print(f"Var(V), teorica = {L**6*(1+2/np.pi-16/np.pi**2):.8f} m^6")

fig = plt.figure(figsize=(10, 4.6), layout="constrained")
ax = fig.add_subplot(121, projection="3d")
points = projetar(np.pi/4)
for i in range(len(vertices)):
    for j in range(i+1, len(vertices)):
        if np.count_nonzero(vertices[i] != vertices[j]) == 1:
            ax.plot(*points[[i,j]].T, color="#1663ad", alpha=.7)
ax.scatter(*points.T, color="#bb3140")
ax.set(title="Projeção ortogonal em 3D · rotação de 45°",
       xlabel="x' (m)", ylabel="y (m)", zlabel="z (m)")
ax.set_box_aspect((np.sqrt(2),1,1))
ax2 = fig.add_subplot(122)
ax2.hist(v0, bins=38, color="#1663ad")
ax2.set(title="20.000 orientações no plano x–w", xlabel="Volume projetado (m³)", ylabel="Frequência")
fig.savefig(Path(__file__).with_suffix(".png"),dpi=180)
