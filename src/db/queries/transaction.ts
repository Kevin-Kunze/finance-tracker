import { transactionTable } from "@/db/schemas/transactions"
import { useState } from "react"
import { eq, asc, desc, and } from "drizzle-orm"
import { useDb } from ".."
import { categoryTermTable } from "../schemas/categoryTerms"

export default function useTransactions() {
  const db = useDb()

  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const getTransactions = async ({
    transactionGroupId,
    categoryId,
    ordered,
  }: {
    transactionGroupId?: string
    categoryId?: string
    ordered?: "asc" | "desc"
  } = {}) => {
    setLoading(true)
    setError(null)
    try {
      const conditions = []

      if (transactionGroupId)
        conditions.push(
          eq(transactionTable.transactionGroupId, transactionGroupId)
        )
      if (categoryId)
        conditions.push(eq(categoryTermTable.categoryId, categoryId))

      return await db
        .select()
        .from(transactionTable)
        .innerJoin(
          categoryTermTable,
          eq(transactionTable.categoryTermId, categoryTermTable.id)
        )
        .where(and(...conditions))
        .orderBy(
          ordered === "asc"
            ? asc(transactionTable.date)
            : desc(transactionTable.date)
        )
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

  const deleteTransaction = async ({ id }: { id: string }) => {
    setLoading(true)
    setError(null)
    try {
      await db.delete(transactionTable).where(eq(transactionTable.id, id))
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

  return {
    getTransactions,
    deleteTransaction,
    error,
    loading,
  }
}
