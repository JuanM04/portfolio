---
title: "Día 1 — Superchería"
lang: es
layout: ~/layouts/MainLayout.astro
---

Lo primero que hice fue soldar los pines del amplificador y conectarlo con el parlante. Ahora, tocaba iniciar la Raspberry.

## Configurar la Raspberry Pi

Quemé una copia de [Raspbian Buster Lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (por lo visto, ahora se llama *Raspberry Pi OS*) en una MicroSD de 16 GB con [Etcher](https://www.balena.io/etcher/) (Amo Etcher <3). Luego toqué un poco algunos archivos dentro de la MicroSD para activar el SSH y el WiFi *headlessly*:

1. Desconecté y contecté la MicroSD a mi PC.
2. Fui al disco `boot` (con Ubuntu, está en `/media/$USER/boot`).
3. Create un archivo `ssh` vacío y sin extensión.
4. Finalmente, creé el archivo `wpa_supplicant.conf` con estos datos:
```ini:wpa_supplicant.conf
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

Luego, inserté la MicroSD en la Raspberry y la encendí. Gracias a los pasos anteriormente mencionados, ya puedo entrar en ella con `ssh pi@raspberrypi.local` con la contraseña `rasperry`.

Luego, hice lo que cualquier usuario de Linux hace con un nuevo OS:
```bash
$ sudo apt-get update && sudo apt-get upgrade -y
$ sudo apt-get install python python-pip python3 python3-pip -y
$ passwd
```

> Si te salta el error `Can't set locale; make sure $LC_* and $LANG are correct!`, deberías `sudo dpkg-reconfigure locales` y seleccionar tu idioma (yo seleccioné `en_GB.UTF-8` y `es_AR.UTF-8`... por si las dudas).

## Configurar el Audio

> Robé todo de [Adafruit](https://learn.adafruit.com/adafruit-max98357-i2s-class-d-mono-amp/overview), shh!

Primero, conecté los pines.

| Raspberry Pi | Amp     |
| -----------: | :------ |
|         `5V` | `Vin`   |
|        `GND` | `GND`   |
|     `GPIO18` | `BCLK`  |
|     `GPIO19` | `LRCLK` |
|     `GPIO21` | `DIN`   |

Luego, corrí `curl -sS https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/i2samp.sh | bash` y reinicié. Eso fue... muy fácil.

## Probando Audio

Primero, corrí `speaker-test -c2`. Deberías escuchar un ruido blanco continuo. Si escuchás ruido blanco - silencio - ruido blanco - silencio, deberías checkear tus conexiones. Si dice "Device or resource busy", probá borrando la MicroSD y empezando de nuevo.

Luego de eso, Instalé SoX (`sudo apt-get install sox libsox-fmt-all`), descargué [Superchería](https://www.youtube.com/watch?v=bA3ePHU00KY) y corrí `play supercheria.mp3`:

![Superstición!](/images/docs/the-cloc/supercheria.mp4)

Se la dedico a Vitale por ayudarme con el amplificador!

[&larr; Día 0](/docs/the-cloc/dia-0) | [Día 2 &rarr;](/docs/the-cloc/dia-2)