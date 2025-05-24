import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useState } from "react"
import useTransactions from "@/db/queries/transaction"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useColorScheme } from "nativewind"

export default function ScanScreen() {
  const { colorScheme } = useColorScheme()

  const { createTransaction, error, loading } = useTransactions()
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [isExpense, setIsExpense] = useState(true)

  const handleCreateTransaction = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert("Invalid amount", "Please enter a valid number")
      return
    }

    const numericAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount))

    const result = await createTransaction(numericAmount, description.trim())

    if (result) {
      setAmount("")
      setDescription("")

      Alert.alert("Success", "Transaction created successfully", [
        {
          text: "View Transactions",
          onPress: () => router.push("/(tabs)/transactions"),
        },
        {
          text: "Add Another",
          style: "cancel",
        },
      ])
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className='flex-1'
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className='flex-1 bg-background dark:bg-background-dark p-4'>
          <Text className='text-xl font-bold text-primary-600 dark:text-primary-650 mb-4'>
            Add New Transaction
          </Text>

          <View className='flex-row mb-6 bg-gray-100 dark:bg-primary-650 rounded-lg'>
            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg ${
                isExpense
                  ? "bg-primary-600 dark:bg-primary-700"
                  : "bg-transparent"
              }`}
              onPress={() => setIsExpense(true)}
            >
              <Text
                className={`text-center ${
                  isExpense ? "text-white" : "text-gray-500 dark:text-gray-300"
                }`}
              >
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg ${
                !isExpense
                  ? "bg-primary-600 dark:bg-primary-700"
                  : "bg-transparent"
              }`}
              onPress={() => setIsExpense(false)}
            >
              <Text
                className={`text-center ${
                  !isExpense ? "text-white" : "text-gray-500 dark:text-gray-300"
                }`}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>

          <Text className='text-gray-600 dark:text-gray-100 mb-2'>Amount</Text>
          <View className='flex-row items-center relative mb-6'>
            <TextInput
              className='bg-white rounded-lg p-3 border border-gray-200 flex-1'
              value={amount}
              onChangeText={setAmount}
              placeholder='0.00'
              keyboardType='decimal-pad'
              placeholderTextColor={
                colorScheme === "light" ? "#888" : "#626262"
              }
              autoFocus
            />
            <Text className='absolute right-5'>€</Text>
          </View>

          <Text className='text-gray-600 dark:text-gray-100 mb-2'>
            Description
          </Text>
          <TextInput
            className='bg-white rounded-lg p-3 border border-gray-200 mb-6'
            value={description}
            onChangeText={setDescription}
            placeholder="What's this transaction for?"
            cursorColor={colorScheme === "light" ? "#5071b3" : "#28395c"}
            placeholderTextColor={colorScheme === "light" ? "#888" : "#626262"}
          />

          <TouchableOpacity
            className={`py-4 rounded-lg ${
              loading
                ? "bg-gray-400 dark:bg-gray-600"
                : "bg-primary-600 dark:bg-primary-700"
            }`}
            onPress={handleCreateTransaction}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color='white' />
            ) : (
              <Text className='text-white text-center font-bold'>
                Add Transaction
              </Text>
            )}
          </TouchableOpacity>

          {error && (
            <Text className='text-red-500 mt-4 text-center'>
              {error.message}
            </Text>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
