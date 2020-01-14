import React from "react"

export default props => (
  <section>
    <h2>{props.title}</h2>
    {props.children}
  </section>
)
