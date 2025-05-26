import {
  sqliteTable,
  text,
  primaryKey,
  integer,
  real,
} from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import { categories } from "./categories"

export const budgets = sqliteTable("budgets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: integer("createdAt")
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updatedAt")
    .default(sql`(unixepoch())`)
    .notNull(),
  title: text("title").notNull(),
  amount: real("amount").notNull(),
  start: integer("start").notNull(),
  end: integer("end"),
  period: text("period", {
    enum: ["daily", "weekly", "monthly", "semesterly", "yearly"],
  }).notNull(),
  color: text("color"),
  icon: text("icon"),
})

export const budgetRelations = relations(budgets, ({ many }) => ({
  categoriesToBudgets: many(categoriesToBudgets),
}))

export const categoriesToBudgets = sqliteTable(
  "categories_to_budgets",
  {
    budgetId: text("budgetId")
      .notNull()
      .references(() => budgets.id),
    categoryId: text("categoryId")
      .notNull()
      .references(() => categories.id),
  },
  (t) => [primaryKey({ columns: [t.budgetId, t.categoryId] })]
)

export const categoriesToBudgetsRelations = relations(
  categoriesToBudgets,
  ({ one }) => ({
    budget: one(budgets, {
      fields: [categoriesToBudgets.budgetId],
      references: [budgets.id],
    }),
    category: one(categories, {
      fields: [categoriesToBudgets.categoryId],
      references: [categories.id],
    }),
  })
)

export type Budget = typeof budgets.$inferSelect
export type CategoryToBudget = typeof categoriesToBudgets.$inferSelect
