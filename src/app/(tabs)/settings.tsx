import { Text, View, Switch } from "react-native"
import { useColorScheme } from "nativewind"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "@/assets/colors"

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme()

  return (
    <SafeAreaView className='flex-1 bg-gray-50 dark:bg-primary-950'>
      <View className='flex-row items-center px-4 py-2'>
        <Text className='text-2xl font-bold text-primary-600 dark:text-white ml-2'>
          Settings
        </Text>
      </View>

      <View className='px-4 py-6'>
        <View className='bg-primary-200 dark:bg-primary-900 rounded-lg overflow-hidden'>
          <View className='p-4 '>
            <Text className='text-lg font-semibold text-text dark:text-gray-50 mb-1'>
              Appearance
            </Text>
          </View>
          <View className='flex-row justify-between items-center p-4'>
            <View className='flex-row items-center'>
              <Ionicons
                name={colorScheme === "light" ? "sunny" : "moon"}
                size={22}
                color={
                  colorScheme === "light"
                    ? colors.primary[600]
                    : colors.gray[50]
                }
              />
              <Text className='text-text dark:text-gray-50 ml-3'>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={colorScheme === "dark"}
              onValueChange={toggleColorScheme}
              trackColor={{
                false: "#888",
                true: "#888",
              }}
              thumbColor={colorScheme === "light" ? "#5071b3" : "#28395c"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
