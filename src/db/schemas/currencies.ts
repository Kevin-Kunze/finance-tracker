import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"

export const currencies = sqliteTable("currencies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
})

export type Category = typeof currencies.$inferSelect
