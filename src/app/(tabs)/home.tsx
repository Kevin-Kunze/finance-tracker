import { useTypedTranslation } from "@/language/useTypedTranslation" // Language
import CircularButton from "@/components/buttons/CircularButton"
import { Ionicons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import useTransactionGroup from "@/db/queries/transactionGroup"
import { TransactionGroup } from "@/db/schemas/transactionGroups"
import Button from "@/components/buttons/Button"
import useTransaction from "@/db/queries/transaction"
import BalanceWidget from "@/components/widgets/BalanceWidget"

export default function HomeScreen() {
  const { error } = useTransactionGroup()
  const [transactionGroups, setTransactionGroups] = useState<
    (TransactionGroup & {
      categoryName: string
      categoryColor: string | null
      categoryIcon: string | null
    })[]
  >([])

  const { getMany: getTransactions, getTotalAmount } = useTransaction()

  const [totalAmount, setTotalAmount] = useState<string>("0")
  const { t } = useTypedTranslation() // Language

  const fetchTotalAmount = useCallback(async () => {
    try {
      const totalAmountResult = await getTotalAmount()
      setTotalAmount(totalAmountResult ?? "0")
    } catch (err) {
      console.error("Failed to fetch totalAmount:", err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleDebug = async () => {
    console.log(await getTransactions())
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100 dark:bg-primary-950 '>
      <View className='mx-4 gap-4'>
        {error && (
          <View className=' p-3 bg-red-100 border border-red-400 rounded'>
            <Text className='text-red-800'>{error.message}</Text>
          </View>
        )}
        <View className='flex-row justify-center pt-2 gap-4'>
          <CircularButton
            icon='add'
            onPress={() => router.push("/scan/camera")}
          />
          <CircularButton
            icon='search'
            onPress={() => console.log("Search button pressed")}
          />
          <CircularButton
            icon='grid-outline'
            onPress={() => router.push("/kitchensink")}
          />
        </View>
        <View className='bg-primary-600 dark:bg-primary-800 p-4 rounded-lg'>
          <Text className='text-gray-50 text-base text-center'>
            {totalAmount} €
          </Text>
        </View>
        <Button
          title='Debug'
          onPress={() => {
            handleDebug()
          }}
        />
      </View>
    </SafeAreaView>
  )
}
