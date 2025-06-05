import useTransactionGroup from "@/db/queries/transactionGroup"
import { useRouter } from "expo-router"
import { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ScanScreen() {
  const router = useRouter()
  const { createTransactionGroup, loading, error } = useTransactionGroup()

  const [formData, setFormData] = useState({
    name: "",
    note: "",
    amount: "",
    categoryTermId: "",
    accountId: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.amount || !formData.categoryTermId || !formData.accountId) {
      Alert.alert("Error", "Please fill in all required fields")
      return
    }

    try {
      const result = await createTransactionGroup({
        name: formData.name || undefined,
        note: formData.note || undefined,
        date: new Date(),
        transactions: [
          {
            amount: parseFloat(formData.amount),
            categoryTermId: formData.categoryTermId,
            accountId: formData.accountId,
          },
        ],
      })

      if (result) {
        Alert.alert("Success", "Transaction created successfully!", [
          { text: "OK", onPress: () => router.back() },
        ])
        setFormData({
          name: "",
          note: "",
          amount: "",
          categoryTermId: "",
          accountId: "",
        })
      }
    } catch (err) {
      console.error("Failed to create transaction:", err)
      Alert.alert("Error", "Failed to create transaction")
    }
  }

  if (loading) {
    return (
      <SafeAreaView className='flex-1 items-center justify-center bg-gray-50'>
        <ActivityIndicator size='large' color='#1E3A8A' />
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView className='flex-1 bg-gray-50 dark:bg-background-dark'>
      <ScrollView className='flex-1 p-4'>
        <Text className='text-primary-600 text-3xl text-center mb-6'>
          Add Transaction
        </Text>

        {error && (
          <View className='p-3 bg-red-100 border border-red-400 rounded mb-4'>
            <Text className='text-red-800'>{error.message}</Text>
          </View>
        )}

        <View className='gap-4'>
          <View>
            <Text className='text-text dark:text-text-dark text-lg mb-2'>
              Name (Optional)
            </Text>
            <TextInput
              className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-text dark:text-text-dark'
              placeholder='Transaction name'
              placeholderTextColor='#9CA3AF'
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
          </View>

          <View>
            <Text className='text-text dark:text-text-dark text-lg mb-2'>
              Note (Optional)
            </Text>
            <TextInput
              className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-text dark:text-text-dark'
              placeholder='Additional notes'
              placeholderTextColor='#9CA3AF'
              value={formData.note}
              onChangeText={(value) => handleInputChange("note", value)}
              multiline
              numberOfLines={3}
              textAlignVertical='top'
            />
          </View>

          <View>
            <Text className='text-text dark:text-text-dark text-lg mb-2'>
              Amount
            </Text>
            <TextInput
              className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-text dark:text-text-dark'
              placeholder='0.00'
              placeholderTextColor='#9CA3AF'
              value={formData.amount}
              onChangeText={(value) => handleInputChange("amount", value)}
              keyboardType='numeric'
            />
          </View>

          <View>
            <Text className='text-text dark:text-text-dark text-lg mb-2'>
              Category Term ID
            </Text>
            <TextInput
              className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-text dark:text-text-dark'
              placeholder='Category term ID'
              placeholderTextColor='#9CA3AF'
              value={formData.categoryTermId}
              onChangeText={(value) =>
                handleInputChange("categoryTermId", value)
              }
            />
          </View>

          <View>
            <Text className='text-text dark:text-text-dark text-lg mb-2'>
              Account ID
            </Text>
            <TextInput
              className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-text dark:text-text-dark'
              placeholder='Account ID'
              placeholderTextColor='#9CA3AF'
              value={formData.accountId}
              onChangeText={(value) => handleInputChange("accountId", value)}
            />
          </View>

          <TouchableOpacity
            className='bg-primary-600 dark:bg-primary-800 rounded-lg p-4 mt-4'
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text className='text-white text-center text-lg font-semibold'>
              Create Transaction
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='border border-gray-300 dark:border-gray-600 rounded-lg p-4'
            onPress={() => router.back()}
          >
            <Text className='text-text dark:text-text-dark text-center text-lg'>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
