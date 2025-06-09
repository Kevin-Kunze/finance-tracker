import { useState } from "react"
import { useDb } from ".."
import { categoryTable } from "../schemas/categories"
import { asc, eq, isNull } from "drizzle-orm"
import { categoryTermTable } from "../schemas/categoryTerms"

export default function useCategory() {
  const db = useDb()

  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const createCategory = async ({
    name,
    color,
    icon,
    parentCategoryId,
  }: {
    name: string
    color?: string
    icon?: string
    parentCategoryId?: string
  }) => {
    setLoading(true)
    setError(null)

    try {
      const categoryResult = await db
        .insert(categoryTable)
        .values({
          name,
          color,
          icon,
          parentCategoryId,
        })
        .returning()
      await db.insert(categoryTermTable).values({
        term: name,
        categoryId: categoryResult[0].id,
      })
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error creating category:", error)
      return "0"
    } finally {
      setLoading(false)
    }
  }

  const getCategories = async ({
    parentCategoryId,
  }: { parentCategoryId?: string } = {}) => {
    setLoading(true)
    setError(null)
    try {
      return db
        .select()
        .from(categoryTable)
        .where(
          parentCategoryId
            ? eq(categoryTable.parentCategoryId, parentCategoryId)
            : isNull(categoryTable.parentCategoryId)
        )
        .orderBy(asc(categoryTable.name))
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error fetching categories:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    createCategory,
    getCategories,
    error,
    loading,
  }
}
