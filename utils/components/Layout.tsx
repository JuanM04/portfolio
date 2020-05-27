import { ReactNode } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { TOOLS, SOCIALS } from "data"
import styles from "styles/layout"

type _Props = {
  title: string
  children: ReactNode
  noIndexPage?: boolean
}

export default (props: _Props) => {
  const selected = useRouter().pathname.split("/")[1]

  return (
    <>
      <Head>
        <title>{props.title} | JuanM04</title>
        <meta
          name="robots"
          content={!props.noIndexPage ? "index, follow" : "noindex, nofollow"}
        />
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />
      </Head>
      <header className={styles.header}>
        <h3>
          <Link href="/index" as="/">
            <a>JuanM04</a>
          </Link>
        </h3>
        <ul>
          {TOOLS.map((t) => (
            <li key={t.slug}>
              <Link href={`/${t.slug}`}>
                <a
                  className={selected === t.slug ? styles.selected : undefined}
                >
                  {t.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </header>
      {props.children}
      <footer className={styles.footer}>
        <ul>
          {SOCIALS.map(({ icon, url }, i) => (
            <li key={i}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={icon} />
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  )
}
