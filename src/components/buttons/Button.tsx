import { colors } from "@/assets/colors"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, Text } from "react-native"

type ButtonProps = {
  title: string
  icon?: keyof typeof Ionicons.glyphMap
  onPress: () => void
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className='flex-row justify-center items-center bg-primary-600 dark:bg-primary-800 rounded-lg p-4 gap-3'
    >
      {props.icon && (
        <Ionicons name={props.icon} size={16} color={colors.gray[50]} />
      )}
      <Text className='text-gray-50 font-semibold rounded-lg'>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}
