/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { resolve } = require("path")

// Create Docs pages
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const docComponent = resolve(__dirname, "src/templates/doc.js")

  return graphql(/* GraphQL */ `
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              id
            }
          }
        }
      }
    }
  `).then(({ data }) => {
    data.allMarkdownRemark.edges.forEach(({ node }) => {
      const path = "/docs/" + node.frontmatter.id
      createPage({
        path,
        component: docComponent,
        context: {
          id: node.frontmatter.id,
        },
      })
    })
  })
}
