import fetch from "node-fetch"

export default (req, res) => {
  fetch(process.env.TO_GIST_URL)
    .then(res => res.json())
    .then(data => {
      res.send(JSON.parse(data.files["to.json"].content))
    })
}
