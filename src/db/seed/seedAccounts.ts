import { seed } from "drizzle-seed"
import { DB_NAME } from ".."
import { accountTable, currencyTable } from "../schemas"
import { openDatabaseSync } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { createId } from "@paralleldrive/cuid2"

export async function seedAccounts() {
  const sqliteDb = openDatabaseSync(DB_NAME)
  const db = drizzle(sqliteDb)

  const currencyId = createId()

  await seed(db, currencyTable, {
    count: 1,
  }).refine((f) => ({
    id: currencyId,
    name: "Euro",
    symbol: "€",
  }))

  await seed(db, accountTable, {
    count: 1,
  }).refine((f) => ({
    name: "Default",
    balance: 0,
    color: f.valuesFromArray({
      values: [
        "orange",
        "turquoise",
        "gray",
        "violet",
        "yellow",
        "blue",
        "pink",
        "green",
      ],
    }),
    icon: f.valuesFromArray({
      values: ["🥰", "💰", "💳", "🏠", "🍽️", "🚗", "🎉"],
    }),
    currencyId: currencyId,
  }))
}
