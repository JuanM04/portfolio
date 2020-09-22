type Project = {
  name: string
  description: {
    en: string
    es: string
  }
  stack: string[]
  released: {
    year: number
    moment: "EARLY" | "MID" | "LATE"
  }
  url?: string
}

const PROJECTS: Project[] = [
  {
    name: "Hidro Industrial",
    description: {
      en: "A website for a factory",
      es: "Un sitio web para una fábrica",
    },
    stack: [
      "Next.js",
      "SASS",
      "Figma",
      "Google Sheets (auto-update)",
      "Mapbox",
    ],
    released: {
      year: 2020,
      moment: "MID",
    },
    url: "https://hidroindustrial.com.ar",
  },
  {
    name: "Seery Facturas",
    description: {
      en: "A billing program connected with AFIP (argentine IRS)",
      es: "Un programa de facturación conectado con la AFIP",
    },
    stack: [
      "Next.js",
      "Prisma",
      "MySQL",
      "Docker",
      "AFIP WS",
      "Authentication",
    ],
    released: {
      year: 2020,
      moment: "MID",
    },
  },
  {
    name: "Organit",
    description: {
      en: "The definitive tool for students",
      es: "La herramienta definitiva para los estudiantes",
    },
    stack: [
      "Flutter",
      "Firebase (Auth, Firestore, Storage, Functions)",
      "Push Notifications",
      "Google AdMob",
      "Sentry",
      "Web App with Firestore",
    ],
    released: {
      year: 2020,
      moment: "EARLY",
    },
    url: "https://organit.juanm04.com",
  },
  {
    name: "Cartas Negras",
    description: {
      en: "Cards Against Humanity as an app (and argentine)",
      es: "Cards Against Humanity como una app (con un toque argentino)",
    },
    stack: ["Flutter", "Firebase (Auth & Firestore)"],
    released: {
      year: 2019,
      moment: "LATE",
    },
    url:
      "https://play.google.com/store/apps/details?id=com.juanm04.cartas_negras",
  },
  {
    name: "Animú",
    description: {
      en: "Android app to watch anime",
      es: "Aplicación Android para mirar anime",
    },
    stack: ["Flutter", "Vercel", "Web Scrapping"],
    released: {
      year: 2019,
      moment: "LATE",
    },
    url: "https://animu.juanm04.com",
  },
  {
    name: "PaseTec",
    description: {
      en: "An electronic system of scholar transport",
      es: "Un sistema de tranporte escolar electrónico",
    },
    stack: ["Next.js (PWA)", "Vercel", "GraphQL", "MySQL (Prisma)", "Arduino"],
    released: {
      year: 2019,
      moment: "MID",
    },
    url: "https://pasetec.juanm04.com",
  },
  {
    name: "Veritas (v2)",
    description: {
      en: "Group scholar schedule",
      es: "Horarios escolares grupales",
    },
    stack: ["Next.js", "Vercel", "PWA with Offline support", "MySQL (Prisma)"],
    released: {
      year: 2019,
      moment: "MID",
    },
    url: "https://github.com/JuanM04/veritas-pwa",
  },
  {
    name: "WatchWith",
    description: {
      en:
        "Watch media from Youtube, Twitch, Facebook, direct files and more synchronously",
      es:
        "Mirar videos de Youtube, Twitch, Facebook, archivos directos y más síncronamente",
    },
    stack: ["Next.js", "Vercel", "Pusher"],
    released: {
      year: 2019,
      moment: "EARLY",
    },
    url: "https://github.com/JuanM04/watch-with",
  },
  {
    name: "Bees: the game",
    description: {
      en: "Quiz-game about bees",
      es: "Preguntados, pero con abejas",
    },
    stack: ["React", "Electron"],
    released: {
      year: 2018,
      moment: "LATE",
    },
    url: "https://github.com/JuanM04/bees-thegame",
  },
]

export default PROJECTS
