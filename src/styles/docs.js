import styled, { createGlobalStyle } from "styled-components"
import { theme } from "."

const widths = {
  medium: "767px",
  small: "499px",
}

const colors = {
  blockquote: "#f1f2f4",
  title: "#1f2933",
  text: "#323f4b",
  category: "#616e7c",
  link: theme.primaryColor,
  headingAnchor: "#a0a1a7",
  preText: "#abb2bf",
  preBackground: "#282c34",
  tableBorder: "#9a9a9a",
}

// Global
export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 18px;
    @media (max-width: ${widths.small}) {
      font-size: 16px;
    }
  }
  body {
    line-height: 1.65;
    @media (max-width: ${widths.small}) {
      padding: 16px;
    }
  }
  blockquote {
    background: ${colors.blockquote};
    font-weight: 400;
    padding: 28px 36px;
    border-radius: 6px;
    cite {
      display: block;
      text-align: right;
      &::before {
        content: "— ";
      }
    }
    & > p > cite {
      margin-top: 16px;
    }
    @media (max-width: ${widths.small}) {
      padding: 0 16px;
    }
  }
`

// DocHeader
export const DocHeader = styled.header`
  padding: 0 32px;
  margin-bottom: 64px;
  text-align: center;
  h1 {
    color: ${colors.title};
    font-weight: 700;
    font-size: 2.8rem;
    line-height: 1.2;
    margin: 0;
    text-align: center;
    @media (max-width: ${widths.medium}) {
      font-size: 2.2rem;
    }
    @media (max-width: ${widths.small}) {
      font-size: 1.7rem;
    }
  }
  span {
    color: ${colors.category};
  }
`

// DocBody
export const DocBody = styled.section`
  h2 {
    color: ${colors.title};
    font-weight: 700;
    position: relative;
    margin-left: -24px;
    margin-right: -24px;
    padding: 16px 24px 0.8rem 24px;
    font-size: 1.6rem;
    line-height: 1.4;
    @media (max-width: ${widths.medium}) {
      font-size: 1.4rem;
    }
    @media (max-width: ${widths.small}) {
      font-size: 1.25rem;
    }
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 32px;
  }
  a {
    text-decoration: underline;
  }
  .heading-anchor {
    opacity: 0;
    position: absolute;
    color: ${colors.headingAnchor};
    display: inline-block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu,
      "Helvetica Neue", sans-serif;
    font-size: 1.45em;
    font-weight: 500;
    left: -0.2em;
    padding: 5px 12px;
    text-decoration: none;
    top: 2px;
    transition: opacity 0.1s ease-in-out;
    &:active,
    &:focus,
    &:hover {
      color: ${colors.link};
    }
    &--visible {
      opacity: 1;
    }
  }
  kbd {
    display: inline-block;
    margin: 0 3px;
    padding: 0 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  code,
  kbd {
    background: ${colors.blockquote};
    border-radius: 3px;
    font-family: Menlo, Consolas, Monaco, "Courier New", monospace;
    font-size: 0.9rem;
    padding: 3px 5px;
    white-space: no-wrap;
    -webkit-font-smoothing: auto;
  }
  pre {
    background: ${colors.preBackground};
    border-radius: 6px;
    color: ${colors.preText};
    overflow: auto;
    padding: 28px 36px;
    line-height: 1.6;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
    code {
      background: 0 0;
      display: block;
      padding: 0;
      white-space: pre;
    }
    @media (max-width: ${widths.small}) {
      border-radius: 0;
      margin: 0 -24px;
      padding: 24px;
    }
  }
  mark {
    background: 0 0;
    color: unset;
  }
  code {
    background: 0 0;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    margin: 0;
    color: #abb2bf;
    .error {
      background: rgba(224, 108, 117, 0.1);
      border-bottom: 2px solid #e06c75;
    }
  }
  table {
    border-collapse: collapse;
    th,
    td {
      padding: 10px;
    }
    th ~ th,
    td ~ td {
      border-left: 1px solid ${colors.tableBorder};
    }
    tbody td {
      border-top: 1px solid ${colors.tableBorder};
    }
  }
  .token {
    &.cdata,
    &.comment,
    &.doctype,
    &.prolog {
      color: #5c6370;
      font-style: italic;
    }
    &.boolean {
      color: #d19a66;
      .language-json & {
        color: #56b6c2;
      }
    }
    &.builtin {
      color: #56b6c2;
    }
    &.class-name {
      color: #e5c07b;
    }
    &.constant {
      color: #d19a66;
      .language-ini & {
        color: #e06c75;
      }
    }
    &.function {
      color: #61afef;
    }
    &.keyword {
      color: #c678dd;
    }
    &.null {
      color: #56b6c2;
    }
    &.number {
      color: #d19a66;
    }
    &.operator {
      color: #56b6c2;
      .language-json & {
        color: #abb2bf;
      }
    }
    &.property {
      color: #e06c75;
    }
    &.regex {
      color: #e06c75;
    }
    &.selector {
      color: #61afef;
      .language-css & {
        color: #e5c07b;
      }
    }
    &.string {
      color: #98c379;
    }
    &.tag {
      color: #e06c75;
      .attr-name {
        color: #d19a66;
        & ~ .attr-value > .punctuation:first-child {
          color: #abb2bf;
        }
      }
      .attr-value {
        color: #98c379;
        .punctuation {
          color: #98c379;
        }
      }
      .punctuation {
        color: #abb2bf;
      }
    }
    &.type {
      color: #e5c07b;
    }
  }
`

// Others
export const StyledHeader = styled.header`
  padding-top: 25px;
  padding-bottom: 25px;
  p {
    font-size: 30px;
    font-weight: lighter;
    margin: 0;
    text-align: center;
    a {
      text-decoration: none;
      color: ${colors.title};
    }
  }
`

export const DocLink = styled.p`
  font-size: 17.5px;
  width: 100%;
  text-align: center;
  margin-top: 0;
`

export const Category = styled.section`
  margin-bottom: 20px;
  h3 {
    text-align: center;
  }
  p {
    margin-top: 0 !important;
  }
`

export const Main = styled.main`
  blockquote,
  iframe,
  img,
  ol,
  p,
  pre,
  ul,
  video {
    margin-top: 24px;
    &:first-child {
      margin-top: 0;
    }
  }
  li {
    ol,
    ul {
      margin-top: 0;
    }
  }
  h2 + p {
    margin-top: 0;
  }
  p + p {
    margin-top: 1em;
  }
  p {
    overflow-wrap: break-word;
  }
  a {
    color: ${colors.link};
    transition: color 0.1s ease;
    text-decoration: none;
    &:active,
    &:focus,
    &:hover {
      color: ${theme.primaryColorActive};
    }
  }
  ol,
  ul {
    padding-left: 48px;
  }
  li + li {
    margin-top: 8px;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`
