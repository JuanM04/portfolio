import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { StyledHeader } from "styles/docs"

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <p>
      <Link to="/docs" className="big-link">
        {siteTitle}
      </Link>
    </p>
    <hr />
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
