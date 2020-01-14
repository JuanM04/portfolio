import React from "react"
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
          <a href={`/${tool.id}`}>{tool.name}</a>
        </li>
      ))}
    </ul>
  </Section>
)
