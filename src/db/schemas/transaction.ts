import {
  sqliteTable,
  text,
  real,
  integer,
  index,
} from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import { categories } from "./categories"
import { accounts } from "./accounts"

export const transactions = sqliteTable(
  "transactions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    createdAt: integer("createdAt")
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: integer("updatedAt")
      .default(sql`(unixepoch())`)
      .notNull(),
    amount: real("amount").notNull(),
    date: integer("date").notNull(),
    description: text("description").notNull(),
    categoryId: text("categoryId").notNull(),
    accountId: text("accountId").notNull(),
  },
  (table) => ({
    dateIndex: index("date_index").on(table.date),
    categoryIndex: index("category_index").on(table.categoryId),
    accountIndex: index("account_index").on(table.accountId),
  })
)

export const transactionRelations = relations(transactions, ({ one }) => ({
  supercategory: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
}))

export type Transaction = typeof transactions.$inferSelect
