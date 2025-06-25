import type { Config } from "drizzle-kit"

export default {
  schema: "./db/schemas",
  out: "./db/migrations",
  dialect: "sqlite",
} satisfies Config
