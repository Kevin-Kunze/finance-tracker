import { View } from "react-native"
import TransactionGroupContainer, {
  TransactionGroupContainerProps,
} from "./TransactionGroupContainer"

export type TransactionGroupListProps = {
  groups: TransactionGroupContainerProps[]
}

export default function TransactionGroupList(props: TransactionGroupListProps) {
  const length = props.groups.length

  return (
    <View className='rounded-xl bg-gray-200 dark:bg-primary-700 gap-0.5'>
      {props.groups.map((group, index) => {
        return (
          <TransactionGroupContainer
            key={index}
            name={group.name}
            amount={group.amount}
            color={group.color}
            emoji={group.emoji}
            rounded={
              length === 1
                ? "full"
                : index === 0
                ? "top"
                : index === length - 1
                ? "bottom"
                : undefined
            }
          />
        )
      })}
    </View>
  )
}
