import { Text, View, Switch, TouchableOpacity } from "react-native"
import { useColorScheme } from "nativewind"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme()

  return (
    <SafeAreaView className='flex-1 bg-background dark:bg-background-dark'>
      <View className='flex-row items-center px-4 py-2'>
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
        <Text className='text-2xl font-bold text-primary-600 dark:text-white ml-2'>
          Settings
        </Text>
      </View>

      <View className='px-4 py-6'>
        <View className='bg-gray-100 dark:bg-primary-700 rounded-lg overflow-hidden'>
          <View className='p-4 '>
            <Text className='text-lg font-semibold text-text dark:text-text-dark mb-1'>
              Appearance
            </Text>
          </View>
          <View className='flex-row justify-between items-center p-4'>
            <View className='flex-row items-center'>
              <Ionicons
                name={colorScheme === "light" ? "sunny" : "moon"}
                size={22}
                color={colorScheme === "light" ? "#5071b3" : "#fff"}
              />
              <Text className='text-text dark:text-text-dark ml-3'>
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
