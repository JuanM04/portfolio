import React, { useState } from "react"
import styled from "styled-components"
import { dot, theme, StyledA } from "../styles"
import Section from "./section"

import PROJECTS from "../utils/projects.json"

const StyledLi = styled.li`
  * {
    transition: 0.33s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .top {
    .name {
      ${dot}
    }

    .description {
      color: ${theme.secondaryTextColor};
    }

    &:hover {
      cursor: pointer;
      .name {
        color: ${theme.primaryColor};
      }
    }
  }

  .info {
    max-height: 0;
    overflow: hidden;
    list-style: none;
    padding: 0;

    li {
      font-weight: 300;
      margin: 0;

      .name {
        ${dot}
        font-weight: normal;
      }

      a.name::after {
        content: none;
      }

      .stack-item {
        ${dot}

        &:last-of-type::after {
          content: none;
        }
      }
    }
  }

  &.active {
    .top {
      margin-bottom: 10px;

      .name {
        font-weight: bold;
        font-size: 20px;

        &::after {
          content: none;
        }
      }

      .description {
        opacity: 0;
        @media (max-width: ${theme.bodyMaxWidth}) {
          display: none;
        }
      }
    }

    .info {
      margin-bottom: 25px;
      max-height: 75px;
      @media (max-width: ${theme.bodyMaxWidth}) {
        max-height: 150px;
      }
    }
  }
`

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
    <StyledLi className={"project" + (active ? " active" : "")}>
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
          <StyledA
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="name"
          >
            Homepage
          </StyledA>
        </li>
      </ul>
    </StyledLi>
  )
}
