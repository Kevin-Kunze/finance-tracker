import React, { useState, useEffect, useRef, useCallback } from "react"
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native"
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import TextField from "@/components/input/TextField"
import ScreenTitle from "@/components/tabs/ScreenTitle"
import Button from "@/components/buttons/Button"
import DuoSwitch from "@/components/buttons/DuoSwitch"
import useCategory from "@/db/queries/category"
import { CustomColors } from "@/assets/colors"
import EmojiWithBackground from "@/components/display/EmojiWithBackground"
import { Ionicons } from "@expo/vector-icons"
import { useTypedTranslation } from "@/language/useTypedTranslation"

type Category = {
  id: number
  name: string
  color: CustomColors
  emoji: string
}

type TransactionFormData = {
  name: string
  amount: string
  categoryId: number
  type: "expense" | "income"
}

export default function TransactionFormScreen() {
  const { t } = useTypedTranslation()
  const router = useRouter()
  const params = useLocalSearchParams()

  const isEditing = !!params.transactionIndex
  const transactionIndex = params.transactionIndex
    ? Number(params.transactionIndex)
    : -1
  const editData: {
    name: string
    amount: number
    category: Category
  } = params.editData ? JSON.parse(params.editData as string) : null

  const [formData, setFormData] = useState<TransactionFormData>({
    name: "",
    amount: "",
    categoryId: 0,
    type: "expense",
  })

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [categories, setCategories] = useState<Category[]>([])
  const [, setIsLoading] = useState(false)
  const processedCategoryRef = useRef<string | null>(null)
  const isNavigatingToCategoryRef = useRef(false)

  const { getMany: getCategories } = useCategory()

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      amount: "",
      categoryId: 0,
      type: "expense",
    })
    setSelectedCategory(null)
    processedCategoryRef.current = null
  }, [])
  useFocusEffect(
    useCallback(() => {
      // When the screen gains focus, reset the navigation flag
      isNavigatingToCategoryRef.current = false

      return () => {
        // This runs when the screen loses focus
        if (!isEditing && !isNavigatingToCategoryRef.current) {
          resetForm()
        }
      }
    }, [resetForm, isEditing])
  )

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

  useEffect(() => {
    if (isEditing && editData) {
      setFormData({
        name: editData.name,
        amount: Math.abs(editData.amount).toString(),
        categoryId: editData.category.id,
        type: editData.amount < 0 ? "expense" : "income",
      })
      setSelectedCategory(editData.category)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  useEffect(() => {
    if (
      params.selectedCategory &&
      params.selectedCategory !== processedCategoryRef.current
    ) {
      try {
        const category = JSON.parse(params.selectedCategory as string)
        setSelectedCategory(category)
        setFormData((prev) => ({
          ...prev,
          categoryId: category.id,
        }))

        processedCategoryRef.current = params.selectedCategory as string
      } catch (error) {
        console.error("Error parsing selected category:", error)
      }
    }
  }, [params.selectedCategory])

  const handleCategoryPress = () => {
    isNavigatingToCategoryRef.current = true
    router.push({
      pathname: "/scan/categorySelector",
      params: { currentCategoryId: formData.categoryId.toString() },
    })
  }

  const handleSubmit = () => {
    if (
      !formData.name.trim() ||
      !formData.amount.trim() ||
      formData.categoryId === 0
    ) {
      Alert.alert(t("common.error"), t("screens.transactionForm.fillAllFields"))
      return
    }

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      Alert.alert(t("common.error"), "Please enter a valid positive amount")
      return
    }

    const selectedCat =
      selectedCategory ||
      categories.find((cat) => cat.id === formData.categoryId)
    if (!selectedCat) {
      Alert.alert(t("common.error"), t("screens.transactionForm.validCategory"))
      return
    }

    const finalAmount =
      formData.type === "expense" ? -Math.abs(amount) : Math.abs(amount)

    const transactionData = {
      name: formData.name,
      amount: finalAmount.toString(),
      category: selectedCat,
      type: formData.type,
    }

    if (isEditing) {
      router.push({
        pathname: "/scan/input",
        params: {
          updatedTransaction: JSON.stringify({
            index: transactionIndex,
            data: transactionData,
          }),
        },
      })
    } else {
      router.push({
        pathname: "/scan/input",
        params: {
          newTransaction: JSON.stringify(transactionData),
        },
      })
    }

    if (!isEditing) {
      resetForm()
    }
  }

  const handleCancel = () => {
    if (!isEditing) {
      resetForm()
    }
    router.back()
  }

  return (
    <SafeAreaView className='bg-gray-100 dark:bg-primary-950 flex-1'>
      <ScrollView className='mx-4' keyboardShouldPersistTaps='handled'>
        <ScreenTitle
          title={
            isEditing
              ? t("screens.transactionForm.titleEdit")
              : t("screens.transactionForm.titleAdd")
          }
        />

        <View className='gap-4 mb-6'>
          <TextField
            title={t("screens.transactionForm.name")}
            value={formData.name}
            onChangeValue={(value) =>
              setFormData((prev) => ({ ...prev, name: value }))
            }
            placeholder={t("screens.transactionForm.namePlaceholder")}
          />

          <View className='flex-row justify-between items-center'>
            <Text className='text-base font-semibold mb-2 text-gray-950 dark:text-gray-100'>
              Transaction Type
            </Text>
            <DuoSwitch
              value={formData.type === "income"}
              onChange={(option: "Expense" | "Income") =>
                setFormData((prev) => ({
                  ...prev,
                  type: option === "Income" ? "income" : "expense",
                }))
              }
              options={["Expense", "Income"]}
            />
          </View>

          <View>
            <TextField
              title={t("screens.transactionForm.amount")}
              value={formData.amount}
              onChangeValue={(value) =>
                setFormData((prev) => ({ ...prev, amount: value }))
              }
              placeholder={t("screens.transactionForm.amountPlaceholder")}
            />
          </View>

          <View className='gap-1'>
            <Text className='text-base font-semibold text-gray-950 dark:text-gray-100'>
              {t("screens.transactionForm.category")}
            </Text>

            <TouchableOpacity
              onPress={handleCategoryPress}
              className={`flex-row items-center p-4 rounded-xl border-2 ${
                selectedCategory
                  ? "bg-primary-50 dark:bg-primary-900 border-primary-200 dark:border-primary-700"
                  : "bg-gray-50 dark:bg-primary-800 border-gray-200 dark:border-primary-700"
              }`}
              activeOpacity={0.7}
            >
              {selectedCategory ? (
                <>
                  <EmojiWithBackground
                    color={selectedCategory.color}
                    emoji={selectedCategory.emoji}
                    size='s'
                  />
                  <Text className='text-base ml-3 text-gray-900 dark:text-gray-100 font-medium'>
                    {selectedCategory.name}
                  </Text>
                </>
              ) : (
                <Text className='text-base text-gray-500 dark:text-gray-100'>
                  {t("screens.transactionForm.selectCategory")}
                </Text>
              )}
              <View className='ml-auto'>
                <Ionicons name='chevron-forward' size={24} color='gray' />
              </View>
            </TouchableOpacity>
          </View>

          <View className='flex-row gap-4 mt-4'>
            <View className='flex-1'>
              <Button
                title={t("screens.transactionForm.cancel")}
                onPress={handleCancel}
              />
            </View>
            <View className='flex-1'>
              <Button
                title={
                  isEditing
                    ? t("screens.transactionForm.updateTransaction")
                    : t("screens.transactionForm.addTransaction")
                }
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
