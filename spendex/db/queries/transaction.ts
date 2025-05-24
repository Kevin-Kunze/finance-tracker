import { useSQLiteContext } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { transactions } from "@/db/schemas/transaction"
import { useState } from "react"

export default function useTransactions() {
  const db = useSQLiteContext()
  const drizzleDb = drizzle(db, { schema: { transactions } })
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const createTransaction = async (amount: number, description: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await drizzleDb
        .insert(transactions)
        .values({
          amount,
          description,
        })
        .returning()

      return result[0] || null
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error creating transaction:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getTransactions = async () => {
    setLoading(true)
    setError(null)
    try {
      return await drizzleDb.select().from(transactions)
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error fetching transactions:", error)
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    createTransaction,
    getTransactions,
    error,
    loading,
  }
}
