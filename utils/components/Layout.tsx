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
  noOG?: boolean
}

const Layout = (props: _Props) => {
  const selected = useRouter().pathname.split("/")[1]

  return (
    <>
      <Head>
        <title>{props.title} | JuanM04</title>
        <meta
          name="robots"
          content={!props.noIndexPage ? "index, follow" : "noindex, nofollow"}
        />
        <link
          rel="shortcut icon"
          href="/images/icons/Icon-32.png"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/images/icons/Icon-192.png"></link>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#CE125A" />
        {selected && !props.noOG && (
          <>
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="JuanM04" />
            <meta
              property="og:image"
              content={`https://juanm04.com/images/.og/${selected}.png`}
            />
          </>
        )}
      </Head>
      <header className={styles.header}>
        <Link href="/index" as="/">
          <img src="/images/Full logo.png" alt="Logo" />
        </Link>
        <div>
          {TOOLS.map(({ name, slug }) => (
            <label title={name} key={slug}>
              <Link href={`/${slug}`}>
                <img
                  src={`/images/icons/${slug}-48.png`}
                  alt={name}
                  className={selected === slug ? styles.selected : undefined}
                />
              </Link>
            </label>
          ))}
        </div>
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

export default Layout
