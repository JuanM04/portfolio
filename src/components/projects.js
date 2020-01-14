import React, { useState } from "react"
import Section from "./section"

import PROJECTS from "../utils/projects.json"

export default () => (
  <Section title="Projects">
    <ul>
      {PROJECTS.map(project => (
        <Project {...project} key={project.id} />
      ))}
    </ul>
  </Section>
)

function Project(project) {
  const [active, setActive] = useState(false)

  return (
    <li className={"project" + (active ? " active" : "")}>
      <div className="top" onClick={() => setActive(!active)}>
        <span className="name">{project.name}</span>
        <span className="description">{project.description}</span>
      </div>
      <ul className="info">
        <li>
          <span className="name">Description</span>
          {project.description}
        </li>
        <li>
          <span className="name">Stack</span>
          {project.stack.map((item, i) => (
            <span key={i} className="stack-item">
              {item}
            </span>
          ))}
        </li>
        <li>
          <span className="name">Released</span>
          {project.released}
        </li>
        <li>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="name"
          >
            Homepage
          </a>
        </li>
      </ul>
    </li>
  )
}
