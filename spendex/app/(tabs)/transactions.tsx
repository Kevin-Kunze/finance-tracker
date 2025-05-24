import { useEffect, useState } from "react"
import { Text, View, FlatList, ActivityIndicator } from "react-native"
import useTransactions from "@/db/queries/transaction"
import { Transaction } from "@/db/schemas/transaction"
import { SafeAreaView } from "react-native-safe-area-context"

export default function TransactionScreen() {
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
    <SafeAreaView className='flex-1 bg-background'>
      <View className='p-4'>
        <Text className='text-primary text-2xl font-bold'>Transactions</Text>
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
            <View className='mx-4 mb-2 p-4 bg-white rounded-lg shadow-sm'>
              <Text className='text-lg font-medium'>{item.description}</Text>
              <View className='flex-row justify-between mt-2'>
                <Text
                  className={`text-lg font-semibold ${
                    item.amount < 0 ? "text-red-500" : "text-green-500"
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
