import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
import { colors } from "@/assets/colors"

export const budgetTable = sqliteTable("budgets", {
  id: integer().primaryKey({
    autoIncrement: true,
  }),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  name: text().notNull(),
  amount: real().notNull(),
  start: integer().notNull(),
  end: integer(),
  period: text({
    enum: ["daily", "weekly", "monthly", "semesterly", "yearly"],
  }).notNull(),
  color: text({
    enum: Object.keys(colors.custom) as [string, ...string[]],
  }).notNull(),
  emoji: text().notNull(),
})

export type Budget = typeof budgetTable.$inferSelect
