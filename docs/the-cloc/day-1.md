---
title: "Day 1 — Superchería"
---

The first thing I did was solder the amplifier headers and connect it to the speaker. Now, it's time to setup the Raspberry.

## Raspberry Pi Setup

I flashed a copy of [Raspbian Buster Lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (now called Raspberry Pi OS) into a 16 GB MicroSD with [Etcher](https://www.balena.io/etcher/) (I love Etcher <3).

Because of my lack of MicroHDMI wires, I had to do some stuff before turning on my Raspberry.
1. I disconnected and connected the MicroSD to my PC.
2. I went to the `boot` drive (with Ubuntu, it was in `/media/USER/boot`).
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

Then, I inserted the MicroSD into the Raspberry and turned it on. With the steps above done, now I can ssh in with `ssh pi@raspberry-pi.local` (or `pri@192.168.X.X`) with the password `raspberry`.

Then, I did what any Linux-user does:
```bash
$ sudo apt-get update && sudo apt-get upgrade -y
$ sudo apt-get install python python-pip python3 python3-pip -y
$ passwd
```

## Speaker Setup

Thanks to [Luca Dentella](http://www.lucadentella.it/) and [his post](http://www.lucadentella.it/en/2017/04/26/raspberry-pi-zero-audio-output-via-i2s/) I could make this bloody thing work.

At first, I connected the pins.

| Raspberry Pi | Amp     |
| -----------: | :------ |
|         `5V` | `Vin`   |
|        `GND` | `GND`   |
|     `GPIO18` | `BCLK`  |
|     `GPIO19` | `LRCLK` |
|     `GPIO21` | `DIN`   |

Then, I edited (or *nanoed*) `/boot/config.txt`. I commented `dtparam=audio=on` and added two more lines:
```
# Enable audio (loads snd_bcm2835)
#dtparam=audio=on
dtoverlay=hifiberry-dac
dtoverlay=i2s-mmap
```

After that, I created `/etc/asound.conf`:
```
pcm.hifiberry {
  type hw card 0
}

pcm.!default {
  type plug
  slave.pcm "dmixer"
}

pcm.dmixer {
  type dmix
  ipc_key 1024
  slave {
    pcm "hifiberry"
    channels 2
  }
}
```

Finally, I rebooted.

## Testing sound

At first, I run `speaker-test -c2`. You should hear a continuous white noise. If you hear white noise - silence - white noise - silence, check your soldering. If it says "Device or resource busy", try erasing your MicroSD and starting again.

After that, I installed SoX (`sudo apt-get install sox libsox-fmt-all`), downloaded [Superchería](https://www.youtube.com/watch?v=bA3ePHU00KY) and run `play supercheria.mp3`:

![@direct This one's for Vitale for helping me with the Amp](/images/docs/the-cloc/supercheria.mp4)