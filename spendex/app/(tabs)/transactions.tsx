import { useEffect, useState } from "react"
import { Text, View, FlatList, ActivityIndicator } from "react-native"
import useTransactions from "@/db/queries/transaction"
import { Transaction } from "@/db/schemas/transaction"
import { SafeAreaView } from "react-native-safe-area-context"
import { useColorScheme } from "nativewind"

export default function TransactionScreen() {
  const { colorScheme } = useColorScheme()
  const { getTransactions, loading, error } = useTransactions()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetchTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions()
      setTransactions(data)
    } catch (err) {
      console.error("Failed to fetch transactions:", err)
    }
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

      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              className={`${
                colorScheme === "light"
                  ? item.amount < 0
                    ? "bg-red-700"
                    : "bg-green-700"
                  : item.amount < 0
                  ? "bg-red-900"
                  : "bg-green-900"
              } mx-4 mb-2 p-3 rounded-lg`}
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
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={loading}
          onRefresh={fetchTransactions}
        />
      ) : (
        <View className='flex-1 items-center justify-center'>
          <Text className='text-gray-500'>No transactions found</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
