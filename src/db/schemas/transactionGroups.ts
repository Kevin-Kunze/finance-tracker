import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const transactionGroupTable = sqliteTable("transactionGroups", {
  id: integer().primaryKey({
    autoIncrement: true,
  }),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  name: text(),
  note: text(),
  date: integer({ mode: "timestamp" }).notNull(),
  imagePath: text(),
})

export type TransactionGroup = typeof transactionGroupTable.$inferSelect
