import { Layout } from "components"

export default ({ msg = "Not found" }) => (
  <Layout title="404" noIndexPage>
    <pre>404 - {msg}</pre>
  </Layout>
)
