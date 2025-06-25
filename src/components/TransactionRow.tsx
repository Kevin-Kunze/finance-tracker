import { View, Text } from "react-native"
import EmojiWithBackground from "@/components/EmojiWithBackground"
import AmountBadge from "@/components/AmountBadge"

type TransactionRowProps = {
  title: string
  amount: number // wichtig: als Zahl
  emoji: string
  emojiColor: "orange" | "turquoise" | "gray" | "violet" | "yellow" | "blue" | "pink" | "green"
}

export default function TransactionRow({
  title,
  amount,
  emoji,
  emojiColor,
}: TransactionRowProps) {
  return (
    <View
      className="bg-gray-50 rounded-2xl px-4 py-3 flex-row items-center justify-between"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      {/* Linker Bereich: Icon + Titel */}
      <View className="flex-row items-center gap-3">
        <EmojiWithBackground size="xs" color={emojiColor} emoji={emoji} />
        <Text className="text-gray-900 font-medium text-base">{title}</Text>
      </View>

      {/* Rechter Bereich: Betrag als Badge */}
      <AmountBadge amount={amount} />
    </View>
  )
}
