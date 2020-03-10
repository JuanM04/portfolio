---
title: Kayboard Layout
id: keyboard-layout
---

Edit `us` file in `/usr/share/X11/xkb/symbols/`

```
partial alphanumeric_keys
xkb_symbols "altgr-intl" {

   include "us(intl)"
   name[Group1]= "English (intl., with AltGr dead keys)";

// five dead keys moved into level3:

   key <TLDE> { [    grave, asciitilde,  dead_grave,   dead_tilde      ] };
   key <AC11> { [apostrophe,quotedbl,    dead_acute,   dead_diaeresis  ] };

// diversions from the MS Intl keyboard:

   key <AE01> { [        1, exclam,      onesuperior,  exclamdown      ] };
   key <AD04> { [        r, R,           ediaeresis,   Ediaeresis      ] };
   key <AC07> { [        j, J,           idiaeresis,   Idiaeresis      ] };
   key <AB02> { [        x, X,           oe,           OE              ] };
   key <AB04> { [        v, V,           registered,   registered      ] };

// onequarter etc (not in iso8859-15) moved to get three unshifted deadkeys:

   key <AE06> { [        6, asciicircum, dead_circumflex, onequarter    ] };
   key <AE07> { [        7, ampersand,   dead_horn,       onehalf       ] };
   key <AE08> { [        8, asterisk,    dead_ogonek,     threequarters ] };

// JuanM04 mods
   key <AE09> { [        9,     parenleft,  ordfeminine                    ] };
   key <AE10> { [        0,     parenright, masculine                      ] };
   key <AE11> { [        minus, underscore, emdash,       degree           ] };
   key <AB08> { [        comma, less,       dead_cedilla, lessthanequal    ] };
   key <AB09> { [       period, greater,    ellipsis,     greaterthanequal ] };

   include "level3(ralt_switch)"
};
```