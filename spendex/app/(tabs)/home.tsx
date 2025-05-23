import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1 bg-background gap-4'>
      <View className='bg-primary p-4 mx-4 rounded-lg'>
        <Text className='text-white text-3xl text-center'>2200€</Text>
      </View>
      <View className='bg-primary p-4 mx-4 rounded-lg'>
        <View
          className='flex-row items-center justify-center gap-2'
          onTouchEnd={() => {
            router.push("/(tabs)/transactions")
          }}
        >
          <Ionicons name='card' size={12} color='white' />
          <Text className='text-white text-center'>Last Transactions</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
