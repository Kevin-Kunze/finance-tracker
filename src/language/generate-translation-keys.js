const fs = require("fs")
const path = require("path")

const scriptDir = path.dirname(process.argv[1])

const inputFile = path.join(scriptDir, "translation.json")
const outputFile = path.join(scriptDir, "translationKeys.ts")

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
