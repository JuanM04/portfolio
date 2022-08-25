---
title: Funciones trigonométricas
lang: es
createdAt: 2022-08-25
layout: ~/layouts/DocLayout.astro
---

## Definiciones

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
  \arctg x &= \tg^{-1} x \\
  \\
  \sinh x &= \frac{e^x - e^{-1}}{2} \\
  \cosh x &= \frac{e^x + e^{-1}}{2} \\
\end{aligned}
$$

## Derivadas

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
  \arctg' x &= \frac{1}{1 + x^2}\\
  \\
  \sinh' x &= \cosh x \\
  \cosh' x &= \sinh x \\
\end{aligned}
$$
