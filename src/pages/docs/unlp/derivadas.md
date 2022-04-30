---
title: Tabla de derivadas
lang: es
createdAt: 2022-04-24
layout: ~/layouts/DocLayout.astro
---

$$
\lim\limits_{h \to 0} \frac{f(x + h) - f(x)}{h} = f'(x)
$$

|                Función                 |                       Derivada                       |
| :------------------------------------: | :--------------------------------------------------: |
|             $f(x) + g(x)$              |                   $f'(x) + g'(x)$                    |
|             $f(x) - g(x)$              |                   $f'(x) - g'(x)$                    |
|           $f(x) \cdot g(x)$            |        $f'(x) \cdot g(x) + f(x) \cdot g'(x)$         |
|          $\frac{f(x)}{g(x)}$           | $\frac{f'(x) \cdot g(x) - f(x) \cdot g'(x)}{g(x)^2}$ |
|               $f(g(x))$                |                $f'(g(x)) \cdot g'(x)$                |
|         $k : k \in \mathbb{R}$         |                         $0$                          |
|   $k \cdot f(x) : k \in \mathbb{R}$    |                   $k \cdot f'(x)$                    |
|        $x^r : r \in \mathbb{Q}$        |                      $nx^{n-1}$                      |
|              $f^{-1}(b)$               |                  $\frac{1}{f'(a)}$                   |
|              $f^{-1}(b)$               |                  $\frac{1}{f'(a)}$                   |
|                $\sin x$                |                       $\cos x$                       |
|                $\cos x$                |                      $-\sin x $                      |
|                $\tan x$                |                $\frac{1}{\cos^2(x)}$                 |
|              $\arcsin x$               |              $\frac{1}{\sqrt{1 - x^2}}$              |
|              $\arccos x$               |             $\frac{-1}{\sqrt{1 - x^2}}$              |
|              $\arctan x$               |                 $\frac{1}{1 + x^2}$                  |
| $a^x : a \in (0, 1) \cup (1, +\infty)$ |                  $a^x \cdot \ln a$                   |
|                $\ln x$                 |                    $\frac{1}{x}$                     |
|               $\cosh x$                |                      $\sinh x$                       |
|               $\sinh x$                |                      $\cosh x$                       |
