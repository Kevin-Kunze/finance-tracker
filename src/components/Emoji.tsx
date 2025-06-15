import React from "react"

interface EmojiProps {
  className?: string
  label: string
  symbol: number
}

const Emoji = React.memo(({ className, label, symbol }: EmojiProps) => (
  <span className={className} role='img' aria-label={label}>
    {String.fromCodePoint(symbol)}
  </span>
))

Emoji.displayName = "Emoji"

export default Emoji
