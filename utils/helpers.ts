import { GraphQLClient } from "graphql-request"

export const ghClient = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    Authorization: "token " + process.env.GITHUB_TOKEN,
  },
})

export const getGist = async (id: string) => {
  const data = await ghClient.request<any>(
    /* GraphQL */ `
      query Gist($id: String!) {
        viewer {
          gist(name: $id) {
            files {
              name
              text
            }
          }
        }
      }
    `,
    { id }
  )

  return data.viewer.gist.files as { name: string; text: string }[]
}

export const slugify = (str: string) => {
  const PUNCTUATION = /[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gi
  return str
    .trim()
    .replace(PUNCTUATION, "")
    .replace(/ /g, "-")
    .toLocaleLowerCase()
}
