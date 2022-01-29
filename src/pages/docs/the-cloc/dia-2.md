---
title: "Día 2 — RasPi Gamer"
lang: es
layout: ~/layouts/MainLayout.astro
---

Antes que nada, usando el adaptador de Plug hembra y un poco de electricidad, ahora puedo encender la Raspberry usando el pin de 5V en vez de el puerto MicroUSB.

Ahora, el...

## RGB GAMING

Resulta que el mi conversor de niveles es ligeramente distinto que el de Adafruit, pero hace lo mismo. Así que, el pinout quedaría así (gracias a [este post](https://www.luisllamas.es/arduino-level-shifter/) de Luis Llama y a Alice por compartírmelo):

|   Componente | Pin      | Conversor de Niveles |
| -----------: | :------- | :------------------: |
| Raspberry Pi | `3.3V`   |         `LV`         |
| Raspberry Pi | `GPIO12` |        `LVX`         |
|     NeoPixel | `DIN`    |        `HVX`         |
|          PSU | `5V`     |         `HV`         |
|          PSU | `GND`    |        `GND`         |

> La `X` es porque podés usar cualquiera de los canales. Por supuesto, usa solo uno.

## Momento Python

Instalé la librería de los NeoPixel:
```bash
$ sudo pip3 install rpi_ws281x adafruit-circuitpython-neopixel
$ sudo python3 -m pip install --force-reinstall adafruit-blinka
```

Y ejecuté este script **en modo root**:
```python
# Test simple de NeoPixels en una Raspberry Pi
import time
import board
import neopixel

# Los NeoPixels deben conectarse a D10, D12, D18 o D21 para funcionar.
pixel_pin = board.D12

# Cantidad de pixeles
num_pixels = 60

# El orden de los colores: RGB o GRB. ¡Algunos NeoPixels lo tienen al revés!
ORDER = neopixel.GRB

# auto_write=False no ejecuta ningún cambio hasta que no se corra pixels.show()
pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=0.2, auto_write=False, pixel_order=ORDER
)


def wheel(pos):
    # Recibe un número entre 0 y 255 devuelve un color.
    # Los colores van de r - g - b - y luego a r.
    if pos < 0 or pos > 255:
        r = g = b = 0
    elif pos < 85:
        r = int(pos * 3)
        g = int(255 - pos * 3)
        b = 0
    elif pos < 170:
        pos -= 85
        r = int(255 - pos * 3)
        g = 0
        b = int(pos * 3)
    else:
        pos -= 170
        r = 0
        g = int(pos * 3)
        b = int(255 - pos * 3)
    return (r, g, b)


def rainbow_cycle(wait):
    for j in range(255):
        for i in range(num_pixels):
            pixel_index = (i * 256 // num_pixels) + j
            pixels[i] = wheel(pixel_index & 255)
        pixels.show()
        time.sleep(wait)


while True:
    pixels.fill((255, 0, 0))
    pixels.show()
    time.sleep(1)

    pixels.fill((0, 255, 0))
    pixels.show()
    time.sleep(1)

    pixels.fill((0, 0, 255))
    pixels.show()
    time.sleep(1)

    rainbow_cycle(0.001)  # 1ms de delay entre cada paso
```

[&larr; Día 1](/docs/the-cloc/dia-1) | [Día 3 &rarr;](/docs/the-cloc/dia-3)