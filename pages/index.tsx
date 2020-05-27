import { useState } from "react"

import { Layout } from "components"
import { PROJECTS, SKILLS } from "data"
import styles from "styles/home"

export default () => (
  <Layout title="Full-Stack Developer">
    <p>
      My name is Juan Martín Seery. I was born in 2004 in Argentina. I started
      programming at the age of 12 doing basic HTML pages, and slowly focused in
      Backend. Nowadays, I do small projects in my free time.
    </p>
    <details>
      <summary>Skills</summary>
      <div className={styles.skills}>
        {SKILLS.map((skills, i) => (
          <div key={i}>
            {skills.map(icon => (
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
    <h2>Projects</h2>
    <ul className={styles.projects}>
      {PROJECTS.map((p, i) => {
        const [active, setActive] = useState(false)

        return (
          <li key={i} className={active ? styles.active : undefined}>
            <div onClick={() => setActive(!active)}>
              <span>{p.name}</span>
              <span>{p.description}</span>
            </div>
            <ul>
              <li>
                <span className={styles.label}>Description</span>
                {p.description}
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
                <span className={styles.label}>Released</span>
                {p.released}
              </li>
              <li>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  Homepage
                </a>
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  </Layout>
)
