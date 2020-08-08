import { NextApiRequest, NextApiResponse } from "next"

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(
    `http://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_KEY}&tag=hello&rating=G`
  )
  const { data } = await response.json()

  res.status(302)
  res.setHeader("Location", data.images.original.url)
  res.end()
}
