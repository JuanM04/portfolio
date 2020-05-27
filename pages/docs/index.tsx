import { GetStaticProps } from "next"
import Link from "next/link"
import fs from "fs"
import matter from "gray-matter"

import { Layout } from "components"

type Doc = {
  slug: string
  data: DocData
}

type Category = {
  category: string | null
  docs: Doc[]
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync("docs")
  const docs = await Promise.all(
    files.map(async file => {
      const slug = file.split(".")[0]
      const { data } = matter.read(`docs/${slug}.md`)

      return { slug, data }
    })
  )
  return { props: { docs } }
}

export default ({ docs }: { docs: Doc[] }) => {
  let categories: Category[] = [
    {
      category: null,
      docs: [],
    },
  ]
  docs.forEach(doc => {
    if (!doc.data.category) categories[0].docs.push(doc)
    else {
      const i = categories.findIndex(cat => cat.category === doc.data.category)
      if (i === -1)
        categories.push({
          category: doc.data.category,
          docs: [doc],
        })
      else categories[i].docs.push(doc)
    }
  }, [])

  return (
    <Layout title="Docs">
      {categories.map(({ category, docs }) => (
        <div key={category || "none"}>
          {category && <h4>{category}</h4>}
          <ul>
            {docs.map(doc => (
              <li key={doc.slug}>
                <Link href="/docs/[slug]" as={`/docs/${doc.slug}`}>
                  <a>{doc.data.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Layout>
  )
}
