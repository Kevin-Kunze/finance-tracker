import React, { useState, useEffect, useCallback } from "react"
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

type Transaction = {
  name: string
  amount: string
  term: string
  categoryName: string
  categoryId: string
}

export default function TransactionScreen() {
  const { t } = useTranslation()

  const route = useRoute()
  let { geminiResponse } = (route.params as { geminiResponse: string }) || {
    geminiResponse: "",
  }

  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [date, setDate] = useState(new Date())

  const { create: createTransactionGroup } = useTransactionGroup()

  const processGeminiResponse = useCallback(() => {
    if (geminiResponse && geminiResponse !== "") {
      try {
        const cleaned = geminiResponse.replace(/```|json/g, "").trim()
        const parsed = JSON.parse(cleaned)
        const mapped = parsed.map((item: Transaction) => ({
          name: item.name,
          amount: item.amount,
          term: item.term,
          categoryName: item.categoryName,
          categoryId: item.categoryId,
        }))
        setTransactions(mapped)
      } catch (error) {
        console.error("Error while parsing: ", error) //TODO add proper error handling
      }
    } else {
      setTransactions([])
    }
  }, [geminiResponse])

  useEffect(() => {
    processGeminiResponse()
  }, [processGeminiResponse, geminiResponse])

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
      term: transaction.name,
      categoryId: transaction.categoryId,
    }))

    console.log("transactionData:", transactionData)

    const result = await createTransactionGroup({
      name: title,
      note,
      date,
      transactions: transactionData,
    })
    console.log("Transaction group created:", result)

    // Reset form after submission
    // setTitle("")
    // setNote("")
    // setTransactions([])
  }

  // const addTransaction = () => {
  //   setTransactions((prev: Transaction[]) => [
  //     { name: "Neue Transaktion", category: "-", amount: "0" },
  //     ...prev,
  //   ])
  // }

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
          {/* <Button title='Transaktion hinzufügen' onPress={addTransaction} /> */}
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
                title={transaction.name}
                amount={transaction.amount}
                category={transaction.categoryName ?? ""}
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
