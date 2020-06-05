---
title: Cómo convertí mi sitio web en mi caja de herramientas hacker
category: Pseudo blog
---

Posiblemente tengas un sitio web personal, mostrando quién eres, qué haces y tus proyectos pasados. Yo tenía un sitio así, pero descubrí el poder de las aplicaciones web.

> A lo largo de este post, diré nombres que te pueden resultar extraños, pero no te preocupes. Varios están a modo de ejemplo para poner las diferentes posibilades sobre la mesa, y luego tú investigues y elijas la más acorte a tus preferencias.

Resulta que, es muy fácil hacer aplicaciones simples, gratis, e interconectadas. Si observas [mi sitio](https://juanm04.com), verás una presentación hacia mi persona (como cualquier otra). Lo que distinto es que en vez del común `Inico | Acerca De | Contacto` que tienen la mayoría de portfolios, el mío tiene mis **aplicaciones**.

Por ejemplo, **BPM**: este es un simple contador de pulsaciones; útil cuando no tienes un smartwatch cerca o quieres saber el ritmo de una canción. ¿Qué diferencia tiene del resto? Técnicamente, hace lo mismo, pero no explica cómo se usa, ya que no está destinada a otros usuarios; y sé que puedo acceder a ella desde cualquier lado con Internet, yendo a [juanm04.com/bpm](/bpm).

Otra es **To**, un acortado de URL. ¿Otro más? Puede ser, pero este me permite tener un registro de todos los links que comparto y ponerle una URL personalizada. Para usar esto, solo necesito saber la contraseña. Sí, es un poco inseguro, pero siempre puedes hacer que te envíe un email de confirmación o loguearte con código QR... las posibilidades son infinitas.

Ahora, ¿Por qué debería importarme esto si tengo todo eso en mi PC? Esto te sirve cuando estás fuera de tus comodidades. Imagínate que estás en la casa de tu amigo y necesitas compartir un archivo de varios megas, y no quieres complicarte con WhatsApp y los tiempos de subida: usas tu página para trasferir archivos con [WebRTC](https://webrtc.org/) y P2P ultra velozmente. Tienes que dictar una URL muy extensa, así que la pasas por tu acortador propio y listo. Incluso puedes convertir tu página en una PWA y usarla como una (pseudo) aplicación.

El fin de este artículo es demostrar el poder de tener un dominio. Esa posibilidad de solucionarte la vida fuera de tu PC solo te la da la web: no tienes que descargar ni instalar nada. Con unos pocos megas de banda ancha, tienes a tu disposición tus herramientas hacker.

## ¿Cómo puedo hacer esto?
No _necesitas_ pagar un dominio, siempre puedes usar uno gratis (como los de [Netlify](https://www.netlify.com/), [Vercel](https://www.vercel.com) u otros), pero cuestan alrededor U$D 20 por año, y te acortan el largo de la URL bastante.

Lo siguiente es a gusto propio: puedes pagar un hosting (como [DigitalOcean](https://www.digitalocean.com/products/droplets/), [AWS](https://aws.amazon.com/ec2/), [GCP](https://cloud.google.com/compute), [Azure](https://azure.microsoft.com/en-us/services/virtual-machines/), o cualquiera que te brinde un servidor) y usar el framework/lenguaje que quieras (puede ser interesante usar Docker). La otra es usar [serverless](https://platzi.com/blog/microservicios-sin-servidor/), el cual Vercel, Netlify y [AWS](https://aws.amazon.com/lambda/) brindan gratis.

Para guardar datos, puedes:
- hostear una base de datos, lo cual puede ser desde [gratis](https://firebase.google.com/products/firestore) hasta carísimo;
- si la data es simple y escasa, usar [GitHub Gists](https://gist.github.com/) o [Pastebin](https://www.pastebin.com);
- si estás hosteando un blog o [cualquier variante](/docs), con que guardes los documentos dentro del repositorio, basta.

### Mi Stack

Uso [Next.js](https://nextjs.org) hosteado en Vercel, lo cual me brinda alto performance sin pagar un peso. Los documentos están guardado en un repositorio en GitHub. Las URL las tengo guardadas en un Gist, ya que son públicas y no guardo información confidencial.

### Quiero tecnicismos >:(

Mi sitio web está hosteado en un repositorio público, en [GitHub](https://github.com/JuanM04/juanm04). Es bastante simple, pero puedes investigarlo un poco.

## Conclusión

Ya mismo puedes crear tu kit de herramientas práctica gratuitamente e ir expandiéndolo con el tiempo. Si no sabes por dónde empezar, puedes aprender a crear tu primera página web con Platzi e ir expandiendo tus apps.