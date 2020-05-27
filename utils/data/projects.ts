type Project = {
  name: string
  description: string
  stack: string[]
  released: string
  url: string
}

const PROJECTS: Project[] = [
  {
    name: "Organit",
    description: "The definitive tool for students",
    stack: [
      "Flutter",
      "Firebase (Auth, Firestore, Storage, Functions)",
      "Push Notifications",
      "Google AdMob",
      "Sentry",
      "Web App with Firestore",
    ],
    released: "Mid 2020",
    url: "https://organit.juanm04.com",
  },
  {
    name: "Cartas Negras",
    description: "Cards Against Humanity as an app (and argentine)",
    stack: ["Flutter", "Firebase (Auth and Firestore)"],
    released: "Late 2019",
    url:
      "https://play.google.com/store/apps/details?id=com.juanm04.cartas_negras",
  },
  {
    name: "Animú",
    description: "Android app to watch anime",
    stack: ["Flutter", "Vercel", "Web Scrapping"],
    released: "Late 2019",
    url: "https://animu.juanm04.com",
  },
  {
    name: "PaseTec",
    description: "An electronic system of scholar transport",
    stack: ["Next.js (PWA)", "Vercel", "GraphQL", "MySQL (Prisma)", "Arduino"],
    released: "Mid 2019",
    url: "https://pasetec.juanm04.com",
  },
  {
    name: "Veritas (v2)",
    description: "Group scholar schedule",
    stack: ["Next.js", "Vercel", "PWA with Offline support", "MySQL (Prisma)"],
    released: "Mid 2019",
    url: "https://github.com/JuanM04/veritas-pwa",
  },
  {
    name: "WatchWith",
    description:
      "Watch media from Youtube, Twitch, Facebook, direct files and more synchronously",
    stack: ["Next.js", "Vercel", "Pusher"],
    released: "Early 2019",
    url: "https://github.com/JuanM04/watch-with",
  },
  {
    name: "Bees: the game",
    description: "Quiz-game about bees (spanish)",
    stack: ["React", "Electron"],
    released: "Late 2018",
    url: "https://github.com/JuanM04/bees-thegame",
  },
]

export default PROJECTS
