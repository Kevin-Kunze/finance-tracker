import { View } from "react-native"
import Field from "./Field"
import FieldTitle from "./FieldTitle"

type TextInputProps = {
  title: string
  value?: string
  onChangeValue?: (value: string) => void
  placeholder?: string
  balance?: boolean
}

export default function TextField(props: TextInputProps) {
  return (
    <View>
      <FieldTitle title={props.title} />
      <Field
        placeholder={props.placeholder}
        value={props.value}
        onChangeValue={props.onChangeValue}
        balance={props.balance}
      />
    </View>
  )
}
