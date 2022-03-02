import type { VercelApiHandler } from "@vercel/node"
import fetch from "node-fetch"
import sharp from "sharp"

const handler: VercelApiHandler = async (req, res) => {
  const src = req.query?.src as string

  if (typeof src !== "string") {
    res.status(400).send("Invalid ?src=")
    return
  }

  const syntax = await fetch(src)
    .then((res) => res.buffer())
    .catch((_) => null)

  if (syntax === null) {
    res.status(500).send("Error fetching the image")
    return
  }

  const avif = await sharp(syntax).resize(150).avif({ quality: 85 }).toBuffer()

  res.setHeader("Content-Type", "image/avif")
  res.setHeader("Cache-Control", "max-age=604800, public") // one week
  res.send(avif)
}

export default handler
