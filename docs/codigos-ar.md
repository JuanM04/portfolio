---
title: Códigos de Argentina
---

| Provincia                                             | [IATA] | [ISO] |
| :---------------------------------------------------- | :----: | :---: |
| Buenos Aires                                          |   BA   | AR-B  |
| Ciudad Autónoma de Buenos Aires                       | CF[^1] | AR-C  |
| Catamarca                                             |   CA   | AR-K  |
| Chaco                                                 |   CH   | AR-H  |
| Chubut                                                |   CT   | AR-U  |
| Córdoba                                               |   CB   | AR-X  |
| Corrientes                                            |   CR   | AR-W  |
| Entre Ríos                                            |   ER   | AR-E  |
| Formosa                                               |   FO   | AR-P  |
| Jujuy                                                 |   JY   | AR-Y  |
| La Pampa                                              |   LP   | AR-L  |
| La Rioja                                              |   LR   | AR-F  |
| Mendoza                                               |   MZ   | AR-M  |
| Misiones                                              |   MI   | AR-N  |
| Neuquén                                               |   NQ   | AR-Q  |
| Río Negro                                             |   RN   | AR-R  |
| Salta                                                 |   SA   | AR-A  |
| San Juan                                              |   SJ   | AR-J  |
| San Luis                                              |   SL   | AR-D  |
| Santa Cruz                                            |   SC   | AR-Z  |
| Santa Fe                                              |   SF   | AR-S  |
| Santiago del Estero                                   |   SE   | AR-G  |
| Tierra del Fuego, Antártida e Islas del Atlántico Sur |   TF   | AR-V  |
| Tucumán                                               |   TU   | AR-T  |

[^1]: _"CF" no es reconocido por IATA, pero es fácilmente reconocible por "Capital Federal"_
[ISO]: https://es.wikipedia.org/wiki/ISO_3166-2:AR
[IATA]: https://es.wikipedia.org/wiki/Asociaci%C3%B3n_Internacional_de_Transporte_A%C3%A9reo

`cities.py`
```python
import json
from requests import get

province_to_letter = {
    "02": "C",  # Capital Federal
    "06": "B",  # Buenos Aires
    "10": "K",  # Catamarca
    "14": "X",  # Córdoba
    "18": "W",  # Corrientes
    "22": "H",  # Chaco
    "26": "U",  # Chubut
    "30": "E",  # Entre Ríos
    "34": "P",  # Formosa
    "38": "Y",  # Jujuy
    "42": "L",  # La Pampa
    "46": "F",  # La Rioja
    "50": "M",  # Mendoza
    "54": "N",  # Misiones
    "58": "Q",  # Neuquén
    "62": "R",  # Río Nergo
    "66": "A",  # Salta
    "70": "J",  # San Juan
    "74": "D",  # San Luis
    "78": "Z",  # Santa Cruz
    "82": "S",  # Santa Fe
    "86": "G",  # Santiago del Estero
    "90": "T",  # Tucumán
    "94": "V",  # Tierra del Fuego
}

r = get(
    "https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json"
)
data = r.json()
new_data = {}

for town in data["localidades"]:
    p = province_to_letter[town["provincia"]["id"]]
    n = town["nombre"].title().replace("¥", "ñ")
    if p in new_data:
        new_data[p]["cities"].append(n)
    else:
        new_data[p] = {
            "id": int(town["provincia"]["id"]),
            "name": town["provincia"]["nombre"].title(),
            "cities": [n],
        }

open("cities.json", "w").write(
    json.dumps(new_data, ensure_ascii=False, sort_keys=True, indent=2)
)
```