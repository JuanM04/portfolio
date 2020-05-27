import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send("FORBIDDEN")
  }

  fetch(`https://api.github.com/gists/${process.env.GIST_TO}`, {
    method: "PATCH",
    headers: {
      Authorization: "token " + process.env.GITHUB_TOKEN,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      files: {
        "to.json": {
          content: JSON.stringify(req.body.redirects),
        },
      },
    }),
  })
    .then(_ => res.send(true))
    .catch(_ => res.send(false))
}
