---
title: Funciones trigonométricas
lang: es
createdAt: 2022-08-25
updatedAt: 2022-08-27
layout: ~/layouts/DocLayout.astro
---

<!-- toc -->

## Funciones trigonométricas

$$
\begin{aligned}
  \sin x &= \frac{\text{ordenada}}{\text{hipotenusa}} \\
  \cos x &= \frac{\text{abscisa}}{\text{hipotenusa}} \\
  \tg x &= \frac{\text{ordenada}}{\text{abscisa}} = \frac{\sin x}{\cos x} \\
  \\
  \sec x &= \frac{1}{\cos x} \\
  \cosec x &= \frac{1}{\sin x} \\
  \cotg x &= \frac{1}{\tan x} \\
  \\
  \arcsin x &= \sin^{-1} x \\
  \arccos x &= \cos^{-1} x \\
  \arctg x &= \tg^{-1} x
\end{aligned}
$$


### Derivadas

$$
\begin{aligned}
  \sin' x &= \cos x \\
  \cos' x &= -\sin x \\
  \tg' x &= \frac{1}{\cos^2 x} \\
  \\
  \sec' x &= \frac{\sin x}{\cos^2 x} \\
  \cosec' x &= \frac{-\cos x}{\sin^2 x} \\
  \cotg' x &= \frac{-1}{\sin^2 x} \\
  \\
  \arcsin' x &= \frac{1}{\sqrt{1 - x^2}} \\
  \arccos' x &= \frac{-1}{\sqrt{1 - x^2}} \\
  \arctg' x &= \frac{1}{1 + x^2}
\end{aligned}
$$

### Relaciones

$$
\begin{aligned}
  \sin^2\theta + \cos^2\theta &= 1 \\
  \tg^2\theta + 1 &= \cosec^2\theta \\
  1 + \cotg^2\theta  &= \sec^2\theta \\
  \\
  \sin(\alpha \pm \beta) &= \sin\alpha \cos\beta \pm \cos\alpha \sin\beta \\
  \sin(\alpha \pm \beta) &= \cos\alpha \cos\beta \mp \sin\alpha \sin\beta \\
  \\
  \sin 2x &= 2\sin x \cos x \\
  \cos 2x &= \cos^2 x - \sin^2 x \\
  \\
  \sin^2 x &= \frac{1 - \cos(2x)}{2} \\
  \cos^2 x &= \frac{1 + \cos(2x)}{2} \\
\end{aligned}
$$

---

## Funciones hiperbólicas

$$
\begin{aligned}
  \sinh x &= \frac{e^x - e^{-x}}{2} \\
  \cosh x &= \frac{e^x + e^{-x}}{2} \\
  \\
  \operatorname{arsinh} x &= \ln (x + \sqrt{x^2 + 1}) \\
  \operatorname{arcosh} x &= \ln (x + \sqrt{x^2 - 1})\ \forall x \geq 1
\end{aligned}
$$


### Derivadas

$$
\begin{aligned}
  \sinh' x &= \cosh x \\
  \cosh' x &= \sinh x \\
  \\
  \operatorname{arsinh}' x &= \frac{1}{\sqrt{x^2 + 1}} \\
  \operatorname{arcosh}' x &= \frac{1}{\sqrt{x^2 - 1}}
\end{aligned}
$$

### Relaciones

$$
\cosh^2 x - \sinh^2 x = 1
$$
