import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import { currencyTable } from "./currencies"
import { colors } from "@/assets/colors"

export const accountTable = sqliteTable("accounts", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  name: text().notNull(),
  balance: real().notNull().default(0),
  color: text({
    enum: Object.keys(colors.custom) as [string, ...string[]],
  }),
  icon: text().notNull(),
  currencyId: text()
    .notNull()
    .references(() => currencyTable.id),
})

export const accountRelations = relations(accountTable, ({ one }) => ({
  currency: one(currencyTable, {
    fields: [accountTable.currencyId],
    references: [currencyTable.id],
  }),
}))

export type Account = typeof accountTable.$inferSelect
