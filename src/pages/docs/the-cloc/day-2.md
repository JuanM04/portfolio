---
title: "Day 2 — Gaming RasPi"
layout: ~/layouts/DocLayout.astro
---

Before anything, Using the protoboard and a Female Plug adaptor, I now turn on my Raspberry through the 5V pin instead of the MicroUSB port.

Now, the...

## RGB GAMING

It turns out that my level-shifter isn't similar to the one that Adafruit offers, but does the same thing. So, the new pinout (thanks to [Luis Llama](https://www.luisllamas.es/arduino-level-shifter/) and Alice for sharing me that post) is:

|    Component | Pin      | Level-Shifter Pin |
| -----------: | :------- | :---------------: |
| Raspberry Pi | `3.3V`   |       `LV`        |
| Raspberry Pi | `GPIO12` |       `LVX`       |
|     NeoPixel | `DIN`    |       `HVX`       |
|          PSU | `5V`     |       `HV`        |
|          PSU | `GND`    |       `GND`       |

> The `X` is because you can use any of the channels. Of course, use only one.

## Python-time

I installed the NeoPixel library:

```bash
$ sudo pip3 install rpi_ws281x adafruit-circuitpython-neopixel
$ sudo python3 -m pip install --force-reinstall adafruit-blinka
```

And run this script **in root mode**:

```python
# Simple test for NeoPixels on Raspberry Pi
import time
import board
import neopixel

# NeoPixels must be connected to D10, D12, D18 or D21 to work.
pixel_pin = board.D12

# The number of NeoPixels
num_pixels = 60

# The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green reversed!
ORDER = neopixel.GRB

# auto_write=False doesn't do any changes until you run pixels.show()
pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=0.2, auto_write=False, pixel_order=ORDER
)


def wheel(pos):
    # Input a value 0 to 255 to get a color value.
    # The colours are a transition r - g - b - back to r.
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

    rainbow_cycle(0.001)  # rainbow cycle with 1ms delay per step
```

[&larr; Day 1](/docs/the-cloc/day-1) | [Day 3 &rarr;](/docs/the-cloc/day-3)
