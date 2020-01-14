import React, { useState, useEffect, useRef } from "react"
import slugify from "slugify"
import { Spinner, Section } from "components"
import { StyledA } from "styles"
import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  * {
    margin: 10px 5px;
  }
`

const To = () => {
  const [urls, setUrls] = useState({})
  const [loading, setLoading] = useState(true)
  const [inputs, setInputs] = useState({
    name: "",
    url: "",
    password: "",
  })
  const form = useRef(null)

  const inputId = slugify(inputs.name, { lower: true })

  async function fetchAndUpdate(newUrls) {
    return fetch("/api/to/update-urls", {
      method: "POST",
      body: JSON.stringify({
        password: inputs.password,
        urls: newUrls,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(success => {
        if (success) {
          setUrls(newUrls)
          setInputs({
            name: "",
            url: "",
            password: "",
          })
        } else {
          alert("Error")
        }
      })
      .catch(e => {
        alert("Invalid password")
      })
  }

  async function create(e) {
    e.preventDefault()
    setLoading(true)
    if (!form.current.checkValidity()) {
      alert("Error")
    } else {
      await fetchAndUpdate({
        ...urls,
        [inputId]: {
          name: inputs.name,
          url: inputs.url,
        },
      })
    }
    setLoading(false)
  }

  async function remove() {
    setLoading(true)
    if (urls[inputId] == undefined) {
      alert("That doesn't exist")
    } else {
      let newUrls = Object.assign({}, urls)
      delete newUrls[inputId]

      await fetchAndUpdate(newUrls)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetch("/api/to/get-urls")
      .then(res => res.json())
      .then(data => {
        setUrls(data)
        setLoading(false)
      })
  }, [])

  let urlsList = []
  for (const id in urls) {
    if (urls[id] != null) {
      urlsList.push({
        ...urls[id],
        id,
      })
    }
  }
  return (
    <>
      <Section title="To - URL Shortener">
        <StyledForm onSubmit={create} ref={form}>
          <div />
          <span>/{inputId}</span>
          <input
            type="text"
            placeholder="Name"
            value={inputs.name}
            onChange={e => setInputs({ ...inputs, name: e.target.value })}
            required
            disabled={loading}
          />
          <input
            type="url"
            placeholder="URL"
            value={inputs.url}
            onChange={e => setInputs({ ...inputs, url: e.target.value })}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={inputs.password}
            onChange={e => setInputs({ ...inputs, password: e.target.value })}
            required
            disabled={loading}
          />
          <div>
            <button onClick={create} disabled={loading}>
              Create
            </button>
            <button onClick={remove} disabled={loading}>
              Remove
            </button>
          </div>
        </StyledForm>
      </Section>
      <Section title="URLs">
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            {urlsList.map(url => (
              <li key={url.id}>
                <StyledA href={`/to/${url.id}`}>{url.name}</StyledA>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  )
}

export default To
