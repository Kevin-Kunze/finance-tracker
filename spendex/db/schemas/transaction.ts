import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
})

export type Transaction = typeof transactions.$inferSelect
