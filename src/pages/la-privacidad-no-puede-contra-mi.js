import React, { useState } from "react"
import styled from "styled-components"
import { theme } from "styles"

const StyledDiv = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  input {
    border: none;
    border-bottom: 2px solid ${theme.primaryColor};
    font-size: 18px;
  }
`

export default () => {
  const [inputValue, setInputValue] = useState("")
  const [user, setUser] = useState(false)

  function getUser(str) {
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
    <StyledDiv>
      <section>
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Username or profile url"
          onKeyPress={e => {
            if (e.which === 13 || e.keyCode === 13) getUser(inputValue)
          }}
        />
      </section>

      {user && (
        <section>
          <h2>{user.name}</h2>
          <img src={user.avatar} alt={user.name} />
        </section>
      )}
    </StyledDiv>
  )
}

function validURL(str) {
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
