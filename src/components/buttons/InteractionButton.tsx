import { colors } from "@/assets/colors"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { TouchableOpacity } from "react-native"

type InteractionButtonProps = {
  type: "edit" | "delete"
  onPress?: () => void
}

export default function InteractionButton(props: InteractionButtonProps) {
  const icon = {
    edit: "create-outline",
    delete: "trash-outline",
  }[props.type] as keyof typeof Ionicons.glyphMap

  const iconColor = {
    edit: colors.functional.edit,
    delete: colors.functional.delete,
  }[props.type]

  const borderColor = {
    edit: "border-functional-edit",
    delete: "border-functional-delete",
  }[props.type]

  return (
    <TouchableOpacity
      onPress={props.onPress}
      className={`justify-center items-center border-2 ${borderColor} rounded-xl p-2`}
    >
      <Ionicons
        name={icon}
        color={iconColor}
        onPress={props.onPress}
        size={16}
      />
    </TouchableOpacity>
  )
}
