import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"
import { colors } from "@/assets/colors"

export const categoryTable = sqliteTable("categories", {
  id: integer().primaryKey({
    autoIncrement: true,
  }),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  name: text().notNull(),
  color: text({
    enum: Object.keys(colors.custom) as [string, ...string[]],
  }).notNull(),
  emoji: text().notNull(),
  parentCategoryId: integer().references((): any => categoryTable.id, {
    onDelete: "cascade",
  }),
})

export const categorieRelations = relations(categoryTable, ({ one }) => ({
  parentCategory: one(categoryTable, {
    fields: [categoryTable.parentCategoryId],
    references: [categoryTable.id],
  }),
}))

export type Category = typeof categoryTable.$inferSelect
