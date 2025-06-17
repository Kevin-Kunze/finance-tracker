import React from "react"
import { View, Text } from "react-native"

interface EmojiProps {
  size: string
  emoji: string
}

const Emoji = React.memo(({ size, emoji }: EmojiProps) => (
  <View>
    <Text className={size}>{emoji}</Text>
  </View>
))

Emoji.displayName = "Emoji"

export default Emoji
