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

type Transaction = {
  name: string
  amount: string
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

  const processGeminiResponse = useCallback(() => {
    if (geminiResponse && geminiResponse !== "") {
      try {
        const cleaned = geminiResponse.replace(/```|json/g, "").trim()
        const parsed = JSON.parse(cleaned)
        const mapped = parsed.map((item: Transaction) => ({
          name: item.name,
          amount: item.amount,
          categoryName: item.categoryName,
        }))
        setTransactions(mapped)
      } catch (error) {
        console.error("Fehler beim Parsen:", error)
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
    <SafeAreaView>
      <ScrollView className='mx-4' keyboardShouldPersistTaps='handled'>
        <ScreenTitle title={t("screens.input.title")} />

        <View className='gap-4 mb-6'>
          <TextField
            title='Name'
            value={title}
            onChangeValue={(value) => {
              setTitle(value)
            }}
          />
          <DateField title='Datum' date={date} onChangeDate={onChangeDate} />
          <TextField
            title='Notiz'
            value={note}
            onChangeValue={(value) => setNote(value)}
          />
          <TextField title='Gesamtsumme' value={total} balance={true} />
          <Button title='Bestätigen' onPress={() => {}} />
        </View>

        <View className='gap-1 mb-2'>
          <Text className='text-subtitle font-semibold'>
            Einzelne Transaktionen
          </Text>
          {/* <Button title='Transaktion hinzufügen' onPress={addTransaction} /> */}
        </View>

        <View className='gap-2'>
          {transactions.length === 0 && (
            <Text className='text-info'>{"Keine Transaktionnen"}</Text>
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
