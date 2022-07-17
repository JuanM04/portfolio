# Fonts

Fonts used by this site.

## Iosevka

Iosevka 15.6.0

Copyright (c) 2015-2022, Renzhi Li (aka. Belleve Invis, belleve@typeof.net)

This Font Software is licensed under the SIL Open Font License, Version 1.1

## Ranges

| Name                        |     Range     |
| :-------------------------- | :-----------: |
| Basic Latin                 | `U+0020-007F` |
| Latin-1                     | `U+00A0-00FF` |
| General Punctuation         | `U+2000-205E` |
| Superscripts And Subscripts | `U+2070-209C` |
| Currency Symbols            | `U+20A0-20BF` |
| Letterlike Symbols          | `U+2100-214F` |
| Arrows                      | `U+2190-21FF` |
| Mathematical Operators      | `U+2200-22FF` |
| Geometric Shapes            | `U+25A0-25FF` |

Command to subset fonts:

```bash
pip install fonttools

for file in *.ttf; do
  echo "Processing $file"
  pyftsubset "$file" \
    --unicodes="U+0020-007F,U+00A0-00FF,U+2000-205E,U+2070-209C,U+20A0-20BF,U+2100-214F,U+2190-21FF,U+2200-22FF,U+25A0-25FF" \
    --flavor="woff2" \
    --output-file="${file%.*}.woff2"
done
```
