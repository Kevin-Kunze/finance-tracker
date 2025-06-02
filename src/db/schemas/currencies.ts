import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { accountTable } from "./accounts"

export const currencyTable = sqliteTable("currencies", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull(),
  symbol: text().notNull(),
})

export const currencyRelations = relations(currencyTable, ({ many }) => ({
  accounts: many(accountTable),
}))

export type Category = typeof currencyTable.$inferSelect
