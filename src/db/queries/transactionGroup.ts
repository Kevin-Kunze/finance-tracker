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
      categoryId: number
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

      return await db.transaction(async (tx) => {
        const transactionGroupResult = await tx
          .insert(transactionGroupTable)
          .values({
            name,
            note,
            date,
          })
          .returning()

        if (!transactionGroupResult || transactionGroupResult.length === 0) {
          throw new Error("Failed to create transaction group")
        }

        const categoryTermResults: {
          id: number
          categoryId: number
          term: string
        }[] = []

        for (const transaction of transactions) {
          let category = await tx
            .select()
            .from(categoryTable)
            .where(eq(categoryTable.id, transaction.categoryId))
            .limit(1)
            .then((res) => res[0])

          if (!category) {
            const categoryResult = await tx
              .insert(categoryTable)
              .values({
                id: transaction.categoryId,
                name: "Uncategorized",
                color: "gray",
                emoji: "❓",
              })
              .returning()
            category = categoryResult[0]
          }

          const categoryTermResult = await tx
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

          if (!categoryTermResult || categoryTermResult.length === 0) {
            throw new Error(
              `Failed to create category term for: ${transaction.term}`
            )
          }
          categoryTermResults.push(categoryTermResult[0])
        }

        const accountResult = await tx
          .select()
          .from(accountTable)
          .where(eq(accountTable.name, "Default"))
          .limit(1)

        if (accountResult.length === 0) {
          throw new Error(
            "Default account not found. Please ensure the database is properly initialized."
          )
        }

        const account = accountResult[0]

        if (!account.id) {
          throw new Error("Default account ID is null")
        }

        const transactionValues = transactions.map((transaction, index) => {
          const categoryTermResult = categoryTermResults[index]
          if (!categoryTermResult || !categoryTermResult.id) {
            throw new Error(
              `Missing category term for transaction at index ${index}`
            )
          }

          return {
            name: transaction.term,
            amount: transaction.amount,
            categoryTermId: categoryTermResult.id,
            transactionGroupId: transactionGroupResult[0].id,
            accountId: account.id,
          }
        })

        return tx.insert(transactionTable).values(transactionValues).returning()
      })
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getMany = async () => {
    setLoading(true)
    setError(null)

    try {
      const transactionGroupResult = await db
        .select({
          id: transactionGroupTable.id,
          name: transactionGroupTable.name ?? categoryTable.name,
          note: transactionGroupTable.note,
          date: transactionGroupTable.date,
          totalAmount: sum(transactionTable.amount).as("totalAmount") ?? "0",
          categoryColor: categoryTable.color,
          categoryEmoji: categoryTable.emoji,
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
        .groupBy(
          transactionGroupTable.id,
          transactionGroupTable.name,
          transactionGroupTable.note,
          transactionGroupTable.date,
          categoryTable.id,
          categoryTable.color,
          categoryTable.emoji
        )

      const reduceCategoriesResult = transactionGroupResult.reduce(
        (acc, row) => {
          const groupId = row.id
          if (
            !acc[groupId] ||
            Number(row.totalAmount) > Number(acc[groupId].totalAmount)
          ) {
            acc[groupId] = row
          }
          return acc
        },
        {} as Record<string, (typeof transactionGroupResult)[0]>
      )

      const groupedByDay = Object.values(reduceCategoriesResult).reduce(
        (acc, group) => {
          const dayKey = group.date.toISOString().split("T")[0]
          if (!acc[dayKey]) {
            acc[dayKey] = []
          }
          acc[dayKey].push(group)
          return acc
        },
        {} as Record<string, (typeof reduceCategoriesResult)[string][]>
      )

      const sortedResult = Object.entries(groupedByDay)
        .map(([date, groups]) => ({
          date,
          groups: groups.sort(
            (a, b) => Number(b.totalAmount) - Number(a.totalAmount)
          ),
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      return Object.values(sortedResult)
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const remove = async ({ id }: { id: number }) => {
    setLoading(true)
    setError(null)

    try {
      await db
        .delete(transactionGroupTable)
        .where(eq(transactionGroupTable.id, id))
    } catch (err) {
      throw new Error(
        `Failed to delete transaction group with id ${id}: ${
          err instanceof Error ? err.message : "Unknown error occurred"
        }`
      )
    } finally {
      setLoading(false)
    }
  }

  return {
    create,
    getMany,
    remove,
    error,
    loading,
  }
}
