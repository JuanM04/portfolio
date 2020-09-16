import { createElement } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import fs from "fs"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import RemarkMathPlugin from "remark-math"
import TeX from "@matejmazur/react-katex"

import { Layout, CodeBlock } from "components"
import { slugify } from "utils/helpers"
import { DOC_CATEGORIES } from "utils/data"
import styles from "styles/doc"

type _Props = {
  slug: string
  content: string
  data: DocData
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("docs").reduce<string[][]>((accum, f) => {
    if (f.includes(".")) return [...accum, [f.split(".")[0]]]
    else
      return [
        ...accum,
        ...fs.readdirSync(`docs/${f}`).map((f2) => [f, f2.split(".")[0]]),
      ]
  }, [])

  return {
    paths: files.map((f) => `/docs/${f.join("/")}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.slug !== "object") return { props: {} }

  const slug = params.slug.join("/")
  const { content, data } = matter.read(`docs/${slug}.md`)

  return {
    props: {
      slug,
      content,
      data: {
        ...data,
        category: params.slug.length > 1 ? params.slug[0] : null,
      },
    },
  }
}

const DocPage = ({ slug, data, content }: _Props) => {
  let macros: any = {
    "\\unit": "\\ \\text{#1}",
  }
  if (data.macros) {
    data.macros.forEach((macro) => (macros[macro.cmd] = macro.def))
  }

  let anchors: string[] = []

  return (
    <Layout title={data.title} noOG>
      <Head>
        <meta property="og:title" content={data.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://juanm04.com/docs/${slug}`} />
        <meta
          property="og:image"
          content={`https://juanm04.com/images/.og/docs/${slug}.png`}
        />
        <meta property="og:site_name" content="JuanM04 Docs" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css"
        />
      </Head>
      <h1 className={styles.title}>
        {data.title}
        {data.category && <span>{DOC_CATEGORIES[data.category]}</span>}
      </h1>
      <ReactMarkdown
        source={content}
        plugins={[RemarkMathPlugin]}
        renderers={{
          code: CodeBlock,
          math: ({ value }) => (
            <TeX settings={{ macros }} block>
              {value}
            </TeX>
          ),
          inlineMath: ({ value }) => <TeX settings={{ macros }}>{value}</TeX>,
          heading: (props) => {
            let anchor = slugify(props.children[0].props.children)
            if (anchors.includes(anchor)) {
              let timesRepeated = anchors.reduce(
                (accum, a) =>
                  new RegExp(`^${anchor}-\\d+$`).test(a) ? accum + 1 : accum,
                1
              )
              anchor += `-${timesRepeated}`
            }

            anchors.push(anchor)
            return createElement(
              `h${props.level}`,
              { id: anchor },
              props.children
            )
          },
          image: (props: { alt?: string; src: string }) => {
            const src = props.src.startsWith("/")
              ? `/images/docs${props.src}`
              : props.src

            if (!props.alt || !props.alt.startsWith("@")) {
              return (
                <>
                  <img src={src} style={{ margin: 0 }} />
                  {props.alt && <p className={styles.epigraph}>{props.alt}</p>}
                </>
              )
            } else {
              return (
                <>
                  {props.alt.toLowerCase().startsWith("@direct") && (
                    <video
                      controls
                      style={{ margin: 0, width: "100%", height: "56.25%" }}
                    >
                      <source src={src} />
                    </video>
                  )}
                  {props.alt.toLowerCase().startsWith("@embed") && (
                    <div className={styles.iframeContainer}>
                      <iframe src={src} frameBorder="0" allowFullScreen />
                    </div>
                  )}
                  {props.alt.split(" ").length >= 2 && (
                    <p className={styles.epigraph}>
                      {props.alt.substr(props.alt.split(" ")[0].length + 1)}
                    </p>
                  )}
                </>
              )
            }
          },
        }}
      />
    </Layout>
  )
}

export default DocPage
