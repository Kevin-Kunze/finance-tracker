import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { sql } from "drizzle-orm"

export const budgetTable = sqliteTable("budgets", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
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
  color: text().notNull(),
  icon: text().notNull(),
})

export type Budget = typeof budgetTable.$inferSelect
