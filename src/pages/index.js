import React from "react"

import Header from '../components/header'
import Projects from '../components/projects'
import SEO from '../components/seo'

import '../styles/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faEnvelope, faDiscord, faGithub)


export default () => (
  <div className="App">
    <SEO title="Full-stack developer" />
    <Header />
    <Projects />
  </div>
)
