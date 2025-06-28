import React, { useState, useEffect, useRef } from "react"
import { View, Text, ScrollView } from "react-native"
import { useRoute } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import DateField from "@/components/input/DateField"
import TextField from "@/components/input/TextField"
import ScreenTitle from "@/components/tabs/ScreenTitle"
import { useTranslation } from "react-i18next"
import Button from "@/components/buttons/Button"
import TransactionContainer from "@/components/containers/TransactionContainer"
import useTransactionGroup from "@/db/queries/transactionGroup"
import useCategory from "@/db/queries/category"
import { CustomColors } from "@/assets/colors"

type TransactionResponse = {
  name: string
  amount: string
  term: string
  categoryId: number
}

type Category = {
  id: number
  name: string
  color: CustomColors
  emoji: string
}

type Transaction = {
  name: string
  amount: string
  term: string
  category: Category
}

export default function TransactionScreen() {
  const { t } = useTranslation()

  const route = useRoute()
  const { geminiResponse } = (route.params as { geminiResponse: string }) || {
    geminiResponse: "",
  }

  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [date, setDate] = useState(new Date())
  const processedResponse = useRef<string>("")

  const { getMany: getCategories } = useCategory()
  const { create: createTransactionGroup } = useTransactionGroup()

  const processGeminiResponse = async () => {
    console.log("Processing geminiResponse...")
    processedResponse.current = geminiResponse

    if (geminiResponse && geminiResponse !== "") {
      try {
        const cleaned = geminiResponse.replace(/```|json/g, "").trim()
        const parsed = JSON.parse(cleaned)

        console.log("Parsed transactions: ", parsed)

        const categoryIds = parsed.map(
          (transaction: TransactionResponse) => transaction.categoryId
        )
        console.log("Category IDs: ", categoryIds)

        if (!categoryIds || categoryIds.length === 0) {
          console.warn("No category IDs found in parsed transactions")
          setTransactions([])
          return
        }

        console.log("Attempting to fetch categories...")
        const categoryResult = await getCategories({
          ids: categoryIds,
        })

        console.log("Category result: ", categoryResult)
        if (!categoryResult || categoryResult.length === 0) {
          console.warn("Category not found")
          return
        }

        setTransactions(
          parsed.map((transaction: TransactionResponse) => {
            const category = categoryResult.find(
              (category: any) => category.id === transaction.categoryId
            )
            return {
              name: transaction.name,
              amount: transaction.amount,
              term: transaction.term,
              category: category,
            }
          })
        )
      } catch (error) {
        console.error("Error while parsing: ", error) //TODO add proper error handling
      }
    } else {
      setTransactions([])
    }
  }

  useEffect(() => {
    const initializeTransactions = async () => {
      if (geminiResponse && geminiResponse !== "") {
        await processGeminiResponse()
      }
    }

    initializeTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geminiResponse])

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate)
    }
  }

  const handleSubmit = async () => {
    if (title.trim() === "" || transactions.length === 0) {
      console.warn("Title or transactions are empty") //TODO add proper error handling
      return
    }

    const transactionData = transactions.map((transaction) => ({
      amount: parseFloat(transaction.amount),
      term: transaction.term,
      categoryId: transaction.category.id,
    }))

    const result = await createTransactionGroup({
      name: title,
      note,
      date,
      transactions: transactionData,
    })

    setTitle("")
    setNote("")
    setTransactions([])
    console.log("Inserted in database:", result)
  }

  const total = transactions
    .reduce(
      (sum, transaction: Transaction) =>
        sum + parseFloat(transaction.amount || "0"),
      0
    )
    .toFixed(2)

  return (
    <SafeAreaView className='bg-gray-100 dark:bg-primary-950 flex-1'>
      <ScrollView className='mx-4' keyboardShouldPersistTaps='handled'>
        <ScreenTitle title={t("screens.input.title")} />

        <View className='gap-4 mb-6'>
          <TextField
            title={t("screens.input.name")}
            value={title}
            onChangeValue={(value) => {
              setTitle(value)
            }}
          />
          <DateField
            title={t("screens.input.date")}
            date={date}
            onChangeDate={onChangeDate}
          />
          <TextField
            title={t("screens.input.note")}
            value={note}
            onChangeValue={(value) => setNote(value)}
          />
          <TextField
            title={t("screens.input.sum")}
            value={total}
            balance={true}
          />
          <Button
            title={t("screens.input.submit")}
            onPress={() => {
              handleSubmit()
            }}
          />
        </View>

        <View className='gap-1 mb-2'>
          <Text className='text-subtitle font-semibold text-gray-950 dark:text-gray-100'>
            {t("screens.input.transactions")}
          </Text>
        </View>

        <View className='gap-2'>
          {transactions.length === 0 && (
            <Text className='text-gray-950 dark:text-gray-100'>
              {t("screens.input.noTransactions")}
            </Text>
          )}
          {transactions.map((transaction, index) => (
            <View key={index}>
              {/* Amount */}
              <TransactionContainer
                name={transaction.name}
                amount={transaction.amount}
                term={transaction.term}
                category={transaction.category}
                onDelete={() => {
                  setTransactions((prev) => prev.filter((_, i) => i !== index))
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
