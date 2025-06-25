import { useState } from "react"
import { useDb } from ".."
import { categoryTable } from "../schemas/categories"
import { asc, eq, isNull } from "drizzle-orm"
import { categoryTermTable } from "../schemas/categoryTerms"

type CategoryWithChildren = {
  id: string
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

  const get = async ({ id }: { id: string }) => {
    setLoading(true)
    setError(null)
    try {
      return db.select().from(categoryTable).where(eq(categoryTable.id, id))
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

  const getMany = async ({
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
            : undefined
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

  const getManyAsJson = async () => {
    setLoading(true)
    setError(null)
    try {
      const allCategories = await db.select().from(categoryTable)
      const buildNestedStructure = (
        parentId: string | null
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

  return {
    create,
    get,
    getMany,
    getManyAsJson,
    error,
    loading,
  }
}
