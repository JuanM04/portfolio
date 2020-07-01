import { GetStaticPaths, GetStaticProps } from "next"
import fs from "fs"
import matter from "gray-matter"

import { Layout, DocItem } from "components"
import { DOC_CATEGORIES } from "utils/data"

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(DOC_CATEGORIES).map((c) => `/docs/${c}`),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.category || typeof params.category !== "string")
    return { props: {} }
  const { category } = params

  const files = fs.readdirSync(`docs/${category}`)

  const docs = await Promise.all(
    files.map(async (file) => {
      const { data } = matter.read(`docs/${category}/${file}`)

      return {
        slug: `${category}/${file.split(".")[0]}`,
        category,
        data,
      }
    })
  )
  return { props: { category: category, docs } }
}

export default ({ category, docs }: { category: string; docs: Doc[] }) => {
  return (
    <Layout title={`${category} | Docs`}>
      <DocItem.DocCategory
        key={category}
        slug={category}
        name={DOC_CATEGORIES[category]}
        docs={docs}
      />
    </Layout>
  )
}
