import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import SOCIALS from "../utils/socials.json"

export default () => (
  <footer>
    <div className="socials">
      {SOCIALS.map((social, i) => (
        <a
          key={i}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social"
        >
          <FontAwesomeIcon icon={social.icon} />
        </a>
      ))}
    </div>
    <span>&copy; {new Date().getFullYear()} JuanM04</span>
  </footer>
)
