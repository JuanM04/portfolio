import fetch from "node-fetch"
import redirect from "micro-redirect"

export default (req, res) => {
  fetch(process.env.TO_GIST_URL)
    .then(res => res.json())
    .then(data => {
      const content = JSON.parse(data.files["to.json"].content)

      if (content[req.query.id]) {
        redirect(res, 302, content[req.query.id].url)
      } else {
        res.status(404).send("NOT FOUND")
      }
    })
}
