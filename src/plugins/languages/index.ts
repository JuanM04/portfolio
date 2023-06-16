import type { ShikiConfig } from "astro"
import { readFileSync } from "node:fs"

function getLang(id: string, ...aliases: string[]): NonNullable<ShikiConfig["langs"]>[0] {
  const path = `./src/plugins/languages/${id}.tmLanguage.json`
  const grammar = JSON.parse(readFileSync(path, { encoding: "utf-8" }))

  return {
    id,
    grammar,
    aliases,
    path,
    scopeName: grammar.scopeName,
  }
}

export const getLanguages = () => [getLang("gcode")]
