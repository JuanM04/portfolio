import { useState } from "react"
import useSWR, { mutate } from "swr"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faCopy } from "@fortawesome/free-solid-svg-icons"

import { Layout } from "components"
import { slugify } from "utils/helpers"
import styles from "styles/to"

export default () => {
  const { data: redirects, error } = useSWR<Redirects>("/api/get-to", (url) =>
    fetch(url).then((r) => r.json())
  )
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
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          mutate("/api/get-to", newRedirects)
        } else {
          alert("Error")
        }
      })
      .catch((_) => alert("Invalid password"))
      .finally(() => {
        setLoading(false)
        setInputs({ name: "", url: "", password: "" })
      })
  }

  if (error) console.error(error)

  return (
    <Layout title="To">
      <div className={loading || !redirects ? styles.loading : ""}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (loading || !redirects) return
            update({
              ...redirects,
              [slugify(inputs.name)]: {
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
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            disabled={loading || !redirects}
            required
          />
          <br />
          <input
            type="url"
            placeholder="URL"
            value={inputs.url}
            onChange={(e) => setInputs({ ...inputs, url: e.target.value })}
            disabled={loading || !redirects}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Admin Password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            disabled={loading || !redirects}
            required
          />
          <br />
          <button type="submit">Create</button>
        </form>
        <hr />
        {!redirects ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {Object.keys(redirects)
              .sort((a, b) =>
                redirects[a].name.localeCompare(redirects[b].name)
              )
              .map((slug) => (
                <li key={slug} className={styles.url}>
                  <a
                    href={redirects[slug].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {redirects[slug].name}
                  </a>
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() =>
                      navigator.clipboard.writeText(`${location.href}/${slug}`)
                    }
                  />
                  {!loading && inputs.password.length > 1 && (
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
        )}
      </div>
    </Layout>
  )
}
