import { sqliteTable, real, integer } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"
import { accountTable } from "./accounts"
import { transactionGroupTable } from "./transactionGroups"
import { categoryTermTable } from "./categoryTerms"

export const transactionTable = sqliteTable("transactions", {
  id: integer().primaryKey({
    autoIncrement: true,
  }),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  amount: real().notNull(),
  categoryTermId: integer()
    .notNull()
    .references(() => categoryTermTable.id),
  accountId: integer()
    .notNull()
    .references(() => accountTable.id),
  transactionGroupId: integer()
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
