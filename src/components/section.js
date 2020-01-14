import React from "react"
import styled from "styled-components"
import { hr } from "styles"

const StyledSection = styled.section`
  ${hr}
  padding-bottom: 15px;

  h2 {
    font-size: 32px;
  }

  ul {
    list-style: none;
    padding: 0;

    > li {
      font-size: 16px;
      margin: 12px 0;
    }
  }
`

export default props => (
  <StyledSection>
    <h2>{props.title}</h2>
    {props.children}
  </StyledSection>
)
