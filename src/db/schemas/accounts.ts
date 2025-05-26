import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import { transactions } from "./transaction"
import { currencies } from "./currencies"

export const accounts = sqliteTable("accounts", {
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
  balance: real("balance").notNull().default(0),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
  currencyId: text("currencyId").notNull(),
})

export const accountRelations = relations(accounts, ({ one, many }) => ({
  transactions: many(transactions),
  currency: one(currencies, {
    fields: [accounts.currencyId],
    references: [currencies.id],
  }),
}))

export type Account = typeof accounts.$inferSelect
