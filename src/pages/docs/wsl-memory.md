---
title: Taking Back Memory From Vmmem/WSL
layout: ~/layouts/MainLayout.astro
---

> Original source: [BlogLogBlog](https://blog.simonpeterdebbarma.com/2020-04-memory-and-wsl/)

## Fast solution

Use `wsl -l -`v to check out all running distros on your WSL.

Then, `wsl -t {insert distro}` to terminate the ones in use. Or, simply `wsl --shutdown`.

## Takeaway

WSL does use a really low amount of RAM but it is allocated about 4GB by default when it is started. If you think that’s too much and would like to decrease it, Windows Insider Build 18945 brough customizable settings for wsl.

Create a `%UserProfile%\.wslconfig` file and use it to limit memory assigned to WSL2 VM.

```ini:.wslconfig
[wsl2]
kernel=<path>              # An absolute Windows path to a custom Linux kernel.
memory=<size>              # How much memory to assign to the WSL2 VM.
processors=<number>        # How many processors to assign to the WSL2 VM.
swap=<size>                # How much swap space to add to the WSL2 VM. 0 for no swap file.
swapFile=<path>            # An absolute Windows path to the swap vhd.
localhostForwarding=<bool> # Boolean specifying if ports bound to wildcard or localhost in the WSL2 VM should be connectable from the host via localhost:port (default true).

# <path> entries must be absolute Windows paths with escaped backslashes, for example C:\\Users\\Ben\\kernel
# <size> entries must be size followed by unit, for example 8GB or 512MB
```

Therefore, in your situation, all you need to include in your file is ⤵

```ini:.wslconfig
[wsl2]
memory=1GB
```

Customize it as necessary with the available options.
