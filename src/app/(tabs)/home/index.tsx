import { useTranslation } from "react-i18next"
import CircularButton from "@/components/CircularButton"
import useTransactions from "@/db/queries/transaction"
import { Transaction } from "@/db/schemas/transaction"
import { Ionicons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function HomeScreen() {
  const { getTransactions, getTotalAmount, loading, error } = useTransactions()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [totalAmount, setTotalAmount] = useState<number>(0)
  const { t } = useTranslation()

  const fetchTotalAmount = useCallback(async () => {
    try {
      const data = await getTotalAmount()
      setTotalAmount(+data)
    } catch (err) {
      console.error("Failed to fetch totalAmount:", err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getTransactions({ limit: 3 })
      setTransactions(data)
    } catch (err) {
      console.error("Failed to fetch transactions:", err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchTransactions()
    fetchTotalAmount()
  }, [fetchTotalAmount, fetchTransactions])

  useFocusEffect(
    useCallback(() => {
      fetchTransactions()
      fetchTotalAmount()
    }, [fetchTotalAmount, fetchTransactions])
  )

  if (loading && transactions.length === 0) {
    return (
      <SafeAreaView className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#1E3A8A' />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-background dark:bg-background-dark gap-4'>
      {error && (
        <View className='mx-4 p-3 bg-red-100 border border-red-400 rounded'>
          <Text className='text-red-800'>{error.message}</Text>
        </View>
      )}
      <View className='flex-row justify-center px-4 pt-2 gap-4'>
        <CircularButton icon='add' onPress={() => router.push("/scan")} />
        <CircularButton
          icon='search'
          onPress={() => console.log("Search button pressed")}
        />
        <CircularButton
          icon='settings-outline'
          onPress={() => router.push("/home/settings")}
        />
      </View>

      <View className='bg-primary-600 dark:bg-primary-700 p-4 mx-4 rounded-lg'>
        <Text className='text-white text-3xl text-center'>{totalAmount} €</Text>
      </View>
      <View className='bg-primary-600 dark:bg-primary-700 mx-4 rounded-lg'>
        <TouchableOpacity
          className='flex-row items-center justify-center m-4 gap-2'
          onPress={() => {
            router.push("/(tabs)/transactions")
          }}
        >
          <Ionicons name='card' size={12} color='white' />
          <Text className='text-white text-center'>{t("lastTransactions")}</Text>
        </TouchableOpacity>
        <View className='rounded-lg'>
          {transactions.map((transaction) => (
            <View
              key={transaction.id}
              className='flex-row bg-background dark:bg-background-dark p-3 items-center justify-between mx-2 mb-2 rounded-lg'
            >
              <Text
                className={
                  transaction.amount < 0 ? "text-red-600" : "text-green-600"
                }
              >
                {transaction.description}
              </Text>
              <Text className='text-text dark:text-text-dark'>
                {transaction.amount.toFixed(2)} €
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
