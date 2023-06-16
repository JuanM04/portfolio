---
title: Windows
createdAt: 2022-07-31
updatedAt: 2023-04-11
---

> This is strictly for educational purposes only — if you can't pay for software, there are great free alternatives!

<!-- toc -->

## Download Windows

The majority of PCs will run Windows 7 and 10, but only the newer ones will run Windows 11. You can check the [minimum system requirements](https://www.microsoft.com/en-us/windows/windows-11-specifications) or use the [PC Health Check](https://aka.ms/GetPCHealthCheckApp) tool (only on Windows 10) to ensure that your PC is compatible with Windows 11.

Once you chose a Windows version, you need to download the ISO. The ISO size varies a lot depending of the version — with a **8 GB thumbdrive** you'll be fine.

If you are in a Windows computer, you can use the [Media Creation Tool](https://www.microsoft.com/en-us/software-download/windows11), which downloads and flashes the thumbdrive automatically for you.

Otherwhise, [Microsoft Software Download Listing](https://ave9858.github.io/msdl/) is a web interface for an official Microsoft source and all the downloads will come directly from Microsoft's CDNs. For flashing the thumbdrive, you can use

- [Rufus](https://rufus.ie/en/) (Windows-only),
- [WoeUSB](https://github.com/WoeUSB) (Linux-only),
- or [UNetbootin](https://unetbootin.github.io/) (Windows, macOS and Linux).

## Installation

Connect your flashed USB drive to the computer and boot it (check out the [BIOS Cheatsheet](../bios)). You can perform a normal installation with or without a Microsoft account. If it asks you for a Windows key, there is always a way to skip it.

## Activation

You can use an official key or an activator.

> **Warning**: some people may recommend buying cheap keys elsewhere. This is not recommended, as these are grey-market keys, gathered from MSDN channels, each key sold multiple times ([extra reading](https://www.reddit.com/r/windows/comments/b7jolc/comment/ejshgai/)). You're not buying directly from MS so you're not buying a license, you're just buying a key and living on the promise that MS won't discover and deactivate it.
>
> **It's essentially piracy with a middleman.**

If you don't have a key, you can use [Microsoft Activation Scripts (MAS)](https://github.com/massgravel/Microsoft-Activation-Scripts/releases/latest). Instructions and downloads are inside that link.

You can also run `irm https://massgrave.dev/get | iex` in the PowerShell.

## Next steps

Useful software to install

- [7-Zip](https://www.7-zip.org/index.html)
- [Notepad++](https://notepad-plus-plus.org/)
- [Office](../office) or [LibreOffice](https://www.libreoffice.org/)
- [PowerToys](https://github.com/microsoft/PowerToys)
- [VLC](https://www.videolan.org/vlc/)
