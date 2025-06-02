import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import { categoryTermTable } from "./categoryTerms"
import { categoryToBudgetTable } from "./categoriesToBudgets"

export const categoryTable = sqliteTable("categories", {
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
  picked: integer().notNull().default(0),
  color: text(),
  icon: text(),
  parentCategoryId: text(),
})

export const categorieRelations = relations(categoryTable, ({ one, many }) => ({
  categoryTerms: many(categoryTermTable),
  categoryToBudget: many(categoryToBudgetTable),
  parentCategory: one(categoryTable, {
    fields: [categoryTable.parentCategoryId],
    references: [categoryTable.id],
  }),
}))

export type Category = typeof categoryTermTable.$inferSelect
