import styled, { createGlobalStyle } from "styled-components"

export const theme = {
  background: "#ffffff",
  primaryColor: "#ce125a",
  primaryColorActive: "#940a3f",
  textColor: "#333333",
  secondaryTextColor: "#8e8e8e",

  bodyMaxWidth: "960px",
}

export const Global = createGlobalStyle`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: ${theme.textColor};
  }

  body {
    margin: 0 auto;
    padding: 0 10px;
    max-width: ${theme.bodyMaxWidth};
    background-color: ${theme.background};

    > * {
      width: 100%;
    }
  }
  
  input {
    border: none;
    border-bottom: 2px solid ${theme.primaryColor};
    font-size: 18px;
  }

  button {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 16px;
    padding: 5px 10px;
    color: #fff;
    background-color: ${theme.primaryColor};
    border: none;
    transition: 0.25s;

    &:hover {
      background-color: ${theme.primaryColorActive};
    }
  }
`

export const hr = `
  border-bottom: 1px solid #eee;
`

export const dot = `
  &::after {
    content: "\\2219";
    padding: 0 5px;
  }
`

export const StyledA = styled.a`
  text-decoration: none;
  color: ${theme.primaryColor};
  transition: 0.25s;

  &:hover {
    color: ${theme.primaryColorActive};
  }
`
