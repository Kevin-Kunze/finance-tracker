import { seed } from "drizzle-seed"
import { DB_NAME } from ".."
import { categoryTable } from "../schemas"
import { openDatabaseSync } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"

export async function seedCategories() {
  const sqliteDb = openDatabaseSync(DB_NAME)
  const db = drizzle(sqliteDb)
  await seed(db, categoryTable).refine((f) => ({
    name: f.city,
    color: f.valuesFromArray({
      values: [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FF33F1",
        "#F1FF33",
        "#33FFF1",
        "#FF8C33",
        "#8C33FF",
        "#33FF8C",
        "#FF3333",
      ],
    }),
    icon: f.valuesFromArray({
      values: [
        "home",
        "work",
        "school",
        "shopping",
        "health",
        "entertainment",
        "travel",
        "food",
        "finance",
        "miscellaneous",
      ],
    }),
  }))
}
