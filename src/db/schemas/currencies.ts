import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { accounts } from "./accounts"

export const currencies = sqliteTable("currencies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
})

export const currencyRelations = relations(currencies, ({ many }) => ({
  accounts: many(accounts),
}))

export type Category = typeof currencies.$inferSelect
