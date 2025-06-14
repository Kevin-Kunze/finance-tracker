import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function CategorySettingsScreen() {
  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-primary-50 dark:bg-primary-950'>
      <Text className='text-primary-600 text-3xl'>Category Settings</Text>
    </SafeAreaView>
  )
}
