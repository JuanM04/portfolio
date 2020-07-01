import Link from "next/link"

const DocItem = (doc: Doc) => (
  <li key={doc.slug}>
    <Link href="/docs/[...slug]" as={`/docs/${doc.slug}`}>
      <a>{doc.data.title}</a>
    </Link>
  </li>
)

const DocCategory = ({ slug, name, docs }: Category) => (
  <div>
    <Link href="/docs/[category]" as={`/docs/${slug}`}>
      <h4 style={{ cursor: "pointer" }}>{name}</h4>
    </Link>
    <ul>
      {docs
        .sort((a, b) => a.data.title.localeCompare(b.data.title))
        .map((doc) => (
          <DocItem key={doc.slug} {...doc} />
        ))}
    </ul>
  </div>
)

export default {
  DocItem,
  DocCategory,
}
