import fetch from "node-fetch"

export default (req, res) => {
  if (req.body.password !== process.env.TO_PASSWORD) {
    return res.status(403).send("FORBIDDEN")
  }

  fetch(process.env.TO_GIST_URL, {
    method: "PATCH",
    headers: {
      Authorization: "token " + process.env.TO_GITHUB_TOKEN,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      files: {
        "to.json": {
          content: JSON.stringify(req.body.urls),
        },
      },
    }),
  })
    .then(_ => {
      console.log(_)
      res.send(true)
    })
    .catch(_ => {
      res.send(false)
    })
}
