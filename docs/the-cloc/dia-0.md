---
title: "Día 0 — Episodio Piloto"
---

**The Cloc**, o como me gusta llamarlo en español, **El Despe**, es un reloj que no te muestra la hora. ¿Increíble, verdad? En realidad, solo vez una luz que sale de una caja de madera. Esta luz cambia de color dependiendo de cuánto falte para que suene la alarma.

Que "suele la alarma" significa que suene una canción de Spotify. Esta sonaría por unos segundos para que luego se apague sola. Sin botones.

## ¿Cómo está compuesto?
Consta de una **Raspberry Pi 3 B=** como cerebro de operaciones. Esta controla la tira LED y el parlante.

La RasPi consume ~200 mA, el parlante ~800 mA y la tira led 36 mA/cm. Para eso, una fuente de 2A o 2.5A sirve perfectamente. A más corriente, más centímetros de LED se podrán colocar.

La tira LED recibe los datos en una señal de 5V; y los pines GPIO solo tiran 3.3V. Para hacer que los datos viajen a 5V, hace falta utilizar un conversor de niveles:

![Gracias, Diego!](/the-cloc/connections.png)

### Componentes
#### Raspberry
- [Raspberry Pi 3 B+](https://www.adafruit.com/product/3775)
- [Perma-Proto](https://www.adafruit.com/product/2310)
- [Tornillos para la Perma-Proto](https://www.adafruit.com/product/2336)

#### Luces RGB
- [NeoPixels 60 LED/m](https://www.adafruit.com/product/1138?length=1)
- [Adaptador de puertos](https://www.adafruit.com/product/1663)
- [Conversor de niveles 3.3V-5V](https://www.adafruit.com/product/1875)

#### Sonido
- [Parlante 4Ω 3W](https://www.adafruit.com/product/1314)
- [Amplificador Mono MAX98357A](https://www.adafruit.com/product/3006)

#### Tha Power
- [PSU 5V 2A](https://www.adafruit.com/product/276) (si es de 2.5A, mejor)
- [Puerto Plug Hueco](https://www.adafruit.com/product/368)
- Cables [Macho/Macho](https://www.adafruit.com/product/1956), [Hembra/Hembra](https://www.adafruit.com/product/1950), [Hembra/Macho](https://www.adafruit.com/product/1954)

#### Otros (que pueden ser útiles)
- [Protoboard](https://www.adafruit.com/product/239)

### Mapeo de pines
|   Componente | Pin      |           Componente | Pin     |
| -----------: | :------- | -------------------: | :------ |
| Raspberry Pi | `5V`     |         Amplificador | `Vin`   |
| Raspberry Pi | `GND`    |         Amplificador | `GND`   |
| Raspberry Pi | `GPIO18` |         Amplificador | `BCLK`  |
| Raspberry Pi | `GPIO19` |         Amplificador | `LRCLK` |
| Raspberry Pi | `GPIO21` |         Amplificador | `DIN`   |
| Raspberry Pi | `GPIO10` | Conversor de niveles | `A1`    |
|     NeoPixel | `DIN`    | Conversor de niveles | `B1`    |
|          PSU | `5V`     | Conversor de niveles | `HV`    |
|          PSU | `GND`    | Conversor de niveles | `GND`   |

*En lo posible, conectar el `GND` de la Raspberry Pi y de la PSU en la Perma-Proto, para igualar las masas*


## Bueno, ¿y el software?
El mismo se puede dividir en dos: la *configuración* y la *alarma*.

La configuración, o como lo llamaré para evitar dolores de cabeza, **el editor**, es aquello que el usuario usaría para configurar el dispositivo. Mi idea actual es una aplicación móvil que se conecte por Bluetooth, como hacen los Chromecasts. Desde ahí, el usuario podría configurar la hora, el color e intensidad de la luz, la canción o playlist a sonar, y cuanto tiempo quiere que dure la alarma.

La alarma, es decir, **el wake-up-ator**, correría un servidor que escucha las peticiones Bluetooth para modificar la configuración y se encargaría de activar la alarma según esta última. La alarma consistiría de hacer sonar una canción por el parlante y encender las luces. En lo posible, estas luces tendrán una animación.

[Día 1 &rarr;](/docs/the-cloc/dia-1)