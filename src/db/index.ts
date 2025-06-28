import { drizzle } from "drizzle-orm/expo-sqlite"
import { useSQLiteContext } from "expo-sqlite"
import { transactionTable } from "./schemas/transactions"
import { accountTable } from "./schemas/accounts"
import { budgetTable } from "./schemas/budgets"
import { categoryTable } from "./schemas/categories"
import { categoryTermTable } from "./schemas/categoryTerms"
import { currencyTable } from "./schemas/currencies"
import { transactionGroupTable } from "./schemas/transactionGroups"
import { categoryToBudgetTable } from "./schemas/categoriesToBudgets"
import { seedAccounts } from "./seed/accounts"
import { seedCategories } from "./seed/categories"

export const schema = {
  accountTable,
  budgetTable,
  categoryTable,
  categoryToBudgetTable,
  categoryTermTable,
  currencyTable,
  transactionGroupTable,
  transactionTable,
}

let initializationPromise: Promise<void> | null = null
let isInitialized = false

export async function initializeDatabase() {
  if (isInitialized) return

  if (initializationPromise) {
    return initializationPromise
  }

  initializationPromise = (async () => {
    try {
      const accountsSeeded = await seedAccounts()
      const categoriesSeeded = await seedCategories()
      if (!accountsSeeded || !categoriesSeeded) {
        console.log("Database already seeded")
      } else {
        console.log("Database seeded successfully")
      }
      isInitialized = true
    } catch (error) {
      console.error("Database initialization failed:", error)
      throw error
    }
  })()

  return initializationPromise
}

export function isDatabaseInitialized() {
  return isInitialized
}

export function useDb() {
  const sqliteDb = useSQLiteContext()
  const db = drizzle(sqliteDb, {
    schema,
  })

  return db
}
