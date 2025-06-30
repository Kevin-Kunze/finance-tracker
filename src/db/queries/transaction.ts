import { useDb } from ".."
import { useState } from "react"
import { transactionTable } from "../schemas"
import { sum } from "drizzle-orm"

export default function useTransaction() {
  const db = useDb()

  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const getTotalAmount = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await db
        .select({
          totalAmount: sum(transactionTable.amount),
        })
        .from(transactionTable)

      const total = parseFloat(result[0]?.totalAmount ?? "0")
      return total.toFixed(2)
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      return "0"
    } finally {
      setLoading(false)
    }
  }

  const getMany = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await db
        .select({
          name: transactionTable.name,
          amount: transactionTable.amount,
        })
        .from(transactionTable)
      return result
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    getTotalAmount,
    getMany,
    error,
    loading,
  }
}
