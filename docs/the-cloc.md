---
title: The Cloc
---

The Clocl is a alarm clock that doesn't show you the time. Unbelivable, right? Actually, you only see light from a wood box. This light changes its color depending on how much time is left to the preestablished time (a.k.a. the *ring time*)

When the *ring time* happens, a Spotify song will be played. This song will be played for a few seconds and will turn off automatically. No buttons.

## What's inside?
It has a [Raspberry Pi Zero W](https://www.adafruit.com/product/3708) as brain. This board manages the [LED strip](https://www.adafruit.com/product/1138) and the [speaker](https://www.adafruit.com/product/3968).

The RasPi uses 5V 2A, and the LED too. Because the RasPi is not able to give that power to the LED, they need to be powered in parallel with a [5V 4A PSU](https://www.adafruit.com/product/1466) like this:

![Connections](/images/docs/the-cloc/power-diagram.png)

### Other components
- [Perma-Proto](https://www.adafruit.com/product/2310) + [Screws](https://www.adafruit.com/product/2336)
- [Amp](https://www.adafruit.com/product/3006)
- Jumper Wires
  - [Male/Male](https://www.adafruit.com/product/1956)
  - [Female/Female](https://www.adafruit.com/product/1950)
  - [Female/Male](https://www.adafruit.com/product/1954)
- PSU Adapter
  - [Female](https://www.adafruit.com/product/368)
  - [Male](https://www.adafruit.com/product/369)
  - [MicroUSB - Male](https://www.adafruit.com/product/2727)
- Other
  - [Protoboard](https://www.adafruit.com/product/64)

## And the software?
This can be divided in two: the *config* and *the alarm*.

The config is how the user could configurate the device. My current idea is a mobile app that connects to the RasPi by Bluetooth, like the Chromecasts do. From there, the user could configurate the time, color, intensity, song or playlist to play, and so.

The alarm, a.k.a the RasPi, would run a server that listen to Bluetooth requests to change the configuration. Also, it would manage when and how the alarm will turn on and off.