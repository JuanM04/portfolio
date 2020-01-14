import React from "react"
import { Link, graphql } from "gatsby"

import { Layout } from "components/docs"
import { DocLink, Category } from "styles/docs"

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___title, order: ASC }) {
      distinct(field: frontmatter___category)
      edges {
        node {
          frontmatter {
            title
            id
            category
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const docs = data.allMarkdownRemark.edges
  const categories = data.allMarkdownRemark.distinct.sort((a, b) =>
    a.localeCompare(b)
  )
  const categorylessDocs = docs.filter(
    ({ node }) => node.frontmatter.category === null
  )

  return (
    <Layout>
      <div className="documents">
        {categories.map(category => (
          <Category>
            <h3>{category}</h3>
            {docs
              .filter(({ node }) => node.frontmatter.category === category)
              .map(({ node }) => {
                const { title, id } = node.frontmatter

                return (
                  <DocLink key={id}>
                    <Link className="big-link" to={`/docs/${id}`}>
                      {title}
                    </Link>
                  </DocLink>
                )
              })}
          </Category>
        ))}
        {categorylessDocs.length > 0 && (
          <Category>
            <h3>Others</h3>
            {categorylessDocs.map(({ node }) => {
              const { title, id } = node.frontmatter

              return (
                <DocLink key={id}>
                  <Link className="big-link" to={`/docs/${id}`}>
                    {title}
                  </Link>
                </DocLink>
              )
            })}
          </Category>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage
