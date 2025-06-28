import { View, Text } from "react-native"
import InteractionButton from "../buttons/InteractionButton"
import EmojiWithBackground from "../display/EmojiWithBackground"
import { CustomColors } from "@/assets/colors"

type TransactionContainerProps = {
  name: string
  amount: string
  term: string
  category: {
    name: string
    color: CustomColors
    emoji: string
  }
  onEdit?: () => void
  onDelete?: () => void
}

export default function TransactionContainer(props: TransactionContainerProps) {
  const categoryColor = {
    orange: "text-custom-orange",
    turquoise: "text-custom-turquoise",
    gray: "text-custom-gray",
    violet: "text-custom-violet",
    yellow: "text-custom-yellow",
    blue: "text-custom-blue",
    pink: "text-custom-pink",
    green: "text-custom-green",
  }[props.category.color]

  return (
    <View className='flex-row justify-between items-center bg-gray-50 dark:bg-primary-800 rounded-xl p-4 gap-4'>
      <EmojiWithBackground
        color={props.category.color}
        emoji={props.category.emoji}
        size='s'
      />
      <View className='flex-col flex-1'>
        <Text className={`text-info flex-wrap ${categoryColor}`}>
          {props.category.name}
        </Text>
        <Text className='text-base font-semibold flex-wrap text-gray-950 dark:text-gray-100'>
          {props.term}
        </Text>
        <Text className='text-info flex-wrap text-gray-950 dark:text-gray-100'>
          {props.name}
        </Text>
        <Text className='text-info font-bold text-primary-500 dark:text-primary-300'>
          {props.amount} €
        </Text>
      </View>
      <View className='flex-col gap-4 items-center'>
        <InteractionButton type={"edit"} onPress={props.onEdit} />
        <InteractionButton type={"delete"} onPress={props.onDelete} />
      </View>
    </View>
  )
}
