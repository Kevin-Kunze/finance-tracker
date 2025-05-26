import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import { transactions } from "./transaction"

export const images = sqliteTable("images", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: integer("createdAt")
    .default(sql`(unixepoch())`)
    .notNull(),
  imagePath: text("imagePath").notNull(),
})

export const imageRelations = relations(images, ({ many }) => ({
  transactions: many(transactions),
}))

export type Image = typeof images.$inferSelect
