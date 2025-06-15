import CircularButton from "@/components/CircularButton"
import ScreenTitle from "@/components/ScreenTitle"
import BalanceCard from "@/components/BalanceWidget"
import { useRouter } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function KitchensinkScreen() {
  const router = useRouter()

  return (
    <SafeAreaView className='bg-gray-50 dark:bg-primary-950 flex-1 gap-4'>
      <ScreenTitle title='Kitchensink' />
      <View className='mx-6 flex-col gap-2'>
        <Text className='text-gray-900 dark:text-gray-100'>
          Circular Button
        </Text>
        <CircularButton icon='home' onPress={() => router.replace("/home")} />
      </View>
      
      <View className='mx-6 flex-col gap-2 mt-4'>
      <Text className='text-gray-900 dark:text-gray-100'>
          BalanceWidget
        </Text>
      <BalanceCard
        amount="3.161,45"
        label="aktueller Kontostand"
        data={[3800, 3200, 10000, 2900, 3161]} // Beispielverlauf
      />
    </View>
    </SafeAreaView>
  )
}
