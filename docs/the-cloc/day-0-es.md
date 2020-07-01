---
title: "Día 0: Presentación del proyecto"
---

The Cloc es un reloj que no te muestra la hora. ¿Increíble, verdad? En realidad, solo vez una luz que sale de una caja de madera. Esta luz cambia de color dependiendo de cuánto falte para que suene la alarma.

Que "suele la alrma" significa que suene una canción de Spotify. Esta sonaría por unos segundos para que luego se apague sola. Sin botones.

## ¿Cómo está compuesto?
Consta de una [Raspberry Pi Zero W](https://www.adafruit.com/product/3708) como cerebro de operaciones. Esta controla la [tira LED](https://www.adafruit.com/product/1138) y el [parlante](https://www.adafruit.com/product/3968).

La RasPi consume ~200 mA y los LED ~1000 mA. Como la RasPi no es capaz de darle eso a los LED, hace falta que sean alimentados en paralelo con una [fuente de 5V 2A](https://www.adafruit.com/product/276) de la siguiente manera:

![Conexiones](/images/docs/the-cloc/connections.png)

De esta forma, además, se igualan las tierras/masas. La lista completa de productos está [aquí](https://www.notion.so/ba4adbab8cc74623929503db389bc93a?v=75cedd8367284c4ca33dbbf666e76b07).

### Mapeo de pines
|  Componente | Pin      |    Componente | Pin     |
| ----------: | :------- | ------------: | :------ |
| Raspbery Pi | `5V`     |  Amplificador | `Vin`   |
| Raspbery Pi | `GND`    |  Amplificador | `GND`   |
| Raspbery Pi | `GPIO18` |  Amplificador | `BCLK`  |
| Raspbery Pi | `GPIO19` |  Amplificador | `LRCLK` |
| Raspbery Pi | `GPIO21` |  Amplificador | `DIN`   |
| Rasberry Pi | `GPIO10` | Level-Shifter | `1A`    |
|    NeoPixel | `DIN`    | Level-Shifter | `1Y`    |
|         PSU | `GND`    | Level-Shifter | `GND`   |
|         PSU | `GND`    | Level-Shifter | `1OE`   |
|         PSU | `5V`     | Level-Shifter | `VCC`   |


## Bueno, ¿y el software?
El mismo se puede dividir en dos: la *configuración* y *la alarma*.

La configuración es cómo el usuario configuraría el dispositivo. Mi idea actual es una aplicación móbil que se conecte por Bluetooth, como hacen los Chromecasts. Desde ahí, el usuario podría configurar la hora, el color e intensidad de la luz, la canción o playlist a sonar, y cuanto tiempo quiere que dure la alarma.

La alarma, es decir, la RasPi, correría un servidor que escucha las peticiones Bluetooth para modificar la configuración y se encargaría de activar la alarma y modificar las luces.