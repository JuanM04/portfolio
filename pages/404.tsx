import { Layout } from "components"

const Error404 = ({ msg = "Not found" }) => (
  <Layout title="404" noIndexPage>
    <pre>404 - {msg}</pre>
  </Layout>
)

export default Error404
