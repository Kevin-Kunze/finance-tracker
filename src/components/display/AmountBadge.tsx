import { View, Text } from "react-native"
import { colors } from "@/assets/colors"

type AmountBadgeProps = {
  amount: number
}

export default function AmountBadge({ amount }: AmountBadgeProps) {
  const isIncome = amount >= 0
  const formatted = Math.abs(amount).toFixed(2).replace(".", ",") + " €"

  return (
    <View
      className="px-4 py-1 rounded-full"
      style={{
        backgroundColor: isIncome ? colors.custom.green : colors.custom.orange,
      }}
    >
      <Text
        className="font-bold text-sm"
        style={{ color: "#ffffff" }} 
      >
        {formatted}
      </Text>
    </View>
  )
}
