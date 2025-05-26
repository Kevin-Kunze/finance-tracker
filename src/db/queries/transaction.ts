import { useSQLiteContext } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { transactions } from "@/db/schemas/transaction"
import { useState } from "react"
import { eq, sum } from "drizzle-orm"

export default function useTransactions() {
  const sqliteDb = useSQLiteContext()
  const db = drizzle(sqliteDb, { schema: { transactions } })
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const createTransaction = async ({
    amount,
    description,
  }: {
    amount: number
    description: string
  }) => {
    setLoading(true)
    setError(null)
    try {
      const result = await db
        .insert(transactions)
        .values({
          createdAt: new Date(),
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

  const getTransactions = async ({ limit }: { limit?: number } = {}) => {
    setLoading(true)
    setError(null)
    try {
      return await db.query.transactions.findMany({
        orderBy: (transactions, { desc }) => desc(transactions.createdAt),
        limit,
      })
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

  const deleteTransaction = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await db
        .delete(transactions)
        .where(eq(transactions.id, id))
        .returning()
      return result[0] || null
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error deleting transaction:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getTotalAmount = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await db
        .select({ total: sum(transactions.amount) })
        .from(transactions)
        .limit(1)

      return result[0]?.total || 0
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error calculating total amount:", error)
      return 0
    } finally {
      setLoading(false)
    }
  }

  return {
    createTransaction,
    getTransactions,
    deleteTransaction,
    getTotalAmount,
    error,
    loading,
  }
}
