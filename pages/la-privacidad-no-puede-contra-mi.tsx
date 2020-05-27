import { useState } from "react"

import { Layout } from "components"

export default () => {
  const [inputValue, setInputValue] = useState("")
  const [user, setUser] = useState<any>(null)

  function getUser(str: string) {
    fetch(
      validURL(str)
        ? str + (str.includes("?") ? "&" : "?") + "__a=1"
        : `https://www.instagram.com/${str}/?__a=1`
    )
      .then(res => res.json())
      .then(data =>
        setUser({
          name: data.graphql.user.full_name,
          avatar: data.graphql.user.profile_pic_url_hd,
        })
      )
      .catch(alert)
  }

  return (
    <Layout title="La privacidad no puede contra mí">
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Username or profile url"
        onKeyPress={e => {
          if (e.which === 13 || e.keyCode === 13) getUser(inputValue)
        }}
      />

      {user && (
        <div>
          <h4>{user.name}</h4>
          <img src={user.avatar} alt={user.name} />
        </div>
      )}
    </Layout>
  )
}

function validURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ) // fragment locator
  return !!pattern.test(str)
}
