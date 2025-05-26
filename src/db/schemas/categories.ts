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
  title: text("title").notNull(),
  supercategoryId: text("supercategoryId"),
  color: text("color"),
  icon: text("icon"),
})

export const categorieRelations = relations(categories, ({ one, many }) => ({
  transactions: many(transactions),
  categoriesToBudgets: many(categoriesToBudgets),
  supercategory: one(categories, {
    fields: [categories.supercategoryId],
    references: [categories.id],
  }),
}))

export type Category = typeof categories.$inferSelect
