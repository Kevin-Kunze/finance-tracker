import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import { categoriesToBudgets } from "./budgets"
import { transactions } from "./transaction"

export const categories = sqliteTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: integer("createdAt")
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updatedAt")
    .default(sql`(unixepoch())`)
    .notNull(),
  name: text("name").notNull(),
  color: text("color"),
  icon: text("icon"),
  parentCategoryId: text("parentCategory"),
})

export const categorieRelations = relations(categories, ({ one, many }) => ({
  transactions: many(transactions),
  categoriesToBudgets: many(categoriesToBudgets),
  supercategory: one(categories, {
    fields: [categories.parentCategoryId],
    references: [categories.id],
  }),
}))

export type Category = typeof categories.$inferSelect
