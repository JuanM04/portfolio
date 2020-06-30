---
title: The Cloc (ES)
---

The Cloc es un reloj que no te muestra la hora. ¿Increíble, verdad? En realidad, solo vez una luz que sale de una caja de madera. Esta luz cambia de color dependiendo de cuánto falte para que suene la alarma.

Que "suele la alrma" significa que suene una canción de Spotify. Esta sonaría por unos segundos para que luego se apague sola. Sin botones.

## ¿Cómo está compuesto?
Consta de una [Raspberry Pi Zero W](https://www.adafruit.com/product/3708) como cerebro de operaciones. Esta controla la [tira LED](https://www.adafruit.com/product/1138) y el [parlante](https://www.adafruit.com/product/3968).

La RasPi consume 5V 2A y los LED también. Como la RasPi no es capaz de darle eso a los LED, hace falta que sean alimentados en paralelo con una [fuente de 5V 4A](https://www.adafruit.com/product/1466) de la siguiente manera:

![Diagrama de conexiones eléctricas](/images/docs/the-cloc/power-diagram.png)

De esta forma, además, se igualan las tierras/masas.

### Otros elementos
- [Perma-Proto](https://www.adafruit.com/product/2310) + [Screws](https://www.adafruit.com/product/2336)
- [Amplificador](https://www.adafruit.com/product/3006)
- Jumper Wires
  - [Macho/Macho](https://www.adafruit.com/product/1956)
  - [Hembra/Hembra](https://www.adafruit.com/product/1950)
  - [Hembra/Macho](https://www.adafruit.com/product/1954)
- Adaptador PSU
  - [Hembra](https://www.adafruit.com/product/368)
  - [Macho](https://www.adafruit.com/product/369)
  - [MicroUSB - Macho](https://www.adafruit.com/product/2727)
- Otros
  - [Protoboard](https://www.adafruit.com/product/64)

## Bueno, ¿y el software?
El mismo se puede dividir en dos: la *configuración* y *la alarma*.

La configuración es cómo el usuario configuraría el dispositivo. Mi idea actual es una aplicación móbil que se conecte por Bluetooth, como hacen los Chromecasts. Desde ahí, el usuario podría configurar la hora, el color e intensidad de la luz, la canción o playlist a sonar, y cuanto tiempo quiere que dure la alarma.

La alarma, es decir, la RasPi, correría un servidor que escucha las peticiones Bluetooth para modificar la configuración y se encargaría de activar la alarma y modificar las luces.