import { useTypedTranslation } from "@/language/useTypedTranslation" // Language
import CircularButton from "@/components/CircularButton"
import { Ionicons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import useTransactionGroup from "@/db/queries/transactionGroup"
import { TransactionGroup } from "@/db/schemas/transactionGroups"

export default function HomeScreen() {
  const { error } = useTransactionGroup()
  const [transactionGroups, setTransactionGroups] = useState<
    (TransactionGroup & {
      categoryName: string
      categoryColor: string | null
      categoryIcon: string | null
    })[]
  >([])

  const [totalAmount, setTotalAmount] = useState<string>("0")
  const { t } = useTypedTranslation() // Language

  const fetchTotalAmount = useCallback(async () => {
    try {
      // const data = await getTotalAmount()
      setTotalAmount("0")
    } catch (err) {
      console.error("Failed to fetch totalAmount:", err)
    }
  }, [])

  const fetchTransactions = useCallback(async () => {
    try {
      // const data = await getTransactionGroups({ limit: 3 })
      setTransactionGroups([])
    } catch (err) {
      console.error("Failed to fetch transactions:", err)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchTransactions()
      fetchTotalAmount()
    }, [fetchTotalAmount, fetchTransactions])
  )

  return (
    <SafeAreaView className='flex-1 bg-gray-100 dark:bg-primary-950 gap-4'>
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
          icon='grid-outline'
          onPress={() => router.push("/kitchensink")}
        />
      </View>

      <View className='bg-primary-600 dark:bg-primary-800 p-4 mx-4 rounded-lg'>
        <Text className='text-gray-50 text-base text-center'>
          {totalAmount} €
        </Text>
      </View>
      <View className='bg-primary-600 dark:bg-primary-800 mx-4 rounded-lg'>
        <TouchableOpacity
          className='flex-row items-center justify-center m-4 gap-2'
          onPress={() => {
            router.push("/(tabs)/transactions")
          }}
        >
          <Ionicons name='card' size={16} color='white' />
          <Text className='text-white text-base text-gray-50 text-center'>
            {t("screens.home.lastTransactions")}
          </Text>
        </TouchableOpacity>
        <View className='rounded-lg'>
          {transactionGroups.map((transaction) => (
            <View
              key={transaction.id}
              className='flex-row bg-background dark:bg-background-dark p-3 items-center justify-between mx-2 mb-2 rounded-lg'
            >
              <Text>{transaction.name}</Text>
              <Text className='text-text dark:text-text-dark'>0 €</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
