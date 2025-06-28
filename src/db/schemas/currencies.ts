import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const currencyTable = sqliteTable("currencies", {
  id: integer().primaryKey({
    autoIncrement: true,
  }),
  name: text().notNull(),
  symbol: text().notNull(),
})

export type Category = typeof currencyTable.$inferSelect
