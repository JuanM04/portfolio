import { useState } from "react"
import { GetServerSideProps } from "next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import slugify from "slugify"

import { Layout } from "components"
import { getGist } from "utils/helpers"
import styles from "styles/to"

export const getServerSideProps: GetServerSideProps = async _ => {
  const files = await getGist(process.env.GIST_TO as string)

  return { props: { redirects: JSON.parse(files[0].text) } }
}

export default (props: { redirects: Redirects }) => {
  const [redirects, setRedirects] = useState(props.redirects)
  const [inputs, setInputs] = useState({ name: "", url: "", password: "" })
  const [loading, setLoading] = useState(false)

  function update(newRedirects: Redirects) {
    setLoading(true)
    fetch("/api/update-to", {
      method: "POST",
      body: JSON.stringify({
        password: inputs.password,
        redirects: newRedirects,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(success => {
        if (success) {
          setRedirects(newRedirects)
        } else {
          alert("Error")
        }
      })
      .catch(_ => alert("Invalid password"))
      .finally(() => {
        setLoading(false)
        setInputs({ name: "", url: "", password: "" })
      })
  }

  return (
    <Layout title="To">
      <form
        onSubmit={e => {
          e.preventDefault()
          update({
            ...redirects,
            [slugify(inputs.name, { lower: true })]: {
              name: inputs.name,
              url: inputs.url,
            },
          })
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={inputs.name}
          onChange={e => setInputs({ ...inputs, name: e.target.value })}
          disabled={loading}
          required
        />
        <br />
        <input
          type="url"
          placeholder="URL"
          value={inputs.url}
          onChange={e => setInputs({ ...inputs, url: e.target.value })}
          disabled={loading}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Admin Password"
          value={inputs.password}
          onChange={e => setInputs({ ...inputs, password: e.target.value })}
          disabled={loading}
          required
        />
        <br />
        <button type="submit">Create</button>
      </form>
      <hr />
      <ul>
        {Object.keys(redirects).map(slug => (
          <li key={slug} className={styles.url}>
            <a href={`/to/${slug}`} target="_blank" rel="noopener noreferrer">
              {redirects[slug].name}
            </a>
            {!loading && (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => {
                  let newRedirects = Object.assign({}, redirects)
                  delete newRedirects[slug]
                  update(newRedirects)
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </Layout>
  )
}
