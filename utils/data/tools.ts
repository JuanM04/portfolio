import json from "./tools.json"

type Tool = {
  slug: string
  name: string
}

const TOOLS: Tool[] = json

export default TOOLS
