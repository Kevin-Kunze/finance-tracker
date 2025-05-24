import { useEffect, useState, useCallback } from "react"
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import useTransactions from "@/db/queries/transaction"
import { Transaction } from "@/db/schemas/transaction"
import { SafeAreaView } from "react-native-safe-area-context"
import { useColorScheme } from "nativewind"
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import { useFocusEffect } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function TransactionScreen() {
  const { colorScheme } = useColorScheme()

  const { getTransactions, deleteTransaction, loading, error } =
    useTransactions()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getTransactions({})
      setTransactions(data)
    } catch (err) {
      console.error("Failed to fetch transactions:", err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useFocusEffect(
    useCallback(() => {
      fetchTransactions()
    }, [fetchTransactions])
  )

  const handleDelete = async (id: string) => {
    await deleteTransaction(id)
    fetchTransactions()
  }

  if (loading && transactions.length === 0) {
    return (
      <SafeAreaView className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#1E3A8A' />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-background dark:bg-background-dark'>
      <View className='p-4'>
        <Text className='text-primary-600 text-2xl font-bold'>
          Transactions
        </Text>
      </View>

      {error && (
        <View className='mx-4 p-3 bg-red-100 border border-red-400 rounded'>
          <Text className='text-red-800'>{error.message}</Text>
        </View>
      )}

      <FlatList
        className='mx-4'
        data={transactions}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View className='flex-1 items-center justify-center'>
            <Text className='text-gray-500'>No transactions found</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity
                className={`${
                  item.amount < 0
                    ? "bg-red-700 dark:bg-red-900"
                    : "bg-green-700 dark:bg-green-900"
                } flex-1 rounded-lg items-center justify-center`}
                onPress={() => handleDelete(item.id)}
              >
                <Ionicons name='trash' color='white' size={24} />
                <Text className='text-white text-sm mt-1'>Delete</Text>
              </TouchableOpacity>
            )}
          >
            <View
              className={`${
                colorScheme === "light"
                  ? item.amount < 0
                    ? "bg-red-700"
                    : "bg-green-700"
                  : item.amount < 0
                  ? "bg-red-900"
                  : "bg-green-900"
              } rounded-lg p-3`}
            >
              <Text className='text-lg font-medium text-text-dark'>
                {item.description}
              </Text>
              <View className='flex-row justify-between mt-2'>
                <Text
                  className={`text-lg font-semibold ${
                    item.amount < 0 ? "text-red-200" : "text-green-200"
                  }`}
                >
                  {item.amount > 0 ? "+" : ""}
                  {item.amount.toFixed(2)} €
                </Text>
              </View>
            </View>
          </Swipeable>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={loading}
        onRefresh={fetchTransactions}
      />
    </SafeAreaView>
  )
}
