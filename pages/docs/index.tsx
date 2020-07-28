import { GetStaticProps } from "next"
import fs from "fs"
import matter from "gray-matter"

import { Layout, DocItem } from "components"
import { DOC_CATEGORIES } from "utils/data"

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync("docs").reduce<string[][]>((accum, f) => {
    if (f.includes(".")) return [...accum, [f.split(".")[0]]]
    else
      return [
        ...accum,
        ...fs.readdirSync(`docs/${f}`).map((f2) => [f, f2.split(".")[0]]),
      ]
  }, [])

  const docs = await Promise.all(
    files.map(async (file) => {
      const slug = file.join("/")
      const { data } = matter.read(`docs/${slug}.md`)

      return {
        slug,
        data: {
          ...data,
          category: file.length > 1 ? file[0] : null,
        },
      } as Doc
    })
  )
  return { props: { docs } }
}

const DocsPage = ({ docs }: { docs: Doc[] }) => {
  let noCategory: Doc[] = []
  let categories: Category[] = []

  docs.forEach((doc) => {
    if (!doc.data.category) noCategory.push(doc)
    else {
      const i = categories.findIndex((cat) => cat.slug === doc.data.category)
      if (i === -1)
        categories.push({
          slug: doc.data.category,
          name: DOC_CATEGORIES[doc.data.category],
          docs: [doc],
        })
      else categories[i].docs.push(doc)
    }
  }, [])

  return (
    <Layout title="Docs">
      <div>
        {noCategory
          .sort((a, b) => a.data.title.localeCompare(b.data.title))
          .map((doc) => (
            <DocItem.DocItem key={doc.slug} {...doc} />
          ))}
      </div>
      {categories
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cat) => (
          <DocItem.DocCategory key={cat.slug} {...cat} />
        ))}
    </Layout>
  )
}

export default DocsPage
