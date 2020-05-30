---
title: Materiales
category: 5º 3ª
---

- [Ensayo de Dureza](#ensayo-de-dureza)
  - [Brinell](#brinell)
    - [Constantes comunes](#constantes-comunes)
    - [Nomenclatura](#nomenclatura)
  - [Vickers](#vickers)
    - [Valores de k](#valores-de-k)
    - [Nomenclatura](#nomenclatura-1)
- [Ensayo de Tracción](#ensayo-de-tracción)

## Ensayo de Dureza

### Brinell

$$
\begin{aligned}
H_B         &= \frac{2P}{\pi D^2 \times (1 - \sqrt{1 - (d/D)^2})} \\
C           &= \frac{P}{D^2}                                      \\
\sigma_{ET} &= 3.5 \times H_B                                     \\
\end{aligned}
$$

- $H_B$: Dureza Brinell
- $P$: Carga aplicada
- $D$: Diámetro de la bolilla
- $d$: Diámetro de la impronta
- $C$: Constante del ensayo
- $\sigma_{ET}$: resistencia de tracción para aceros de bajo carbono

#### Constantes comunes

- $C = 30$ para aceros y fundiciones
- $C = 10$ para aleaciones de aluminio y cobre
- $C = 5$ para aluminio y cobre
- $C = 2.5 - 1.5 - 1$ para materiales muy blandos (plomo, estaño y/o sus aleaciones)

#### Nomenclatura
$200\ H_B\  5\ /\ 375\ /\ 30$, siendo:
- $200$ el valor final de la dureza ($H_b$)
- $5$ el diámetro de la bolilla en $\text{mm}$ ($D$)
- $375$ la carga aplicada en $\text{kgf}$ ($P$)
- $30$ la duración del ensayo en segundos


### Vickers

$$
\begin{aligned}
H_V &= \frac{kP}{S}                 \\
    &= \frac{1.8544 \times kP}{d^2} \\
d   &= \frac{D_1 + D_2}{2}          \\
\end{aligned}
$$

- $H_V$: Dureza Vickers
- $P$: Carga aplicada
- $S$: Superficie de la impronta
- $k$: Constante de conversión
- $D$: Longitud de las diagonales
- $d$: Promedio de las diagonales

#### Valores de k

- $k = 1$ si $P$ está en $\text{kgf}$ y la superficie en $\text{mm}^2$
- $k = 1000$ si $P$ está en $\text{gf}$ y la superficie en $\mu\text{m}^2$
- $k = 0.10197$ si $P$ está en $\text{N}$ y la superficie en $\text{mm}^2$
  
#### Nomenclatura
$150\ H_V\ 30\ /\ 20$, siendo:
- $140$ el valor final de la dureza ($H_v$)
- $30$ la carga aplicada en $\text{kgf}$ ($P$)
- $20$ la duración del ensayo en segundos
- **Excepciones**:
  - Si el tiempo del esnayo es igual a 15 segundos, se obvia el tiempo, quedando $150\ H_V\ 30$
  - Si el ensayo estubiera en $\text{gf}$, se escribiría así: $150\ H_V\ _{30\ /\ 20}$
  - Las dos reglas anteriores pueden sumare, quedando $150\ H_V\ _{30}$




## Ensayo de Tracción
$$
\begin{aligned}
\sigma    &= \frac{P}{S_0}        \\
\epsilon  &= \frac{\Delta L}{L_0} \\
\end{aligned}
$$

- $\sigma$: Tensión
- $\epsilon$: Alargamiento específico
- $P$: Carga aplica
- $\Delta S$: Estricción
  - $S_0$: Sección inicial
  - $S_1$: Sección final
- $\Delta L$: Alargamiento
  - $L_0$: Longitud incial
  - $L_1$: Longitud final

![Diagrama de Tracción para un Acero](/images/docs/materiales-5/traccion-acero.png)

- **Módulo de Elasticidad Longitudinal o Módulo de Young**: $E = \tan \alpha$
- **Tensión al límite de Proporcionalidad** (1): $\sigma_p = \frac{\text{Carga al límite proporcional}}{S_0}$
- **Tensión al límite de Fluencia Inferior** (3): `fórmula desconocida`
- **Tensión Máxima o Resistencia Estática a la Tracción** (4): `fórmula desconocida`
- **Tensión a la Rotura Convencional** (5): `fórmula desconocida`
- **Alargamiento Porcentual**: $\delta = \epsilon \times 100$
- **Estricción Porcentual**: $\delta =  \times 100$









