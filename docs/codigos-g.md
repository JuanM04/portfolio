---
title: Códigos G
category: 4º 5ª
---

| Código | Descripción                               |
| :----: | :---------------------------------------- |
|   D    | Corrección del desgaste de la herramienta |
|   F    | Avance de mecanizado                      |
|   O    | Nombre del programa                       |
|   R    | Radio                                     |
|   S    | RPM                                       |
|   T    | Posición de la herramienta                |

## Códigos G
| Código | Descripción                              |
| :----: | :--------------------------------------- |
|  G00   | Movimiento rápido de posicionamiento     |
|  G01   | Movimiento de corte                      |
|  G02   | Movimiento de corte circular antihorario |
|  G03   | Movimiento de corte circular horario     |
|  G50   | Limitador de velocidad de corte          |
|  G70   | Programación en pulgadas                 |
|  G71   | Programación en milímetros               |
|  G90   | Programación en modo absoluto            |
|  G91   | Programación en modo incremental         |
|  G96   | Velocidad de corte constante             |
|  G97   | Cancela la velocidad de corte constante  |
|  G98   | Avance por pulgada                       |
|  G99   | Avance por milímetro                     |

## Misceláneos
| Código | Descripción                        |
| :----: | :--------------------------------- |
|  M03   | Arranque del husillo               |
|  M04   | Contramarcha                       |
|  M05   | Detención del husillo              |
|  M08   | Arranque del líquido refrigerante  |
|  M09   | Detención del líquido refrigerante |
|  M30   | Final del programa                 |

### Convenciones

En un torno:
- `F0.1` para cilindrar y `F0.16` para frentear
- Se contornea empezando desde `Z0`
- `X` se mueve la mitad de lo indicado, por eso se usa el diámetro en vez del radio para guiarse.

### Ejemplo
```gcode
( #-----------#             )
( | 0 | 0 | 7 |             )
( #-----------#             )
(                           )
( Rectángulo de 210x120 mm. )
( Cada subrectángulo es de  )
( 70x120 mm y cada número   )
( entra con 10 mm de margen )
( de cada lado.             )



(INICIO)
O0001
M03 S3000

(Marco)
G00 X0 Y0 Z10
G01 Z-1 F80
G01 Y120 F400
G01 X210
G01 Y0
G01 X0
G00 Z10
G00 X70
G01 Z-1 F80
G01 Y120 F400
G00 Z10
G00 X140 Y0
G01 Z-1 F80
G01 Y0 F400
G00 Z10

(0)
G00 X10 Y10
G01 Z-1 F80
G01 Y110 F400
G01 X60
G01 Y10
G01 X10
G00 Z10

(0)
G00 X80
G01 Z-1 F80
G01 Y110 F400
G01 X130
G01 Y10
G01 X80
G00 Z10

(7)
G00 X150
G01 Z-1 F80
G01 X200 Y110 F400
G01 X150
G00 Z10
G00 Y70
G01 Z-1 F80
G01 X200 F400
G00 Z10

(FINAL)
G00 X0 Y0
M05
M30
```