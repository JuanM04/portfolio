import React from "react"
import { StyledA } from "../styles"
import Section from "./section"

import TOOLS from "../utils/tools.json"

export default () => (
  <Section title="Toolbox">
    <p>
      <i>Smaller projects that don't deserve being called "project"</i>
    </p>
    <ul>
      {TOOLS.map(tool => (
        <li key={tool.id}>
          <StyledA href={`/${tool.id}`}>{tool.name}</StyledA>
        </li>
      ))}
    </ul>
  </Section>
)
