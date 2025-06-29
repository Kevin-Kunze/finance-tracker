import { TouchableOpacity, Text } from "react-native"

type FunctionalButtonProps = {
  title: string
  onPress: () => void
}

export default function FunctionalButton(props: FunctionalButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className='self-end items-center bg-primary-600 dark:bg-primary-800 rounded-lg px-4 py-2 gap-3'
    >
      <Text className='text-gray-50 font-semibold rounded-lg'>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}
