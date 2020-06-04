import { useState } from "react"
import Head from "next/head"

import { Layout } from "components"
import { PROJECTS, SKILLS } from "data"
import styles from "styles/home"

const i18n: {
  [lang: string]: {
    skills: string
    projects: {
      title: string
      description: string
      released: {
        label: string
        moment: {
          [moment in "EARLY" | "MID" | "LATE"]: string
        }
      }
      homepage: string
    }
  }
} = {
  en: {
    skills: "Skills",
    projects: {
      title: "Projects",
      description: "Description",
      released: {
        label: "Released",
        moment: {
          EARLY: "Early",
          MID: "Mid",
          LATE: "Late",
        },
      },
      homepage: "Homepage",
    },
  },
  es: {
    skills: "Habilidades",
    projects: {
      title: "Proyectos",
      description: "Descripción",
      released: {
        label: "Lanzamiento",
        moment: {
          EARLY: "Principios de",
          MID: "Mediados de",
          LATE: "Fines de",
        },
      },
      homepage: "Sitio web",
    },
  },
}

export default () => {
  const inSpanish =
    typeof navigator !== "undefined"
      ? navigator.language.startsWith("es")
      : false
  const text = inSpanish ? i18n.es : i18n.en

  return (
    <Layout title="Full-Stack Developer" noOG>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="JuanM04" />
        <meta
          property="og:image"
          content="https://juanm04.com/images/.og/index.png"
        />
      </Head>
      {inSpanish ? (
        <p>
          Mi nombre es Juan Martín Seery. Nací en Argentina en el 2004. Empecé a
          programar a los 12 años haciendo páginas web básicas en HTML, y
          lentamente me focalicé en el Backend. Hoy en día, hago pequeños
          proyectos en mi tiempo libre.
        </p>
      ) : (
        <p>
          My name is Juan Martín Seery. I was born in 2004 in Argentina. I
          started programming at the age of 12 doing basic HTML pages, and
          slowly focused in Backend. Nowadays, I do small projects in my free
          time.
        </p>
      )}
      <details>
        <summary>{text.skills}</summary>
        <div className={styles.skills}>
          {SKILLS.map((skills, i) => (
            <div key={i}>
              {skills.map((icon) => (
                <div key={icon.slug}>
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    fill={`#${icon.hex}`}
                    width={32}
                    height={32}
                  >
                    <path d={icon.path} />
                  </svg>
                  <span>{icon.title}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </details>
      <h2>{text.projects.title}</h2>
      <ul className={styles.projects}>
        {PROJECTS.map((p, i) => {
          const [active, setActive] = useState(false)
          return (
            <li key={i} className={active ? styles.active : undefined}>
              <div onClick={() => setActive(!active)}>
                <span>{p.name}</span>
                <span>{p.description[inSpanish ? "es" : "en"]}</span>
              </div>
              <ul>
                <li>
                  <span className={styles.label}>
                    {text.projects.description}
                  </span>
                  {p.description[inSpanish ? "es" : "en"]}
                </li>
                <li>
                  <span className={styles.label}>Stack</span>
                  {p.stack.map((item, i) => (
                    <span key={i} className={styles.item}>
                      {item}
                    </span>
                  ))}
                </li>
                <li>
                  <span className={styles.label}>
                    {text.projects.released.label}
                  </span>
                  {text.projects.released.moment[p.released.moment]}{" "}
                  {p.released.year}
                </li>
                <li>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {text.projects.homepage}
                  </a>
                </li>
              </ul>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}
