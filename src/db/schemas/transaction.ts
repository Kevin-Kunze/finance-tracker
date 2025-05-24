import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"

export const transactions = sqliteTable("transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: integer({ mode: "timestamp" }).notNull(),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
})

export type Transaction = typeof transactions.$inferSelect
