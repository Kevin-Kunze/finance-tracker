import CircularButton from "@/components/CircularButton"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1 bg-background dark:bg-background-dark gap-4'>
      <View className='flex-row justify-center px-4 pt-2 gap-4'>
        <CircularButton
          icon='add'
          onPress={() => console.log("Add button pressed")}
        />
        <CircularButton
          icon='search'
          onPress={() => console.log("Search button pressed")}
        />
        <CircularButton
          icon='settings-outline'
          onPress={() => router.push("/settings")}
        />
      </View>

      <View className='bg-primary-600 dark:bg-primary-700 p-4 mx-4 rounded-lg'>
        <Text className='text-white text-3xl text-center'>2200€</Text>
      </View>
      <View className='bg-primary-600 dark:bg-primary-700 p-4 mx-4 rounded-lg'>
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
