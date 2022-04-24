---
title: Fridrich reducido
lang: es
createdAt: 2022-04-24
layout: ~/layouts/DocLayout.astro
---

- [OLL](#oll)
  - [Cruz](#cruz)
  - [Esquinas](#esquinas)
- [PLL](#pll)
  - [Esquinas](#esquinas-1)
  - [Aristas](#aristas)

## OLL

### Cruz

|                                                   Caso                                                   | Algoritmo        |
| :------------------------------------------------------------------------------------------------------: | :--------------- |
| ![](/images/fridrich/oll-punto.png) ![](/images/fridrich/oll-l.png)  ![](/images/fridrich/oll-linea.png) | `B' R' U' R U B` |


### Esquinas

|  Nombre   |                  Caso                   | Algoritmo                          |
| :-------: | :-------------------------------------: | :--------------------------------- |
|     H     |     ![](/images/fridrich/oll-h.png)     | `F (R U R' U')x3 F'`               |
| Personita |  ![](/images/fridrich/oll-persona.png)  | `(R U2') (R2 U' R2 U') (R2 U2' R)` |
|    Pez    |    ![](/images/fridrich/oll-pez.png)    | `(R U R') (U R U2 R')`             |
|  Antipez  |  ![](/images/fridrich/oll-antipez.png)  | `(R U2 R' U') (R U' R')`           |
| Pajarita  | ![](/images/fridrich/oll-pajarita.png)  | `U F' (r U R' U') (r' F R)`        |
| Botella 1 | ![](/images/fridrich/oll-botella-1.png) | `(R2 D R' U2) (R D' R' U2' R')`    |
| Botella 2 | ![](/images/fridrich/oll-botella-2.png) | `(l' U') (L U) (R U' r' F)`        |



## PLL

### Esquinas

| Nombre |              Caso               | Algoritmo                                            |
| :----: | :-----------------------------: | :--------------------------------------------------- |
|   T    | ![](/images/fridrich/pll-t.png) | `(R U R' U') (R' F R2 U') (R' U' R U) (R' F')`       |
|   F    | ![](/images/fridrich/pll-f.png) | `F (R U' R' U') (R U R') F' (R U R' U') (R' F R F')` |

### Aristas

|      Nombre      |               Caso               | Algoritmo                            |
| :--------------: | :------------------------------: | :----------------------------------- |
| Ua (antihorario) | ![](/images/fridrich/pll-ua.png) | `(R2 U' R' U') (R U R U) (R U' R)`   |
|   Ub (horario)   | ![](/images/fridrich/pll-ub.png) | `(R' U R') (U' R' U' R') (U R U R2)` |
|        H         | ![](/images/fridrich/pll-h.png)  | `(M2' U') (M2' U2') (M2' U') M2'`    |
|        Z         | ![](/images/fridrich/pll-z.png)  | `(M' U) (M2 U)x2 (M' U2 M2)`         |
