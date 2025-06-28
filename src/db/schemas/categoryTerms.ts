import { relations } from "drizzle-orm"
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core"
import { categoryTable } from "./categories"

export const categoryTermTable = sqliteTable(
  "categoryTerms",
  {
    id: integer().primaryKey({
      autoIncrement: true,
    }),
    term: text().notNull(),
    categoryId: integer()
      .notNull()
      .references(() => categoryTable.id),
  },
  (t) => [unique().on(t.term, t.categoryId)]
)

export const categoryTermsRelations = relations(
  categoryTermTable,
  ({ one }) => ({
    category: one(categoryTable, {
      fields: [categoryTermTable.categoryId],
      references: [categoryTable.id],
    }),
  })
)

export type CategoryTerm = typeof categoryTermTable.$inferSelect
