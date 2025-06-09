import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"
import { sql } from "drizzle-orm"

export const transactionGroupTable = sqliteTable("transactionGroups", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
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
