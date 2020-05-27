import { GetServerSideProps } from "next"

import Error from "pages/404"
import { getGist } from "utils/helpers"

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}) => {
  const files = await getGist(process.env.GIST_TO as string)
  const redirects: Redirects = JSON.parse(files[0].text)

  if(typeof params?.slug === 'string' && redirects[params.slug]) {
    res.statusCode = 302
    res.setHeader("Location", redirects[params.slug].url)
    res.end()
    return { props: { error: false } }
  } else {
    res.statusCode = 404
  }

  return { props: {} }
}

export default ({ error = true }) => error ? <Error msg="Redirect not found" /> : <p>Redirecting...</p>
