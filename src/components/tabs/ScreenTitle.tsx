import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { View, Text, TouchableOpacity } from "react-native"
import { useColorScheme } from "nativewind"

export default function ScreenTitle({
  title,
  showBackButton,
}: {
  title: string
  showBackButton?: boolean
}) {
  const { colorScheme } = useColorScheme()

  const router = useRouter()

  return (
    <View className='flex-row items-center mb-2'>
      {showBackButton && (
        <TouchableOpacity
          className='p-2 rounded-full'
          onPress={() => router.back()}
        >
          <Ionicons
            name='arrow-back'
            size={24}
            color={colorScheme === "light" ? "#28535c" : "#fff"}
          />
        </TouchableOpacity>
      )}

      <Text className='text-title font-bold text-primary-600 dark:text-gray-100'>
        {title}
      </Text>
    </View>
  )
}
