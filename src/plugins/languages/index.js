import fs from "fs"

function getLang(id, ...aliases) {
  const grammar = JSON.parse(
    fs.readFileSync(`./src/plugins/languages/${id}.tmLanguage.json`, {
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
