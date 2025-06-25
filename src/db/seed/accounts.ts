import { DB_NAME } from "@/db/db_name"
import { accountTable, currencyTable } from "../schemas"
import { openDatabaseSync } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { createId } from "@paralleldrive/cuid2"

export async function seedAccounts() {
  const sqliteDb = openDatabaseSync(DB_NAME)
  const db = drizzle(sqliteDb)

  await db.delete(accountTable)
  await db.delete(currencyTable)

  const currencyId = createId()

  await db.insert(currencyTable).values([
    {
      id: currencyId,
      name: "Euro",
      symbol: "€",
    },
  ])

  await db.insert(accountTable).values([
    {
      name: "Default",
      balance: 0,
      color: "gray",
      icon: "💰",
      currencyId: currencyId,
    },
  ])
}
