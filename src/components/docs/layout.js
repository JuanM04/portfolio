import React from "react"
import PropTypes from "prop-types"

import { Header } from "."
import { GlobalStyles, Main } from "styles/docs"
import "katex/dist/katex.min.css"

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Header siteTitle="Docs" />
      <Main>{children}</Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
