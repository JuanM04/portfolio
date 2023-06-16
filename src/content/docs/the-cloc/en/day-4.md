---
title: "Day 4 — Almost finished!"
createdAt: 2020-07-26
updatedAt: 2020-09-10
---

So, I spent two days doing all the software (now available in [GitHub](https://github.com/JuanM04/the-cloc)), and this is how it works:

## The editor

This is a webpage hosted in Vercel (because I don't want to use so much CPU of the RasPi): [this one](https://thecloc.juanm04.com). Here, you tell the page the IP of the RasPi and HTTP to it (later I'll explain it) to get all the settings.

If you're no signed in with Spotify, the editor itself will handle the Authorization Flow and will POST to the RasPi with the credentials.

It has a dashboard-like interface, with all the values to change. When you are finished editing the settings, it will POST the changes.

Finally, it has and API endpoint that returns the all the Spotify data of the song that will be played.

![The Editor](/images/the-cloc/the-editor.jpg)

## The Wake-up-ator (WUA)

This is made of two parts: the firt one is the _editor server_, that is the one the Editor is talking to. It only has two methods: GET and POST, which sends and recieves-writes the settings.

The second part is all the Python scripts than control the lights and the music. Each 15 minutes, a cron executes `main.py`, and it decides what to do depending on the time: it can turns the lights on, changes it colors, or plays the alarm.

## Diagrams

![Login Flow](/images/the-cloc/flow_1.png)
![Settings change Flow](/images/the-cloc/flow_2.png)
![Get Song Flow](/images/the-cloc/flow_3.png)

### Things that shouldn't be that way

- Theorically, according to the Spotify API docs, being login in with Spotify isn't necessary, but Spotify doesn't gives you the song in MP3 unless you are authenticated.
- A little fade-in and fade-out is added to the song. The problem is that is added from the RasPi, but I would like to be added by Vercel, but PyDub is sooo magical that I just let it happen in the RasPi.

[&larr; Day 3](../day-3) | [Day 5 &rarr;](../day-5)
