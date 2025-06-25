import { View, Text } from "react-native"
import InteractionButton from "../buttons/InteractionButton"

type TransactionContainerProps = {
  title: string
  amount: string
  category: string
  onEdit?: () => void
  onDelete?: () => void
}

export default function TransactionContainer(props: TransactionContainerProps) {
  return (
    <View className='flex-row justify-between items-center bg-gray-50 dark:bg-primary-800 rounded-lg p-4 shadow-sm shadow-gray-800 '>
      <View className='flex-col flex-1'>
        <Text className='text-base font-semibold flex-wrap text-gray-950 dark:text-gray-100'>
          {props.title}
        </Text>
        <Text className='text-info flex-wrap text-gray-950 dark:text-gray-100'>
          {props.category}
        </Text>
        <Text className='text-info font-bold text-primary-500 dark:text-primary-300'>
          {props.amount} €
        </Text>
      </View>
      <View className='flex-row gap-4 items-center'>
        <InteractionButton type={"edit"} onPress={props.onEdit} />
        <InteractionButton type={"delete"} onPress={props.onDelete} />
      </View>
    </View>
  )
}
