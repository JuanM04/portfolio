import React from "react"
import styled from "styled-components"
import { hr } from "../styles"

import { About, Projects, Toolbox } from "../components/home"
import { SEO } from "../components"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"

library.add(faEnvelope, faTwitter, faGithub)

const StyledHeader = styled.header`
  ${hr}
  margin-top: 10vh;
  padding-bottom: 5vh;

  h1,
  h3 {
    margin: 0;
    text-align: center;
  }

  h1 {
    font-weight: bold;
    font-size: 50px;
  }

  h3 {
    font-weight: normal;
    font-size: 18px;
  }
`

export default () => (
  <>
    <SEO title="Full-stack developer" />
    <StyledHeader>
      <h1>JuanM04</h1>
      <h3>Full-Stack Developer</h3>
    </StyledHeader>
    <About />
    <Projects />
    <Toolbox />
  </>
)
