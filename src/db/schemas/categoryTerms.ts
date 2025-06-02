import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { sqliteTable, text, unique } from "drizzle-orm/sqlite-core"
import { categoryTable } from "./categories"
import { transactionTable } from "./transactions"

export const categoryTermTable = sqliteTable(
  "categoryTerms",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    term: text().notNull(),
    categoryId: text()
      .notNull()
      .references(() => categoryTable.id),
  },
  (t) => [unique().on(t.term, t.categoryId)]
)

export const categoryTermsRelations = relations(
  categoryTermTable,
  ({ one, many }) => ({
    transactions: many(transactionTable),
    category: one(categoryTable, {
      fields: [categoryTermTable.categoryId],
      references: [categoryTable.id],
    }),
  })
)

export type CategoryTerm = typeof categoryTermTable.$inferSelect
