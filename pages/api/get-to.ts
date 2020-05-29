import { NextApiRequest, NextApiResponse } from "next"
import { getGist } from "utils/helpers"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const files = await getGist(process.env.GIST_TO as string)
  return res.send(JSON.parse(files[0].text))
}
