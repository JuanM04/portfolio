/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const React = require("react")
const { Global } = require("./src/styles")
const { Footer, SEO } = require("./src/components")

const TOOLS = require("./src/utils/tools.json")

function getTool(uri) {
  return TOOLS.find(tool => tool.id === uri.substring(1))
}

exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <>
      <Global />
      {props.uri && !props.custom404 && props.uri !== "/" && (
        <SEO title={getTool(props.uri).name} />
      )}
      {element}
      <Footer />
    </>
  )
}
