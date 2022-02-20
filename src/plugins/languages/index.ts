import { readFileSync } from "fs"

function getLang(id: string, ...aliases: string[]) {
  const grammar = JSON.parse(
    readFileSync(`./src/plugins/languages/${id}.tmLanguage.json`, {
      encoding: "utf-8",
    })
  )

  return {
    id,
    grammar,
    aliases,
    scopeName: grammar.scopeName,
  }
}

export const getLanguages = () => [getLang("gcode")]
