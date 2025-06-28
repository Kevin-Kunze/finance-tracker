import { DB_NAME } from "@/db/db_name"
import { accountTable, currencyTable } from "../schemas"
import { openDatabaseSync } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"

export async function seedAccounts() {
  const sqliteDb = openDatabaseSync(DB_NAME)
  const db = drizzle(sqliteDb)

  const existingAccounts = await db.select().from(accountTable).limit(1)
  const existingCurrencies = await db.select().from(currencyTable).limit(1)
  if (existingAccounts.length > 0 && existingCurrencies.length > 0) {
    return false
  }

  await db.delete(accountTable)
  await db.delete(currencyTable)

  const currencyId = 1

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
      emoji: "💰",
      currencyId: currencyId,
    },
  ])

  return true
}
