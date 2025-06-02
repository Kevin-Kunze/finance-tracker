import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import { accountTable } from "./accounts"
import { transactionGroupTable } from "./transactionGroups"
import { categoryTermTable } from "./categoryTerms"

export const transactionTable = sqliteTable("transactions", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  amount: real().notNull(),
  date: integer({ mode: "timestamp" })
    .notNull()
    .generatedAlwaysAs(
      sql`(select date from transactionGroups where transactionGroups.id = transactions.transactionGroupId)`
    ),
  categoryTermId: text()
    .notNull()
    .references(() => categoryTermTable.id),
  accountId: text()
    .notNull()
    .references(() => accountTable.id),
  transactionGroupId: text()
    .notNull()
    .references(() => transactionGroupTable.id, { onDelete: "cascade" }),
})

export const transactionRelations = relations(transactionTable, ({ one }) => ({
  categoryTerm: one(categoryTermTable, {
    fields: [transactionTable.categoryTermId],
    references: [categoryTermTable.id],
  }),
  account: one(accountTable, {
    fields: [transactionTable.accountId],
    references: [accountTable.id],
  }),
  transactionGroup: one(transactionGroupTable, {
    fields: [transactionTable.transactionGroupId],
    references: [transactionGroupTable.id],
  }),
}))

export type Transaction = typeof transactionTable.$inferSelect
