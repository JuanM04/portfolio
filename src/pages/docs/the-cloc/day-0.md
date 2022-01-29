---
title: "Day 0 — Pilot Episode"
layout: ~/layouts/MainLayout.astro
---

**The Cloc** is a alarm clock that doesn't show you the time. Unbelievably, right? Actually, you only see light from a wood box. This light changes its color depending on how much time is left to the pre-established time (a.k.a. the *ring time*)

When the *ring time* happens, a Spotify song will be played. This song will be played for a few seconds and will turn off automatically. No buttons.

## How is it made?
It has a **Raspberry Pi 3 B+** as a control center. This one manages the LED strip and the speaker.

The RasPi needs ~200 mA, the speaker ~800 mA and the LED strip 36 mA/cm. To make everyone happy, a 2A or a 2.5A PSU will work perfectly. More current = more centimeters of LED.

The LED strip get its data at 5V; and the GPIO pins run at 3.3V. To make the data travel at 5V, we need a Level-Shifter:

![Thanks, Diego!](/images/docs/the-cloc/connections.png)

### Components
#### Raspberry
- [Raspberry Pi 3 B+](https://www.adafruit.com/product/3775)
- [Perma-Proto](https://www.adafruit.com/product/2310)
- [Perma-Proto screws](https://www.adafruit.com/product/2336)

#### RGB
- [NeoPixels 60 LED/m](https://www.adafruit.com/product/1138?length=1)
- [Port adaptor](https://www.adafruit.com/product/1663)
- [Level-Shifter 3.3V-5V](https://www.adafruit.com/product/1875)

#### Sonido
- [Speaker 4Ω 3W](https://www.adafruit.com/product/1314)
- [Mono Amp MAX98357A](https://www.adafruit.com/product/3006)

#### Tha Power
- [PSU 5V 2A](https://www.adafruit.com/product/276) (if it's a 2.5A one, better)
- [Female Plug adaptor](https://www.adafruit.com/product/368)
- Wires [Male/Male](https://www.adafruit.com/product/1956), [Female/Female](https://www.adafruit.com/product/1950), [Female/Male](https://www.adafruit.com/product/1954)

#### Others (that may be useful)
- [Protoboard](https://www.adafruit.com/product/239)

### Pin map
|    Component | Pin      |     Component | Pin     |
| -----------: | :------- | ------------: | :------ |
| Raspberry Pi | `5V`     |           Amp | `Vin`   |
| Raspberry Pi | `GND`    |           Amp | `GND`   |
| Raspberry Pi | `GPIO18` |           Amp | `BCLK`  |
| Raspberry Pi | `GPIO19` |           Amp | `LRCLK` |
| Raspberry Pi | `GPIO21` |           Amp | `DIN`   |
| Raspberry Pi | `GPIO12` | Level-Shifter | `A1`    |
|     NeoPixel | `DIN`    | Level-Shifter | `B1`    |
|          PSU | `5V`     | Level-Shifter | `HV`    |
|          PSU | `GND`    | Level-Shifter | `GND`   |

*If it's possible, connect all `GND` together*


## Nice, and the software?
That can be splitted in two: the *configuration* and the *alarm*.

The configuration, or how I will call it to prevent headaches, **the editor**, is the thing which the user uses to configurate the device. Mi current idea is a mobile app that connects to the device via Bluetooth, like Chromecasts do. With that app, the user could customize the time, color and intensity of the light, the song or playlist, and how long they want to have the alarm ringing.

The alarm, a.k.a, **the wake-up-ator**, would run a server which listens to Bluetooth requests to change the configuration and would start the *ring-time*. This last would be a song being played through the speaker and the LED strip being turned on. If it's possible, the lights will have an animation.

[Day 1 &rarr;](/docs/the-cloc/day-1)