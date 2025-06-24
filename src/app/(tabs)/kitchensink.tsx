import CircularButton from "@/components/CircularButton"
import EmojiWithBackground from "@/components/EmojiWithBackground"
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
      <View className='mx-6 flex-col gap-2 justify-start items-start'>
        <Text className='text-gray-900 dark:text-gray-100'>
          Circular Button
        </Text>
        <CircularButton icon='home' onPress={() => router.replace("/home")} />
      </View>

      <View className='mx-6 flex-col gap-2 mt-4'>
        <Text className='text-gray-900 dark:text-gray-100'>BalanceWidget</Text>
        <BalanceCard
          amount='3.161,45'
          label='aktueller Kontostand'
          data={[3800, 3200, 10000, 2900, 3161]} // Beispielverlauf
        />
      </View>
      <View className='mx-6 flex-col gap-2 justify-start items-start'>
        <Text className='text-gray-900 dark:text-gray-100'>
          Emoji with Background
        </Text>
        <View className='flex-row gap-2'>
          <EmojiWithBackground size='l' color='orange' emoji='🥰' />
          <EmojiWithBackground size='s' color='blue' emoji='💩' />
          <EmojiWithBackground size='xs' color='turquoise' emoji='💛' />
        </View>
      </View>
    </SafeAreaView>
  )
}
