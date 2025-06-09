import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { budgetTable } from "./budgets"
import { categoryTable } from "./categories"
import { relations } from "drizzle-orm"

export const categoryToBudgetTable = sqliteTable(
  "categories_to_budgets",
  {
    budgetId: text("budgetId")
      .notNull()
      .references(() => budgetTable.id),
    categoryId: text("categoryId")
      .notNull()
      .references(() => categoryTable.id),
  },
  (t) => [primaryKey({ columns: [t.budgetId, t.categoryId] })]
)

export const categoriesToBudgetsRelations = relations(
  categoryToBudgetTable,
  ({ one }) => ({
    budget: one(budgetTable, {
      fields: [categoryToBudgetTable.budgetId],
      references: [budgetTable.id],
    }),
    category: one(categoryTable, {
      fields: [categoryToBudgetTable.categoryId],
      references: [categoryTable.id],
    }),
  })
)

export type CategoryToBudget = typeof categoryToBudgetTable.$inferSelect
