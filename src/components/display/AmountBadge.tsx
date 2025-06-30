import { View, Text } from "react-native"

type AmountBadgeProps = {
  amount: string
}

export default function AmountBadge({ amount }: AmountBadgeProps) {
  const type = +amount >= 0 ? "positive" : "negative"
  const formatted = `${amount} €`

  const color = {
    positive: "bg-balance-green dark:bg-balance-green-dark",
    negative: "bg-balance-red dark:bg-balance-red-dark",
  }[type]

  return (
    <View className={`px-4 py-1 rounded-full ${color}`}>
      <Text className='font-bold text-sm' style={{ color: "#ffffff" }}>
        {formatted}
      </Text>
    </View>
  )
}
