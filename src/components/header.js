import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => (
  <header className="Header gridded">
    <h1>
      Hi,<br/>
      I'm <span id="me">JuanM04</span>,<br/>
      full-stack developer.<br/>
    </h1>

    <div className="contacts">
      <a href="mailto:me@juanm04.com" target="_blank" rel="noopener noreferrer" className="contact"><FontAwesomeIcon icon={['fas', 'envelope']} /> me@juanm04.com</a>
      <a href="https://github.com/JuanM04" target="_blank" rel="noopener noreferrer" className="contact"><FontAwesomeIcon icon={['fab', 'github']} /> JuanM04</a>
      <span className="contact"><FontAwesomeIcon icon={['fab', 'discord']} /> JuanM04#5973</span>
    </div>
  </header>
)