import { useDb } from ".."
import { useState } from "react"
import { eq, sum } from "drizzle-orm"
import {
  categoryTable,
  accountTable,
  categoryTermTable,
  transactionTable,
  transactionGroupTable,
} from "../schemas"

export default function useTransactionGroup() {
  const db = useDb()

  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const create = async ({
    name,
    note,
    date,
    transactions,
  }: {
    name?: string
    note?: string
    date: Date
    //TODO add account id
    transactions: {
      amount: number
      term: string
      categoryId: string
    }[]
  }) => {
    setLoading(true)
    setError(null)
    try {
      if (!transactions || transactions.length === 0) {
        throw new Error("No transactions provided")
      }

      for (const transaction of transactions) {
        if (!transaction.categoryId) {
          throw new Error(
            `Missing categoryId for transaction: ${transaction.term}`
          )
        }
        if (!transaction.amount || isNaN(transaction.amount)) {
          throw new Error(`Invalid amount for transaction: ${transaction.term}`)
        }
      }

      const transactionGroupResult = await db
        .insert(transactionGroupTable)
        .values({
          name,
          note,
          date,
        })
        .returning()

      const categoryTermResults: {
        id: string
        categoryId: string
        term: string
      }[] = []

      for (const transaction of transactions) {
        let category = await db
          .select()
          .from(categoryTable)
          .where(eq(categoryTable.id, transaction.categoryId))
          .limit(1)
          .then((res) => res[0])

        if (!category) {
          const categoryResult = await db
            .insert(categoryTable)
            .values({
              id: transaction.categoryId, // <-- ensure the ID matches
              name: "Uncategorized",
              color: "gray",
              icon: "❓",
            })
            .returning()
          category = categoryResult[0]
        }

        const categoryTermResult = await db
          .insert(categoryTermTable)
          .values({
            term: transaction.term,
            categoryId: category.id,
          })
          .onConflictDoUpdate({
            target: [categoryTermTable.term, categoryTermTable.categoryId],
            set: {
              term: transaction.term,
              categoryId: category.id,
            },
          })
          .returning()

        categoryTermResults.push(categoryTermResult[0])
      }

      const accountResult = await db
        .select()
        .from(accountTable)
        .where(eq(accountTable.name, "Default"))
        .limit(1)

      if (accountResult.length === 0) {
        throw new Error("Default account not found")
      }

      const account = accountResult[0]

      const transactionValues = transactions.map((transaction, index) => ({
        amount: transaction.amount,
        categoryTermId: categoryTermResults[index].id,
        transactionGroupId: transactionGroupResult[0].id,
        accountId: account.id,
      }))

      await db.insert(transactionTable).values(transactionValues)
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

  const getMany = async ({ limit }: { limit?: number }) => {
    setLoading(true)
    setError(null)

    try {
      return await db
        .select({
          id: transactionGroupTable.id,
          name: transactionGroupTable.name,
          note: transactionGroupTable.note,
          date: transactionGroupTable.date,
          amount: sum(transactionTable.amount),
        })
        .from(transactionGroupTable)
        .innerJoin(
          transactionTable,
          eq(transactionTable.transactionGroupId, transactionGroupTable.id)
        )
        .innerJoin(
          categoryTermTable,
          eq(transactionTable.categoryTermId, categoryTermTable.id)
        )
        .innerJoin(
          categoryTable,
          eq(categoryTermTable.categoryId, categoryTable.id)
        )
        .groupBy(transactionGroupTable.id, categoryTermTable.categoryId)
        .orderBy(transactionGroupTable.date)
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

  const remove = async ({ id }: { id: string }) => {
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

  return {
    create: create,
    getMany: getMany,
    remove: remove,
    error,
    loading,
  }
}
