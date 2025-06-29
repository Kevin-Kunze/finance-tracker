import React, { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import ScreenTitle from "@/components/tabs/ScreenTitle"
import { useTranslation } from "react-i18next"
import useCategory from "@/db/queries/category"
import { CustomColors } from "@/assets/colors"
import EmojiWithBackground from "@/components/display/EmojiWithBackground"

type Category = {
  id: number
  name: string
  color: CustomColors
  emoji: string
}

export default function CategorySelectorScreen() {
  const { t } = useTranslation()
  const router = useRouter()
  const params = useLocalSearchParams()

  const currentCategoryId = params.currentCategoryId
    ? Number(params.currentCategoryId)
    : 0

  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { getMany: getCategories } = useCategory()

  useEffect(() => {
    let isMounted = true

    const loadCategories = async () => {
      try {
        setIsLoading(true)
        const allCategoryIds = Array.from({ length: 100 }, (_, i) => i + 1)
        const categoryResult = await getCategories({ ids: allCategoryIds })

        if (isMounted) {
          setCategories(categoryResult as Category[])
        }
      } catch (error) {
        console.error("Error loading categories:", error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCategories()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCategorySelect = (category: Category) => {
    router.push({
      pathname: "/scan/transactionForm",
      params: {
        selectedCategory: JSON.stringify(category),
      },
    })
  }

  return (
    <SafeAreaView className='bg-gray-100 dark:bg-primary-950 flex-1'>
      <View className='flex-1'>
        <View className='px-4'>
          <ScreenTitle title={t("screens.categorySelector.title")} />
        </View>

        {isLoading ? (
          <View className='flex-1 items-center justify-center'>
            <Text className='text-gray-600 dark:text-gray-400'>
              {t("screens.categorySelector.loading")}
            </Text>
          </View>
        ) : (
          <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <View className='gap-3 pb-6 px-4'>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategorySelect(category)}
                  className={`flex-row items-center p-4 rounded-xl ${
                    currentCategoryId === category.id
                      ? "bg-primary-200 dark:bg-primary-700"
                      : "bg-gray-50 dark:bg-primary-800"
                  }`}
                  activeOpacity={0.7}
                >
                  <EmojiWithBackground
                    color={category.color}
                    emoji={category.emoji}
                    size='xs'
                  />
                  <Text
                    className={`text-base ml-4 ${
                      currentCategoryId === category.id
                        ? "text-primary-800 dark:text-primary-200 font-semibold"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {category.name}
                  </Text>
                  {currentCategoryId === category.id && (
                    <View className='ml-auto'>
                      <Text className='text-primary-600 dark:text-primary-400 text-lg'>
                        ✓
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}
