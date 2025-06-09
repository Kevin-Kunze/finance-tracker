import { useDb } from ".."
import { useState } from "react"
import { transactionGroupTable } from "../schemas/transactionGroups"
import { transactionTable } from "../schemas/transactions"
import { eq, sum } from "drizzle-orm"
import { categoryTermTable } from "../schemas/categoryTerms"
import { categoryTable } from "../schemas/categories"

export default function useTransactionGroup() {
  const db = useDb()

  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const createTransactionGroup = async ({
    name,
    note,
    date,
    transactions,
  }: {
    name?: string
    note?: string
    date: Date
    transactions: {
      amount: number
      categoryTermId: string
      accountId: string
    }[]
  }) => {
    setLoading(true)
    setError(null)
    try {
      const transactionGroupResult = await db
        .insert(transactionGroupTable)
        .values({
          name,
          note,
          date,
        })
        .returning()

      await db.insert(transactionTable).values(
        transactions.map((transaction) => ({
          ...transaction,
          name:
            name ||
            db.query.categoryTermTable.findFirst({
              where: (categoryTermTable, { eq }) =>
                eq(categoryTermTable.id, transaction.categoryTermId),
            }),
          transactionGroupId: transactionGroupResult[0].id,
        }))
      )
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error creating transactionGroup:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getTransactionGroups = async ({ limit }: { limit?: number }) => {
    setLoading(true)
    setError(null)

    try {
      return await db
        .select({
          id: transactionGroupTable.id,
          createdAt: transactionGroupTable.createdAt,
          updatedAt: transactionGroupTable.updatedAt,
          name: transactionGroupTable.name,
          note: transactionGroupTable.note,
          date: transactionGroupTable.date,
          amount: transactionGroupTable.amount,
          imagePath: transactionGroupTable.imagePath,
          categoryName: categoryTable.name,
          categoryColor: categoryTable.color,
          categoryIcon: categoryTable.icon,
        })
        .from(transactionGroupTable)
        .leftJoin(
          transactionTable,
          eq(transactionTable.transactionGroupId, transactionGroupTable.id)
        )
        .leftJoin(
          categoryTermTable,
          eq(transactionTable.categoryTermId, categoryTermTable.id)
        )
        .innerJoin(
          categoryTable,
          eq(categoryTermTable.categoryId, categoryTable.id)
        )
        .groupBy(transactionGroupTable.id, categoryTermTable.categoryId)
        .orderBy(sum(transactionTable.amount))
        .limit(limit ?? 100) //FIXME: remove hardcoded limit
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error fetching transactionGroups:", error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const deleteTransactionGroup = async ({ id }: { id: string }) => {
    setLoading(true)
    setError(null)

    try {
      await db
        .delete(transactionGroupTable)
        .where(eq(transactionGroupTable.id, id))
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error deleting transactionGroup:", error)
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
        .select({
          total: sum(transactionGroupTable.amount),
        })
        .from(transactionGroupTable)
      return result[0]?.total ?? "0"
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error fetching total amount:", error)
      return "0"
    } finally {
      setLoading(false)
    }
  }

  return {
    createTransactionGroup,
    getTransactionGroups,
    deleteTransactionGroup,
    getTotalAmount,
    error,
    loading,
  }
}
