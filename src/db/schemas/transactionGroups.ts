import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import { transactionTable } from "./transactions"

export const transactionGroupTable = sqliteTable("transactionGroups", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  name: text(),
  note: text(),
  amount: real()
    .notNull()
    .generatedAlwaysAs(
      sql`(select sum(amount) from transactions where transactionGroupId = transactionGroups.id)`
    ),
  date: integer({ mode: "timestamp" }).notNull(),
  imagePath: text(),
})

export const imageRelations = relations(transactionGroupTable, ({ many }) => ({
  transactions: many(transactionTable),
}))

export type TransactionGroup = typeof transactionGroupTable.$inferSelect
