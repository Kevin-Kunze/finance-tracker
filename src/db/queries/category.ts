import { useState } from "react"
import { useDb, isDatabaseInitialized, initializeDatabase } from ".."
import { categoryTable } from "../schemas/categories"
import { inArray, isNull, eq } from "drizzle-orm"
import { categoryTermTable } from "../schemas/categoryTerms"
import { CustomColors } from "@/assets/colors"

type CategoryWithChildren = {
  id: number
  name: string
  children?: CategoryWithChildren[]
}

export default function useCategory() {
  const db = useDb()

  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const create = async ({
    name,
    color,
    emoji,
    parentCategoryId,
  }: {
    name: string
    color: CustomColors
    emoji: string
    parentCategoryId?: number
  }) => {
    setLoading(true)
    setError(null)

    try {
      const categoryResult = await db
        .insert(categoryTable)
        .values({
          name,
          color,
          emoji,
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

  const getMany = async ({ ids }: { ids: number[] }) => {
    setLoading(true)
    setError(null)
    try {
      if (!ids || ids.length === 0) {
        return []
      }
      if (!db) {
        throw new Error("Database connection not available")
      }

      if (!isDatabaseInitialized()) {
        console.log("Database not initialized, waiting...")
        await initializeDatabase()
      }

      const categoryResult = await db
        .select({
          id: categoryTable.id,
          name: categoryTable.name,
          color: categoryTable.color,
          emoji: categoryTable.emoji,
        })
        .from(categoryTable)
        .where(inArray(categoryTable.id, ids))
      return categoryResult ?? []
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error fetching categories:", error)

      // If it's a database connection error, return empty array instead of null
      if (
        error.message.includes("NativeDatabase") ||
        error.message.includes("Database connection")
      ) {
        return []
      }
      return []
    } finally {
      setLoading(false)
    }
  }

  const getManyAsJson = async () => {
    setLoading(true)
    setError(null)
    try {
      const allCategories = await db.select().from(categoryTable)
      const buildNestedStructure = (
        parentId: number | null
      ): CategoryWithChildren[] | undefined => {
        const children = allCategories.filter(
          (category) => category.parentCategoryId === parentId
        )

        if (children.length === 0) return

        return children.map((category) => {
          return {
            id: category.id,
            name: category.name,
            children: buildNestedStructure(category.id),
          }
        })
      }

      return allCategories
        .filter((category) => category.parentCategoryId === null)
        .map((category) => ({
          id: category.id,
          name: category.name,
          children: buildNestedStructure(category.id),
        }))
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error fetching categories as json:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getByParentId = async ({ parentId }: { parentId?: number | null }) => {
    setLoading(true)
    setError(null)
    try {
      if (!db) {
        throw new Error("Database connection not available")
      }

      if (!isDatabaseInitialized()) {
        console.log("Database not initialized, waiting...")
        await initializeDatabase()
      }

      const categoryResult = await db
        .select({
          id: categoryTable.id,
          name: categoryTable.name,
          color: categoryTable.color,
          emoji: categoryTable.emoji,
          parentCategoryId: categoryTable.parentCategoryId,
        })
        .from(categoryTable)
        .where(
          parentId === null || parentId === undefined
            ? isNull(categoryTable.parentCategoryId)
            : eq(categoryTable.parentCategoryId, parentId)
        )

      return categoryResult ?? []
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error fetching categories by parent ID:", error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const hasChildren = async ({ categoryId }: { categoryId: number }) => {
    setLoading(true)
    setError(null)
    try {
      if (!db) {
        throw new Error("Database connection not available")
      }

      if (!isDatabaseInitialized()) {
        console.log("Database not initialized, waiting...")
        await initializeDatabase()
      }

      const children = await db
        .select({ id: categoryTable.id })
        .from(categoryTable)
        .where(eq(categoryTable.parentCategoryId, categoryId))
        .limit(1)

      return children.length > 0
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred")
      setError(error)
      console.error("Error checking if category has children:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    create,
    getMany,
    getManyAsJson,
    getByParentId,
    hasChildren,
    error,
    loading,
  }
}
