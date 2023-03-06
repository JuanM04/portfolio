---
title: How to set up 1Password and WSL
createdAt: 2023-03-06
---

> [Original source](https://gist.github.com/tecandrew/98d1e6e62a79640d40e7a652d2fb2e90)

We're going to pass the SSH socket from 1Password for Windows to WSL with a few programs. First, make sure to [turn on the SSH agent](https://developer.1password.com/docs/ssh/get-started#step-3-turn-on-the-1password-ssh-agent).

Once, you've done that, you need to install [npiperelay](https://github.com/jstarks/npiperelay) on Windows. Running `$ winget install npiperelay` in the CMD/Powershell will do it.

Then, you'll install `socat` on Linux. If you're using Ubuntu, you can run `$ sudo apt install socat`.

Finally, you'll need to add this script to your `.bashrc` or similar.

```bash:.bashrc
export SSH_AUTH_SOCK=$HOME/.ssh/agent.sock
ALREADY_RUNNING=$(ps -auxww | grep -q "[n]piperelay.exe -ei -s //./pipe/openssh-ssh-agent"; echo $?)
if [[ $ALREADY_RUNNING != "0" ]]; then
    if [[ -S $SSH_AUTH_SOCK ]]; then        echo "removing previous socket..."
        rm $SSH_AUTH_SOCK
    fi
    echo "Starting SSH-Agent relay..."
    (setsid socat UNIX-LISTEN:$SSH_AUTH_SOCK,fork EXEC:"npiperelay.exe -ei -s //./pipe/openssh-ssh-agent",nofork &) >/dev/null 2>&1
fi
```

Alternatively, you can use this simplified script.

```bash:.bashrc
export SSH_AUTH_SOCK="$HOME/.ssh/agent.sock"
(
  set -eu
  piperelay=(setsid socat "UNIX-LISTEN:$SSH_AUTH_SOCK,fork" "EXEC:npiperelay.exe -ei -s //./pipe/openssh-ssh-agent,nofork")
  if ! pgrep "-fxU$UID" "${piperelay[*]}" >/dev/null; then
    rm -f "$SSH_AUTH_SOCK"
    ("${piperelay[@]}" &) >/dev/null
  fi
)
```

