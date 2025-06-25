import { TextInput } from "react-native"

type FieldProps = {
  value?: string
  onChangeValue?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  balance?: boolean
}

export default function Field(props: FieldProps) {
  return (
    <TextInput
      value={`${props.value || ""}${props.balance ? " €" : ""}`}
      editable={!props.disabled && !props.balance}
      placeholder={props.placeholder}
      className={`bg-gray-50 dark:bg-gray-100 rounded-xl p-3 shadow-sm shadow-gray-800 ${
        props.balance ? "text-title font-semibold text-center" : "text-base"
      }`}
      onChangeText={props.onChangeValue}
    />
  )
}
