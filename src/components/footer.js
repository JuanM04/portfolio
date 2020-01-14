import React from "react"
import { theme, StyledA } from "styles"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import SOCIALS from "utils/socials.json"

const StyledFooter = styled.footer`
  text-align: center;
  font-size: 14px;
  padding: 5vh 0;

  .socials {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-size: 18px;

    .social {
      margin: 10px 10px;
    }
  }

  span {
    color: ${theme.secondaryTextColor};
  }
`

export default () => (
  <StyledFooter>
    <div className="socials">
      {SOCIALS.map((social, i) => (
        <StyledA
          key={i}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social"
        >
          <FontAwesomeIcon icon={social.icon} />
        </StyledA>
      ))}
    </div>
    <span>
      &copy; {new Date().getFullYear()} <StyledA href="/">JuanM04</StyledA>
    </span>
  </StyledFooter>
)
