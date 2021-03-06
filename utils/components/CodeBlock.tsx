import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark as style } from "react-syntax-highlighter/dist/cjs/styles/hljs"

type _Props = {
  language: string | undefined
  value: string
}

const CodeBlock = ({ language, value }: _Props) => (
  <SyntaxHighlighter language={language} style={style}>
    {value}
  </SyntaxHighlighter>
)

export default CodeBlock
