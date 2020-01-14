import React from "react"

import About from "../components/about"
import Projects from "../components/projects"
import Toolbox from "../components/toolbox"
import Footer from "../components/footer"
import SEO from "../components/seo"

import "../styles/main.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"

library.add(faEnvelope, faTwitter, faGithub)

export default () => (
  <div className="App">
    <SEO title="Full-stack developer" />
    <header>
      <h1>JuanM04</h1>
      <h3>Full-Stack Developer</h3>
    </header>
    <About />
    <Projects />
    <Toolbox />
    <Footer />
  </div>
)
