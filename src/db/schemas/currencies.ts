import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"

export const currencyTable = sqliteTable("currencies", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull(),
  symbol: text().notNull(),
})

export type Category = typeof currencyTable.$inferSelect
