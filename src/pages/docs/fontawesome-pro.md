---
title: FontAwesome Pro
lang: es
layout: ~/layouts/MainLayout.astro
---

> **Warning**
> I *think* this is illegal. If someone from FortAwesome says it to me, I will remove this post.

## Sources
```bash
VERSION=$1 # E.g. 5.12.1

curl -o "fa-brands-400.ttf" -L "https://kit-pro.fontawesome.com/releases/latest/webfonts/pro-fa-brands-400-$VERSION.ttf"
curl -o "fa-light-300.ttf" -L "https://kit-pro.fontawesome.com/releases/latest/webfonts/pro-fa-light-300-$VERSION.ttf"
curl -o "fa-regular-400.ttf" -L "https://kit-pro.fontawesome.com/releases/latest/webfonts/pro-fa-regular-400-$VERSION.ttf"
curl -o "fa-solid-900.ttf" -L "https://kit-pro.fontawesome.com/releases/latest/webfonts/pro-fa-solid-900-$VERSION.ttf"

curl -O -L "https://kit-pro.fontawesome.com/releases/latest/css/pro.min.css"
```

## `font_awesome_flutter`

```bash:tool/hack.sh
VERSION=$1

pushd lib/fonts/

curl -o "fa-brands-400.ttf" -L "https://kit-pro.fontawesome.com/releases/latest/webfonts/pro-fa-brands-400-$VERSION.ttf"
curl -o "fa-light-300.ttf" -L "https://kit-pro.fontawesome.com/releases/latest/webfonts/pro-fa-light-300-$VERSION.ttf"
curl -o "fa-regular-400.ttf" -L "https://kit-pro.fontawesome.com/releases/latest/webfonts/pro-fa-regular-400-$VERSION.ttf"
curl -o "fa-solid-900.ttf" -L "https://kit-pro.fontawesome.com/releases/latest/webfonts/pro-fa-solid-900-$VERSION.ttf"

popd

curl -o /tmp/cheatsheet.html "https://fontawesome.com/cheatsheet/pro"
dart ./tool/hack.dart /tmp/cheatsheet.html
rm /tmp/cheatsheet.html

./tool/update.sh
```

```dart:tool/hack.dart
import 'dart:convert';
import 'dart:io';

void main(List<String> arguments) {
  var file = File(arguments.first);

  if (!file.existsSync()) {
    print('Cannot find the file "${arguments.first}".');
  }

  var content = file.readAsStringSync();
  var juicyContent =
      content.split('window.__inline_data__ = ')[1].split('</script>')[0];
  List allData = json.decode(juicyContent);
  List icons = allData[2]['data'];

  Map<String, dynamic> parsedIcons = {};
  for (final icon in icons) {
    final attr = icon['attributes'];
    parsedIcons[attr['id']] = {
      "styles": attr['styles'],
      "unicode": attr['unicode'],
    };
  }

  File('icons.json').writeAsStringSync(json.encode(parsedIcons));
}
```