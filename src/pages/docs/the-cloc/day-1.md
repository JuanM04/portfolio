---
title: "Day 1 — Superchería"
layout: ~/layouts/MainLayout.astro
---

The first thing I did was solder the amplifier headers and connect it to the speaker. Now, it's time to setup the Raspberry.

## Raspberry Pi Setup

I flashed a copy of [Raspbian Buster Lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (now called Raspberry Pi OS) into a 16 GB MicroSD with [Etcher](https://www.balena.io/etcher/) (I love Etcher <3). Then, I did some things to the files inside the MicroSD to activate SSH and WiFi *headlessly*:

1. I disconnected and connected the MicroSD to my PC.
2. I went to the `boot` drive (with Ubuntu, it was in `/media/$USER/boot`).
3. I created an empty `ssh` file with no extension.
4. And finally, I created a `wpa_supplicant.conf` file with this data:
```
country=AR
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
  ssid="WIFI_SSID"
  scan_ssid=1
  psk="WIFI_PASSWORD"
  key_mgmt=WPA-PSK
}
```

Then, I inserted the MicroSD into the Raspberry and turned it on. With the steps above done, now I can ssh in with `ssh pi@raspberrypi.local` (or `pri@192.168.X.X`) with the password `raspberry`.

Then, I did what any Linux-user does:
```bash
$ sudo apt-get update && sudo apt-get upgrade -y
$ sudo apt-get install python python-pip python3 python3-pip -y
$ passwd
```

> If you have the error `Can't set locale; make sure $LC_* and $LANG are correct!`, you should `sudo dpkg-reconfigure locales` and select your locale (I selected `en_GB.UTF-8` and `es_AR.UTF-8`... just in case).

## Speaker Setup

> All was stolen from [Adafruit](https://learn.adafruit.com/adafruit-max98357-i2s-class-d-mono-amp/overview), shh!

At first, I connected the pins.

| Raspberry Pi | Amp     |
| -----------: | :------ |
|         `5V` | `Vin`   |
|        `GND` | `GND`   |
|     `GPIO18` | `BCLK`  |
|     `GPIO19` | `LRCLK` |
|     `GPIO21` | `DIN`   |

Then, I run `curl -sS https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/i2samp.sh | bash` and rebooted. That was... very easy.

## Testing sound

At first, I run `speaker-test -c2`. You should hear a continuous white noise. If you hear white noise - silence - white noise - silence, check your soldering. If it says "Device or resource busy", try erasing your MicroSD and starting again.

After that, I installed SoX (`sudo apt-get install sox libsox-fmt-all`), downloaded [Superchería](https://www.youtube.com/watch?v=bA3ePHU00KY) and run `play supercheria.mp3`:

![@direct This one's for Vitale for helping me with the Amp](/images/docs/the-cloc/supercheria.mp4)

[&larr; Day 0](/docs/the-cloc/day-0) | [Day 2 &rarr;](/docs/the-cloc/day-2)