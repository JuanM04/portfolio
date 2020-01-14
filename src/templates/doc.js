import React, { useEffect } from "react"
import { graphql } from "gatsby"

import { SEO } from "components"
import { Layout } from "components/docs"
import { DocHeader, DocBody } from "styles/docs"

export const query = graphql`
  query($id: String!) {
    markdownRemark(frontmatter: { id: { eq: $id } }) {
      html
      frontmatter {
        title
        category
      }
    }
  }
`

const Doc = props => {
  const metadata = props.data.markdownRemark.frontmatter
  const html = props.data.markdownRemark.html

  useEffect(() => {
    document.querySelectorAll("a.heading-anchor").forEach(anchor => {
      anchor.parentElement.addEventListener("mouseenter", () =>
        anchor.classList.add("heading-anchor--visible")
      )
      anchor.parentElement.addEventListener("mouseleave", () =>
        anchor.classList.remove("heading-anchor--visible")
      )
    })
  }, [])

  return (
    <Layout>
      <SEO title={metadata.title} />
      <DocHeader>
        <h1>{metadata.title}</h1>
        <span>{metadata.category}</span>
      </DocHeader>
      <DocBody dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default Doc
