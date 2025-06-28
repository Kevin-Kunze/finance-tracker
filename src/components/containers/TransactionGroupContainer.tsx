import { View, Text } from "react-native"
import EmojiWithBackground from "@/components/display/EmojiWithBackground"
import AmountBadge from "@/components/display/AmountBadge"
import { CustomColors } from "@/assets/colors"

export type TransactionGroupContainerProps = {
  name: string
  amount: string
  color: CustomColors
  emoji: string
  rounded?: "top" | "bottom" | "full"
}

export default function TransactionGroupContainer(
  props: TransactionGroupContainerProps
) {
  const rounded = {
    none: "",
    top: "rounded-t-xl",
    bottom: "rounded-b-xl",
    full: "rounded-xl",
  }[props.rounded ?? "none"]

  return (
    <View
      className={`bg-gray-50 dark:bg-primary-800 px-4 py-3 flex-row items-center justify-between ${rounded}`}
    >
      <View className='flex-row items-center gap-3'>
        <EmojiWithBackground
          size='xs'
          color={props.color}
          emoji={props.emoji}
        />
        <Text className='text-gray-950 dark:text-gray-100 font-medium text-base'>
          {props.name}
        </Text>
      </View>

      <AmountBadge amount={props.amount} />
    </View>
  )
}
