import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { useColorScheme } from "nativewind"

export default function CircularButton({
  onPress,
  icon,
}: {
  onPress: () => void
  icon: keyof typeof Ionicons.glyphMap
}) {
  const { colorScheme } = useColorScheme()

  return (
    <TouchableOpacity
      className='p-3 rounded-full bg-background dark:bg-primary-700 border border-primary-600 dark:border-primary-700 items-center justify-center mr-2'
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={20}
        color={colorScheme === "light" ? "#5071b3" : "#fff"}
      />
    </TouchableOpacity>
  )
}
