import { View, Text, TouchableOpacity } from "react-native"

export default function DuoSwitch<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (val: T) => void
  options: T[]
}) {
  return (
    <View className="flex-row rounded-lg overflow-hidden border border-primary-600 dark:border-primary-800 self-center">
      {options.map((option) => {
        const isSelected = value === option
        return (
          <TouchableOpacity
  key={option}
  onPress={() => onChange(option)}
  className={`px-4 py-2 ${
    isSelected
      ? "bg-primary-600"
      : "bg-white"
  }`}
>
  <Text
    className={`font-semibold ${
      isSelected
        ? "text-white"
        : "text-primary-600"
    }`}
  >
    {option}
  </Text>
</TouchableOpacity>
        )
      })}
    </View>
  )
}
