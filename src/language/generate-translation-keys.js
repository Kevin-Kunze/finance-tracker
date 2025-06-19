const fs = require("fs")
const path = require("path")

// Input: deine Übersetzungen
const inputFile = path.resolve(path.__dirname, "./translation.json")

// Output: Typen-Datei im selben Ordner
const outputFile = path.resolve(path.__dirname, "./translationKeys.ts")

const translation = require(inputFile)

const keys = []

function extractKeys(obj, prefix = "") {
  for (const key in obj) {
    const value = obj[key]
    const newPrefix = prefix ? `${prefix}.${key}` : key

    if (typeof value === "object" && value.en && value.de) {
      keys.push(`"${newPrefix}"`)
    } else if (typeof value === "object") {
      extractKeys(value, newPrefix)
    }
  }
}

extractKeys(translation)

const content = `// ✅ Auto-generated from translation.json
export type TranslationKey =
  ${keys.map((k) => `| ${k}`).join("\n  ")};
`

fs.writeFileSync(outputFile, content)
console.log(`✅ translationKeys.ts created with ${keys.length} keys`)
