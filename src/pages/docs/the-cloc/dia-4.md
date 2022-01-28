---
title: "Día 4 — ¡Casi terminado!"
lang: es
layout: ~/layouts/MainLayout.astro
---

Estuve dos días escribiendo el código (ahora disponible en [GitHub](https://github.com/JuanM04/the-cloc)), y así es cómo funciona:

## El editor

Es una página hosteada en Vercel (no quería usar mucha CPU de RasPi, así que la hosteé afuera): [esta página](https://thecloc.juanm04.com). En esta, le decís la IP de la RasPi y la página mediante llamadas HTTP obtiene la configuración (lo explico luego).

Si no estás logueado con Spotify, el editor en sí se encargará de todo el *Authorization Flow* y le enviará las credenciales a la RasPi.

Tiene una interfaz tipo dashboard, con todos los valores personalizables. Cuando terminaste de editar la configuración, esta se envía a la RasPi vía POST.

Finalmente, esta página tiene una API que le permite a la RasPi enviarle las credenciales de Spotify y que vuelva la canción con toda la metadata.

![El Editor](/images/docs/the-cloc/the-editor.jpg)

## El Wake-up-ator (WUA)

Está compuesto de dos partes: la primera es el _editor server_, que es el encargado de recibir los llamados del Editor. Tiene dos métodos: GET y POST, los cuales envían y reciven-escriben la configuración respectivamente.

La segunda parte está formada de varios scripts de Python que controlan las luces y la música. Cada 15 minutos, un *cron* ejecuta `main.py`, el cual decide qué hacer dependiendo de la hora: puede encender las luces, cambiar el color, o encender la alarma.

## Diagramas

![Flujo de Login](/images/docs/the-cloc/flow_1.png)
![Flujo de seteo de configuración](/images/docs/the-cloc/flow_2.png)
![Flujo de obtención de la canción](/images/docs/the-cloc/flow_3.png)

### Cosas que no deberían ser como son

- Teoricamente, según la documentación de la API de Spotify, no haría falta estar logueado en Spotify para obtener la canción, pero por algún motivo, Spotify necesita que lo estés.
- Un pequeño fundido es agregado a la canción. El problema que lo estoy añadiendo en la Raspberry, aumentando la cancidad de CPU usado, en vez de añadirlo en Vercel. El problema es que PyDub es taaaan mágico y fácil de usar que no me quiero molestar en instalar FFmpeg en Vercel.

[&larr; Día 3](/images/docs/docs/the-cloc/dia-3) | [Día 5 &rarr;](/images/docs/docs/the-cloc/dia-5)