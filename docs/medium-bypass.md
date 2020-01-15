---
title: Medium Bypass
id: medium-bypass
---

1. Install [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) (chrome).
2. Add this profile:

```json
{
  "title": "Medium",
  "hideComment": true,
  "headers": [
    {"enabled": true, "name": "Referer", "value": "https://t.co/x?amp=1", "comment": "" }
  ],
  "respHeaders": [],
  "filters": [
    { "enabled": true, "type": "urls", "urlRegex":"https://medium.com/.*" }
  ],
  "urlReplacements": [],
  "appendMode": false
}
```