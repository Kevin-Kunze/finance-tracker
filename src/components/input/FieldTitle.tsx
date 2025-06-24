import { Text } from "react-native"

type FieldTitleProps = {
  title: string
}

export default function FieldTitle(props: FieldTitleProps) {
  return <Text className='text-base font-semibold'>{props.title}</Text>
}
